#!/usr/bin/env python
"""Ingest website content into LightRAG.

Fetches one or more URLs, extracts visible text and sends it to the LightRAG
server via the `/documents/text` endpoint so that it can be retrieved during
RAG answering.

Usage (bash / PowerShell):

    python scripts/ingest_site_to_rag.py \
        --urls https://clarc2025.example.com https://clarc2025.example.com/speakers

Environment variables:

    LIGHTRAG_API_URL   Base URL for LightRAG (default: http://localhost:9000)
    LIGHTRAG_API_KEY   Optional API key if your LightRAG instance requires auth.

The script respects the project convention of using the same default port as
`scripts/start_lightrag.sh`.
"""
from __future__ import annotations

import argparse
import os
import sys
from typing import List

import requests
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def extract_visible_text(html: str) -> str:
    """Return visible text from HTML.

    Args:
        html: Raw HTML string.

    Returns:
        Cleaned plain-text content suitable for ingestion.
    """
    soup = BeautifulSoup(html, "html.parser")

    # Remove script and style elements.
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    text = soup.get_text(separator="\n")
    # Collapse multiple blank lines.
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    return "\n".join(lines)


def post_to_lightrag(text: str, base_url: str, api_key: str | None = None) -> None:
    """Send a chunk of text to LightRAG via /documents/text."""
    payload = {"text": text}
    headers = {"Content-Type": "application/json"}
    if api_key:
        headers["Authorization"] = api_key

    endpoint = f"{base_url.rstrip('/')}/documents/text"
    resp = requests.post(endpoint, json=payload, headers=headers, timeout=30)

    if not resp.ok:
        raise RuntimeError(
            f"LightRAG ingestion failed ({resp.status_code}): {resp.text}"
        )


# ---------------------------------------------------------------------------
# Main CLI
# ---------------------------------------------------------------------------

def parse_args(argv: List[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Ingest website pages into LightRAG")
    parser.add_argument(
        "--urls",
        nargs="+",
        required=True,
        help="List of web page URLs to ingest",
    )
    parser.add_argument(
        "--lightrag-url",
        default=os.getenv("LIGHTRAG_API_URL", "http://localhost:9000"),
        help="Base URL for the LightRAG server",
    )
    parser.add_argument(
        "--api-key",
        default=os.getenv("LIGHTRAG_API_KEY"),
        help="Optional API key for LightRAG",
    )
    return parser.parse_args(argv)


def main(argv: List[str] | None = None) -> None:
    args = parse_args(argv)

    for url in args.urls:
        print(f"Fetching {url} …", end=" ")
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        text = extract_visible_text(resp.text)
        print(f"{len(text):,} chars extracted. Ingesting …", end=" ")
        post_to_lightrag(text, args.lightrag_url, args.api_key)
        print("✓")

    print("All pages ingested successfully.")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1) 