# Dossiê Executivo: Quick Wins de Experiência Mobile (Aqui Ads)

> **Nota:** Este documento consolida os atritos reais de navegação e as oportunidades diretas de otimização de conversão na experiência móvel (com aplicações também para o desktop), priorizando as fricções identificadas na interação prática.

---

## 1. Widget de Atendimento Sobrepondo a Busca (Resolvido)

**Fricção:** O ícone do atendimento (Helen/Renata) ficava fixado sobreposto à barra e aos botões da pesquisa no mobile.
**Status:** Conforme verificado nas evidências mais recentes em homologação, o time de engenharia já aplicou a correção ocultando ou reposicionando o widget na tela de busca. **(Quick Win já garantido).**

---

## 2. Seleção de Duração na Tela de Resultados

**Fricção:** Na tela de resultados, a duração da veiculação fica escondida em menus ou modais difíceis de alterar.
**Impacto:** O cliente que deseja ajustar o orçamento não encontra a opção facilmente.
**Quick Win:** Expor um controle explícito de "Duração" no topo da vitrine (posicionado à esquerda, antes da data de início) utilizando um padrão de expansão nativa, evitando modais ocultos.

---

## 3. Data de Início e Nova Régua de Filtros

**Fricção:** A data de início estava reclusa no modal genérico de filtros, e o botão "filtrar" atual é muito genérico.
**Impacto:** Esconder variáveis essenciais gera atrito.
**Quick Win:** 
* Extrair o seletor de "Data de Início" e posicioná-lo no topo do catálogo (à direita da Duração).
* Substituir o botão genérico "filtrar" por um carrossel horizontal de pílulas (Filtros Rápidos), trazendo opções como "todos", "elevadores comerciais", "shopping", terminando com um botão de "mais filtros".
* **Novo:** Incluir nativamente os filtros específicos de "Rádio" no mobile, garantindo a mesma granularidade da versão web.

---

## 4. Teclado de Busca: Fechamento e Botão "Buscar" (Padrão Airbnb)

**Fricção:** Ao digitar um endereço no campo de busca, o teclado do sistema operacional (Android/iOS) não exibe o ícone de lupa correto e, ao confirmar, não recolhe automaticamente, bloqueando a visualização dos resultados.
**Impacto:** Sensação de lentidão e interface não-nativa. O cliente clica para buscar e fica preso com metade da tela ocupada.
**Quick Win:** 
* Adicionar o atributo HTML `enterkeyhint="search"` ou `type="search"` no input para forçar a exibição da lupa no teclado virtual.
* Disparar um evento `.blur()` via JavaScript no input assim que a ação de busca for submetida, forçando o fechamento imediato do teclado.

---

## 5. Valor Total na Barra Fixa do Resumo

**Fricção:** Na tela de resumo, o valor do investimento se perde no fluxo da página conforme o usuário rola a tela para conferir os itens.
**Impacto:** O cliente perde a ancoragem financeira enquanto revisa o plano, o que gera insegurança no momento do checkout.
**Quick Win:** Fixar uma barra inferior (`position: fixed; bottom: 0;`) exclusiva para a tela de resumo, contendo o Valor Total do investimento constantemente visível ao lado do botão de avanço/pagamento.

---

## 6. Incentivo à Nomeação da Campanha no Checkout
**Fricção:** O sistema não incentiva ativamente o anunciante a batizar a campanha com um nome próprio durante o fluxo de compra, deixando a ação escondida.
**Impacto:** O ato de nomear a campanha aumenta absurdamente o engajamento, independentemente de ela ser salva como rascunho.
> **Dados de Comportamento:** Uma análise do funil de conversão nos últimos 6 meses com usuários que iniciaram planos (adicionaram ao carrinho) revelou que anunciantes que **não renomearam a campanha converteram em média 12,8%** (474 compras de 3.677 usuários). Já os anunciantes que **renomearam alcançaram espetaculares 56,3% de conversão** (870 compras de 1.543 usuários). A apropriação aumenta a chance de fechamento em mais de 4 vezes.
**Quick Win:** Inserir a opção de "Renomear Campanha" em locais muito mais visíveis do fluxo (como abaixo do resumo de valores ou próximo ao botão de avançar), incentivando o cliente a dar identidade ao seu plano de mídia no momento da compra.

---

## 7. Atalho para Editar Público-Alvo

**Fricção:** Falta uma ação rápida e visível para o anunciante editar ou redefinir seu público-alvo durante o fluxo.
**Impacto:** Limita a exploração do cliente que deseja simular outros cenários de audiência.
**Quick Win:** Adicionar um botão claro escrito apenas "Editar" (tanto no Mobile quanto no Desktop, no card de digital) que redirecione o cliente imediatamente para a página de resultados digitais/online, repovoando a vitrine com o novo parâmetro.

---

## 8. Fixação (Sticky) da Barra de Filtros

**Fricção:** Conforme o usuário faz scroll pela lista de produtos e telas, a barra principal de filtros desaparece no topo da página.
**Impacto:** Para refinar a busca ou mudar o formato da mídia, o cliente é obrigado a fazer um longo scroll reverso até o topo (muito custoso no mobile).
**Quick Win:** Aplicar `position: sticky; top: 0;` (e um `z-index` adequado) no container da barra de filtros, mantendo-a presa e acessível no topo do viewport tanto na versão Mobile quanto no Desktop durante a rolagem do catálogo.
