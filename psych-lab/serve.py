"""Serve the saved Lab's original boards and local media, without changing them."""

import argparse
import json
import mimetypes
import re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

from audit import ARTIFACT, PROJECT, ROOT, build_audit

HERE = Path(__file__).resolve().parent


def local_file(base, value):
    candidate = (base / value).resolve()
    if candidate.is_relative_to(base.resolve()) and candidate.is_file():
        return candidate
    return None


class Handler(BaseHTTPRequestHandler):
    def do_HEAD(self):
        self.do_GET(head=True)

    def do_GET(self, head=False):
        path = unquote(urlsplit(self.path).path)
        if path == '/api/audit':
            self.send_bytes(json.dumps(build_audit(), ensure_ascii=False).encode(), 'application/json', head)
            return
        if path == '/api/canvas':
            self.send_file(PROJECT / 'canvas.json', head)
            return
        if path == '/api/film-scripts':
            self.send_file(HERE / 'film-scripts.json', head)
            return
        if path in {'/', '/index.html'}:
            self.send_file(HERE / 'index.html', head)
            return
        if path in {'/intervention', '/intervention/'}:
            self.send_file(HERE / 'intervention/index.html', head)
            return
        if path == '/runtime.js' or path.endswith('/support.js'):
            self.send_file(ARTIFACT / 'artifact-type/dc-runtime.js', head)
            return
        if path.startswith('/intervention/'):
            relative = path[len('/intervention/'):]
            file = local_file(HERE / 'intervention', relative) if not relative.startswith('sources/') else None
        elif path.startswith('/_blob/'):
            file = self.server.blob_files.get(path)
        elif path.startswith('/project/'):
            file = local_file(PROJECT, path[len('/project/'):])
        elif path.startswith('/media/'):
            relative = path[len('/media/'):]
            file = local_file(ROOT, relative) if relative.startswith(('voice-over/', 'animation-kit/audio/', 'animation-kit/film')) else None
        elif path.startswith('/film/'):
            file = local_file(ROOT / 'animation-kit', path[len('/film/'):])
        else:
            file = None
        if file:
            self.send_file(file, head)
        else:
            self.send_error(404)

    def send_bytes(self, data, content_type, head):
        self.send_response(200)
        self.send_header('Content-Type', content_type + '; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-cache')
        self.end_headers()
        if not head:
            self.wfile.write(data)

    def send_file(self, file, head):
        size = file.stat().st_size
        start, end = 0, size - 1
        partial = False
        request_range = self.headers.get('Range', '')
        if request_range:
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', request_range)
            if not match or not any(match.groups()):
                self.send_error(416)
                return
            if match[1]:
                start = int(match[1])
                end = min(int(match[2]) if match[2] else end, end)
            else:
                start = max(0, size - int(match[2]))
            if start > end or start >= size:
                self.send_response(416)
                self.send_header('Content-Range', f'bytes */{size}')
                self.end_headers()
                return
            partial = True
        length = end - start + 1
        self.send_response(206 if partial else 200)
        self.send_header('Content-Type', mimetypes.guess_type(str(file))[0] or 'application/octet-stream')
        self.send_header('Content-Length', str(length))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'no-cache')
        if partial:
            self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.end_headers()
        if head:
            return
        try:
            with file.open('rb') as stream:
                stream.seek(start)
                while length:
                    block = stream.read(min(256 * 1024, length))
                    if not block:
                        break
                    self.wfile.write(block)
                    length -= len(block)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def log_message(self, format, *args):
        if args and str(args[1]) not in {'200', '206', '304'}:
            super().log_message(format, *args)


def blob_files(audit):
    files = {}
    for row in audit['sessions']:
        text = (PROJECT / row['board_path']).read_text()
        video = re.search(r'<video\b[^>]*\bsrc=[\'"](/_blob/[^\'\"]+)', text)
        if video and row['animation_path']:
            files[video[1]] = ROOT / row['animation_path']
        audio = re.search(r'\baudio:\s*[\'"](/_blob/[^\'\"]+)', text)
        if audio and row['audio_path']:
            files[audio[1]] = ROOT / row['audio_path']
    return files


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=4173)
    parser.add_argument('--host', default='127.0.0.1', help='Use 0.0.0.0 for a forwarded cloud preview')
    args = parser.parse_args()
    audit = build_audit()
    server = ThreadingHTTPServer((args.host, args.port), Handler)
    server.blob_files = blob_files(audit)
    print(f'Psych Lab: http://127.0.0.1:{server.server_port} · {len(server.blob_files)} media references restored', flush=True)
    server.serve_forever()
