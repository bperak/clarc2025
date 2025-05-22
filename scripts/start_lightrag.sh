#!/usr/bin/env bash
# Usage: ./scripts/start_lightrag.sh [PORT]

PORT=${1:-9000}                    # default 9000

# export OpenAI key from .env (or .env.local) if you like
export OPENAI_API_KEY=$(grep -m1 OPENAI_API_KEY .env | cut -d '=' -f2)

export LLM_BINDING=openai
export EMBEDDING_BINDING=openai
# override model names if you like
export LLM_MODEL=gpt-4.1-mini
export EMBEDDING_MODEL=text-embedding-3-small
export EMBEDDING_DIM=1536

INPUT_DIR=${INPUT_DIR:-./inputs}   # folder with site source/content to ingest

echo "Starting LightRAG on port $PORT using input dir: $INPUT_DIR"

./.venv/bin/lightrag-server \
  --host 0.0.0.0 \
  --port "$PORT" \
  --working-dir ./clarc_rag_storage \
  --input-dir "$INPUT_DIR"