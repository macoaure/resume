#!/usr/bin/env python3
"""Valida description de skill sem chamar claude -p.

Uso:
  python scripts/validate_description.py
  python scripts/validate_description.py --description "texto..."
  python scripts/validate_description.py --skill-path ../
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

HARD_LIMIT = 1024
SOFT_TARGET = 900

POSITIVE_HINTS = [
    "comparar",
    "oportunidades",
    "vagas",
    "empresas",
    "salário",
    "benefícios",
    "mapa de atratividade",
    "radar",
    "candidatar",
    "candidato",
    "gupy",
]

NEGATIVE_HINTS = [
    "benchmark de rh",
    "recrutador",
    "melhorar currículo",
    "candidatura automática",
    "negociar proposta",
    "entrevista",
    "otimizar descrição de vaga",
]


def parse_description_from_skill(skill_path: Path) -> str:
    content = (skill_path / "SKILL.md").read_text()
    lines = content.split("\n")
    if lines[0].strip() != "---":
        raise ValueError("SKILL.md sem frontmatter")

    end = next(i for i, line in enumerate(lines[1:], 1) if line.strip() == "---")
    desc_lines: list[str] = []
    in_desc = False
    for line in lines[1:end]:
        if line.startswith("description:"):
            value = line[len("description:"):].strip()
            if value in (">", "|", ">-", "|-"):
                in_desc = True
                continue
            return value.strip('"').strip("'")
        if in_desc and (line.startswith("  ") or line.startswith("\t")):
            desc_lines.append(line.strip())
        elif in_desc:
            break
    return " ".join(desc_lines)


def validate(description: str) -> dict:
    length = len(description)
    lower = description.lower()
    missing_positive = [h for h in POSITIVE_HINTS if h not in lower]
    missing_negative = [h for h in NEGATIVE_HINTS if h not in lower]

    issues: list[str] = []
    if length > HARD_LIMIT:
        issues.append(f"Excede limite hard ({length} > {HARD_LIMIT}) — Claude Desktop rejeita.")
    elif length > SOFT_TARGET:
        issues.append(f"Acima do alvo seguro ({length} > {SOFT_TARGET}) — margem pequena para edits.")

    if missing_positive:
        issues.append("Gatilhos positivos ausentes: " + ", ".join(missing_positive[:5]))
    if missing_negative:
        issues.append("Exclusões ausentes: " + ", ".join(missing_negative[:5]))

    return {
        "length": length,
        "hard_limit_ok": length <= HARD_LIMIT,
        "soft_target_ok": length <= SOFT_TARGET,
        "issues": issues,
        "description": description,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Valida description sem usar claude CLI")
    parser.add_argument("--skill-path", type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument("--description", default=None)
    args = parser.parse_args()

    description = args.description or parse_description_from_skill(args.skill_path)
    result = validate(description)

    print(f"Caracteres: {result['length']} / {HARD_LIMIT}")
    print(f"Hard limit: {'OK' if result['hard_limit_ok'] else 'FALHOU'}")
    print(f"Alvo seguro ({SOFT_TARGET}): {'OK' if result['soft_target_ok'] else 'ATENÇÃO'}")

    if result["issues"]:
        print("\nObservações:")
        for issue in result["issues"]:
            print(f"  - {issue}")
    else:
        print("\nNenhum problema estrutural detectado.")

    sys.exit(0 if result["hard_limit_ok"] else 1)


if __name__ == "__main__":
    main()
