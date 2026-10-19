---
Tema: Diagnóstico Consolidado de Auditoria do Mixpanel (Catálogo de Eventos, Código-Fonte e Governança de Propriedades)
Data: 2026-10-19
Tags: [mixpanel, dicionario-de-eventos, tracking-plan, governanca-de-dados, taxonomia, auditoria, propriedades, smb-api, smb-web]
---

# Diagnóstico Consolidado de Auditoria do Mixpanel — Aqui Ads

Esta análise definitiva consolida a auditoria técnica e de negócio da implementação do Mixpanel (Projeto `3387295`), cruzando três camadas da plataforma:
1. **Dicionário de Eventos do Mixpanel:** Eventos cadastrados na plataforma, visibilidade nos relatórios, status de descarte e cobertura de descrições.
2. **Mapeamento de Código-Fonte (`smb-api` e `smb-web`):** Varredura dos disparos ativos nos 13 módulos de produto em produção versus eventos legados e de homologação fora do código atual.
3. **Inspeção de Payloads Reais em Produção:** Auditoria das propriedades efetivamente enviadas em cada evento, tipagem de dados, conformidade com a LGPD (vazamento de dados pessoais) e consistência de chaves entre frontend e backend.

---

## 1. Panorama Quantitativo e Saúde da Base

A base do Mixpanel conta atualmente com **151 eventos** registrados no Dicionário de Eventos da plataforma. O cruzamento entre o volume dos últimos 30 dias, a presença nos repositórios oficiais (`smb-api` e `smb-web`) e o diagnóstico de taxonomia revela o seguinte cenário:

### 1.1. Indicadores Globais de Eventos

| Dimensão Auditada | Métrica | Volume | Participação | Diagnóstico Executivo |
| :--- | :--- | :---: | :---: | :--- |
| **Total de Eventos no Mixpanel** | Base bruta registrada no catálogo | **151** | 100,0% | Inclui eventos ativos, inativos, legados e disparos de homologação |
| **Status de Volume (30 dias)** | Com Volume Recente | **106** | 70,2% | Eventos que receberam disparos reais nos últimos 30 dias |
| **Status de Volume (30 dias)** | Sem Volume (30d) | **45** | 29,8% | Eventos silenciados, fluxos sazonais ou código já removido |
| **Presença no Código-Fonte** | Presentes (`smb-api` / `smb-web`) | **129** | 85,4% | Distribuídos nos 13 módulos funcionais da plataforma |
| **Presença no Código-Fonte** | Fora do Código Atual (Legado/Dev) | **22** | 14,6% | Lixo histórico no catálogo, testes A/B antigos e eventos de sandbox |
| **Visibilidade no Mixpanel** | Visíveis nos Relatórios | **136** | 90,1% | Poluem os seletores de relatórios com dezenas de eventos obsoletos |
| **Visibilidade no Mixpanel** | Ocultos (`Hidden`) / Descartados (`Dropped`) | **15** | 9,9% | 13 ocultos e 2 descartados na configuração atual do projeto |
| **Qualidade Taxonômica (Nomes)** | Gatilhos Válidos (Nomenclatura OK) | **97** | 64,2% | Nome do evento em `snake_case` válido, mas exigindo ajustes de propriedades |
| **Qualidade Taxonômica (Nomes)** | Eventos com Anomalias Estruturais | **54** | 35,8% | Duplicidades, erros de grafia, eventos guarda-chuva ou legado para descarte |

### 1.2. Radiografia por Módulo do Produto

O cruzamento direto com os repositórios `smb-api` e `smb-web` permitiu classificar todos os 151 eventos em **13 módulos ativos de produto** e **1 grupo de eventos fora do código atual**:

