"""Transcreve a narração com Whisper pra conferir a pronúncia (opcional).

uso: python transcreve.py narracao.wav
"""
import sys
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8")
segs, _ = m.transcribe(sys.argv[1], language="pt", beam_size=1)
for s in segs:
    print(f"[{s.start:6.1f}] {s.text.strip()}", flush=True)
