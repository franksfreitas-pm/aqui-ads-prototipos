---
Tema: Revisão da Experiência Mobile
Data: 2026-10-19
Tags: tracking, mixpanel, mobile, quick-wins
---

# Tracking Plan: Revisão Experiência Mobile (Rascunho)

> **Importante:** Este é um rascunho gerado pelo Slowking Tracking. Em conformidade com a Trava de Incerteza, nenhum evento foi presumido sem validação prévia. Todas as marcações abaixo aguardam a validação explícita do Franks antes de serem consolidadas em definitivo.

## Interações Prototipadas e Mapeamento

### 1. Seleção de Duração na Página de Resultados
- **Ação:** Alterar a duração na página de resultados.
- **Marcador no Protótipo:** `data-track="edit_duration"`
- **Status:** Proposta de novo gatilho (Aguardando Validação)
- **Gatilho Proposto:** Quando o anunciante altera o seletor de duração.
- **Propriedades Sugeridas:** `previous_duration`, `new_duration`

### 2. Seleção de Data de Início na Página de Resultados
- **Ação:** Alterar a data de início na página de resultados.
- **Marcador no Protótipo:** `data-track="edit_start_date"`
- **Status:** Proposta de novo gatilho (Aguardando Validação)
- **Gatilho Proposto:** Quando o anunciante escolhe uma nova data no seletor.
- **Propriedades Sugeridas:** `new_start_date`

### 3. Filtros Rápidos (Carrossel de Pílulas)
- **Ação:** Ativar/desativar pílulas de filtro rápido de OOH ou Rádio.
- **Marcador no Protótipo:** (Ausente no HTML - interação via `.ambience-chip`)
- **Status:** 🟡 Proposta de novo evento (Aguardando Validação)
- **Gatilho Proposto:** Quando o usuário clica em uma pílula do carrossel.
- **Propriedades Sugeridas:** `filter_category`, `filter_value`, `action` (selected/unselected)

### 4. Busca de Endereço (Fechamento do Teclado)
- **Ação:** Submissão do formulário de busca de endereço.
- **Marcador no Protótipo:** Interação do formulário `#address-search-form`
- **Status:** 🟡 Proposta de novo evento (Aguardando Validação)
- **Gatilho Proposto:** Quando o input dispara o fechamento do teclado via `.blur()`.
- **Propriedades Sugeridas:** `search_term_length`

### 5. Renomear Campanha no Checkout
- **Ação:** Editar o nome da campanha na tela de Resumo.
- **Marcador no Protótipo:** `data-track="rename_campaign_checkout"`
- **Status:** 🟡 Proposta de novo evento (Aguardando Validação)
- **Gatilho Proposto:** Quando o input de nome de campanha é preenchido e perde o foco.
- **Propriedades Sugeridas:** `has_custom_name` (boolean)

### 6. Editar Público-Alvo (Card Digital)
- **Ação:** Clicar no link "Editar" no resumo do Digital.
- **Marcador no Protótipo:** `data-track="edit_audience"`
- **Status:** 🟡 Proposta de novo evento (Aguardando Validação)
- **Gatilho Proposto:** Clique no atalho para editar público na tela de Resumo.
- **Propriedades Sugeridas:** `source_card` (Digital)

### 7. Realizar Pagamento (Barra Fixa do Resumo)
- **Ação:** Avançar no checkout através da nova barra fixa inferior.
- **Marcador no Protótipo:** `data-track="proceed_to_payment"`
- **Status:** 🟡 Proposta de novo evento (Aguardando Validação)
- **Gatilho Proposto:** Clique no botão "Realizar Pagamento" ou "Continuar".
- **Propriedades Sugeridas:** `cart_total_value`, `total_items`
