"""Gera o texto que a ElevenLabs lê em cada frase, a partir da legenda do roteiro.

A ElevenLabs lê bem termos em inglês, então parte da legenda e só troca o que ela
leria mal (siglas, números com ponto, símbolos, nomes de função).

uso: python textos_elevenlabs.py   → escreve audio-elevenlabs/textos.json
"""
import json
import re
from pathlib import Path

AQUI = Path(__file__).parent

ORDINAIS = {"1": "Primeiro", "2": "Segundo", "3": "Terceiro", "4": "Quarto"}

TROCAS = [
    (r"^(\d)\. (\w)", lambda m: f"{ORDINAIS[m[1]]}, {m[2].lower()}"),
    (r"\bART\b", "Art"),
    (r"\bRULER\b", "Ruler"),
    (r"\bLoRA\b", "Lóra"),
    (r"\bvLLM\b", "vê LLM"),
    (r"de IA\b", "de inteligência artificial"),
    (r" · ", ", "),
    (r" = ", " igual a "),
    (r" − ", " menos a "),
    (r"gather_trajectory_groups", "gather trajectory groups"),
    (r"backend\.train", "backend ponto train"),
    (r"ServerlessBackend", "Serverless Backend"),
    (r"LocalBackend", "Local Backend"),
    (r"Weights & Biases", "Weights and Biases"),
    (r"Qwen 2\.5", "Qwen dois ponto cinco"),
    (r"\bo o3\b", "o ó três"),
    (r"openpipe-art", "openpipe art"),
]


def texto(legenda: str) -> str:
    for padrao, troca in TROCAS:
        legenda = re.sub(padrao, troca, legenda)
    return legenda


if __name__ == "__main__":
    roteiro = json.loads((AQUI / "roteiro.json").read_text())
    textos = {
        f"{i:02d}-{j:02d}": texto(f["legenda"])
        for i, cena in enumerate(roteiro)
        for j, f in enumerate(cena["frases"])
    }
    saida = AQUI / "audio-elevenlabs" / "textos.json"
    saida.parent.mkdir(exist_ok=True)
    saida.write_text(json.dumps(textos, ensure_ascii=False, indent=1) + "\n")
    print(f"{len(textos)} frases, {sum(map(len, textos.values()))} caracteres → {saida}")