| Módulo do Produto | Total de Eventos | Com Volume (30d) | Sem Volume (30d) | Gatilhos Válidos | Com Anomalias de Nome/Escopo |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **1. Backend (`smb-api`)** | 1 | 1 | 0 | 1 | 0 |
| **2. Autenticação, Cadastro e Login** | 12 | 11 | 1 | 10 | 2 |
| **3. Navegação, Header e Ações Globais** | 8 | 7 | 1 | 5 | 3 |
| **4. Página de Resultados (Mapa e Lista)** | 13 | 13 | 0 | 11 | 2 |
| **5. Adição ao Carrinho, Plano de Mídia e Checkout** | 8 | 8 | 0 | 6 | 2 |
| **6. Propostas e Links Compartilháveis** | 5 | 5 | 0 | 5 | 0 |
| **7. Briefing IA e Planejador de Campanha** | 7 | 7 | 0 | 7 | 0 |
| **8. Envio de Criativos e Contrate uma Arte** | 18 | 14 | 4 | 5 | 13 |
| **9. Painel Meus Anúncios** | 18 | 15 | 3 | 17 | 1 |
| **10. Especificações Técnicas** | 5 | 3 | 2 | 3 | 2 |
| **11. Landing Pages e Captação de Leads** | 27 | 15 | 12 | 21 | 6 |
| **12. Assistente Virtual (Renata)** | 1 | 0 | 1 | 0 | 1 |
| **13. Condomínio e Faturamento** | 6 | 6 | 0 | 6 | 0 |
| **14. Legado / Fora do Código Atual** | 22 | 1 | 21 | 0 | 22 |
| **Total Consolidado** | **151** | **106** | **45** | **97** | **54** |

> **Importante:** Mesmo nos **97 eventos** cujo nome técnico segue o padrão `snake_case` ("Gatilhos Válidos"), a auditoria de payloads identificou que **87 deles exigem intervenção na camada de propriedades** (69 requerem padronização/limpeza de chaves e 18 necessitam de enriquecimento de propriedades de negócio).

---

## 2. Diagnóstico Estrutural de Eventos e Taxonomia

Os **54 eventos** que apresentam falhas de taxonomia, duplicidade ou obsolescência dividem-se em seis categorias críticas que distorcem a leitura de funis no Mixpanel.

### 2.1. Antipadrão de Evento Guarda-Chuva (`click_button`) e Cliques de Elemento UI

O problema mais grave de modelagem no frontend (`smb-web`) é o uso do evento genérico `click_button` como depósito universal de interações, somado a eventos legados nomeados a partir do componente visual (`button_*`) em vez da ação de negócio:

* **`click_button` (Módulo 3 — Ativo):** Disparado em múltiplos fluxos sem distinção semântica. Por funcionar como um evento guarda-chuva, acumulou **27 propriedades distintas de negócio** vazadas de outros domínios (como `code`, `discount`, `received_discount`, `total_discount`, `is_map_visible`, `map_view_state`, `item_id` e `plan_id`). Isso impede a construção de funis limpos sem filtros complexos de propriedades.
  * **Saneamento:** Renomear para `cta_clicked` restrito exclusivamente a CTAs globais de navegação, expurgando as 16 propriedades vazadas de cupom e da **página de resultados**.
* **Botões em `kebab-case` e Português (Módulo 14 — Sem Volume):**
  * `button_fale-com-especialista` $\rightarrow$ substituir pelo canônico `support_contact_initiated`.
  * `button_anunciar-agora` e `button_anuncie-agora` $\rightarrow$ duas variações verbais para o mesmo botão; consolidar em `lp_cta_clicked`.

### 2.2. Duplicidades Semânticas e Fragmentação de Funil

A plataforma possui eventos concorrentes medindo exatamente a mesma etapa da jornada do anunciante, forçando o uso de operadores `OR` em qualquer análise de conversão:

1. **Conflito no Topo de Navegação (`page_view` vs. `$mp_web_page_view`):**
   * O SDK Web do Mixpanel está com o rastreamento automático (`autocapture` de visualização de página) ativo em paralelo ao disparo manual de `page_view` no código. Ambos possuem volume recente, duplicando a contagem de sessões e páginas vistas.
   * **Saneamento:** Desativar `$mp_web_page_view` na inicialização do SDK e manter exclusivamente `page_view`.
