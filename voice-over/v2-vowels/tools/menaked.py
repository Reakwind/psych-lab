"""Local re-implementation of Dicta's vowel-mark (nikud) model head, so the downloaded repo's
own Python never runs; only its safetensors weights and config are loaded.
Mirrors dicta-il/dictabert-large-char-menaked (CC BY 4.0)."""
import re
import torch
from torch import nn
from transformers import BertModel, BertPreTrainedModel


class Head(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.nikud_cls = nn.Linear(config.hidden_size, len(config.nikud_classes))
        self.shin_cls = nn.Linear(config.hidden_size, len(config.shin_classes))


class Menaked(BertPreTrainedModel):
    def __init__(self, config):
        super().__init__(config)
        self.bert = BertModel(config, add_pooling_layer=False)
        self.menaked = Head(config)
        self.post_init()

    @torch.no_grad()
    def predict(self, sentences, tokenizer):
        """Add vowel marks, keeping vowel letters (matres lectionis) in place."""
        sentences = [NIKUD.sub('', s) for s in sentences]
        inputs = tokenizer(sentences, padding='longest', return_tensors='pt', return_offsets_mapping=True)
        offsets = inputs.pop('offset_mapping')
        hidden = self.bert(**inputs).last_hidden_state
        nikud = self.menaked.nikud_cls(hidden).argmax(-1).tolist()
        shin = self.menaked.shin_cls(hidden).argmax(-1).tolist()
        c = self.config
        out = []
        for si, (sent, offs) in enumerate(zip(sentences, offsets)):
            res, prev = [], 0
            for ti, (a, b) in enumerate(offs.tolist()):
                if a > prev:
                    res.append(sent[prev:a])
                if b - a != 1:
                    continue
                ch, prev = sent[a:b], b
                if not 'א' <= ch <= 'ת':
                    res.append(ch)
                    continue
                mark = c.nikud_classes[nikud[si][ti]]
                if mark == c.mat_lect_token:
                    mark = ''
                res.append(ch + (c.shin_classes[shin[si][ti]] if ch == 'ש' else '') + mark)
            res.append(sent[prev:])
            out.append(''.join(res))
        return out


NIKUD = re.compile(r'[ְ-ׇֽׁׂ]')
