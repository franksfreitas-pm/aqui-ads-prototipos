# Catálogo Oficial de Templates Higienizados — Aqui Ads (`Clone & Edit` Modular v2)

Esta pasta contém o **Kit Oficial Compilado (`smb-web`) + Componentes Modulares** e os **Templates Canônicos Higienizados** do Aqui Ads, sincronizados com o repositório oficial de produção (`codebase/smb-web`) e com os prints de produção em `projects/espelho_producao/`.

> **Regra de Ouro (`Clone & Edit` Obrigatório e Proibição de Monólitos):**
> - É **terminantemente proibido** recriar páginas HTML de 6.400 linhas do zero ou duplicar a casca inteira da plataforma dentro do `index.html` de cada protótipo.
> - Toda a estrutura oficial da plataforma (Header branco oficial, Menu Lateral, Alternador Desktop / Mobile `390px`, Página de Resultados OOH e Digital | Globo, Resumo do Plano / Carrinho, Envio de Arte, Checkout / Pagamento, Meus Anúncios / Rascunhos / Métricas, Modais e Toasts) vive centralizada no **Kit Oficial Modular** (`aqui_ads_official.css` + `aqui_ads_mock_data.js` + `aqui_ads_ui.js`).
> - Cada template `.html` (e cada protótipo derivado) possui apenas **~90 a 200 linhas**, declarando a tela inicial (`initialScreen`), o preset de carrinho (`cartPreset`) e os **Hooks de Extensão** (`hooks`) para customizar apenas o que muda naquela iniciativa!
> - **Natureza Exclusivamente Mock (`aqui_ads_mock_data.js`):** Todos os dados desta pasta são 100% simulados e agnósticos, destinados exclusivamente à construção visual de protótipos.
> - **Trava de Proteção:** É proibido alterar ou sobrescrever qualquer arquivo dentro de `projects/espelho_producao/templates/` silenciosamente. Qualquer evolução no Kit Oficial (`aqui_ads_official.css`, `aqui_ads_mock_data.js`, `aqui_ads_ui.js` ou templates `.html`) exige aviso prévio e aprovação explícita do **Franks**.

---

## 1. Arquitetura do Kit Oficial Compilado (`smb-web`) + Componentes Modulares

| Arquivo do Kit Oficial | Papel na Arquitetura | O que entrega pronto |
| :--- | :--- | :--- |
| [aqui_ads_official.css](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/aqui_ads_official.css) | **Folha de Estilos e Design Tokens Oficiais (`smb-web`)** | Variáveis CSS oficiais extraídas de `codebase/smb-web/tailwind.config.cjs`, `adopt.css` e `Layout.astro`: tipografia `Rethink Sans`, paleta Light Mode (`--Main-Color-Black: #000929`, `--global-textSecondaryColor: #6C757D`, tema `elt` primário `#FF4F00`, secundário `#282E38`, terciário `#007800`, roxo OOH Digital `#3C20A6`, verde OOH Impresso `#009A61`), classes de ícones `elt-*`, escala `.apply-zoom` / `.fix-zoom` (`zoom: 0.8`) e moldura `.mobile-frame` (`390x844px`). |
| [aqui_ads_mock_data.js](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/aqui_ads_mock_data.js) | **Banco de Dados Mockado Central (`window.AQUI_ADS_MOCK_DATA`)** | Catálogo OOH (`oohCatalog` — 12 pontos com fotos, métricas e coordenadas), seções e catálogo Digital \| Globo (`digitalSections` + `digitalCatalog` — 20 formatos Display e Vídeo com CPM e selos coloridos), presets de carrinho (`cartPresets`: `empty`, `midiaMista` / `hybrid`, `ooh_only` / `oohOnly`, `digital_only` / `digitalOnly`), planos de mídia em 10 status (`mediaPlansCatalog`), rascunhos (`draftsCatalog`) e perfis PF/PJ (`billingProfiles`). |
| [aqui_ads_ui.js](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/aqui_ads_ui.js) | **Motor Modular de UI e Shell Oficial (`window.AquiAdsUI`)** | Injeta automaticamente a configuração oficial do Tailwind (`smb-web`), monta o Shell Oficial (Topbar Desktop/Mobile `390px`, Header branco oficial sem barra de admin, Menu Lateral, as 5 etapas completas da jornada, Rodapé Globo, Modais e Toast) e expõe a API declarativa `window.AQUI_ADS_CONFIG` + `window.AquiAdsUI.mount()` com sistema de `hooks`. |

---

## 2. Catálogo de Templates Modulares (~90 linhas cada)

