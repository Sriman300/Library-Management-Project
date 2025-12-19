# core/responses.py

import json
from core.middleware import add_cors_headers
from datetime import datetime

def send_json(handler, status, data):
    """Send JSON response for Library Management APIs"""
    handler.send_response(status)
    add_cors_headers(handler)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
    handler.send_header("X-Response-Time", f"{datetime.now().isoformat()}")
    handler.end_headers()
    handler.wfile.write(json.dumps(data, default=str, ensure_ascii=False).encode("utf-8"))


def send_404(handler):
    """Enhanced 404 for Library Management System"""
    handler.send_response(404)
    add_cors_headers(handler)
    handler.send_header("Content-Type", "text/html; charset=utf-8")
    handler.end_headers()
    handler.wfile.write(b"<h1>404 Not Found</h1>")

def send_404(handler):
    """Enhanced 404 for Library Management System"""
    handler.send_books_response(404)
    add_cors_headers(handler)
    handler.send_header("Content-Type", "text/html; charset=utf-8")
    handler.end_headers()
    handler.wfile.write(b"<h1>404 Not Found</h1>")

def send_404(handler):
    """Enhanced 404 for Library Management System"""
    handler.send_librarians_response(404)
    add_cors_headers(handler)
    handler.send_header("Content-Type", "text/html; charset=utf-8")
    handler.end_headers()
    handler.wfile.write(b"<h1>404 Not Found</h1>")

def send_404(handler):
    """Enhanced 404 for Library Management System"""
    handler.send_bookshelves_response(404)
    add_cors_headers(handler)
    handler.send_header("Content-Type", "text/html; charset=utf-8")
    handler.end_headers()
    handler.wfile.write(b"<h1>404 Not Found</h1>")