import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSacola } from "@/data/decor/sacola";
import { Espacado, Vetor } from "./primitivos";
import logoMono from "@/assets/logo-mono.svg";

/** Topo fixo: marca (volta para a tela inicial), aviso de teste, sacola e menu. */
export function CabecalhoDecor({ onMenu }: { onMenu: () => void }) {
  const { totalItens, setAberta } = useSacola();

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-[var(--bg)] transition-colors duration-700 lg:bg-transparent">
      <div className="flex h-16 items-center justify-between gap-4 px-5 lg:h-auto lg:px-[2.2vw] lg:pt-[3.6vh]">
        <Link to="/" aria-label="MONO Decor — tela inicial" className="flex items-end gap-[1.4vw]">
          <Vetor src={logoMono} proporcao={272 / 31} className="w-[104px] lg:w-[min(15vw,280px)]" />
          <Espacado className="text-[16px] leading-none tracking-[0.22em] lg:-mb-[0.1em] lg:text-[min(1.9vw,34px)]">
            Decor
          </Espacado>
        </Link>

        <p className="hidden font-decor text-[11.5px] font-light tracking-[0.12em] opacity-70 xl:block">
          Versão de teste · preços fictícios e fotos provisórias
        </p>

        <div className="flex items-center gap-1 lg:gap-4">
          <button
            type="button"
            onClick={() => setAberta(true)}
            aria-label={`Abrir sacola (${totalItens} ${totalItens === 1 ? "item" : "itens"})`}
            className="relative grid size-11 place-items-center rounded-full transition hover:opacity-70"
          >
            <ShoppingBag size={22} strokeWidth={1.1} />
            {totalItens > 0 && (
              <span className="absolute right-0.5 top-0.5 grid min-w-[18px] place-items-center rounded-full bg-[var(--fg)] px-1 text-[10.5px] tabular-nums leading-[18px] text-[var(--inv)]">
                {totalItens}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onMenu}
            aria-label="Abrir menu"
            className="group grid h-11 w-12 place-items-center lg:w-16"
          >
            <span className="flex w-9 flex-col gap-[7px] lg:w-[52px]">
              <span className="h-px w-full bg-current transition-transform duration-500 group-hover:translate-x-1" />
              <span className={cn("h-px w-full bg-current transition-transform duration-500 group-hover:-translate-x-1")} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
