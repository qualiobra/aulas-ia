# Vídeo: ART (OpenPipe) explicado

Fonte do vídeo da aula bônus `/extras/art` (`public/videos/art-openpipe.mp4`).
Nada aqui entra no build do site: é só o que gera o MP4 e a capa.

Como funciona: cada cena é HTML/SVG em `video.html`, a narração é gerada offline
com [Piper](https://github.com/rhasspy/piper) (voz `pt_BR-jeff-medium`), o
Playwright fotografa a página quadro a quadro e o ffmpeg junta tudo com o áudio.
As legendas saem embutidas no vídeo.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `roteiro.json` | 11 cenas; cada frase tem `legenda` (texto na tela) e, se precisar, `fala` (grafia pro TTS pronunciar direito, ex.: "gê erre pê ó") |
| `build_audio.py` | sintetiza frase a frase → `narracao.wav` + `timeline.json` (início/fim de cada frase) |
| `video.html` | as cenas; `init(timeline)` e `render(t)` desenham o quadro do instante `t` |
| `render.py` | `stills`, `poster` e `video` (veja abaixo) |
| `transcreve.py` | opcional: transcreve a narração com Whisper pra achar palavra mal pronunciada |
| `baixar-assets.sh` | baixa voz e fontes pra `.cache/` (fora do git) |

## Gerar de novo

Precisa de Python 3.11+, Node (pro `npm pack` das fontes) e internet na primeira vez.

```bash
cd scripts/video-art-openpipe
python -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
playwright install chromium        # ou exporte CHROME_PATH=/caminho/do/chromium
./baixar-assets.sh

python build_audio.py              # narração + timeline (~6 min de áudio)
python render.py stills            # confere as cenas em stills/
python render.py poster ../../public/videos/art-openpipe-poster.jpg
python render.py video ../../public/videos/art-openpipe.mp4   # ~5 min
python transcreve.py narracao.wav  # opcional
```

## Editar

- **Mudar uma frase:** edite `roteiro.json` e rode `build_audio.py` de novo. O tempo
  das animações se ajusta sozinho, porque vem do `timeline.json`. O Piper varia um
  pouco a cada síntese, então a narração nunca sai idêntica à anterior: depois de
  rodar `build_audio.py`, renderize o vídeo de novo.
- **Mudar uma cena:** edite a `<section data-id="...">` em `video.html`. Cada elemento
  aparece conforme os atributos:
  - `data-r="k"`: entra quando começa a frase `k` da cena (contando do 0);
  - `data-p="0.5"`: atraso como fração da duração dessa frase;
  - `data-on="k"` / `data-off="m"`: fica destacado da frase `k` até a frase `m`
    (o CSS lê a variável `--a`, de 0 a 1);
  - `data-x="k"`: sai na frase `k`;
  - `data-anim`: `up` (padrão), `pop`, `grow` (barras), `draw` (linhas SVG) ou `drop`.
- Um elemento SVG com `transform="..."` não pode ter `data-r` no mesmo nó: envolva num
  `<g transform>` e ponha o `data-r` num `<g>` de dentro.
