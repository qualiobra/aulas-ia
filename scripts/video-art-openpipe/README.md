# Vídeo: ART (OpenPipe) explicado

Fonte do vídeo da aula bônus `/extras/art` (`public/videos/art-openpipe.mp4`).
Nada aqui entra no build do site: é só o que gera o MP4 e a capa.

Como funciona: cada cena é HTML/SVG em `video.html`, a narração é montada frase a
frase, o Playwright fotografa a página quadro a quadro e o ffmpeg junta tudo com o
áudio. As legendas saem embutidas no vídeo.

A narração do vídeo publicado é da [ElevenLabs](https://elevenlabs.io) (voz "Mateus",
`ybSQXXKaA88uXOUGaM03`, modelo `eleven_multilingual_v2`) e está versionada em
`audio-elevenlabs/`, então dá pra renderizar de novo sem gastar créditos. A narração
offline com [Piper](https://github.com/rhasspy/piper) (voz `pt_BR-jeff-medium`) continua
disponível, de graça, mas soa mais robótica.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `roteiro.json` | 11 cenas; cada frase tem `legenda` (texto na tela) e, se precisar, `fala` (grafia pro Piper pronunciar direito, ex.: "gê erre pê ó") |
| `textos_elevenlabs.py` | gera `audio-elevenlabs/textos.json`: o texto que a ElevenLabs lê em cada frase, derivado da legenda |
| `audio-elevenlabs/` | um MP3 por frase (`CC-FF.mp3`: cena e frase, contando do 0) + `textos.json` |
| `build_audio.py` | monta `narracao.wav` + `timeline.json` (início/fim de cada frase), com Piper ou com os MP3 |
| `video.html` | as cenas; `init(timeline)` e `render(t)` desenham o quadro do instante `t` |
| `render.py` | `stills`, `poster` e `video` (veja abaixo) |
| `transcreve.py` | opcional: transcreve a narração com Whisper pra achar palavra mal pronunciada |
| `baixar-assets.sh` | baixa voz do Piper e fontes pra `.cache/` (fora do git) |

## Gerar de novo

Precisa de Python 3.11+, Node (pro `npm pack` das fontes) e internet na primeira vez.

```bash
cd scripts/video-art-openpipe
python -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
playwright install chromium        # ou exporte CHROME_PATH=/caminho/do/chromium
./baixar-assets.sh

python build_audio.py audio-elevenlabs   # narração ElevenLabs (ou sem argumento: Piper)
python render.py stills            # confere as cenas em stills/
python render.py poster ../../public/videos/art-openpipe-poster.jpg
python render.py video ../../public/videos/art-openpipe.mp4   # ~5 min
python transcreve.py narracao.wav  # opcional
```

## Editar

- **Mudar uma frase:** edite `roteiro.json` e rode `python textos_elevenlabs.py`. Gere
  de novo na ElevenLabs só o MP3 das frases que mudaram (mesma voz e modelo, lendo o
  texto de `textos.json`), salve como `CC-FF.mp3` e rode `build_audio.py audio-elevenlabs`.
  O tempo das animações se ajusta sozinho, porque vem do `timeline.json`. Com o Piper,
  basta `build_audio.py` sem argumento, mas a narração inteira muda um pouco a cada
  síntese.
- **Pronúncia na ElevenLabs:** se uma palavra sair errada, ajuste a lista `TROCAS` em
  `textos_elevenlabs.py` (ex.: "LoRA" vira "Lóra", "vLLM" vira "vê LLM").
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
