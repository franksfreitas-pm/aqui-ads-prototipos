let totalValue = 0;

// Busca: perder o foco automaticamente
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchInput.blur();
  // Simular busca
});

// Controle de Duração expansível
const durationControl = document.getElementById('duration-control');
const durationSelect = document.getElementById('duration-select');
const durationLabel = document.getElementById('duration-label');

durationControl.addEventListener('click', () => {
  durationControl.classList.toggle('expanded');
});

durationSelect.addEventListener('click', (e) => {
  e.stopPropagation();
});

durationSelect.addEventListener('change', (e) => {
  durationLabel.textContent = `${e.target.value} dias`;
  durationControl.classList.remove('expanded');
});

// Navegação entre telas
function goToCart() {
  document.getElementById('screen-results').classList.remove('active');
  document.getElementById('screen-cart').classList.add('active');
  window.scrollTo(0, 0);
}

function goToResults() {
  document.getElementById('screen-cart').classList.remove('active');
  document.getElementById('screen-results').classList.add('active');
  window.scrollTo(0, 0);
}

// Lógica simples de carrinho
function addToCart(value) {
  totalValue += value;
  updateTotals();
  
  const cartItems = document.getElementById('cart-items');
  if (cartItems.innerHTML.includes('Nenhum item')) {
    cartItems.innerHTML = '';
  }
  
  const div = document.createElement('div');
  div.className = 'card';
  div.style.marginBottom = '8px';
  div.innerHTML = `
    <div style="display: flex; justify-content: space-between;">
      <span>Item adicionado</span>
      <strong>R$ ${value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>
    </div>
  `;
  cartItems.appendChild(div);
  
  alert('Item adicionado ao plano de mídia!');
}

function updateTotals() {
  const formatted = `R$ ${totalValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
  document.getElementById('results-total').textContent = formatted;
  document.getElementById('cart-total').textContent = formatted;
}
