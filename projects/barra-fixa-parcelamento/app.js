// Exact 22 Products Extracted from Staging: 3 Globoplay, 4 Portais Globo, 15 Editora Globo
const globoProducts = [
  // GLOBOPLAY (3)
  {
    id: 'g1',
    title: 'Vídeo Globoplay - 6s',
    category: 'globoplay',
    brand: 'Globoplay',
    format: 'Bumper Video 6s',
    desc: 'Formato de vídeo de 6s sem possibilidade de pular, integrado ao conteúdo do Globoplay.',
    minInvestment: 1500,
    impressions: '50.000 exibições',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    mockupText: '🎬 [PRE-ROLL 6s GLOBOPLAY]'
  },
  {
    id: 'g2',
    title: 'Vídeo Globoplay - 15s',
    category: 'globoplay',
    brand: 'Globoplay',
    format: 'Pre-Roll Video 15s',
    desc: 'Formato de vídeo de 15s sem possibilidade de pular, integrado ao conteúdo do Globoplay.',
    minInvestment: 2000,
    impressions: '65.000 exibições',
    bgGradient: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)',
    mockupText: '🎬 [PRE-ROLL 15s GLOBOPLAY]'
  },
  {
    id: 'g3',
    title: 'Vídeo Globoplay - 16s à 180s',
    category: 'globoplay',
    brand: 'Globoplay',
    format: 'Video Pulável 16s-180s',
    desc: 'Formato de vídeo de 16 à 180s com possibilidade de pular no Globoplay.',
    minInvestment: 2500,
    impressions: '80.000 exibições',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
    mockupText: '🎬 [VIDEO PULÁVEL GLOBOPLAY]'
  },

  // PORTAIS GLOBO (4)
  {
    id: 'p1',
    title: 'Display Portais (G1, GE, Gshow, Receitas, Globo.com)',
    category: 'portais',
    brand: 'Portais Globo',
    format: 'Banner Display Multi-Portal',
    desc: 'Banners posicionados estrategicamente nos Portais Globo (G1, GE, Gshow, Receitas, Globo.com) para destacar a sua marca.',
    minInvestment: 1200,
    impressions: '150.000 impressões',
    bgGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    mockupText: '📰 [BANNER DISPLAY PORTAIS GLOBO]'
  },
  {
    id: 'p2',
    title: 'Vídeo Portais - 6s',
    category: 'portais',
    brand: 'Portais Globo',
    format: 'Outstream Video 6s',
    desc: 'Formato de vídeo de 6s sem possibilidade de pular, integrado ao conteúdo dos portais Globo (G1, GE, Gshow, Receitas).',
    minInvestment: 1500,
    impressions: '60.000 exibições',
    bgGradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    mockupText: '🎬 [VÍDEO 6s PORTAIS GLOBO]'
  },
  {
    id: 'p3',
    title: 'Vídeo Portais - 15s',
    category: 'portais',
    brand: 'Portais Globo',
    format: 'Outstream Video 15s',
    desc: 'Formato de vídeo de 15s sem possibilidade de pular, integrado ao conteúdo dos portais Globo.',
    minInvestment: 2000,
    impressions: '75.000 exibições',
    bgGradient: 'linear-gradient(135deg, #0f766e 0%, #0f172a 100%)',
    mockupText: '🎬 [VÍDEO 15s PORTAIS GLOBO]'
  },
  {
    id: 'p4',
    title: 'Vídeo Portais - 16s à 180s',
    category: 'portais',
    brand: 'Portais Globo',
    format: 'Outstream Video Pulável',
    desc: 'Formato de vídeo de 16 à 180s com possibilidade de pular nos portais Globo.',
    minInvestment: 2500,
    impressions: '90.000 exibições',
    bgGradient: 'linear-gradient(135deg, #111827 0%, #334155 100%)',
    mockupText: '🎬 [VÍDEO PULÁVEL PORTAIS GLOBO]'
  },

  // EDITORA GLOBO (15)
  {
    id: 'e1',
    title: 'EGlobo Display Auto Esporte',
    category: 'editora',
    brand: 'Auto Esporte',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Auto Esporte com cobertura automotiva e lançamentos.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #b91c1c 0%, #111827 100%)',
    mockupText: '🚗 [BANNER AUTO ESPORTE]'
  },
  {
    id: 'e2',
    title: 'EGlobo Display Casa e Jardim',
    category: 'editora',
    brand: 'Casa e Jardim',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Casa e Jardim para público de decoração e arquitetura.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #15803d 0%, #111827 100%)',
    mockupText: '🏡 [BANNER CASA E JARDIM]'
  },
  {
    id: 'e3',
    title: 'EGlobo Display Crescer',
    category: 'editora',
    brand: 'Crescer',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Crescer focado em famílias e parentalidade.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #c026d3 0%, #111827 100%)',
    mockupText: '👶 [BANNER CRESCER]'
  },
  {
    id: 'e4',
    title: 'EGlobo Display Época Negócios',
    category: 'editora',
    brand: 'Época Negócios',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Época Negócios para executivos e liderança.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #1e3a8a 0%, #111827 100%)',
    mockupText: '💼 [BANNER ÉPOCA NEGÓCIOS]'
  },
  {
    id: 'e5',
    title: 'EGlobo Display Extra',
    category: 'editora',
    brand: 'Extra',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Extra cobrindo notícias regionais e utilidades.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #c2410c 0%, #111827 100%)',
    mockupText: '📰 [BANNER EXTRA]'
  },
  {
    id: 'e6',
    title: 'EGlobo Display Galileu',
    category: 'editora',
    brand: 'Galileu',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Galileu voltado à ciência, cultura e sociedade.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #6d28d9 0%, #111827 100%)',
    mockupText: '🔬 [BANNER GALILEU]'
  },
  {
    id: 'e7',
    title: 'EGlobo Display Globo Rural',
    category: 'editora',
    brand: 'Globo Rural',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Globo Rural focando no agronegócio e campo.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #047857 0%, #111827 100%)',
    mockupText: '🌾 [BANNER GLOBO RURAL]'
  },
  {
    id: 'e8',
    title: 'EGlobo Display Marie Claire',
    category: 'editora',
    brand: 'Marie Claire',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Marie Claire focado em moda, beleza e estilo de vida.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #be185d 0%, #111827 100%)',
    mockupText: '💄 [BANNER MARIE CLAIRE]'
  },
  {
    id: 'e9',
    title: 'EGlobo Display Monet',
    category: 'editora',
    brand: 'Monet',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Monet cobrindo filmes, séries e entretenimento.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #4338ca 0%, #111827 100%)',
    mockupText: '🍿 [BANNER MONET]'
  },
  {
    id: 'e10',
    title: 'EGlobo Display PEGN',
    category: 'editora',
    brand: 'PEGN',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Pequenas Empresas Grandes Negócios para empreendedores.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #1d4ed8 0%, #111827 100%)',
    mockupText: '🚀 [BANNER PEGN]'
  },
  {
    id: 'e11',
    title: 'EGlobo Display QUEM',
    category: 'editora',
    brand: 'Quem',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Quem focado em celebridades, estilo e lifestyle.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #db2777 0%, #111827 100%)',
    mockupText: '⭐ [BANNER QUEM]'
  },
  {
    id: 'e12',
    title: 'EGlobo Display Techtudo',
    category: 'editora',
    brand: 'Techtudo',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Techtudo focado em tecnologia e eletrônicos.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #1e293b 0%, #111827 100%)',
    mockupText: '💻 [BANNER TECHTUDO]'
  },
  {
    id: 'e13',
    title: 'EGlobo Display O Globo',
    category: 'editora',
    brand: 'O Globo',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal O Globo com leitorado de alto poder decisório.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    mockupText: '📰 [BANNER O GLOBO]'
  },
  {
    id: 'e14',
    title: 'EGlobo Display Valor Investe',
    category: 'editora',
    brand: 'Valor Investe',
    format: 'Display Dedicado',
    desc: 'Criativo em display exibido no portal Valor Investe com investidores e finanças pessoais.',
    minInvestment: 960,
    impressions: '120.000 impressões',
    bgGradient: 'linear-gradient(135deg, #0f766e 0%, #111827 100%)',
    mockupText: '📈 [BANNER VALOR INVESTE]'
  },
  {
    id: 'e15',
    title: 'EGlobo Display Valor Econômico',
    category: 'editora',
    brand: 'Valor Econômico',
    format: 'Display Premium',
    desc: 'Criativo em display exibido no portal Valor Econômico para alta liderança corporativa.',
    minInvestment: 2000,
    impressions: '100.000 impressões',
    bgGradient: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)',
    mockupText: '🏆 [BANNER PREMIUM VALOR ECONÔMICO]'
  }
];

