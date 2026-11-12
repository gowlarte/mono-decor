/**
 * Tela de um produto, no layout de referência: especificações em pílulas no
 * topo, nome gigante, recorte do produto, texto e compra à esquerda; foto de
 * ambiente à direita; desenhos dos outros produtos na barra de baixo
 * (NavIcones). No celular tudo empilha e rola.
 */

import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PARCELAS, formatarPreco, type Produto } from "@/data/decor/catalogo";
import { useSacola } from "@/data/decor/sacola";
import { IconeProduto } from "./primitivos";
import { cortina, linhaTitulo, sobe, tela, zoomFoto } from "./tema";

interface Props {
  produto: Produto;
  /** Cor escolhida (nome) ou null enquanto a pessoa não escolheu. */
  cor: string | null;
  onCor: (nome: string) => void;
}

export function TelaProduto({ produto, cor, onCor }: Props) {
  const foto = produto.imagens.ambiente ?? produto.imagens.detalhe;

  return (
    <motion.article
      variants={tela}
      initial="entra"
      animate="mostra"
      exit="sai"
      aria-labelledby={`titulo-${produto.id}`}
      className="relative px-5 pb-36 pt-24 md:px-10 lg:h-[100svh] lg:min-h-[640px] lg:p-0"
    >
      <div className="flex flex-col gap-9 lg:absolute lg:bottom-[19vh] lg:left-[5vw] lg:right-[40vw] lg:top-[max(92px,16vh)] lg:gap-[4.5vh]">
        <Especificacoes produto={produto} />

        <div className="grid gap-9 lg:min-h-0 lg:flex-1 lg:grid-cols-[1.08fr_1fr] lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-x-[3.6vw] lg:gap-y-[4vh]">
          <Titulo produto={produto} />
          <Descricao produto={produto} className="order-3 lg:order-none lg:col-start-2 lg:row-start-1 lg:self-center" />
          <motion.div
            variants={sobe}
            className="order-2 flex min-h-0 items-center justify-center gap-[4%] lg:order-none lg:col-start-1 lg:row-start-2 lg:justify-start"
          >
            {foto ? (
              produto.imagens.produto.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={i === 0 ? `${produto.nome}, foto do produto` : ""}
                  decoding="async"
                  className={cn(
                    "max-h-[44vh] min-w-0 object-contain lg:h-full lg:max-h-full",
                    produto.imagens.produto.length > 1 ? "w-[46%] lg:w-auto lg:max-w-[48%]" : "w-full max-w-[420px] lg:w-auto lg:max-w-full",
                  )}
                />
              ))
            ) : (
              // Sem foto de ambiente: o desenho de linha ocupa o lugar do recorte.
              <IconeProduto id={produto.id} className="w-[70%] max-w-[360px] lg:w-auto lg:h-[min(100%,26vh)] lg:max-w-full" />
            )}
          </motion.div>
          <Compra
            produto={produto}
            cor={cor}
            onCor={onCor}
            className="order-4 lg:order-none lg:col-start-2 lg:row-start-2 lg:self-start"
          />
        </div>
      </div>

      <motion.figure
        variants={cortina}
        className={cn(
          "mt-12 overflow-hidden lg:absolute lg:bottom-[3vh] lg:right-[5vw] lg:top-[14vh] lg:mt-0 lg:w-[33vw]",
          foto ? "aspect-[4/5] lg:aspect-auto" : "grid place-items-center bg-black/[0.06] p-8",
        )}
      >
        <motion.img
          variants={zoomFoto}
          src={foto ?? produto.imagens.produto[0]}
          alt={foto ? `${produto.nome} em um ambiente` : `${produto.nome}, foto do produto`}
          decoding="async"
          className={cn("h-full w-full", foto ? "object-cover" : "object-contain")}
        />
      </motion.figure>
    </motion.article>
  );
}

