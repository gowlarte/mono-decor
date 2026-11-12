import { useEffect, useState, type CSSProperties } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { SacolaProvider, useSacola } from "@/data/decor/sacola";
import { produtoPorId, produtos, type ProdutoId } from "@/data/decor/catalogo";
import { CabecalhoDecor } from "@/components/decor/Cabecalho";
import { NavIcones } from "@/components/decor/NavIcones";
import { TelaInicio } from "@/components/decor/TelaInicio";
import { TelaProduto } from "@/components/decor/TelaProduto";
import { MenuDecor } from "@/components/decor/Menu";
import { GavetaSacola } from "@/components/decor/Sacola";
import { AREIA, temaDoFundo } from "@/components/decor/tema";

/**
 * Site da Linha Decor MONO (Luminae + Objecta), em teste.
 * Fora do Google (robots.txt e noindex) até a aprovação.
 *
 * / é a tela inicial (desenhos dos produtos); /:produto abre a tela do
 * produto. As duas são o mesmo componente, para a fileira de desenhos e o
 * fundo continuarem montados e animarem na troca.
 */
const Decor = () => (
  <SacolaProvider>
    <MotionConfig reducedMotion="user">
      <Experiencia />
    </MotionConfig>
  </SacolaProvider>
);

function Experiencia() {
  const { produto: idUrl } = useParams();
  const navigate = useNavigate();
  const { aberta: sacolaAberta } = useSacola();
  const [menuAberto, setMenuAberto] = useState(false);
  // Cor escolhida em cada produto; o fundo só muda quando a pessoa escolhe.
  const [cores, setCores] = useState<Partial<Record<ProdutoId, string>>>({});

  const produto = idUrl ? produtoPorId[idUrl as ProdutoId] : undefined;
  const corEscolhida = produto ? cores[produto.id] ?? null : null;
  const hex = produto?.cores.find((c) => c.nome === corEscolhida)?.hex;
  const tema = temaDoFundo(hex ?? AREIA);

  useEffect(() => {
    // Deixa as fotos em cache para a troca de tela não piscar.
    produtos.forEach((p) =>
      [...p.imagens.produto, p.imagens.ambiente, p.imagens.detalhe].forEach((src) => {
        if (src) new Image().src = src;
      }),
    );
  }, []);

  useEffect(() => {
    document.title = produto
      ? `${produto.nome} — Linha Decor | MONO`
      : "Linha Decor — Luminárias e móveis em bambu | MONO";
    window.scrollTo({ top: 0 });
  }, [produto]);

  // ← e → passam de produto em produto.
  useEffect(() => {
    if (!produto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (menuAberto || sacolaAberta || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const alvo = e.target as HTMLElement | null;
      if (alvo?.closest("input, textarea, select, [role=radiogroup]")) return;
      const i = produtos.findIndex((p) => p.id === produto.id);
      const passo = e.key === "ArrowRight" ? 1 : -1;
      navigate(`/${produtos[(i + passo + produtos.length) % produtos.length].id}`);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [produto, menuAberto, sacolaAberta, navigate]);

  if (idUrl && !produto) return <Navigate to="/" replace />;

  return (
    <div
      style={{ "--bg": tema.fundo, "--fg": tema.texto, "--inv": tema.inverso } as CSSProperties}
      className="relative min-h-[100svh] bg-[var(--bg)] font-decor text-[var(--fg)] transition-colors duration-700"
    >
      <CabecalhoDecor onMenu={() => setMenuAberto(true)} />
      <main>
        <AnimatePresence mode="wait">
          {produto ? (
            <TelaProduto
              key={produto.id}
              produto={produto}
              cor={corEscolhida}
              onCor={(nome) => setCores((c) => ({ ...c, [produto.id]: nome }))}
            />
          ) : (
            <TelaInicio key="inicio" />
          )}
        </AnimatePresence>
      </main>
      <NavIcones atual={produto?.id ?? null} />
      <MenuDecor aberto={menuAberto} onAberto={setMenuAberto} />
      <GavetaSacola />
    </div>
  );
}

export default Decor;
