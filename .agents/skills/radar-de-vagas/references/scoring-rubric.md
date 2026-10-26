# Rubrica de pontuação (0–5) — ótica do candidato

Objetivo: notas defensáveis que respondem *"o que esta vaga/empresa oferece em relação ao
mercado?"*. Pontue cada **vaga** e agregue por empresa pela **mediana** das notas das vagas.
A **mediana do mercado** por dimensão é a mediana entre as demais empresas da amostra (sem a
empresa em foco naquele cálculo).

Onde o texto não permitir inferir uma dimensão, registre cobertura parcial em vez de chutar.

---

## Eixos adaptativos (decidir ANTES de pontuar)

Dois eixos mudam conforme a amostra coletada. A escolha é **dirigida pelos dados** — declare a
configuração escolhida.

1. **Eixo 1 — modo da Remuneração.** Calcule a % de vagas com faixa salarial divulgada
   (`salario_divulgado`).
   - Se **≥ ~30%** divulgam → **modo Valor + Transparência** (rubrica 1A).
   - Se **< ~30%** divulgam → **modo Transparência + Variável** (rubrica 1B). Rotule o eixo como
     "Remuneração (transparência)" e avise que salário veio n/d na maioria.

2. **Eixo 2 — Modalidade vs Escala.** Calcule a variância de `workplaceType`.
   - **Mistura real** de remote/hybrid/on-site (< ~80% num único tipo) → **"Modalidade &
     flexibilidade"** (rubrica 2A).
   - **Massivamente on-site** (≥ ~80%) → **"Escala & jornada"** (rubrica 2B): atratividade em
     turno/escala e autonomia de jornada, não remoto vs presencial.

Mantenha sempre 6 eixos; só o eixo 1 (modo) e o eixo 2 variam.

---

## 1A. Remuneração — modo Valor + Transparência
- 5 — Faixa divulgada claramente acima do mercado do recorte + PLR/bônus citado.
- 4 — Faixa na média do recorte + algum variável.
- 3 — Faixa divulgada abaixo da mediana; ou na média sem variável.
- 2 — Faixa claramente baixa para o recorte.
- 1 — Sem faixa, mas variável concreto (PLR/bônus).
- 0 — Sem faixa e sem variável.

## 1B. Remuneração — modo Transparência + Variável
- 5 — Divulga faixa (raro → diferencial) + variável.
- 4 — Divulga faixa, sem variável.
- 3 — Sem faixa, mas variável nomeado (PLR, bônus, comissão).
- 2 — Sem faixa; menção genérica a "remuneração competitiva".
- 1 — Sem faixa e sem variável.
- 0 — Só PJ/valor-hora sem detalhe, ou nada sobre remuneração.

Parsing: "R$ X a R$ Y", "salário", "faixa", "PLR", "bônus", "comissão". Marque
`salario_divulgado` por vaga.

## 2A. Modalidade & flexibilidade
- 5 — Remoto 100%, ou híbrido flexível sem escala fixa.
- 4 — Híbrido com poucos dias presenciais (≈ até 8/mês).
- 3 — Híbrido equilibrado (2–3 dias/semana).
- 2 — Híbrido majoritariamente presencial (4+ dias/semana).
- 1 — Presencial com flexibilidade pontual.
- 0 — Presencial integral, sem flexibilidade.

Parsing: `workplaceType` + "home office", "Xx presenciais", "dias na semana".

## 2B. Escala & jornada (amostra massivamente on-site)
- 5 — Escala enxuta/previsível com autonomia de escolha declarada.
- 4 — Escala favorável (12x36 com folgas, turno fixo) e alguma escolha.
- 3 — Escala padrão do setor sem destaque.
- 2 — Escala pesada ou imprevisível, sem escolha.
- 1 — Escala exigente sem contrapartida clara.
- 0 — Escala não informada ou claramente desgastante.

Parsing: "12x36", "6x1", "plantão", "folguista", "escolha de escala".

## 3. Benefícios
Conte amplitude do pacote: plano de saúde, odontológico, VR, VA, PLR, bem-estar, home office,
day-off, previdência, creche, seguro de vida, educação, licença parental.
- 5 — Pacote muito acima (≈ 9+ itens fortes).
- 4 — Acima da média (≈ 7–8 itens).
- 3 — Padrão de mercado (≈ 5–6 itens).
- 2 — Enxuto (≈ 3–4 itens).
- 1 — Mínimo legal (VT/VR).
- 0 — Nenhum benefício citado.

## 4. Aderência da exigência
Para o candidato: a barreira técnica é **proporcional ao nível**? Nota alta = requisitos
coerentes (vale candidatar); nota baixa = "muralha" que pode filtrar indevidamente.
- 5 — Stack enxuta e coerente com o nível.
- 4 — Coerente, 1–2 desejáveis a mais.
- 3 — Razoável, lista longa de obrigatórios.
- 2 — Exigente demais para o nível anunciado.
- 1 — Sobrecarga (muitas tecnologias desconexas).
- 0 — Requisitos incoerentes para o título.

## 5. Desenvolvimento de carreira
Sinais de investimento no profissional.
- 5 — Verba certificação + cursos + parcerias + mentoria/plano de carreira.
- 4 — 2–3 sinais.
- 3 — 1 sinal claro.
- 2 — Menção vaga a "crescimento".
- 1 — Quase nada.
- 0 — Nenhuma menção.

Parsing: "certificação", "Udemy", "universidade corporativa", "mentoria", "plano de carreira".

## 6. Cultura, inclusão & clareza
EVP/narrativa + inclusão + qualidade da descrição (o candidato consegue entender o papel?).
- 5 — EVP forte + diversidade/PCD explícitos + descrição clara.
- 4 — Bom EVP + algum sinal de inclusão.
- 3 — Narrativa padrão; descrição organizada.
- 2 — Genérica, pouco diferenciada.
- 1 — Confusa ou curta demais.
- 0 — Sem narrativa, texto cru.

Parsing: propósito/valores, `disabilities = true`, termos de diversidade/PCD, estrutura da
descrição.

---

## Agregação

1. Pontue cada vaga nas 6 dimensões.
2. Por empresa: mediana das notas → vetor de 6 notas.
3. **Mediana do mercado** — escolha a base conforme o cenário:
   - **Comparação empresa-alvo vs empresa-alvo:** mediana entre as empresas-alvo encontradas
     (exclua a empresa em foco ao calcular a mediana para ela).
   - **Empresa-alvo ausente do portal:** mediana entre **pares do mesmo nicho** confirmados no
     Gupy (Passo 1B) — **não** misture consultorias genéricas como proxy de fintech/banco/hospital
     salvo se o nicho inferido for terceirização/consultoria.
   - **Exploração sem alvo citado:** mediana entre todos os empregadores relevantes do recorte.
4. Gap = nota da empresa-alvo − mediana do mercado (negativo = abaixo do mercado para o
   candidato).
5. Arredonde notas exibidas para 1 casa ou inteiro.