2. **Fragmentação na Adição e Remoção do Carrinho (Módulos 4 e 5):**
   * `add_to_cart` e `remove_from_cart` coexistem com `cart_item_removed`, fragmentando a análise de abandono e edição do plano de mídia.
   * **Saneamento:** Padronizar `add_to_cart` (diferenciando o meio por `media_type`: `ooh`, `digital`, `radio`, `tv` e a origem por `placement`) e unificar a exclusão em `cart_item_removed`.
3. **Duplicidade no Funil de Autenticação e Cadastro (Módulo 2):**
   * Os eventos genéricos legados `login` e `sign_up` continuam ativos no código e disparando em paralelo aos eventos granulares do fluxo atual (`main_login_started`, `main_login_verification_sent`, `main_login_verified`, `main_login_completed` e `main_signup_started`, `main_signup_step_completed`, `main_signup_verification_sent`, `main_signup_verified`, `main_signup_completed`), além dos obsoletos `sign_up_started`, `account_access_requested`, `account_verification_started` e `account_verified`.
   * **Saneamento:** Deprecar `login` e `sign_up` em favor de `main_login_completed` e `main_signup_completed`.
4. **Cisma de Prefixos no Criador de Artes (`ac_site_*` vs. `ad_creator_*` — Módulo 8):**
   * O módulo de envio de criativos e **contrate uma arte** possui **13 eventos com anomalia de prefixo**. Coexistem duas famílias para a mesma ferramenta: `ac_site_tour_interacted`, `ac_site_asset_uploaded`, `ac_site_text_customized`, `ac_site_support_interacted`, `ac_site_model_changed`, `ac_site_template_selected`, `ac_site_submitted`, `ac_site_player_interacted`, `ac_site_style_changed`, `ac_site_exit_intent` competindo com `ad_creator_model_changed`, `ad_creator_player_interacted` e `ad_creator_interaction`.
   * **Saneamento:** Unificar toda a família sob o prefixo canônico `ad_creator_*` e eliminar os pares duplicados (`ac_site_model_changed` / `ad_creator_model_changed` e `ac_site_player_interacted` / `ad_creator_player_interacted`).
5. **Ambiguidade entre Checkout no Frontend e Pagamento no Backend (`purchase` vs. `payment_approved`):**
   * O evento `purchase` é disparado pelo frontend (`smb-web`) no momento em que o pedido é submetido no checkout (incluindo PIX e boletos ainda pendentes de compensação), enquanto `payment_approved` é disparado pelo backend (`smb-api`) apenas quando o pagamento é efetivamente liquidado. O nome `purchase` induz analistas a utilizá-lo erroneamente como métrica de receita aprovada.
   * **Saneamento:** Renomear `purchase` no frontend para `checkout_order_submitted`, mantendo `payment_approved` como única fonte oficial de receita no Mixpanel.
6. **Fragmentação de Profundidade de Rolagem (`scroll` vs. `scroll_reached`):**
   * `scroll` (ativo) e `scroll_reached` (sem volume) competem com eventos específicos de páginas (`R2home_lp_scrolled`, `realestate_lp_scroll_depth`, `ads_metrics_scroll_depth`, `creative_cloud_scroll_reached`, `inventory_scroll_reached`).

### 2.3. Erros de Grafia (Typos), Formatação e Inconsistência de Prefixos no Código Atual

Foram mapeados **12 eventos presentes no código-fonte (`smb-web`)** com erros gramaticais, violação de `snake_case` ou verbos fora do padrão no passado:

