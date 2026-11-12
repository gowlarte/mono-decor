/**
 * Sacola simulada da Linha Decor.
 *
 * Não existe checkout: "Finalizar" monta a lista do pedido e abre o WhatsApp
 * comercial com tudo preenchido. A sacola fica salva no navegador da pessoa
 * (localStorage) só por conveniência — se não der para salvar, ela continua
 * funcionando na sessão.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { WHATSAPP_NUMERO } from "@/data/contato";
import { formatarPreco, produtoPorId, type ProdutoId } from "./catalogo";

export interface ItemSacola {
  produto: ProdutoId;
  cor: string;
  quantidade: number;
}

interface SacolaContexto {
  itens: ItemSacola[];
  aberta: boolean;
  setAberta: (v: boolean) => void;
  adicionar: (produto: ProdutoId, cor: string, quantidade?: number) => void;
  alterarQuantidade: (produto: ProdutoId, cor: string, quantidade: number) => void;
  remover: (produto: ProdutoId, cor: string) => void;
  totalItens: number;
  subtotal: number;
}

const CHAVE = "mono-decor-sacola";
const Ctx = createContext<SacolaContexto | null>(null);

function lerSalva(): ItemSacola[] {
  try {
    const bruto = localStorage.getItem(CHAVE);
    const lista = bruto ? (JSON.parse(bruto) as ItemSacola[]) : [];
    return lista.filter((i) => produtoPorId[i.produto] && i.quantidade > 0);
  } catch {
    return [];
  }
}

export function SacolaProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemSacola[]>(lerSalva);
  const [aberta, setAberta] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(itens));
    } catch {
      /* navegador sem storage: segue só na memória */
    }
  }, [itens]);

  const adicionar = useCallback((produto: ProdutoId, cor: string, quantidade = 1) => {
    setItens((atual) => {
      const existe = atual.find((i) => i.produto === produto && i.cor === cor);
      if (existe) {
        return atual.map((i) => (i === existe ? { ...i, quantidade: i.quantidade + quantidade } : i));
      }
      return [...atual, { produto, cor, quantidade }];
    });
  }, []);

  const alterarQuantidade = useCallback((produto: ProdutoId, cor: string, quantidade: number) => {
    setItens((atual) =>
      quantidade <= 0
        ? atual.filter((i) => !(i.produto === produto && i.cor === cor))
        : atual.map((i) => (i.produto === produto && i.cor === cor ? { ...i, quantidade } : i)),
    );
  }, []);

  const remover = useCallback(
    (produto: ProdutoId, cor: string) => alterarQuantidade(produto, cor, 0),
    [alterarQuantidade],
  );

  const valor = useMemo<SacolaContexto>(() => {
    const totalItens = itens.reduce((s, i) => s + i.quantidade, 0);
    const subtotal = itens.reduce((s, i) => s + i.quantidade * produtoPorId[i.produto].preco, 0);
    return { itens, aberta, setAberta, adicionar, alterarQuantidade, remover, totalItens, subtotal };
  }, [itens, aberta, adicionar, alterarQuantidade, remover]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useSacola() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSacola precisa estar dentro de <SacolaProvider>");
  return ctx;
}

/** Mensagem do pedido inteiro, uma linha por item. */
export function mensagemPedido(itens: ItemSacola[], subtotal: number): string {
  const linhas = itens.map((i) => {
    const p = produtoPorId[i.produto];
    return `• ${i.quantidade}× ${p.nome} — cor ${i.cor} — ${formatarPreco(p.preco * i.quantidade)}`;
  });
  return [
    "Olá! Vim do site da MONO (Linha Decor) e quero fechar este pedido:",
    "",
    ...linhas,
    "",
    `Subtotal: ${formatarPreco(subtotal)}`,
    "",
    "Pode me confirmar disponibilidade, frete e prazo de entrega?",
  ].join("\n");
}

export function linkPedido(itens: ItemSacola[], subtotal: number): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagemPedido(itens, subtotal))}`;
}
