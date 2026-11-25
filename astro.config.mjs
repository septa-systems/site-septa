// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

// CT06: no build de produção (PRODUCAO=1) nenhum dado PENDENTE pode ir ao ar.
// Os valores pendentes viram <span data-pendente> no HTML (src/components/Pendente.astro).
/** @returns {import("astro").AstroIntegration} */
function travaPendente() {
  return {
    name: "trava-pendente",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        if (process.env.PRODUCAO !== "1") return;
        const raiz = fileURLToPath(dir);
        const achados = [];
        for (const arquivo of await readdir(raiz, { recursive: true })) {
          if (!arquivo.endsWith(".html")) continue;
          const html = await readFile(join(raiz, arquivo), "utf8");
          if (html.includes("data-pendente") || html.includes("wa.me/PENDENTE"))
            achados.push(arquivo);
        }
        if (achados.length) {
          throw new Error(
            `Dados PENDENTE no site (src/config/site.ts). Preencha antes de publicar: ${achados.join(", ")}`,
          );
        }
      },
    },
  };
}

// URL final do site (SEO e sitemap). Domínio ainda não comprado: PRD, dúvida 4.
export default defineConfig({
  site: "https://septasystems.com.br",
  integrations: [sitemap(), travaPendente()],
});
