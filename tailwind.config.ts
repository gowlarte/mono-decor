import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Grotesca variável, usada larga e fina nos títulos.
        decor: ["Archivo", "system-ui", "sans-serif"],
      },
      colors: {
        // Usadas pelo componente Sheet (gaveta da sacola).
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: "hsl(var(--secondary))",
        // Paleta da apresentação da Linha Decor (amostrada do PDF).
        decor: {
          creme: "#FCFCF0",
          tinta: "#141414",
          areia: "#C5B6A7",
          ardosia: "#7B90A1",
          bambu: "#805B33",
          leite: "#FFF3E6",
          linha: "#E6DDD2",
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config;
