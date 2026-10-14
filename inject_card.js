const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

const newCard = `
      <!-- CARD 7: Revisão Experiência Mobile -->
      <article class="proto-card">
        <div>
          <div class="proto-tags">
            <span class="tag tag-ooh">Digital & OOH</span>
            <span class="tag tag-conv">Conversão</span>
            <span class="tag" style="background: #F1F5F9; color: #334155;">Mobile-First</span>
          </div>
          <h3 class="proto-title">Revisão Experiência Mobile</h3>
          <p class="proto-desc">
            Quick wins de usabilidade Mobile. Filtros otimizados nativamente, carrossel de categorias, data e duração consolidadas e botão de rascunho com maior destaque no checkout.
          </p>
          <div class="proto-features">
            <ul>
              <li><i class="uil uil-check-circle"></i> Carrossel horizontal Web-like na Vitrine</li>
              <li><i class="uil uil-check-circle"></i> Sticky Header animado com CSS nativo</li>
              <li><i class="uil uil-check-circle"></i> Bottom Bar de precificação aderente</li>
              <li><i class="uil uil-check-circle"></i> Fluxo unificado entre resultados e resumo</li>
            </ul>
          </div>
        </div>
        <div class="proto-footer">
          <div style="display: flex; gap: 8px;">
            <a href="https://app.notion.com/p/Quick-Wins-de-Experi-ncia-Mobile-Aqui-Ads-3f99587e4137806ebf28e0b58a2df935?source=copy_link" target="_blank" class="btn-access" style="background: #DBEAFE; color: #3B82F6; border: 1px solid #BFDBFE;">
              <i class="uil uil-file-alt"></i>
              <span>Doc</span>
            </a>
            <a href="projects/revisao-experiencia-mobile/prototipo/vitrine.html" class="btn-access">
              <span>Protótipo</span>
              <i class="uil uil-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>
`;

if (!indexHtml.includes('Revisão Experiência Mobile')) {
    indexHtml = indexHtml.replace('    </div>\r\n  </main>', newCard + '    </div>\r\n  </main>');
    indexHtml = indexHtml.replace('    </div>\n  </main>', newCard + '    </div>\n  </main>');
    
    fs.writeFileSync('index.html', indexHtml, 'utf8');
    console.log('Card inserido.');
} else {
    console.log('O card ja existia.');
}