| Evento Atual no Código | Módulo | Problema Identificado | Nome Canônico Sugerido |
| :--- | :--- | :--- | :--- |
| `tv_lp_form_iniciated` | 11. Landing Pages | Erro de grafia em inglês (`iniciated` com "c") | `tv_lp_form_initiated` |
| `R2home_lp_scrolled` | 3. Navegação e Header | Violação de `snake_case` (`CamelCase` inicial) | `r2_home_lp_scrolled` |
| `R2home_cta_clicked` | 3. Navegação e Header | Violação de `snake_case` (`CamelCase` inicial) | `r2_home_cta_clicked` |
| `[R] proposal_downloaded` | 12. Assistente Virtual | Uso de colchetes e espaço no identificador | `proposal_downloaded` *(consolidar)* |
| `lead_generate` | 11. Landing Pages | Verbo no presente em vez do passado | `lead_generated` |
| `form_step` | 11. Landing Pages | Substantivo sem verbo indicando a ação concluída | `form_step_completed` |
| `partial_form_submit` | 11. Landing Pages | Falta verbo no passado e clareza de domínio | `lead_form_partially_submitted` |
| `ads_filter_applied` | 9. Painel Meus Anúncios | Prefixo divergente do restante do módulo (`my_ads_*`) | `my_ads_filter_applied` |
| `spec_template_downloaded` | 10. Especificações Técnicas | Prefixo no singular divergente de `specs_*` | `specs_template_downloaded` |
| `search_performed` | 10. Especificações Técnicas | Escopo ambíguo (confunde-se com busca de endereço OOH) | `specs_search_performed` |
| `studio_interaction` | 11. Landing Pages | Falta contexto explícito de Landing Page e verbo no passado | `creative_studio_lp_interacted` |

### 2.4. Poluição de Homologação (Sandbox) e Legado Fora do Código Atual

Existem **22 eventos** registrados no catálogo do Mixpanel que não constam mais no código-fonte atual (`in_codebase: false`) ou são disparos residuais de desenvolvimento que vazaram para o projeto de produção `3387295`:

* **Vazamento de Ambiente de Desenvolvimento:** `Visita - Página de Combos (Desenvolvimento)`, `Scroll Total da Página (Desenvolvimento)` e `Purchase Approved(Desenvolvimento)`.
* **Nomenclatura Legada em Português com Acentos e Espaços:** `Visita - Página de Combos`, `Scroll Total da Página`, `Lead Criado - Origem Combos`, `Início de Formulário`, `Formulário Enviado - Combos` e `Combo Selecionado`.
* **Eventos Obsoletos de Testes A/B e Fluxos Descontinuados:** `ab_test_conversion`, `ab_test_impression`, `upload_adcreator`, `account_access_requested`, `account_verification_started`, `account_verified`, `sign_up_started`, `$session_start`, `$mp_web_page_view`, `scroll_reached`, `button_fale-com-especialista`, `button_anunciar-agora` e `button_anuncie-agora`.

---

## 3. Diagnóstico Profundo de Governança de Propriedades

A inspeção direta dos eventos brutos (`raw_export.jsonl`) e dos objetos de disparo no código revelou que **todos os 106 eventos com volume recente enviam propriedades customizadas**, mas sofrem de ausência de contrato de dados. Ao todo, foram auditadas **1.222 ocorrências de propriedades** nos 151 eventos, resultando na seguinte distribuição de ações de governança:

| Ação de Governança na Propriedade | Quantidade de Ocorrências | Participação | Significado Técnico |
| :--- | :---: | :---: | :--- |
| **Manter (`keep`)** | **700** | 57,3% | Propriedades válidas e já aderentes ao padrão `snake_case` |
| **Adicionar (`add`)** | **230** | 18,8% | Propriedades de negócio ausentes hoje e necessárias para análise de funil |
| **Renomear (`rename`)** | **195** | 16,0% | Propriedades com erro de grafia, `PascalCase` ou nomes divergentes entre telas |
| **Remover (`remove`)** | **84** | 6,9% | Propriedades duplicadas, vazadas de outros fluxos, com espaços ou contendo PII |
| **Corrigir Tipo (`type_fix`)** | **13** | 1,1% | Métricas financeiras ou contadores numéricos enviados incorretamente como `String` |
| **Total de Regras Mapeadas** | **1.222** | **100,0%** | Cobertura integral dos 151 eventos do plano de rastreamento |

### 3.1. Descompasso entre o Dicionário de Eventos e os Payloads de Produção

Enquanto o catálogo de eventos do Mixpanel possui nomes amigáveis preenchidos em 135 eventos (89,4%) e descrições em 118 eventos (78,1%), **o catálogo de propriedades customizadas na plataforma encontra-se 100% sem descrições formais e sem trava de tipo de dado**. Na prática, qualquer texto ou objeto malformado enviado pelo frontend ou backend é aceito silenciosamente pelo Mixpanel.

