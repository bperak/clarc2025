import importlib
from pathlib import Path

# Dynamically import the script as a module
spec = importlib.util.spec_from_file_location(
    "ingest_module", str(Path(__file__).parents[2] / "scripts" / "ingest_site_to_rag.py")
)
module = importlib.util.module_from_spec(spec)  # type: ignore
spec.loader.exec_module(module)  # type: ignore

extract_visible_text = module.extract_visible_text


def test_extract_visible_text_basic():
    html = """<html><head><title>Test</title></head><body><h1>Hello</h1><p>World!</p></body></html>"""
    text = extract_visible_text(html)
    assert "Hello" in text
    assert "World!" in text
    assert "Test" in text


def test_extract_visible_text_removes_scripts():
    html = """<html><body><script>alert('x');</script><p>Visible</p></body></html>"""
    text = extract_visible_text(html)
    assert "Visible" in text
    assert "alert" not in text 