| Arquivo Template | Tela Inicial (`initialScreen`) & Preset (`cartPreset`) | Quando Utilizar |
| :--- | :--- | :--- |
| [00_jornada_completa_aqui_ads.html](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/00_jornada_completa_aqui_ads.html) | `initialScreen: 'view-resultados'`, `initialChannel: 'ooh'`, `cartPreset: 'empty'` | **Padrão para fluxos ponta a ponta**, iniciando na Página de Resultados OOH com navegação fluida por todas as 5 etapas da jornada. |
| [00_shell_base_aqui_ads.html](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/00_shell_base_aqui_ads.html) | `shellOnly: true` (Renderiza `<main id="custom-prototype-root">`) | **Para telas 100% inéditas** que não pertencem às 5 telas padrão da jornada, mantendo Header oficial, Menu Lateral, Alternador Desktop/Mobile `390px`, Rodapé Globo e Toast. |
| [01_pagina_resultados_ooh.html](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/01_pagina_resultados_ooh.html) | `initialScreen: 'view-resultados'`, `initialChannel: 'ooh'`, `cartPreset: 'empty'` | Demandas na **Página de Resultados OOH**, cards de pontos, filtros de ambiente, busca de endereço, mapa ou barra inferior fixa. |
| [02_pagina_resultados_digital.html](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/02_pagina_resultados_digital.html) | `initialScreen: 'view-resultados'`, `initialChannel: 'digital'`, `cartPreset: 'empty'` | Demandas na **Página de Resultados Digital \| Globo**, segmentação de audiência, termômetro ou cards dos 20 formatos Display/Vídeo. |
| [03_resumo_plano_carrinho.html](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/03_resumo_plano_carrinho.html) | `initialScreen: 'view-resumo'`, `cartPreset: 'midiaMista'` | Demandas no **Resumo do Plano de Mídia (Carrinho)**, seleção em lote, cross-sell/upsell no carrinho, compartilhamento de proposta ou regras de mínimo. |
| [04_checkout_pagamento.html](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/04_checkout_pagamento.html) | `initialScreen: 'view-pagamento'`, `cartPreset: 'midiaMista'` | Demandas focadas em **Checkout e Pagamento** (PF/PJ, PIX, Cartão de Crédito em até 3x sem juros e resumo de valores). |
| [05_envio_de_arte.html](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/05_envio_de_arte.html) / [05_submissao_arte.html](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/05_submissao_arte.html) | `initialScreen: 'view-envio-arte'`, `cartPreset: 'midiaMista'` | Demandas no fluxo de **Envio de Criativos** (`Enviar minha arte`, `Utilizar modelos prontos` com editor interativo e `Contrate uma arte`). |
| [06_meus_anuncios_metricas_arte_faturamento.html](file:///C:/Users/franks.freitas/Projetos/Aqui-Ads/projects/espelho_producao/templates/06_meus_anuncios_metricas_arte_faturamento.html) | `initialScreen: 'screen-list'`, `initialTab: 'planos'`, `cartPreset: 'midiaMista'` | Demandas em **Meus Anúncios**, gestão de **Rascunhos**, cards de planos de mídia em 10 status ou detalhes da campanha (*Métricas*, *Arte*, *Faturamento*, *Locais*). |

---

## 3. Como Criar um Novo Protótipo em 1 Segundo (`Clone & Edit` Modular)

### Passo 1: Clonar o Kit Oficial e o Template Escolhido para a Pasta do Protótipo
```powershell
$protoDir = "C:\Users\franks.freitas\Projetos\Aqui-Ads\projects\<nome-da-iniciativa>\prototipo"
$tplDir   = "C:\Users\franks.freitas\Projetos\Aqui-Ads\projects\espelho_producao\templates"

New-Item -ItemType Directory -Force -Path $protoDir | Out-Null
Copy-Item "$tplDir\aqui_ads_official.css" "$protoDir\aqui_ads_official.css" -Force
Copy-Item "$tplDir\aqui_ads_mock_data.js" "$protoDir\aqui_ads_mock_data.js" -Force
Copy-Item "$tplDir\aqui_ads_ui.js"        "$protoDir\aqui_ads_ui.js"        -Force
Copy-Item "$tplDir\<arquivo_template>.html" "$protoDir\index.html"          -Force
```

### Passo 2: Customizar Apenas o Escopo da Iniciativa via `window.AQUI_ADS_CONFIG.hooks`
No arquivo `projects/<nome-da-iniciativa>/prototipo/index.html` (~90 linhas), edite cirurgicamente com `replace_file_content` apenas o objeto `window.AQUI_ADS_CONFIG`:

```javascript
window.AQUI_ADS_CONFIG = {
  initialScreen: 'view-resultados', // 'view-resultados' | 'view-resumo' | 'view-envio-arte' | 'view-pagamento' | 'screen-list'
  initialChannel: 'ooh',            // 'ooh' | 'digital'
  initialTab: 'planos',             // 'planos' | 'rascunhos'
  cartPreset: 'empty',              // 'empty' | 'midiaMista' | 'ooh_only' | 'digital_only'
  shellOnly: false,                 // true = usa <div id="custom-prototype-root"> para telas inéditas

  hooks: {
    // 1. Injetar barra/banner logo abaixo do Header Oficial (#main-header)
    afterHeader(api) {
      return '';
    },

    // 2. Injetar componente/filtro no topo da Página de Resultados
    beforeResultsContent(api) {
      return '';
    },

    // 3. Customizar ou envelopar o Card de Ponto OOH na Página de Resultados
    renderOohCard(point, ctx, defaultRender) {
      return defaultRender(point);
    },

    // 4. Customizar ou envelopar o Card de Produto Digital | Globo
    renderDigitalCard(prod, ctx, defaultRender) {
      return defaultRender(prod);
    },

    // 5. Customizar a Barra Inferior Fixa (Sticky Bar) da Página de Resultados
    renderBottomBar(ctx, defaultRender) {
      return defaultRender();
    },

    // 6. Injetar bloco extra no Resumo do Plano de Mídia (ex.: Carrossel de Upsell)
    afterResumoContent(ctx) {
      return '';
    },

    // 7. Callback executado assim que o DOM Oficial e os Catálogos estiverem prontos
    onReady(api) {
      // Ex.: adicionar modais específicos da iniciativa ou listeners extras
    }
  }
};
```
