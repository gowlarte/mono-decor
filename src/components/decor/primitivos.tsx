/**
 * Peças visuais básicas da Linha Decor: vetores do PDF pintados com a cor do
 * texto, ícones de produto recortados das folhas de ícones e texto espaçado.
 */

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ProdutoId } from "@/data/decor/catalogo";
import iconesLuminae from "@/assets/decor/vetores/icons-luminae.svg";
import iconesObjecta from "@/assets/decor/vetores/icons-objecta.svg";

const mascara = (src: string): CSSProperties => ({
  backgroundColor: "currentColor",
  WebkitMaskImage: `url("${src}")`,
  maskImage: `url("${src}")`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
});

/**
 * Vetor do PDF pintado com a cor do texto (currentColor), via máscara CSS.
 * `proporcao` é largura/altura do SVG.
 */
export function Vetor({
  src,
  proporcao,
  className,
  rotulo,
}: {
  src: string;
  proporcao: number;
  className?: string;
  rotulo?: string;
}) {
  return (
    <span
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
      className={cn("block", className)}
      style={{ aspectRatio: String(proporcao), ...mascara(src) }}
    />
  );
}

/** As duas folhas de ícones do PDF (tamanho do viewBox de cada SVG). */
const FOLHAS = {
  luminae: { src: iconesLuminae, w: 400, h: 115 },
  objecta: { src: iconesObjecta, w: 760, h: 190 },
};

/**
 * Onde cada desenho fica na folha (unidades do viewBox, com folga de 2) e a
 * largura dele na tela inicial do desktop, em vw — tirada do layout de
 * referência, para os seis desenhos parecerem do mesmo "tamanho visual".
 */
export const ICONES: Record<
  ProdutoId,
  { folha: keyof typeof FOLHAS; x: number; y: number; w: number; h: number; largura: number }
> = {
  regia: { folha: "luminae", x: 14.5, y: 11.8, w: 103, h: 86, largura: 9 },
  ovni: { folha: "luminae", x: 160.5, y: 14.3, w: 111.3, h: 86.3, largura: 10.4 },
  kobo: { folha: "luminae", x: 314.8, y: 7.8, w: 71.5, h: 102.8, largura: 8.2 },
  angula: { folha: "objecta", x: 8.3, y: 8.5, w: 138.8, h: 173.5, largura: 7 },
  "mesa-elevante": { folha: "objecta", x: 203.3, y: 18.5, w: 276.3, h: 169.5, largura: 11 },
  "arco-modular": { folha: "objecta", x: 535.8, y: 5.8, w: 213, h: 140.3, largura: 9.4 },
};

/** Desenho de linha de um produto, recortado da folha (sem arquivo extra). */
export function IconeProduto({ id, className }: { id: ProdutoId; className?: string }) {
  const i = ICONES[id];
  const f = FOLHAS[i.folha];
  return (
    <span aria-hidden className={cn("relative block overflow-hidden", className)} style={{ aspectRatio: `${i.w} / ${i.h}` }}>
      <span
        className="absolute block"
        style={{
          width: `${(f.w / i.w) * 100}%`,
          height: `${(f.h / i.h) * 100}%`,
          left: `${(-i.x / i.w) * 100}%`,
          top: `${(-i.y / i.h) * 100}%`,
          ...mascara(f.src),
        }}
      />
    </span>
  );
}

/** Texto com letras bem espaçadas (rótulos, lema). */
export function Espacado({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-decor font-light tracking-[0.32em]", className)}>{children}</span>;
}

const LEMA = ["Simplicidade", "Forma", "Espaço"];

/** Linha de rodapé dos slides: três palavras espalhadas. */
export function Lema({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-between text-[11px] md:text-[13px]", className)}>
      {LEMA.map((p) => (
        <Espacado key={p}>{p}</Espacado>
      ))}
    </div>
  );
}
