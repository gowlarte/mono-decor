/**
 * Fileira de desenhos dos produtos. É a mesma peça nas duas telas: na inicial
 * fica grande no meio; na de produto encolhe para a barra de baixo, sem o
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
  "w-[calc(var(--w)*2.3vw)] md:w-[calc(var(--w)*1.5vw)] lg:w-[min(calc(var(--w)*1vw),calc(var(--w)*1.75vh))]";
const TAMANHO_BARRA =
  "w-[calc(var(--w)*1.25vw)] md:w-[calc(var(--w)*0.8vw)] lg:w-[min(calc(var(--w)*0.62vw),calc(var(--w)*1.1vh))]";
const CIRCULO = "w-[min(calc(var(--c)*1vw),calc(var(--c)*1.75vh))]";

export function NavIcones({ atual }: { atual: ProdutoId | null }) {
  const inicio = atual === null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-20 flex",
        inicio ? "items-center justify-center pb-[16vh] lg:pb-[5vh]" : "items-end justify-start",
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
            ? "w-full px-5 lg:px-[2.2vw]"
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
          transition={{ layout: TRANSICAO_LAYOUT }}
          className={cn("flex", inicio ? "flex-col gap-10 lg:flex-row lg:gap-0" : "flex-row")}
        >
          {FAMILIAS.map((familia) => {
            const itens = produtos.filter((p) => p.familia === familia && p.id !== atual);
            return (
              <motion.div
                key={familia}
                layout
                transition={{ layout: TRANSICAO_LAYOUT }}
                style={{ flexGrow: itens.length, flexBasis: 0 }}
                className="flex flex-col"
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
                        className="flex flex-1 basis-0 justify-center"
                        style={medidas(p.id)}
                      >
                        <Link
                          to={`/${p.id}`}
                          aria-label={p.nome}
                          className="group relative flex flex-col items-center gap-3 rounded-sm px-1 py-1 focus-visible:outline-none"
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

                          {inicio && (
                            <span className="font-decor text-[12px] font-light tracking-[0.06em] lg:hidden">{p.nomeCurto}</span>
                          )}
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
