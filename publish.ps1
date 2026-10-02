param(
    [string]$Mensagem = "Atualização de protótipos"
)

Write-Host ">>> Sincronizando protótipos com o GitHub Pages..." -ForegroundColor Cyan

git add .
git commit -m "$Mensagem"
git push origin main

Write-Host ">>> Publicação concluída com sucesso!" -ForegroundColor Green
Write-Host "Em instantes as alterações estarão disponíveis no GitHub Pages." -ForegroundColor Yellow