let cartItems = [];

function renderCatalog(filter = 'all') {
  const grid = document.getElementById('globoProductsGrid');
  grid.innerHTML = '';

  const list = filter === 'all' 
    ? globoProducts 
    : globoProducts.filter(p => p.category === filter);

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'globo-card';
    card.innerHTML = `
      <div class="card-mockup-banner" style="background: ${p.bgGradient}">
        <div class="banner-overlay-top">
          <span class="badge-brand-tag">${p.brand}</span>
          <span class="badge-format-tag">${p.format}</span>
        </div>
        <div class="mockup-ad-placeholder">
          ${p.mockupText}
        </div>
      </div>
      <div class="card-body-content">
        <h3 class="card-title-text">${p.title}</h3>
        <p class="card-desc-text">${p.desc}</p>
        
        <div class="pricing-box-globo">
          <div class="price-col">
            <span class="price-lbl">Investimento Mínimo</span>
            <span class="price-val">R$ ${p.minInvestment.toLocaleString('pt-BR')},00</span>
          </div>
          <div class="price-col" style="text-align: right">
            <span class="price-lbl">Entrega Prevista</span>
            <span class="price-val" style="font-size: 13px">${p.impressions}</span>
          </div>
        </div>

        <button class="btn-add-globo" onclick="addItemToCart('${p.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Adicionar ao Carrinho
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterCategory(catName, btnEl) {
  document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
  btnEl.classList.add('active');
  renderCatalog(catName);
}

function switchPageMode(modeName) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));

  if (modeName === 'catalog') {
    document.getElementById('btnModeCatalog').classList.add('active');
    document.getElementById('pageCatalog').classList.add('active');
  } else {
    document.getElementById('btnModeSegmentation').classList.add('active');
    document.getElementById('pageSegmentation').classList.add('active');
  }
}

function setRegion(regCode, btnEl) {
  document.querySelectorAll('.reg-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  const reachMap = {
    SP: '~2.400.000 pessoas impactadas por semana em São Paulo',
    RJ: '~1.800.000 pessoas impactadas por semana no Rio de Janeiro',
    MG: '~1.200.000 pessoas impactadas por semana em Minas Gerais',
    SUL: '~2.100.000 pessoas impactadas por semana na Região Sul',
    BR: '~12.500.000 pessoas impactadas por semana no Brasil Inteiro'
  };

  document.getElementById('txtReachEstimate').innerText = reachMap[regCode] || '~2.000.000 pessoas impactadas';
}

// =========================================================================
// CONTROLE DO EXPERIMENTO A/B/C & ESTADO DO PROTÓTIPO
// =========================================================================
let currentVariant = 'B'; // 'A' (Controle), 'B' (Contador), 'C' (Modal Link)
let simulatedAmount = null;
let milestoneReachedLogged = false;

function setVariant(variant) {
  currentVariant = variant;

  // Atualiza botões da toolbar
  document.querySelectorAll('.exp-btn-pill').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btnVar${variant}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Ajusta visibilidade na barra fixa
  const counterSlot = document.getElementById('slotCounterContainer');
  const modalTriggerBtn = document.getElementById('btnModalRulesTrigger');

  if (counterSlot) {
    counterSlot.style.display = (variant === 'B') ? 'flex' : 'none';
  }

  if (modalTriggerBtn) {
    modalTriggerBtn.style.display = (variant === 'C') ? 'inline-flex' : 'none';
  }

  updateCartBar();

  logMixpanel('ab_test_variant_viewed', {
    experiment_id: 'exp_aba_digital_installments_v1',
    variant: variant,
    variant_name: variant === 'A' ? 'Controle (Sem sinalizacao)' : (variant === 'B' ? 'Var 1 (Contador Barra Fixa)' : 'Var 2 (Link + Modal Regras)')
  });
}

function simulateCart(amount) {
  simulatedAmount = amount;
  cartItems = [];
  milestoneReachedLogged = false;
  updateCartBar();

  logMixpanel('cart_simulated', {
    simulated_amount: amount,
    active_variant: currentVariant
  });
}

function clearCart() {
  simulatedAmount = null;
  cartItems = [];
  milestoneReachedLogged = false;
  updateCartBar();

  logMixpanel('cart_cleared', {
    active_variant: currentVariant
  });
}

function addItemToCart(prodId) {
  const item = globoProducts.find(p => p.id === prodId);
  if (!item) return;

  simulatedAmount = null;
  cartItems.push(item);
  updateCartBar();

  logMixpanel('product_added_to_cart', {
    product_id: item.id,
    product_name: item.title,
    product_category: item.category,
    price: item.minInvestment,
    cart_total: getCartTotal()
  });
}

function getCartTotal() {
  if (simulatedAmount !== null) return simulatedAmount;
  return cartItems.reduce((acc, i) => acc + i.minInvestment, 0);
}

function getCartItemCount() {
  if (simulatedAmount !== null) {
    return Math.max(1, Math.round(simulatedAmount / 960));
  }
  return cartItems.length;
}

function updateCartUI() {
  updateCartBar();
}

function updateCartBar() {
  const countBadge = document.getElementById('cartCountBadge');
  const txtTotal = document.getElementById('txtTotalCart');
  const txtHint = document.getElementById('txtInstallmentHint');

  const total = getCartTotal();
  const count = getCartItemCount();

  if (countBadge) {
    countBadge.innerText = `${count} ITEM${count === 1 ? '' : 'S'}`;
  }

  if (txtTotal) {
    txtTotal.innerText = `R$ ${total.toLocaleString('pt-BR')},00`;
  }

  // Microcopy de status de parcelamento
  if (txtHint) {
    if (total === 0) {
      txtHint.innerText = 'À vista no cartão ou Pix';
    } else if (total < 1200) {
      txtHint.innerText = 'À vista no cartão (sem parcelamento)';
    } else if (total < 2000) {
      txtHint.innerText = 'Boleto liberado | Cartão apenas à vista';
    } else {
      txtHint.innerText = 'Em até 3x sem juros no cartão ou Boleto';
    }
  }

  // ==========================================
  // LÓGICA DA VARIANTE B: CONTADOR DINÂMICO
  // ==========================================
  const counterContainer = document.getElementById('slotCounterContainer');
  const txtHeadline = document.getElementById('txtCounterHeadline');
  const txtSubline = document.getElementById('txtCounterSubline');
  const progressFill = document.getElementById('progressFill');
  const counterIcon = document.getElementById('counterIcon');

  const THRESHOLD = 2000;

  if (total === 0) {
    if (txtHeadline) txtHeadline.innerHTML = `Faltam <strong>R$ 2.000,00</strong> para liberar parcelamento`;
    if (txtSubline) txtSubline.innerHTML = `Parcele em até <strong>3x sem juros</strong> no cartão de crédito`;
    if (progressFill) progressFill.style.width = '0%';
    if (counterIcon) counterIcon.innerText = '🎯';
    if (counterContainer) counterContainer.classList.remove('completed');
  } else if (total < THRESHOLD) {
    const diff = THRESHOLD - total;
    const pct = Math.min(99, Math.max(5, Math.round((total / THRESHOLD) * 100)));
    if (txtHeadline) txtHeadline.innerHTML = `Faltam <strong>R$ ${diff.toLocaleString('pt-BR')},00</strong> para parcelar sem juros!`;
    if (txtSubline) txtSubline.innerHTML = `Parcele em até <strong>3x sem juros</strong> no cartão (${pct}% atingido)`;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (counterIcon) counterIcon.innerText = '⏳';
    if (counterContainer) counterContainer.classList.remove('completed');
  } else {
    if (txtHeadline) txtHeadline.innerHTML = `🎉 <strong>Parcelamento liberado!</strong>`;
    if (txtSubline) txtSubline.innerHTML = `Parcele sua compra em até <strong>3x sem juros</strong> no cartão`;
    if (progressFill) progressFill.style.width = '100%';
    if (counterIcon) counterIcon.innerText = '✅';
    if (counterContainer) counterContainer.classList.add('completed');

    if (!milestoneReachedLogged && currentVariant === 'B') {
      milestoneReachedLogged = true;
      logMixpanel('installment_milestone_reached', {
        cart_total: total,
        threshold: THRESHOLD,
        installments_unlocked: '3x_sem_juros'
      }, true);
    }
  }

  // Atualiza feedback dentro do Modal
  updateModalFeedback(total);
}

function updateModalFeedback(total) {
  const modalCartAmt = document.getElementById('modalCartAmount');
  const modalFeedback = document.getElementById('modalCartFeedback');

  if (modalCartAmt) {
    modalCartAmt.innerText = `R$ ${total.toLocaleString('pt-BR')},00`;
  }

  if (modalFeedback) {
    if (total === 0) {
      modalFeedback.innerHTML = `Adicione produtos ao carrinho para simular suas opções de pagamento.`;
      modalFeedback.style.color = '#64748b';
    } else if (total < 1200) {
      const diffBoleto = 1200 - total;
      const diffParc = 2000 - total;
      modalFeedback.innerHTML = `❌ <strong>Pagamento à vista.</strong> Faltam <strong>R$ ${diffBoleto.toLocaleString('pt-BR')},00</strong> para boleto e <strong>R$ ${diffParc.toLocaleString('pt-BR')},00</strong> para parcelar em até 3x sem juros.`;
      modalFeedback.style.color = '#b91c1c';
    } else if (total < 2000) {
      const diffParc = 2000 - total;
      modalFeedback.innerHTML = `📄 <strong>Boleto liberado!</strong> Para parcelar no cartão em até 3x sem juros, faltam apenas <strong>R$ ${diffParc.toLocaleString('pt-BR')},00</strong>.`;
      modalFeedback.style.color = '#c2410c';
    } else {
      modalFeedback.innerHTML = `🎉 <strong>Excelente!</strong> Seu investimento de R$ ${total.toLocaleString('pt-BR')},00 qualifica para <strong>até 3x sem juros</strong> no cartão E pagamento via <strong>Boleto Bancário</strong>!`;
      modalFeedback.style.color = '#15803d';
    }
  }
}

// =========================================================================
// CONTROLE DO MODAL DE REGRAS DE PARCELAMENTO + BOLETO (VARIANTE C)
// =========================================================================
function openInstallmentModal(source) {
  const modalOverlay = document.getElementById('installmentModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
  }

  logMixpanel('installment_rules_modal_opened', {
    trigger_source: source || 'unknown',
    cart_total: getCartTotal(),
    active_variant: currentVariant
  });
}

function closeInstallmentModal(e) {
  if (e && e.target && e.target.id !== 'installmentModalOverlay' && !e.target.closest('.btn-close-modal') && !e.target.classList.contains('btn-modal-secondary')) {
    return;
  }
  const modalOverlay = document.getElementById('installmentModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
  }

  logMixpanel('installment_rules_modal_closed', {
    cart_total: getCartTotal()
  });
}

function proceedFromModal() {
  const modalOverlay = document.getElementById('installmentModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
  }

  if (getCartTotal() === 0) {
    // Scroll to products
    window.scrollTo({ top: 180, behavior: 'smooth' });
  } else {
    proceedCheckout();
  }
}

function saveSegmentation() {
  alert('Segmentação salva com sucesso! Retornando ao catálogo...');
  switchPageMode('catalog');
}

function proceedCheckout() {
  const total = getCartTotal();
  if (total === 0) {
    alert('Por favor, adicione pelo menos um produto ao carrinho antes de prosseguir.');
    return;
  }

  logMixpanel('checkout_initiated', {
    cart_total: total,
    item_count: getCartItemCount(),
    active_variant: currentVariant,
    installment_eligible: total >= 2000,
    boleto_eligible: total >= 1200
  }, true);

  const parcelas = total >= 2000 ? 'em até 3x sem juros' : 'à vista no cartão';
  alert(`[SIMULAÇÃO CHECKOUT AQUI ADS]\n\nTotal: R$ ${total.toLocaleString('pt-BR')},00\nCondição: ${parcelas}\nVariante do Teste: ${currentVariant}\n\nEvento registrado no Mixpanel com sucesso!`);
}

// =========================================================================
// MIXPANEL LIVE TRACKING HUD
// =========================================================================
function logMixpanel(eventName, properties, isHighlight = false) {
  console.log(`[Mixpanel Track] ${eventName}:`, properties);

  const logList = document.getElementById('hudLogList');
  if (!logList) return;

  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];

  const entry = document.createElement('div');
  entry.className = `hud-log-entry${isHighlight ? ' entry-highlight' : ''}`;
  entry.innerHTML = `
    <span class="hud-time">${timeStr}</span>
    <span class="hud-event">${eventName}</span>
    <span class="hud-props">${JSON.stringify(properties)}</span>
  `;

  logList.insertBefore(entry, logList.firstChild);

  // Mantém no máximo 15 logs para performance
  while (logList.children.length > 15) {
    logList.removeChild(logList.lastChild);
  }
}

function clearHudLog() {
  const logList = document.getElementById('hudLogList');
  if (logList) logList.innerHTML = '';
}

// =========================================================================
// INICIALIZAÇÃO DA PÁGINA
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog('all');
  setVariant('B'); // Inicia na Variante 1 (Contador) conforme padrão do teste
});

