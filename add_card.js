const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

const newCard = `
      <!-- CARD 5: Pré Página de Resultados -->
      <article class="proto-card">
        <div>
          <div class="proto-tags">
            <span class="tag tag-ooh">OOH</span>
            <span class="tag tag-conv">Descoberta</span>
            <span class="tag" style="background: #F1F5F9; color: #334155;">Desktop & Mobile</span>
          </div>
          <h3 class="proto-title">Pré Página de Resultados & Busca Guiada</h3>
          <p class="proto-desc">
            Fluxo inicial remodelado com 0-state, gaveta mobile nativa e avanço sequencial bloqueado até o preenchimento de todos os dados da campanha.
          </p>
          <div class="proto-features">
            <ul>
              <li><i class="uil uil-check-circle"></i> Navegação guiada com validação sequencial</li>
              <li><i class="uil uil-check-circle"></i> Gaveta Mobile (Bottom Sheet) 100% sincronizada</li>
              <li><i class="uil uil-check-circle"></i> Popovers interativos de localização e datas</li>
              <li><i class="uil uil-check-circle"></i> Layout reconstruído com responsividade injetada</li>
            </ul>
          </div>
        </div>
        <div class="proto-footer">
          <div style="display: flex; gap: 8px;">
            <a href="https://app.notion.com/p/Diagn-stico-de-Comportamento-na-P-gina-de-Resultados-3f49587e413780bc9574e2cb2dfe8ed2?source=copy_link" target="_blank" class="btn-access" style="background: #DBEAFE; color: #3B82F6; border: 1px solid #BFDBFE;">
              <i class="uil uil-file-alt"></i>
              <span>Doc</span>
            </a>
            <a href="projects/pre-pagina-resultado/prototipo/index.html" class="btn-access">
              <span>Protótipo</span>
              <i class="uil uil-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>
`;

// Insert before the closing tag of prototypes-grid
indexHtml = indexHtml.replace('    </div>\n\n    <!-- Scripts -->', newCard + '    </div>\n\n    <!-- Scripts -->');

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Card inserido com sucesso.');