### 3.2. Auditoria do Evento Crítico de Receita (`payment_approved` — Backend `smb-api`)

O evento `payment_approved` é a fonte primária de receita aprovada no Mixpanel, enviando atualmente **21 propriedades de negócio** (`coupon`, `currency`, `digital_items_count`, `discount`, `document_type`, `duration`, `email`, `internal_user`, `is_hibrid`, `is_ia_generated`, `name`, `ooh_items_count`, `payment_type`, `products`, `products_quantity`, `profile`, `send_by`, `subtotal`, `total`, `transaction_id`, `wallet_companies`). A inspeção do payload real identificou **6 problemas estruturais**:

1. **Erro de Grafia na Chave (`is_hibrid`):** A propriedade que identifica campanhas mistas (**OOH** + Mídia Digital) está grafada como `is_hibrid` (com "i") em vez de `is_hybrid`.
2. **Valores Monetários Enviados como `String` em vez de `Float`:** No payload real de produção, os campos financeiros trafegam entre aspas como texto (`"subtotal": "640.93"`, `"total": "739.93"`, `"discount": "0.00"`), além de `subtotal`, `total` e `discount` divergirem da nomenclatura usada no checkout do frontend (`total_value`, `total_discount`).
3. **JSON Serializado e Truncado Dentro de `products[].properties`:** O array `products` carrega objetos pesados do banco de dados nos quais a subpropriedade `properties` é uma string JSON escapada e truncada no meio da chave (`"{\"id\":\"PR40880\",...,\"product_type\":\"ponto"`), inflando o tamanho do evento (`$mp_event_size`: 4.129 bytes) com uma string corrompida impossível de quebrar em relatórios.
4. **Ausência de `campaign_id` na Raiz do Evento:** O identificador da campanha (`campaign_id`: `739870`) fica escondido dentro dos itens do array `products`, impedindo o cruzamento direto na raiz com os eventos anteriores do funil (`briefing_ia_*`, `media_plan_draft_saved`, `begin_checkout` e `proposal_downloaded`).
5. **Vazamento de Dados Pessoais (PII) em Eventos:** As chaves `email` (`larissabraga@...`) e `name` (razão social/nome do comprador) são disparadas diretamente no payload do evento, quando deveriam ser restritas ao perfil de usuário (*People Profile*: `$email` e `$name`) associado via `distinct_id`.
6. **Desalinhamento de Chaves com o Frontend:** Envia `products_quantity` (enquanto o checkout usa `items_count`), `products` (em vez de `items`), `duration` (em vez de `duration_days`) e `profile` (em vez de `profile_type`).

### 3.3. Poluição por Acoplamento no Evento Guarda-Chuva (`click_button`)

O evento `click_button` ilustra o efeito colateral de centralizar disparos distintos em uma mesma função utilitária no frontend. Hoje, seu payload mistura **27 propriedades** de três domínios incompatíveis:
* **Propriedades vazadas de validação de cupom de desconto:** `code`, `discount`, `received_discount`, `total_discount`, `incentivated`, `is_valid` e `message` (que pertencem exclusivamente ao evento `coupon_applied`).
* **Propriedades vazadas da página de resultados:** `is_map_visible`, `map_view_state` e `item_id` (que pertencem aos eventos `inventory_view_mode_changed`, `inventory_map_interacted` e `inventory_cta_clicked`).
* **Propriedades com erro de espaço inicial e redundância:** `" timestamp"` (com espaço em branco no início), `" cta_name"` (duplicada com espaço no início ao lado de `cta_name`), `page` (duplicada com `page_path`), `component` vs. `section_context`, e `redirect_url` vs. `destination`.

### 3.4. Inconsistências Globais de Chaves e Tipagem no Frontend (`smb-web`)

A varredura nas propriedades dos 128 eventos do frontend revelou vícios sistemáticos que se repetem em dezenas de disparos:

