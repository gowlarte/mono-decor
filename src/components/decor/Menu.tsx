/**
 * Menu ☰: as duas famílias com seus produtos, a ficha técnica do feltro das
 * Luminae, a apresentação da linha e os links de saída.
 */

import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { familias, fichaLuminae, formatarPreco, produtos, type FamiliaId } from "@/data/decor/catalogo";
import { useSacola } from "@/data/decor/sacola";
import { WHATSAPP_NUMERO } from "@/data/contato";
import { Espacado, IconeProduto, Lema, Vetor } from "./primitivos";
import logoLuminae from "@/assets/decor/vetores/logo-luminae.svg";
import logoObjecta from "@/assets/decor/vetores/logo-objecta.svg";
import marcaDecor from "@/assets/decor/vetores/marca-decor.svg";

const LOGOS: Record<FamiliaId, string> = { luminae: logoLuminae, objecta: logoObjecta };

const WHATS = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  "Olá! Vim do site da MONO e quero saber mais sobre a Linha Decor.",
)}`;

export function MenuDecor({ aberto, onAberto }: { aberto: boolean; onAberto: (v: boolean) => void }) {
  const { totalItens, setAberta } = useSacola();
  const fechar = () => onAberto(false);

  return (
    <Dialog.Root open={aberto} onOpenChange={onAberto}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/35 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-[1180px] overflow-y-auto bg-decor-bambu font-decor text-decor-leite shadow-2xl duration-500 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          <div className="flex min-h-full flex-col px-6 py-6 md:px-12 md:py-10">
            <div className="flex items-start justify-between gap-6">
              <Dialog.Title className="font-decor text-[13px] font-light tracking-[0.32em]">Linha Decor</Dialog.Title>
              <Dialog.Description className="sr-only">
                Produtos, ficha técnica e contato da Linha Decor
              </Dialog.Description>
              <Dialog.Close
                aria-label="Fechar menu"
                className="-mr-2 -mt-2 grid size-11 place-items-center rounded-full transition hover:bg-white/10"
              >
                <X size={22} strokeWidth={1.2} />
              </Dialog.Close>
            </div>

            <div className="mt-10 grid flex-1 gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              {/* Famílias e produtos */}
              <div className="flex flex-col gap-12">
                {(Object.keys(familias) as FamiliaId[]).map((f) => (
                  <section key={f} aria-label={familias[f].nome}>
                    <Vetor src={LOGOS[f]} proporcao={1000 / 90} rotulo={`mono ${familias[f].nome}`} className="w-[min(100%,420px)]" />
                    <p className="mt-3 text-[14px] font-light opacity-85">{familias[f].subtitulo}</p>
                    <ul className="mt-5 divide-y divide-decor-leite/20 border-y border-decor-leite/20">
                      {produtos
                        .filter((p) => p.familia === f)
                        .map((p) => (
                          <li key={p.id}>
                            <Link
                              to={`/${p.id}`}
                              onClick={fechar}
                              className="group flex items-center gap-5 py-3.5 transition hover:pl-2"
                            >
                              <span className="flex w-14 justify-center">
                                <IconeProduto id={p.id} className="h-10 w-auto max-w-14" />
                              </span>
                              <span className="flex-1 text-[19px] font-extralight [font-stretch:125%] md:text-[22px]">
                                {p.nome}
                              </span>
                              <span className="text-[13px] tabular-nums opacity-80">{formatarPreco(p.preco)}</span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </section>
                ))}
              </div>

              {/* Ficha do feltro e a linha */}
              <div className="flex flex-col gap-10">
                <section aria-labelledby="ficha-feltro">
                  <Espacado className="text-[11.5px] opacity-80">Ficha técnica · Luminae</Espacado>
                  <h2 id="ficha-feltro" className="mt-3 text-[28px] font-extralight uppercase leading-[1] [font-stretch:125%] md:text-[34px]">
                    Luz que também cuida do som
                  </h2>
                  <p className="mt-4 max-w-[56ch] text-[14px] leading-relaxed opacity-90">{fichaLuminae.sobre}</p>
                  <ul className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-decor-leite/25">
                    {fichaLuminae.destaques.map((d) => (
                      <li key={d.valor} className="bg-decor-bambu p-4">
                        <p className="text-[19px] font-extralight leading-none [font-stretch:120%] md:text-[24px]">{d.valor}</p>
                        <p className="mt-2 text-[11.5px] leading-snug opacity-80">{d.rotulo}</p>
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-6 divide-y divide-decor-leite/20 border-y border-decor-leite/20 text-[13px]">
                    {fichaLuminae.especificacoes.map((e) => (
                      <div key={e.rotulo} className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-5">
                        <dt className="opacity-70">{e.rotulo}</dt>
                        <dd>{e.valor}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-[12px] opacity-70">
                    Vale para Régia, Kobo e Ovni. Diâmetro e altura de Régia e Ovni e medidas dos móveis de bambu em breve.
                  </p>
                </section>

                <section aria-label="Sobre a linha" className="flex flex-col gap-5">
                  <Vetor src={marcaDecor} proporcao={600 / 110} rotulo="Marca da Linha Decor MONO" className="w-[min(70%,300px)]" />
                  <p className="max-w-[56ch] text-[14px] leading-relaxed opacity-90">
                    Luminárias em fibra de PET reciclado e móveis utilitários em bambu. Peças de forma simples, feitas para
                    dar luz, silêncio e espaço à casa.
                  </p>
                </section>

                <nav aria-label="Links" className="flex flex-wrap gap-x-7 gap-y-3 text-[12.5px] uppercase tracking-[0.16em]">
                  <button
                    type="button"
                    onClick={() => {
                      fechar();
                      setAberta(true);
                    }}
                    className="uppercase tracking-[0.16em] underline-offset-4 hover:underline"
                  >
                    Sacola ({totalItens})
                  </button>
                  <a href={WHATS} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    Falar no WhatsApp
                  </a>
                  <a href="https://monobr.com" className="underline-offset-4 hover:underline">
                    Forros Natureshell
                  </a>
                  <a href="https://monobr.com/sobre" className="underline-offset-4 hover:underline">
                    Sobre a MONO
                  </a>
                </nav>
                <p className="text-[12px] opacity-70">Versão de teste da Linha Decor · preços fictícios e fotos provisórias.</p>
              </div>
            </div>

            <Lema className="mt-14 opacity-80" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
