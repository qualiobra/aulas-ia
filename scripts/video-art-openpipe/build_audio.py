"""Sintetiza a narração frase a frase (Piper, offline) e gera timeline.json + narracao.wav."""
import io
import json
import wave
from pathlib import Path

import numpy as np
from piper import PiperVoice, SynthesisConfig

AQUI = Path(__file__).parent
VOZ = AQUI / ".cache" / "voices" / "pt_BR-jeff-medium.onnx"

LEAD_IN = 0.6      # silêncio antes da 1ª frase de cada cena
GAP = 0.35         # entre frases
TAIL = 0.9         # depois da última frase da cena
FINAL_TAIL = 2.5   # respiro no fim do vídeo

roteiro = json.loads((AQUI / "roteiro.json").read_text())
voice = PiperVoice.load(str(VOZ))
cfg = SynthesisConfig(length_scale=1.0, noise_scale=0.6, noise_w_scale=0.8)
sr = voice.config.sample_rate


def sintetiza(texto: str) -> np.ndarray:
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        voice.synthesize_wav(texto, w, syn_config=cfg)
    buf.seek(0)
    with wave.open(buf, "rb") as r:
        return np.frombuffer(r.readframes(r.getnframes()), dtype=np.int16)


def silencio(seg: float) -> np.ndarray:
    return np.zeros(int(round(seg * sr)), dtype=np.int16)


pedacos: list[np.ndarray] = []
t = 0.0
cenas = []
for i, cena in enumerate(roteiro):
    inicio_cena = t
    pedacos.append(silencio(LEAD_IN))
    t += LEAD_IN
    frases = []
    for j, f in enumerate(cena["frases"]):
        audio = sintetiza(f.get("fala", f["legenda"]))
        dur = len(audio) / sr
        frases.append({"inicio": round(t, 3), "fim": round(t + dur, 3), "legenda": f["legenda"]})
        pedacos.append(audio)
        t += dur
        if j < len(cena["frases"]) - 1:
            pedacos.append(silencio(GAP))
            t += GAP
    cauda = FINAL_TAIL if i == len(roteiro) - 1 else TAIL
    pedacos.append(silencio(cauda))
    t += cauda
    cenas.append({"id": cena["id"], "inicio": round(inicio_cena, 3), "fim": round(t, 3), "frases": frases})
    print(f"{cena['id']:<12} {inicio_cena:6.1f}s → {t:6.1f}s")

with wave.open(str(AQUI / "narracao.wav"), "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(sr)
    w.writeframes(np.concatenate(pedacos).tobytes())

(AQUI / "timeline.json").write_text(json.dumps({"duracao": round(t, 3), "cenas": cenas}, ensure_ascii=False, indent=1))
print(f"total: {t:.1f}s")
