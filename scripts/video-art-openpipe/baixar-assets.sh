#!/usr/bin/env bash
# Baixa a voz Piper pt-BR e as fontes do vídeo pra .cache/ (fora do git).
set -euo pipefail
cd "$(dirname "$0")"

mkdir -p .cache/voices .cache/fonts

VOZ=https://huggingface.co/rhasspy/piper-voices/resolve/main/pt/pt_BR/jeff/medium
for f in pt_BR-jeff-medium.onnx pt_BR-jeff-medium.onnx.json; do
  [ -f ".cache/voices/$f" ] || curl -fsSL -o ".cache/voices/$f" "$VOZ/$f"
done

cd .cache/fonts
for pkg in plus-jakarta-sans jetbrains-mono; do
  if [ ! -d "fontsource-$pkg" ]; then
    tgz=$(npm pack "@fontsource/$pkg" --silent)
    tar xzf "$tgz" && mv package "fontsource-$pkg" && rm "$tgz"
  fi
done

echo "assets prontos em .cache/"
