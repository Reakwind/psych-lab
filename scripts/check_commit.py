#!/usr/bin/env python3
from pathlib import Path
import re
import sys
from agent_safety import context

message = Path(sys.argv[1]).read_text()
if message.startswith('Merge remote-tracking branch') or message.startswith('Merge branch'):
    sys.exit(0)
c = context()
if (not re.match(r'^(feat|fix|docs|test|refactor|chore|build|ci|style|perf)(\([a-z0-9-]+\))?: .{8,}', message)
        or f"\nTask: {c['task']}" not in message or f"\nAgent: {c['agent']}" not in message):
    sys.exit('Use a specific conventional subject and Task/Agent trailers; scripts/agents.py commit does this for you.')
