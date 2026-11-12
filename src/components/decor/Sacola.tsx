import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatarPreco, produtoPorId } from "@/data/decor/catalogo";
import { linkPedido, useSacola } from "@/data/decor/sacola";

/** Gaveta lateral com os itens; finaliza mandando o pedido pelo WhatsApp. */
export function GavetaSacola() {
  const { itens, aberta, setAberta, alterarQuantidade, remover, subtotal, totalItens } = useSacola();

  return (
    <Sheet open={aberta} onOpenChange={setAberta}>
      <SheetContent className="flex w-full flex-col gap-0 border-decor-linha bg-decor-creme p-0 font-decor sm:max-w-[440px]">
        <SheetHeader className="border-b border-decor-linha px-6 py-5 text-left">
          <SheetTitle className="font-decor text-[15px] font-normal uppercase tracking-[0.24em] text-decor-tinta">
            Sacola {totalItens > 0 && <span className="text-decor-tinta/50">({totalItens})</span>}
          </SheetTitle>
          <SheetDescription className="font-decor text-[12.5px] text-decor-tinta/55">
            Preços fictícios — versão de teste.
          </SheetDescription>
        </SheetHeader>

        {itens.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="text-[15px] text-decor-tinta/70">Sua sacola está vazia.</p>
            <button
              type="button"
              onClick={() => setAberta(false)}
              className="rounded-full border border-decor-tinta/20 px-6 py-2.5 text-[12.5px] uppercase tracking-[0.18em] text-decor-tinta hover:border-decor-tinta/50"
            >
              Ver a coleção
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-decor-linha overflow-y-auto px-6">
              {itens.map((i) => {
                const p = produtoPorId[i.produto];
                const cor = p.cores.find((c) => c.nome === i.cor);
                return (
                  <li key={i.produto + i.cor} className="flex gap-4 py-5">
                    <div className="grid size-20 shrink-0 place-items-center rounded-xl bg-white/70 p-2">
                      <img src={p.imagens.produto[0]} alt="" className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[14.5px] text-decor-tinta">{p.nome}</p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-decor-tinta/60">
                            <span className="size-3 rounded-full" style={{ backgroundColor: cor?.hex }} />
                            {i.cor}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remover ${p.nome} ${i.cor}`}
                          onClick={() => remover(i.produto, i.cor)}
                          className="text-decor-tinta/40 hover:text-decor-tinta"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-decor-tinta/15">
                          <button
                            type="button"
                            aria-label="Diminuir quantidade"
                            onClick={() => alterarQuantidade(i.produto, i.cor, i.quantidade - 1)}
                            className="grid size-8 place-items-center text-decor-tinta/60 hover:text-decor-tinta"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-5 text-center text-[13px] tabular-nums">{i.quantidade}</span>
                          <button
                            type="button"
                            aria-label="Aumentar quantidade"
                            onClick={() => alterarQuantidade(i.produto, i.cor, i.quantidade + 1)}
                            className="grid size-8 place-items-center text-decor-tinta/60 hover:text-decor-tinta"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <p className="text-[14px] tabular-nums text-decor-tinta">{formatarPreco(p.preco * i.quantidade)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-decor-linha px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] uppercase tracking-[0.18em] text-decor-tinta/70">Subtotal</span>
                <span className="text-[22px] font-light tabular-nums text-decor-tinta">{formatarPreco(subtotal)}</span>
              </div>
              <p className="mt-1 text-[12px] text-decor-tinta/55">Frete e prazo combinados no atendimento.</p>
              <a
                href={linkPedido(itens, subtotal)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center rounded-full bg-decor-tinta py-3.5 text-[13px] uppercase tracking-[0.18em] text-decor-creme transition hover:bg-decor-bambu"
              >
                Finalizar pelo WhatsApp
              </a>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
