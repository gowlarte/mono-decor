import { motion } from "framer-motion";
import { Lema } from "./primitivos";
import { sobe, tela } from "./tema";

/**
 * Tela inicial. Os desenhos dos produtos (NavIcones) ficam no meio, fixos;
 * aqui entra só o que acompanha: o título para leitores de tela, a frase de
 * apresentação e o lema no rodapé.
 */
export function TelaInicio() {
  return (
    <motion.section
      variants={tela}
      initial="entra"
      animate="mostra"
      exit="sai"
      aria-labelledby="titulo-decor"
      className="relative h-[100svh] min-h-[600px]"
    >
      <h1 id="titulo-decor" className="sr-only">
        Linha Decor MONO — luminárias em feltro PET e móveis em bambu
      </h1>
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 lg:px-[2.2vw] lg:pb-[3.6vh]">
        <motion.div variants={sobe}>
          <Lema className="opacity-90" />
        </motion.div>
      </div>
    </motion.section>
  );
}
