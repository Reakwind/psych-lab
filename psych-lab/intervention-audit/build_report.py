"""Read-only map of the source protocol. This does not change the intervention or the Lab."""
import csv
import html
import io
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
cloud = json.loads((HERE / 'sources/cloud-sources.json').read_text())
sequence = json.loads((HERE / 'sequence.json').read_text())
sources = {key: row['url'] for key, row in cloud.items()}
esc = html.escape

def link(url, label):
    return f'<a href="{esc(url, quote=True)}">{esc(label)}</a>'

def movie(clip):
    seconds = round(clip['seconds'])
    return link(clip['url'], f"{clip['id']} · {seconds//60}:{seconds%60:02}")

def clips_for(session, activity):
    clips = session['lab_videos']
    if session['session'] == 3:
        return [c for c in clips if c['id'] == ('S03a' if activity['Activity ID'] == 'PS-CONT-003' else 'S03b')]
    if session['session'] == 15 and activity['Activity ID'] == 'PS-CONT-047':
        return []
    return clips

def flow(session, activity, clips):
    kind = activity['Activity Type']
    prefix = 'Context / information page → ' if activity['Information page ID'] else ''
    intro = 'First-visit introduction → ' if clips else ''
    if session['session'] == 33:
        return prefix + 'Choose ONE breathing method → its introduction if new → reminders → breathing practice. S33a and S33b are alternative branches.'
    if kind == 'Video':
        return prefix + 'Educational video → reflection / Keep when configured'
    if kind == 'Choice activity':
        return prefix + intro + 'choose ONE activity → reminders → selected practice → configured feedback'
    if kind == 'Audio':
        return prefix + intro + 'reminders → actual guided audio → configured feedback'
    if kind == 'Breathing activity':
        return prefix + intro + 'reminders / duration and pace → breathing practice → configured feedback'
    return prefix + intro + 'actual game / reflective interaction → configured feedback'

rows = []
for session in sequence:
    for activity in session['activities']:
        clips = clips_for(session, activity)
        video = '<br>'.join(movie(c) for c in clips) or 'No new Lab video mapped'
        if session['session'] == 33:
            video += '<br><small>Alternatives; do not add both durations.</small>'
        if session['session'] == 18:
            video += '<br><small>The timeline specifies patient stories; these are outside the 51 supplied scripts.</small>'
        info = activity['Information page ID'] or '—'
        parameter = activity['Parameter'] or '—'
        nonvideo = '—' if activity['Activity Type'] == 'Video' else 'Not measured'
        rows.append('<tr>' + ''.join(f'<td>{v}</td>' for v in [
            str(session['session']), activity['Activity # '], esc(activity['Activity Name']),
            esc(activity['Activity Type']), video, esc(flow(session, activity, clips)),
            esc(info), esc(parameter), nonvideo]) + '</tr>')

parts = cloud['cloud-timeline']['content'].split('\f')
groups = {}
for raw in list(csv.reader(io.StringIO(parts[0])))[4:]:
    if len(raw) < 7 or not raw[1]:
        continue
    group, _, ident, name, description, kind, *parameter = raw[1:]
    groups.setdefault(group, []).append(f'{name} ({kind}; {ident})')
group_rows = ''.join(f'<tr><td>{esc(group)}</td><td>{"<br>".join(map(esc, options))}</td></tr>' for group, options in groups.items())

page = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Psychological intervention: source order and timing scope</title><style>
body{margin:0;background:#faf9f5;color:#243029;font:16px/1.6 system-ui,sans-serif}main{max-width:1400px;margin:auto;padding:36px 28px}h1{font-size:30px;line-height:1.2;max-width:900px}h2{font-size:22px;margin-top:40px}a{color:#275e53}p,li{max-width:1000px}.table{overflow:auto;border:1px solid #d9dfd9;border-radius:10px;margin:20px 0}table{border-collapse:collapse;width:100%;font-size:14px;background:white}th,td{padding:12px;text-align:left;vertical-align:top;border-bottom:1px solid #e3e7e0}th{background:#e7eee6;white-space:nowrap}small{color:#5c655e}td:nth-child(3){min-width:200px}td:nth-child(5),td:nth-child(6){min-width:220px}footer{margin-top:30px;color:#58625b}code{font-size:13px}.scope{border-left:4px solid #b18a39;padding-left:18px}details{margin-top:22px}summary{cursor:pointer;font-weight:600}
</style><main>
<h1>Psychological intervention: source order and timing scope</h1>
<p>Read-only assessment of the May 2026 specification, the final script inventory, the matching local / SharePoint V0 timeline, and the product draft daily schedule. The intervention, scripts, video files and Lab journey have not been edited.</p>
<p class="scope"><strong>The 30-minute limit applies to the wider app session.</strong> The product working schedule allocates Psychology 3 minutes. It explicitly labels all values as draft placeholders. This is a planning assumption to test, not an approved final dose.</p>
<h2>What has to be timed</h2>
<p>The full psychological experience includes education, an actual selected practice or game, and the applicable instructions, choice, reflection, feedback and transition screens. Available video runtime alone does not establish the duration of that experience. Reused activities still take time; an unmeasured practice is not zero minutes.</p>
<ul><li>Education: anchor lessons, follow-up explanations, stories and metaphors.</li><li>Breathing: belly and box breathing; additional physiological sigh and coherent breathing.</li><li>Relaxation: progressive muscle relaxation and guided imagery, including safe-place and sleep variants.</li><li>Mindfulness / attention: breath awareness, body scan, observing thoughts, grounding, ATT, mindful eating / walking, and attention to hands and feet. Some are specified but not explicitly scheduled in V0.</li><li>Reflective and cognitive work: pleasant moments, gratitude, self-compassion, self-validation, motivation, values and meaningful next steps.</li><li>Games and social participation: themed Inner Voice workouts, connection cards, and small real-life actions.</li><li>Brief tools: One-Breath Reset, Soften One Place, and Three Anchors.</li><li>Supporting interactions: motivation selection, 1–3 reflection questions where configured, feedback, practice ratings and selecting key points to Keep.</li></ul>
<h2>The specification’s thematic order</h2>
<p>1 Welcome → 2 Action before motivation → 3–4 Stress, anxiety and calming the body → 5 Thoughts are not commands → 6 Mindfulness → 7 Self-care → 8 Confidence and social participation → 9 Values and meaningful action → 10 Responding to difficulty → 11 Sleep / rest → 12 Integration and resilience.</p>
<p>This outline and the V0 timeline are not identical: V0 introduces thought work earlier, distributes sleep-related items earlier, and runs to session 87. Its badge schedule places sessions 85–87 in week 13 if used daily. These are source discrepancies to report, not permission to move or delete content.</p>
<h2>Rules for interpreting the order below</h2>
<ul><li>First introduction to a practice: introduction → core reminders → actual practice. Repeat / library access can skip the introduction.</li><li>Choice activities mean one selected activity. They are not a requirement to complete every option.</li><li>Reflections, feedback and Keep are configurable; the documents do not fix every screen’s precise order or duration.</li><li>S33a and S33b were placed at the first Take a Breather session as an explicit assumption in the script compilation. They are optional choice branches, not two compulsory films.</li><li>S99 is a re-engagement asset outside the numbered timeline.</li><li>The current Ruth journey queues both S33 films before the chooser, and does not yet represent all actual guided audio / reflective activities. Its elapsed time is therefore not a full-protocol measurement.</li></ul>
<h2>Ordered timeline: 87 sessions, 90 scheduled activity rows</h2>
<p>The order below is copied from V0. Film links open the existing local Lab. The flow column explains the documented first-visit / repeat rule; it is not a claim that all of those steps are implemented.</p>
<div class="table"><table><thead><tr><th>Session</th><th>Activity order</th><th>Activity</th><th>Source type</th><th>Available Lab films</th><th>Documented flow</th><th>Context page</th><th>Theme parameter</th><th>Non-video duration</th></tr></thead><tbody>''' + ''.join(rows) + '''</tbody></table></div>
<h2>Choice groups: select one option</h2><div class="table"><table><thead><tr><th>Group</th><th>Options in the SharePoint workbook</th></tr></thead><tbody>''' + group_rows + '''</tbody></table></div>
<h2>Timing findings to carry into the 30-minute test</h2>
<ul><li>Session 3 contains 3:48 of Practicing with Parkinson’s and 4:01 of belly-breathing introduction: 7:49 of video, before any separately delivered breathing practice or interaction. This exceeds the draft 3-minute psychology allocation.</li><li>The spec includes practices planned at around 5 minutes and notes longer practices up to 7 minutes. Actual audio / engine durations and any included introduction time still need to be measured to avoid double-counting.</li><li>Time first encounters separately from repeat encounters. Context pages, choice and configured reflections add time.</li><li>Optional library and evening content needs its own accounting; do not automatically add it to every daily session.</li><li>If an activity overruns, possible reductions to evaluate first are repeated introductions, overlapping explanations, configurable reflection burden and optional library material. No cuts have been made.</li></ul>
<h2>Sources</h2><ul>''' + ''.join('<li>'+link(sources[key],cloud[key]['title'])+'</li>' for key in ['cloud-spec','cloud-timeline','daily-schedule','protocol-flow']) + '''</ul>
<footer>Prepared 1 November 2026. The 51 Lab videos cover the supplied script inventory; they do not by themselves constitute 87 complete psychological intervention sessions.</footer></main></html>'''
(HERE / 'ordered-protocol.html').write_text(page)
print(json.dumps({'report':str(HERE/'ordered-protocol.html'),'sessions':len(sequence),'activity_rows':len(rows),'choice_groups':len(groups)}))
