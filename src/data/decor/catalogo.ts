/**
 * Fonte única da Linha Decor (Luminae + Objecta).
 *
 * Textos e cores vêm da apresentação "Linha Decor MONO — Proposta de varejo"
 * (nov/2026). Especificações das luminárias vêm da ficha do fornecedor.
 *
 * ATENÇÃO — conteúdo provisório:
 * - Todos os preços são FICTÍCIOS, só para testar a vitrine de varejo.
 * - Recortes de produto (*-produto.webp) vêm dos PNGs da pasta MKT/MONO/LINHA
 *   DECOR; fotos de ambiente e o detalhe da mesa foram extraídos do PDF.
 *   Ambos são baixa resolução e, em parte, imagens de referência: trocar por
 *   fotos próprias antes de publicar.
 * - Diâmetro/altura de Régia e Ovni e as medidas dos móveis de bambu ainda
 *   não chegaram: aparecem como "em breve".
 */

import regiaAmbiente from "@/assets/decor/regia-ambiente.webp";
import regiaProduto from "@/assets/decor/regia-produto.webp";
import ovniAmbiente from "@/assets/decor/ovni-ambiente.webp";
import ovniProdutoA from "@/assets/decor/ovni-produto-caramelo.webp";
import ovniProdutoB from "@/assets/decor/ovni-produto-ceu.webp";
import koboAmbiente from "@/assets/decor/kobo-ambiente.webp";
import koboProduto from "@/assets/decor/kobo-produto.webp";
import angulaAmbiente from "@/assets/decor/angula-ambiente.webp";
import angulaProduto from "@/assets/decor/angula-produto.webp";
import mesaDetalhe from "@/assets/decor/mesa-detalhe.webp";
import mesaProduto from "@/assets/decor/mesa-produto.webp";
import arcoProduto from "@/assets/decor/arco-produto.webp";

export type FamiliaId = "luminae" | "objecta";
export type ProdutoId = "regia" | "ovni" | "kobo" | "angula" | "mesa-elevante" | "arco-modular";

export interface Cor {
  nome: string;
  hex: string;
}

export interface Especificacao {
  rotulo: string;
  valor: string;
}

export interface Produto {
  id: ProdutoId;
  familia: FamiliaId;
  /** Nome curto: título gigante da tela e rótulo do ícone. */
  nomeCurto: string;
  nome: string;
  /** Etiqueta em pílula (material). */
  material: string;
  descricao: string[];
  cores: Cor[];
  /** Preço fictício, em reais. */
  preco: number;
  /** Unidade de venda exibida ao lado do preço. */
  unidade: string;
  especificacoes: Especificacao[];
  imagens: {
    ambiente?: string;
    produto: string[];
    detalhe?: string;
  };
}

/** Parcelamento exibido abaixo do preço (fictício, como o preço). */
export const PARCELAS = 10;

export const familias: Record<FamiliaId, { nome: string; subtitulo: string; material: string }> = {
  luminae: {
    nome: "Luminae",
    subtitulo: "Luminárias em fibra de poliéster",
    material: "Fibra de poliéster",
  },
  objecta: {
    nome: "Objecta",
    subtitulo: "Móveis utilitários em bambu",
    material: "Bambu",
  },
};

const EM_BREVE = "Em breve";

/** O que vale para as três luminárias em fibra de PET. */
export const fichaLuminae = {
  sobre:
    "Os painéis de fibra de poliéster nasceram para melhorar a acústica dos ambientes. Com as cidades cada vez mais barulhentas, o ruído virou uma questão de qualidade de vida — e esse material foi desenvolvido para diminuir o eco e a interferência sonora dentro de casa e do escritório, sem abrir mão da sustentabilidade.",
  destaques: [
    { valor: "60%", rotulo: "de PET reciclado pós-consumo" },
    { valor: "αw 0,60", rotulo: "de absorção sonora, com 50 mm de afastamento" },
    { valor: "Classe A", rotulo: "em reação ao fogo (ASTM E84)" },
  ],
  especificacoes: [
    { rotulo: "Material", valor: "100% PET, sendo 60% reciclado pós-consumo" },
    { rotulo: "Espessura do feltro", valor: "5 a 24 mm (±7%)" },
    {
      rotulo: "Absorção sonora (αw)",
      valor: "0,30 fixação direta · 0,45 com 20 mm de afastamento · 0,60 com 50 mm de afastamento",
    },
    { rotulo: "Reação ao fogo", valor: "BS EN 13501-1: B-s1, d0 · ASTM E84: Classe A" },
    { rotulo: "Ensaios acústicos", valor: "AS ISO 11654, AS ISO 354 e ASTM C423" },
  ] satisfies Especificacao[],
};

