# Repositório Central de Protótipos - Aqui Ads

Este repositório centraliza a publicação e hospedagem dos protótipos em HTML das iniciativas do Aqui Ads através do **GitHub Pages**.

## Estrutura de Pastas

- `index.html`: Página inicial com o catálogo de todos os protótipos ativos.
- `projects/<nome-da-iniciativa>/index.html`: Cada protótipo isolado e navegável.
- `publish.ps1`: Script para deploy automático de novos protótipos.

## Como Publicar um Novo Protótipo

> **Importante:** Antes de publicar qualquer protótipo no GitHub, é obrigatório gerar o artefato HTML e enviá-lo no chat para validação e aprovação explícita do PM.

Após a validação e aprovação do PM, execute o script `publish.ps1` no terminal informando a mensagem da alteração:

```powershell
.\publish.ps1 -Mensagem "Adiciona protótipo da iniciativa X"
```

