# TOEIC Style Practice / Unofficial TOEIC Practice

Original unofficial TOEIC-style practice (Listening, Reading, Speaking, Writing).
UI: Traditional Chinese. Questions: English.

## Disclaimer / 免責聲明

本專案非 ETS 官方產品，與 TOEIC 無關；題目皆為原創練習。
Not affiliated with ETS. Original practice questions only.

## Features / 功能

- Home skill picker + mixed
- Progress bar, optional timer, next/submit
- Listening SpeechSynthesis TTS
- MCQ auto-score; writing/speaking rubric+sample
- Results + wrong-answer review + footer disclaimer

## Getting Started / 開始使用

```bash
cd toeic-practice
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build
npm start
```

## Question Counts

| Skill | Count |
|---|---:|
| Listening | 30 |
| Reading | 40 |
| Writing | 15 |
| Speaking | 15 |
| Total | 100 |

## Stack

Next.js 15 App Router + TypeScript + Tailwind CSS
Folders: app/, components/, data/questions/, lib/
