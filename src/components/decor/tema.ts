/**
 * Cores e movimento compartilhados pelas telas da Linha Decor.
 */

import type { Transition, Variants } from "framer-motion";

export const AREIA = "#C5B6A7";
export const LEITE = "#FFF3E6";
export const TINTA = "#141414";

/** Luminância relativa (WCAG) de uma cor #RRGGBB. */
function luminancia(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Tema a partir do fundo: texto leite em fundos médios e escuros (como o
 * areia do layout de referência), tinta nos fundos claros.
 */
export function temaDoFundo(fundo: string) {
  const claro = luminancia(fundo) > 0.5;
  return { fundo, texto: claro ? TINTA : LEITE, inverso: claro ? LEITE : TINTA };
}

export const EASE = [0.22, 1, 0.36, 1] as const;
export const TRANSICAO_LAYOUT: Transition = { duration: 0.85, ease: EASE };

/** Container de tela: só escalona a entrada e a saída dos filhos. */
export const tela: Variants = {
  entra: {},
  mostra: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
  sai: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
};

/** Sobe e aparece; sai subindo. */
export const sobe: Variants = {
  entra: { opacity: 0, y: 28 },
  mostra: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  sai: { opacity: 0, y: -14, transition: { duration: 0.25, ease: "easeIn" } },
};

/** Linha de título revelada de baixo para cima, dentro de uma máscara. */
export const linhaTitulo: Variants = {
  entra: { y: "110%" },
  mostra: { y: "0%", transition: { duration: 0.95, ease: EASE } },
  sai: { y: "-110%", transition: { duration: 0.3, ease: "easeIn" } },
};

/** Foto que abre como uma cortina da direita para a esquerda. */
export const cortina: Variants = {
  entra: { clipPath: "inset(0% 0% 0% 100%)" },
  mostra: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.05, ease: EASE } },
  sai: { clipPath: "inset(0% 100% 0% 0%)", transition: { duration: 0.35, ease: "easeIn" } },
};

export const zoomFoto: Variants = {
  entra: { scale: 1.18 },
  mostra: { scale: 1, transition: { duration: 1.4, ease: EASE } },
  sai: { scale: 1.05, transition: { duration: 0.35 } },
};
