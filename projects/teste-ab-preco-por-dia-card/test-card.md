---
Tema: Teste A/B/C/D — Preço por Dia nos Cards da Página de Resultados (OOH)
Data: 2026-10-20
Tags: [Teste A/B, CRO, Página de Resultados, OOH, Precificação, Preço por Dia]
---

# Test Card: Preço por Dia nos Cards da Página de Resultados (OOH)

---

## 1. Contexto & Racional de Negócio

### 1.1. O Problema e a Oportunidade
* **Onde acontece:** Cards de inventário na **página de resultados** de **OOH**, tanto no Mobile quanto no Desktop.
* **Qual é o gargalo atual:** Hoje, todos os cards da **página de resultados** exibem exclusivamente o valor fechado do período selecionado em destaque (por padrão, `R$ 264,96 / 2 semanas` ou `R$ 1.074,84 / 2 semanas`). No entanto, o pequeno e médio anunciante que chega ao Aqui Ads tem seu modelo mental ancorado no orçamento diário das plataformas de mídia digital (`R$ 20,00 / dia` a `R$ 50,00 / dia` no Meta Ads e Google Ads).

### 1.2. Dados Prévios que Sustentam a Hipótese (Baseline)
* **Funil da Página de Resultados ([Diagnóstico de Comportamento na Página de Resultados](https://app.notion.com/p/Diagn-stico-de-Comportamento-na-P-gina-de-Resultados-3f49587e413780bc9574e2cb2dfe8ed2)):**
  * **Volume analisado:** `25.942` sessões na **página de resultados** (`~865` sessões/dia).
  * **Taxa de Rejeição Geral:** **`71,49%`** (chegando a **`77,40%`** no Mobile e **`82,49%`** no tráfego oriundo de campanhas de Meta Ads).
  * **Taxa de Adição ao Carrinho (Baseline Global):** **`5,24%`** (`1,65%` nas sessões em que o anunciante apenas visualiza os cards iniciais sem usar a busca e `23,97%` quando realiza busca).
* **Auditoria de Reuniões Comerciais ([Diagnóstico Temático de Produto — Reuniões Comerciais](https://app.notion.com/p/Diagn-stico-Tem-tico-de-Produto-Matriz-Integrada-de-Dores-MeetRox-Q3-2026-3f29587e413780d2bd1ed87940084d2b)):**
  * Em **`100,0%`** das `246` reuniões auditadas dos **executivos de vendas**, o principal ponto de atrito é a percepção de preço elevado na largada e a comparação direta com o custo diário de mídia digital.
* **Benchmark de Mercado ([Benchmark Competitivo — OOH, DOOH e Mídia Digital](https://app.notion.com/p/Benchmark-Competitivo-OOH-DOOH-M-dia-Digital-Vers-o-V4-Definitiva-3c69587e413781e7843af19690792481)):**
  * Plataformas de autosserviço voltadas a PMEs (como UOL Ads, com ancoragem de `R$ 9,09 / dia`, e Blip Billboards) comunicam o custo diário na escolha do inventário e consolidam o valor total da campanha no resumo do carrinho.

---

## 2. Hipótese Estruturada

> **Nós acreditamos que:**  
> Apresentar o **valor por dia** (ex: `R$ 18,93 / dia`) nos cards da **página de resultados** de **OOH** — seja de forma exclusiva ou combinada ao valor cheio do período (`R$ 264,96 / 2 semanas`) — reduzirá o choque inicial de preço e aproximará a leitura de custo da referência mental diária do anunciante, aumentando a taxa de **adição ao carrinho** sem prejudicar a conversão final.
>
> **Para verificar isso, nós iremos:**  
> Executar um **Teste A/B/C/D** (divisão de `25%` do tráfego para cada variante) na **página de resultados** de **OOH**, comparando o card original (**Controle A**) contra três formatos de exposição do custo diário: apenas valor por dia (**Variante B**), valor por dia em destaque com valor cheio em menor destaque (**Variante C**) e valor cheio em destaque com valor por dia em menor destaque (**Variante D**).
>
> **E mediremos:**  
> A **taxa de adição ao carrinho** como métrica primária, a **taxa de conversão** ao longo do funil (avanço para o resumo, início de checkout e compra concluída) e o **ticket médio** dos pedidos gerados em cada variante.
>
> **Estaremos certos se:**  
> Ao menos uma das variantes com preço por dia (**B**, **C** ou **D**) registrar um aumento estatisticamente significativo (confiança mínima de `95%`) na taxa de **adição ao carrinho**, mantendo ou superando a **taxa de conversão** final de compras e o **ticket médio** em relação ao Controle.

---

## 3. Desenho das Variantes (Teste A/B/C/D)

| Variante | Exibição de Preço no Card | Exemplo Visual (`R$ 264,96` em 2 semanas) | Divisão de Tráfego |
| :--- | :--- | :--- | :--- |
| **Variante A (Controle)** | **Apenas valor cheio do período** em destaque. | **`R$ 264,96`** `/ 2 semanas` | **25%** |
| **Variante B** | **Apenas valor por dia** em destaque. | **`R$ 18,93`** `/ dia` | **25%** |
| **Variante C** | **Valor por dia em destaque** e **valor cheio do período com menos destaque** abaixo. | **`R$ 18,93`** `/ dia`<br>`Total: R$ 264,96 / 2 semanas` | **25%** |
| **Variante D** | **Valor cheio do período em destaque** e **valor por dia com menos destaque** abaixo. | **`R$ 264,96`** `/ 2 semanas`<br>`ou R$ 18,93 / dia` | **25%** |

### O que cada variante permite responder:
* **Variante B vs. Controle A:** Mede o potencial máximo de destravar o clique inicial ao retirar o valor cheio do card.
* **Variante C vs. Variante B:** Testa se manter o valor total visível com menor destaque evita surpresa na etapa de resumo/checkout sem perder a atratividade do preço diário em destaque.
* **Variante D vs. Variante C:** Isola o efeito do destaque principal, revelando se basta informar o valor por dia como apoio ao valor cheio ou se o valor por dia precisa ser a informação principal do card.

---

## 4. Arquitetura de Métricas

### 4.1. Métrica Primária (Critério de Sucesso da Etapa)
* **Taxa de Adição ao Carrinho:** Proporção de usuários expostos ao experimento na **página de resultados** que adicionam pelo menos um ponto ao carrinho.
  * **Baseline Atual:** `5,24%` (geral na **página de resultados**).

### 4.2. Métricas de Negócio e Funil
* **Taxa de Conversão do Funil:**
  1. **Avanço para o Resumo:** % de usuários expostos que clicam em *"continuar"* e avançam da **página de resultados** para a tela de resumo do plano.
  2. **Início de Checkout:** % de usuários expostos que avançam do resumo para a etapa de pagamento.
  3. **Conversão Final de Compra:** % de usuários expostos que concluem o pedido com pagamento aprovado.
* **Ticket Médio:**
  * Valor financeiro médio (`R$`) dos pedidos concluídos em cada variante (**A, B, C e D**), além da média de pontos adicionados por carrinho (avaliando se a leitura do preço diário estimula o anunciante a selecionar mais prédios/telas).

### 4.3. Métricas de Guarda (Guardrails)
* **Quebra entre Adição ao Carrinho e Resumo/Checkout:** Monitorar especialmente na **Variante B** (onde o preço cheio não aparece no card) se ocorre desistência maior quando o anunciante visualiza o valor total somado da campanha na tela de resumo, comparando-a diretamente com as **Variantes C e D**.
* **Taxa de Remoção de Pontos do Carrinho:** Verificar se há aumento atípico de exclusão de pontos após a seleção.

---

## 5. Dimensionamento Amostral & Tempo de Execução

* **Divisão de Tráfego:** 4 grupos iguais (`25%` Controle A / `25%` Variante B / `25%` Variante C / `25%` Variante D)
* **Nível de Confiança:** `95%`
* **Poder Estatístico:** `80%`
* **Volume Estimado na Página de Resultados:** `~865` sessões/dia (`~25.942` sessões/mês)
* **Baseline da Métrica Primária (Adição ao Carrinho):** `5,24%`

| Ganho Relativo Esperado | Meta na Variante Vencedora | Amostra por Variante (x4) | Amostra Total (A + B + C + D) | Duração Estimada (100% do tráfego) |
| :--- | :--- | :--- | :--- | :--- |
| **+20% de melhora** | `6,29%` | `~7.600` sessões | `~30.400` sessões | **~35 dias** (5 semanas) |
| **+25% de melhora** | `6,55%` | `~4.950` sessões | `~19.800` sessões | **~23 dias** (3,5 semanas) |
| **+30% de melhora** | `6,81%` | `~3.500` sessões | `~14.000` sessões | **~16 dias** (2,5 semanas) |

> **Importante:** Como o tráfego será dividido em **4 variantes (25% cada)**, recomenda-se manter o experimento ativo por **21 a 28 dias corridos** (3 a 4 ciclos semanais completos) para garantir volume suficiente tanto na taxa de **adição ao carrinho** quanto na comparação de **taxa de conversão** de compra e **ticket médio** entre os quatro grupos.
