# Magyar Gid - Interactive Hungarian Grammar Guide

Magyar Gid is an interactive web application that helps Russian-speaking learners navigate Hungarian grammar through a decision-tree algorithm. Answer a few questions about what you want to say, and the app shows the correct suffixes, rules, and examples.

## Features

- **Interactive Suffix Selection Algorithm**: step-by-step guidance to the correct Hungarian suffix
- **Comprehensive Grammar Coverage**:
  - Verb conjugation (indefinite) — 4 verb types
  - Infinitive formation (-ni)
  - Noun plural (-k) with vowel harmony
  - Accusative case (-t)
  - Locative case (-ban/-ben, -on/-en/-ön, -nál/-nél)
  - Possessive suffixes (1st/2nd/3rd person)
  - Adjective plural and position rules
- **Vowel Harmony Reference**: back, front, and rounded front vowel rules
- **Mobile-responsive Design**: works on all device sizes

## How It Works

1. **Select part of speech**: verb, noun, or adjective
2. **Choose the operation**: conjugation, case, plural, possessive, etc.
3. **Specify word properties**: vowel harmony group, ending type
4. **Get the result**: suffix rules, conjugation tables, examples, and exceptions

## Technical Stack

Vanilla JavaScript SPA with MVC architecture. No build step required.

- `config/algorithms/hungarian-guide/steps.json` — algorithm steps and options
- `config/algorithms/hungarian-guide/rules.json` — transition rules between steps
- `config/algorithms/hungarian-guide/results.json` — grammar rules, tables, and examples

## Run Locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Configured for GitHub Pages — push to `main` and enable Pages in repo settings.
