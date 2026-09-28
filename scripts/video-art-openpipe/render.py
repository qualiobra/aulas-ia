"""Renderiza video.html quadro a quadro (Playwright) e junta com a narração (ffmpeg).

uso:
  python render.py stills             # PNGs de conferência (meio e fim de cada cena)
  python render.py poster capa.jpg    # capa do vídeo (abertura, sem legenda)
  python render.py video saida.mp4    # vídeo completo

CHROME_PATH aponta pra um Chromium específico; sem ela, usa o do Playwright.
"""
import json
import os
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
from playwright.sync_api import sync_playwright

AQUI = Path(__file__).parent
FPS = 30
tl = json.loads((AQUI / "timeline.json").read_text())


def abre(p):
    browser = p.chromium.launch(executable_path=os.environ.get("CHROME_PATH"))
    page = browser.new_page(viewport={"width": 1280, "height": 720}, device_scale_factor=1.5)
    page.goto((AQUI / "video.html").as_uri())
    page.evaluate("document.fonts.ready")
    page.evaluate("tl => init(tl)", tl)
    return browser, page


def stills():
    out = AQUI / "stills"
    out.mkdir(exist_ok=True)
    with sync_playwright() as p:
        browser, page = abre(p)
        for c in tl["cenas"]:
            meio = c["frases"][len(c["frases"]) // 2]["inicio"] + 0.3
            for nome, t in (("meio", meio), ("fim", c["fim"] - 0.5)):
                page.evaluate(f"render({t})")
                page.screenshot(path=str(out / f"{c['id']}-{nome}.png"))
        browser.close()
    print("stills em", out)


def poster(saida: str):
    with sync_playwright() as p:
        browser, page = abre(p)
        page.evaluate(f"render({tl['cenas'][0]['fim'] - 0.5})")
        page.evaluate("document.getElementById('cap').style.display = 'none'")
        page.screenshot(path=saida, type="jpeg", quality=85)
        browser.close()
    print("ok:", saida)


def video(saida: str):
    n = int(tl["duracao"] * FPS)
    ff = subprocess.Popen(
        [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error",
         "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
         "-i", str(AQUI / "narracao.wav"),
         "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "96k", "-ar", "44100", "-shortest", "-movflags", "+faststart", saida],
        stdin=subprocess.PIPE,
    )
    with sync_playwright() as p:
        browser, page = abre(p)
        ultimo_sig, quadro, capturas = None, None, 0
        for f in range(n):
            sig = page.evaluate(f"render({f / FPS})")
            if sig != ultimo_sig:
                quadro = page.screenshot(type="jpeg", quality=92)
                ultimo_sig = sig
                capturas += 1
            ff.stdin.write(quadro)
            if f % (FPS * 30) == 0:
                print(f"{f / FPS:6.0f}s / {n / FPS:.0f}s  ({capturas} capturas)", flush=True)
        browser.close()
    ff.stdin.close()
    ff.wait()
    print("ok:", saida)


if __name__ == "__main__":
    if sys.argv[1] == "stills":
        stills()
    elif sys.argv[1] == "poster":
        poster(sys.argv[2])
    else:
        video(sys.argv[2])