export const produtos: Produto[] = [
  {
    id: "regia",
    familia: "luminae",
    nomeCurto: "Régia",
    nome: "Luminária Régia",
    material: "Fibra de poliéster",
    descricao: [
      "Inspirada no formato da planta aquática Victoria Amazônica, ou Vitória Régia, como também é conhecida. Esta luminária pode vir em diversos tamanhos e cores, para que haja ampla possibilidade de combinações ao compor um ambiente.",
    ],
    cores: [
      { nome: "Creme", hex: "#EBDFCF" },
      { nome: "Céu", hex: "#A2C6E1" },
      { nome: "Musgo", hex: "#314225" },
    ],
    preco: 1290,
    unidade: "unidade",
    especificacoes: [
      { rotulo: "Tipo", valor: "Pendente" },
      { rotulo: "Diâmetro e altura", valor: EM_BREVE },
      { rotulo: "Feltro", valor: "PET 5 a 24 mm" },
    ],
    imagens: { ambiente: regiaAmbiente, produto: [regiaProduto] },
  },
  {
    id: "kobo",
    familia: "luminae",
    nomeCurto: "Kobo",
    nome: "Luminária Kobo",
    material: "Fibra de poliéster",
    descricao: [
      "Uma luminária modular, inspirada nos cobogós, que são marca registrada da arquitetura brasileira e orgulho nacional. Pra quem quer ter uma iluminação indireta em ambientes mais intimistas, esta é uma opção de simples aplicação e fácil alteração quando necessário.",
    ],
    cores: [
      { nome: "Concreto Gelo", hex: "#9FA8B9" },
      { nome: "Tijolinho", hex: "#9F5D46" },
      { nome: "Verde Navy", hex: "#394B4F" },
    ],
    preco: 690,
    unidade: "módulo 60 × 60 cm",
    especificacoes: [
      { rotulo: "Módulo", valor: "600 × 600 × 100 mm (±2 mm)" },
      { rotulo: "Material", valor: "100% fibra de poliéster (60% reciclada pós-consumo)" },
      { rotulo: "Iluminação", valor: "Fita de LED integrada" },
    ],
    imagens: { ambiente: koboAmbiente, produto: [koboProduto] },
  },
  {
    id: "ovni",
    familia: "luminae",
    nomeCurto: "Ovni",
    nome: "Luminária Ovni",
    material: "Fibra de poliéster",
    descricao: [
      "Já chegou o disco voador? Uma forma redonda aberta com luz que se expande por todo o ambiente. Perfeito para combinar diferentes tamanhos em espaços que exigem dinamismo de formas.",
      "Além da decoração, iluminação e facilidade de manuseio, estas luminárias também fazem o papel de tratamento acústico: a forma aberta diminui o eco em salas muito grandes.",
    ],
    cores: [
      { nome: "Púrpura", hex: "#683079" },
      { nome: "Caramelo", hex: "#9F9081" },
      { nome: "Lotus", hex: "#FBB5B6" },
    ],
    preco: 890,
    unidade: "unidade",
    especificacoes: [
      { rotulo: "Tipo", valor: "Pendente com tratamento acústico" },
      { rotulo: "Diâmetro e altura", valor: EM_BREVE },
      { rotulo: "Feltro", valor: "PET 5 a 24 mm" },
    ],
    imagens: { ambiente: ovniAmbiente, produto: [ovniProdutoA, ovniProdutoB] },
  },
  {
    id: "angula",
    familia: "objecta",
    nomeCurto: "Ângula",
    nome: "Cadeira Ângula",
    material: "Bambu",
    descricao: [
      "Cadeira dobrável, compacta e resistente. Quando necessária, cumpre a função de assento estável. Quando não necessária, é facilmente fechada e guardada. Praticidade para quem precisa de espaço nos ambientes domésticos ou no escritório.",
    ],
    cores: [
      { nome: "Original", hex: "#D6C392" },
      { nome: "Azul Navy", hex: "#003D63" },
      { nome: "Castanho", hex: "#5D3E00" },
    ],
    preco: 590,
    unidade: "unidade",
    especificacoes: [
      { rotulo: "Tipo", valor: "Cadeira dobrável" },
      { rotulo: "Medidas", valor: EM_BREVE },
      { rotulo: "Material", valor: "Bambu" },
    ],
    imagens: { ambiente: angulaAmbiente, produto: [angulaProduto] },
  },
  {
    id: "mesa-elevante",
    familia: "objecta",
    nomeCurto: "Elevante",
    nome: "Mesa Elevante",
    material: "Bambu",
    descricao: [
      "Uma estrutura de aço inox resistente, com controle de elevação e uma chapa de bambu ergonômica. Transforma qualquer home office em uma estação de trabalho eficiente. Leve e fácil de desmontar, ideal para quem precisa ficar durante muito tempo na frente do computador.",
    ],
    cores: [{ nome: "Original", hex: "#D6C392" }],
    preco: 3490,
    unidade: "unidade",
    especificacoes: [
      { rotulo: "Estrutura", valor: "Aço inox com controle de elevação" },
      { rotulo: "Tampo", valor: "Chapa de bambu ergonômica" },
      { rotulo: "Medidas", valor: EM_BREVE },
    ],
    imagens: { detalhe: mesaDetalhe, produto: [mesaProduto] },
  },
  {
    id: "arco-modular",
    familia: "objecta",
    nomeCurto: "Arco Modular",
    nome: "Cadeira Arco Modular",
    material: "Bambu",
    descricao: [
      "Depois de um dia de trabalho, relaxar em uma espreguiçadeira ergonômica é a recompensa ideal para quem preza pelo conforto. Versátil, a Cadeira Arco Modular é separada em duas partes que podem ser usadas em diferentes contextos: uma cadeira com encosto e um descanso para as pernas.",
    ],
    cores: [{ nome: "Original", hex: "#D6C392" }],
    preco: 2290,
    unidade: "conjunto (cadeira + descanso)",
    especificacoes: [
      { rotulo: "Tipo", valor: "Espreguiçadeira em duas peças" },
      { rotulo: "Medidas", valor: EM_BREVE },
      { rotulo: "Material", valor: "Bambu" },
    ],
    imagens: { produto: [arcoProduto] },
  },
];

export const produtoPorId = Object.fromEntries(produtos.map((p) => [p.id, p])) as Record<
  ProdutoId,
  Produto
>;

export const formatarPreco = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