/** Até três especificações em pílula + valor, como no topo do layout. */
function Especificacoes({ produto }: { produto: Produto }) {
  return (
    <motion.dl variants={sobe} className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      {produto.especificacoes.slice(0, 3).map((e) => (
        <div key={e.rotulo} className="flex min-w-0 items-center gap-3 lg:gap-[1vw]">
          <dt className="shrink-0 rounded-full border border-current px-4 py-[3px] font-decor text-[10.5px] font-light tracking-[0.04em] lg:text-[min(0.68vw,1.2vh)]">
            {e.rotulo}
          </dt>
          <dd className="font-decor text-[12px] font-light tracking-[0.01em] opacity-90 lg:text-[max(11px,min(0.68vw,1.2vh))]">
            {e.valor}
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}

/**
 * Nome gigante. O tamanho sai do número de letras da linha mais longa, para
 * "Kobo" e "Elevante" ocuparem a mesma largura de coluna.
 */
function Titulo({ produto }: { produto: Produto }) {
  const linhas = produto.nomeCurto.split(" ");
  const maior = Math.max(...linhas.map((l) => l.length));
  const t = Math.min(9.5, 30 / (0.68 * maior));
  return (
    <h1
      id={`titulo-${produto.id}`}
      style={{ "--t": t } as CSSProperties}
      className="order-1 font-decor font-extralight leading-[0.92] tracking-[-0.035em] [font-size:calc(var(--t)*2.7vw)] [font-stretch:125%] lg:order-none lg:col-start-1 lg:row-start-1 lg:self-center lg:[font-size:min(calc(var(--t)*1vw),calc(var(--t)*1.7vh))]"
    >
      {linhas.map((l) => (
        <span key={l} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span variants={linhaTitulo} className="block">
            {l}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function Descricao({ produto, className }: { produto: Produto; className?: string }) {
  return (
    <motion.div
      variants={sobe}
      className={cn(
        "max-w-[46ch] space-y-3 font-decor text-[14px] leading-[1.42] tracking-[0.01em] lg:text-[max(12.5px,min(0.86vw,1.55vh))]",
        className,
      )}
    >
      {produto.descricao.map((p) => (
        <p key={p.slice(0, 24)}>{p}</p>
      ))}
    </motion.div>
  );
}

/** Amostras de cor, preço, quantidade e "Adicionar à sacola". */
function Compra({ produto, cor, onCor, className }: Props & { className?: string }) {
  const { adicionar, setAberta } = useSacola();
  const [qtd, setQtd] = useState(1);
  // Com uma cor só, não há o que escolher.
  const corCompra = cor ?? (produto.cores.length === 1 ? produto.cores[0].nome : null);

  return (
    <motion.div variants={sobe} className={cn("flex flex-col gap-[max(18px,3vh)]", className)}>
      <div role="radiogroup" aria-label={`Cor da ${produto.nome}`} className="flex gap-[max(14px,1.1vw)]">
        {produto.cores.map((c) => {
          const ativa = c.nome === cor;
          return (
            <button
              key={c.nome}
              type="button"
              role="radio"
              aria-checked={ativa}
              onClick={() => onCor(c.nome)}
              className="group flex flex-col items-center gap-2 focus-visible:outline-none"
            >
              <span className="whitespace-nowrap font-decor text-[11.5px] tracking-[-0.01em] [font-stretch:80%] lg:text-[max(11px,min(0.72vw,1.3vh))]">
                {c.nome}
              </span>
              <span
                className={cn(
                  "block size-12 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[3px] transition-[outline-color,transform] duration-300 lg:size-[min(3.1vw,5.6vh)]",
                  ativa ? "outline-current" : "outline-transparent group-hover:scale-105",
                  "group-focus-visible:outline-2 group-focus-visible:outline-current",
                )}
                style={{ backgroundColor: c.hex }}
              />
            </button>
          );
        })}
      </div>

      <div>
        <p className="font-decor font-light leading-none">
          <span className="text-[34px] tracking-[-0.01em] [font-stretch:125%] lg:text-[min(2.3vw,4.1vh)]">
            {formatarPreco(produto.preco)}
          </span>
          <span className="ml-1.5 text-[13px] tracking-[-0.01em] [font-stretch:72%] lg:text-[min(1vw,1.8vh)]">
            / {produto.unidade}
          </span>
        </p>
        <p className="mt-[1.2vh] font-decor text-[15px] font-light [font-stretch:125%] lg:text-[min(1.2vw,2.1vh)]">
          ou {PARCELAS}× de {formatarPreco(produto.preco / PARCELAS)} sem juros
        </p>
        <p className="mt-2 font-decor text-[11.5px] opacity-70 xl:hidden">Preço fictício · versão de teste</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-9 items-center rounded-full border border-current">
          <button
            type="button"
            aria-label="Diminuir quantidade"
            onClick={() => setQtd((q) => Math.max(1, q - 1))}
            disabled={qtd <= 1}
            className="grid h-full w-8 place-items-center disabled:opacity-40"
          >
            <Minus size={13} strokeWidth={1.4} />
          </button>
          <span aria-live="polite" className="w-4 text-center font-decor text-[14px] font-light tabular-nums">
            {qtd}
          </span>
          <button
            type="button"
            aria-label="Aumentar quantidade"
            onClick={() => setQtd((q) => q + 1)}
            className="grid h-full w-8 place-items-center"
          >
            <Plus size={13} strokeWidth={1.4} />
          </button>
        </div>
        <button
          type="button"
          disabled={!corCompra}
          onClick={() => {
            if (!corCompra) return;
            adicionar(produto.id, corCompra, qtd);
            setQtd(1);
            setAberta(true);
          }}
          className="h-9 flex-1 rounded-full bg-[var(--fg)] px-7 font-decor text-[12px] font-normal uppercase tracking-[0.12em] text-[var(--inv)] transition-[opacity,background-color,color] duration-700 [font-stretch:125%] hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-55 sm:flex-none"
        >
          {corCompra ? "Adicionar à sacola" : "Escolha a cor"}
        </button>
      </div>
    </motion.div>
  );
}
