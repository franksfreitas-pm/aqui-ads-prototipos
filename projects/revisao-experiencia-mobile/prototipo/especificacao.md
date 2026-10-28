---
Tema: Especificação Técnica e de UX do Protótipo de Revisão Mobile
Data: 2026-10-13
Tags: [mobile, protótipo, especificação, UX, página de resultados]
---

# 1. Entendimento do Desafio (UX):
A solicitação visa otimizar as telas de Resultados (página de resultados) e Resumo/Checkout para a experiência mobile-first do Aqui Ads. O foco é reduzir o atrito e aumentar a conversão, retirando do modal filtros de alta relevância (como "Data de Início"), melhorando a clareza nas ações de edição de duração e público-alvo, e mantendo dados cruciais (como "Valor Total") sempre visíveis.

# 2. Solução Proposta (Baseada no Pontooh DS):
O design agora reflete estritamente a "Aqui Ads Library v.2.2" e o "Pontooh DS Global".
- **Tela de Resultados:**
  - Barra de filtros promovida a componente `sticky` no topo.
  - "Data de Início" e "Editar Duração" (com chevron explícito) aplicados em componentes de Formulário/Entrada nativos.
- **Tela de Resumo / Checkout:**
  - Aplicação de `Bottom Navigation Bar` fixa com o Valor Total e o botão principal (`Button variant="primary"`).
  - Ação "Renomear Campanha" destacada.
  - Botão "Editar público-alvo" aplicado de forma contextual.
- **Cores & Tokens (Strict Light Mode):**
  - Fundo principal: `$Surface/Neutral-default` (`#F8F9FA` a `#FFFFFF`).
  - Botões de destaque e CTAs primários: `$Surface/Action-primary` (Cor concreta `#FF6B00` Laranja da marca).
  - Textos: `$Text/Primary` escuro garantindo alta luminância de contraste.
- **Viewport Canônico Mobile:** O layout foi pensado para a resolução primária `390x844px`.

# 3. Comportamento Mobile vs Desktop:
- **Mobile:** Foco absoluto em *touch targets* (mínimo de 44x44pt). O uso de barras fixas no topo (filtros) e rodapé (checkout) maximiza o controle sem ocupar espaço de conteúdo permanente. Menus modais/gavetas são restritos a ações secundárias.
- **Desktop:** A barra fixa do checkout pode transicionar para um painel lateral persistente (`Drop sheet/Cart`). A barra de filtros no topo ganharia formato mais extenso em linha única.

# 4. Mockup Visual:
A imagem gerada (C:\Users\franks.freitas\.gemini\antigravity\brain\7e230539-9483-47c6-8c49-9606907926ab\aqui_ads_pontooh_ds_mobile_mockups_1791923934823.png) representa as telas discutidas. Ela segue a diretriz *Light Mode* absoluta do Aqui Ads, com botões primários laranjas e fidelidade ao design system.

# 5. Especificação de Handoff (Para o Machamp):
- **Filtros página de resultados:** Usar `position: sticky; top: 0; z-index: 10;`.
- **Editar Duração:** Implementar com input selector contendo chevron-down nativo.
- **Bottom Bar Checkout:** Usar `position: fixed; bottom: 0; width: 100%;` com box-shadow suave para diferenciar do conteúdo.
- **Tokens do Código:**
  - Cor do botão avançar e destaques: `$color/brand/orange-500` (ou token correspondente `$Surface/Action-primary`).
  - Superfícies dos cartões: `$Surface/Neutral-default` (Branco).

# 6. Pontos de Atenção/Sugestões:
- **Teclado Virtual:** Atenção à barra fixa inferior na tela de checkout quando o teclado for acionado (ex: ao renomear campanha).
- **Instrumentação:** Lembrar de acionar o agente de Tracking para instrumentar os eventos no Mixpanel.
