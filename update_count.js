const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The line is: <span class="stat-val">5</span>
indexHtml = indexHtml.replace('<span class="stat-val">5</span>', '<span class="stat-val">6</span>');

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Quantidade de cards atualizada para 6.');