| Anomalia de Propriedade | Onde Ocorre | Impacto Analítico no Mixpanel | Padrão Definitivo (`suggested_properties`) |
| :--- | :--- | :--- | :--- |
| **`" timestamp"` e `" cta_name"` com espaço inicial** | `page_view`, `scroll`, `add_to_cart`, `view_item_list`, `begin_checkout`, `click_button` | Cria propriedades fantasmas no Dicionário de Eventos com espaço invisível no início e duplica o horário nativo do Mixpanel | **Remover** ambas as chaves imediatamente do wrapper de envio |
| **Divergência `plan_id` vs. `proposal_id` vs. `campaign_id`** | Módulos 4, 5, 6, 8, 9 e 13 | Impossibilita agrupar toda a jornada de uma mesma campanha pelo mesmo identificador global | Padronizar globalmente como **`campaign_id`** |
| **Divergência `is_logged` vs. `is_authenticated`** | Presente em mais de 90 eventos do frontend | Nome truncado (`is_logged`); falta padronização booleana clara | Padronizar globalmente como **`is_authenticated`** (`Boolean`) |
| **Divergência `step` vs. `step_number`** | Fluxos de cadastro, upload de criativos, Briefing IA e formulários de LP | Quebra funis baseados na evolução numérica de etapas | Padronizar como **`step_number`** (`Integer`) e **`step_name`** (`String`) |
| **Excesso de chaves concorrentes em `add_to_cart`** | Envia simultaneamente `id` e `item_id`; `name`, `title` e `item_name`; `value`, `price` e `relative_value`; `Exhibition_Root_Id` (em `Pascal_Snake_Case`) | Dúvida constante sobre qual propriedade somar ou agrupar ao analisar a **adição ao carrinho** na **página de resultados** | Manter apenas **`item_id`**, **`item_name`**, **`price`** (`Float`), **`exhibition_root_id`**, **`media_type`** e **`placement`** |
| **Vazamento de PII em Formulários e Autenticação** | `sign_up`, `login`, `form_submit`, `partial_form_submit`, `lead_generate` enviam `email`, `name`, `phone`, `cpf`, `cnpj` | Risco de governança e privacidade (LGPD) em logs de eventos analíticos | **Remover** dados pessoais dos eventos; enviar apenas via `mixpanel.people.set` e manter nos eventos somente `document_type` e `profile_type` |
| **Tipagem Numérica Incorreta (`String` em vez de `Float`/`Int`)** | `price`, `total_value`, `total_discount`, `budget`, `duration_days`, `results_count`, `file_size_mb` (13 ocorrências críticas) | Impede operações matemáticas nativas (`Sum`, `Average`, `Percentile`) nos relatórios de Insights | Forçar conversão numérica (`Number()` / `parseFloat()`) antes do disparo |

---

## 4. Pontos Cegos da Plataforma (Onde o Mixpanel Está sem Visibilidade)

Apesar do alto número de eventos cadastrados (151), o cruzamento com a jornada real do anunciante mostra lacunas importantes onde faltam propriedades de contexto ou eventos de falha:

1. **Invisibilidade de Erros e Recusas no Checkout:**
   * Temos o disparo de submissão no frontend (`purchase` $\rightarrow$ `checkout_order_submitted`) e a confirmação no backend (`payment_approved`), mas **não existe rastreamento estruturado de falha ou recusa de pagamento** (ex: erro de gateway, cartão recusado ou expiração de PIX) nem enriquecimento de `checkout_step_viewed` com a etapa exata em que o usuário abandonou o fluxo.
2. **Qualidade da Recomendação no Briefing IA (Módulo 7):**
   * Os 7 eventos do módulo (`briefing_ia_started`, `briefing_ia_step_completed`, `briefing_ia_goal_selected`, `briefing_ia_filters_applied`, `briefing_ia_completed`, `briefing_ia_recommendation_modified`, `briefing_ia_New_briefing_created`) não informam no fechamento (`briefing_ia_completed`) a composição detalhada do plano gerado (`recommended_items_count`, `recommended_ooh_count`, `recommended_digital_count`, `total_recommended_value`) nem o tipo de modificação feita pelo anunciante em `briefing_ia_recommendation_modified` (`modification_type`: adição, remoção ou troca de ponto).
