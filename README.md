# MONO — Linha Decor

Site de teste da Linha Decor da MONO: luminárias **Luminae** (Régia, OVNI e
Kobo, em fibra de PET) e móveis **Objecta** (Cadeira Ângula, Mesa Elevante e
Cadeira Arco Modular, em bambu).

- `/` — tela inicial com os desenhos de linha dos produtos.
- `/:produto` — tela do produto (`/regia`, `/ovni`, `/kobo`, `/angula`,
  `/mesa-elevante`, `/arco-modular`).
- Sacola simulada: o pedido fecha pelo WhatsApp comercial.

## Conteúdo provisório

- **Preços fictícios**, só para testar a vitrine.
- Fotos de ambiente extraídas da apresentação em PDF, em baixa resolução.
- Medidas de Régia, OVNI e dos móveis de bambu ainda não chegaram.
- Fora dos buscadores (`robots.txt` e `noindex`).

Todos os dados (preço, cores, textos, imagens) ficam em
`src/data/decor/catalogo.ts`.

## Rodar

```bash
npm install
npm run dev      # http://localhost:8090
npm run build    # gera dist/
```

Stack: Vite + React 18 + TypeScript + Tailwind + framer-motion. O
`vercel.json` já tem o rewrite para as rotas funcionarem no deploy.
