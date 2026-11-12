/**
 * Fileira de desenhos dos produtos. É a mesma peça nas duas telas: na inicial
 * fica grande no meio (no celular, uma faixa que corre para os lados e
 * encaixa em cada peça); na de produto encolhe para a barra de baixo, sem o
 * produto aberto. A troca anima com `layout` do framer-motion.
 */

import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { produtos, type FamiliaId, type ProdutoId } from "@/data/decor/catalogo";
import { ICONES, IconeProduto } from "./primitivos";
import { EASE, TRANSICAO_LAYOUT } from "./tema";

const FAMILIAS: FamiliaId[] = ["luminae", "objecta"];

/** Largura (`--w`, em vw no desktop) e diâmetro do círculo de destaque (`--c`). */
function medidas(id: ProdutoId): CSSProperties {
  const i = ICONES[id];
  const altura = (i.largura * i.h) / i.w;
  return { "--w": i.largura, "--c": Math.max(i.largura, altura) * 1.38 } as CSSProperties;
}

const TAMANHO_INICIO =
  "w-[calc(var(--w)*5vw)] md:w-[calc(var(--w)*3vw)] lg:w-[min(calc(var(--w)*1vw),calc(var(--w)*1.75vh))]";
const TAMANHO_BARRA =
  "w-[calc(var(--w)*1.25vw)] md:w-[calc(var(--w)*0.8vw)] lg:w-[min(calc(var(--w)*0.62vw),calc(var(--w)*1.1vh))]";
const CIRCULO = "w-[min(calc(var(--c)*1vw),calc(var(--c)*1.75vh))]";

export function NavIcones({ atual }: { atual: ProdutoId | null }) {
  const inicio = atual === null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-20 flex",
        inicio ? "items-center justify-center pb-[4vh] lg:pb-[5vh]" : "items-end justify-start",
      )}
    >
      <motion.nav
        layout
        transition={{ layout: TRANSICAO_LAYOUT }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-label="Produtos da Linha Decor"
        className={cn(
          "pointer-events-auto relative",
          inicio
            ? "w-full lg:px-[2.2vw]"
            : "w-full bg-[var(--bg)] px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 transition-colors duration-700 lg:mb-[3vh] lg:ml-[2.2vw] lg:w-[57vw] lg:bg-transparent lg:p-0",
        )}
      >
        <AnimatePresence initial={false}>
          {!inicio && (
            <motion.div
              key="linha"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1, transition: { duration: 1, ease: EASE, delay: 0.25 } }}
              exit={{ scaleX: 0, transition: { duration: 0.3 } }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-current opacity-60 lg:-top-[2.5vh]"
            />
          )}
        </AnimatePresence>

        <motion.div
          layout
          layoutScroll
          transition={{ layout: TRANSICAO_LAYOUT }}
          className={cn(
            "flex flex-row",
            inicio &&
              "snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:snap-none lg:overflow-visible [&::-webkit-scrollbar]:hidden",
          )}
        >
          {FAMILIAS.map((familia) => {
            const itens = produtos.filter((p) => p.familia === familia && p.id !== atual);
            return (
              <motion.div
                key={familia}
                layout
                transition={{ layout: TRANSICAO_LAYOUT }}
                // Na barra, cada família ocupa espaço proporcional ao número de peças.
                style={inicio ? undefined : { flexGrow: itens.length, flexBasis: 0 }}
                className={cn("flex flex-col", inicio && "flex-none lg:flex-1 lg:basis-0")}
              >
                <motion.ul layout transition={{ layout: TRANSICAO_LAYOUT }} className="flex flex-1 items-center">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {itens.map((p) => (
                      <motion.li
                        key={p.id}
                        layout
                        transition={{ layout: TRANSICAO_LAYOUT }}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.3 } }}
                        exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.4, ease: "easeIn" } }}
                        className={cn(
                          "flex justify-center",
                          inicio
                            ? "w-[62vw] flex-none snap-start md:w-[40vw] lg:w-auto lg:flex-1 lg:basis-0"
                            : "flex-1 basis-0",
                        )}
                        style={medidas(p.id)}
                      >
                        <Link
                          to={`/${p.id}`}
                          aria-label={p.nome}
                          className={cn(
                            "group relative flex flex-col items-center rounded-sm px-1 py-1 focus-visible:outline-none",
                            inicio ? "gap-[7vh] lg:gap-3" : "gap-3",
                          )}
                        >
                          {/* Círculo e nome: destaque da tela inicial (desktop). */}
                          {inicio && (
                            <span
                              aria-hidden
                              className={cn(
                                "pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square -translate-x-1/2 -translate-y-1/2 scale-90 rounded-full border border-current opacity-0 transition duration-500 lg:block",
                                "group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100",
                                CIRCULO,
                              )}
                            />
                          )}
                          <span
                            aria-hidden
                            className={cn(
                              "pointer-events-none absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-decor font-light opacity-0 transition duration-500 [font-stretch:125%] group-hover:opacity-100 group-focus-visible:opacity-100 lg:block",
                              inicio
                                ? "bottom-[calc(50%+min(calc(var(--c)*0.5vw),calc(var(--c)*0.875vh))+14px)] translate-y-2 text-[min(1.7vw,30px)] group-hover:translate-y-0"
                                : "bottom-full mb-2 text-[13px]",
                            )}
                          >
                            {p.nomeCurto}
                          </span>

                          {/* Celular: nome sempre visível, em cima do desenho. */}
                          {inicio && (
                            <span className="whitespace-nowrap font-decor text-[7.4vw] font-extralight leading-none tracking-[-0.02em] [font-stretch:125%] md:text-[4.4vw] lg:hidden">
                              {p.nomeCurto}
                            </span>
                          )}

                          {/* Caixa de altura fixa no celular: os desenhos ficam centrados na mesma linha. */}
                          <span className={inicio ? "flex h-[min(68vw,34vh)] items-center md:h-[min(42vw,34vh)] lg:h-auto" : "contents"}>
                            <motion.span
                              layout
                              transition={{ layout: TRANSICAO_LAYOUT }}
                              className={cn(
                                "block transition-opacity",
                                inicio ? TAMANHO_INICIO : cn(TAMANHO_BARRA, "opacity-85 group-hover:opacity-100"),
                              )}
                            >
                              <IconeProduto id={p.id} />
                            </motion.span>
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.nav>
    </div>
  );
}