3. **Busca sem Resultados na Página de Resultados (Demanda Reprimida — Módulo 4):**
   * O evento `inventory_address_search_executed` precisa garantir o envio consistente de `results_count` (`Integer`), `searched_city`, `searched_state` e `radius_km` (`Float`). Sem `results_count = 0` tipado numericamente, a operação fica cega para regiões onde anunciantes buscam telas de **OOH** e não encontram inventário disponível.
4. **Atribuição de Canal Assistido vs. Autosserviço no Produto (Módulo 6):**
   * Nos eventos de propostas (`proposal_downloaded`, `proposal_shared`, `proposal_link_copied`, `proposal_spreadsheet_downloaded`, `proposal_interaction`), falta a propriedade explícita `created_by_role` (`anunciante` vs. `executivo_de_vendas`) para separar no Mixpanel o compartilhamento orgânico de clientes do uso interno feito pelos **executivos de vendas**.
5. **Fluxo de Contrate uma Arte e Atendimento (Módulo 8):**
   * No evento `ad_details_designer_flow_interacted` (fluxo de **contrate uma arte**) e nos acionamentos de suporte (atendimento da **Helen**), faltam propriedades estruturadas indicando a etapa do pedido de criação (`designer_flow_step`), o status de aprovação da arte e o motivo do acionamento.

---

## 5. Matriz Consolidada de Saneamento e Esforço de Implementação

Abaixo está o plano técnico de execução estruturado por frente de atuação, relacionando o volume exato de alterações mapeadas em [tracking_plan_data.json](file:///C:/Users/franks.freitas/.gemini/antigravity/scratch/projects/tracking-governance/tracking_plan_data.json):

| Frente de Saneamento | Escopo Técnico Exato | Eventos Impactados | Responsável | Esforço Estimado |
| :--- | :--- | :---: | :--- | :---: |
| **1. Expurgo e Limpeza no Dicionário do Mixpanel** | Ocultar (`Hide`) / Descartar (`Drop`) os eventos fora do código atual, testes A/B descontinuados, eventos com acentos e sufixos `(Desenvolvimento)` | **22 eventos** (Módulo 14 + legados) | Governança de Dados (API do Mixpanel) | **Baixo** (Automação via API) |
| **2. Desativação de Autocapture Duplicado** | Desligar `track_pageview` automático (`$mp_web_page_view`) e `$session_start` na configuração do SDK Web, mantendo `page_view` | **2 eventos** (`$mp_web_page_view`, `$session_start`) | Engenharia Frontend (`smb-web`) | **Baixo** (~15 min) |
| **3. Saneamento do Wrapper Global de Eventos** | Remover chaves com espaço inicial (`" timestamp"`, `" cta_name"`), remover `page` redundante com `page_path`, renomear `is_logged` $\rightarrow$ `is_authenticated` e `plan_id`/`proposal_id` $\rightarrow$ `campaign_id`, e expurgar PII (`email`, `name`, `phone`) dos eventos | **87 eventos** (ajustes globais de payload) | Engenharia Frontend (`smb-web`) | **Baixo/Médio** (~2 horas no serviço central de Analytics) |
| **4. Padronização do Evento de Receita (`payment_approved`)** | Corrigir `is_hibrid` $\rightarrow$ `is_hybrid`, converter `subtotal_value`, `total_value` e `total_discount` para `Float`, incluir `campaign_id` na raiz, limpar JSON truncado em `items` e mover `email`/`name` para People Profile | **1 evento** (`payment_approved` — 21 propriedades) | Engenharia Backend (`smb-api`) | **Baixo** (~1 hora) |
| **5. Desmembramento e Unificação de Eventos Concorrentes** | Limpar `click_button` ($\rightarrow$ `cta_clicked`), unificar prefixo `ac_site_*` $\rightarrow$ `ad_creator_*` (13 eventos), consolidar `remove_from_cart` $\rightarrow$ `cart_item_removed`, deprecar `login`/`sign_up` legados e corrigir typos (`tv_lp_form_initiated`, `r2_home_*`, `checkout_order_submitted`) | **32 eventos** em código ativo | Engenharia Frontend (`smb-web`) | **Médio** (~4 a 6 horas) |
