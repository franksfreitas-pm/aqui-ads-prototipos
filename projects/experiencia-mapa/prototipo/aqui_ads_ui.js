/**
 * ============================================================================
 * AQUI ADS - MOTOR MODULAR E SHELL DE INTERFACE (aqui_ads_ui.js)
 * ============================================================================
 * Sincronizado com codebase/smb-web (tailwind.config.cjs + Layout.astro) e
 * Espelho de Produção Oficial do Aqui Ads.
 *
 * Uso Declarativo nos Templates/Protótipos:
 *   window.AQUI_ADS_CONFIG = {
 *     initialScreen: 'view-resultados', // 'view-resultados' | 'view-resumo' | 'view-envio-arte' | 'view-pagamento' | 'screen-list' | 'screen-detail'
 *     initialChannel: 'ooh',            // 'ooh' | 'digital'
 *     initialTab: 'planos',             // 'planos' | 'rascunhos'
 *     cartPreset: 'empty',              // 'empty' | 'midiaMista' ('hybrid') | 'ooh_only' ('oohOnly') | 'digital_only' ('digitalOnly')
 *     shellOnly: false,                 // true = renderiza Header + Footer + Modais e um <main id="custom-prototype-root"> limpo
 *     hooks: {
 *       renderOohCard(point, ctx, defaultRender) { return defaultRender(point); },
 *       renderDigitalCard(prod, ctx, defaultRender) { return defaultRender(prod); },
 *       beforeResultsContent() { return ''; },
 *       afterHeader() { return ''; },
 *       renderBottomBar(ctx, defaultRender) { return defaultRender(); },
 *       afterResumoContent(ctx) { return ''; },
 *       onReady(api) {}
 *     }
 *   };
 */

// 1. Injeção da Configuração Oficial do Tailwind (codebase/smb-web/tailwind.config.cjs)
(function configureAquiAdsTailwind() {
  const smbWebTailwindConfig = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['"Rethink Sans"', 'sans-serif'],
          rethink: ['"Rethink Sans"', 'sans-serif']
        },
        colors: {
          'main-black': 'var(--Main-Color-Black, #000929)',
          'text-secondary': 'var(--global-textSecondaryColor, #6C757D)',
          'type-dark-main': '#282e38',
          'type-dark-secondary': '#64748b',
          'color-neutral-dark-300': '#465161',
          'color-neutral-light-400': '#9FA9B7',
          'color-neutral-border-dark': '#101828',
          'brand-purple': '#3c20a6',
          'brand-green': '#009a61',
          primary: {
            light: '#FF611A',
            DEFAULT: '#FF4F00',
            default: '#FF4F00',
            dark: '#E54700',
            300: '#FF9C70'
          },
          secondary: {
            light: '#8ca1c3',
            DEFAULT: '#64748B',
            default: '#64748B',
            dark: '#282E38'
          },
          tertiary: {
            light: '#268C26',
            DEFAULT: '#007800',
            default: '#007800',
            dark: '#006600'
          },
          status: {
            positive: {
              light: '#4EE28A',
              light2: '#24C765',
              lighter: '#F4FCF7',
              solid: '#11BC55',
              DEFAULT: '#52d88b',
              default: '#52d88b',
              dark: '#3ca76a'
            },
            pending: {
              light: '#FFB91E',
              DEFAULT: '#F9AC00',
              default: '#F9AC00',
              dark: '#EDA400'
            },
            negative: {
              light: '#F0212E',
              DEFAULT: '#D21723',
              default: '#D21723',
              dark: '#BC0A16',
              pastelRed: '#EF4444'
            }
          },
          special: {
            print: '#009A61',
            digital: '#3C20A6',
            favorite: '#ABC9FB'
          }
        }
      }
    }
  };
  if (typeof window !== 'undefined') {
    window.tailwind = window.tailwind || {};
    window.tailwind.config = smbWebTailwindConfig;
  }
})();

// 2. Templates Canônicos de Shell e Jornada (Extraídos do Espelho de Produção)
const AQUI_ADS_SHELL_HEADER_HTML = `
  <!-- ========================================================================= -->
  <!-- BARRA SUPERIOR DE CONTROLE DO PROTÓTIPO (ALTERNADOR DESK / MOBILE)        -->
  <!-- ========================================================================= -->
  <header class="bg-gray-950 text-white px-4 py-1.5 sticky top-0 z-50 border-b border-gray-800 shadow-md">
    <div class="w-full px-6 mx-auto flex flex-wrap items-center justify-between gap-2">
      <!-- Alternador de Viewport Desktop vs Mobile (Sem precisar de DevTools) -->
      <div class="flex items-center bg-gray-900 p-0.5 rounded-lg border border-gray-800">
        <button onclick="setViewportMode('desktop')" id="vp-desktop-btn" class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-gray-800 text-white flex items-center gap-1 transition cursor-pointer">
          <span>🖥️</span> Desktop
        </button>
        <button onclick="setViewportMode('mobile')" id="vp-mobile-btn" class="px-2.5 py-1 rounded-md text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-1 transition cursor-pointer">
          <span>📱</span> Mobile (390px)
        </button>
      </div>
    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- STAGE PRINCIPAL (ALTERNA ENTRE FULL DESKTOP E MOLDURA MOBILE 390x844)     -->
  <!-- ========================================================================= -->
  <div id="app-Stage" class="flex-1 flex flex-col">
    <div id="viewport-container" class="w-full flex-1 flex flex-col bg-white">

      <!-- HEADER GLOBAL AQUI ADS (FIEL AO ESPELHO DE PRODUÇÃO resultados_ooh.html E AO MENU LATERAL OFICIAL) -->
      <header id="main-header" class="bg-white border-b border-gray-100 w-full px-4 sm:px-6 md:px-8 xl:pl-[90px] xl:pr-10 2xl:px-[90px] py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div class="flex items-center gap-6">
          <a href="javascript:void(0)" onclick="showScreen('view-resultados')" class="flex items-center select-none" style="text-decoration: none;" title="Ir para a Página de Resultados">
            <img src="https://aqui.globo/_astro/logo-aqui-ads.f9282b14.svg" alt="Aqui Ads" class="h-7 md:h-8 object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <span style="display:none;" class="items-start">
              <span class="text-2xl font-black tracking-tight text-[#FF5A00]">Aqui</span>
              <span class="text-2xl font-medium tracking-tight text-[#FF5A00] ml-0.5">ads</span>
              <span class="text-[9px] text-[#FF5A00] font-bold ml-0.5 mt-0.5">®</span>
            </span>
          </a>
        </div>

        <!-- Seletor de Canais Central Oficial (Visível na Página de Resultados - Fiel a resultados_ooh.html e Print 01) -->
        <div id="header-home-channels" class="flex items-center gap-6 md:gap-9 text-xs font-bold text-gray-600">
          <button id="hdr-channel-ooh" type="button" onclick="switchPlpChannel('ooh')" class="flex items-center gap-2 pb-1.5 pt-1 border-b-2 border-[#241e17] text-[#241e17] font-bold text-sm cursor-pointer transition">
            <img src="https://aqui.globo/images/header/ooh.svg" alt="OOH" class="w-7 h-7 object-contain">
            <span>OOH</span>
          </button>
          <button id="hdr-channel-digital" type="button" onclick="switchPlpChannel('digital')" class="flex items-center gap-2 pb-1.5 pt-1 border-b-2 border-transparent text-[#8e8477] hover:text-[#241e17] font-normal text-sm cursor-pointer transition">
            <img src="https://aqui.globo/images/header/digital.svg" alt="Digital" class="w-7 h-7 object-contain">
            <span>Digital</span>
          </button>
          <button id="hdr-channel-tv" type="button" onclick="switchPlpChannel('tv')" class="flex items-center gap-2 pb-1.5 pt-1 border-b-2 border-transparent text-[#8e8477] hover:text-[#241e17] font-normal text-sm cursor-pointer transition">
            <img src="https://aqui.globo/images/header/tv.svg" alt="TV" class="w-7 h-7 object-contain">
            <span>TV</span>
          </button>
          <button id="hdr-channel-radio" type="button" onclick="switchPlpChannel('radio')" class="flex items-center gap-2 pb-1.5 pt-1 border-b-2 border-transparent text-[#8e8477] hover:text-[#241e17] font-normal text-sm cursor-pointer transition">
            <img src="https://aqui.globo/images/header/radio.svg" alt="Rádio" class="w-7 h-7 object-contain">
            <span>Rádio</span>
          </button>
          <button id="hdr-channel-combos" type="button" onclick="switchPlpChannel('combos')" class="flex items-center gap-2 pb-1.5 pt-1 border-b-2 border-transparent text-[#8e8477] hover:text-[#241e17] font-normal text-sm cursor-pointer transition">
            <img src="https://aqui.globo/images/header/combos.svg" alt="Combos" class="w-7 h-7 object-contain">
            <span>Combos</span>
          </button>
        </div>

        <div class="flex items-center gap-4 md:gap-5">
          <button onclick="showToast('Assistente de anúncios IA aberto')" class="text-xs font-semibold text-gray-700 flex items-center gap-1.5 hover:text-[#FF5A00] transition cursor-pointer">
            <span class="hide-on-mobile-frame">Assistente de anúncios</span>
            <span class="text-indigo-600 text-sm">✨</span>
          </button>

          <button onclick="showScreen('view-resumo')" class="relative text-gray-700 hover:text-[#FF5A00] transition cursor-pointer" title="Ver Plano de Mídia (Carrinho)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <span id="hdr-cart-badge" class="hidden absolute -top-1.5 -right-2 bg-[#FF4F00] text-white text-[9px] font-bold px-1 rounded-full leading-tight">0</span>
          </button>

          <div class="flex items-center gap-2 pl-2 border-l border-gray-200 relative">
            <div onclick="openSideMenu(event)" class="flex items-center gap-2 cursor-pointer" title="Abrir menu lateral">
              <div class="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 text-gray-600 font-bold text-xs flex items-center justify-center">F</div>
              <span class="text-[11px] font-bold text-gray-800 hide-on-mobile-frame">Olá, FRANKS!</span>
            </div>
            <button onclick="showToast('Configurações da conta')" class="text-gray-600 hover:text-gray-900 p-1 cursor-pointer" title="Configurações">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </button>
            <button onclick="openSideMenu(event)" class="text-gray-700 hover:text-[#FF5A00] p-1 cursor-pointer transition" title="Menu Lateral">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </header>

      <!-- ===================================================================== -->
      <!-- MENU LATERAL OFICIAL AQUI ADS (FIEL AO PRINT ENVIADO PELO FRANKS)     -->
      <!-- ===================================================================== -->
      <div id="side-menu-drawer" class="hidden fixed inset-0 z-50 flex justify-end">
        <!-- Overlay escuro para fechar ao clicar fora -->
        <div onclick="closeSideMenu()" class="fixed inset-0 bg-black/35 backdrop-blur-[1px] transition-opacity"></div>

        <!-- Gaveta Branca à Direita -->
        <aside class="relative z-10 w-full max-w-[430px] bg-white h-full shadow-2xl flex flex-col justify-between p-7 overflow-y-auto">
          <div>
            <!-- Topo Direito: Sino de Notificação com Bolinha Laranja -->
            <div class="flex items-center justify-end mb-5">
              <button onclick="showToast('Você tem 1 campanha em veiculação (#750598) e 1 pendente de arte (#750708)')" class="relative p-1.5 text-gray-800 hover:text-[#FF5A00] transition cursor-pointer" title="Notificações">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                <span class="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-[#FF5A00] border-2 border-white"></span>
              </button>
            </div>

            <!-- Grid 2x2 de Cards Principais -->
            <div class="grid grid-cols-2 gap-3.5 mb-5">
              <!-- Card 1: escolha onde anunciar (Laranja sólido) -->
              <button onclick="showScreen('view-resultados'); closeSideMenu();" class="bg-[#FF5A00] hover:bg-[#E04E00] text-white rounded-2xl p-4 h-28 flex flex-col justify-between text-left shadow-xs transition cursor-pointer">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                <span class="text-xs font-bold leading-tight">escolha<br>onde anunciar</span>
              </button>

              <!-- Card 2: assistente de anúncios (Borda laranja) -->
              <button onclick="showToast('Assistente de anúncios aberto'); closeSideMenu();" class="bg-white border border-[#FF5A00] hover:bg-orange-50/40 text-gray-900 rounded-2xl p-4 h-28 flex flex-col justify-between text-left transition cursor-pointer">
                <svg class="w-5 h-5 text-[#FF5A00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
                </svg>
                <span class="text-xs font-bold text-gray-900 leading-tight">assistente de anúncios</span>
              </button>

              <!-- Card 3: meus anúncios (Branco com ícone de lista) -->
              <button onclick="showScreen('screen-list'); switchTopTab('planos'); closeSideMenu();" class="bg-white border border-gray-100 shadow-xs hover:border-[#FF5A00] hover:shadow-md text-gray-900 rounded-2xl p-4 h-28 flex flex-col justify-between text-left transition cursor-pointer">
                <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
                <span class="text-xs font-bold text-gray-900 leading-tight">meus anúncios</span>
              </button>

              <!-- Card 4: meus favoritos (Branco com ícone de coração) -->
              <button onclick="showToast('Meus favoritos'); closeSideMenu();" class="bg-white border border-gray-100 shadow-xs hover:border-gray-300 text-gray-900 rounded-2xl p-4 h-28 flex flex-col justify-between text-left transition cursor-pointer">
                <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span class="text-xs font-bold text-gray-900 leading-tight">meus favoritos</span>
              </button>
            </div>

            <!-- Lista de Barras Inferiores -->
            <div class="space-y-2.5">
              <button onclick="showToast('Gerenciamento de conta')" class="w-full bg-[#FAFAFA] hover:bg-gray-100 border border-gray-100 rounded-lg px-4 py-3 flex items-center justify-between text-xs font-bold text-gray-900 transition cursor-pointer">
                <span>gerenciamento de conta</span>
                <span class="text-gray-600">⌄</span>
              </button>

              <button onclick="showToast('Mockups de telas OOH')" class="w-full bg-[#FAFAFA] hover:bg-gray-100 border border-gray-100 rounded-lg px-4 py-3 flex items-center justify-between text-xs font-bold text-gray-900 transition cursor-pointer">
                <span>mockups</span>
                <span class="text-gray-600">⌄</span>
              </button>

              <button onclick="showToast('Materiais e central de ajuda')" class="w-full bg-[#FAFAFA] hover:bg-gray-100 border border-gray-100 rounded-lg px-4 py-3 flex items-center justify-between text-xs font-bold text-gray-900 transition cursor-pointer">
                <span>materiais e ajuda</span>
                <span class="text-gray-600">⌄</span>
              </button>

              <button onclick="switchPlpChannel('combos'); closeSideMenu();" class="w-full bg-[#FAFAFA] hover:bg-gray-100 border border-gray-100 rounded-lg px-4 py-3 flex items-center gap-2.5 text-xs font-bold text-gray-900 transition cursor-pointer">
                <svg class="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                <span>combos</span>
              </button>

              <button onclick="showToast('Atendimento via WhatsApp (Helen) iniciado')" class="w-full bg-white hover:bg-emerald-50/50 border border-[#22C55E] rounded-lg px-4 py-2.5 flex items-center gap-2.5 text-xs font-bold text-[#16A34A] transition cursor-pointer">
                <svg class="w-4 h-4 text-[#16A34A]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span>ajuda</span>
              </button>
            </div>
          </div>

          <!-- Rodapé do Menu Lateral: sair -->
          <div class="pt-6 border-t border-gray-100">
            <button onclick="closeSideMenu(); showToast('Sessão encerrada')" class="text-xs font-bold text-gray-900 hover:text-[#FF5A00] flex items-center gap-1.5 cursor-pointer">
              <span>sair</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </div>
        </aside>
      </div>
      <div id="hook-after-header"></div>`;
const AQUI_ADS_JOURNEY_VIEWS_HTML = `      <!-- ===================================================================== -->
      <!-- TELA 1: PÁGINA DE RESULTADOS FIEL AO ESPELHO DE PRODUÇÃO (OOH + DIGITAL) -->
      <!-- ===================================================================== -->
      <section id="view-resultados" class="view-section active flex-1 bg-white">
        <div id="hook-before-results-content"></div>
        <div id="plp-mode-ooh">
        <!-- TOPO DA PÁGINA DE RESULTADOS: BARRA DE BUSCA INTEGRADA (688px) + CHIPS DE AMBIENTE RETANGULARES -->
        <div class="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-10 pt-4 pb-3">
          
          <!-- Barra de Busca Integrada Oficial (Onde | Período | Início | Lupa Laranja #FF4F00) -->
          <div class="max-w-[688px] mx-auto bg-white border border-[#DFE7EF] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-1.5 flex flex-wrap md:flex-nowrap items-center">
            <!-- Campo 1: Onde -->
            <div class="flex-1 min-w-[220px] px-4 py-1.5 border-b md:border-b-0 md:border-r border-[#EDF2F8] relative">
              <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Onde</label>
              <div class="flex items-center justify-between gap-2">
                <input id="plp-search-address" type="text" value="Vila Olímpia, São Paulo - SP, Brasil" class="w-full text-xs font-medium text-[#282E38] bg-transparent outline-none truncate" placeholder="Ex.: Av. Paulista, Bela Vista, São Paulo/SP">
                <button type="button" onclick="document.getElementById('plp-search-address').value=''; document.getElementById('plp-search-address').focus();" class="w-4 h-4 rounded-full border border-gray-400 text-gray-500 hover:text-gray-800 text-[9px] flex items-center justify-center cursor-pointer shrink-0" title="Limpar busca de endereço">✕</button>
              </div>
            </div>

            <!-- Campo 2: Período -->
            <div class="w-1/2 md:w-[150px] px-4 py-1.5 border-r border-[#EDF2F8] cursor-pointer" onclick="toggleOohSearchDuration()">
              <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Período</label>
              <div class="flex items-center justify-between text-xs font-medium text-[#282E38]">
                <span id="plp-ooh-duration-label">2 semanas</span>
                <span class="text-gray-400 text-[10px]">⌄</span>
              </div>
            </div>

            <!-- Campo 3: Início -->
            <div class="w-1/2 md:w-[165px] px-4 py-1.5 cursor-pointer" onclick="showToast('Selecionar data de início da campanha')">
              <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Início</label>
              <div class="flex items-center justify-between text-xs font-medium text-[#282E38]">
                <span>26/10/2026</span>
                <span class="text-gray-400 text-[10px]">⌄</span>
              </div>
            </div>

            <!-- Botão Lupa #FF4F00 -->
            <button type="button" onclick="showToast('Atualizando pontos OOH na região de Vila Olímpia...')" class="ml-auto w-[42px] h-[42px] rounded-xl bg-[#FF4F00] hover:bg-[#E04600] text-white flex items-center justify-center shadow-xs cursor-pointer transition shrink-0" title="Buscar pontos">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>

          <!-- Pílulas de Filtro de Ambientes (Formato retangular rounded-md com borda sutil fiel ao print oficial) -->
          <div class="max-w-[1280px] mx-auto mt-6 flex flex-wrap items-center justify-center gap-2" id="plp-ambience-chips">
            <button type="button" data-amb="todos" onclick="filterPlpAmbience('todos', this)" class="plp-ambience-btn px-3 py-1.5 rounded-md text-xs font-semibold bg-[#4E5D6C] border border-[#4E5D6C] text-white cursor-pointer transition">todos</button>
            <button type="button" data-amb="comercial" onclick="filterPlpAmbience('comercial', this)" class="plp-ambience-btn px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">elevadores comerciais</button>
            <button type="button" data-amb="residencial" onclick="filterPlpAmbience('residencial', this)" class="plp-ambience-btn px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">elevadores residenciais</button>
            <button type="button" data-amb="onibus" onclick="filterPlpAmbience('onibus', this)" class="plp-ambience-btn px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">pontos de ônibus</button>
            <button type="button" data-amb="shopping" onclick="showToast('Filtrando ambiente: shoppings')" class="plp-ambience-btn px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">shoppings</button>
            <button type="button" data-amb="academia" onclick="showToast('Filtrando ambiente: academias')" class="plp-ambience-btn px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">academias</button>
            <button type="button" onclick="showToast('Abrindo modal de mais filtros...')" class="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#282E38] cursor-pointer transition">mais filtros</button>
          </div>
        </div>

        <!-- CORPO PRINCIPAL DA PÁGINA DE RESULTADOS: GRID DE 3 COLUNAS + MAPA STICKY LATERAL ALINHADO AO HEADER -->
        <div id="oohSubTab" class="apply-zoom w-full max-w-[1660px] mx-auto px-4 sm:px-6 lg:px-0 pt-4 pb-20">
          <div class="grid grid-cols-1 lg:grid-cols-[58.6%_minmax(0,1fr)] gap-6 lg:gap-[28px] items-start w-full">
            
            <!-- COLUNA ESQUERDA: LISTA DE CARDS OOH REAIS + BANNER ROXO INTERCALADO + CARD CRIE SUA CONTA -->
            <div class="w-full min-w-0">
              <ul id="plp-cards-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] list-none p-0 m-0 w-full">
                <!-- Preenchido dinamicamente por renderOohPlp() a partir de window.AQUI_ADS_MOCK_DATA.oohCatalog -->
              </ul>

              <!-- Botão "ver mais" sólido laranja oficial (#FF4F00) -->
              <div class="mt-7 flex justify-center">
                <button type="button" onclick="showToast('Carregando mais pontos da região...')" class="w-full max-w-[280px] py-2.5 rounded-lg bg-[#FF4F00] hover:bg-[#E04600] text-white text-xs font-bold shadow-xs cursor-pointer transition">
                  ver mais
                </button>
              </div>
            </div>

            <!-- COLUNA DIREITA: MAPA STICKY FIEL AOS PRINTS OFICIAIS DE PRODUÇÃO (height: 580px) -->
            <div class="w-full lg:sticky lg:top-[90px] h-[560px] lg:h-[580px] rounded-[20px] overflow-hidden shadow-sm border border-[#E2E8F0] relative bg-[#EDF2F7]">
              <!-- Mapa Estilizado de Rua (Vila Olímpia / Barra Funda - Mapbox Street Style fiel aos prints) -->
              <svg class="absolute inset-0 w-full h-full object-cover" viewBox="0 0 560 606" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <rect width="560" height="606" fill="#EDEFF2"/>
                <!-- Quadras e áreas verdes -->
                <path d="M0 440 L210 606 L0 606 Z" fill="#FDE68A" opacity="0.55"/>
                <rect x="25" y="25" width="130" height="95" rx="4" fill="#E2E5EA"/>
                <rect x="175" y="25" width="145" height="95" rx="4" fill="#E2E5EA"/>
                <rect x="340" y="25" width="190" height="95" rx="4" fill="#E2E5EA"/>
                <rect x="25" y="140" width="130" height="120" rx="4" fill="#E2E5EA"/>
                <rect x="175" y="140" width="145" height="120" rx="4" fill="#E2E5EA"/>
                <rect x="340" y="140" width="190" height="120" rx="4" fill="#E2E5EA"/>
                <rect x="25" y="280" width="130" height="125" rx="4" fill="#DCFCE7" opacity="0.65"/>
                <rect x="175" y="280" width="145" height="125" rx="4" fill="#E2E5EA"/>
                <rect x="340" y="280" width="190" height="125" rx="4" fill="#E2E5EA"/>
                <rect x="175" y="425" width="145" height="150" rx="4" fill="#E2E5EA"/>
                <rect x="340" y="425" width="190" height="150" rx="4" fill="#E2E5EA"/>
                <!-- Malha viária diagonal e ortogonal -->
                <line x1="-20" y1="130" x2="580" y2="210" stroke="#FFFFFF" stroke-width="11"/>
                <line x1="-20" y1="270" x2="580" y2="350" stroke="#FFFFFF" stroke-width="12"/>
                <line x1="-20" y1="415" x2="580" y2="495" stroke="#FFFFFF" stroke-width="10"/>
                <line x1="165" y1="-20" x2="90" y2="620" stroke="#FFFFFF" stroke-width="11"/>
                <line x1="330" y1="-20" x2="275" y2="620" stroke="#FCA5A5" stroke-width="6"/>
                <line x1="465" y1="-20" x2="395" y2="620" stroke="#FFFFFF" stroke-width="11"/>
                <line x1="0" y1="445" x2="230" y2="615" stroke="#FBBF24" stroke-width="14"/>
                <!-- Nomes de ruas do mapa -->
                <text x="200" y="160" fill="#64748B" font-size="10" font-weight="600" font-family="sans-serif" transform="rotate(8 200 160)">R. Gomes de Carvalho</text>
                <text x="210" y="302" fill="#64748B" font-size="10" font-weight="600" font-family="sans-serif" transform="rotate(8 210 302)">Rua Alvorada</text>
                <text x="350" y="452" fill="#64748B" font-size="10" font-weight="600" font-family="sans-serif" transform="rotate(8 350 452)">R. Dr. Cardoso de Melo</text>
                <text x="35" y="515" fill="#78716C" font-size="10" font-weight="700" font-family="sans-serif" transform="rotate(36 35 515)">Av. Santo Amaro</text>
              </svg>

              <!-- Canto Superior Direito: Botão Circular Expandir (⤢) + Controle Vertical de Zoom (+ / -) -->
              <div class="absolute top-3.5 right-3.5 z-20 flex flex-col items-center gap-2">
                <button type="button" onclick="showToast('Expandindo visualização do mapa...')" class="w-8 h-8 rounded-full bg-white hover:bg-gray-50 text-[#282E38] shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-200 flex items-center justify-center cursor-pointer transition" title="Expandir mapa">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                </button>
                <div class="w-8 rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden flex flex-col divide-y divide-gray-200">
                  <button type="button" onclick="showToast('Zoom + no mapa')" class="h-8 flex items-center justify-center text-sm font-bold text-[#282E38] hover:bg-gray-50 cursor-pointer" title="Aproximar">+</button>
                  <button type="button" onclick="showToast('Zoom - no mapa')" class="h-8 flex items-center justify-center text-sm font-bold text-[#282E38] hover:bg-gray-50 cursor-pointer" title="Afastar">−</button>
                </div>
              </div>

              <!-- Clusters Circulares Laranjas (#FF4F00) + Pino Central Renderizados Dinamicamente -->
              <div id="plp-ooh-map-pins" class="absolute inset-0 pointer-events-none"></div>

              <!-- Rodapé Mapbox Attribution -->
              <div class="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-[11px] font-bold text-gray-600 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded shadow-2xs">
                <span class="inline-block w-3.5 h-3.5 rounded-full bg-gray-600 text-white text-[9px] flex items-center justify-center font-black">m</span>
                <span>mapbox</span>
              </div>
            </div>

          </div>

          <!-- ================================================================= -->
          <!-- SEÇÃO INFERIOR 1: "Explore outros ambientes" (4 Cards + Setas)     -->
          <!-- ================================================================= -->
          <div class="mt-14 pt-6">
            <h3 class="text-base font-bold text-[#282E38] mb-4">Explore outros ambientes</h3>
            <div class="relative flex items-center gap-2">
              <button type="button" onclick="showToast('Navegando ambientes anteriores')" class="hidden sm:flex w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 items-center justify-center text-gray-500 shadow-2xs shrink-0 cursor-pointer">‹</button>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 flex-1">
                <button type="button" onclick="filterPlpAmbience('comercial')" class="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] p-4 text-left cursor-pointer transition">
                  <p class="text-xs font-bold text-[#282E38] leading-snug">Anuncie em<br>elevadores comerciais</p>
                  <p class="mt-1.5 text-[11px] text-[#64748B]">643.174 pontos para anunciar</p>
                  <div class="mt-3 text-[10px] text-[#64748B]">
                    <p>valor médio</p>
                    <p class="text-xs font-bold text-[#282E38]">R$ 915,00 <span class="font-normal text-[#64748B]">/2 semanas</span></p>
                  </div>
                </button>
                <button type="button" onclick="filterPlpAmbience('residencial')" class="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] p-4 text-left cursor-pointer transition">
                  <p class="text-xs font-bold text-[#282E38] leading-snug">Anuncie em<br>elevadores residenciais</p>
                  <p class="mt-1.5 text-[11px] text-[#64748B]">359.320 pontos para anunciar</p>
                  <div class="mt-3 text-[10px] text-[#64748B]">
                    <p>valor médio</p>
                    <p class="text-xs font-bold text-[#282E38]">R$ 265,00 <span class="font-normal text-[#64748B]">/2 semanas</span></p>
                  </div>
                </button>
                <button type="button" onclick="filterPlpAmbience('onibus')" class="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] p-4 text-left cursor-pointer transition">
                  <p class="text-xs font-bold text-[#282E38] leading-snug">Anuncie em<br>ponto de ônibus</p>
                  <p class="mt-1.5 text-[11px] text-[#64748B]">4.973.751 pontos para anunciar</p>
                  <div class="mt-3 text-[10px] text-[#64748B]">
                    <p>valor médio</p>
                    <p class="text-xs font-bold text-[#282E38]">R$ 5.081,00 <span class="font-normal text-[#64748B]">/2 semanas</span></p>
                  </div>
                </button>
                <button type="button" onclick="showToast('Filtrando ambiente: academias')" class="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] p-4 text-left cursor-pointer transition">
                  <p class="text-xs font-bold text-[#282E38] leading-snug">Anuncie em<br>academias</p>
                  <p class="mt-1.5 text-[11px] text-[#64748B]">188.450 pontos para anunciar</p>
                  <div class="mt-3 text-[10px] text-[#64748B]">
                    <p>valor médio</p>
                    <p class="text-xs font-bold text-[#282E38]">R$ 1.158,00 <span class="font-normal text-[#64748B]">/2 semanas</span></p>
                  </div>
                </button>
              </div>
              <button type="button" onclick="showToast('Navegando próximos ambientes')" class="hidden sm:flex w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 items-center justify-center text-gray-500 shadow-2xs shrink-0 cursor-pointer">›</button>
            </div>
          </div>

          <!-- ================================================================= -->
          <!-- SEÇÃO INFERIOR 2: FAQ "Ficou com alguma dúvida?" (2 Colunas)      -->
          <!-- ================================================================= -->
          <div class="mt-16 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div class="lg:col-span-5 lg:pt-12">
              <h3 class="text-base font-bold text-[#282E38]">Ficou com alguma dúvida?</h3>
              <p class="text-xs text-[#64748B] mt-1.5">Confira as perguntas frequentes.</p>
              <button type="button" onclick="showToast('Abrindo atendimento com especialista Aqui Ads (Helen)...')" class="mt-4 px-4 py-2 rounded-md bg-[#282E38] hover:bg-[#1E2229] text-white text-xs font-bold cursor-pointer transition">
                fale com um especialista
              </button>
            </div>
            <div class="lg:col-span-7 space-y-0" id="ooh-faq-accordion">
              <!-- Item 1 (Aberto por padrão com barra laranja esquerda) -->
              <div class="faq-item border-l-[3px] border-[#FF4F00] pl-5 py-3 transition-all">
                <button type="button" onclick="toggleOohFaq(0)" class="w-full text-left cursor-pointer">
                  <p class="text-xs font-bold text-[#282E38] faq-title">O que é o Aqui Ads?</p>
                </button>
                <div class="faq-body mt-2 text-xs text-[#64748B] leading-relaxed">
                  O Aqui Ads é a plataforma que simplifica a compra de mídia para quem quer fazer campanhas de publicidade OOH (Out of Home).
                </div>
              </div>
              <!-- Item 2 -->
              <div class="faq-item border-l-[3px] border-[#E2E8F0] pl-5 py-3 transition-all">
                <button type="button" onclick="toggleOohFaq(1)" class="w-full text-left cursor-pointer">
                  <p class="text-sm font-semibold text-[#64748B] hover:text-[#282E38] faq-title">O que significam as métricas de exibições, alcance e frequência?</p>
                </button>
                <div class="faq-body hidden mt-2 text-xs text-[#64748B] leading-relaxed">
                  Exibições representam o total estimado de vezes que seu anúncio será exibido nas telas; Alcance estima quantas pessoas únicas passam pelo local; e Frequência é a média de vezes que cada pessoa vê o anúncio no período.
                </div>
              </div>
              <!-- Item 3 -->
              <div class="faq-item border-l-[3px] border-[#E2E8F0] pl-5 py-3 transition-all">
                <button type="button" onclick="toggleOohFaq(2)" class="w-full text-left cursor-pointer">
                  <p class="text-sm font-semibold text-[#64748B] hover:text-[#282E38] faq-title">Quais são as opções de criação da arte do meu anúncio?</p>
                </button>
                <div class="faq-body hidden mt-2 text-xs text-[#64748B] leading-relaxed">
                  Você pode enviar sua própria arte seguindo o gabarito técnico das telas, usar modelos prontos ou escolher a opção "contrate uma arte" por R$ 99,00 para nossa equipe produzir para você.
                </div>
              </div>
              <!-- Item 4 -->
              <div class="faq-item border-l-[3px] border-[#E2E8F0] pl-5 py-3 transition-all">
                <button type="button" onclick="toggleOohFaq(3)" class="w-full text-left cursor-pointer">
                  <p class="text-sm font-semibold text-[#64748B] hover:text-[#282E38] faq-title">Moradores de prédios com telas da Eletromidia têm algum benefício para anunciar?</p>
                </button>
                <div class="faq-body hidden mt-2 text-xs text-[#64748B] leading-relaxed">
                  Sim! Moradores e empresas instaladas em condomínios parceiros Eletromidia contam com condições especiais para anunciar no próprio edifício e no entorno.
                </div>
              </div>
            </div>
          </div>

          <!-- ================================================================= -->
          <!-- SEÇÃO INFERIOR 3: "Anuncie em pontos estratégicos de São Paulo"   -->
          <!-- ================================================================= -->
          <div class="mt-16 pt-6 pb-4">
            <h3 class="text-base font-bold text-[#282E38] mb-5">Anuncie em pontos estratégicos de São Paulo</h3>
            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-2.5 list-none p-0 m-0">
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Avenida Paulista, São Paulo - SP'; showToast('Região alterada: Avenida Paulista')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Avenida Paulista</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Faria Lima, São Paulo - SP'; showToast('Região alterada: Faria Lima')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Faria Lima</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Barra Funda, São Paulo - SP'; showToast('Região alterada: Barra Funda')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Barra Funda</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Tatuapé, São Paulo - SP'; showToast('Região alterada: Tatuapé')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Tatuapé</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Jabaquara, São Paulo - SP'; showToast('Região alterada: Jabaquara')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Jabaquara</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Vila Olímpia, São Paulo - SP'; showToast('Região alterada: Vila Olímpia')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Vila Olímpia</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Santo Amaro, São Paulo - SP'; showToast('Região alterada: Santo Amaro')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Santo Amaro</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Mooca, São Paulo - SP'; showToast('Região alterada: Mooca')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Mooca</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Jardins, São Paulo - SP'; showToast('Região alterada: Jardins')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Jardins</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Lapa, São Paulo - SP'; showToast('Região alterada: Lapa')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Lapa</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Vila Prudente, São Paulo - SP'; showToast('Região alterada: Vila Prudente')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Vila Prudente</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Alphaville, Barueri - SP'; showToast('Região alterada: Alphaville')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Alphaville</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Santana, São Paulo - SP'; showToast('Região alterada: Santana')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Santana</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Vila Mariana, São Paulo - SP'; showToast('Região alterada: Vila Mariana')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Vila Mariana</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Pinheiros, São Paulo - SP'; showToast('Região alterada: Pinheiros')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Pinheiros</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Osasco - SP'; showToast('Região alterada: Osasco')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Osasco</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Santa Cruz, São Paulo - SP'; showToast('Região alterada: Santa Cruz')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Santa Cruz</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Moema, São Paulo - SP'; showToast('Região alterada: Moema')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Moema</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Butantã, São Paulo - SP'; showToast('Região alterada: Butantã')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Butantã</a></li>
              <li><a href="#resultados" onclick="event.preventDefault(); document.getElementById('plp-search-address').value='Diadema - SP'; showToast('Região alterada: Diadema')" class="text-xs font-semibold text-[#282E38] underline decoration-dotted underline-offset-4 hover:text-[#FF4F00]">Anuncie em Diadema</a></li>
            </ul>
          </div>
        </div>
        </div><!-- /#plp-mode-ooh -->

        <!-- =================================================================== -->
        <!-- MODO 2 DA PÁGINA DE RESULTADOS: DIGITAL | GLOBO (FIEL AO PRINT 01)  -->
        <!-- =================================================================== -->
        <div id="plp-mode-digital" class="hidden flex-1 bg-white pb-16">
          <!-- Topo Branco com Cápsula de Busca (Onde | Período | Início | público | Lupa #FF4F00) e 7 Chips Retangulares -->
          <div class="bg-white border-b border-gray-100 px-6 lg:px-12 pt-4 pb-3">
            <div class="max-w-[760px] mx-auto">
              <div class="bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-1.5 flex flex-wrap md:flex-nowrap items-center">
                <!-- Campo 1: Onde -->
                <div class="flex-1 min-w-[200px] px-4 py-1.5 border-b md:border-b-0 md:border-r border-[#EDF2F8]">
                  <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Onde</label>
                  <input id="digital-search-location" type="text" value="" oninput="updateDigitalTargetLocation(this.value)" class="w-full text-xs font-medium text-[#282E38] placeholder-gray-400 bg-transparent outline-none truncate" placeholder="Busque por cidades ou estados">
                </div>
                <!-- Campo 2: Período -->
                <div class="w-1/2 md:w-[135px] px-4 py-1.5 border-r border-[#EDF2F8] cursor-pointer" onclick="toggleOohSearchDuration()">
                  <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Período</label>
                  <div class="flex items-center justify-between text-xs font-medium text-[#282E38]">
                    <span id="digital-search-duration-label">4 semanas</span>
                    <span class="text-gray-400 text-[10px]">⌄</span>
                  </div>
                </div>
                <!-- Campo 3: Início -->
                <div class="w-1/2 md:w-[140px] px-4 py-1.5 border-r border-[#EDF2F8]">
                  <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Início</label>
                  <div class="flex items-center justify-between text-xs font-medium text-[#282E38]">
                    <span id="digital-search-start-label">28/10/2026</span>
                    <span class="text-gray-400 text-[10px]">⌄</span>
                  </div>
                </div>
                <!-- Botão "público" DENTRO da Cápsula à esquerda da lupa laranja (Fiel ao Print Oficial) -->
                <button type="button" onclick="showToast('Segmentação de público Digital | Globo')" class="px-3.5 py-2 mx-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-gray-50 text-xs font-semibold text-[#282E38] flex items-center gap-1.5 cursor-pointer shrink-0">
                  <svg class="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                  <span>público</span>
                </button>
                <!-- Botão Lupa Laranja #FF4F00 -->
                <button type="button" onclick="showToast('Resultados Digital | Globo atualizados')" class="w-[40px] h-[40px] rounded-xl bg-[#FF4F00] hover:bg-[#E04600] text-white flex items-center justify-center shrink-0 cursor-pointer transition shadow-xs">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
              </div>
            </div>

            <!-- 7 Pílulas Retangulares com Borda Sutil e "Todos" ativo em #4E5D6C (Fiel ao Print Oficial) -->
            <div id="digital-category-chips" class="max-w-[1310px] mx-auto px-4 lg:px-[40px] mt-4 flex items-center justify-center gap-2 flex-wrap">
              <button type="button" onclick="filterDigitalCategory('Todos')" data-cat="Todos" class="dig-cat-chip px-3 py-1.5 rounded-md text-xs font-semibold bg-[#4E5D6C] border border-[#4E5D6C] text-white cursor-pointer transition">Todos</button>
              <button type="button" onclick="filterDigitalCategory('Notícias & Grandes Portais')" data-cat="Notícias & Grandes Portais" class="dig-cat-chip px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">Notícias &amp; Grandes Portais</button>
              <button type="button" onclick="filterDigitalCategory('Negócios e finanças')" data-cat="Negócios e finanças" class="dig-cat-chip px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">Negócios e finanças</button>
              <button type="button" onclick="filterDigitalCategory('Automotivo & Tecnologia')" data-cat="Automotivo & Tecnologia" class="dig-cat-chip px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">Automotivo &amp; Tecnologia</button>
              <button type="button" onclick="filterDigitalCategory('Estilo de Vida')" data-cat="Estilo de Vida" class="dig-cat-chip px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">Estilo de Vida</button>
              <button type="button" onclick="filterDigitalCategory('Casa & Família')" data-cat="Casa & Família" class="dig-cat-chip px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">Casa &amp; Família</button>
              <button type="button" onclick="filterDigitalCategory('Vídeo & Entretenimento')" data-cat="Vídeo & Entretenimento" class="dig-cat-chip px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition">Vídeo &amp; Entretenimento</button>
            </div>
          </div>

          <!-- Seções Agrupadas de Produtos Digitais Globo (6 Seções x Grid 4 Colunas - Fiel ao Print Oficial) -->
          <div class="apply-zoom mx-auto flex min-h-[60vh] w-full max-w-[1580px] px-4 lg:px-6 flex-col gap-10 py-8" id="digital-sections-container">
            <!-- Preenchido dinamicamente por renderDigitalPlp() -->
          </div>
        </div><!-- /#plp-mode-digital -->
        <div id="plp-mode-tv" class="hidden">
          <div class="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-10 pt-4 pb-4">
            <div class="max-w-[688px] mx-auto bg-white border border-[#DFE7EF] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-1.5 flex flex-wrap md:flex-nowrap items-center">
              <div class="flex-1 min-w-[220px] px-4 py-1.5 border-b md:border-b-0 md:border-r border-[#EDF2F8] relative">
                <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Praça de exibição</label>
                <div class="flex items-center justify-between gap-2">
                  <input type="text" value="São Paulo e Região Metropolitana - SP" class="w-full text-xs font-medium text-[#282E38] bg-transparent outline-none truncate">
                </div>
              </div>
              <div class="w-1/2 md:w-[150px] px-4 py-1.5 border-r border-[#EDF2F8] cursor-pointer" onclick="toggleOohSearchDuration()">
                <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Período</label>
                <div class="flex items-center justify-between text-xs font-medium text-[#282E38]">
                  <span>2 semanas</span>
                  <span class="text-gray-400 text-[10px]">⌄</span>
                </div>
              </div>
              <div class="w-1/2 md:w-[165px] px-4 py-1.5 cursor-pointer" onclick="showToast('Selecionar data de início da campanha')">
                <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Início</label>
                <div class="flex items-center justify-between text-xs font-medium text-[#282E38]">
                  <span>26/10/2026</span>
                  <span class="text-gray-400 text-[10px]">⌄</span>
                </div>
              </div>
              <button type="button" onclick="showToast('Atualizando programação e faixas comerciais de TV...')" class="ml-auto w-[42px] h-[42px] rounded-xl bg-[#FF4F00] hover:bg-[#E04600] text-white flex items-center justify-center shadow-xs cursor-pointer transition shrink-0" title="Buscar faixas de TV">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.3-4.3"/></svg>
              </button>
            </div>
          </div>
          <div class="apply-zoom max-w-[1580px] mx-auto px-4 lg:px-6 pt-6 pb-20">
            <div class="mb-5">
              <h2 class="text-lg font-extrabold text-[#282E38]">TV Aberta &amp; Pay TV | Globo</h2>
              <p class="text-xs text-[#64748B] mt-0.5">Anuncie nos intervalos comerciais de maior audiência da TV Globo e canais Globo na sua região.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article class="rounded-[14px] border border-[#d9d9d9] bg-white overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div class="relative h-[180px] bg-slate-900 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=700&q=80" alt="TV Globo Manhã" class="w-full h-full object-cover opacity-90">
                  <span class="absolute top-3.5 left-3.5 bg-white/95 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">📺 TV Aberta Regional</span>
                  <span class="absolute top-3.5 right-3.5 bg-[#1e293b]/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">CPM R$ 42,00</span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="text-base font-bold text-[#0c0a09] leading-snug">Comercial 30s - Manhã &amp; Almoço</h3>
                    <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed line-clamp-3 min-h-[48px]">Exibição regional nos intervalos do Bom Dia Praça, Encontro, Mais Você e SP1/Praça TV 1ª Edição.</p>
                    <div class="flex flex-wrap items-center gap-1.5 mt-3.5">
                      <span class="px-2 py-0.5 rounded bg-[#005CEF] text-white text-[11px] font-bold">TV Globo</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">Bom Dia SP</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">SP1</span>
                    </div>
                  </div>
                  <div>
                    <div class="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-100">
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">investimento</span>
                        <div class="h-10 flex items-center rounded-[8px] border border-slate-300 bg-white px-3 text-sm font-semibold text-[#0c0a09]">R$ 1.500,00</div>
                      </div>
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">impressões</span>
                        <div class="h-10 flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-[#0c0a09]">👁 35,7 mil</div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <button type="button" onclick="showToast('Comercial 30s - Manhã e Almoço adicionado à simulação!')" class="w-full h-10 bg-[#5b19b4] hover:bg-[#4a1296] text-white font-semibold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">adicionar produto</button>
                    </div>
                  </div>
                </div>
              </article>
              <article class="rounded-[14px] border border-[#d9d9d9] bg-white overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div class="relative h-[180px] bg-slate-900 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=700&q=80" alt="TV Globo Tarde" class="w-full h-full object-cover opacity-90">
                  <span class="absolute top-3.5 left-3.5 bg-white/95 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">📺 TV Aberta Regional</span>
                  <span class="absolute top-3.5 right-3.5 bg-[#1e293b]/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">CPM R$ 38,00</span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="text-base font-bold text-[#0c0a09] leading-snug">Comercial 15s - Faixa Vespertina</h3>
                    <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed line-clamp-3 min-h-[48px]">Presença com alta frequência durante Globo Esporte, Jornal Hoje, Edição Especial e Vale a Pena Ver de Novo.</p>
                    <div class="flex flex-wrap items-center gap-1.5 mt-3.5">
                      <span class="px-2 py-0.5 rounded bg-[#005CEF] text-white text-[11px] font-bold">TV Globo</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">Globo Esporte</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">Tarde</span>
                    </div>
                  </div>
                  <div>
                    <div class="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-100">
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">investimento</span>
                        <div class="h-10 flex items-center rounded-[8px] border border-slate-300 bg-white px-3 text-sm font-semibold text-[#0c0a09]">R$ 1.200,00</div>
                      </div>
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">impressões</span>
                        <div class="h-10 flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-[#0c0a09]">👁 31,5 mil</div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <button type="button" onclick="showToast('Comercial 15s - Faixa Vespertina adicionado à simulação!')" class="w-full h-10 bg-[#5b19b4] hover:bg-[#4a1296] text-white font-semibold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">adicionar produto</button>
                    </div>
                  </div>
                </div>
              </article>
              <article class="rounded-[14px] border border-[#d9d9d9] bg-white overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div class="relative h-[180px] bg-slate-900 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80" alt="TV Globo Nobre" class="w-full h-full object-cover opacity-90">
                  <span class="absolute top-3.5 left-3.5 bg-white/95 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">📺 Horário Nobre</span>
                  <span class="absolute top-3.5 right-3.5 bg-[#1e293b]/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">CPM R$ 65,00</span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="text-base font-bold text-[#0c0a09] leading-snug">Comercial 30s - Noturno Regional</h3>
                    <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed line-clamp-3 min-h-[48px]">Máximo impacto regional nos intervalos do SP2/Praça TV 2ª Edição e novelas da faixa noturna.</p>
                    <div class="flex flex-wrap items-center gap-1.5 mt-3.5">
                      <span class="px-2 py-0.5 rounded bg-[#005CEF] text-white text-[11px] font-bold">TV Globo</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">SP2</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">Novelas</span>
                    </div>
                  </div>
                  <div>
                    <div class="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-100">
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">investimento</span>
                        <div class="h-10 flex items-center rounded-[8px] border border-slate-300 bg-white px-3 text-sm font-semibold text-[#0c0a09]">R$ 3.000,00</div>
                      </div>
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">impressões</span>
                        <div class="h-10 flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-[#0c0a09]">👁 46,1 mil</div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <button type="button" onclick="showToast('Comercial 30s - Noturno Regional adicionado à simulação!')" class="w-full h-10 bg-[#5b19b4] hover:bg-[#4a1296] text-white font-semibold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">adicionar produto</button>
                    </div>
                  </div>
                </div>
              </article>
              <article class="rounded-[14px] border border-[#d9d9d9] bg-white overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div class="relative h-[180px] bg-slate-900 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80" alt="Canais Globo" class="w-full h-full object-cover opacity-90">
                  <span class="absolute top-3.5 left-3.5 bg-white/95 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">📡 Pay TV Segmentada</span>
                  <span class="absolute top-3.5 right-3.5 bg-[#1e293b]/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">CPM R$ 48,00</span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="text-base font-bold text-[#0c0a09] leading-snug">Spot 30s - SporTV &amp; GloboNews</h3>
                    <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed line-clamp-3 min-h-[48px]">Alcance qualificado em programação ao vivo de esportes e jornalismo 24h nos canais por assinatura Globo.</p>
                    <div class="flex flex-wrap items-center gap-1.5 mt-3.5">
                      <span class="px-2 py-0.5 rounded bg-[#06AA48] text-white text-[11px] font-bold">sportv</span>
                      <span class="px-2 py-0.5 rounded bg-[#C4170C] text-white text-[11px] font-bold">GloboNews</span>
                    </div>
                  </div>
                  <div>
                    <div class="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-100">
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">investimento</span>
                        <div class="h-10 flex items-center rounded-[8px] border border-slate-300 bg-white px-3 text-sm font-semibold text-[#0c0a09]">R$ 1.500,00</div>
                      </div>
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">impressões</span>
                        <div class="h-10 flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-[#0c0a09]">👁 31,2 mil</div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <button type="button" onclick="showToast('Spot 30s - SporTV e GloboNews adicionado à simulação!')" class="w-full h-10 bg-[#5b19b4] hover:bg-[#4a1296] text-white font-semibold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">adicionar produto</button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div><!-- /#plp-mode-tv -->
        <div id="plp-mode-radio" class="hidden">
          <div class="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-10 pt-4 pb-4">
            <div class="max-w-[688px] mx-auto bg-white border border-[#DFE7EF] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-1.5 flex flex-wrap md:flex-nowrap items-center">
              <div class="flex-1 min-w-[220px] px-4 py-1.5 border-b md:border-b-0 md:border-r border-[#EDF2F8] relative">
                <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Praça de transmissão</label>
                <div class="flex items-center justify-between gap-2">
                  <input type="text" value="São Paulo - SP (Dial FM + Streaming)" class="w-full text-xs font-medium text-[#282E38] bg-transparent outline-none truncate">
                </div>
              </div>
              <div class="w-1/2 md:w-[150px] px-4 py-1.5 border-r border-[#EDF2F8] cursor-pointer" onclick="toggleOohSearchDuration()">
                <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Período</label>
                <div class="flex items-center justify-between text-xs font-medium text-[#282E38]">
                  <span>2 semanas</span>
                  <span class="text-gray-400 text-[10px]">⌄</span>
                </div>
              </div>
              <div class="w-1/2 md:w-[165px] px-4 py-1.5 cursor-pointer" onclick="showToast('Selecionar data de início da campanha')">
                <label class="block text-[11px] font-bold text-[#282E38] mb-0.5">Início</label>
                <div class="flex items-center justify-between text-xs font-medium text-[#282E38]">
                  <span>26/10/2026</span>
                  <span class="text-gray-400 text-[10px]">⌄</span>
                </div>
              </div>
              <button type="button" onclick="showToast('Atualizando emissoras de Rádio disponíveis...')" class="ml-auto w-[42px] h-[42px] rounded-xl bg-[#FF4F00] hover:bg-[#E04600] text-white flex items-center justify-center shadow-xs cursor-pointer transition shrink-0" title="Buscar emissoras">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.3-4.3"/></svg>
              </button>
            </div>
          </div>
          <div class="apply-zoom max-w-[1580px] mx-auto px-4 lg:px-6 pt-6 pb-20">
            <div class="mb-5">
              <h2 class="text-lg font-extrabold text-[#282E38]">Rádio &amp; Áudio | Sistema Globo de Rádio</h2>
              <p class="text-xs text-[#64748B] mt-0.5">Impacte ouvintes no trânsito e ao longo do dia nas emissoras CBN, Rádio Globo e BH FM.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article class="rounded-[14px] border border-[#d9d9d9] bg-white overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div class="relative h-[180px] bg-slate-900 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80" alt="CBN" class="w-full h-full object-cover opacity-90">
                  <span class="absolute top-3.5 left-3.5 bg-white/95 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">📻 Dial FM + App</span>
                  <span class="absolute top-3.5 right-3.5 bg-[#1e293b]/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">30 inserções</span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="text-base font-bold text-[#0c0a09] leading-snug">Spot 30s - CBN (Jornalismo)</h3>
                    <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed line-clamp-3 min-h-[48px]">Spots comerciais de 30 segundos distribuídos nos horários de pico matutino e vespertino da rádio que toca notícia.</p>
                    <div class="flex flex-wrap items-center gap-1.5 mt-3.5">
                      <span class="px-2 py-0.5 rounded bg-[#C4170C] text-white text-[11px] font-bold">CBN</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">06h às 19h</span>
                    </div>
                  </div>
                  <div>
                    <div class="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-100">
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">investimento</span>
                        <div class="h-10 flex items-center rounded-[8px] border border-slate-300 bg-white px-3 text-sm font-semibold text-[#0c0a09]">R$ 1.200,00</div>
                      </div>
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">impressões</span>
                        <div class="h-10 flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-[#0c0a09]">👁 48,0 mil</div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <button type="button" onclick="showToast('Spot 30s - CBN adicionado à simulação!')" class="w-full h-10 bg-[#5b19b4] hover:bg-[#4a1296] text-white font-semibold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">adicionar produto</button>
                    </div>
                  </div>
                </div>
              </article>
              <article class="rounded-[14px] border border-[#d9d9d9] bg-white overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div class="relative h-[180px] bg-slate-900 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80" alt="Rádio Globo" class="w-full h-full object-cover opacity-90">
                  <span class="absolute top-3.5 left-3.5 bg-white/95 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">📻 Dial FM + App</span>
                  <span class="absolute top-3.5 right-3.5 bg-[#1e293b]/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">25 inserções</span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="text-base font-bold text-[#0c0a09] leading-snug">Spot 30s - Rádio Globo</h3>
                    <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed line-clamp-3 min-h-[48px]">Comerciais dinâmicos na programação musical, entretenimento e transmissões esportivas da Rádio Globo.</p>
                    <div class="flex flex-wrap items-center gap-1.5 mt-3.5">
                      <span class="px-2 py-0.5 rounded bg-[#FF6700] text-white text-[11px] font-bold">Rádio Globo</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">Rotativo</span>
                    </div>
                  </div>
                  <div>
                    <div class="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-100">
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">investimento</span>
                        <div class="h-10 flex items-center rounded-[8px] border border-slate-300 bg-white px-3 text-sm font-semibold text-[#0c0a09]">R$ 950,00</div>
                      </div>
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">impressões</span>
                        <div class="h-10 flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-[#0c0a09]">👁 42,5 mil</div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <button type="button" onclick="showToast('Spot 30s - Rádio Globo adicionado à simulação!')" class="w-full h-10 bg-[#5b19b4] hover:bg-[#4a1296] text-white font-semibold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">adicionar produto</button>
                    </div>
                  </div>
                </div>
              </article>
              <article class="rounded-[14px] border border-[#d9d9d9] bg-white overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div class="relative h-[180px] bg-slate-900 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=700&q=80" alt="BH FM" class="w-full h-full object-cover opacity-90">
                  <span class="absolute top-3.5 left-3.5 bg-white/95 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">🎙️ Testemunhal</span>
                  <span class="absolute top-3.5 right-3.5 bg-[#1e293b]/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">10 menções</span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="text-base font-bold text-[#0c0a09] leading-snug">Testemunhal 60s - Comunicadores</h3>
                    <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed line-clamp-3 min-h-[48px]">Menção de alta credibilidade lida pelos apresentadores durante os programas líderes de audiência.</p>
                    <div class="flex flex-wrap items-center gap-1.5 mt-3.5">
                      <span class="px-2 py-0.5 rounded bg-[#C4170C] text-white text-[11px] font-bold">CBN</span>
                      <span class="px-2 py-0.5 rounded bg-[#005CEF] text-white text-[11px] font-bold">BH FM</span>
                    </div>
                  </div>
                  <div>
                    <div class="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-100">
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">investimento</span>
                        <div class="h-10 flex items-center rounded-[8px] border border-slate-300 bg-white px-3 text-sm font-semibold text-[#0c0a09]">R$ 2.400,00</div>
                      </div>
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">impressões</span>
                        <div class="h-10 flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-[#0c0a09]">👁 65,0 mil</div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <button type="button" onclick="showToast('Testemunhal 60s adicionado à simulação!')" class="w-full h-10 bg-[#5b19b4] hover:bg-[#4a1296] text-white font-semibold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">adicionar produto</button>
                    </div>
                  </div>
                </div>
              </article>
              <article class="rounded-[14px] border border-[#d9d9d9] bg-white overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div class="relative h-[180px] bg-slate-900 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=700&q=80" alt="Áudio Digital" class="w-full h-full object-cover opacity-90">
                  <span class="absolute top-3.5 left-3.5 bg-white/95 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">🎧 Áudio Digital</span>
                  <span class="absolute top-3.5 right-3.5 bg-[#1e293b]/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">CPM R$ 32,00</span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="text-base font-bold text-[#0c0a09] leading-snug">Áudio 30s - Podcasts &amp; Streaming</h3>
                    <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed line-clamp-3 min-h-[48px]">Anúncios em áudio nos principais podcasts da Globo e no player ao vivo das rádios via web e app.</p>
                    <div class="flex flex-wrap items-center gap-1.5 mt-3.5">
                      <span class="px-2 py-0.5 rounded bg-[#9B51E0] text-white text-[11px] font-bold">Podcasts Globo</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">Streaming</span>
                    </div>
                  </div>
                  <div>
                    <div class="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-100">
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">investimento</span>
                        <div class="h-10 flex items-center rounded-[8px] border border-slate-300 bg-white px-3 text-sm font-semibold text-[#0c0a09]">R$ 900,00</div>
                      </div>
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] block mb-1.5">impressões</span>
                        <div class="h-10 flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-[#0c0a09]">👁 28,1 mil</div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <button type="button" onclick="showToast('Áudio 30s - Podcasts e Streaming adicionado à simulação!')" class="w-full h-10 bg-[#5b19b4] hover:bg-[#4a1296] text-white font-semibold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">adicionar produto</button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div><!-- /#plp-mode-radio -->
        <div id="plp-mode-combos" class="hidden">
          <div class="apply-zoom max-w-[1580px] mx-auto px-4 lg:px-6 pt-6 pb-20">
            <div class="mb-6">
              <span class="inline-block bg-orange-100 text-[#FF4F00] text-[11px] font-extrabold px-2.5 py-0.5 rounded uppercase mb-1.5">Pacotes Multicanal</span>
              <h2 class="text-lg font-extrabold text-[#282E38]">Combos Aqui Ads (OOH + Digital | Globo)</h2>
              <p class="text-xs text-[#64748B] mt-0.5">Combinações prontas de telas OOH e formatos digitais nos portais Globo para acelerar sua campanha com alcance integrado.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <article class="rounded-2xl border border-[#d9d9d9] bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF4F00] text-xs font-extrabold">OOH + Digital</span>
                    <span class="text-xs font-semibold text-[#64748B]">2 semanas</span>
                  </div>
                  <h3 class="text-lg font-extrabold text-[#0c0a09]">Combo Presença de Bairro</h3>
                  <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed">Ideal para negócios locais: impacte moradores e trabalhadores nos elevadores da sua região e reforce sua marca no g1 e ge.</p>
                  <ul class="mt-4 space-y-2 text-xs text-[#282E38] border-t border-slate-100 pt-4">
                    <li class="flex items-center gap-2"><span class="text-[#16A34A] font-bold">✓</span> 3 pontos OOH em edifícios residenciais e comerciais</li>
                    <li class="flex items-center gap-2"><span class="text-[#16A34A] font-bold">✓</span> Display Portais Globo (g1, ge, gshow)</li>
                    <li class="flex items-center gap-2"><span class="text-[#16A34A] font-bold">✓</span> ~220 mil impressões estimadas</li>
                  </ul>
                </div>
                <div class="mt-6 pt-4 border-t border-slate-100">
                  <div class="flex items-baseline justify-between mb-4">
                    <span class="text-xs text-[#64748B]">Investimento total</span>
                    <div>
                      <strong class="text-xl font-extrabold text-[#0c0a09]">R$ 1.828,27</strong>
                      <span class="block text-[10px] text-[#64748B] text-right">Em até 3x sem juros</span>
                    </div>
                  </div>
                  <button type="button" onclick="window.AquiAdsUI.setCartPreset('hybrid', true); showScreen('view-resumo'); showToast('Combo Presença de Bairro carregado no seu plano!');" class="w-full h-10 bg-[#5b19b4] hover:bg-[#4a1296] text-white font-semibold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">selecionar combo</button>
                </div>
              </article>
              <article class="rounded-2xl border-2 border-[#FF4F00] bg-white p-6 shadow-md transition-all flex flex-col justify-between relative">
                <span class="absolute -top-3 right-5 bg-[#FF4F00] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase shadow-2xs">Mais escolhido</span>
                <div>
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF4F00] text-xs font-extrabold">OOH + Vídeo + Portais</span>
                    <span class="text-xs font-semibold text-[#64748B]">2 semanas</span>
                  </div>
                  <h3 class="text-lg font-extrabold text-[#0c0a09]">Combo Alcance Regional</h3>
                  <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed">Combina alta frequência em telas digitais OOH com formatos de alto impacto visual e vídeo nos portais da Globo.</p>
                  <ul class="mt-4 space-y-2 text-xs text-[#282E38] border-t border-slate-100 pt-4">
                    <li class="flex items-center gap-2"><span class="text-[#16A34A] font-bold">✓</span> 5 pontos OOH comerciais e residenciais de alto fluxo</li>
                    <li class="flex items-center gap-2"><span class="text-[#16A34A] font-bold">✓</span> Vídeo 15s + Display nos Portais Globo</li>
                    <li class="flex items-center gap-2"><span class="text-[#16A34A] font-bold">✓</span> ~380 mil impressões estimadas</li>
                  </ul>
                </div>
                <div class="mt-6 pt-4 border-t border-slate-100">
                  <div class="flex items-baseline justify-between mb-4">
                    <span class="text-xs text-[#64748B]">Investimento total</span>
                    <div>
                      <strong class="text-xl font-extrabold text-[#0c0a09]">R$ 3.490,00</strong>
                      <span class="block text-[10px] text-[#64748B] text-right">Em até 3x sem juros</span>
                    </div>
                  </div>
                  <button type="button" onclick="window.AquiAdsUI.setCartPreset('hybrid', true); showScreen('view-resumo'); showToast('Combo Alcance Regional carregado no seu plano!');" class="w-full h-10 bg-[#FF4F00] hover:bg-[#E04600] text-white font-bold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">selecionar combo</button>
                </div>
              </article>
              <article class="rounded-2xl border border-[#d9d9d9] bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="px-2.5 py-1 rounded-md bg-orange-50 text-[#FF4F00] text-xs font-extrabold">OOH + CTV + Portais</span>
                    <span class="text-xs font-semibold text-[#64748B]">4 semanas</span>
                  </div>
                  <h3 class="text-lg font-extrabold text-[#0c0a09]">Combo Domínio 360º</h3>
                  <p class="text-xs text-[#5f6b7a] mt-1.5 leading-relaxed">Cobertura completa durante 4 semanas nas principais vias, edifícios comerciais e telas conectadas Globoplay + Portais.</p>
                  <ul class="mt-4 space-y-2 text-xs text-[#282E38] border-t border-slate-100 pt-4">
                    <li class="flex items-center gap-2"><span class="text-[#16A34A] font-bold">✓</span> 8 pontos OOH (Comercial + Residencial + Rua)</li>
                    <li class="flex items-center gap-2"><span class="text-[#16A34A] font-bold">✓</span> Globoplay CTV + Display Portais Globo</li>
                    <li class="flex items-center gap-2"><span class="text-[#16A34A] font-bold">✓</span> ~610 mil impressões estimadas</li>
                  </ul>
                </div>
                <div class="mt-6 pt-4 border-t border-slate-100">
                  <div class="flex items-baseline justify-between mb-4">
                    <span class="text-xs text-[#64748B]">Investimento total</span>
                    <div>
                      <strong class="text-xl font-extrabold text-[#0c0a09]">R$ 5.890,00</strong>
                      <span class="block text-[10px] text-[#64748B] text-right">Em até 3x sem juros</span>
                    </div>
                  </div>
                  <button type="button" onclick="window.AquiAdsUI.setCartPreset('hybrid', true); showScreen('view-resumo'); showToast('Combo Domínio 360º carregado no seu plano!');" class="w-full h-10 bg-[#5b19b4] hover:bg-[#4a1296] text-white font-semibold text-sm rounded-[8px] transition-colors flex items-center justify-center cursor-pointer">selecionar combo</button>
                </div>
              </article>
            </div>
          </div>
        </div><!-- /#plp-mode-combos -->

        <!-- BARRA INFERIOR FIXA DA PÁGINA DE RESULTADOS (Fiel aos Prints 1 e 2 e resultados_ooh.html) -->
        <div id="actions-bar-results" class="sticky bottom-0 z-20 w-full border-t border-gray-200 bg-white py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
          <div class="apply-zoom w-full max-w-[1660px] mx-auto px-4 sm:px-6 lg:px-0 flex items-center justify-between gap-4">
            <div id="plp-bar-summary-left" class="hidden flex items-center gap-6">
              <div class="leading-tight">
                <span id="plp-bar-count-label" class="block text-xs font-normal text-[#64748B]"><span id="plp-bar-count">0</span> produtos selecionados</span>
                <strong class="block text-sm font-extrabold text-[#282E38] mt-0.5">Total <span id="plp-bar-total">R$ 0,00</span></strong>
              </div>
            </div>
            <button id="resultpage_next-button" type="button" onclick="showScreen('view-resumo')" class="bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed pointer-events-none ml-auto px-6 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2">
              <span>continuar</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- TELA 1.B: PÁGINA DE RESUMO ("PLANO DE MÍDIA" - FIEL AOS PRINTS OFICIAIS) -->
      <!-- ===================================================================== -->
      <main id="view-resumo" class="view-section flex-1 bg-[#F8F9FA] pb-16">
        <div class="max-w-[1220px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <!-- Botão Voltar (Texto limpo sem caixa/borda, fiel ao print) -->
          <div class="mb-4">
            <button type="button" onclick="showScreen('view-resultados')" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#282E38] hover:text-[#FF4F00] cursor-pointer transition">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
              <span>voltar</span>
            </button>
          </div>

          <!-- Barra de Título "Plano de mídia" + 2 Botões à Direita -->
          <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 class="text-xl font-bold text-[#282E38] tracking-tight">Plano de mídia</h1>
            <div class="flex items-center gap-2.5">
              <button type="button" onclick="openSaveDraftModal()" class="border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#282E38] bg-white hover:bg-gray-50 inline-flex items-center gap-2 cursor-pointer transition">
                <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
                <span>salvar como rascunho</span>
              </button>
              <button type="button" onclick="showToast('Link da proposta copiado para a área de transferência!')" class="border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#282E38] bg-white hover:bg-gray-50 inline-flex items-center gap-2 cursor-pointer transition">
                <svg class="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                <span>compartilhar proposta</span>
              </button>
            </div>
          </div>

          <!-- Grid Principal 2 Colunas (7 Colunas Esquerda: Acordeões | 5 Colunas Direita: Card Único) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            <!-- COLUNA ESQUERDA: ACORDEÕES DE MÍDIA (DIGITAL + OOH) -->
            <div class="lg:col-span-7 space-y-5">

              <!-- ACORDEÃO 1: DIGITAL -->
              <div id="resumo-accordion-digital" class="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-2xs">
                <div class="flex items-center justify-between">
                  <button type="button" onclick="toggleResumoAccordion('digital')" class="w-full flex items-center justify-between text-sm font-bold text-[#282E38] cursor-pointer">
                    <span class="inline-flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#282E38]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 000 18M12 3a14.5 14.5 0 010 18"/></svg>
                      <span>Digital</span>
                    </span>
                    <span id="resumo-acc-icon-digital" class="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#282E38] flex items-center justify-center transition-transform">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                    </span>
                  </button>
                </div>

                <div id="resumo-acc-body-digital" class="pt-4 space-y-4">
                  <!-- Box Público Alvo (Grid 2x2 fiel aos prints) -->
                  <div class="bg-[#F1F5F9] rounded-xl p-4">
                    <div class="flex items-center justify-between mb-3">
                      <p class="text-xs font-semibold text-[#475569]">Público alvo</p>
                      <button type="button" onclick="promptEditDigitalLocation()" class="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer">
                        Editar
                      </button>
                    </div>
                    <div class="grid grid-cols-2 gap-y-3 gap-x-8 text-xs">
                      <div>
                        <p class="text-[11px] text-[#64748B]">local</p>
                        <p id="resumo-target-local" class="font-medium text-[#282E38] mt-0.5">Todos</p>
                      </div>
                      <div>
                        <p class="text-[11px] text-[#64748B]">interesse</p>
                        <p id="resumo-target-interesse" class="font-medium text-[#282E38] mt-0.5">Todos</p>
                      </div>
                      <div>
                        <p class="text-[11px] text-[#64748B]">idade</p>
                        <p id="resumo-target-idade" class="font-medium text-[#282E38] mt-0.5">Todos</p>
                      </div>
                      <div>
                        <p class="text-[11px] text-[#64748B]">gênero</p>
                        <p id="resumo-target-genero" class="font-medium text-[#282E38] mt-0.5">Todos</p>
                      </div>
                    </div>
                  </div>

                  <!-- Barra de Seleção em Lote Digital (Visível apenas quando há itens marcados) -->
                  <div id="batch-bar-digital" class="hidden items-center justify-between pt-1 pb-1 text-xs">
                    <label class="inline-flex items-center gap-2 font-medium text-gray-700 cursor-pointer select-none">
                      <input id="batch-check-all-digital" type="checkbox" onchange="toggleSelectAllChannel('digital', this.checked)" class="w-4 h-4 rounded accent-[#FF4F00] cursor-pointer">
                      <span>selecionar tudo</span>
                    </label>
                    <button id="batch-btn-remove-digital" type="button" onclick="removeBatchSelected('digital')" class="hidden px-3 py-1.5 rounded-lg bg-[#E75D4B] hover:bg-[#D64C3A] text-white text-xs font-bold items-center gap-1.5 cursor-pointer transition shadow-2xs">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      <span id="batch-remove-label-digital">remover 1 do plano</span>
                    </button>
                  </div>

                  <!-- Lista de Itens Digitais no Plano -->
                  <div id="resumo-digital-list" class="divide-y divide-gray-100">
                    <!-- Preenchido via JS populateResumoScreen() -->
                  </div>
                </div>
              </div>

              <!-- ACORDEÃO 2: OOH | OUT OF HOME · DIGITAL -->
              <div id="resumo-accordion-ooh" class="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-2xs">
                <div class="flex items-center justify-between">
                  <button type="button" onclick="toggleResumoAccordion('ooh')" class="w-full flex items-center justify-between text-sm font-bold text-[#282E38] cursor-pointer">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-4 h-4 text-[#282E38]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      <span>OOH | Out of Home</span>
                      <span class="text-sm font-normal text-[#64748B]">· Digital</span>
                    </div>
                    <span id="resumo-acc-icon-ooh" class="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#282E38] flex items-center justify-center transition-transform">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                    </span>
                  </button>
                </div>

                <div id="resumo-acc-body-ooh" class="pt-4 space-y-3">
                  <!-- Barra de Seleção em Lote OOH (Visível apenas quando há itens marcados) -->
                  <div id="batch-bar-ooh" class="hidden items-center justify-between pt-1 pb-1 text-xs">
                    <label class="inline-flex items-center gap-2 font-medium text-gray-700 cursor-pointer select-none">
                      <input id="batch-check-all-ooh" type="checkbox" onchange="toggleSelectAllChannel('ooh', this.checked)" class="w-4 h-4 rounded accent-[#FF4F00] cursor-pointer">
                      <span>selecionar tudo</span>
                    </label>
                    <button id="batch-btn-remove-ooh" type="button" onclick="removeBatchSelected('ooh')" class="hidden px-3 py-1.5 rounded-lg bg-[#E75D4B] hover:bg-[#D64C3A] text-white text-xs font-bold items-center gap-1.5 cursor-pointer transition shadow-2xs">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      <span id="batch-remove-label-ooh">remover 1 do plano</span>
                    </button>
                  </div>

                  <!-- Lista de Itens OOH no Plano -->
                  <div id="resumo-ooh-list" class="divide-y divide-gray-100">
                    <!-- Preenchido via JS populateResumoScreen() -->
                  </div>
                </div>
              </div>

              <!-- ACORDEÃO 3: RÁDIO (Fiel ao Summary.vue c/ badge Confirmação por especialista) -->
              <div id="resumo-accordion-radio" class="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-2xs">
                <div class="flex items-center justify-between">
                  <button type="button" onclick="toggleResumoAccordion('radio')" class="w-full flex items-center justify-between text-sm font-bold text-[#282E38] cursor-pointer">
                    <div class="flex items-center gap-2 flex-wrap">
                      <svg class="w-4 h-4 text-[#282E38]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                      <span>Rádio</span>
                      <span class="inline-flex items-center rounded-md bg-orange-50 px-2.5 py-0.5 text-[11px] font-medium text-[#FF4F00]">Confirmação por especialista</span>
                    </div>
                    <span id="resumo-acc-icon-radio" class="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#282E38] flex items-center justify-center transition-transform rotate-180">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                    </span>
                  </button>
                </div>
                <div id="resumo-acc-body-radio" class="hidden pt-4 space-y-3">
                  <div class="py-3 px-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-3">
                    <div>
                      <p class="text-xs font-bold text-[#282E38]">Nenhuma emissora de Rádio adicionada ao plano</p>
                      <p class="text-[11px] text-[#64748B] mt-0.5">Combine sua campanha com spots nas rádios líderes de audiência (CBN, Rádio Globo e BH FM).</p>
                    </div>
                    <button type="button" onclick="showToast('Alternando para página de resultados Rádio...')" class="px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-gray-50 text-xs font-bold text-[#282E38] shrink-0 cursor-pointer transition">Explorar Rádio</button>
                  </div>
                </div>
              </div>

              <!-- ACORDEÃO 4: TV -->
              <div id="resumo-accordion-tv" class="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-2xs">
                <div class="flex items-center justify-between">
                  <button type="button" onclick="toggleResumoAccordion('tv')" class="w-full flex items-center justify-between text-sm font-bold text-[#282E38] cursor-pointer">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#282E38]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
                      <span>TV</span>
                    </div>
                    <span id="resumo-acc-icon-tv" class="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#282E38] flex items-center justify-center transition-transform rotate-180">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                    </span>
                  </button>
                </div>
                <div id="resumo-acc-body-tv" class="hidden pt-4 space-y-3">
                  <div class="py-3 px-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-3">
                    <div>
                      <p class="text-xs font-bold text-[#282E38]">Nenhum formato de TV adicionado ao plano</p>
                      <p class="text-[11px] text-[#64748B] mt-0.5">Amplie o alcance regional da sua marca anunciando na programação da TV Globo e canais por assinatura.</p>
                    </div>
                    <button type="button" onclick="showToast('Alternando para página de resultados TV...')" class="px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-gray-50 text-xs font-bold text-[#282E38] shrink-0 cursor-pointer transition">Explorar TV</button>
                  </div>
                </div>
              </div>

              <!-- ACORDEÃO 5: COMBOS -->
              <div id="resumo-accordion-combos" class="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-2xs">
                <div class="flex items-center justify-between">
                  <button type="button" onclick="toggleResumoAccordion('combos')" class="w-full flex items-center justify-between text-sm font-bold text-[#282E38] cursor-pointer">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#282E38]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                      <span>Combos</span>
                    </div>
                    <span id="resumo-acc-icon-combos" class="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#282E38] flex items-center justify-center transition-transform rotate-180">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                    </span>
                  </button>
                </div>
                <div id="resumo-acc-body-combos" class="hidden pt-4 space-y-3">
                  <div class="py-3 px-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-3">
                    <div>
                      <p class="text-xs font-bold text-[#282E38]">Nenhum Combo multicanal selecionado</p>
                      <p class="text-[11px] text-[#64748B] mt-0.5">Confira pacotes prontos combinando OOH + Digital com condições especiais.</p>
                    </div>
                    <button type="button" onclick="showToast('Alternando para Combos...')" class="px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-gray-50 text-xs font-bold text-[#282E38] shrink-0 cursor-pointer transition">Ver Combos</button>
                  </div>
                </div>
              </div>

              <!-- Botão Contratar Mais Produtos Largura Total -->
              <div>
                <button type="button" onclick="showScreen('view-resultados')" class="w-full py-2.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-gray-50 text-xs font-bold text-[#282E38] cursor-pointer transition text-center">
                  contratar mais produtos
                </button>
              </div>
            </div>

            <!-- COLUNA DIREITA: CARD BRANCO ÚNICO CONSOLIDADO -->
            <div class="lg:col-span-5">
              <div class="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-2xs space-y-5">

                <!-- SEÇÃO 1: CONFIGURE SEU ANÚNCIO -->
                <div>
                  <h2 class="text-sm font-bold text-[#282E38] mb-4">Configure seu anúncio</h2>

                  <!-- Nome da campanha + contador alinhado à direita -->
                  <div class="mb-3.5">
                    <label class="block text-[11px] text-[#64748B] mb-1.5">Nome da campanha</label>
                    <input id="resumo-camp-name" type="text" maxlength="30" value="" placeholder="Nome da campanha" oninput="updateResumoCampaignName(this.value)" class="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs text-[#282E38] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF4F00]">
                    <div class="flex justify-end mt-1">
                      <p id="resumo-char-count" class="text-[10.5px] text-[#64748B]">0/30 caracteres</p>
                    </div>
                  </div>

                  <!-- Grid Duração | Início | Fim (Com ícone de calendário à esquerda dentro de cada campo) -->
                  <div class="grid grid-cols-3 gap-2.5 mb-3.5">
                    <div>
                      <label class="block text-[11px] text-[#64748B] mb-1">duração</label>
                      <div class="relative flex items-center border border-[#E2E8F0] rounded-lg px-2.5 py-2 bg-white focus-within:border-[#FF4F00]">
                        <svg class="w-3.5 h-3.5 text-[#94A3B8] shrink-0 mr-1.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
                        <select id="resumo-duration-select" onchange="updateResumoDuration(this.value)" class="w-full text-xs text-[#282E38] bg-transparent focus:outline-none cursor-pointer">
                          <option id="resumo-dur-opt-agnostic" value="agnostic">— semanas</option>
                          <option value="14">2 semanas</option>
                          <option value="28">4 semanas</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label class="block text-[11px] text-[#64748B] mb-1">início</label>
                      <div class="relative flex items-center border border-[#E2E8F0] rounded-lg px-2.5 py-2 bg-white focus-within:border-[#FF4F00]">
                        <svg class="w-3.5 h-3.5 text-[#94A3B8] shrink-0 mr-1.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
                        <input id="resumo-start-date" type="text" value="dd/mm/aaaa" placeholder="dd/mm/aaaa" onchange="updateResumoStartDate(this.value)" class="w-full text-xs text-[#282E38] bg-transparent focus:outline-none">
                      </div>
                    </div>
                    <div>
                      <label class="block text-[11px] text-[#64748B] mb-1">fim</label>
                      <div class="w-full border border-[#E2E8F0] rounded-lg px-2.5 py-2 text-xs text-[#64748B] bg-[#F8FAFC] select-none flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-[#94A3B8] shrink-0" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
                        <span id="resumo-end-date">dd/mm/aaaa</span>
                      </div>
                    </div>
                  </div>

                  <!-- Tags de Resumo Dinâmicas -->
                  <div id="resumo-summary-tags" class="flex flex-wrap items-center gap-1.5">
                    <!-- Preenchido via JS updateResumoRightCardUI() -->
                  </div>
                </div>

                <hr class="border-gray-100">

                <!-- SEÇÃO 2: PERFORMANCE PROJETADA -->
                <div>
                  <h3 class="text-sm font-bold text-[#282E38] mb-3">Performance projetada</h3>

                  <!-- Bloco Digital (Contextual) -->
                  <div id="resumo-perf-digital-block">
                    <p class="text-xs font-bold text-[#282E38] mb-2">Digital</p>
                    <div class="flex items-start gap-8">
                      <div>
                        <p class="text-[11px] text-[#64748B] flex items-center gap-1">
                          <span>impressões</span>
                          <span class="text-[10px] text-[#94A3B8]">▷</span>
                        </p>
                        <p id="resumo-perf-dig-imp" class="text-xs font-extrabold text-[#282E38] mt-0.5">—</p>
                      </div>
                      <div>
                        <p class="text-[11px] text-[#64748B]">portais</p>
                        <div id="resumo-perf-dig-portals" class="flex items-center gap-1 flex-wrap mt-0.5 text-xs font-extrabold text-[#282E38]">
                          —
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Divisória entre Digital e OOH dentro de Performance projetada -->
                  <hr id="resumo-perf-divider" class="border-gray-100 my-4">

                  <!-- Bloco OOH | Out of Home (Contextual - 5 colunas na mesma linha) -->
                  <div id="resumo-perf-ooh-block">
                    <p class="text-xs font-bold text-[#282E38] mb-2">OOH | Out of Home</p>
                    <div class="grid grid-cols-5 gap-2 text-left">
                      <div>
                        <p class="text-[11px] text-[#64748B] flex items-center gap-0.5"><span>exibições</span><span class="text-[9px] text-[#94A3B8]">▷</span></p>
                        <p id="resumo-perf-ooh-views" class="text-xs font-extrabold text-[#282E38] mt-0.5">—</p>
                      </div>
                      <div>
                        <p class="text-[11px] text-[#64748B] flex items-center gap-0.5"><span>alcance</span><span class="text-[9px] text-[#94A3B8]">👤</span></p>
                        <p id="resumo-perf-ooh-reach" class="text-xs font-extrabold text-[#282E38] mt-0.5">—</p>
                      </div>
                      <div>
                        <p class="text-[11px] text-[#64748B] flex items-center gap-0.5"><span>impacto</span><span class="text-[9px] text-[#94A3B8]">🎯</span></p>
                        <p id="resumo-perf-ooh-impact" class="text-xs font-extrabold text-[#282E38] mt-0.5">—</p>
                      </div>
                      <div>
                        <p class="text-[11px] text-[#64748B] flex items-center gap-0.5"><span>frequência</span><span class="text-[9px] text-[#94A3B8]">↻</span></p>
                        <p id="resumo-perf-ooh-freq" class="text-xs font-extrabold text-[#282E38] mt-0.5">—</p>
                      </div>
                      <div>
                        <p class="text-[11px] text-[#64748B] flex items-center gap-0.5"><span>telas</span><span class="text-[9px] text-[#94A3B8]">🖥</span></p>
                        <p id="resumo-perf-ooh-screens" class="text-xs font-extrabold text-[#282E38] mt-0.5">—</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="border-gray-100">

                <!-- SEÇÃO 3: VALOR -->
                <div>
                  <h3 class="text-sm font-bold text-[#282E38] mb-3">Valor</h3>
                  <div class="flex items-center gap-1.5 pb-3 mb-3 border-b border-gray-100">
                    <span class="text-xs text-[#64748B]">Possui cupom?</span>
                    <button type="button" onclick="showToast('Campo de cupom de desconto habilitado!')" class="text-xs font-semibold text-[#10B981] hover:underline cursor-pointer">
                      Adicionar
                    </button>
                  </div>

                  <div class="space-y-2 text-xs mb-4">
                    <div id="resumo-row-val-digital" class="flex items-center justify-between text-[#475569]">
                      <span>Campanha Digital</span>
                      <span id="resumo-val-digital" class="font-medium text-[#282E38]">R$ —</span>
                    </div>
                    <div id="resumo-row-val-ooh" class="flex items-center justify-between text-[#475569]">
                      <span>Campanha Out of Home</span>
                      <span id="resumo-val-ooh" class="font-medium text-[#282E38]">R$ —</span>
                    </div>
                    <div class="flex items-center justify-between font-bold text-[#282E38] pt-1">
                      <span>Subtotal</span>
                      <span id="resumo-val-subtotal">R$ —</span>
                    </div>
                    <div class="flex items-center justify-between text-sm font-extrabold text-[#282E38] pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span id="resumo-val-total">R$ —</span>
                    </div>
                  </div>

                  <!-- Aviso Informativo Fiel aos Prints -->
                  <p class="text-[10.5px] text-[#64748B] flex items-center gap-1.5 mb-5">
                    <span class="text-gray-400">ⓘ</span>
                    <span>Os planos de mídia podem sofrer alteração de valores e/ou disponibilidade de pontos sem aviso prévio.</span>
                  </p>

                  <!-- Botões Enviar Criativo e Realizar Pagamento -->
                  <div class="grid grid-cols-2 gap-3">
                    <button type="button" onclick="openEnvioArteFromResumo()" class="py-2.5 px-3 rounded-lg border border-[#E2E8F0] bg-white hover:bg-gray-50 text-xs font-bold text-[#282E38] cursor-pointer transition text-center">
                      enviar criativo
                    </button>
                    <button type="button" onclick="goToPagamento()" class="py-2.5 px-3 rounded-lg bg-[#FF4F00] hover:bg-[#E04600] text-white text-xs font-bold cursor-pointer transition text-center shadow-xs">
                      realizar pagamento
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <div id="hook-after-resumo-content" class="mt-6"></div>
          </div>
        </div>
      </main>

      <!-- ===================================================================== -->
      <!-- TELA 1.C: ENVIAR CRIATIVO (3 CAMINHOS + URL CONDICIONAL + TEMPLATES)  -->
      <!-- ===================================================================== -->
      <main id="view-envio-arte" class="view-section flex-1 flex flex-col justify-between bg-white">
        <!-- SUB-VIEW 1: CONFIGURE OS DETALHES DO SEU ANÚNCIO (FIEL AO PRINT OFICIAL 07) -->
        <div id="art-subview-selecao" class="max-w-[960px] w-full mx-auto px-4 sm:px-6 pt-10 pb-28">
          <div class="mb-5">
            <h1 class="text-xl font-bold text-[#282E38] tracking-tight">Configure os detalhes do seu anúncio</h1>
            <p class="mt-1 text-xs text-[#64748B]">Campanha: <span id="envio-arte-camp-name" class="text-[#282E38]">—</span></p>
          </div>

          <!-- Grid 3 Cards de Opção (Fiel ao Print Oficial) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <!-- Opção 1: Enviar minha arte -->
            <div id="art-method-card-upload" onclick="selectArtCreationMethod('upload')" class="rounded-lg border border-gray-200 hover:border-gray-300 bg-white p-6 cursor-pointer transition flex flex-col">
              <!-- Ilustração 148x136 em #F3F2EE (Notebook roxo + paisagem laranja + seta upload) -->
              <div class="w-[148px] h-[136px] mx-auto mb-5 rounded-lg bg-[#F3F2EE] flex items-center justify-center">
                <svg class="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <!-- Base e tela do notebook roxo -->
                  <rect x="20" y="34" width="60" height="40" rx="3" fill="#4C1D95"/>
                  <rect x="24" y="38" width="52" height="32" rx="1.5" fill="#DDD6FE"/>
                  <path d="M13 74H87L83 80H17L13 74Z" fill="#4C1D95"/>
                  <!-- Card de imagem laranja emergindo da tela -->
                  <rect x="33" y="24" width="34" height="27" rx="2.5" fill="#FB923C" stroke="#4C1D95" stroke-width="2"/>
                  <circle cx="42" cy="32" r="3" fill="#FEF08A"/>
                  <path d="M35 48L44 37L52 45L58 39L65 48H35Z" fill="#EA580C"/>
                  <!-- Seta laranja de upload -->
                  <path d="M50 11L58 19H53V27H47V19H42L50 11Z" fill="#F97316"/>
                </svg>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <input id="radio-art-upload" type="radio" name="art_method" class="w-3.5 h-3.5 accent-[#FF4F00] cursor-pointer">
                <h3 class="text-xs font-bold text-[#282E38]">Enviar minha arte</h3>
              </div>
              <p class="text-[11px] text-[#64748B] leading-relaxed">Já tem sua arte pronta? Faça o upload do arquivo para veicular seu anúncio.</p>
            </div>

            <!-- Opção 2: Utilizar modelos prontos -->
            <div id="art-method-card-modelos" onclick="selectArtCreationMethod('modelos')" class="rounded-lg border border-gray-200 hover:border-gray-300 bg-white p-6 cursor-pointer transition flex flex-col">
              <!-- Ilustração 148x136 em #F3F2EE (Quadros 1 roxo e 2 verde + mão rosa) -->
              <div class="w-[148px] h-[136px] mx-auto mb-5 rounded-lg bg-[#F3F2EE] flex items-center justify-center">
                <svg class="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <!-- Quadro 1 (roxo) -->
                  <rect x="20" y="20" width="32" height="32" rx="4" fill="#6D28D9"/>
                  <text x="36" y="42" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="800" font-family="Inter, sans-serif">1</text>
                  <!-- Quadro 2 (verde) -->
                  <rect x="46" y="34" width="32" height="32" rx="4" fill="#34D399" stroke="#4C1D95" stroke-width="2"/>
                  <text x="62" y="56" text-anchor="middle" fill="#064E3B" font-size="16" font-weight="800" font-family="Inter, sans-serif">2</text>
                  <!-- Mão rosa apontando -->
                  <path d="M40 78C40 70 45 64 51 64C55 64 58 67 60 72L62 78H40Z" fill="#F472B6"/>
                  <rect x="49" y="55" width="6" height="14" rx="3" fill="#F472B6"/>
                </svg>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <input id="radio-art-modelos" type="radio" name="art_method" class="w-3.5 h-3.5 accent-[#FF4F00] cursor-pointer">
                <h3 class="text-xs font-bold text-[#282E38]">Utilizar modelos prontos</h3>
              </div>
              <p class="text-[11px] text-[#64748B] leading-relaxed">Personalize modelos prontos e gere textos e imagens com IA para deixar o anúncio com a cara da sua marca.</p>
            </div>

            <!-- Opção 3: Contratar uma arte -->
            <div id="art-method-card-contratar" onclick="selectArtCreationMethod('contratar')" class="rounded-lg border border-gray-200 hover:border-gray-300 bg-white p-6 cursor-pointer transition flex flex-col justify-between">
              <div>
                <!-- Ilustração 148x136 em #F3F2EE (Tablet roxo isométrico + mão amarela desenhando) -->
                <div class="w-[148px] h-[136px] mx-auto mb-5 rounded-lg bg-[#F3F2EE] flex items-center justify-center">
                  <svg class="w-24 h-24" viewBox="0 0 100 100" fill="none">
                    <!-- Tablet isométrico roxo -->
                    <rect x="20" y="36" width="48" height="34" rx="5" transform="rotate(-12 20 36)" fill="#5B21B6"/>
                    <rect x="24" y="40" width="40" height="26" rx="2.5" transform="rotate(-12 24 40)" fill="#EDE9FE"/>
                    <circle cx="43" cy="49" r="7" fill="#F97316"/>
                    <!-- Caneta stylus e mão amarela -->
                    <path d="M52 46L74 24L79 29L57 51L50 53L52 46Z" fill="#4C1D95"/>
                    <path d="M62 36C67 34 74 37 77 43L82 53L67 58L59 45C58 41 59 37 62 36Z" fill="#FACC15"/>
                  </svg>
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <input id="radio-art-contratar" type="radio" name="art_method" class="w-3.5 h-3.5 accent-[#FF4F00] cursor-pointer">
                  <h3 class="text-xs font-bold text-[#282E38]">Contratar uma arte</h3>
                </div>
                <p class="text-[11px] text-[#64748B] leading-relaxed">Conte com o nosso time de criação para fazer sua arte.</p>
              </div>

              <div class="mt-3 pt-1">
                <div class="text-[10px] text-gray-400 line-through">R$ 199,99</div>
                <div class="flex items-center justify-between gap-2 mt-0.5">
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm font-extrabold text-[#282E38]">R$ 99,00</span>
                    <span class="bg-[#10B981] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">50% OFF</span>
                  </div>
                  <button type="button" onclick="event.stopPropagation(); showToast('A equipe criativa produz todos os formatos da sua campanha em até 2 dias úteis.')" class="text-[11px] font-semibold text-[#282E38] underline cursor-pointer">Saiba mais</button>
                </div>
                <div class="mt-2.5 w-full text-center bg-[#FFF0E6] text-[#FF4F00] text-[10px] font-medium px-2 py-1 rounded">
                  * Desconto válido até 31/10/2026.
                </div>
              </div>
            </div>
          </div>

          <!-- Bloco URL de destino (Direto no fundo branco, sem card cinza — Fiel ao Print Oficial) -->
          <div id="block-url-destino" class="pt-1 mb-6">
            <h2 class="text-lg font-bold text-[#282E38] mb-1.5">URL de destino</h2>
            <p class="text-xs text-[#64748B] leading-relaxed">
              Escolha para onde o seu público será levado ao clicar em seu anúncio. A URL de destino passará por uma análise pelo nosso time técnico após a confirmação do pagamento.
            </p>
            <p class="text-xs text-[#64748B] mb-4 leading-relaxed">
              Confira nossas <button type="button" onclick="showToast('Políticas de conteúdo Aqui Ads')" class="text-[#282E38] underline font-semibold cursor-pointer">Políticas de conteúdo</button>.
            </p>
            <div>
              <input id="creative-dest-url" type="url" value="" oninput="if(window.cartState) window.cartState.destinationUrl = this.value" class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-[#282E38] placeholder-gray-400 bg-white focus:outline-none focus:border-[#FF4F00]" placeholder="https://www.seusite.com.br">
            </div>
          </div>

          <!-- Box Briefing quando "Contratar uma arte" estiver selecionado e avançar -->
          <div id="block-briefing-contratar" class="hidden bg-[#F8FAFC] rounded-xl border border-gray-200 p-5 mb-6">
            <h2 class="text-sm font-bold text-[#282E38] mb-1">Briefing para produção das peças</h2>
            <p class="text-xs text-[#64748B] mb-3">Descreva a mensagem principal, cores da marca e informações de contato que devem constar nos anúncios.</p>
            <textarea id="creative-briefing-text" rows="3" class="w-full border border-gray-300 rounded-lg p-3 text-xs text-[#282E38] bg-white mb-3 focus:outline-none focus:border-[#FF4F00]" placeholder="Ex.: Destacar campanha institucional com chamada para canais digitais e endereço comercial."></textarea>
            <button type="button" onclick="showToast('Logotipo e manual da marca anexados ao briefing!')" class="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-800 cursor-pointer">
              + Anexar logotipo e referências
            </button>
          </div>
        </div>

        <!-- SUB-VIEW 2: UPLOAD DE ARQUIVOS E PREVIEW INTERATIVO POR FORMATO (OOH 62PX + DIGITAL) -->
        <div id="art-subview-upload" class="hidden max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
            <button type="button" onclick="backToArtSelection()" class="px-3.5 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 inline-flex items-center gap-1.5 cursor-pointer">
              <span>‹</span> alterar forma de envio
            </button>
            <div class="text-xs text-gray-500">
              Campanha: <strong id="upload-subview-camp-name" class="text-gray-900">—</strong>
            </div>
          </div>

          <div class="flex flex-col lg:flex-row gap-6 items-start">
            <!-- Sidebar Esquerda (lg:w-[410px]): Acordeões de Formatos Contratados -->
            <div class="w-full lg:w-[410px] shrink-0 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
              <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h2 class="text-base font-bold text-gray-900">Arquivos</h2>
                  <p id="art-upload-progress-text" class="text-xs text-gray-500 mt-0.5">0 de 0 produtos prontos para publicação</p>
                </div>
                <span id="art-upload-status-badge" class="bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold px-2.5 py-1 rounded-full">Pendente</span>
              </div>

              <!-- Acordeão Upload Digital (Contextual) -->
              <div id="upload-acc-digital" class="border border-gray-200 rounded-xl p-3.5 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-gray-900">Digital • Portais Globo</span>
                  <span id="upload-pill-digital" class="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">3 dimensões</span>
                </div>
                <p class="text-[11px] text-gray-500">Formatos: 300x250px, 728x90px e 970x250px (JPG ou PNG até 150KB)</p>
                <div class="grid grid-cols-3 gap-1.5">
                  <button type="button" onclick="switchUploadFormatPreview('dig-300x250')" class="px-2 py-1.5 rounded-lg border border-gray-200 hover:border-[#FF4F00] text-[11px] font-semibold text-gray-700 bg-gray-50 cursor-pointer">300x250px</button>
                  <button type="button" onclick="switchUploadFormatPreview('dig-728x90')" class="px-2 py-1.5 rounded-lg border border-gray-200 hover:border-[#FF4F00] text-[11px] font-semibold text-gray-700 bg-gray-50 cursor-pointer">728x90px</button>
                  <button type="button" onclick="switchUploadFormatPreview('dig-970x250')" class="px-2 py-1.5 rounded-lg border border-gray-200 hover:border-[#FF4F00] text-[11px] font-semibold text-gray-700 bg-gray-50 cursor-pointer">970x250px</button>
                </div>
                <button type="button" onclick="simulateFormatFileUpload('digital')" class="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#FF4F00] text-xs font-bold text-[#FF4F00] bg-orange-50/20 cursor-pointer transition">
                  + Enviar criativos Digitais
                </button>
              </div>

              <!-- Acordeão Upload OOH (Contextual) -->
              <div id="upload-acc-ooh" class="border border-gray-200 rounded-xl p-3.5 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-gray-900">OOH • Telas Digitais</span>
                  <span id="upload-pill-ooh" class="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">2 dimensões</span>
                </div>
                <p class="text-[11px] text-gray-500">Formatos: 800x600px (Elevador c/ régua 62px) e 1080x1920px Vertical</p>
                <div class="grid grid-cols-2 gap-2">
                  <button type="button" onclick="switchUploadFormatPreview('ooh-800x600')" class="px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-[#FF4F00] text-[11px] font-semibold text-gray-700 bg-gray-50 cursor-pointer">800x600px (Elevador)</button>
                  <button type="button" onclick="switchUploadFormatPreview('ooh-1080x1920')" class="px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-[#FF4F00] text-[11px] font-semibold text-gray-700 bg-gray-50 cursor-pointer">1080x1920px (Vertical)</button>
                </div>
                <button type="button" onclick="simulateFormatFileUpload('ooh')" class="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#FF4F00] text-xs font-bold text-[#FF4F00] bg-orange-50/20 cursor-pointer transition">
                  + Enviar criativos OOH
                </button>
              </div>
            </div>

            <!-- Área Direita de Preview Interativo -->
            <div class="flex-1 w-full bg-[#F8FAFC] rounded-2xl border border-gray-200 p-6 min-h-[420px] flex flex-col justify-between">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-200">
                <div>
                  <span id="upload-preview-title" class="text-xs font-bold text-gray-900">Preview da peça • OOH 800x600px (Elevador Residencial)</span>
                  <p id="upload-preview-subtitle" class="text-[11px] text-gray-500">Verifique as margens de segurança antes de prosseguir para o pagamento.</p>
                </div>
                <span class="text-[11px] font-semibold text-gray-600 bg-white border border-gray-200 px-2.5 py-1 rounded-lg">Visualização em escala</span>
              </div>

              <!-- Moldura Central do Preview -->
              <div class="my-6 flex items-center justify-center">
                <div id="upload-preview-canvas" class="relative w-full max-w-[420px] h-[280px] rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 flex flex-col justify-between overflow-hidden shadow-md">
                  <div>
                    <span class="inline-block bg-[#FF4F00] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2">VISUALIZAÇÃO DO FORMATO</span>
                    <h4 id="upload-canvas-headline" class="text-lg font-extrabold leading-snug">Sua marca presente nos principais pontos e portais</h4>
                    <p class="text-xs text-gray-300 mt-1">Peça demonstrativa validada nas especificações técnicas</p>
                  </div>
                  <!-- Régua de Segurança 62px Eletromidia (Visível para OOH 800x600) -->
                  <div id="upload-ooh-safety-ruler" class="inset-x-0 bottom-0 h-11 bg-amber-500/90 text-gray-950 px-3 flex items-center justify-between text-[11px] font-bold rounded-lg">
                    <span>⚠ Área da régua inferior Eletromidia (62px)</span>
                    <span>Não posicionar textos aqui</span>
                  </div>
                </div>
              </div>

              <!-- Barra Inferior do Upload -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                <button type="button" onclick="backToArtSelection()" class="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer">
                  voltar
                </button>
                <button type="button" onclick="goToPagamento()" class="px-5 py-2.5 rounded-xl bg-[#FF4F00] hover:bg-[#E04600] text-white text-xs font-bold cursor-pointer shadow-xs">
                  salvar e ir para pagamento →
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- SUB-VIEW 3: EDITOR DE MODELOS PRONTOS COM IA -->
        <div id="art-subview-modelos" class="hidden max-w-[1140px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div class="mb-4">
            <button type="button" onclick="backToArtSelection()" class="px-3.5 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 inline-flex items-center gap-1.5 cursor-pointer">
              <span>‹</span> voltar para seleção
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
            <div class="lg:col-span-6 space-y-4">
              <div class="flex items-center justify-between">
                <h2 class="text-base font-bold text-gray-900">Personalizar modelo pronto</h2>
                <button type="button" onclick="generateAiCreativeCopy()" class="px-3 py-1.5 rounded-lg bg-orange-50 text-[#FF4F00] border border-orange-200 text-xs font-bold cursor-pointer hover:bg-orange-100">
                  ✦ Sugerir texto com IA
                </button>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1">Título principal do anúncio</label>
                <input id="tpl-headline-input" type="text" value="" placeholder="Digite o título principal do seu anúncio" oninput="document.getElementById('tpl-preview-title').textContent=this.value || 'Título principal do seu anúncio'" class="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-gray-900">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1">Chamada complementar / Site ou Contato</label>
                <input id="tpl-cta-input" type="text" value="" placeholder="Digite a chamada complementar ou contato" oninput="document.getElementById('tpl-preview-cta').textContent=this.value || 'Chamada complementar'" class="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-gray-900">
              </div>
              <div class="pt-3 flex items-center justify-end gap-3">
                <button type="button" onclick="backToArtSelection()" class="px-4 py-2 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 cursor-pointer">
                  cancelar
                </button>
                <button type="button" onclick="applyReadyTemplateAndContinue()" class="px-5 py-2.5 rounded-lg bg-[#FF4F00] hover:bg-[#E04600] text-white text-xs font-bold cursor-pointer shadow-xs">
                  aplicar modelo e avançar →
                </button>
              </div>
            </div>

            <div class="lg:col-span-6 flex items-center justify-center bg-[#F8FAFC] rounded-xl p-6 border border-gray-100">
              <div class="bg-gradient-to-br from-[#FF4F00] to-[#B83200] rounded-2xl p-6 text-white text-center shadow-md w-full max-w-[320px]">
                <span class="inline-block bg-white/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-3">MODELO ADAPTÁVEL MULTICANAL</span>
                <h4 id="tpl-preview-title" class="text-base font-extrabold leading-snug mb-2">Título principal do seu anúncio</h4>
                <p id="tpl-preview-cta" class="text-xs opacity-90">Chamada complementar</p>
              </div>
            </div>
          </div>
        </div>

        <!-- BARRA INFERIOR FIXA DA TELA DE ENVIO DE CRIATIVO (Fiel ao Print Oficial 07) -->
        <div id="envio-arte-bottom-bar" class="sticky bottom-0 z-20 w-full border-t border-gray-200 bg-white py-3.5">
          <div class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-[60px] flex items-center justify-between gap-4">
            <button type="button" onclick="showScreen('view-resumo')" class="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-semibold text-[#282E38] cursor-pointer transition">
              voltar
            </button>
            <button id="art-selection-next-btn" type="button" onclick="proceedFromArtSelection()" class="px-5 py-2.5 rounded-lg bg-[#FF9B71] text-white text-xs font-semibold inline-flex items-center gap-2 cursor-not-allowed transition">
              <span>avançar</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </main>

      <!-- ===================================================================== -->
      <!-- TELA 1.D: CHECKOUT / PAGAMENTO (FIEL AOS PRINTS OFICIAIS 08, 09 E 10) -->
      <!-- ===================================================================== -->
      <main id="view-pagamento" class="view-section flex-1 bg-white pb-20">
        <div class="max-w-[1140px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div class="mb-6">
            <button type="button" onclick="showScreen('view-envio-arte')" class="text-xs font-semibold text-[#282E38] hover:text-[#FF4F00] inline-flex items-center gap-1.5 cursor-pointer transition">
              <span>‹</span> voltar
            </button>
          </div>

          <!-- Grid 2 Colunas (7 Colunas Esquerda: Dados Faturamento + PIX/Cartão | 5 Colunas Direita: Resumo de Valores + Dúvidas) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            <!-- COLUNA ESQUERDA (lg:col-span-7) -->
            <div class="lg:col-span-7 space-y-7">
              <div>
                <h1 class="text-2xl font-bold text-[#282E38] tracking-tight">Pagamento</h1>
                <p class="text-xs text-[#64748B] mt-2 leading-relaxed">Você está a um passo de concluir sua compra. Confirme os valores e selecione a forma de pagamento.</p>
              </div>

              <!-- Seção 1: Dados de faturamento (Título fora do card + Card branco com divisória vertical + Concluir Cadastro abaixo) -->
              <div>
                <h2 class="text-base font-bold text-[#282E38] mb-3">Dados de faturamento</h2>

                <div class="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex-1 sm:pr-5 sm:border-r border-gray-200">
                    <span id="billing-profile-badge" class="inline-block bg-[#282E38] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded mb-2.5">pessoa física</span>
                    <div class="text-xs space-y-1">
                      <p id="billing-profile-name" class="font-bold text-[#282E38] uppercase">—</p>
                      <p id="billing-profile-doc" class="text-[#64748B]">—</p>
                      <p id="billing-profile-address" class="text-[#64748B] leading-relaxed">—</p>
                    </div>
                  </div>

                  <div class="sm:pl-4 flex sm:flex-col items-center justify-center gap-3 shrink-0">
                    <button type="button" onclick="showToast('Edição de dados de faturamento habilitada')" class="px-4 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-medium text-[#282E38] inline-flex items-center gap-1.5 cursor-pointer transition">
                      <span>editar</span>
                      <svg class="w-3.5 h-3.5 text-[#282E38]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button type="button" onclick="toggleBillingProfile()" class="text-xs font-medium text-[#282E38] hover:text-[#FF4F00] inline-flex items-center gap-1.5 cursor-pointer transition">
                      <span>trocar perfil</span>
                      <span>⇄</span>
                    </button>
                  </div>
                </div>

                <p class="mt-2.5 text-[11px] text-[#282E38]">
                  Você ainda não concluiu seu cadastro de Pessoa Jurídica.
                  <button type="button" onclick="toggleBillingProfile()" class="text-[#FF4F00] underline font-medium cursor-pointer ml-0.5">Concluir Cadastro</button>
                </p>
              </div>

              <!-- Seção 2: Escolha o método de pagamento (PIX e Cartão de crédito desmarcados por padrão) -->
              <div class="space-y-5">
                <div>
                  <h2 class="text-base font-bold text-[#282E38] mb-3">Escolha o método de pagamento</h2>

                  <div class="grid grid-cols-2 gap-4">
                    <!-- Card PIX -->
                    <button type="button" onclick="selectPaymentMethod('pix')" id="pay-method-pix" class="h-[88px] rounded-xl border border-gray-200 bg-white hover:border-gray-300 p-4 flex flex-col items-start justify-between text-left cursor-pointer transition">
                      <svg class="w-5 h-5 text-[#282E38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3l8.5 8.5a1 1 0 010 1.4L12 21.4a1 1 0 01-1.4 0L2.1 12.9a1 1 0 010-1.4L10.6 3a1 1 0 011.4 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 8.5l7 7m0-7l-7 7"/></svg>
                      <span class="text-xs font-medium text-[#282E38]">PIX</span>
                    </button>

                    <!-- Card Cartão de crédito -->
                    <button type="button" onclick="selectPaymentMethod('card')" id="pay-method-card" class="h-[88px] rounded-xl border border-gray-200 bg-white hover:border-gray-300 p-4 flex flex-col items-start justify-between text-left cursor-pointer transition">
                      <svg class="w-5 h-5 text-[#282E38]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M2 10h20M6 15h4"/></svg>
                      <span class="text-xs font-medium text-[#282E38]">Cartão de crédito</span>
                    </button>
                  </div>
                </div>

                <!-- Formulário Cartão de Crédito (Oculto por padrão até o usuário clicar em Cartão de crédito; sem caixa cinza) -->
                <div id="pay-form-card" class="hidden pt-2 space-y-4">
                  <h3 class="text-base font-bold text-[#282E38]">Método de pagamento - Cartão de crédito</h3>

                  <div>
                    <label class="block text-xs font-bold text-[#282E38] mb-1.5">Número do cartão</label>
                    <input type="text" value="" placeholder="0000 0000 0000 0000" class="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs text-[#282E38] placeholder-gray-400 bg-white focus:outline-none focus:border-[#FF4F00]">
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-[#282E38] mb-1.5">Nome do titular</label>
                    <input type="text" value="" placeholder="Preencha exatamente como está no cartão" class="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs text-[#282E38] placeholder-gray-400 bg-white focus:outline-none focus:border-[#FF4F00]">
                  </div>

                  <div id="pay-card-row-fields" class="grid grid-cols-12 gap-3">
                    <div id="pay-card-col-val" class="col-span-3">
                      <label class="block text-xs font-bold text-[#282E38] mb-1.5">Validade</label>
                      <input type="text" value="" placeholder="00/00" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs text-[#282E38] placeholder-gray-400 bg-white focus:outline-none focus:border-[#FF4F00]">
                    </div>
                    <div id="pay-card-col-cvv" class="col-span-3">
                      <label class="block text-xs font-bold text-[#282E38] mb-1.5">CVV</label>
                      <input type="text" value="" placeholder="000" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs text-[#282E38] placeholder-gray-400 bg-white focus:outline-none focus:border-[#FF4F00]">
                    </div>
                    <div id="pay-card-col-inst" class="col-span-6">
                      <label class="block text-xs font-bold text-[#282E38] mb-1.5">Selecione as parcelas</label>
                      <select id="checkout-installments-select" class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs text-[#282E38] bg-white focus:outline-none focus:border-[#FF4F00] cursor-pointer">
                        <!-- Preenchido dinamicamente por populateCheckoutScreen() em até 3x sem juros -->
                      </select>
                    </div>
                  </div>

                  <label class="flex items-center gap-2 pt-1 cursor-pointer select-none">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300 accent-[#FF4F00]">
                    <span class="text-xs font-medium text-[#282E38]">Deseja salvar este cartão?</span>
                  </label>

                  <div class="pt-2 space-y-2.5">
                    <button type="button" onclick="completeCheckoutPurchase()" class="w-full py-3 px-4 rounded-lg bg-[#FF9B71] hover:bg-[#FF4F00] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition">
                      <span>pagar</span>
                      <span>✓</span>
                    </button>
                    <button type="button" onclick="selectPaymentMethod(null)" class="w-full py-2 text-xs font-semibold text-[#282E38] hover:text-[#FF4F00] flex items-center justify-center gap-1.5 cursor-pointer transition">
                      <span>←</span>
                      <span>voltar</span>
                    </button>
                  </div>
                </div>

                <!-- Painel PIX (Oculto por padrão até o usuário clicar em PIX) -->
                <div id="pay-form-pix" class="hidden pt-2 space-y-4">
                  <h3 class="text-base font-bold text-[#282E38]">Método de pagamento - PIX</h3>
                  <div class="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row items-center gap-5">
                    <div class="w-28 h-28 rounded-xl bg-white border border-gray-200 p-2.5 flex items-center justify-center shrink-0">
                      <div class="w-full h-full bg-[radial-gradient(#111827_2px,transparent_2px)] [background-size:8px_8px] rounded flex items-center justify-center">
                        <span class="bg-white px-2 py-0.5 text-[10px] font-extrabold text-gray-900 border border-gray-300 rounded">PIX QR</span>
                      </div>
                    </div>
                    <div class="space-y-2 text-xs text-[#64748B] flex-1">
                      <p class="font-bold text-[#282E38]">Escaneie o QR Code ou utilize o código Pix Copia e Cola</p>
                      <p class="text-[11px]">A confirmação do pagamento ocorre em poucos segundos e libera sua campanha automaticamente.</p>
                      <div class="flex items-center gap-2 pt-1">
                        <input type="text" readonly value="00020126580014br.gov.bcb.pix0136aqui-ads-pagamento-instantaneo" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-[11px] text-[#282E38] bg-white">
                        <button type="button" onclick="showToast('Código PIX Copia e Cola copiado!')" class="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-[#282E38] shrink-0 cursor-pointer">
                          Copiar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="space-y-2.5">
                    <button type="button" onclick="completeCheckoutPurchase()" class="w-full py-3 px-4 rounded-lg bg-[#FF4F00] hover:bg-[#E04600] text-white text-xs font-bold cursor-pointer transition">
                      Confirmar pagamento PIX
                    </button>
                    <button type="button" onclick="selectPaymentMethod(null)" class="w-full py-2 text-xs font-semibold text-[#282E38] hover:text-[#FF4F00] flex items-center justify-center gap-1.5 cursor-pointer transition">
                      <span>←</span>
                      <span>voltar</span>
                    </button>
                  </div>
                </div>

                <!-- Selo Pagamento Seguro (stone para Digital/Híbrido ou rede itaú para OOH exclusivo) -->
                <div class="pt-4 flex flex-col items-center justify-center text-center gap-1">
                  <span class="text-[11px] text-[#64748B]">Pagamento seguro com</span>
                  <div id="checkout-gateway-logo" class="text-xl font-black tracking-tight text-[#16A34A]">stone</div>
                </div>
              </div>
            </div>

            <!-- COLUNA DIREITA (lg:col-span-5): RESUMO DE VALORES + TIRE SUAS DÚVIDAS -->
            <div class="lg:col-span-5 space-y-5">
              <!-- Card 1: Resumo de valores -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h2 class="text-base font-bold text-[#282E38] mb-4">Resumo de valores</h2>

                <!-- Linha Possui cupom? -->
                <div class="flex items-center justify-between pb-3.5 border-b border-gray-100 text-xs">
                  <span class="text-[#282E38]">Possui cupom?</span>
                  <button type="button" onclick="promptCoupon()" class="text-[#16A34A] underline font-medium cursor-pointer">Adicionar</button>
                </div>

                <!-- Linhas de valores das campanhas + arte + subtotal -->
                <div class="py-3.5 border-b border-gray-100 space-y-3 text-xs">
                  <div id="checkout-row-digital" class="flex items-center justify-between text-[#282E38]">
                    <span>Campanha Digital</span>
                    <span id="checkout-val-digital" class="font-bold text-[#282E38]">R$ —</span>
                  </div>
                  <div id="checkout-row-ooh" class="flex items-center justify-between text-[#282E38]">
                    <span>Campanha Out of Home</span>
                    <span id="checkout-val-ooh" class="font-bold text-[#282E38]">R$ —</span>
                  </div>
                  <div id="checkout-row-creative-fee" class="hidden flex items-center justify-between text-[#282E38]">
                    <span>Serviço de criação de arte</span>
                    <div class="flex items-center gap-1.5">
                      <button type="button" onclick="removeCreativeServiceFromCheckout()" class="text-gray-500 hover:text-red-600 cursor-pointer" title="Remover criação de arte">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                      <span class="text-[11px] text-gray-400 line-through">R$ 299,99</span>
                      <span id="checkout-val-creative" class="font-bold text-[#282E38]">R$ 199,99</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between font-bold text-[#282E38] pt-1">
                    <span>Subtotal</span>
                    <span id="checkout-val-subtotal" class="font-bold text-[#282E38]">R$ —</span>
                  </div>
                  <p id="checkout-globo-cnpj" class="text-[9px] text-[#64748B] uppercase tracking-tight pt-0.5">
                    * GLOBO COMUNICACAO E PARTICIPACOES S/A – CNPJ 27.865.757/0006-65
                  </p>
                </div>

                <!-- Linha Total -->
                <div class="pt-3.5">
                  <div class="flex items-center justify-between text-base font-extrabold text-[#282E38]">
                    <span>Total</span>
                    <span id="checkout-val-total">R$ —</span>
                  </div>
                  <p id="checkout-terms-note" class="text-[11px] text-[#64748B] mt-3 leading-relaxed">
                    Ao fazer o pedido, você concorda com os <a href="javascript:void(0)" onclick="showToast('Abrindo Termos e Condições de uso...')" class="text-[#FF4F00] underline">Termos e Condições de uso</a>.
                  </p>
                </div>
              </div>

              <!-- Card 2: Tire suas dúvidas (Acordeão Oficial + mais perguntas + Fale com o nosso time) -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h3 class="text-base font-bold text-[#282E38] mb-3">Tire suas dúvidas</h3>

                <div class="divide-y divide-gray-200 border-b border-gray-200">
                  <!-- Item Condicional: Sobre a contratação de uma arte (visível quando há arte contratada) -->
                  <div id="checkout-faq-art" class="hidden py-3">
                    <button type="button" onclick="toggleCheckoutFaq('art')" class="w-full flex items-center justify-between text-left text-xs font-medium text-[#282E38] hover:text-[#FF4F00] cursor-pointer">
                      <span>Sobre a contratação de uma arte</span>
                      <svg id="checkout-faq-icon-art" class="w-4 h-4 text-gray-500 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <p id="checkout-faq-body-art" class="hidden mt-2 text-[11px] text-[#64748B] leading-relaxed">
                      Ao contratar uma arte, nossa equipe criará as peças nos formatos exatos da sua campanha após a confirmação do pagamento.
                    </p>
                  </div>

                  <!-- Item 1: Métodos de pagamentos disponíveis -->
                  <div class="py-3">
                    <button type="button" onclick="toggleCheckoutFaq('methods')" class="w-full flex items-center justify-between text-left text-xs font-medium text-[#282E38] hover:text-[#FF4F00] cursor-pointer">
                      <span>Métodos de pagamentos disponíveis</span>
                      <svg id="checkout-faq-icon-methods" class="w-4 h-4 text-gray-500 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <p id="checkout-faq-body-methods" class="hidden mt-2 text-[11px] text-[#64748B] leading-relaxed">
                      Aceitamos pagamentos via PIX (com liberação instantânea) e Cartão de crédito em até 3x sem juros.
                    </p>
                  </div>

                  <!-- Item 2: Regras de parcelamento e boleto -->
                  <div class="py-3">
                    <button type="button" onclick="toggleCheckoutFaq('installments')" class="w-full flex items-center justify-between text-left text-xs font-medium text-[#282E38] hover:text-[#FF4F00] cursor-pointer">
                      <span>Regras de parcelamento e boleto</span>
                      <svg id="checkout-faq-icon-installments" class="w-4 h-4 text-gray-500 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <p id="checkout-faq-body-installments" class="hidden mt-2 text-[11px] text-[#64748B] leading-relaxed">
                      O parcelamento no cartão de crédito pode ser feito em até 3x sem juros.
                    </p>
                  </div>
                </div>

                <div class="mt-4 space-y-3">
                  <button type="button" onclick="showToast('Abrindo central de ajuda completa...')" class="text-xs font-medium text-[#282E38] hover:text-[#FF4F00] flex items-center gap-2 cursor-pointer transition">
                    <svg class="w-4 h-4 text-[#282E38]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m-4-4h8"/></svg>
                    <span class="underline">mais perguntas</span>
                  </button>

                  <button type="button" onclick="showToast('Atendimento com a Helen iniciado!')" class="text-xs font-medium text-[#282E38] hover:text-[#FF4F00] flex items-center gap-2 cursor-pointer transition">
                    <svg class="w-4 h-4 text-[#FF4F00]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                    <span class="underline">Fale com o nosso time</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <!-- ===================================================================== -->
      <!-- TELA 2: LISTAGEM "MEUS ANÚNCIOS" (PLANOS DE MÍDIA + RASCUNHOS LIMPOS) -->
      <!-- ===================================================================== -->
      <main id="screen-list" class="view-section flex-1 max-w-[1140px] w-full mx-auto px-6 md:px-10 py-8 responsive-main-padding">

        <h2 class="text-[22px] font-bold text-gray-900 tracking-tight mb-6">Meus Anúncios</h2>

        <!-- Abas Superiores: Planos de mídia (19) | Rascunhos (4) -->
        <div class="flex items-center gap-6 border-b border-gray-200 mb-5">
          <button onclick="switchTopTab('planos')" id="top-tab-planos" class="pb-2.5 text-xs font-bold text-[#FF5A00] border-b-2 border-[#FF5A00] transition cursor-pointer">
            Planos de mídia (19)
          </button>
          <button onclick="switchTopTab('rascunhos')" id="top-tab-rascunhos" class="pb-2.5 text-xs font-medium text-gray-500 hover:text-gray-800 border-b-2 border-transparent transition cursor-pointer">
            Rascunhos (<span id="drafts-tab-count">4</span>)
          </button>
        </div>

        <!-- CONTEÚDO DA ABA PLANOS DE MÍDIA -->
        <div id="tab-content-planos">
          <!-- Barra Cinza de Filtros (#F3F4F6) fiel ao print 01 + Quick Win 3 -->
          <div class="bg-[#F3F4F6] rounded-xl p-4 md:p-5 mb-4">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end responsive-filter-row">
              <!-- Nome, ID ou Endereço -->
              <div class="md:col-span-3">
                <label class="block text-[11px] font-bold text-gray-800 mb-1.5">Nome, ID ou Endereço</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-2.5 flex items-center text-gray-400">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </span>
                  <input type="text" id="filter-search" oninput="applyCampaignFilters()" placeholder="Nome, #ID, cidade ou endereço..." class="w-full bg-white border border-gray-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF5A00]">
                </div>
              </div>

              <!-- Data de início -->
              <div class="md:col-span-2">
                <label class="block text-[11px] font-bold text-gray-800 mb-1.5">Data de início</label>
                <div class="relative">
                  <input type="text" id="filter-date-start" oninput="applyCampaignFilters()" placeholder="dd/mm/aaaa" class="w-full bg-white border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF5A00]">
                  <span class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 pointer-events-none">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </span>
                </div>
              </div>

              <!-- Data de fim -->
              <div class="md:col-span-2">
                <label class="block text-[11px] font-bold text-gray-800 mb-1.5">Data de fim</label>
                <div class="relative">
                  <input type="text" id="filter-date-end" oninput="applyCampaignFilters()" placeholder="dd/mm/aaaa" class="w-full bg-white border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF5A00]">
                  <span class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 pointer-events-none">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </span>
                </div>
              </div>

              <!-- Pílulas de Status -->
              <div class="md:col-span-5">
                <label class="block text-[11px] font-bold text-gray-800 mb-1.5">Status</label>
                <div class="flex flex-wrap items-center gap-1.5">
                  <button onclick="setStatusFilter('todos')" data-status="todos" class="status-pill px-3 py-1 rounded-full text-[11px] font-semibold bg-[#1E2229] text-white border border-[#1E2229] transition cursor-pointer">todos</button>
                  <button onclick="setStatusFilter('pendentes')" data-status="pendentes" class="status-pill px-3 py-1 rounded-full text-[11px] font-medium bg-white text-gray-800 border border-gray-400 hover:border-gray-600 transition cursor-pointer">pendentes</button>
                  <button onclick="setStatusFilter('veiculando')" data-status="veiculando" class="status-pill px-3 py-1 rounded-full text-[11px] font-medium bg-white text-gray-800 border border-gray-400 hover:border-gray-600 transition cursor-pointer">veiculando</button>
                  <button onclick="setStatusFilter('a_iniciar')" data-status="a_iniciar" class="status-pill px-3 py-1 rounded-full text-[11px] font-medium bg-white text-gray-800 border border-gray-400 hover:border-gray-600 transition cursor-pointer">a iniciar</button>
                  <button onclick="setStatusFilter('concluidos')" data-status="concluidos" class="status-pill px-3 py-1 rounded-full text-[11px] font-medium bg-white text-gray-800 border border-gray-400 hover:border-gray-600 transition cursor-pointer">concluídos</button>
                </div>
              </div>
            </div>

            <!-- Linha 2 de Filtro Rápido (Quick Win 3): Formato / Canal + Limpar Filtros -->
            <div class="mt-3.5 pt-3 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-[11px] font-bold text-gray-700 mr-1">Formato / Canal:</span>
                <button onclick="setChannelFilter('todos')" data-channel="todos" class="channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#1E2229] text-white border border-[#1E2229] transition cursor-pointer">Todos</button>
                <button onclick="setChannelFilter('OOH')" data-channel="OOH" class="channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-gray-700 border border-gray-300 hover:border-gray-500 transition cursor-pointer">OOH</button>
                <button onclick="setChannelFilter('Digital')" data-channel="Digital" class="channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-gray-700 border border-gray-300 hover:border-gray-500 transition cursor-pointer">Digital | Globo</button>
                <button onclick="setChannelFilter('Hibrida')" data-channel="Hibrida" class="channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-gray-700 border border-gray-300 hover:border-gray-500 transition cursor-pointer">Híbrida (OOH + Digital)</button>
              </div>
              <button onclick="resetAllFilters()" class="text-[11px] font-bold text-[#FF5A00] hover:underline cursor-pointer">
                Limpar filtros
              </button>
            </div>
          </div>

          <!-- Subtítulo e Botões "ver em lista" / "ordenar" -->
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
            <p class="text-xs text-gray-500" id="results-counter-text">
              Aqui estão suas campanhas já contratadas, com status ativo, pendente, concluído ou cancelado.
            </p>
            <div class="flex items-center gap-2">
              <button onclick="toggleListViewMode()" id="toggle-view-btn" class="px-2.5 py-1 border border-gray-200 rounded-md text-[11px] font-semibold text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                <span id="toggle-view-label">ver em lista</span>
              </button>

              <div class="relative">
                <select id="sort-select" onchange="applyCampaignFilters()" class="appearance-none px-2.5 py-1 pr-6 border border-gray-200 rounded-md text-[11px] font-semibold text-gray-700 bg-white hover:bg-gray-50 cursor-pointer focus:outline-none">
                  <option value="default">⇅ ordenar (Pendentes → Veiculando → Concluídas)</option>
                  <option value="pending_first">Prioridade (Pendentes de arte)</option>
                  <option value="recent">Data de início (Mais recentes)</option>
                  <option value="value_desc">Maior valor investido</option>
                  <option value="name_asc">Nome da campanha (A-Z)</option>
                </select>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 text-gray-500 text-[10px]">▾</span>
              </div>
            </div>
          </div>

          <!-- GRID DE CARDS (4 COLUNAS FIEL AO PRINT 01) -->
          <div id="campaigns-grid-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 responsive-cards-grid">
            <!-- Renderizado via JS para suportar filtros, busca, ordenação e renomeação via menu -->
          </div>

          <!-- VISÃO EM LISTA (ALTERNÁVEL PELO BOTÃO "VER EM LISTA") -->
          <div id="campaigns-table-container" class="hidden border border-gray-200 rounded-xl overflow-x-auto bg-white">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-[#F3F4F6] text-[11px] font-bold text-gray-700 border-b border-gray-200">
                  <th class="py-3 px-4">Campanha</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Canal</th>
                  <th class="py-3 px-3">Status</th>
                  <th class="py-3 px-3">Período</th>
                  <th class="py-3 px-3">Valor</th>
                  <th class="py-3 px-4 text-right">Ação Principal</th>
                </tr>
              </thead>
              <tbody id="campaigns-table-body" class="divide-y divide-gray-100 text-xs">
                <!-- Preenchido via JS -->
              </tbody>
            </table>
          </div>

          <!-- ESTADO ZERO INTELIGENTE (QUICK WIN 3 - NUNCA DEIXA O USUÁRIO SEM SAÍDA) -->
          <div id="empty-state-box" class="hidden bg-[#F8FAFC] border border-dashed border-gray-300 rounded-2xl p-8 text-center my-6">
            <div class="w-12 h-12 rounded-full bg-orange-50 text-[#FF5A00] flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-1">Nenhuma campanha encontrada para este filtro</h3>
            <p class="text-xs text-gray-500 max-w-md mx-auto mb-4" id="empty-state-desc">
              Não encontramos campanhas correspondentes aos critérios selecionados. Você pode limpar os filtros ou acessar diretamente seus anúncios recentes abaixo:
            </p>
            <div class="flex flex-wrap items-center justify-center gap-2 mb-5">
              <button onclick="resetAllFilters()" class="px-4 py-2 rounded-lg text-xs font-bold bg-[#FF5A00] text-white hover:bg-[#E04E00] transition cursor-pointer">
                Limpar todos os filtros
              </button>
              <button onclick="setStatusFilter('pendentes')" class="px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer">
                ⚠️ Ver pendentes de arte (2)
              </button>
              <button onclick="setStatusFilter('veiculando')" class="px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer">
                ▶️ Ver em veiculação (5)
              </button>
            </div>
          </div>

          <!-- GAVETA / ACORDEÃO DE HISTÓRICO ANTERIOR (> 90 DIAS - SEÇÃO 2.2 DO DOC) -->
          <div class="mt-8 border border-gray-200 rounded-xl bg-[#F8FAFC] overflow-hidden">
            <button onclick="toggleHistoricalDrawer()" class="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-gray-700 hover:bg-gray-100 transition cursor-pointer">
              <span class="flex items-center gap-2">
                <span>🗂️</span>
                <span>Histórico de campanhas anteriores (+90 dias)</span>
                <span class="bg-gray-200 text-gray-700 text-[10px] px-2 py-0.5 rounded-full">12 concluídas</span>
              </span>
              <span id="hist-drawer-label" class="text-[#FF5A00] font-semibold">Ver histórico anterior ▾</span>
            </button>
            <div id="historical-campaigns-drawer" class="hidden border-t border-gray-200 p-4 bg-white">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div class="border border-gray-200 rounded-lg p-3 flex flex-col justify-between bg-gray-50/60">
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[10px] font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">✓ Concluída</span>
                      <span class="text-[10px] text-gray-400">#14210</span>
                    </div>
                    <p class="font-bold text-gray-900 mt-1">Campanha Sazonal - Maio</p>
                    <p class="text-[11px] text-gray-500">01/05/2025 a 15/05/2025 • R$ 1.420,00</p>
                  </div>
                  <div class="mt-3 flex items-center gap-2">
                    <button onclick="openRenewModal('750598')" class="flex-1 py-1.5 px-2.5 rounded border border-[#FF5A00] text-[#FF5A00] hover:bg-orange-50 font-bold text-[11px] cursor-pointer">↻ renovar</button>
                    <button onclick="openCampaignDetail('15966', 'metricas')" class="py-1.5 px-2.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-[11px] cursor-pointer">ver relatório</button>
                  </div>
                </div>
                <div class="border border-gray-200 rounded-lg p-3 flex flex-col justify-between bg-gray-50/60">
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[10px] font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">✓ Concluída</span>
                      <span class="text-[10px] text-gray-400">#13890</span>
                    </div>
                    <p class="font-bold text-gray-900 mt-1">Campanha Institucional - Março</p>
                    <p class="text-[11px] text-gray-500">10/03/2025 a 24/03/2025 • R$ 2.150,00</p>
                  </div>
                  <div class="mt-3 flex items-center gap-2">
                    <button onclick="openRenewModal('750598')" class="flex-1 py-1.5 px-2.5 rounded border border-[#FF5A00] text-[#FF5A00] hover:bg-orange-50 font-bold text-[11px] cursor-pointer">↻ renovar</button>
                    <button onclick="openCampaignDetail('15966', 'metricas')" class="py-1.5 px-2.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-[11px] cursor-pointer">ver relatório</button>
                  </div>
                </div>
                <div class="border border-gray-200 rounded-lg p-3 flex flex-col justify-between bg-gray-50/60">
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[10px] font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">✓ Concluída</span>
                      <span class="text-[10px] text-gray-400">#12904</span>
                    </div>
                    <p class="font-bold text-gray-900 mt-1">Campanha Verão Digital + OOH</p>
                    <p class="text-[11px] text-gray-500">15/01/2025 a 12/02/2025 • R$ 3.490,00</p>
                  </div>
                  <div class="mt-3 flex items-center gap-2">
                    <button onclick="openRenewModal('750598')" class="flex-1 py-1.5 px-2.5 rounded border border-[#FF5A00] text-[#FF5A00] hover:bg-orange-50 font-bold text-[11px] cursor-pointer">↻ renovar</button>
                    <button onclick="openCampaignDetail('15966', 'metricas')" class="py-1.5 px-2.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-[11px] cursor-pointer">ver relatório</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Paginação Oficial Fiel ao Print 01 -->
          <div id="pagination-bar" class="flex items-center justify-center gap-4 mt-8 mb-4 text-xs text-gray-500 select-none">
            <span class="cursor-pointer hover:text-gray-900">«</span>
            <span class="cursor-pointer hover:text-gray-900">‹</span>
            <span class="font-bold text-gray-900 cursor-pointer">1</span>
            <span onclick="showToast('Página 2 carregada')" class="cursor-pointer hover:text-gray-900">2</span>
            <span onclick="showToast('Página 3 carregada')" class="cursor-pointer hover:text-gray-900">3</span>
            <span class="cursor-pointer hover:text-gray-900">›</span>
            <span class="cursor-pointer hover:text-gray-900">»</span>
          </div>
        </div>

        <!-- CONTEÚDO DA ABA RASCUNHOS (HIGIENIZADO E VALIDADO PELO FRANKS) -->
        <div id="tab-content-rascunhos" class="hidden">
          <!-- Barra Cinza de Filtros (#F3F4F6) idêntica à de Planos de Mídia (sem ícones nos rótulos) -->
          <div class="bg-[#F3F4F6] rounded-xl p-4 md:p-5 mb-4">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end responsive-filter-row">
              <!-- Busca por Nome, ID ou Local -->
              <div class="md:col-span-5">
                <label class="block text-[11px] font-bold text-gray-800 mb-1.5">Nome, ID ou Local</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-2.5 flex items-center text-gray-400">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </span>
                  <input type="text" id="draft-filter-search" oninput="applyDraftFilters()" placeholder="Buscar rascunho por nome, #ID ou cidade..." class="w-full bg-white border border-gray-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF5A00]">
                </div>
              </div>

              <!-- Data Inicial -->
              <div class="md:col-span-3">
                <label class="block text-[11px] font-bold text-gray-800 mb-1.5">Data inicial</label>
                <input type="date" id="draft-filter-start" onchange="applyDraftFilters()" class="w-full bg-white border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-600 focus:outline-none focus:border-[#FF5A00]">
              </div>

              <!-- Data Final -->
              <div class="md:col-span-4">
                <label class="block text-[11px] font-bold text-gray-800 mb-1.5">Data final</label>
                <input type="date" id="draft-filter-end" onchange="applyDraftFilters()" class="w-full bg-white border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-600 focus:outline-none focus:border-[#FF5A00]">
              </div>
            </div>

            <!-- Linha 2: Filtro de Canal Limpo (Sem ícones/emojis nas pílulas) -->
            <div class="mt-3.5 pt-3 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-[11px] font-bold text-gray-700 mr-1">Formato / Canal:</span>
                <button type="button" onclick="setDraftChannelFilter('todos')" data-dchannel="todos" class="draft-channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#1E2229] text-white border border-[#1E2229] transition cursor-pointer">Todos</button>
                <button type="button" onclick="setDraftChannelFilter('OOH')" data-dchannel="OOH" class="draft-channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-gray-700 border border-gray-300 hover:border-gray-500 transition cursor-pointer">OOH</button>
                <button type="button" onclick="setDraftChannelFilter('Digital')" data-dchannel="Digital" class="draft-channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-gray-700 border border-gray-300 hover:border-gray-500 transition cursor-pointer">Digital | Globo</button>
                <button type="button" onclick="setDraftChannelFilter('Hibrida')" data-dchannel="Hibrida" class="draft-channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-gray-700 border border-gray-300 hover:border-gray-500 transition cursor-pointer">Híbrida (OOH + Digital)</button>
              </div>
              <button type="button" onclick="resetDraftFilters()" class="text-[11px] font-bold text-[#FF5A00] hover:underline cursor-pointer">
                Limpar filtros
              </button>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
            <p class="text-xs text-gray-500" id="drafts-counter-text">
              Aqui estão seus planos de mídia salvos como rascunho antes do pagamento.
            </p>
          </div>

          <!-- Grid de Cards de Rascunhos (4 Colunas - Renderizado via JS applyDraftFilters) -->
          <div id="drafts-grid-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 responsive-cards-grid">
            <!-- Preenchido via JS -->
          </div>

          <!-- Empty State de Rascunhos -->
          <div id="drafts-empty-state" class="hidden bg-[#F8FAFC] border border-dashed border-gray-300 rounded-2xl p-8 text-center my-6">
            <h3 class="text-sm font-bold text-gray-900 mb-1">Nenhum rascunho encontrado</h3>
            <p class="text-xs text-gray-500 max-w-md mx-auto mb-4">Não encontramos rascunhos para o filtro selecionado.</p>
            <button type="button" onclick="resetDraftFilters()" class="px-4 py-2 rounded-lg text-xs font-bold bg-[#FF5A00] text-white hover:bg-[#E04E00] transition cursor-pointer">
              Limpar filtros
            </button>
          </div>
        </div>

      </main>

      <!-- ===================================================================== -->
      <!-- TELA 2: DETALHES DO PEDIDO & MÉTRICAS (BLOCO 2 - QUICK WINS 4, 5, 6, 7)-->
      <!-- ===================================================================== -->
      <main id="screen-detail" class="view-section flex-1 max-w-[1060px] w-full mx-auto px-6 md:px-10 py-6 responsive-main-padding">

        <!-- Botão Voltar fiel aos prints 04, 06, 09, 10 -->
        <div class="mb-5">
          <button onclick="showScreen('screen-list')" class="px-3.5 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 inline-flex items-center gap-1.5 shadow-2xs cursor-pointer">
            <span>←</span> voltar
          </button>
        </div>

        <!-- CABEÇALHO DO PEDIDO (FIEL AOS PRINTS 04, 05, 06 + QUICK WIN 2 E 4) -->
        <div class="flex items-start justify-between gap-6 mb-8 responsive-header-detail">
          <!-- Esquerda: Miniatura + Botão Ver/Trocar Arte + Dados da Campanha -->
          <div class="flex items-start gap-5">
            <div class="flex flex-col items-center gap-1.5 shrink-0">
              <img id="detail-thumb" onclick="switchDetailTab('arte')" src="" alt="Preview da Campanha" class="w-24 h-24 md:w-28 md:h-28 rounded-md object-cover border border-gray-200 bg-gray-100 cursor-pointer hover:opacity-90 transition" title="Ver ou trocar arte">
              <button onclick="switchDetailTab('arte')" class="text-[10px] font-bold text-gray-600 hover:text-[#FF5A00] border border-gray-200 rounded px-2 py-0.5 bg-white hover:bg-orange-50 transition cursor-pointer flex items-center gap-1">
                <span>🖼</span> ver / trocar arte
              </button>
            </div>
            <div class="pt-1">
              <!-- Título da Campanha (Renomeação via menu editar ⋮ -> renomear campanha) -->
              <div class="mb-2.5">
                <h2 id="detail-title" class="text-base md:text-lg font-extrabold text-gray-900 tracking-tight">
                  Campanha Multicanal - Outubro
                </h2>
              </div>

              <!-- Linha Início / Fim / Prazo -->
              <div class="flex flex-wrap items-center gap-4 text-xs text-gray-600 mb-3">
                <span><strong class="text-gray-900">Início:</strong> <span id="detail-start">15/10/2026</span></span>
                <span><strong class="text-gray-900">Fim:</strong> <span id="detail-end">28/10/2026</span></span>
                <span><strong class="text-gray-900">Prazo:</strong> <span id="detail-duration">14 DIAS</span></span>
              </div>

              <!-- Pílulas Cinzas de Formato -->
              <div id="detail-format-pills" class="flex flex-wrap items-center gap-1.5">
                <span class="bg-[#D1D5DB] text-gray-900 text-[10px] font-bold px-2.5 py-0.5 rounded">Elevadores Residenciais</span>
                <span class="bg-[#D1D5DB] text-gray-900 text-[10px] font-bold px-2.5 py-0.5 rounded">Elevadores Comerciais</span>
                <span class="bg-[#D1D5DB] text-gray-900 text-[10px] font-bold px-2.5 py-0.5 rounded">Digital</span>
              </div>
            </div>
          </div>

          <!-- Direita: #ID + Badge de 2 Camadas + Botões Renovar e Editar (Quick Win 4) -->
          <div class="flex flex-col items-end gap-3 shrink-0 responsive-header-detail-right">
            <div class="flex items-center gap-4">
              <span id="detail-id" class="text-xl md:text-2xl font-bold text-gray-400 tracking-tight">#750598</span>

              <!-- Badge de Status Duplo Fiel ao Print 04 -->
              <div id="detail-status-badge" class="w-48 rounded-xl overflow-hidden text-center shadow-2xs">
                <div class="bg-[#107C10] text-white text-[11px] font-bold py-1 px-3 flex items-center justify-center gap-1.5">
                  <span>▶</span> anúncio veiculando
                </div>
                <div class="bg-[#8AC483] text-gray-900 text-[10px] font-medium py-1 px-3">
                  seu anúncio está no ar
                </div>
              </div>
            </div>

            <!-- Ações no Topo: Renovar Campanha (Quick Win 4) + Menu Editar -->
            <div class="flex items-center gap-2">
              <button onclick="openRenewModal()" class="px-3 py-1.5 border border-[#FF5A00] text-[#FF5A00] hover:bg-orange-50 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer">
                <span>↻</span> renovar campanha
              </button>
              <div class="relative">
                <button onclick="toggleDetailEditMenu()" class="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-bold text-gray-800 bg-white hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                  <span>editar</span>
                  <span class="text-gray-400">⋮</span>
                </button>
                <div id="detail-edit-dropdown" class="hidden absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-40 text-xs">
                  <button onclick="promptRenameDetail(); toggleDetailEditMenu();" class="w-full text-left px-3.5 py-2 hover:bg-gray-50 text-gray-700 font-medium cursor-pointer">renomear campanha</button>
                  <button onclick="goToUploadArteScreen(currentSelectedCampaign.id); toggleDetailEditMenu();" class="w-full text-left px-3.5 py-2 hover:bg-orange-50 text-[#FF5A00] font-semibold cursor-pointer">enviar arte</button>
                  <button onclick="switchDetailTab('arte'); toggleDetailEditMenu();" class="w-full text-left px-3.5 py-2 hover:bg-gray-50 text-gray-700 font-medium cursor-pointer">gerenciar arte</button>
                  <button onclick="showToast('Alteração de data disponível para campanhas pendentes'); toggleDetailEditMenu();" class="w-full text-left px-3.5 py-2 hover:bg-gray-50 text-gray-700 font-medium cursor-pointer">alterar data de início</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- STEPPER HORIZONTAL "ETAPAS ATÉ A PUBLICAÇÃO" ACIONÁVEL E COLAPSÁVEL (QUICK WIN 5) -->
        <div class="mb-8">
          <!-- Versão Compacta de 1 Linha (Exibida quando a campanha já está Veiculando/Concluída) -->
          <div id="stepper-compact-bar" class="hidden max-w-[680px] mx-auto bg-[#F8FAFC] border border-gray-200 rounded-lg px-4 py-2.5 flex items-center justify-between text-xs mb-2">
            <div class="flex flex-wrap items-center gap-2 text-gray-700 font-medium">
              <span class="text-emerald-700 font-bold">✓ Etapas concluídas:</span>
              <span>Criado</span> • <span>Pago</span> • <span>Arte enviada</span> • <span>Aprovado</span>
            </div>
            <button onclick="toggleStepperExpand()" id="stepper-toggle-btn" class="text-[#FF5A00] font-bold hover:underline text-[11px] cursor-pointer whitespace-nowrap ml-2">
              Ver detalhes ▾
            </button>
          </div>

          <div id="stepper-full-container">
            <h3 class="text-center text-xs font-bold text-gray-800 mb-3">Etapas até a publicação</h3>
            <div class="grid grid-cols-4 gap-3 max-w-[680px] mx-auto responsive-stepper-grid">
              <!-- Caixa 1: Anúncio criado -->
              <div onclick="switchDetailTab('locais')" class="border border-gray-200 rounded-lg p-3 bg-white hover:border-gray-400 transition cursor-pointer" title="Ver locais contratados">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[11px] font-bold text-gray-900">Anúncio criado</span>
                  <span class="text-emerald-600 text-xs font-bold">✓</span>
                </div>
                <p class="text-[10px] text-gray-500" id="step-date-created">09/10/2026 - 11h26</p>
              </div>

              <!-- Caixa 2: Pagamento (Clicável -> Aba Faturamento) -->
              <div onclick="switchDetailTab('faturamento')" class="border border-gray-200 rounded-lg p-3 bg-white hover:border-[#FF5A00] transition cursor-pointer group" title="Ir para a aba Faturamento">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[11px] font-bold text-gray-900 group-hover:text-[#FF5A00]">Pagamento</span>
                  <span id="step-icon-payment" class="text-emerald-600 text-xs font-bold">✓</span>
                </div>
                <p class="text-[10px] text-gray-500 flex items-center justify-between">
                  <span id="step-text-payment">aprovado</span>
                  <span class="text-[#FF5A00] font-semibold opacity-80 group-hover:opacity-100">Fatura →</span>
                </p>
              </div>

              <!-- Caixa 3: Envio de arte (Clicável -> Tela Subir Imagem ou Aba Arte - Quick Win 5) -->
              <div onclick="handleStepperArteClick()" id="stepper-box-arte" class="border border-gray-200 rounded-lg p-3 bg-white hover:border-[#FF5A00] transition cursor-pointer group" title="Gerenciar ou enviar arte">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[11px] font-bold text-gray-900 group-hover:text-[#FF5A00]">Envio de arte</span>
                  <span id="step-icon-arte" class="text-emerald-600 text-xs font-bold">✓</span>
                </div>
                <p class="text-[10px] text-gray-500 flex items-center justify-between">
                  <span id="step-text-arte">14/10/2026</span>
                  <span id="step-link-arte" class="text-[#FF5A00] font-bold group-hover:underline">Ver arte →</span>
                </p>
              </div>

              <!-- Caixa 4: Aprovação -->
              <div onclick="switchDetailTab('arte')" class="border border-gray-200 rounded-lg p-3 bg-white hover:border-gray-400 transition cursor-pointer">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[11px] font-bold text-gray-900">Aprovação</span>
                  <span id="step-icon-approval" class="text-emerald-600 text-xs font-bold">✓</span>
                </div>
                <p class="text-[10px] text-gray-500" id="step-text-approval">aprovado</p>
              </div>
            </div>
          </div>
        </div>

        <!-- NAVEGAÇÃO DAS 4 ABAS REAIS: MÉTRICAS | ARTE | FATURAMENTO | LOCAIS -->
        <div class="flex items-center gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
          <button onclick="switchDetailTab('metricas')" id="dtab-btn-metricas" class="detail-tab-btn pb-2.5 text-xs font-bold text-[#FF5A00] border-b-2 border-[#FF5A00] flex items-center gap-1.5 whitespace-nowrap cursor-pointer">
            <span>📊</span> Métricas
          </button>
          <button onclick="switchDetailTab('arte')" id="dtab-btn-arte" class="detail-tab-btn pb-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent flex items-center gap-1.5 whitespace-nowrap cursor-pointer">
            <span>🖼️</span> Arte
            <span id="arte-tab-alert-dot" class="hidden w-2 h-2 rounded-full bg-[#FF5A00]"></span>
          </button>
          <button onclick="switchDetailTab('faturamento')" id="dtab-btn-faturamento" class="detail-tab-btn pb-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent flex items-center gap-1.5 whitespace-nowrap cursor-pointer">
            <span>🧾</span> Faturamento
          </button>
          <button onclick="switchDetailTab('locais')" id="dtab-btn-locais" class="detail-tab-btn pb-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent flex items-center gap-1.5 whitespace-nowrap cursor-pointer">
            <span>📍</span> Locais
          </button>
        </div>

        <!-- ================================================================= -->
        <!-- ABA 1: MÉTRICAS DO ANÚNCIO (OOH + DIGITAL | GLOBO + FAQ)          -->
        <!-- ================================================================= -->
        <section id="dtab-panel-metricas" class="detail-tab-panel">
          <!-- Banner Contextual de Renovação no Topo de Métricas (Quando Entrega >= 90% ou Concluído - Seção 3.4 do Doc) -->
          <div id="metrics-top-renewal-banner" class="bg-orange-50/90 border border-orange-200 rounded-xl p-4 mb-5 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-[#FF5A00] text-white flex items-center justify-center font-bold text-sm shrink-0">🚀</div>
              <div>
                <h4 id="metrics-renewal-banner-title" class="text-xs font-extrabold text-gray-900">Sua campanha já superou 100% da meta contratada!</h4>
                <p id="metrics-renewal-banner-desc" class="text-[11px] text-gray-600">Mantenha sua marca visível nos mesmos edifícios e portais sem precisar subir a arte novamente.</p>
              </div>
            </div>
            <button onclick="openRenewModal()" class="px-4 py-2 rounded-lg bg-[#FF5A00] hover:bg-[#E04E00] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0">
              <span>↻</span> renovar campanha em 1 clique
            </button>
          </div>

          <!-- Barra de Título + Pílulas de Salto Rápido (Quick Win 6 e 7) + Exportar PDF/CSV e Renovar (Quick Win 4) -->
          <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div class="flex flex-wrap items-center gap-3">
              <h3 class="text-lg font-bold text-gray-900">Métricas do anúncio</h3>

              <!-- Pílulas de Salto / Filtro de Canal nas Métricas (Quick Win 6 e 7) -->
              <div id="metrics-channel-switcher" class="flex items-center gap-1.5 bg-gray-100 p-1 rounded-full">
                <button onclick="filterMetricsSection('all')" id="mjump-all" class="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-gray-900 shadow-2xs transition cursor-pointer">
                  Todos os canais
                </button>
                <button onclick="filterMetricsSection('ooh')" id="mjump-ooh" class="px-3 py-1 rounded-full text-[11px] font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer">
                  📍 OOH | Out of Home
                </button>
                <button onclick="filterMetricsSection('digital')" id="mjump-digital" class="px-3 py-1 rounded-full text-[11px] font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer">
                  🌐 Digital | Globo
                </button>
              </div>
            </div>

            <!-- Botões Exportar (PDF / CSV) + Renovar Campanha (Quick Win 4) -->
            <div class="flex items-center gap-2">
              <div class="relative">
                <button onclick="toggleExportMenu()" class="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                  <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span>exportar</span>
                  <span class="text-[10px] text-gray-400">▾</span>
                </button>
                <div id="export-dropdown-menu" class="hidden absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-40 text-xs">
                  <button onclick="exportReport('PDF Executivo')" class="w-full text-left px-3.5 py-2 hover:bg-orange-50 hover:text-[#FF5A00] text-gray-800 font-semibold flex items-center justify-between cursor-pointer">
                    <span>📄 PDF Executivo</span>
                    <span class="text-[10px] text-gray-400">Pronto</span>
                  </button>
                  <button onclick="exportReport('CSV (Planilha)')" class="w-full text-left px-3.5 py-2 hover:bg-orange-50 hover:text-[#FF5A00] text-gray-800 font-semibold flex items-center justify-between cursor-pointer">
                    <span>📊 CSV (Dados brutos)</span>
                    <span class="text-[10px] text-gray-400">Excel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- =============================================================== -->
          <!-- CONTAINER 1: OOH | OUT OF HOME (FIEL AO PRINT 04 E 05)          -->
          <!-- =============================================================== -->
          <div id="metrics-ooh-container" class="bg-[#F1F5F9] rounded-2xl p-5 md:p-6 mb-8">
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-base font-bold text-gray-900">OOH | Out of Home</h4>
              <span class="bg-[#22A047] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                Atualizado em 22/10
              </span>
            </div>

            <!-- 6 KPIs em Cards Brancos (2x3) com Micro-copy de Letramento (Seção 3.2 do Doc) -->
            <div class="grid grid-cols-3 gap-3 mb-6 responsive-kpis-ooh">
              <div class="bg-white rounded-lg p-4 border border-gray-100">
                <p id="ooh-kpi-days" class="text-xl font-extrabold text-gray-900">8/14</p>
                <p class="text-[11px] font-semibold text-gray-700 mt-0.5 flex items-center gap-1" title="Quantidade de dias já veiculados em relação ao prazo total contratado">
                  dias ativos <span class="text-gray-400 cursor-help">ⓘ</span>
                </p>
                <p class="text-[10px] text-gray-400 mt-0.5">Restam 6 dias de exibição</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-100">
                <p id="ooh-kpi-screens" class="text-xl font-extrabold text-gray-900">7</p>
                <p class="text-[11px] font-semibold text-gray-700 mt-0.5 flex items-center gap-1" title="Total de telas digitais exibindo sua campanha">
                  telas contratadas <span class="text-gray-400 cursor-help">ⓘ</span>
                </p>
                <p class="text-[10px] text-gray-400 mt-0.5">Monitores digitais ativos</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-100">
                <p id="ooh-kpi-spaces" class="text-xl font-extrabold text-gray-900">7</p>
                <p class="text-[11px] font-semibold text-gray-700 mt-0.5 flex items-center gap-1" title="Total de edifícios ou estabelecimentos com telas ativas">
                  espaços <span class="text-gray-400 cursor-help">ⓘ</span>
                </p>
                <p class="text-[10px] text-gray-400 mt-0.5">Em 5 edifícios / locais</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-100">
                <p id="ooh-kpi-impact" class="text-xl font-extrabold text-gray-900">88,7%</p>
                <p class="text-[11px] font-semibold text-gray-700 mt-0.5 flex items-center gap-1" title="Percentual do fluxo estimado do local impactado pelo anúncio">
                  impacto <span class="text-gray-400 cursor-help">ⓘ</span>
                </p>
                <p class="text-[10px] text-gray-400 mt-0.5">Da circulação dos prédios</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-100">
                <p id="ooh-kpi-reach" class="text-xl font-extrabold text-gray-900">991</p>
                <p class="text-[11px] font-semibold text-gray-700 mt-0.5 flex items-center gap-1" title="Audiência única estimada que visualizou a campanha">
                  pessoas alcançadas <span class="text-gray-400 cursor-help">ⓘ</span>
                </p>
                <p class="text-[10px] text-gray-400 mt-0.5">Pessoas únicas impactadas</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-100">
                <p id="ooh-kpi-freq" class="text-xl font-extrabold text-gray-900">19.6x</p>
                <p class="text-[11px] font-semibold text-gray-700 mt-0.5 flex items-center gap-1" title="Média de vezes que cada pessoa alcançada viu o anúncio">
                  frequência média <span class="text-gray-400 cursor-help">ⓘ</span>
                </p>
                <p class="text-[10px] text-gray-400 mt-0.5">Cada pessoa viu ~20 vezes</p>
              </div>
            </div>

            <!-- Bloco Exibições (Barra Laranja #FF5A00 + Taxa de Entrega) -->
            <div class="mb-7">
              <h5 class="text-xs font-bold text-gray-900">Exibições</h5>
              <p class="text-[11px] text-gray-500 mb-2.5">Número de vezes que seus anúncios foram exibidos até agora</p>

              <div class="grid grid-cols-12 gap-3 responsive-exibicoes-row">
                <!-- Card Barra de Progresso -->
                <div class="col-span-12 md:col-span-8 bg-white rounded-lg p-4 border border-gray-100 flex flex-col justify-between">
                  <div class="flex items-baseline justify-between mb-3">
                    <div>
                      <p id="ooh-deliv-val" class="text-xl font-extrabold text-gray-900">23.205</p>
                      <p class="text-[10px] text-gray-500">exibições entregues</p>
                    </div>
                    <div class="text-right">
                      <p id="ooh-contr-val" class="text-xl font-extrabold text-gray-900">21.888</p>
                      <p class="text-[10px] text-gray-500">exibições contratadas</p>
                    </div>
                  </div>
                  <!-- Barra Laranja Fiel ao Print 04 -->
                  <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
                    <div class="h-full bg-[#FF5A00]" style="width: 94%;"></div>
                    <div class="h-full bg-[#A83800]" style="width: 6%;" title="Exibições bônus acima de 100%"></div>
                  </div>
                </div>

                <!-- Card Taxa de Entrega -->
                <div class="col-span-12 md:col-span-4 bg-white rounded-lg p-4 border border-gray-100 flex flex-col justify-between">
                  <div class="flex items-start justify-between">
                    <span class="text-xs font-bold text-gray-900">Taxa de entrega</span>
                    <span id="ooh-rate-val" class="text-2xl font-black text-gray-900">106%</span>
                  </div>
                  <p class="text-[10px] text-gray-500 mt-2 leading-relaxed">
                    Percentual de impressões entregues em relação ao valor contratado
                  </p>
                </div>
              </div>
            </div>

            <!-- Gráfico "Exibições por dia" (Barras Verticais Laranjas Fiéis ao Print 04) -->
            <div class="mb-8">
              <h5 class="text-xs font-bold text-gray-900 mb-4">Exibições por dia</h5>
              <div class="bg-transparent pt-2 pb-1">
                <div class="flex items-end gap-3 h-52">
                  <!-- Eixo Y -->
                  <div class="flex flex-col justify-between h-44 text-[9px] text-gray-400 pr-2 select-none text-right w-10">
                    <span>6.000</span>
                    <span>5.000</span>
                    <span>4.000</span>
                    <span>3.000</span>
                    <span>2.000</span>
                    <span>1.000</span>
                    <span>0</span>
                  </div>
                  <!-- Área de Barras -->
                  <div class="flex-1 h-44 border-b border-gray-300 relative flex items-end justify-around px-2">
                    <!-- Linhas horizontais de referência -->
                    <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      <div class="border-b border-dashed border-gray-200 w-full h-0"></div>
                      <div class="border-b border-dashed border-gray-200 w-full h-0"></div>
                      <div class="border-b border-dashed border-gray-200 w-full h-0"></div>
                      <div class="border-b border-dashed border-gray-200 w-full h-0"></div>
                      <div class="border-b border-dashed border-gray-200 w-full h-0"></div>
                      <div class="border-b border-dashed border-gray-200 w-full h-0"></div>
                      <div class="w-full h-0"></div>
                    </div>

                    <!-- 8 Barras Laranjas (15/10 a 22/10) -->
                    <div class="relative z-10 flex flex-col items-center group w-8">
                      <div class="w-6 md:w-7 bg-[#FF5A00] rounded-t-sm transition-all group-hover:opacity-85" style="height: 28px;" title="15/10: 1.012 exibições"></div>
                      <span class="text-[9px] text-gray-500 mt-1.5">15/10</span>
                    </div>
                    <div class="relative z-10 flex flex-col items-center group w-8">
                      <div class="w-6 md:w-7 bg-[#FF5A00] rounded-t-sm transition-all group-hover:opacity-85" style="height: 146px;" title="16/10: 5.140 exibições"></div>
                      <span class="text-[9px] text-gray-500 mt-1.5">16/10</span>
                    </div>
                    <div class="relative z-10 flex flex-col items-center group w-8">
                      <div class="w-6 md:w-7 bg-[#FF5A00] rounded-t-sm transition-all group-hover:opacity-85" style="height: 105px;" title="17/10: 3.690 exibições"></div>
                      <span class="text-[9px] text-gray-500 mt-1.5">17/10</span>
                    </div>
                    <div class="relative z-10 flex flex-col items-center group w-8">
                      <div class="w-6 md:w-7 bg-[#FF5A00] rounded-t-sm transition-all group-hover:opacity-85" style="height: 85px;" title="18/10: 2.980 exibições"></div>
                      <span class="text-[9px] text-gray-500 mt-1.5">18/10</span>
                    </div>
                    <div class="relative z-10 flex flex-col items-center group w-8">
                      <div class="w-6 md:w-7 bg-[#FF5A00] rounded-t-sm transition-all group-hover:opacity-85" style="height: 85px;" title="19/10: 2.985 exibições"></div>
                      <span class="text-[9px] text-gray-500 mt-1.5">19/10</span>
                    </div>
                    <div class="relative z-10 flex flex-col items-center group w-8">
                      <div class="w-6 md:w-7 bg-[#FF5A00] rounded-t-sm transition-all group-hover:opacity-85" style="height: 85px;" title="20/10: 2.990 exibições"></div>
                      <span class="text-[9px] text-gray-500 mt-1.5">20/10</span>
                    </div>
                    <div class="relative z-10 flex flex-col items-center group w-8">
                      <div class="w-6 md:w-7 bg-[#FF5A00] rounded-t-sm transition-all group-hover:opacity-85" style="height: 84px;" title="21/10: 2.960 exibições"></div>
                      <span class="text-[9px] text-gray-500 mt-1.5">21/10</span>
                    </div>
                    <div class="relative z-10 flex flex-col items-center group w-12">
                      <span class="text-[8px] font-bold bg-orange-100 text-[#FF5A00] px-1 py-0.5 rounded mb-1 whitespace-nowrap">Em andamento</span>
                      <div class="w-6 md:w-7 bg-[#FF5A00]/75 border border-dashed border-[#FF5A00] rounded-t-sm transition-all group-hover:opacity-85" style="height: 38px;" title="22/10 (Hoje - Dados em consolidação): 1.448 exibições parciais"></div>
                      <span class="text-[9px] font-bold text-[#FF5A00] mt-1.5">22/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tabela "Métricas por local" Unificada com Aba Locais (Quick Win 6 - Seção 3.2 do Doc) -->
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h5 class="text-xs font-bold text-gray-900">Métricas por local</h5>
                <span class="text-[10px] text-gray-500">Visão consolidada por edifício/estabelecimento, ambiente, telas e entrega</span>
              </div>

              <!-- Busca por local + Filtro Ambientes de exibição -->
              <div class="flex flex-wrap items-center gap-2.5 mb-3">
                <div class="relative w-56">
                  <input type="text" id="local-search-input" oninput="filterLocationsTable()" placeholder="Buscar por local ou endereço" class="w-full bg-white border border-gray-200 rounded-md pl-3 pr-8 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF5A00]">
                  <span class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-500">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </span>
                </div>

                <select id="local-env-select" onchange="filterLocationsTable()" class="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs text-gray-600 focus:outline-none focus:border-[#FF5A00]">
                  <option value="todos">Ambientes de exibição</option>
                  <option value="Elevadores Residenciais">Elevadores Residenciais</option>
                  <option value="Elevadores Comerciais">Elevadores Comerciais</option>
                </select>
              </div>

              <!-- Tabela Branca Unificada (Local + Ambiente + Telas + Previstas + Entregues + % Entrega + Alcance + Status) -->
              <div class="bg-white rounded-xl border border-gray-100 overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[740px]">
                  <thead>
                    <tr class="border-b border-gray-100 text-[10px] font-bold text-gray-700">
                      <th class="py-3 px-4">Local <span class="text-gray-400 ml-1">⇅</span></th>
                      <th class="py-3 px-3">Ambiente <span class="text-gray-400 ml-1">⇅</span></th>
                      <th class="py-3 px-2 text-center">Telas</th>
                      <th class="py-3 px-3">Previstas <span class="text-gray-400 ml-1">⇅</span></th>
                      <th class="py-3 px-3">Entregues <span class="text-gray-400 ml-1">⇅</span></th>
                      <th class="py-3 px-3">% Entrega <span class="text-gray-400 ml-1">⇅</span></th>
                      <th class="py-3 px-3">Alcance <span class="text-gray-400 ml-1">⇅</span></th>
                      <th class="py-3 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody id="ooh-locations-tbody" class="divide-y divide-gray-100 text-[11px] text-gray-700">
                    <tr class="local-row" data-name="edifício melbourne rua professor moraes" data-env="Elevadores Residenciais">
                      <td class="py-3 px-4">
                        <p class="font-bold text-gray-900">Edifício Melbourne</p>
                        <p class="text-[10px] text-gray-400">Rua Professor Moraes, 72 , Funcionários - Belo Horizonte</p>
                      </td>
                      <td class="py-3 px-3"><span class="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded">Elevadores Residenciais</span></td>
                      <td class="py-3 px-2 text-center font-semibold">1</td>
                      <td class="py-3 px-3">4.875</td>
                      <td class="py-3 px-3">3.711</td>
                      <td class="py-3 px-3">76,1%</td>
                      <td class="py-3 px-3">189</td>
                      <td class="py-3 px-3 text-right"><span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">● Veiculando</span></td>
                    </tr>
                    <tr class="local-row" data-name="residencial monet rua santa rita durão" data-env="Elevadores Residenciais">
                      <td class="py-3 px-4">
                        <p class="font-bold text-gray-900">Residencial Monet</p>
                        <p class="text-[10px] text-gray-400">Rua Santa Rita Durão, 466 , Funcionários - Belo Horizonte</p>
                      </td>
                      <td class="py-3 px-3"><span class="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded">Elevadores Residenciais</span></td>
                      <td class="py-3 px-2 text-center font-semibold">1</td>
                      <td class="py-3 px-3">4.875</td>
                      <td class="py-3 px-3">3.743</td>
                      <td class="py-3 px-3">76,8%</td>
                      <td class="py-3 px-3">165</td>
                      <td class="py-3 px-3 text-right"><span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">● Veiculando</span></td>
                    </tr>
                    <tr class="local-row" data-name="condomínio champagnat funcionários" data-env="Elevadores Residenciais">
                      <td class="py-3 px-4">
                        <p class="font-bold text-gray-900">Condomínio Champagnat</p>
                        <p class="text-[10px] text-gray-400">Rua Santa Rita Durão, 1000 , Funcionários - Belo Horizonte</p>
                      </td>
                      <td class="py-3 px-3"><span class="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded">Elevadores Residenciais</span></td>
                      <td class="py-3 px-2 text-center font-semibold">2</td>
                      <td class="py-3 px-3">4.873</td>
                      <td class="py-3 px-3 font-semibold text-gray-900">8.218</td>
                      <td class="py-3 px-3 font-semibold text-emerald-700">168,6%</td>
                      <td class="py-3 px-3">375</td>
                      <td class="py-3 px-3 text-right"><span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">● Veiculando</span></td>
                    </tr>
                    <tr class="local-row" data-name="derminas avenida do contorno" data-env="Elevadores Comerciais">
                      <td class="py-3 px-4">
                        <p class="font-bold text-gray-900">Derminas</p>
                        <p class="text-[10px] text-gray-400">Avenida do Contorno, 6084 , Funcionários - Belo Horizonte</p>
                      </td>
                      <td class="py-3 px-3"><span class="bg-blue-50 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded">Elevadores Comerciais</span></td>
                      <td class="py-3 px-2 text-center font-semibold">2</td>
                      <td class="py-3 px-3">5.535</td>
                      <td class="py-3 px-3 text-gray-400">Em apuração</td>
                      <td class="py-3 px-3 text-gray-400">—</td>
                      <td class="py-3 px-3 text-gray-400">—</td>
                      <td class="py-3 px-3 text-right"><span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full" title="Os dados deste condomínio são sincronizados em lotes de até 48h">⏳ Sincronizando</span></td>
                    </tr>
                    <tr class="local-row" data-name="parque das acácias rua grão mogol carmo" data-env="Elevadores Residenciais">
                      <td class="py-3 px-4">
                        <p class="font-bold text-gray-900">Parque das Acácias</p>
                        <p class="text-[10px] text-gray-400">Rua Grão Mogol, 172 , Carmo - Belo Horizonte</p>
                      </td>
                      <td class="py-3 px-3"><span class="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded">Elevadores Residenciais</span></td>
                      <td class="py-3 px-2 text-center font-semibold">1</td>
                      <td class="py-3 px-3">4.873</td>
                      <td class="py-3 px-3 font-semibold text-gray-900">7.533</td>
                      <td class="py-3 px-3 font-semibold text-emerald-700">154,6%</td>
                      <td class="py-3 px-3">261</td>
                      <td class="py-3 px-3 text-right"><span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">● Veiculando</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="text-center mt-3">
                <button onclick="showToast('Todos os 5 locais estão visíveis')" class="text-[11px] font-bold text-gray-700 hover:text-gray-900 inline-flex items-center gap-1 cursor-pointer">
                  ver menos <span>^</span>
                </button>
              </div>
            </div>
          </div>

          <!-- =============================================================== -->
          <!-- CONTAINER 2: DIGITAL | GLOBO (FIEL AO PRINT 06)                 -->
          <!-- =============================================================== -->
          <div id="metrics-digital-container" class="bg-[#F1F5F9] rounded-2xl p-5 md:p-6 mb-10">
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-base font-bold text-gray-900">Digital | Globo</h4>
              <span class="bg-[#22A047] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                Atualizado em 22/10
              </span>
            </div>

            <!-- 4 KPIs em Cards Brancos (incluindo CTR - Seção 3.3 do Doc) -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 responsive-kpis-digital">
              <div class="bg-white rounded-lg p-4 border border-gray-100">
                <p class="text-xl font-extrabold text-gray-900">25/28</p>
                <p class="text-[11px] font-semibold text-gray-700 mt-0.5 flex items-center gap-1" title="Dias de veiculação ativa nas propriedades digitais da Globo">
                  dias ativos <span class="text-gray-400 cursor-help">ⓘ</span>
                </p>
                <p class="text-[10px] text-gray-400 mt-0.5">Veiculação contínua</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-100">
                <p class="text-xl font-extrabold text-gray-900">1</p>
                <p class="text-[11px] font-semibold text-gray-700 mt-0.5 flex items-center gap-1" title="Quantidade de formatos publicitários contratados">
                  formatos <span class="text-gray-400 cursor-help">ⓘ</span>
                </p>
                <p class="text-[10px] text-gray-400 mt-0.5">Display IAB nos portais</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-100">
                <p class="text-xl font-extrabold text-gray-900">12</p>
                <p class="text-[11px] font-semibold text-gray-700 mt-0.5 flex items-center gap-1" title="Total de cliques direcionados ao seu link de destino">
                  cliques <span class="text-gray-400 cursor-help">ⓘ</span>
                </p>
                <p class="text-[10px] text-gray-400 mt-0.5">Visitas enviadas ao site</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-100">
                <p class="text-xl font-extrabold text-[#005CEF]">0,04%</p>
                <p class="text-[11px] font-semibold text-gray-700 mt-0.5 flex items-center gap-1" title="Taxa de Cliques (Cliques divididos por Impressões entregues)">
                  taxa de cliques (CTR) <span class="text-gray-400 cursor-help">ⓘ</span>
                </p>
                <p class="text-[10px] text-emerald-700 font-semibold mt-0.5">Dentro da média Display</p>
              </div>
            </div>

            <!-- Bloco Impressões (Barra Azul #005CEF + Taxa de Entrega 94.6%) -->
            <div class="mb-7">
              <h5 class="text-xs font-bold text-gray-900">Impressões</h5>
              <p class="text-[11px] text-gray-500 mb-2.5">Número de vezes que seus anúncios foram exibidos até agora</p>

              <div class="grid grid-cols-12 gap-3 responsive-exibicoes-row">
                <!-- Card Barra Azul -->
                <div class="col-span-12 md:col-span-8 bg-white rounded-lg p-4 border border-gray-100 flex flex-col justify-between">
                  <div class="flex items-baseline justify-between mb-3">
                    <div>
                      <p class="text-xl font-extrabold text-gray-900">30.273</p>
                      <p class="text-[10px] text-gray-500">Impressões entregues</p>
                    </div>
                    <div class="text-right">
                      <p class="text-xl font-extrabold text-gray-900">32.000</p>
                      <p class="text-[10px] text-gray-500">Impressões contratadas</p>
                    </div>
                  </div>
                  <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-[#005CEF] rounded-full" style="width: 94.6%;"></div>
                  </div>
                </div>

                <!-- Card Taxa de Entrega 94.6% -->
                <div class="col-span-12 md:col-span-4 bg-white rounded-lg p-4 border border-gray-100 flex flex-col justify-between">
                  <div class="flex items-start justify-between">
                    <span class="text-xs font-bold text-gray-900">Taxa de entrega</span>
                    <span class="text-2xl font-black text-gray-900">94.6%</span>
                  </div>
                  <p class="text-[10px] text-gray-500 mt-2 leading-relaxed">
                    Percentual de impressões entregues em relação ao valor contratado
                  </p>
                </div>
              </div>
            </div>

            <!-- Gráfico "Impressões por dia" (Barras Azuis #005CEF Fiéis ao Print 06) -->
            <div class="mb-8">
              <h5 class="text-xs font-bold text-gray-900">Impressões por dia</h5>
              <p class="text-[11px] text-gray-500 mb-4">Número de vezes que seu anúncio foi exibido por dia nas plataformas da Globo</p>

              <div class="overflow-x-auto pb-2">
                <div class="flex items-end gap-2 h-48 min-w-[560px]">
                  <!-- Eixo Y -->
                  <div class="flex flex-col justify-between h-40 text-[9px] text-gray-400 pr-2 select-none text-right w-10">
                    <span>3.000</span>
                    <span>2.500</span>
                    <span>2.000</span>
                    <span>1.500</span>
                    <span>1.000</span>
                    <span>500</span>
                    <span>0</span>
                  </div>
                  <!-- Barras Diárias Azuis -->
                  <div id="digital-bars-chart" class="flex-1 h-40 border-b border-gray-300 relative flex items-end justify-between px-1 gap-1">
                    <!-- Preenchido via JS com os 24 dias exatos (29/09 a 22/10) do Print 06 -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Tabela "Métricas por produto" com Selos Oficiais g1, ge, gshow, receitas, globo.com -->
            <div>
              <h5 class="text-xs font-bold text-gray-900">Métricas por produto</h5>
              <p class="text-[11px] text-gray-500 mb-3">Número de vezes que os produtos do seu anúncio foram exibidos nas plataformas da Globo</p>

              <div class="bg-white rounded-xl border border-gray-100 overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr class="border-b border-gray-100 text-[10px] font-bold text-gray-700">
                      <th class="py-3 px-4">Produto <span class="text-gray-400 ml-1">⇅</span></th>
                      <th class="py-3 px-3">Plataformas <span class="text-gray-400 ml-1">⇅</span></th>
                      <th class="py-3 px-3">Impressões Contratadas <span class="text-gray-400 ml-1">⇅</span></th>
                      <th class="py-3 px-3">Impressões Entregues <span class="text-gray-400 ml-1">⇅</span></th>
                      <th class="py-3 px-4">Taxa de Entrega <span class="text-gray-400 ml-1">⇅</span></th>
                    </tr>
                  </thead>
                  <tbody class="text-[11px] text-gray-700">
                    <tr>
                      <td class="py-3.5 px-4 font-semibold text-gray-900">Display - Crescer</td>
                      <td class="py-3.5 px-3">
                        <div class="flex items-center gap-1">
                          <span class="bg-[#C4170C] text-white font-black px-1.5 py-0.5 rounded text-[10px]">g1</span>
                          <span class="bg-[#06AA48] text-white font-black px-1.5 py-0.5 rounded text-[10px]">ge</span>
                          <span class="bg-[#FF6700] text-white font-black px-1.5 py-0.5 rounded text-[10px]">gshow</span>
                          <span class="bg-[#9B116E] text-white font-black px-1.5 py-0.5 rounded text-[10px]">receitas</span>
                          <span class="bg-[#005CEF] text-white font-black px-1.5 py-0.5 rounded text-[10px]">globo.com</span>
                        </div>
                      </td>
                      <td class="py-3.5 px-3">32.000</td>
                      <td class="py-3.5 px-3">30.273</td>
                      <td class="py-3.5 px-4 font-semibold text-gray-900">94,6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="text-center mt-3">
                <button class="text-[11px] font-bold text-gray-700 hover:text-gray-900 inline-flex items-center gap-1 cursor-pointer">
                  ver menos <span>^</span>
                </button>
              </div>
            </div>
          </div>

          <!-- BARRA/CARD DE FECHAMENTO: RENOVAR CAMPANHA AO FINAL DAS MÉTRICAS (AJUSTE 2) -->
          <div class="bg-[#FFF7F2] border border-[#FFCCAA] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 mb-6">
            <div class="flex items-center gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-[#FF5A00]/10 text-[#FF5A00] flex items-center justify-center font-black text-base shrink-0">
                ↻
              </div>
              <p class="text-xs md:text-sm font-bold text-gray-900">
                Gostou dos resultados desta campanha? Garanta os mesmos pontos e formatos para o próximo período com 1 clique.
              </p>
            </div>
            <button onclick="openRenewModal()" class="px-4 py-2.5 rounded-lg bg-[#FF5A00] hover:bg-[#E04E00] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer whitespace-nowrap">
              <span>↻</span> renovar campanha
            </button>
          </div>

          <!-- =============================================================== -->
          <!-- FAQ NO RODAPÉ DA ABA MÉTRICAS (FIEL AOS PRINTS 04 E 06)         -->
          <!-- =============================================================== -->
          <div class="grid grid-cols-12 gap-8 py-6 items-start responsive-faq-grid">
            <div class="col-span-12 md:col-span-5 flex flex-col items-start justify-center pt-6">
              <h4 class="text-sm font-bold text-gray-900 mb-3">Ficou com alguma dúvida?</h4>
              <button onclick="showToast('Abrindo atendimento com especialista Aqui ads...')" class="bg-[#1E2229] hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer">
                fale com especialista
              </button>
            </div>

            <div class="col-span-12 md:col-span-7 border-l-2 border-gray-200 pl-0 space-y-1" id="faq-accordion">
              <!-- Item 1 (Aberto por padrão com borda laranja à esquerda) -->
              <div class="faq-item border-l-2 border-[#FF5A00] -ml-[2px] pl-5 py-2 cursor-pointer" onclick="toggleFaq(0)">
                <h5 class="text-xs font-bold text-gray-900">O que significa exibição total?</h5>
                <p class="faq-answer text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                  A exibição total mostra a porcentagem de exibições que já foram entregues em relação ao que foi contratado. Exemplo: se a campanha está com 18%, significa que 18% do volume total previsto já foi exibido até o momento.
                </p>
              </div>
              <!-- Item 2 -->
              <div class="faq-item border-l-2 border-transparent -ml-[2px] pl-5 py-2 cursor-pointer" onclick="toggleFaq(1)">
                <h5 class="text-xs font-medium text-gray-600 hover:text-gray-900">Qual a diferença entre exibições contratadas e exibições entregues?</h5>
                <p class="faq-answer hidden text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                  Exibições contratadas representam a meta estimada no plano de mídia, enquanto exibições entregues contabilizam as inserções efetivamente reproduzidas nas telas OOH e propriedades digitais.
                </p>
              </div>
              <!-- Item 3 -->
              <div class="faq-item border-l-2 border-transparent -ml-[2px] pl-5 py-2 cursor-pointer" onclick="toggleFaq(2)">
                <h5 class="text-xs font-medium text-gray-600 hover:text-gray-900">O que são dias ativos e como isso impacta os resultados?</h5>
                <p class="faq-answer hidden text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                  Dias ativos indicam quantos dias a campanha já esteve em exibição frente ao período total contratado. A entrega acumula progressivamente a cada dia ativo.
                </p>
              </div>
              <!-- Item 4 -->
              <div class="faq-item border-l-2 border-transparent -ml-[2px] pl-5 py-2 cursor-pointer" onclick="toggleFaq(3)">
                <h5 class="text-xs font-medium text-gray-600 hover:text-gray-900">Como interpretar pessoas alcançadas?</h5>
                <p class="faq-answer hidden text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                  Representa a estimativa de indivíduos únicos que passaram pelos ambientes de exibição durante os dias ativos da sua campanha.
                </p>
              </div>
              <!-- Item 5 -->
              <div class="faq-item border-l-2 border-transparent -ml-[2px] pl-5 py-2 cursor-pointer" onclick="toggleFaq(4)">
                <h5 class="text-xs font-medium text-gray-600 hover:text-gray-900">Por que as métricas variam por local, ambiente ou tipo de mídia?</h5>
                <p class="faq-answer hidden text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                  Cada edifício comercial, condomínio residencial ou portal digital possui fluxo de audiência, número de elevadores e horários de funcionamento próprios.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ================================================================= -->
        <!-- ABA 2: ARTE (FIEL AOS PRINTS 07 E 08 - APROVADA E PENDENTE)       -->
        <!-- ================================================================= -->
        <section id="dtab-panel-arte" class="detail-tab-panel hidden">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-5">
            <h3 class="text-lg font-bold text-gray-900">Arte</h3>
            <!-- Seletor de Estado da Aba Arte para Validação Rápida -->
            <div class="flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg text-[11px]">
              <span class="text-gray-500 px-2 font-medium">Simular estado:</span>
              <button onclick="setArteState('aprovada')" id="arte-state-aprovada" class="px-2.5 py-1 rounded-md font-bold bg-white text-gray-900 shadow-2xs cursor-pointer">
                ✓ Arte Aprovada (Print 07)
              </button>
              <button onclick="setArteState('pendente')" id="arte-state-pendente" class="px-2.5 py-1 rounded-md font-semibold text-gray-600 hover:text-gray-900 cursor-pointer">
                ⚠️ Arte Pendente (Print 08)
              </button>
            </div>
          </div>

          <!-- ESTADO A: ARTE APROVADA COM MOLDURA ELETROMIDIA (PRINT 07) -->
          <div id="arte-view-aprovada" class="bg-[#F1F5F9] rounded-2xl p-6 mb-8">
            <div class="flex items-start gap-6 responsive-arte-grid">
              <!-- Seletor Vertical de Ambientes -->
              <div class="w-48 shrink-0 space-y-2">
                <button onclick="showToast('Visualizando formato: Elevadores Residenciais')" class="w-full text-left px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#FF5A00] text-xs font-bold text-gray-900 flex items-center justify-between cursor-pointer">
                  <span>🏢 residenciais</span>
                  <span class="text-[10px] text-emerald-600 font-bold">✓</span>
                </button>
                <button onclick="showToast('Visualizando formato: Elevadores Comerciais')" class="w-full text-left px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center justify-between cursor-pointer">
                  <span>🏢 comerciais</span>
                  <span class="text-[10px] text-emerald-600 font-bold">✓</span>
                </button>
              </div>

              <!-- Preview Central na Moldura Eletromidia -->
              <div class="flex-1 bg-white rounded-xl p-6 border border-gray-200 flex flex-col items-center">
                <div class="w-full flex items-center justify-between mb-4">
                  <div class="flex items-center gap-2">
                    <span class="bg-gray-100 text-gray-700 text-[11px] font-bold px-2.5 py-1 rounded">900x600 px</span>
                    <span class="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded">✓ Arte aprovada</span>
                  </div>
                  <button onclick="openUploadArteModal()" class="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer">
                    trocar arte
                  </button>
                </div>

                <!-- Moldura Preta Oficial de Elevador Eletromidia -->
                <div class="bg-gray-950 p-4 rounded-xl shadow-lg max-w-[420px] w-full border-4 border-gray-800">
                  <div class="overflow-hidden rounded-md bg-amber-900 relative aspect-3/2 flex items-center justify-center">
                    <img id="arte-approved-img" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" alt="Criativo Aprovado" class="w-full h-full object-cover opacity-90">
                    <div class="absolute inset-0 bg-gradient-to-r from-amber-950/85 via-amber-900/50 to-transparent p-5 flex flex-col justify-between text-white">
                      <div>
                        <p class="text-[10px] uppercase tracking-widest text-amber-200 font-bold">Outubro Rosa</p>
                        <p class="text-sm font-extrabold leading-tight">UM NOVO VISUAL,<br>UM NOVO VOCÊ</p>
                      </div>
                      <div class="bg-black/40 backdrop-blur-xs border border-white/30 rounded p-2 w-fit">
                        <p class="text-[9px] font-semibold">ATÉ R$ <span class="text-lg font-black">400</span></p>
                        <p class="text-[10px] font-extrabold">DE DESCONTO</p>
                      </div>
                      <p class="text-[9px] font-bold tracking-wider uppercase text-amber-100">CAMPANHA INSTITUCIONAL</p>
                    </div>
                  </div>
                  <div class="mt-2.5 flex items-center justify-between text-[10px] text-gray-400 px-1">
                    <span>espaço reservado ao condomínio</span>
                    <span class="font-bold text-orange-500">eletromidia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ESTADO B: ARTE PENDENTE DE ENVIO (PRINT 08 - LUNETA ROXA/ROSA) -->
          <div id="arte-view-pendente" class="hidden bg-[#F1F5F9] rounded-2xl p-6 md:p-8 mb-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8">
              <div class="flex-1 max-w-xl">
                <h4 class="text-sm font-bold text-gray-900 mb-2">Tudo certo! Formulário de criação enviado</h4>
                <p class="text-xs text-gray-600 leading-relaxed mb-4">
                  Recebemos suas informações.<br>
                  Em até 12h úteis, entraremos em contato por e-mail ou WhatsApp para confirmar os detalhes e iniciar a criação.
                </p>
                <button onclick="showToast('Abrindo resumo do briefing enviado...')" class="px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-800 hover:bg-gray-50 inline-flex items-center gap-1.5 shadow-2xs cursor-pointer">
                  <span>✍️</span> ver formulário
                </button>

                <hr class="my-6 border-gray-200">

                <h4 class="text-xs font-bold text-gray-900 mb-1">Já recebeu sua arte?</h4>
                <p class="text-xs text-gray-600 mb-4">Envie aqui para darmos continuidade ao processo.</p>
                <button onclick="openUploadArteModal()" class="px-4 py-2.5 bg-[#FF5A00] hover:bg-[#E04E00] text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition cursor-pointer">
                  <span>↑</span> enviar arte
                </button>
              </div>

              <!-- Ilustração Fiel ao Print 08 (Luneta Roxa/Rosa/Verde) -->
              <div class="w-44 h-44 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 200 200" class="w-full h-full">
                  <path d="M95 190 L110 120 L132 125 L125 190 Z" fill="#F472B6"/>
                  <polygon points="65,75 175,112 170,128 55,115" fill="#4F46E5"/>
                  <ellipse cx="60" cy="95" rx="22" ry="28" fill="#15803D"/>
                  <ellipse cx="60" cy="95" rx="16" ry="21" fill="#EA580C"/>
                  <ellipse cx="62" cy="95" rx="10" ry="14" fill="#FFFFFF"/>
                  <ellipse cx="60" cy="95" rx="5" ry="9" fill="#111827"/>
                  <rect x="115" y="83" width="7" height="16" rx="3.5" transform="rotate(18 115 83)" fill="#F472B6"/>
                  <rect x="125" y="87" width="7" height="16" rx="3.5" transform="rotate(18 125 87)" fill="#F472B6"/>
                  <rect x="135" y="91" width="7" height="16" rx="3.5" transform="rotate(18 135 91)" fill="#F472B6"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <!-- ================================================================= -->
        <!-- ABA 3: FATURAMENTO (FIEL AO PRINT 09)                             -->
        <!-- ================================================================= -->
        <section id="dtab-panel-faturamento" class="detail-tab-panel hidden pb-12">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-start responsive-faturamento-grid">
            <!-- Coluna Valores -->
            <div class="md:col-span-6">
              <h3 class="text-base font-bold text-gray-900 mb-5">Valores</h3>
              <div class="space-y-3 text-xs">
                <div class="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span id="fat-subtotal" class="font-medium text-gray-800">R$ 1.092,08</span>
                </div>
                <div class="flex items-center justify-between text-gray-600">
                  <span>Cupom aplicado (MICHELM15)</span>
                  <span class="font-semibold text-[#22A047]">-R$ 163,81</span>
                </div>
                <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-sm font-extrabold text-gray-900">
                  <span>Total</span>
                  <span id="fat-total">R$ 928,27</span>
                </div>
              </div>
            </div>

            <!-- Coluna Pagamento -->
            <div class="md:col-span-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-base font-bold text-gray-900">Pagamento</h3>
                <button onclick="showToast('Baixando Nota Fiscal Eletrônica (PDF)...')" class="px-3 py-1 border border-gray-200 rounded-md text-[11px] font-bold text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                  <span>nota fiscal</span>
                  <span>🧾</span>
                </button>
              </div>

              <div class="border border-gray-200 rounded-xl p-4 bg-white flex items-center justify-between mb-4">
                <span class="text-xs text-gray-700 font-medium">Pagamento aprovado em</span>
                <span class="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  Boleto
                  <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </span>
              </div>

              <p class="text-center text-[10px] text-gray-400">
                Pagamento processado por <strong class="text-[#00A868] text-sm font-black tracking-tight ml-0.5">stone</strong>
              </p>
            </div>
          </div>
        </section>

        <!-- ================================================================= -->
        <!-- ABA 4: LOCAIS (FIEL AO PRINT 10)                                  -->
        <!-- ================================================================= -->
        <section id="dtab-panel-locais" class="detail-tab-panel hidden pb-12">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-lg font-bold text-gray-900">Locais</h3>
            <div class="flex items-center gap-2">
              <button onclick="openRenewModal()" class="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                <span>↻</span> renovar campanha
              </button>
              <button onclick="exportReport('Lista de Locais CSV')" class="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
                <span>📥</span> exportar
              </button>
            </div>
          </div>

          <h4 class="text-xs font-bold text-gray-800 mb-3">OOH</h4>

          <div class="border border-gray-200 rounded-xl overflow-x-auto bg-white">
            <table class="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr class="bg-[#F3F4F6] text-[10px] font-bold text-gray-800 border-b border-gray-200">
                  <th class="py-3 px-4">Local</th>
                  <th class="py-3 px-4">Endereço</th>
                  <th class="py-3 px-4">Vertical</th>
                  <th class="py-3 px-4">Telas</th>
                  <th class="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-[11px] text-gray-600">
                <tr>
                  <td class="py-3.5 px-4 text-gray-800">Edifício Melbourne</td>
                  <td class="py-3.5 px-4">Rua Professor Moraes, 72</td>
                  <td class="py-3.5 px-4">Elevadores</td>
                  <td class="py-3.5 px-4">1</td>
                  <td class="py-3.5 px-4"><span class="bg-[#16A34A] text-white text-[10px] font-bold px-4 py-0.5 rounded-full">Ativo</span></td>
                </tr>
                <tr>
                  <td class="py-3.5 px-4 text-gray-800">Residencial Monet</td>
                  <td class="py-3.5 px-4">Rua Santa Rita Durão, 466</td>
                  <td class="py-3.5 px-4">Elevadores</td>
                  <td class="py-3.5 px-4">1</td>
                  <td class="py-3.5 px-4"><span class="bg-[#16A34A] text-white text-[10px] font-bold px-4 py-0.5 rounded-full">Ativo</span></td>
                </tr>
                <tr>
                  <td class="py-3.5 px-4 text-gray-800">Condomínio Champagnat</td>
                  <td class="py-3.5 px-4">Rua Santa Rita Durão, 1000</td>
                  <td class="py-3.5 px-4">Elevadores</td>
                  <td class="py-3.5 px-4">2</td>
                  <td class="py-3.5 px-4"><span class="bg-[#16A34A] text-white text-[10px] font-bold px-4 py-0.5 rounded-full">Ativo</span></td>
                </tr>
                <tr>
                  <td class="py-3.5 px-4 text-gray-800">Derminas</td>
                  <td class="py-3.5 px-4">Avenida do Contorno, 6084</td>
                  <td class="py-3.5 px-4">Elevadores</td>
                  <td class="py-3.5 px-4">1</td>
                  <td class="py-3.5 px-4"><span class="bg-[#16A34A] text-white text-[10px] font-bold px-4 py-0.5 rounded-full">Ativo</span></td>
                </tr>
                <tr>
                  <td class="py-3.5 px-4 text-gray-800">Parque das Acácias</td>
                  <td class="py-3.5 px-4">Rua Grão Mogol, 172</td>
                  <td class="py-3.5 px-4">Elevadores</td>
                  <td class="py-3.5 px-4">2</td>
                  <td class="py-3.5 px-4"><span class="bg-[#16A34A] text-white text-[10px] font-bold px-4 py-0.5 rounded-full">Ativo</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      <!-- ===================================================================== -->
      <!-- TELA DEDICADA: SUBIR IMAGEM / ENVIAR ARTE (VIEW-UPLOAD-ARTE)          -->
      <!-- ===================================================================== -->
      <main id="view-upload-arte" class="view-section flex-1 max-w-[1060px] w-full mx-auto px-6 md:px-10 py-6 responsive-main-padding">
        <!-- Botão Voltar -->
        <div class="mb-5">
          <button onclick="backFromUploadArte()" class="px-3.5 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 inline-flex items-center gap-1.5 shadow-2xs cursor-pointer">
            <span>‹</span> voltar
          </button>
        </div>

        <!-- Cabeçalho da Tela de Subir Imagem -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-200">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full">⚠️ Aguardando envio de criativo</span>
              <span id="upload-screen-campaign-id" class="text-xs font-bold text-gray-400">#750708</span>
            </div>
            <h2 class="text-xl font-extrabold text-gray-900 tracking-tight">Enviar arte da campanha</h2>
            <p class="text-xs text-gray-600 mt-0.5">
              Campanha: <strong id="upload-screen-campaign-title" class="text-gray-900">Ed. Comercial liv635</strong> • Prazo contratado: <span id="upload-screen-campaign-period" class="font-medium text-gray-800">26/10/2026 a 22/11/2026 (28 dias)</span>
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="openCampaignDetail(uploadingCampaignId, 'locais')" class="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
              📍 ver locais contratados
            </button>
          </div>
        </div>

        <!-- Seletor do Formato Contratado -->
        <div class="mb-6">
          <label class="block text-xs font-bold text-gray-800 mb-2">1. Selecione o formato contratado para enviar o arquivo</label>
          <div class="flex flex-wrap items-center gap-2.5">
            <button onclick="selectUploadFormat('comercial')" id="up-fmt-comercial" class="px-4 py-2.5 rounded-xl border-2 border-[#FF5A00] bg-orange-50/40 text-left flex items-center gap-3 cursor-pointer transition">
              <span class="text-lg">🏢</span>
              <div>
                <p class="text-xs font-bold text-gray-900">Elevadores Comerciais / Residenciais</p>
                <p class="text-[10px] text-gray-500">Dimensão obrigatória: <strong class="text-gray-800">900x600 px</strong> (Horizontal • JPG, PNG ou MP4)</p>
              </div>
              <span id="up-fmt-badge" class="ml-2 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">Pendente</span>
            </button>
          </div>
        </div>

        <!-- Grid Principal: Área Tracejada de Upload + Pré-visualização na Moldura Eletromidia -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#F1F5F9] rounded-2xl p-5 md:p-6 mb-8">
          <!-- Coluna Esquerda: Dropzone para Subir Imagem (7 cols) -->
          <div class="lg:col-span-7 flex flex-col justify-between bg-white rounded-xl p-6 border border-gray-200">
            <div>
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-bold text-gray-900">2. Subir imagem ou vídeo do anúncio</h3>
                <span class="text-[11px] font-semibold text-gray-500">900x600 px • Máx. 15MB</span>
              </div>

              <!-- Área Tracejada Interativa -->
              <div onclick="previewSelectedCreative()" id="upload-dropzone-box" class="border-2 border-dashed border-gray-300 hover:border-[#FF5A00] bg-[#F8FAFC] hover:bg-orange-50/30 rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[230px]">
                <div id="upload-dropzone-icon" class="w-12 h-12 rounded-full bg-orange-100 text-[#FF5A00] flex items-center justify-center mb-3 font-black text-lg">
                  ↑
                </div>
                <p id="upload-dropzone-title" class="text-xs md:text-sm font-bold text-gray-900 mb-1">
                  Arraste sua imagem aqui ou clique para selecionar do computador
                </p>
                <p id="upload-dropzone-sub" class="text-[11px] text-gray-500 max-w-sm">
                  Formatos aceitos: <strong class="text-gray-700">JPG, PNG ou MP4</strong> • Dimensão exata: <strong class="text-gray-700">900x600 px</strong>
                </p>
                <span id="upload-file-pill" class="mt-4 px-3.5 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-bold text-gray-800 shadow-2xs">
                  Selecionar arquivo do computador...
                </span>
              </div>

              <!-- Checklist de Validação Técnica -->
              <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <div class="bg-[#F8FAFC] border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 text-gray-700">
                  <span id="chk-dim" class="text-gray-400 font-bold">✓</span>
                  <span>Resolução <strong>900x600 px</strong></span>
                </div>
                <div class="bg-[#F8FAFC] border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 text-gray-700">
                  <span id="chk-fmt" class="text-gray-400 font-bold">✓</span>
                  <span>Formato <strong>JPG / PNG / MP4</strong></span>
                </div>
                <div class="bg-[#F8FAFC] border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 text-gray-700">
                  <span id="chk-mod" class="text-gray-400 font-bold">✓</span>
                  <span>Aprovação em <strong>até 24h</strong></span>
                </div>
              </div>
            </div>

            <!-- Rodapé de Ação da Coluna de Upload -->
            <div class="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <button onclick="backFromUploadArte()" class="px-4 py-2.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer">
                cancelar
              </button>
              <button onclick="confirmUploadArteFromScreen()" id="btn-confirm-upload-screen" class="px-5 py-2.5 rounded-lg bg-[#FF5A00] hover:bg-[#E04E00] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition cursor-pointer">
                <span>✓</span> confirmar envio da arte
              </button>
            </div>
          </div>

          <!-- Coluna Direita: Pré-visualização na Moldura Eletromidia (5 cols) -->
          <div class="lg:col-span-5 bg-white rounded-xl p-6 border border-gray-200 flex flex-col items-center justify-between">
            <div class="w-full flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-gray-900">Pré-visualização na tela OOH</span>
              <span id="upload-preview-status" class="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-0.5 rounded">Aguardando arquivo</span>
            </div>

            <!-- Moldura Preta Oficial Eletromidia -->
            <div class="bg-gray-950 p-4 rounded-xl shadow-lg w-full border-4 border-gray-800 my-auto">
              <!-- Estado Vazio (Antes de selecionar imagem) -->
              <div id="upload-frame-empty" onclick="previewSelectedCreative()" class="overflow-hidden rounded-md bg-gray-800 relative aspect-3/2 flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-gray-800/80 transition">
                <svg class="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p class="text-[11px] font-bold text-gray-300">Espaço da sua arte (900x600 px)</p>
                <p class="text-[10px] text-gray-400 mt-0.5">Clique ao lado para carregar e simular na tela</p>
              </div>

              <!-- Estado Preenchido (Após selecionar imagem) -->
              <div id="upload-frame-filled" class="hidden overflow-hidden rounded-md bg-amber-900 relative aspect-3/2 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" alt="Preview da Arte Carregada" class="w-full h-full object-cover opacity-90">
                <div class="absolute inset-0 bg-gradient-to-r from-amber-950/85 via-amber-900/50 to-transparent p-4 flex flex-col justify-between text-white">
                  <div>
                    <p class="text-[9px] uppercase tracking-widest text-amber-200 font-bold">Campanha OOH</p>
                    <p class="text-xs font-extrabold leading-tight">SEU ANÚNCIO EM DESTAQUE<br>NOS ELEVADORES</p>
                  </div>
                  <div class="bg-black/40 border border-white/30 rounded px-2 py-1 w-fit">
                    <p class="text-[9px] font-bold">900x600 px • VALIDADO ✓</p>
                  </div>
                  <p id="upload-frame-mall-label" class="text-[8px] font-bold tracking-wider uppercase text-amber-100">ED. COMERCIAL LIV635</p>
                </div>
              </div>

              <div class="mt-2.5 flex items-center justify-between text-[10px] text-gray-400 px-1">
                <span>espaço reservado ao condomínio</span>
                <span class="font-bold text-orange-500">eletromidia</span>
              </div>
            </div>

            <p class="text-[11px] text-gray-500 text-center mt-3">
              Após confirmar o envio, nossa equipe revisa o material em até 24h úteis antes da publicação nas telas.
            </p>
          </div>
        </div>
      </main>`;
const AQUI_ADS_SHELL_FOOTER_HTML = `      <!-- ===================================================================== -->
      <!-- FOOTER OFICIAL GLOBO (FIEL AOS PRINTS 01..10)                         -->
      <!-- ===================================================================== -->
      <footer class="bg-[#F3F4F6] border-t border-gray-200 px-6 md:px-10 py-8 mt-auto">
        <div class="max-w-[1140px] mx-auto">
          <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div class="flex items-center gap-1.5 font-black text-lg text-gray-900 tracking-tight">
              <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-900 text-white text-[10px]">◉</span>
              globo
            </div>
            <div class="flex items-center gap-3 text-xs text-gray-600">
              <span>Acompanhe o Aqui ads</span>
              <span class="font-bold text-gray-900 cursor-pointer">in</span>
              <span class="font-bold text-gray-900 cursor-pointer">📷</span>
              <span class="font-bold text-gray-900 cursor-pointer">▶</span>
              <span class="font-bold text-gray-900 cursor-pointer">♪</span>
            </div>
          </div>

          <div class="mb-6 text-[11px] text-gray-500 space-y-1">
            <p class="font-bold text-gray-700">Quer uma ajuda?</p>
            <p>📱 (11) 5039-5212</p>
            <p>✉️ contato@aqui.globo</p>
          </div>

          <div class="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-400">
            <p>© Copyright 2026 GLOBO COMUNICACAO E PARTICIPACOES S/A | CNPJ: 27.865.757/0036-65 | R. Evandro Carlos de Andrade, 160 - 3º Andar, Vila Cordeiro - São Paulo, SP, 04583-115</p>
            <div class="flex items-center gap-4">
              <a href="javascript:void(0)" class="hover:underline">Privacidade</a>
              <a href="javascript:void(0)" class="hover:underline">Gerencie seus dados</a>
              <a href="javascript:void(0)" class="hover:underline">Gerencie seus cookies</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL INTERATIVO 1: RENOMEAR CAMPANHA (VIA MENU ⋮ -> RENOMEAR CAMPANHA)   -->
  <!-- ========================================================================= -->
  <div id="modal-rename-campaign" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-base font-bold text-gray-900">Renomear campanha</h3>
        <button onclick="closeRenameModal()" class="text-gray-400 hover:text-gray-700 text-lg font-bold cursor-pointer">✕</button>
      </div>
      <p class="text-xs text-gray-500 mb-4">
        Escolha um nome claro para identificar rapidamente este plano de mídia na sua listagem.
      </p>
      <div class="mb-5">
        <label class="block text-[11px] font-bold text-gray-700 mb-1.5">Nome da campanha</label>
        <input type="text" id="rename-modal-input" class="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#FF5A00]" placeholder="Digite o novo nome da campanha">
      </div>
      <div class="flex items-center justify-end gap-2">
        <button onclick="closeRenameModal()" class="px-3.5 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer">cancelar</button>
        <button onclick="saveRenamedCampaign()" class="px-4 py-2 rounded-lg text-xs font-bold bg-[#FF5A00] hover:bg-[#E04E00] text-white cursor-pointer">
          salvar
        </button>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL INTERATIVO 2: RENOVAR CAMPANHA EM 1 CLIQUE (QUICK WIN 4 - SEÇÃO 3.4) -->
  <!-- ========================================================================= -->
  <div id="modal-renew" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
      <div class="flex items-center justify-between mb-3">
        <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded">Recompra Express em 1 Clique</span>
        <button onclick="closeRenewModal()" class="text-gray-400 hover:text-gray-700 text-lg font-bold cursor-pointer">✕</button>
      </div>
      <h3 class="text-base font-bold text-gray-900 mb-1">Renovar campanha</h3>
      <p class="text-xs text-gray-500 mb-4" id="renew-modal-subtitle">
        Seus locais e formatos já estão pré-carregados. Escolha a duração do novo período para continuar anunciando sem interrupção.
      </p>

      <!-- Seletor de Prazo (7, 14 ou 28 dias) -->
      <div class="mb-4">
        <label class="block text-[11px] font-bold text-gray-800 mb-1.5">1. Escolha a duração da renovação</label>
        <div class="grid grid-cols-3 gap-2">
          <button onclick="selectRenewDuration(7)" id="renew-dur-7" class="py-2 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:border-gray-400 cursor-pointer">
            7 dias
          </button>
          <button onclick="selectRenewDuration(14)" id="renew-dur-14" class="py-2 px-3 rounded-lg border-2 border-[#FF5A00] bg-orange-50/60 text-xs font-extrabold text-[#FF5A00] cursor-pointer">
            14 dias (Atual)
          </button>
          <button onclick="selectRenewDuration(28)" id="renew-dur-28" class="py-2 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:border-gray-400 cursor-pointer">
            28 dias
          </button>
        </div>
      </div>

      <!-- Opção de Reaproveitar Arte Aprovada -->
      <div class="mb-4 bg-emerald-50/70 border border-emerald-200 rounded-xl p-3">
        <label class="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" checked class="mt-0.5 accent-[#FF5A00] rounded cursor-pointer">
          <span class="text-xs text-gray-800 leading-snug">
            <strong class="text-emerald-950 block">Manter a mesma arte aprovada</strong>
            <span class="text-[11px] text-gray-600">Sem fila de moderação — sua campanha entra no ar automaticamente na data escolhida.</span>
          </span>
        </label>
      </div>

      <!-- Resumo Financeiro + Regra Canônica de Parcelamento em até 3x -->
      <div class="bg-[#F8FAFC] border border-gray-200 rounded-xl p-3.5 mb-5 space-y-2 text-xs">
        <div class="flex justify-between">
          <span class="text-gray-500">Campanha base:</span>
          <strong class="text-gray-900" id="renew-campaign-title">Campanha Multicanal - Outubro</strong>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Novo período sugerido:</span>
          <strong class="text-gray-900" id="renew-period-label">29/10/2026 a 11/11/2026 (14 dias)</strong>
        </div>
        <div class="flex justify-between items-baseline pt-1 border-t border-gray-200">
          <span class="text-gray-700 font-semibold">Investimento total:</span>
          <div class="text-right">
            <strong class="text-sm font-black text-[#FF5A00]" id="renew-campaign-price">R$ 928,27</strong>
            <span class="block text-[10px] text-gray-500">Em até 3x sem juros no cartão ou PIX</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2">
        <button onclick="closeRenewModal()" class="px-3.5 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer">Voltar</button>
        <button onclick="confirmRenewal()" class="px-4 py-2 rounded-lg text-xs font-bold bg-[#FF5A00] hover:bg-[#E04E00] text-white cursor-pointer">
          Ir para o Pagamento →
        </button>
      </div>
    </div>
  </div>

  <!-- MODAL DETALHES DO PONTO OOH / PRODUTO DIGITAL (Acionado por "ver detalhes" na PLP) -->
  <div id="modal-plp-detail" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200">
      <div class="flex items-start justify-between gap-3 mb-4">
        <div>
          <span id="plp-detail-modal-badge" class="bg-orange-100 text-[#FF4F00] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">Detalhes do Ponto</span>
          <h3 id="plp-detail-modal-title" class="text-base font-bold text-[#282E38] mt-1">VN Alvorada 1217</h3>
          <p id="plp-detail-modal-sub" class="text-xs text-[#6B7588] mt-0.5">Rua Alvorada - 1217, Vila Olímpia - São Paulo</p>
        </div>
        <button type="button" onclick="closePlpDetailModal()" class="text-gray-400 hover:text-gray-700 text-lg font-bold cursor-pointer">✕</button>
      </div>
      <div id="plp-detail-modal-body" class="space-y-3 text-xs text-[#282E38] mb-5">
        <!-- Preenchido via JS -->
      </div>
      <div class="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
        <button type="button" onclick="closePlpDetailModal()" class="px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer">Fechar</button>
        <button type="button" id="plp-detail-modal-action-btn" class="px-5 py-2 rounded-lg bg-[#3A9F3A] hover:bg-[#338C33] text-white text-xs font-bold shadow-xs cursor-pointer">Adicionar ao plano</button>
      </div>
    </div>
  </div>

  <!-- TOAST DE FEEDBACK -->
  <div id="proto-toast" class="fixed bottom-5 right-5 z-50 hidden bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-gray-700">
    <span class="w-2 h-2 rounded-full bg-[#FF5A00]"></span>
    <span id="proto-toast-text">Ação concluída</span>
  </div>

  <!-- MODAL SALVAR COMO RASCUNHO (Acionado pela Página de Resumo) -->
  <div id="modal-save-draft" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
      <div class="flex items-start justify-between gap-3 mb-3">
        <div>
          <span class="bg-orange-100 text-[#FF4F00] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">Salvar Plano</span>
          <h3 class="text-base font-bold text-gray-900 mt-1">Salvar como rascunho</h3>
        </div>
        <button type="button" onclick="closeSaveDraftModal()" class="text-gray-400 hover:text-gray-700 text-lg font-bold cursor-pointer">✕</button>
      </div>
      <p class="text-xs text-gray-600 mb-4 leading-relaxed">
        Seu plano ficará salvo na aba <strong>Rascunhos</strong> dentro de <strong>Meus Anúncios</strong> para você retomar ou compartilhar quando quiser.
      </p>
      <div class="mb-5">
        <label class="block text-xs font-bold text-gray-800 mb-1.5">Nome do rascunho</label>
        <input id="save-draft-name-input" type="text" maxlength="40" value="Campanha - 21/10 - 15h34" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-900 focus:border-[#FF4F00] outline-none">
      </div>
      <div class="flex items-center justify-end gap-2">
        <button type="button" onclick="closeSaveDraftModal()" class="px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer">Cancelar</button>
        <button type="button" onclick="confirmSaveDraft()" class="px-5 py-2 rounded-lg bg-[#FF4F00] hover:bg-[#E04600] text-white text-xs font-bold shadow-xs cursor-pointer">Salvar rascunho</button>
      </div>
    </div>
  </div>`;

// 3. Motor Reativo e Funções Globais do Aqui Ads
    function normalizeMockSource(raw) {
      raw = raw || {};
      const oohCatalog = (raw.oohCatalog || []).map(x => ({
        ...x,
        id: x.id,
        name: x.name,
        address: x.address,
        city: x.city || 'São Paulo - SP',
        environment: x.environmentShort || x.environment || 'comercial',
        environmentLabel: x.environmentLabel || x.environment || 'comercial',
        distance: x.distance || '300 m',
        format: x.format || 'digital',
        screens: x.screens ?? 2,
        impressions: Number(x.impressions ?? x.views2w) || 20000,
        viewsText: x.viewsText || null,
        reach: Number(x.reach ?? x.reach2w) || 1800,
        reachText: x.reachText || null,
        freq: (x.freq ?? x.frequency2w) !== undefined ? (x.freq ?? x.frequency2w) : 11,
        basePrice2w: Number(x.basePrice2w ?? x.price2w) || 264.96,
        price4w: Number(x.price4w) || ((Number(x.basePrice2w ?? x.price2w) || 264.96) * 1.8),
        towersBadge: x.towersBadge || null,
        favorite: Boolean(x.favorite),
        img: x.img || x.photo || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'
      }));

      const sectionSubtitles = {
        'Notícias & Grandes Portais': 'Alcance massivo em portais de alta credibilidade nacional e regional.',
        'Esportes & Entretenimento': 'Conexão direta com audiências engajadas em esportes, cultura pop e variedades.',
        'Economia & Agronegócio': 'Impacto qualificado para decisores, investidores e lideranças do campo.',
        'Casa, Gastronomia & Estilo de Vida': 'Contexto editorial premium para consumo, gastronomia, moda e decoração.',
        'Família & Automóveis': 'Segmentação por momento de vida, maternidade e intenção de compra automotiva.',
        'Vídeo & CTV': 'Formatos audiovisuais de alto impacto com entrega não pulável nas plataformas Globo.'
      };

      const digitalSections = (raw.digitalSections || []).map(s => {
        if (typeof s === 'string') {
          return { id: s, title: s, subtitle: sectionSubtitles[s] || 'Inventário premium Digital | Globo com segmentação qualificada.' };
        }
        return s;
      });

      const digitalOverrides = {
        'display-portais-globo': {
          title: 'Display - Portais Globo',
          cpm: 9.60,
          defaultBudget: 902.40,
          desc: 'Banners posicionados estrategicamente nos Portais Globo para destacar a sua marca.',
          portalBadges: [
            { label: 'g1', bg: '#C4170C', fg: '#FFFFFF' },
            { label: 'ge', bg: '#06AA48', fg: '#FFFFFF' },
            { label: 'gshow', bg: '#FF6700', fg: '#FFFFFF' },
            { label: 'receitas', bg: '#9B51E0', fg: '#FFFFFF' },
            { label: 'globo.com', bg: '#005CEF', fg: '#FFFFFF' }
          ]
        },
        'video-15s-portais-globo': {
          title: 'Vídeo de 15 segundos - Portais Globo',
          cpm: 72.00,
          defaultBudget: 900.00,
          desc: 'Formato de vídeo de 15 segundos sem possibilidade de pular nos portais Globo.',
          portalBadges: [
            { label: 'g1', bg: '#C4170C', fg: '#FFFFFF' },
            { label: 'ge', bg: '#06AA48', fg: '#FFFFFF' },
            { label: 'gshow', bg: '#FF6700', fg: '#FFFFFF' },
            { label: 'receitas', bg: '#9B51E0', fg: '#FFFFFF' },
            { label: 'globo.com', bg: '#005CEF', fg: '#FFFFFF' }
          ]
        },
        'video-30s-portais-globo': {
          title: 'Vídeo de 16 à 180 segundos - Portais Globo',
          cpm: 57.60,
          defaultBudget: 900.00,
          desc: 'Formato de vídeo de 16 à 180 segundos com possibilidade de pular nos portais Globo.',
          portalBadges: [
            { label: 'g1', bg: '#C4170C', fg: '#FFFFFF' },
            { label: 'ge', bg: '#06AA48', fg: '#FFFFFF' },
            { label: 'gshow', bg: '#FF6700', fg: '#FFFFFF' },
            { label: 'receitas', bg: '#9B51E0', fg: '#FFFFFF' },
            { label: 'globo.com', bg: '#005CEF', fg: '#FFFFFF' }
          ]
        },
        'display-extra': {
          title: 'Display - Extra',
          cpm: 9.60,
          defaultBudget: 900.00,
          desc: 'Banners posicionados estrategicamente no site Extra para destacar a sua marca.',
          portalBadges: [
            { label: 'Extra', bg: '#0c0a09', fg: '#FFFFFF' }
          ]
        },
        'display-galileu': {
          title: 'Display - Galileu',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Galileu para destacar a sua marca.'
        },
        'display-globo-rural': {
          title: 'Display - Globo Rural',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Globo Rural para destacar a sua marca.'
        },
        'display-o-globo': {
          title: 'Display - O Globo',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site O Globo para destacar a sua marca.'
        },
        'display-epoca-negocios': {
          title: 'Display - Época Negócios',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Época Negócios para destacar a sua marca.'
        },
        'display-pegn': {
          title: 'Display - Pequenas Empresas & Grandes Negócios',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site PEGN para destacar a sua marca.'
        },
        'display-valor-investe': {
          title: 'Display - Valor Investe',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Valor Investe para destacar a sua marca.'
        },
        'display-valor-economico': {
          title: 'Display - Valor Econômico',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Valor Econômico para destacar a sua marca.'
        },
        'display-auto-esporte': {
          title: 'Display - Auto Esporte',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Auto Esporte para destacar a sua marca.'
        },
        'display-techtudo': {
          title: 'Display - TechTudo',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site TechTudo para destacar a sua marca.'
        },
        'display-marie-claire': {
          title: 'Display - Marie Claire',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Marie Claire para destacar a sua marca.'
        },
        'display-monet': {
          title: 'Display - Monet',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Monet para destacar a sua marca.'
        },
        'display-quem': {
          title: 'Display - Quem',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Quem para destacar a sua marca.'
        },
        'display-casa-e-jardim': {
          title: 'Display - Casa e Jardim',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Casa e Jardim para destacar a sua marca.'
        },
        'display-crescer': {
          title: 'Display - Crescer',
          cpm: 9.60,
          desc: 'Banners posicionados estrategicamente no site Crescer para destacar a sua marca.'
        },
        'video-15s-globoplay': {
          title: 'Vídeo de 15 segundos - Globoplay',
          cpm: 72.00,
          desc: 'Formato de vídeo de 15 segundos sem possibilidade de pular no Globoplay.'
        },
        'video-30s-globoplay': {
          title: 'Vídeo de 16 à 180 segundos - Globoplay',
          cpm: 57.60,
          desc: 'Formato de vídeo de 16 à 180 segundos com possibilidade de pular no Globoplay.'
        }
      };

      const digitalCatalog = (raw.digitalCatalog || []).map(x => {
        const ov = digitalOverrides[x.id] || {};
        const fmt = x.format || 'Display';
        const isVid = String(fmt).toLowerCase().includes('vídeo') || String(fmt).toLowerCase().includes('video');
        const rawBadges = ov.portalBadges || x.portalBadges || [];
        const portalBadges = rawBadges.map(b => ({
          label: b.label,
          bg: b.bg || b.color || '#005CEF',
          fg: b.fg || '#FFFFFF'
        }));
        const defBudget = Number(ov.defaultBudget ?? x.defaultBudget ?? x.defaultInvestment) || 900;
        return {
          ...x,
          id: x.id,
          sectionId: x.sectionId || x.section,
          category: x.category || x.section,
          title: ov.title || x.title || x.name,
          format: fmt,
          formatIcon: x.formatIcon || (isVid ? 'video' : 'display'),
          portalBadges,
          badges: x.badges || portalBadges.map(b => b.label),
          desc: ov.desc || x.desc || x.description || '',
          cpm: Number(ov.cpm ?? x.cpm) || 9.6,
          metricLabel: 'impressões',
          minBudget: Number(x.minBudget ?? x.minInvestment) || 900,
          defaultBudget: defBudget,
          budget: Number(ov.defaultBudget ?? x.budget ?? defBudget) || 900,
          specs: x.specs || (isVid ? 'Vídeo MP4 (16:9 Horizontal) • Até 50MB' : 'Formatos IAB padrão (300x250, 728x90)')
        };
      });

      function hydratePreset(p) {
        p = p || {};
        const digItems = (p.digitalItems || []).map(d => {
          const cat = digitalCatalog.find(c => c.id === d.id) || {};
          return {
            ...cat,
            ...d,
            title: cat.title || d.title,
            portalBadges: cat.portalBadges || d.portalBadges || [],
            budget: Number(cat.defaultBudget ?? d.budget ?? d.investment) || 900,
            selectedForBatch: Boolean(d.selectedForBatch ?? d.selected)
          };
        });
        const oohItems = (p.oohItems || []).map(o => {
          const cat = oohCatalog.find(c => c.id === o.id) || {};
          return {
            ...cat,
            ...o,
            selectedForBatch: Boolean(o.selectedForBatch ?? o.selected)
          };
        });
        return {
          campaignName: p.campaignName || 'Campanha Aqui Ads',
          durationDays: Number(p.durationDays) || (String(p.duration || '').includes('4') ? 28 : 14),
          startDate: p.startDate || '03/11/2026',
          endDate: p.endDate || '17/11/2026',
          targetLocation: p.targetLocation || (p.targetAudience && p.targetAudience.local) || 'São Paulo - SP',
          targetInterest: p.targetInterest || (p.targetAudience && p.targetAudience.interesse) || 'Todos os interesses',
          targetAge: p.targetAge || (p.targetAudience && p.targetAudience.idade) || 'Todas as idades',
          targetGender: p.targetGender || (p.targetAudience && p.targetAudience.genero) || 'Todos os gêneros',
          destinationUrl: p.destinationUrl || 'https://www.suaempresa.com.br/oferta',
          creativeOption: p.creativeOption || 'upload',
          creativeServiceFee: Number(p.creativeServiceFee) || 0,
          discountAmount: Number(p.discountAmount) || 0,
          billingType: p.billingType || 'pj',
          digitalItems: digItems,
          oohItems: oohItems
        };
      }

      const rawPresets = raw.cartPresets || {};
      const cartPresets = {};
      Object.keys(rawPresets).forEach(k => {
        cartPresets[k] = hydratePreset(rawPresets[k]);
      });
      if (cartPresets.hybrid && !cartPresets.midiaMista) cartPresets.midiaMista = cartPresets.hybrid;
      if (cartPresets.oohOnly && !cartPresets.ooh_only) cartPresets.ooh_only = cartPresets.oohOnly;
      if (cartPresets.digitalOnly && !cartPresets.digital_only) cartPresets.digital_only = cartPresets.digitalOnly;

      const mediaPlansCatalog = (raw.mediaPlansCatalog || []).map((c, idx) => {
        const mediaArr = Array.isArray(c.media) ? c.media : [];
        const ch = c.channel || (mediaArr.length > 1 ? 'Hibrida' : (mediaArr[0] || 'OOH'));
        const stKey = c.statusKey || c.status || 'veiculando';
        const subSt = c.subStatus || '';
        let badgeType = c.badgeType || 'active';
        let statusTop = c.statusTop || 'em veiculação';
        let statusSub = c.statusSub || `${c.progress || 80}% entregue`;
        let ctaType = c.ctaType || 'ver_metricas';

        if (stKey === 'pendentes') {
          if (subSt === 'pending_art' || subSt === 'art_rejected') {
            badgeType = 'pending_art';
            statusTop = 'anúncio pendente';
            statusSub = subSt === 'art_rejected' ? 'ajuste de arte necessário' : 'envie a arte da campanha';
            ctaType = 'enviar_arte';
          } else {
            badgeType = 'pending_approval';
            statusTop = 'anúncio pendente';
            statusSub = subSt === 'pending_payment' ? 'aguardando pagamento' : 'arte em moderação';
            ctaType = 'ver_detalhes';
          }
        } else if (stKey === 'concluidos' || stKey === 'cancelados') {
          badgeType = 'completed';
          statusTop = stKey === 'cancelados' ? 'campanha cancelada' : 'campanha concluída';
          statusSub = stKey === 'cancelados' ? 'pedido cancelado' : '100% entregue';
          ctaType = 'renovar';
        } else if (stKey === 'a_iniciar') {
          badgeType = 'active';
          statusTop = 'programada';
          statusSub = 'aguardando início';
          ctaType = 'ver_detalhes';
        }

        const rawPrice = c.price || c.value || 'R$ 1.350,86';
        const parsedNum = Number(c.priceNum) || Number(String(rawPrice).replace(/[^\d,]/g, '').replace(',', '.')) || 1350.86;
        const dates = String(c.date || '').split(' - ');

        return {
          ...c,
          id: String(c.id !== undefined ? (Number(c.id) < 1000 ? 750590 + Number(c.id) : c.id) : (750590 + idx)),
          title: c.title || c.name || 'Campanha Aqui Ads',
          channel: ch,
          formatPills: c.formatPills || (mediaArr.length ? mediaArr.map(m => m.toUpperCase()) : ['OOH']),
          city: c.city || 'São Paulo - SP',
          addresses: c.addresses || c.address || 'São Paulo - SP',
          startDate: c.startDate || dates[0] || '03/11/2026',
          endDate: c.endDate || dates[1] || '17/11/2026',
          duration: c.duration || '14 dias',
          price: rawPrice,
          priceNum: parsedNum,
          statusKey: stKey,
          statusTop,
          statusSub,
          badgeType,
          ctaType,
          image: c.image || (ch === 'Digital' ? 'theme_blue' : (idx % 2 === 0 ? 'theme_amber' : 'theme_purple')),
          deliveryPct: Number(c.deliveryPct ?? c.progress ?? 80),
          oohStats: c.oohStats || {
            days: '14',
            screens: String(c.oohScreens || '5'),
            spaces: String(c.oohPoints || '2'),
            impact: String(c.oohImpacts || '42.132'),
            reach: '3.780',
            freq: '11,1',
            deliv: String(c.oohImpacts || '42.132'),
            contr: '43.800',
            rate: `${c.progress || 96}%`
          }
        };
      });

      const draftsCatalog = (raw.draftsCatalog || []).map(d => {
        const chArr = Array.isArray(d.channels) ? d.channels : (Array.isArray(d.channelsList) ? d.channelsList : ['OOH']);
        const ch = d.channel || (chArr.length > 1 ? 'Multicanal' : (chArr[0] === 'Digital' ? 'Digital' : 'OOH'));
        const presetRef = cartPresets[d.presetKey] || cartPresets.hybrid || { digitalItems: [], oohItems: [] };
        return {
          ...d,
          id: String(d.id),
          title: d.title || d.name || 'Rascunho de Campanha',
          channel: ch,
          channelsList: d.channelsList || chArr.map(x => String(x).toUpperCase()),
          updatedAt: d.updatedAt || 'Editado recentemente',
          startDate: d.startDate || (d.expiredDate ? '10/10/2026' : '03/11/2026'),
          endDate: d.endDate || (d.expiredDate ? '24/10/2026' : '17/11/2026'),
          durationDays: Number(d.durationDays) || 14,
          expiredDate: Boolean(d.expiredDate),
          summaryText: d.summaryText || '',
          digitalItems: Array.isArray(d.digitalItems) ? d.digitalItems : JSON.parse(JSON.stringify(presetRef.digitalItems || [])),
          oohItems: Array.isArray(d.oohItems) ? d.oohItems : JSON.parse(JSON.stringify(presetRef.oohItems || []))
        };
      });

      const rawBilling = raw.billingProfiles || {};
      const billingProfiles = {
        pj: {
          type: 'PJ',
          badge: (rawBilling.pj && rawBilling.pj.badge) || 'PJ • CNPJ',
          name: (rawBilling.pj && rawBilling.pj.name) || 'Empresa Demonstração LTDA',
          documentLabel: (rawBilling.pj && (rawBilling.pj.documentLabel || `${rawBilling.pj.docLabel || 'CNPJ'}: ${rawBilling.pj.docValue || '00.000.000/0001-00'}`)) || 'CNPJ: 00.000.000/0001-00',
          addressLabel: (rawBilling.pj && (rawBilling.pj.addressLabel || rawBilling.pj.address)) || 'Rua Fidêncio Ramos, 100 - Vila Olímpia, São Paulo - SP'
        },
        pf: {
          type: 'PF',
          badge: (rawBilling.pf && rawBilling.pf.badge) || 'PF • CPF',
          name: (rawBilling.pf && rawBilling.pf.name) || 'Titular Agnóstico / Conta Demonstração',
          documentLabel: (rawBilling.pf && (rawBilling.pf.documentLabel || `${rawBilling.pf.docLabel || 'CPF'}: ${rawBilling.pf.docValue || '000.000.000-00'}`)) || 'CPF: 000.000.000-00',
          addressLabel: (rawBilling.pf && (rawBilling.pf.addressLabel || rawBilling.pf.address)) || 'Avenida Paulista, 1000 - Bela Vista, São Paulo - SP'
        }
      };

      return { oohCatalog, digitalSections, digitalCatalog, cartPresets, mediaPlansCatalog, draftsCatalog, billingProfiles };
    }

    const MOCK_SOURCE = normalizeMockSource(window.AQUI_ADS_MOCK_DATA);
    const campaignsData = JSON.parse(JSON.stringify(MOCK_SOURCE.mediaPlansCatalog || []));

    let currentStatusFilter = 'todos';
    let currentChannelFilter = 'todos';
    let isTableViewMode = false;
    let currentSelectedCampaign = campaignsData[2] || campaignsData[0];
    let previousScreenBeforeUpload = 'screen-list';

    function renderCardChannelPills(c) {
      if (c.channel === 'Hibrida') {
        return `
          <div class="flex flex-wrap items-center gap-1 mt-1.5">
            <span class="bg-orange-50 text-[#FF5A00] border border-orange-200 text-[9px] font-bold px-1.5 py-0.5 rounded">OOH</span>
            <span class="bg-blue-50 text-[#005CEF] border border-blue-200 text-[9px] font-bold px-1.5 py-0.5 rounded">Digital | Globo</span>
          </div>
        `;
      }
      if (c.channel === 'Digital') {
        return `
          <div class="flex flex-wrap items-center gap-1 mt-1.5">
            <span class="bg-blue-50 text-[#005CEF] border border-blue-200 text-[9px] font-bold px-1.5 py-0.5 rounded">Digital | Globo</span>
          </div>
        `;
      }
      return `
        <div class="flex flex-wrap items-center gap-1 mt-1.5">
          <span class="bg-gray-100 text-gray-700 text-[9px] font-bold px-1.5 py-0.5 rounded">OOH (${c.formatPills[0]})</span>
        </div>
      `;
    }

    function renderCardThumbnail(c) {
      if (!c.image) {
        return `
          <div onclick="openCampaignDetail('${c.id}')" class="w-full h-36 bg-[#D1D5DB] rounded-xs flex items-center justify-center cursor-pointer relative">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        `;
      }
      if (c.image === 'theme_purple') {
        return `
          <div onclick="openCampaignDetail('${c.id}')" class="w-full h-36 bg-[#3B2645] rounded-xs p-3 flex items-center justify-between text-white cursor-pointer relative overflow-hidden">
            <div class="z-10">
              <div class="bg-white text-[#FF5A00] font-black text-[9px] px-2 py-1 rounded mb-1.5 w-fit">OOH • Comercial</div>
              <p class="text-[9px] font-extrabold text-orange-400">CAMPANHA CORPORATIVA</p>
              <p class="text-[7px] text-gray-300">900x600 px • Elevadores</p>
            </div>
            <div class="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center text-center p-1 border-4 border-pink-500 z-10">
              <span class="text-[8px] font-black text-blue-900">DESTAQUE</span>
              <span class="text-[7px] font-bold text-indigo-700">ALTA FREQUÊNCIA</span>
            </div>
          </div>
        `;
      }
      if (c.image === 'theme_blue') {
        return `
          <div onclick="openCampaignDetail('${c.id}')" class="w-full h-36 bg-[#009FE3] rounded-xs p-3 flex items-center justify-between text-white cursor-pointer relative overflow-hidden">
            <div class="z-10">
              <span class="bg-white/20 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Digital | Globo</span>
              <p class="text-xs font-black mt-2 leading-tight">Campanha<br>Portais Globo</p>
              <p class="text-[9px] text-sky-100 mt-0.5">Display IAB</p>
            </div>
            <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80" alt="Criativo Digital" class="w-20 h-28 object-cover rounded-md border-2 border-white/40">
          </div>
        `;
      }
      if (c.image === 'theme_indigo') {
        return `
          <div onclick="openCampaignDetail('${c.id}')" class="w-full h-36 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800 rounded-xs p-3.5 flex flex-col justify-between text-white cursor-pointer relative overflow-hidden">
            <span class="bg-white/20 text-white text-[8px] font-bold px-2 py-0.5 rounded w-fit">OOH • Shopping</span>
            <div>
              <p class="text-xs font-black leading-tight">CAMPANHA SAZONAL</p>
              <p class="text-[9px] text-indigo-200">Circuito Shopping & Comerciais</p>
            </div>
          </div>
        `;
      }
      const mallLabel = c.title;
      return `
        <div onclick="openCampaignDetail('${c.id}')" class="w-full h-36 bg-amber-900 rounded-xs overflow-hidden relative cursor-pointer group">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80" alt="${c.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
          <div class="absolute inset-0 bg-gradient-to-r from-amber-950/85 via-amber-900/45 to-transparent p-3 flex flex-col justify-between text-white">
            <div>
              <p class="text-[7px] uppercase tracking-wider text-amber-200 font-bold">Campanha Ativa</p>
              <p class="text-[9px] font-extrabold leading-tight">UM NOVO VISUAL,<br>UM NOVO VOCÊ</p>
            </div>
            <div class="bg-black/35 border border-white/30 rounded px-1.5 py-0.5 w-fit">
              <p class="text-[7px] font-bold">ATÉ R$ <span class="text-xs font-black">400</span> DE DESCONTO</p>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[7px] font-bold uppercase tracking-wider text-amber-100 truncate max-w-[130px]">${mallLabel}</span>
              ${c.channel === 'Hibrida' ? '<span class="bg-[#005CEF] text-white text-[8px] font-bold px-1.5 py-0.2 rounded">OOH + Globo</span>' : ''}
            </div>
          </div>
        </div>
      `;
    }

    function renderStatusBadge(c) {
      if (c.badgeType === 'pending_art' || c.badgeType === 'pending_approval') {
        return `
          <div class="my-3 rounded-xl overflow-hidden text-center">
            <div class="bg-[#F6BE2C] text-gray-900 text-[11px] font-bold py-1 px-2 flex items-center justify-center gap-1.5">
              <span>⚠️</span> ${c.statusTop}
            </div>
            <div class="bg-[#FDF3D7] text-gray-800 text-[10px] font-medium py-1 px-2">
              ${c.statusSub}
            </div>
          </div>
        `;
      }
      if (c.badgeType === 'completed') {
        return `
          <div class="my-3 rounded-xl overflow-hidden text-center">
            <div class="bg-[#374151] text-white text-[11px] font-bold py-1 px-2 flex items-center justify-center gap-1.5">
              <span>✓</span> ${c.statusTop}
            </div>
            <div class="bg-[#E5E7EB] text-gray-800 text-[10px] font-medium py-1 px-2">
              ${c.statusSub}
            </div>
          </div>
        `;
      }
      return `
        <div class="my-3 rounded-xl overflow-hidden text-center">
          <div class="bg-[#107C10] text-white text-[11px] font-bold py-1 px-2 flex items-center justify-center gap-1.5">
            <span>▶</span> ${c.statusTop}
          </div>
          <div class="bg-[#8AC483] text-gray-900 text-[10px] font-medium py-1 px-2">
            ${c.statusSub}
          </div>
        </div>
      `;
    }

    function renderCardMainCTA(c) {
      // Seção 2.2 do Doc: Card Pendente -> Enviar Arte / Ver Detalhes
      if (c.ctaType === 'enviar_arte') {
        return `
          <button onclick="goToUploadArteScreen('${c.id}')" class="flex-1 py-2 px-3 rounded-md bg-[#FF5A00] hover:bg-[#E04E00] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer">
            <span>↑</span> enviar arte
          </button>
        `;
      }
      if (c.ctaType === 'ver_detalhes') {
        return `
          <button onclick="openCampaignDetail('${c.id}')" class="flex-1 py-2 px-3 rounded-md border border-gray-800 bg-white hover:bg-gray-50 text-gray-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer">
            <span class="text-gray-400">ⓘ</span> ver detalhes
          </button>
        `;
      }
      // Seção 2.2 do Doc: Em Veiculação com entrega < 90% -> CTA primário [ 📊 ver métricas ]
      if (c.statusKey === 'veiculando' && c.deliveryPct < 90) {
        return `
          <button onclick="openCampaignDetail('${c.id}', 'metricas')" class="flex-1 py-2 px-3 rounded-md border border-gray-700 bg-white hover:bg-gray-50 text-gray-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer">
            <span>📊</span> ver métricas
          </button>
        `;
      }
      // Em Reta Final (>= 90%) ou Concluída -> CTA [ ↻ renovar ]
      return `
        <button onclick="openRenewModal('${c.id}')" class="flex-1 py-2 px-3 rounded-md border border-gray-700 bg-white hover:bg-gray-50 text-gray-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer">
          <span class="text-gray-400">↻</span> renovar
        </button>
      `;
    }

    function applyCampaignFilters() {
      const query = (document.getElementById('filter-search').value || '').toLowerCase().trim();
      const startFilter = (document.getElementById('filter-date-start').value || '').toLowerCase().trim();
      const endFilter = (document.getElementById('filter-date-end').value || '').toLowerCase().trim();
      const sortValue = document.getElementById('sort-select').value;

      let filtered = campaignsData.filter(c => {
        const matchesQuery = !query ||
          c.title.toLowerCase().includes(query) ||
          c.id.toLowerCase().includes(query) ||
          c.city.toLowerCase().includes(query) ||
          (c.addresses && c.addresses.toLowerCase().includes(query)) ||
          c.channel.toLowerCase().includes(query);

        const matchesStart = !startFilter || c.startDate.includes(startFilter);
        const matchesEnd = !endFilter || c.endDate.includes(endFilter);
        // Seção 2.1 do Doc: Quando o usuário digita uma busca textual explícita (ID, nome ou endereço), ignora travas de status
        const matchesStatus = query ? true : (currentStatusFilter === 'todos' || c.statusKey === currentStatusFilter);
        const matchesChannel = currentChannelFilter === 'todos' ||
          (currentChannelFilter === 'OOH' && (c.channel === 'OOH' || c.channel === 'Hibrida')) ||
          (currentChannelFilter === 'Digital' && (c.channel === 'Digital' || c.channel === 'Hibrida')) ||
          (currentChannelFilter === 'Hibrida' && c.channel === 'Hibrida');

        return matchesQuery && matchesStart && matchesEnd && matchesStatus && matchesChannel;
      });

      if (sortValue === 'pending_first') {
        filtered.sort((a, b) => (a.statusKey === 'pendentes' ? -1 : 1));
      } else if (sortValue === 'value_desc') {
        filtered.sort((a, b) => b.priceNum - a.priceNum);
      } else if (sortValue === 'name_asc') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      }

      const gridEl = document.getElementById('campaigns-grid-container');
      const tableEl = document.getElementById('campaigns-table-container');
      const tbodyEl = document.getElementById('campaigns-table-body');
      const emptyBox = document.getElementById('empty-state-box');
      const counterText = document.getElementById('results-counter-text');

      if (filtered.length === 0) {
        gridEl.classList.add('hidden');
        tableEl.classList.add('hidden');
        emptyBox.classList.remove('hidden');
        counterText.textContent = `0 campanhas encontradas para o filtro atual.`;
        return;
      }

      emptyBox.classList.add('hidden');
      counterText.textContent = filtered.length === campaignsData.length
        ? 'Aqui estão suas campanhas já contratadas, com status ativo, pendente, concluído ou cancelado.'
        : `Exibindo ${filtered.length} de ${campaignsData.length} campanhas filtradas.`;

      if (isTableViewMode) {
        gridEl.classList.add('hidden');
        tableEl.classList.remove('hidden');
      } else {
        gridEl.classList.remove('hidden');
        tableEl.classList.add('hidden');
      }

      gridEl.innerHTML = filtered.map(c => `
        <article class="border border-gray-300 rounded-xl p-3.5 bg-white flex flex-col justify-between hover:shadow-md transition relative">
          <div>
            ${renderCardThumbnail(c)}
            ${renderStatusBadge(c)}

            <div class="mt-1">
              <h3 onclick="openCampaignDetail('${c.id}')" class="font-bold text-xs text-gray-900 leading-snug cursor-pointer hover:text-[#FF5A00] truncate" title="${c.title}">
                ${c.title}
              </h3>
            </div>

            <div class="flex items-center justify-between mt-1">
              <p class="text-[11px] text-gray-500">#${c.id}</p>
            </div>
            ${renderCardChannelPills(c)}

            <div class="grid grid-cols-2 gap-2 my-3 text-[11px]">
              <div>
                <span class="text-gray-400 block text-[10px]">início ⓘ</span>
                <span class="text-gray-800 font-medium">${c.startDate}</span>
              </div>
              <div>
                <span class="text-gray-400 block text-[10px]">fim ⓘ</span>
                <span class="text-gray-800 font-medium">${c.endDate}</span>
              </div>
            </div>

            <div class="mb-3.5">
              <span class="text-gray-400 block text-[10px] mb-0.5">valor</span>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-xs text-gray-900">${c.price}</span>
                <span class="bg-[#C3E2C2] text-[#1B4332] text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  ✓ pago
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1.5 pt-1 relative">
            ${renderCardMainCTA(c)}
            <button onclick="toggleCardMenu(event, '${c.id}')" class="p-2 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 cursor-pointer" title="Mais opções">
              ⋮
            </button>

            <div id="card-menu-${c.id}" class="card-popover hidden absolute right-0 bottom-11 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-30 text-xs">
              <button onclick="openRenameModal('${c.id}')" class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-800 font-medium cursor-pointer">
                renomear campanha
              </button>
              <button onclick="openCampaignDetail('${c.id}')" class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-800 font-medium cursor-pointer">
                detalhes do anúncio
              </button>
              ${c.ctaType === 'enviar_arte' ? `
              <button onclick="goToUploadArteScreen('${c.id}')" class="w-full text-left px-4 py-2 hover:bg-orange-50 text-[#FF5A00] font-semibold cursor-pointer">
                enviar arte
              </button>
              ` : `
              <button onclick="openRenewModal('${c.id}'); closeAllCardMenus();" class="w-full text-left px-4 py-2 hover:bg-orange-50 text-[#FF5A00] font-semibold cursor-pointer">
                renovar campanha
              </button>
              `}
              <button onclick="showToast('Seletor de nova data de início aberto para #${c.id}'); closeAllCardMenus();" class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-800 font-medium cursor-pointer">
                alterar data de início
              </button>
            </div>
          </div>
        </article>
      `).join('');

      tbodyEl.innerHTML = filtered.map(c => `
        <tr class="hover:bg-gray-50 transition">
          <td class="py-3 px-4 font-bold text-gray-900">
            <a href="javascript:void(0)" onclick="openCampaignDetail('${c.id}')" class="hover:text-[#FF5A00]">${c.title}</a>
          </td>
          <td class="py-3 px-3 text-gray-500">#${c.id}</td>
          <td class="py-3 px-3">
            <span class="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">${c.channel === 'Hibrida' ? 'OOH + Globo' : c.channel}</span>
          </td>
          <td class="py-3 px-3">
            <span class="text-[11px] font-bold ${c.statusKey === 'pendentes' ? 'text-amber-700' : c.statusKey === 'concluidos' ? 'text-gray-600' : 'text-emerald-700'}">
              ${c.statusTop} (${c.statusSub})
            </span>
          </td>
          <td class="py-3 px-3 text-gray-600">${c.startDate} a ${c.endDate}</td>
          <td class="py-3 px-3 font-bold text-gray-900">${c.price}</td>
          <td class="py-3 px-4 text-right">
            ${c.ctaType === 'enviar_arte'
              ? `<button onclick="goToUploadArteScreen('${c.id}')" class="px-3 py-1 rounded bg-[#FF5A00] text-white text-[11px] font-bold cursor-pointer">↑ enviar arte</button>`
              : `<button onclick="openCampaignDetail('${c.id}')" class="px-3 py-1 rounded border border-gray-300 text-gray-800 text-[11px] font-semibold hover:bg-gray-100 cursor-pointer">ver métricas</button>`
            }
          </td>
        </tr>
      `).join('');
    }

    let renamingCampaignId = null;
    function openRenameModal(id) {
      closeAllCardMenus();
      const targetId = id || (currentSelectedCampaign ? currentSelectedCampaign.id : '750598');
      renamingCampaignId = targetId;
      const item = campaignsData.find(x => x.id === targetId);
      if (!item) return;
      const inputEl = document.getElementById('rename-modal-input');
      inputEl.value = item.title;
      document.getElementById('modal-rename-campaign').classList.remove('hidden');
      setTimeout(() => inputEl.focus(), 50);
    }

    function closeRenameModal() {
      document.getElementById('modal-rename-campaign').classList.add('hidden');
    }

    function saveRenamedCampaign() {
      const inputEl = document.getElementById('rename-modal-input');
      const newName = (inputEl.value || '').trim();
      if (!newName) return;
      const item = campaignsData.find(x => x.id === renamingCampaignId);
      if (item) {
        item.title = newName;
        if (currentSelectedCampaign && currentSelectedCampaign.id === item.id) {
          document.getElementById('detail-title').textContent = item.title;
        }
        applyCampaignFilters();
        showToast(`Campanha #${item.id} renomeada para "${item.title}"`);
      }
      closeRenameModal();
    }

    function promptRenameDetail() {
      if (!currentSelectedCampaign) return;
      openRenameModal(currentSelectedCampaign.id);
    }

    function toggleCardMenu(event, id) {
      event.stopPropagation();
      const menu = document.getElementById(`card-menu-${id}`);
      const isHidden = menu.classList.contains('hidden');
      closeAllCardMenus();
      if (isHidden) {
        menu.classList.remove('hidden');
      }
    }

    function closeAllCardMenus() {
      document.querySelectorAll('.card-popover').forEach(el => el.classList.add('hidden'));
    }

    document.addEventListener('click', () => {
      closeAllCardMenus();
    });

    function openSideMenu(event) {
      if (event) event.stopPropagation();
      closeAllCardMenus();
      const drawer = document.getElementById('side-menu-drawer');
      if (drawer) drawer.classList.remove('hidden');
    }

    function closeSideMenu() {
      const drawer = document.getElementById('side-menu-drawer');
      if (drawer) drawer.classList.add('hidden');
    }

    function toggleAccountMenu(event) {
      openSideMenu(event);
    }

    function toggleHistoricalDrawer() {
      const drawer = document.getElementById('historical-campaigns-drawer');
      const arrow = document.getElementById('history-drawer-arrow');
      if (!drawer) return;
      const isHidden = drawer.classList.contains('hidden');
      if (isHidden) {
        drawer.classList.remove('hidden');
        if (arrow) arrow.textContent = '▴';
      } else {
        drawer.classList.add('hidden');
        if (arrow) arrow.textContent = '▾';
      }
    }

    let isStepperExpanded = false;
    function toggleStepperExpand() {
      const fullBox = document.getElementById('stepper-full-container');
      const btn = document.getElementById('stepper-toggle-btn');
      if (!fullBox) return;
      isStepperExpanded = !isStepperExpanded;
      if (isStepperExpanded) {
        fullBox.classList.remove('hidden');
        if (btn) btn.textContent = 'Ocultar etapas ▴';
      } else {
        fullBox.classList.add('hidden');
        if (btn) btn.textContent = 'Ver detalhes ▾';
      }
    }

    function handleStepperArteClick() {
      if (currentSelectedCampaign && (currentSelectedCampaign.badgeType === 'pending_art')) {
        goToUploadArteScreen(currentSelectedCampaign.id);
      } else {
        switchDetailTab('arte');
      }
    }

    function setStatusFilter(status) {
      currentStatusFilter = status;
      document.querySelectorAll('.status-pill').forEach(btn => {
        if (btn.dataset.status === status) {
          btn.className = 'status-pill px-3 py-1 rounded-full text-[11px] font-semibold bg-[#1E2229] text-white border border-[#1E2229] transition cursor-pointer';
        } else {
          btn.className = 'status-pill px-3 py-1 rounded-full text-[11px] font-medium bg-white text-gray-800 border border-gray-400 hover:border-gray-600 transition cursor-pointer';
        }
      });
      applyCampaignFilters();
    }

    function setChannelFilter(channel) {
      currentChannelFilter = channel;
      document.querySelectorAll('.channel-pill').forEach(btn => {
        if (btn.dataset.channel === channel) {
          btn.className = 'channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#1E2229] text-white border border-[#1E2229] transition cursor-pointer';
        } else {
          btn.className = 'channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-gray-700 border border-gray-300 hover:border-gray-500 transition cursor-pointer';
        }
      });
      applyCampaignFilters();
    }

    function resetAllFilters() {
      document.getElementById('filter-search').value = '';
      document.getElementById('filter-date-start').value = '';
      document.getElementById('filter-date-end').value = '';
      document.getElementById('sort-select').value = 'default';
      setStatusFilter('todos');
      setChannelFilter('todos');
      showToast('Todos os filtros foram limpos');
    }

    function toggleListViewMode() {
      isTableViewMode = !isTableViewMode;
      document.getElementById('toggle-view-label').textContent = isTableViewMode ? 'ver em cards' : 'ver em lista';
      applyCampaignFilters();
    }

    function switchTopTab(tab) {
      const btnPlanos = document.getElementById('top-tab-planos');
      const btnRasc = document.getElementById('top-tab-rascunhos');
      const contentPlanos = document.getElementById('tab-content-planos');
      const contentRasc = document.getElementById('tab-content-rascunhos');

      if (tab === 'planos') {
        btnPlanos.className = 'pb-2.5 text-xs font-bold text-[#FF5A00] border-b-2 border-[#FF5A00] transition cursor-pointer';
        btnRasc.className = 'pb-2.5 text-xs font-medium text-gray-500 hover:text-gray-800 border-b-2 border-transparent transition cursor-pointer';
        contentPlanos.classList.remove('hidden');
        contentRasc.classList.add('hidden');
      } else {
        btnRasc.className = 'pb-2.5 text-xs font-bold text-[#FF5A00] border-b-2 border-[#FF5A00] transition cursor-pointer';
        btnPlanos.className = 'pb-2.5 text-xs font-medium text-gray-500 hover:text-gray-800 border-b-2 border-transparent transition cursor-pointer';
        contentRasc.classList.remove('hidden');
        contentPlanos.classList.add('hidden');
      }
    }

    function openCampaignDetail(id, initialTab = 'metricas') {
      const c = campaignsData.find(x => x.id === id) || campaignsData[2];
      currentSelectedCampaign = c;

      document.getElementById('detail-title').textContent = c.title;
      document.getElementById('detail-id').textContent = `#${c.id}`;
      document.getElementById('detail-start').textContent = c.startDate;
      document.getElementById('detail-end').textContent = c.endDate;
      document.getElementById('detail-duration').textContent = c.duration;
      document.getElementById('fat-total').textContent = c.price;

      const thumbEl = document.getElementById('detail-thumb');
      if (c.image === 'theme_blue') {
        thumbEl.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80';
      } else {
        thumbEl.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80';
      }

      document.getElementById('detail-format-pills').innerHTML = c.formatPills.map(p =>
        `<span class="bg-[#D1D5DB] text-gray-900 text-[10px] font-bold px-2.5 py-0.5 rounded">${p}</span>`
      ).join('');

      const badgeBox = document.getElementById('detail-status-badge');
      const compactBar = document.getElementById('stepper-compact-bar');
      const fullStepper = document.getElementById('stepper-full-container');
      const topRenewBanner = document.getElementById('metrics-top-renewal-banner');

      if (c.badgeType === 'pending_art' || c.badgeType === 'pending_approval') {
        badgeBox.innerHTML = `
          <div class="bg-[#F6BE2C] text-gray-900 text-[11px] font-bold py-1 px-3 flex items-center justify-center gap-1.5">
            <span>⚠️</span> ${c.statusTop}
          </div>
          <div class="bg-[#FDF3D7] text-gray-800 text-[10px] font-medium py-1 px-3">
            ${c.statusSub}
          </div>
        `;
        document.getElementById('step-icon-arte').textContent = '•••';
        document.getElementById('step-icon-arte').className = 'text-amber-600 text-xs font-bold';
        document.getElementById('step-text-arte').textContent = 'pendente';
        document.getElementById('step-link-arte').textContent = 'Enviar arte →';
        document.getElementById('arte-tab-alert-dot').classList.remove('hidden');
        // Em campanhas pendentes, o Stepper fica sempre aberto em destaque e sem banner de renovação
        if (compactBar) compactBar.classList.add('hidden');
        if (fullStepper) fullStepper.classList.remove('hidden');
        if (topRenewBanner) topRenewBanner.classList.add('hidden');
        setArteState('pendente');
      } else if (c.badgeType === 'completed') {
        badgeBox.innerHTML = `
          <div class="bg-[#374151] text-white text-[11px] font-bold py-1 px-3 flex items-center justify-center gap-1.5">
            <span>✓</span> ${c.statusTop}
          </div>
          <div class="bg-[#E5E7EB] text-gray-800 text-[10px] font-medium py-1 px-3">
            ${c.statusSub}
          </div>
        `;
        document.getElementById('step-icon-arte').textContent = '✓';
        document.getElementById('step-icon-arte').className = 'text-emerald-600 text-xs font-bold';
        document.getElementById('step-text-arte').textContent = '01/12/2025';
        document.getElementById('step-link-arte').textContent = 'Ver arte →';
        document.getElementById('arte-tab-alert-dot').classList.add('hidden');
        // Stepper colapsado em 1 linha por padrão quando já está concluída
        if (compactBar) compactBar.classList.remove('hidden');
        if (fullStepper) fullStepper.classList.add('hidden');
        isStepperExpanded = false;
        if (topRenewBanner) topRenewBanner.classList.remove('hidden');
        setArteState('aprovada');
      } else {
        badgeBox.innerHTML = `
          <div class="bg-[#107C10] text-white text-[11px] font-bold py-1 px-3 flex items-center justify-center gap-1.5">
            <span>▶</span> ${c.statusTop}
          </div>
          <div class="bg-[#8AC483] text-gray-900 text-[10px] font-medium py-1 px-3">
            ${c.statusSub}
          </div>
        `;
        document.getElementById('step-icon-arte').textContent = '✓';
        document.getElementById('step-icon-arte').className = 'text-emerald-600 text-xs font-bold';
        document.getElementById('step-text-arte').textContent = '14/10/2026';
        document.getElementById('step-link-arte').textContent = 'Ver arte →';
        document.getElementById('arte-tab-alert-dot').classList.add('hidden');
        // Stepper colapsado em 1 linha por padrão quando já está veiculando (Seção 3.1 do Doc)
        if (compactBar) compactBar.classList.remove('hidden');
        if (fullStepper) fullStepper.classList.add('hidden');
        isStepperExpanded = false;
        if (topRenewBanner) {
          if (c.deliveryPct >= 90) topRenewBanner.classList.remove('hidden');
          else topRenewBanner.classList.add('hidden');
        }
        setArteState('aprovada');
      }

      document.getElementById('ooh-kpi-days').textContent = c.oohStats.days;
      document.getElementById('ooh-kpi-screens').textContent = c.oohStats.screens;
      document.getElementById('ooh-kpi-spaces').textContent = c.oohStats.spaces;
      document.getElementById('ooh-kpi-impact').textContent = c.oohStats.impact;
      document.getElementById('ooh-kpi-reach').textContent = c.oohStats.reach;
      document.getElementById('ooh-kpi-freq').textContent = c.oohStats.freq;
      document.getElementById('ooh-deliv-val').textContent = c.oohStats.deliv;
      document.getElementById('ooh-contr-val').textContent = c.oohStats.contr;
      document.getElementById('ooh-rate-val').textContent = c.oohStats.rate;

      if (c.channel === 'Digital') {
        filterMetricsSection('digital');
      } else {
        filterMetricsSection('all');
      }

      showScreen('screen-detail');
      switchDetailTab(initialTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function switchHomeNoticeScenario(scenario) {
      const barPending = document.getElementById('home-notice-pending');
      const barActive = document.getElementById('home-notice-active');
      if (!barPending || !barActive) return;

      if (scenario === 'pending') {
        barPending.classList.remove('hidden');
        barActive.classList.add('hidden');
      } else {
        barPending.classList.add('hidden');
        barActive.classList.remove('hidden');
      }
    }

    let plpCartItems = [];

    function filterPlpAmbience(type, clickedBtn) {
      document.querySelectorAll('.plp-ambience-btn').forEach(btn => {
        btn.className = 'plp-ambience-btn px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-[#282E38] border border-[#DFE7EF] hover:border-[#241e17] cursor-pointer transition';
      });
      if (clickedBtn) {
        clickedBtn.className = 'plp-ambience-btn px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#241e17] text-white border border-[#241e17] cursor-pointer transition';
      }
      document.querySelectorAll('.plp-card-item').forEach(card => {
        if (type === 'todos' || card.dataset.ambience === type) {
          card.classList.remove('hidden');
          card.classList.add('flex');
        } else {
          card.classList.add('hidden');
          card.classList.remove('flex');
        }
      });
    }

    function togglePlpCartItem(btn, name, price) {
      const idx = plpCartItems.findIndex(item => item.name === name);
      if (idx === -1) {
        plpCartItems.push({ name, price });
        btn.className = 'flex-1 py-2 px-3 rounded-md border border-[#3A9F3A] bg-[#3A9F3A] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer';
        btn.innerHTML = '<span>✓ ponto adicionado</span>';
        showToast(`${name} adicionado ao carrinho!`);
      } else {
        plpCartItems.splice(idx, 1);
        btn.className = 'flex-1 py-2 px-3 rounded-md border border-[#3A9F3A] bg-white text-[#3A9F3A] hover:bg-green-50 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer';
        btn.innerHTML = '<span>adicionar ponto</span><span>🛒</span>';
        showToast(`${name} removido do carrinho.`);
      }
      const summaryEl = document.getElementById('plp-cart-summary');
      const nextBtn = document.getElementById('resultpage_next-button');
      if (summaryEl && nextBtn) {
        if (plpCartItems.length === 0) {
          summaryEl.textContent = 'Nenhum novo ponto selecionado na vitrine';
          nextBtn.className = 'px-5 py-2 rounded-lg bg-gray-200 text-gray-500 font-bold text-xs flex items-center gap-2 cursor-pointer transition';
        } else {
          const total = plpCartItems.reduce((acc, i) => acc + i.price, 0);
          summaryEl.innerHTML = `<strong class="text-[#282E38]">${plpCartItems.length} ponto(s) adicionado(s)</strong> • Total: <strong class="text-[#3A9F3A]">R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>`;
          nextBtn.className = 'px-5 py-2 rounded-lg bg-[#FF4F00] hover:bg-[#E04600] text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-xs';
        }
      }
    }

    function switchDetailTab(tabName) {
      const tabs = ['metricas', 'arte', 'faturamento', 'locais'];
      tabs.forEach(t => {
        const btn = document.getElementById(`dtab-btn-${t}`);
        const panel = document.getElementById(`dtab-panel-${t}`);
        if (t === tabName) {
          btn.className = 'detail-tab-btn pb-2.5 text-xs font-bold text-[#FF5A00] border-b-2 border-[#FF5A00] flex items-center gap-1.5 whitespace-nowrap cursor-pointer';
          panel.classList.remove('hidden');
        } else {
          btn.className = 'detail-tab-btn pb-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent flex items-center gap-1.5 whitespace-nowrap cursor-pointer';
          panel.classList.add('hidden');
        }
      });
    }

    function filterMetricsSection(mode) {
      const oohBox = document.getElementById('metrics-ooh-container');
      const digBox = document.getElementById('metrics-digital-container');
      const btnAll = document.getElementById('mjump-all');
      const btnOoh = document.getElementById('mjump-ooh');
      const btnDig = document.getElementById('mjump-digital');

      const activeClass = 'px-3 py-1 rounded-full text-[11px] font-bold bg-white text-gray-900 shadow-2xs transition cursor-pointer';
      const idleClass = 'px-3 py-1 rounded-full text-[11px] font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer';

      btnAll.className = mode === 'all' ? activeClass : idleClass;
      btnOoh.className = mode === 'ooh' ? activeClass : idleClass;
      btnDig.className = mode === 'digital' ? activeClass : idleClass;

      if (mode === 'ooh') {
        oohBox.classList.remove('hidden');
        digBox.classList.add('hidden');
      } else if (mode === 'digital') {
        oohBox.classList.add('hidden');
        digBox.classList.remove('hidden');
      } else {
        oohBox.classList.remove('hidden');
        digBox.classList.remove('hidden');
      }
    }

    function filterLocationsTable() {
      const q = (document.getElementById('local-search-input').value || '').toLowerCase().trim();
      const env = document.getElementById('local-env-select').value;
      document.querySelectorAll('.local-row').forEach(row => {
        const matchName = !q || row.dataset.name.includes(q);
        const matchEnv = env === 'todos' || row.dataset.env === env;
        row.style.display = (matchName && matchEnv) ? '' : 'none';
      });
    }

    function setArteState(state) {
      const viewAp = document.getElementById('arte-view-aprovada');
      const viewPe = document.getElementById('arte-view-pendente');
      const btnAp = document.getElementById('arte-state-aprovada');
      const btnPe = document.getElementById('arte-state-pendente');

      if (state === 'aprovada') {
        viewAp.classList.remove('hidden');
        viewPe.classList.add('hidden');
        btnAp.className = 'px-2.5 py-1 rounded-md font-bold bg-white text-gray-900 shadow-2xs cursor-pointer';
        btnPe.className = 'px-2.5 py-1 rounded-md font-semibold text-gray-600 hover:text-gray-900 cursor-pointer';
      } else {
        viewPe.classList.remove('hidden');
        viewAp.classList.add('hidden');
        btnPe.className = 'px-2.5 py-1 rounded-md font-bold bg-white text-gray-900 shadow-2xs cursor-pointer';
        btnAp.className = 'px-2.5 py-1 rounded-md font-semibold text-gray-600 hover:text-gray-900 cursor-pointer';
      }
    }

    function initDigitalChart() {
      const digitalDaily = [
        { d: '29/09', h: 18, v: '320' },
        { d: '30/09', h: 92, v: '1.710' },
        { d: '01/10', h: 86, v: '1.605' },
        { d: '02/10', h: 80, v: '1.490' },
        { d: '03/10', h: 44, v: '810' },
        { d: '04/10', h: 72, v: '1.330' },
        { d: '05/10', h: 138, v: '2.590' },
        { d: '06/10', h: 84, v: '1.550' },
        { d: '07/10', h: 72, v: '1.320' },
        { d: '08/10', h: 80, v: '1.495' },
        { d: '09/10', h: 88, v: '1.640' },
        { d: '10/10', h: 74, v: '1.370' },
        { d: '11/10', h: 62, v: '1.140' },
        { d: '12/10', h: 80, v: '1.485' },
        { d: '13/10', h: 72, v: '1.335' },
        { d: '14/10', h: 66, v: '1.210' },
        { d: '15/10', h: 68, v: '1.250' },
        { d: '16/10', h: 59, v: '1.090' },
        { d: '17/10', h: 58, v: '1.080' },
        { d: '18/10', h: 57, v: '1.060' },
        { d: '19/10', h: 55, v: '1.020' },
        { d: '20/10', h: 50, v: '920' },
        { d: '21/10', h: 48, v: '890' },
        { d: '22/10', h: 9, v: '148' }
      ];
      const container = document.getElementById('digital-bars-chart');
      container.innerHTML = digitalDaily.map(item => `
        <div class="flex flex-col items-center group flex-1">
          <div class="w-full max-w-[16px] bg-[#005CEF] rounded-t-xs transition-all group-hover:bg-blue-700" style="height: ${item.h}px;" title="${item.d}: ${item.v} impressões"></div>
          <span class="text-[8px] text-gray-500 mt-1.5">${item.d}</span>
        </div>
      `).join('');
    }

    function toggleFaq(index) {
      const items = document.querySelectorAll('#faq-accordion .faq-item');
      items.forEach((item, idx) => {
        const answer = item.querySelector('.faq-answer');
        const title = item.querySelector('h5');
        if (idx === index) {
          item.className = 'faq-item border-l-2 border-[#FF5A00] -ml-[2px] pl-5 py-2 cursor-pointer';
          title.className = 'text-xs font-bold text-gray-900';
          answer.classList.remove('hidden');
        } else {
          item.className = 'faq-item border-l-2 border-transparent -ml-[2px] pl-5 py-2 cursor-pointer';
          title.className = 'text-xs font-medium text-gray-600 hover:text-gray-900';
          answer.classList.add('hidden');
        }
      });
    }

    function toggleExportMenu() {
      document.getElementById('export-dropdown-menu').classList.toggle('hidden');
    }
    function toggleDetailEditMenu() {
      document.getElementById('detail-edit-dropdown').classList.toggle('hidden');
    }
    function exportReport(formatName) {
      document.getElementById('export-dropdown-menu').classList.add('hidden');
      showToast(`Relatório "${formatName}" gerado com sucesso!`);
    }

    let uploadingCampaignId = '750708';
    function goToUploadArteScreen(id) {
      closeAllCardMenus();
      const activeScreen = document.querySelector('.view-section.active');
      if (activeScreen && activeScreen.id !== 'view-upload-arte') {
        previousScreenBeforeUpload = activeScreen.id;
      }
      if (id) uploadingCampaignId = id;
      const c = campaignsData.find(x => x.id === uploadingCampaignId) || campaignsData[0];
      currentSelectedCampaign = c;

      document.getElementById('upload-screen-campaign-id').textContent = `#${c.id}`;
      document.getElementById('upload-screen-campaign-title').textContent = c.title;
      document.getElementById('upload-screen-campaign-period').textContent = `${c.startDate} a ${c.endDate} (${c.duration})`;
      document.getElementById('upload-frame-mall-label').textContent = c.title.toUpperCase();

      document.getElementById('upload-frame-empty').classList.remove('hidden');
      document.getElementById('upload-frame-filled').classList.add('hidden');
      document.getElementById('upload-preview-status').textContent = 'Aguardando arquivo';
      document.getElementById('upload-preview-status').className = 'bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-0.5 rounded';
      document.getElementById('upload-file-pill').textContent = 'Selecionar arquivo do computador...';
      document.getElementById('upload-file-pill').className = 'mt-4 px-3.5 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-bold text-gray-800 shadow-2xs';

      showScreen('view-upload-arte');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openUploadArteModal(id) {
      goToUploadArteScreen(id);
    }

    function backFromUploadArte() {
      showScreen(previousScreenBeforeUpload || 'screen-list');
    }

    function previewSelectedCreative() {
      document.getElementById('upload-frame-empty').classList.add('hidden');
      document.getElementById('upload-frame-filled').classList.remove('hidden');
      document.getElementById('upload-preview-status').textContent = '✓ Criativo 900x600 px carregado';
      document.getElementById('upload-preview-status').className = 'bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded';
      document.getElementById('upload-file-pill').textContent = '✓ criativo_campanha_900x600.jpg (1.8 MB)';
      document.getElementById('upload-file-pill').className = 'mt-4 px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-400 text-xs font-bold text-emerald-800';
      document.getElementById('chk-dim').className = 'text-emerald-600 font-bold';
      document.getElementById('chk-fmt').className = 'text-emerald-600 font-bold';
      document.getElementById('chk-mod').className = 'text-emerald-600 font-bold';
      showToast('Imagem 900x600 px carregada na pré-visualização Eletromidia!');
    }

    function confirmUploadArteFromScreen() {
      const c = campaignsData.find(x => x.id === uploadingCampaignId) || campaignsData[0];
      if (c) {
        c.statusTop = 'anúncio pendente';
        c.statusSub = 'aguardando aprovação da arte';
        c.badgeType = 'pending_approval';
        c.ctaType = 'ver_detalhes';
        if (!c.image) c.image = 'theme_amber';
      }
      applyCampaignFilters();
      openCampaignDetail(c.id, 'arte');
      setArteState('aprovada');
      showToast(`Arte enviada com sucesso para #${c.id}! Em análise pela moderação.`);
    }

    let currentRenewBasePrice = 928.27;
    function openRenewModal(id) {
      const c = id ? campaignsData.find(x => x.id === id) : currentSelectedCampaign;
      if (c) {
        currentRenewBasePrice = c.priceNum || 928.27;
        document.getElementById('renew-campaign-title').textContent = `${c.title} (#${c.id})`;
        selectRenewDuration(14);
      }
      document.getElementById('modal-renew').classList.remove('hidden');
    }

    function selectRenewDuration(days) {
      const b7 = document.getElementById('renew-dur-7');
      const b14 = document.getElementById('renew-dur-14');
      const b28 = document.getElementById('renew-dur-28');
      const activeCls = 'py-2 px-3 rounded-lg border-2 border-[#FF5A00] bg-orange-50/60 text-xs font-extrabold text-[#FF5A00] cursor-pointer';
      const idleCls = 'py-2 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:border-gray-400 cursor-pointer';

      if (b7) b7.className = days === 7 ? activeCls : idleCls;
      if (b14) b14.className = days === 14 ? activeCls : idleCls;
      if (b28) b28.className = days === 28 ? activeCls : idleCls;

      let factor = 1;
      let periodText = '29/10/2026 a 11/11/2026 (14 dias)';
      if (days === 7) {
        factor = 0.55;
        periodText = '29/10/2026 a 04/11/2026 (7 dias)';
      } else if (days === 28) {
        factor = 1.85;
        periodText = '29/10/2026 a 25/11/2026 (28 dias)';
      }
      const total = (currentRenewBasePrice * factor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const periodEl = document.getElementById('renew-period-label');
      const priceEl = document.getElementById('renew-campaign-price');
      if (periodEl) periodEl.textContent = periodText;
      if (priceEl) priceEl.textContent = total;
    }

    function closeRenewModal() {
      document.getElementById('modal-renew').classList.add('hidden');
    }
    function confirmRenewal() {
      closeRenewModal();
      showToast('Campanha renovada e pronta para pagamento (em até 3x sem juros)!');
    }

    function setViewportMode(mode) {
      const stage = document.getElementById('app-Stage');
      const container = document.getElementById('viewport-container');
      const btnDesk = document.getElementById('vp-desktop-btn');
      const btnMob = document.getElementById('vp-mobile-btn');

      if (mode === 'mobile') {
        stage.classList.add('mobile-mode');
        container.classList.add('mobile-frame');
        btnMob.className = 'px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FF5A00] text-white flex items-center gap-1 transition cursor-pointer';
        btnDesk.className = 'px-2.5 py-1 rounded-md text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-1 transition cursor-pointer';
        showToast('Modo Mobile (390x844px) ativado');
      } else {
        stage.classList.remove('mobile-mode');
        container.classList.remove('mobile-frame');
        btnDesk.className = 'px-2.5 py-1 rounded-md text-[11px] font-bold bg-gray-800 text-white flex items-center gap-1 transition cursor-pointer';
        btnMob.className = 'px-2.5 py-1 rounded-md text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-1 transition cursor-pointer';
        showToast('Modo Desktop (1440px) ativado');
      }
    }

    let toastTimer = null;
    function showToast(msg) {
      const toast = document.getElementById('proto-toast');
      document.getElementById('proto-toast-text').textContent = msg;
      toast.classList.remove('hidden');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.add('hidden');
      }, 3200);
    }

    // =========================================================================
    // MOTOR REATIVO UNIFICADO DA JORNADA COMPLETA AQUI ADS (CONSUMINDO MOCK DATA)
    // =========================================================================
    const digitalSections = MOCK_SOURCE.digitalSections || [];
    const digitalCatalog = MOCK_SOURCE.digitalCatalog || [];
    const oohCatalog = MOCK_SOURCE.oohCatalog || [];
    const billingProfiles = MOCK_SOURCE.billingProfiles || {
      pj: { type: 'PJ', badge: 'PJ • CNPJ', name: 'Empresa Anunciante Exemplo Ltda', documentLabel: 'CNPJ: 12.345.678/0001-90', addressLabel: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP' },
      pf: { type: 'PF', badge: 'PF • CPF', name: 'Anunciante Pessoa Física Exemplo', documentLabel: 'CPF: 123.456.789-00', addressLabel: 'R. Alvorada, 1200 - Vila Olímpia, São Paulo - SP' }
    };

    const emptyInitialCart = {
      campaignName: '',
      durationDays: 14,
      startDate: '28/10/2026',
      endDate: '11/11/2026',
      targetLocation: 'Todos',
      targetInterest: 'Todos',
      targetAge: 'Todos',
      targetGender: 'Todos',
      destinationUrl: '',
      creativeOption: null,
      creativeServiceFee: 0,
      discountAmount: 0,
      billingType: 'pf',
      paymentMethod: null,
      digitalItems: [],
      oohItems: []
    };

    const cartState = JSON.parse(JSON.stringify(emptyInitialCart));
    let currentPlpChannel = 'ooh';
    let currentDigitalCategory = 'todos';
    let currentDraftChannelFilter = 'todos';
    let currentPresetKey = 'empty';
    let draftsData = JSON.parse(JSON.stringify(MOCK_SOURCE.draftsCatalog || []));

    function formatBRL(val) {
      return (Number(val) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function getOohMultiplier() {
      return cartState.durationDays === 28 ? 1.85 : 1;
    }

    function getCartTotals() {
      const mult = getOohMultiplier();
      const digTotal = (cartState.digitalItems || []).reduce((acc, item) => acc + (Number(item.budget) || 0), 0);
      const oohTotal = (cartState.oohItems || []).reduce((acc, item) => acc + ((Number(item.basePrice2w) || 0) * mult), 0);
      const subtotal = digTotal + oohTotal + (cartState.creativeServiceFee || 0);
      const total = Math.max(0, subtotal - (cartState.discountAmount || 0));
      const count = (cartState.digitalItems || []).length + (cartState.oohItems || []).length;
      return { digTotal, oohTotal, subtotal, total, count };
    }

    function loadCartPreset(presetKey, silent) {
      const preset = presetKey === 'empty'
        ? emptyInitialCart
        : (MOCK_SOURCE.cartPresets && MOCK_SOURCE.cartPresets[presetKey]);
      if (!preset) return;
      currentPresetKey = presetKey;
      const cloned = JSON.parse(JSON.stringify(preset));
      Object.keys(cloned).forEach(k => { cartState[k] = cloned[k]; });

      renderOohPlp();
      renderDigitalPlp();
      syncPlpStickyBar();
      populateResumoScreen();
      populateEnvioArteScreen();
      populateCheckoutScreen();

      if (!silent) {
        const labelMap = {
          hybrid: 'Plano Híbrido (OOH + Digital)',
          oohOnly: 'Plano Exclusivo OOH',
          digitalOnly: 'Plano Exclusivo Digital | Globo'
        };
        showToast(`Preset carregado: ${labelMap[presetKey] || presetKey}`);
      }
    }

    function showScreen(screenId) {
      document.querySelectorAll('.view-section').forEach(s => {
        s.classList.remove('active');
        if (s.id !== screenId) {
          s.classList.add('hidden');
        }
      });
      const target = document.getElementById(screenId);
      if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
      }

      const headerChannels = document.getElementById('header-home-channels');
      if (headerChannels) {
        if (screenId === 'view-resultados' || screenId === 'view-resumo') {
          headerChannels.classList.remove('hidden');
          headerChannels.classList.add('flex');
        } else {
          headerChannels.classList.add('hidden');
          headerChannels.classList.remove('flex');
        }
      }

      if (screenId === 'view-resultados') {
        renderOohPlp();
        renderDigitalPlp();
        syncPlpStickyBar();
      } else if (screenId === 'view-resumo') {
        populateResumoScreen();
      } else if (screenId === 'view-envio-arte') {
        populateEnvioArteScreen();
      } else if (screenId === 'view-pagamento') {
        populateCheckoutScreen();
      } else if (screenId === 'screen-list') {
        applyCampaignFilters();
        applyDraftFilters();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function switchPlpChannel(channel) {
      const validChannels = ['ooh', 'digital', 'tv', 'radio', 'combos'];
      const targetChannel = validChannels.includes(channel) ? channel : 'ooh';
      currentPlpChannel = targetChannel;
      showScreen('view-resultados');

      validChannels.forEach(ch => {
        const wrap = document.getElementById(`plp-mode-${ch}`);
        const btn = document.getElementById(`hdr-channel-${ch}`);
        const isActive = ch === targetChannel;

        if (wrap) {
          if (isActive) {
            wrap.classList.remove('hidden');
          } else {
            wrap.classList.add('hidden');
          }
        }

        if (btn) {
          btn.className = isActive
            ? 'flex items-center gap-2 pb-1.5 pt-1 border-b-2 border-[#241e17] text-[#241e17] font-bold text-sm cursor-pointer transition'
            : 'flex items-center gap-2 pb-1.5 pt-1 border-b-2 border-transparent text-[#8e8477] hover:text-[#241e17] font-normal text-sm cursor-pointer transition';
        }
      });

      if (targetChannel === 'digital') {
        renderDigitalPlp();
      } else if (targetChannel === 'ooh') {
        renderOohPlp();
      }
      syncPlpStickyBar();
    }

    let currentOohAmbience = 'todos';

    function syncPlpStickyBar() {
      const { total, count } = getCartTotals();
      const totalEl = document.getElementById('plp-bar-total');
      const countEl = document.getElementById('plp-bar-count');
      const countLabelEl = document.getElementById('plp-bar-count-label');
      const summaryLeftEl = document.getElementById('plp-bar-summary-left');
      const nextBtnEl = document.getElementById('resultpage_next-button');
      const badgeEl = document.getElementById('hdr-cart-badge');

      if (totalEl) totalEl.textContent = formatBRL(total);
      if (countEl) countEl.textContent = count;
      if (countLabelEl) {
        countLabelEl.textContent = `${count} ${count === 1 ? 'produto selecionado' : 'produtos selecionados'}`;
      }

      if (count === 0) {
        if (summaryLeftEl) summaryLeftEl.classList.add('hidden');
        if (nextBtnEl) {
          nextBtnEl.className = 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed pointer-events-none ml-auto px-6 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2';
        }
        if (badgeEl) {
          badgeEl.textContent = '0';
          badgeEl.classList.add('hidden');
        }
      } else {
        if (summaryLeftEl) summaryLeftEl.classList.remove('hidden');
        if (nextBtnEl) {
          nextBtnEl.className = 'bg-[#FF4F00] hover:bg-[#E04600] text-white cursor-pointer ml-auto px-6 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 transition shadow-xs';
        }
        if (badgeEl) {
          badgeEl.textContent = count;
          badgeEl.classList.remove('hidden');
          if (window.AquiAdsUI && window.AquiAdsUI.hooks && typeof window.AquiAdsUI.hooks.renderBottomBar === 'function') {
        const barEl = document.getElementById('actions-bar-results');
        const customBar = window.AquiAdsUI.hooks.renderBottomBar({ cartState, currentPlpChannel, formatBRL, barEl, total, count }, () => barEl ? barEl.innerHTML : '');
        if (typeof customBar === 'string' && barEl) {
          barEl.innerHTML = customBar;
        }
      }
    }
      }
    }

    function filterPlpAmbience(ambience, btnEl) {
      currentOohAmbience = ambience || 'todos';
      document.querySelectorAll('.plp-ambience-btn').forEach(btn => {
        const btnAmb = (btn.getAttribute('data-amb') || '').toLowerCase();
        const isActive = btnEl ? (btn === btnEl) : (btnAmb === currentOohAmbience.toLowerCase());
        if (isActive) {
          btn.className = 'plp-ambience-btn px-3 py-1.5 rounded-md text-xs font-semibold bg-[#4E5D6C] border border-[#4E5D6C] text-white cursor-pointer transition';
        } else {
          btn.className = 'plp-ambience-btn px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition';
        }
      });
      renderOohPlp();
    }

    function toggleOohFavorite(pointId, evt) {
      if (evt) evt.stopPropagation();
      const item = oohCatalog.find(x => x.id === pointId);
      if (!item) return;
      item.favorite = !item.favorite;
      renderOohPlp();
      showToast(item.favorite ? `${item.name} salvo nos favoritos!` : `${item.name} removido dos favoritos.`);
    }

    function toggleOohSearchDuration() {
      cartState.durationDays = cartState.durationDays === 28 ? 14 : 28;
      const periodStr = cartState.durationDays === 28 ? '4 semanas' : '2 semanas';
      const lbl = document.getElementById('plp-ooh-duration-label');
      if (lbl) lbl.textContent = periodStr;
      const digLbl = document.getElementById('digital-search-duration-label');
      if (digLbl) digLbl.textContent = periodStr;
      renderOohPlp();
      renderDigitalPlp();
      syncPlpStickyBar();
      showToast(`Período alterado para ${periodStr}.`);
    }

    function toggleOohFaq(idx) {
      const accordion = document.getElementById('ooh-faq-accordion');
      if (!accordion) return;
      const items = accordion.querySelectorAll('.faq-item');
      items.forEach((faqEl, i) => {
        const body = faqEl.querySelector('.faq-body');
        const title = faqEl.querySelector('.faq-title');
        if (!body) return;
        if (i === idx) {
          const isOpening = body.classList.contains('hidden');
          if (isOpening) {
            body.classList.remove('hidden');
            faqEl.classList.remove('border-[#E2E8F0]');
            faqEl.classList.add('border-[#FF4F00]');
            if (title) {
              title.className = 'text-xs font-bold text-[#282E38] faq-title';
            }
          } else {
            body.classList.add('hidden');
            faqEl.classList.remove('border-[#FF4F00]');
            faqEl.classList.add('border-[#E2E8F0]');
            if (title) {
              title.className = 'text-sm font-semibold text-[#64748B] hover:text-[#282E38] faq-title';
            }
          }
        }
      });

    }

    function getOohEnvIconSvg(envStr) {
      const s = String(envStr || '').toLowerCase();
      if (s.includes('residencia')) {
        return '<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-10.5z"/></svg>';
      }
      if (s.includes('ônibus') || s.includes('onibus')) {
        return '<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="15" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M4 11h16M8 15h.01M16 15h.01M6 18v3M18 18v3"/></svg>';
      }
      return '<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>';
    }

    function getOohFormatIconSvg(fmtStr) {
      const s = String(fmtStr || '').toLowerCase();
      if (s === 'impresso') {
        return '<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="12" rx="1"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 20h8M12 16v4"/></svg>';
      }
      return '<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 20h8M12 16v4"/></svg>';
    }

    function renderOohPlp() {
      const grid = document.getElementById('plp-cards-grid');
      const pinsWrap = document.getElementById('plp-ooh-map-pins');
      const is4w = cartState.durationDays === 28;
      const periodLabel = is4w ? '4 semanas' : '2 semanas';

      const filteredCatalog = currentOohAmbience === 'todos'
        ? oohCatalog.slice(0, 11)
        : oohCatalog.filter(x =>
            (x.environmentLabel || x.environment || '').toLowerCase().includes(currentOohAmbience.toLowerCase())
          );

      if (grid) {
        const htmlParts = [];
        filteredCatalog.forEach((item, idx) => {
          const isAdded = cartState.oohItems.some(x => x.id === item.id);
          const itemPrice = is4w ? (item.price4w || item.basePrice2w * 1.8) : item.basePrice2w;
          const itemImp = Math.round(item.impressions * (is4w ? 2 : 1));
          const viewsDisplay = item.viewsText ? item.viewsText : itemImp.toLocaleString('pt-BR');
          const reachDisplay = item.reachText ? item.reachText : (item.reach ? item.reach.toLocaleString('pt-BR') : '-');
          const freqDisplay = item.freq ? String(item.freq).replace('.', ',') : '-';
          const fmtLower = (item.format || 'digital').toLowerCase();
          const formatBadgeBg = fmtLower === 'impresso' ? 'bg-[#009E60]' : 'bg-[#3F1195]';
          const envLabel = item.environmentLabel || item.environment || 'elevadores comerciais';
          const envIconSvg = getOohEnvIconSvg(envLabel);
          const fmtIconSvg = getOohFormatIconSvg(fmtLower);

          const defaultOohCardRender = (pt = item) => `
            <li class="min-h-[462px] rounded-[12px] overflow-hidden transition-all duration-200 flex flex-col justify-between ${isAdded ? 'bg-[#F0FDF4] border-[1.5px] border-[#22C55E] shadow-[0_2px_10px_rgba(34,197,94,0.08)]' : 'bg-white border border-[#d9d9d9] shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md'}">
              <div onclick="openOohPointModal('${item.id}')" class="relative h-[122px] w-full bg-slate-200 overflow-hidden cursor-pointer group">
                <img src="${item.img}" alt="${item.name}" class="relative h-full w-full object-cover object-center group-hover:scale-105 transition duration-300">
                <div class="absolute left-3 right-3 top-3 flex items-center justify-between gap-1 z-10">
                  <div class="flex items-center gap-1 min-w-0">
                    <span class="bg-white/95 backdrop-blur-sm text-slate-800 text-[10.5px] leading-tight font-medium px-2 py-1 rounded-[5px] whitespace-nowrap flex items-center gap-1 shadow-xs">
                      ${envIconSvg}
                      <span>${envLabel}</span>
                    </span>
                    <span class="${fmtLower === 'impresso' ? 'bg-[#009E60]' : 'bg-[#430099]'} text-white text-[10.5px] leading-tight font-medium px-2 py-1 rounded-[5px] whitespace-nowrap flex items-center gap-1 shadow-xs">
                      ${fmtIconSvg}
                      <span>${fmtLower}</span>
                    </span>
                  </div>
                  <span class="bg-[#8E8E93]/90 backdrop-blur-sm text-white text-[10.5px] leading-tight font-medium px-2 py-1 rounded-[5px] whitespace-nowrap flex items-center gap-1 flex-shrink-0">
                    <svg class="w-2.5 h-2.5 text-white shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>${item.distance || '300 m'}</span>
                  </span>
                </div>
                ${item.towersBadge ? `
                  <span class="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white px-2.5 py-0.5 rounded-sm text-[10px] font-medium whitespace-nowrap shadow-2xs">
                    ${item.towersBadge}
                  </span>
                ` : ''}
              </div>
              <div class="px-[20px] pt-[18px] pb-[20px] flex-1 flex flex-col justify-between">
                <div>
                  <div class="mb-[20px]">
                    <h3 onclick="openOohPointModal('${item.id}')" class="text-xl leading-7 font-bold text-[#0c0a09] mb-[4px] truncate cursor-pointer hover:text-[#FF4F00] transition" title="${item.name}">${item.name}</h3>
                    <p class="text-[12px] leading-normal text-[#8c97a6] line-clamp-2 min-h-[36px]" title="${item.address}">${item.address}</p>
                  </div>

                  <div>
                    <div class="flex justify-normal text-left">
                      <div class="mr-4">
                        <span class="text-[12px] text-[#5f6b7a] flex items-center gap-1 mb-[4px]">
                          <span>exibições</span>
                          <svg class="w-3 h-3 text-[#5f6b7a] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </span>
                        <strong class="block text-[14px] font-bold text-[#0c0a09] leading-tight">${viewsDisplay}</strong>
                      </div>
                      <div class="mr-4">
                        <span class="text-[12px] text-[#5f6b7a] flex items-center gap-1 mb-[4px]">
                          <span>alcance</span>
                          <svg class="w-3 h-3 text-[#5f6b7a] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        </span>
                        <strong class="block text-[14px] font-bold text-[#0c0a09] leading-tight">${reachDisplay}</strong>
                      </div>
                      <div>
                        <span class="text-[12px] text-[#5f6b7a] flex items-center gap-1 mb-[4px]">
                          <span>frequência</span>
                          <svg class="w-3 h-3 text-[#5f6b7a] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                        </span>
                        <strong class="block text-[14px] font-bold text-[#0c0a09] leading-tight">${freqDisplay}</strong>
                      </div>
                    </div>
                    <div class="mt-[10px] text-[10px] font-normal text-[#5f6b7a]">Telas: ${item.screens}</div>
                  </div>
                </div>

                <div>
                  <div class="mt-[38px] flex items-baseline gap-1 min-h-[28px] mb-1">
                    <strong class="text-2xl font-extrabold leading-6 text-[#0c0a09]">${formatBRL(itemPrice)}</strong>
                    <span class="text-base font-normal text-[#8c97a6]">/ ${periodLabel}</span>
                  </div>

                  <div class="mt-[26px] flex items-center justify-between">
                    <button type="button" onclick="toggleOohCatalogItem('${item.id}')" class="flex-1 h-10 px-4 rounded-[8px] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${isAdded ? 'bg-white hover:bg-slate-50 text-[#0c0a09] border border-transparent shadow-2xs' : 'border border-[#3A9F3A] bg-white text-[#3A9F3A] hover:bg-green-50'}">
                      <span>${isAdded ? 'remover ponto' : 'adicionar ponto'}</span>
                      ${isAdded
                        ? '<svg class="w-4 h-4 text-[#0c0a09]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>'
                        : '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'}
                    </button>
                    <button type="button" onclick="toggleOohFavorite('${item.id}', event)" aria-label="Favoritar ponto" class="ml-5 w-6 h-6 flex items-center justify-center text-[#94a3b8] hover:text-[#EF4444] transition-colors shrink-0 cursor-pointer">
                      ${item.favorite
                        ? '<svg class="w-5 h-5 text-[#EF4444]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
                        : '<svg class="w-5 h-5 text-[#94a3b8]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>'}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          `;
          const oohHookCtx = { isAdded, is4w, periodLabel, itemPrice, itemImp, viewsDisplay, reachDisplay, freqDisplay, fmtLower, formatBadgeBg, envLabel, envIconSvg, fmtIconSvg, idx, cartState, formatBRL };
          const renderedOohCard = (window.AquiAdsUI && window.AquiAdsUI.hooks && typeof window.AquiAdsUI.hooks.renderOohCard === 'function')
            ? window.AquiAdsUI.hooks.renderOohCard(item, oohHookCtx, defaultOohCardRender)
            : defaultOohCardRender(item);
          htmlParts.push(renderedOohCard);

          // Banner lilás intercalado após o 6º card (índice 5) ocupando todas as 3 colunas (col-span-full)
          if (idx === 5 && currentOohAmbience === 'todos') {
            htmlParts.push(`
              <li class="col-span-full rounded-xl bg-[#C8B6FF] p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
                <div class="flex items-center gap-3.5">
                  <div class="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shrink-0 shadow-2xs">
                    <svg class="w-7 h-7" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 15.5C7 14.1193 8.11929 13 9.5 13H13.5L24 7.5V28.5L13.5 23H9.5C8.11929 23 7 21.8807 7 20.5V15.5Z" fill="#FF4F00"/>
                      <path d="M10 23H13.5L15.5 29.5C15.7 30.2 15.2 31 14.4 31H11.8C11.1 31 10.5 30.5 10.4 29.8L10 23Z" fill="#3F1195"/>
                      <path d="M27 13.5C28.8 15.3 28.8 20.7 27 22.5" stroke="#1E1B4B" stroke-width="2.4" stroke-linecap="round"/>
                      <path d="M30 10.5C33 13.8 33 22.2 30 25.5" stroke="#009E60" stroke-width="2.4" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-extrabold text-[#1E1B4B] leading-snug">Deixe que a gente cuida da arte</h3>
                    <p class="text-xs text-[#282E38] mt-0.5 leading-relaxed">Você envia as informações e nossa equipe cria a arte no formato certo para os pontos escolhidos.</p>
                  </div>
                </div>
                <div class="flex items-center gap-3.5 shrink-0 self-end sm:self-center">
                  <div class="text-right">
                    <span class="block text-[10px] font-semibold text-[#282E38] leading-none">Apenas</span>
                    <strong class="text-sm font-extrabold text-[#1E1B4B]">R$ 99,00</strong>
                  </div>
                  <button type="button" onclick="showToast('Serviço Contrate uma Arte (R$ 99,00): disponível na etapa de Envio de Arte!')" class="bg-[#282E38] hover:bg-[#1E2229] text-white text-xs font-bold px-4 py-2 rounded-md cursor-pointer transition">
                    saiba mais
                  </button>
                </div>
              </li>
            `);
          }

          // Card promocional "Crie sua conta ou entre para guardar sua seleção" após o 11º card (índice 10, fechando a 4ª fileira na 12ª posição)
          if (idx === 10 && currentOohAmbience === 'todos') {
            htmlParts.push(`
              <li class="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-2xs flex flex-col justify-between p-5">
                <div>
                  <h3 class="text-base font-bold text-[#282E38] leading-snug mb-2">Crie sua conta ou entre para guardar sua seleção</h3>
                  <p class="text-xs text-[#64748B] leading-relaxed mb-4">Salve os pontos escolhidos, compartilhe seu plano e continue sua campanha de onde parou.</p>
                  <button type="button" onclick="showToast('Fluxo de autenticação / criação de conta')" class="w-full py-2.5 px-4 rounded-lg border border-[#282E38] text-[#282E38] text-xs font-bold hover:bg-gray-50 transition cursor-pointer">
                    entrar ou criar conta
                  </button>
                </div>
                <div class="mt-4 flex justify-center">
                  <img src="https://aqui.globo/images/banners/results/campanha-completa.webp" alt="Campanha completa" class="h-[130px] w-auto object-contain">
                </div>
              </li>
            `);
          }
        });

        grid.innerHTML = htmlParts.join('');
      }

      if (pinsWrap) {
        const clusters = [
          { label: '18', top: '26%', left: '53%', size: 'w-9 h-9', pointId: (oohCatalog[0] && oohCatalog[0].id) || 'vn-alvorada' },
          { label: '19', top: '39%', left: '36%', size: 'w-9 h-9', pointId: (oohCatalog[1] && oohCatalog[1].id) || 'the-world-hotels' },
          { label: '11', top: '42%', left: '55%', size: 'w-8 h-8', pointId: (oohCatalog[2] && oohCatalog[2].id) || 'clodomiro-amazonas' },
          { label: '22', top: '48%', left: '44%', size: 'w-9 h-9', pointId: (oohCatalog[3] && oohCatalog[3].id) || 'vila-olimpia-corporate' },
          { label: '32', top: '53%', left: '61%', size: 'w-10 h-10', pointId: (oohCatalog[4] && oohCatalog[4].id) || 'edificio-continental-parque' },
          { label: '18', top: '58%', left: '49%', size: 'w-9 h-9', pointId: (oohCatalog[5] && oohCatalog[5].id) || 'ponto-onibus-04-alvorada' },
          { label: '2',  top: '67%', left: '38%', size: 'w-7 h-7', pointId: (oohCatalog[6] && oohCatalog[6].id) || 'conde-de-itaguai' },
          { label: '2',  top: '65%', left: '63%', size: 'w-7 h-7', pointId: (oohCatalog[7] && oohCatalog[7].id) || 'parque-cultural-paulista' }
        ];
        const clusterHtml = clusters.map(c => `
          <button type="button" onclick="openOohPointModal('${c.pointId}')"
            style="top:${c.top}; left:${c.left};"
            class="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 ${c.size} rounded-full bg-[#FF4F00]/90 hover:bg-[#FF4F00] text-white text-xs font-extrabold shadow-md ring-4 ring-[#FF4F00]/25 transition transform hover:scale-110 cursor-pointer flex items-center justify-center">
            ${c.label}
          </button>
        `).join('');

        const centerPinHtml = `
          <div style="top:46%; left:50%;" class="pointer-events-none absolute -translate-x-1/2 -translate-y-full">
            <div class="w-7 h-7 rounded-full bg-[#1E293B] border-2 border-white shadow-lg flex items-center justify-center text-white text-xs">
              📍
            </div>
          </div>
        `;
        pinsWrap.innerHTML = clusterHtml + centerPinHtml;
      }
    }

    function toggleOohCatalogItem(pointId) {
      const catItem = oohCatalog.find(x => x.id === pointId);
      if (!catItem) return;
      const existingIdx = cartState.oohItems.findIndex(x => x.id === pointId);
      if (existingIdx === -1) {
        cartState.oohItems.push({ ...catItem, selectedForBatch: false });
        showToast(`${catItem.name} adicionado ao plano de mídia!`);
      } else {
        cartState.oohItems.splice(existingIdx, 1);
        showToast(`${catItem.name} removido do plano de mídia.`);
      }
      renderOohPlp();
      syncPlpStickyBar();
    }

    function openOohPointModal(pointId) {
      const item = oohCatalog.find(x => x.id === pointId) || oohCatalog[0];
      if (!item) return;
      const modal = document.getElementById('modal-plp-detail');
      const badge = document.getElementById('plp-detail-modal-badge');
      const title = document.getElementById('plp-detail-modal-title');
      const sub = document.getElementById('plp-detail-modal-sub');
      const body = document.getElementById('plp-detail-modal-body');
      const actionBtn = document.getElementById('plp-detail-modal-action-btn');
      if (!modal || !body) return;

      const isAdded = cartState.oohItems.some(x => x.id === item.id);
      const mult = getOohMultiplier();
      const itemPrice = item.basePrice2w * mult;
      const itemImp = Math.round(item.impressions * (cartState.durationDays === 28 ? 2 : 1));

      if (badge) badge.textContent = `OOH • ${item.environment.toUpperCase()}`;
      if (title) title.textContent = item.name;
      if (sub) sub.textContent = item.address;

      body.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <img src="${item.img}" alt="${item.name}" class="w-full h-48 object-cover rounded-xl border border-gray-200">
          <div class="space-y-2.5 text-xs">
            <div class="p-3 rounded-xl bg-gray-50 border border-gray-200 flex justify-between">
              <span class="text-gray-500">Ambiente / Formato:</span>
              <strong class="text-gray-900 capitalize">${item.environment} • ${item.format}</strong>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 border border-gray-200 flex justify-between">
              <span class="text-gray-500">Telas instaladas:</span>
              <strong class="text-gray-900">${item.screens} telas digitais</strong>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 border border-gray-200 flex justify-between">
              <span class="text-gray-500">Exibições estimadas:</span>
              <strong class="text-gray-900">${itemImp.toLocaleString('pt-BR')}</strong>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 border border-gray-200 flex justify-between">
              <span class="text-gray-500">Alcance / Frequência:</span>
              <strong class="text-gray-900">${item.reach.toLocaleString('pt-BR')} pessoas (${String(item.freq).replace('.', ',')}x)</strong>
            </div>
            <div class="p-3 rounded-xl bg-orange-50/60 border border-orange-200 flex justify-between items-center">
              <span class="text-gray-700 font-semibold">Investimento no período:</span>
              <strong class="text-base font-extrabold text-[#FF4F00]">${formatBRL(itemPrice)}</strong>
            </div>
          </div>
        </div>
      `;

      if (actionBtn) {
        actionBtn.textContent = isAdded ? 'Remover do plano' : 'Adicionar ponto ao plano';
        actionBtn.className = isAdded
          ? 'px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer'
          : 'px-5 py-2 rounded-lg bg-[#3A9F3A] hover:bg-[#2F852F] text-white text-xs font-bold cursor-pointer';
        actionBtn.onclick = () => {
          toggleOohCatalogItem(item.id);
          closePlpDetailModal();
        };
      }
      modal.classList.remove('hidden');
    }

    function closePlpDetailModal() {
      const modal = document.getElementById('modal-plp-detail');
      if (modal) modal.classList.add('hidden');
    }

    function filterDigitalCategory(cat) {
      currentDigitalCategory = cat;
      document.querySelectorAll('.dig-cat-chip').forEach(btn => {
        if (btn.dataset.cat && btn.dataset.cat.toLowerCase() === cat.toLowerCase()) {
          btn.className = 'dig-cat-chip px-3 py-1.5 rounded-md text-xs font-semibold bg-[#4E5D6C] border border-[#4E5D6C] text-white cursor-pointer transition';
        } else {
          btn.className = 'dig-cat-chip px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition';
        }
      });
      renderDigitalPlp();
    }

    function updateDigitalTargetLocation(val) {
      cartState.targetLocation = val || 'Todos';
    }

    function renderDigitalCardBanner(prod) {
      const cpmFormatted = prod.cpm.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const topPills = `
        <span class="absolute top-3 left-3 z-10 bg-[#E2E8F0]/95 backdrop-blur-xs text-[#1E293B] text-[10.5px] font-semibold px-2 py-0.5 rounded-[4px] flex items-center gap-1 shadow-2xs">
          ${prod.formatIcon === 'video' ? '<svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> vídeo' : '<svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> display'}
        </span>
        <span class="absolute top-3 right-3 z-10 bg-[#E2E8F0]/95 backdrop-blur-xs text-[#1E293B] text-[10.5px] font-semibold px-2 py-0.5 rounded-[4px] shadow-2xs flex items-center gap-1">
          <svg class="w-3 h-3 text-[#475569] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
          <span>R$ ${cpmFormatted}/CPM</span>
        </span>
      `;

      if (prod.id === 'display-portais-globo' || prod.id === 'dig_portais_globo_disp') {
        return `
          <div class="relative h-[168px] w-full bg-[#C7BFB8] flex items-end justify-center overflow-hidden border-b border-gray-100">
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80" alt="" class="absolute inset-0 w-full h-full object-cover blur-[4px] scale-110 opacity-75">
            ${topPills}
            <!-- Tampo de mesa de madeira na base -->
            <div class="absolute bottom-0 inset-x-0 h-5 bg-gradient-to-r from-[#854D0E] via-[#A16207] to-[#713F12] opacity-85"></div>
            <!-- Notebook aberto em perspectiva fiel ao Print 3 -->
            <div class="relative z-10 mb-2.5 flex flex-col items-center">
              <div class="w-40 h-[84px] rounded-t-md bg-[#1F2937] p-1 shadow-lg flex flex-col border border-gray-700">
                <div class="w-full h-full bg-[#F8FAFC] rounded-2xs flex flex-col p-1.5 gap-1">
                  <div class="w-full py-1.5 bg-gradient-to-r from-[#FF4F00] to-[#F97316] text-white text-[8px] font-bold text-center rounded-2xs shadow-2xs">Sua marca aqui</div>
                  <div class="flex gap-1 flex-1 mt-0.5">
                    <div class="bg-gray-200 rounded-2xs flex-1"></div>
                    <div class="bg-gray-200 rounded-2xs w-10"></div>
                  </div>
                </div>
              </div>
              <div class="w-48 h-2 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-500 rounded-b-md shadow-md"></div>
            </div>
          </div>
        `;
      }

      if (prod.id === 'video-15s-portais-globo' || prod.id === 'video-30s-portais-globo' || prod.id === 'dig_portais_globo_vid') {
        return `
          <div class="relative h-[168px] w-full bg-[#D8D4CF] flex items-end justify-center overflow-hidden border-b border-gray-100">
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" alt="" class="absolute inset-0 w-full h-full object-cover blur-[4px] scale-110 opacity-70">
            ${topPills}
            <div class="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-r from-[#D6D3D1] via-[#E7E5E4] to-[#A8A29E] opacity-90"></div>
            <div class="relative z-10 mb-2.5 flex flex-col items-center">
              <div class="w-40 h-[84px] rounded-t-md bg-[#18181B] p-1 shadow-lg flex flex-col border border-zinc-700">
                <div class="w-full h-full bg-[#27272A] rounded-2xs flex items-center justify-center relative">
                  <div class="w-9 h-6 rounded-md bg-[#FF4F00] flex items-center justify-center shadow-sm">
                    <svg class="w-3.5 h-3.5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                  </div>
                  <div class="absolute bottom-1.5 inset-x-2 h-1 bg-zinc-600 rounded-full overflow-hidden">
                    <div class="w-1/3 h-full bg-[#FF4F00]"></div>
                  </div>
                </div>
              </div>
              <div class="w-48 h-2 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-500 rounded-b-md shadow-md"></div>
            </div>
          </div>
        `;
      }

      if (prod.id === 'video-15s-globoplay' || prod.id === 'video-30s-globoplay' || prod.id === 'dig_globoplay_vid' || prod.id === 'dig_globoplay_vid_30') {
        return `
          <div class="relative h-[168px] w-full bg-gradient-to-b from-[#27272A] via-[#18181B] to-[#09090B] flex items-center justify-center overflow-hidden border-b border-gray-100">
            ${topPills}
            <!-- Sala escura com Smart TV exibindo globoplay em branco no centro -->
            <div class="mt-4 flex flex-col items-center">
              <div class="w-44 h-[80px] bg-black rounded-xs border-2 border-zinc-700 shadow-lg flex items-center justify-center">
                <span class="text-white font-black text-lg tracking-tight">globoplay</span>
              </div>
              <div class="w-12 h-1.5 bg-zinc-600"></div>
              <div class="w-28 h-1.5 bg-zinc-800 rounded-xs"></div>
            </div>
          </div>
        `;
      }

      const portalLogoMap = {
        'display-extra': '<span class="text-[34px] font-black not-italic tracking-tight text-[#0c0a09] flex items-center">E<span class="relative inline-block">X<span class="w-2 h-2 bg-[#E11D48] rounded-full inline-block ml-0.5 align-middle"></span></span>TRA</span>',
        'display-galileu': '<span class="text-2xl font-extrabold tracking-widest text-[#EA580C]">GALILEU</span>',
        'display-globo-rural': '<span class="text-xl font-black tracking-tight text-[#854D0E]">GLOBO RURAL</span>',
        'display-o-globo': '<span class="text-2xl font-serif font-bold tracking-tight text-[#1D4ED8]">O GLOBO</span>',
        'display-epoca-negocios': '<div class="flex flex-col items-center leading-none"><span class="text-2xl font-black text-[#B91C1C]">ÉPOCA</span><span class="text-[10px] tracking-widest font-bold text-[#B91C1C] mt-0.5">NEGÓCIOS</span></div>',
        'display-pegn': '<span class="text-sm font-extrabold text-center leading-tight px-6 text-[#1E40AF]">Pequenas Empresas &amp; Grandes Negócios</span>',
        'display-valor-investe': '<div class="flex items-baseline gap-1"><span class="text-2xl font-serif font-bold text-[#0F766E]">Valor</span><span class="text-xs font-semibold text-[#0F766E]">Investe</span></div>',
        'display-valor-economico': '<span class="text-3xl font-serif font-bold text-[#115E59]">Valor</span>',
        'display-auto-esporte': '<span class="text-xl font-black italic tracking-tight text-[#DC2626]">AUTOESPORTE</span>',
        'display-techtudo': '<span class="text-2xl font-extrabold tracking-tight text-[#18181B]">techtudo</span>',
        'display-marie-claire': '<span class="text-xl font-serif font-bold tracking-widest text-[#18181B]">MARIE CLAIRE</span>',
        'display-monet': '<span class="text-2xl font-bold tracking-tight text-[#9333EA]">Monet</span>',
        'display-quem': '<span class="text-3xl font-extrabold tracking-tight text-[#EA580C]">Quem</span>',
        'display-casa-e-jardim': '<div class="flex flex-col items-center leading-none"><span class="text-2xl font-serif font-bold text-[#D97706]">CASA</span><span class="text-[10px] tracking-widest font-semibold text-[#D97706] mt-0.5">e JARDIM</span></div>',
        'display-crescer': '<span class="text-2xl font-black tracking-wide text-[#DC2626]">CRESCER</span>'
      };

      const logoHtml = portalLogoMap[prod.id] || `<span class="text-xl font-extrabold text-[#282E38]">${(prod.portalBadges && prod.portalBadges[0] && prod.portalBadges[0].label) || prod.title}</span>`;
      return `
        <div class="relative h-[168px] w-full bg-gradient-to-b from-white via-[#F8FAFC] to-[#E2E8F0] flex items-center justify-center overflow-hidden border-b border-gray-100">
          ${topPills}
          <div class="mt-3 flex items-center justify-center">
            ${logoHtml}
          </div>
        </div>
      `;
    }

    function renderDigitalPlp() {
      const container = document.getElementById('digital-sections-container');
      if (!container) return;

      const isAll = !currentDigitalCategory || currentDigitalCategory.toLowerCase() === 'todos';
      const sectionsToRender = isAll
        ? digitalSections
        : digitalSections.filter(sec => sec.id === currentDigitalCategory || sec.title === currentDigitalCategory);

      container.innerHTML = sectionsToRender.map(sec => {
        const products = digitalCatalog.filter(p => p.sectionId === sec.id);
        if (products.length === 0) return '';

        const cardsHtml = products.map(prod => {
          const inCart = cartState.digitalItems.find(x => x.id === prod.id);
          const minB = prod.minBudget || 900;
          const currentBudget = inCart ? inCart.budget : (prod.defaultBudget || minB);
          const estVolume = Math.round(currentBudget / prod.cpm) * 1000;
          const isAdded = Boolean(inCart);
          const badgesHtml = (prod.portalBadges || []).map(b =>
            `<span class="px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold" style="background-color:${b.bg}; color:${b.fg || '#FFFFFF'};">${b.label}</span>`
          ).join('');

          const budgetFormatted = currentBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          const metricLabelLower = (prod.metricLabel || 'impressões').toLowerCase();

          const defaultDigitalCardRender = (p = prod) => `
            <div class="rounded-[12px] overflow-hidden transition-all duration-200 flex flex-col justify-between ${isAdded ? 'bg-[#F0FDF4] border-[1.5px] border-[#22C55E] shadow-[0_2px_10px_rgba(34,197,94,0.08)]' : 'bg-white border border-[#d9d9d9] shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md'}">
              <div>
                ${renderDigitalCardBanner(prod)}
                <div class="px-[20px] py-[16px] pt-4 pb-0">
                  <h3 class="text-xl leading-7 font-bold text-[#0c0a09] mb-[4px] truncate" title="${prod.title}">${prod.title}</h3>
                  <p class="text-[12px] text-[#8c97a6] mt-1 leading-normal line-clamp-3 min-h-[50px]">${prod.desc}</p>

                  <div class="flex flex-wrap items-center gap-1.5 mt-3 min-h-[22px]">
                    ${badgesHtml}
                  </div>

                  <div class="grid grid-cols-2 gap-2.5 mt-4 items-end">
                    <div>
                      <label class="text-[11px] text-[#64748B] block mb-1">investimento</label>
                      <div class="h-10 flex items-center rounded-[6px] border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#0c0a09] focus-within:border-[#FF4F00] transition">
                        <span class="text-xs text-[#0c0a09] mr-1">R$</span>
                        <input id="dig-card-input-${prod.id}" type="text" value="${budgetFormatted}"
                          oninput="updateDigitalCardBudget('${prod.id}', this.value)"
                          class="w-full text-xs font-medium text-[#0c0a09] bg-transparent outline-none">
                      </div>
                    </div>

                    <div>
                      <label class="text-[11px] text-[#64748B] block mb-1">${metricLabelLower}</label>
                      <div class="h-10 flex items-center rounded-[6px] border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#0c0a09]">
                        <span id="dig-card-imp-${prod.id}" class="text-xs font-medium text-[#0c0a09]">${estVolume.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-[20px] py-[16px] pt-4">
                <button type="button" onclick="toggleDigitalProduct('${prod.id}')"
                  class="w-full h-10 px-4 rounded-[8px] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors ${isAdded ? 'bg-white hover:bg-slate-50 text-[#0c0a09] border border-transparent shadow-2xs' : 'border border-[#3A9F3A] bg-white text-[#3A9F3A] hover:bg-green-50'}">
                  <span>${isAdded ? 'remover produto' : 'adicionar produto'}</span>
                  ${isAdded
                    ? '<svg class="w-4 h-4 text-[#0c0a09]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>'
                    : '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>'}
                </button>
              </div>
            </div>
          `;
          const digHookCtx = { isAdded, inCart, minB, budget: currentBudget, budgetFormatted, estVolume, metricLabelLower, cartState, formatBRL };
          if (window.AquiAdsUI && window.AquiAdsUI.hooks && typeof window.AquiAdsUI.hooks.renderDigitalCard === 'function') {
            return window.AquiAdsUI.hooks.renderDigitalCard(prod, digHookCtx, defaultDigitalCardRender);
          }
          return defaultDigitalCardRender(prod);
        }).join('');

        return `
          <section class="space-y-4">
            <h3 class="text-[22px] lg:text-[24px] font-bold text-[#0c0a09]">${sec.title}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              ${cardsHtml}
            </div>
          </section>
        `;
      }).join('');
    }

    function openDigitalProductModal(prodId) {
      const prod = digitalCatalog.find(x => x.id === prodId);
      if (!prod) return;
      const modal = document.getElementById('modal-plp-detail');
      const badge = document.getElementById('plp-detail-modal-badge');
      const title = document.getElementById('plp-detail-modal-title');
      const sub = document.getElementById('plp-detail-modal-sub');
      const body = document.getElementById('plp-detail-modal-body');
      const actionBtn = document.getElementById('plp-detail-modal-action-btn');
      if (!modal || !body) return;

      const inCart = cartState.digitalItems.find(x => x.id === prod.id);
      const minB = prod.minBudget || 900;
      const budget = inCart ? inCart.budget : (prod.defaultBudget || minB);
      const estVolume = Math.round(budget / prod.cpm) * 1000;

      if (badge) badge.textContent = `DIGITAL | GLOBO • ${prod.format.toUpperCase()}`;
      if (title) title.textContent = prod.title;
      if (sub) sub.textContent = prod.desc;

      body.innerHTML = `
        <div class="space-y-3 text-xs">
          <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
            <span class="text-gray-500">Formato de veiculação:</span>
            <strong class="text-gray-900">${prod.format} (CPM ${formatBRL(prod.cpm)})</strong>
          </div>
          <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
            <span class="text-gray-500">Investimento mínimo oficial:</span>
            <strong class="text-gray-900">${formatBRL(minB)}</strong>
          </div>
          <div class="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
            <span class="text-gray-700 font-semibold">Estimativa (${prod.metricLabel}) para ${formatBRL(budget)}:</span>
            <strong class="text-sm font-extrabold text-[#005CEF]">${estVolume.toLocaleString('pt-BR')} ${prod.metricLabel}</strong>
          </div>
        </div>
      `;

      if (actionBtn) {
        actionBtn.textContent = inCart ? 'Remover produto do plano' : 'Adicionar produto ao plano';
        actionBtn.className = inCart
          ? 'px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer'
          : 'px-5 py-2 rounded-lg bg-[#3A9F3A] hover:bg-[#2F852F] text-white text-xs font-bold cursor-pointer';
        actionBtn.onclick = () => {
          toggleDigitalProduct(prod.id);
          closePlpDetailModal();
        };
      }
      modal.classList.remove('hidden');
    }

    function updateDigitalCardBudget(prodId, rawVal) {
      const prod = digitalCatalog.find(x => x.id === prodId);
      if (!prod) return;
      const minB = prod.minBudget || 900;
      const numeric = Number(String(rawVal || '').replace(/\./g, '').replace(',', '.'));
      const budget = Math.max(minB, numeric || minB);
      const est = Math.round(budget / prod.cpm) * 1000;
      const impEl = document.getElementById(`dig-card-imp-${prodId}`);
      if (impEl) impEl.textContent = est.toLocaleString('pt-BR');

      const inCart = cartState.digitalItems.find(x => x.id === prodId);
      if (inCart) {
        inCart.budget = budget;
        syncPlpStickyBar();
      }
    }

    function toggleDigitalProduct(prodId) {
      const prod = digitalCatalog.find(x => x.id === prodId);
      if (!prod) return;
      const idx = cartState.digitalItems.findIndex(x => x.id === prodId);
      const inputEl = document.getElementById(`dig-card-input-${prodId}`);
      const minB = prod.minBudget || 900;
      const raw = inputEl ? String(inputEl.value || '').replace(/\./g, '').replace(',', '.') : prod.defaultBudget;
      const budget = Math.max(minB, Number(raw) || minB);

      if (idx === -1) {
        cartState.digitalItems.push({
          id: prod.id,
          title: prod.title,
          format: prod.format,
          formatIcon: prod.formatIcon,
          cpm: prod.cpm,
          metricLabel: prod.metricLabel,
          minBudget: minB,
          budget,
          portalBadges: prod.portalBadges || [],
          selectedForBatch: false
        });
        showToast(`${prod.title} adicionado ao plano de mídia!`);
      } else {
        cartState.digitalItems.splice(idx, 1);
        showToast(`${prod.title} removido do plano de mídia.`);
      }
      renderDigitalPlp();
      syncPlpStickyBar();
    }

    // =========================================================================
    // TELA 1.B: PÁGINA DE RESUMO ("PLANO DE MÍDIA" - FIEL AOS PRINTS 02 E 03)
    // =========================================================================
    function toggleResumoAccordion(channel) {
      const body = document.getElementById(`resumo-acc-body-${channel}`);
      const chev = document.getElementById(`resumo-acc-icon-${channel}`);
      if (!body) return;
      body.classList.toggle('hidden');
      if (chev) chev.classList.toggle('rotate-180');
    }

    function promptEditDigitalLocation() {
      switchPlpChannel('digital');
      setTimeout(() => {
        const input = document.getElementById('digital-search-location');
        if (input) input.focus();
      }, 120);
    }

    function populateResumoScreen() {
      const mult = getOohMultiplier();
      const hasDig = (cartState.digitalItems || []).length > 0;
      const hasOoh = (cartState.oohItems || []).length > 0;
      const isAgnostic = !hasDig && !hasOoh;

      const accDig = document.getElementById('resumo-accordion-digital');
      const accOoh = document.getElementById('resumo-accordion-ooh');
      if (accDig) accDig.classList.remove('hidden');
      if (accOoh) accOoh.classList.remove('hidden');

      const locEl = document.getElementById('resumo-target-local');
      const intEl = document.getElementById('resumo-target-interesse');
      const ageEl = document.getElementById('resumo-target-idade');
      const genEl = document.getElementById('resumo-target-genero');
      if (locEl) locEl.textContent = isAgnostic ? 'Todos' : (cartState.targetLocation || 'Todos');
      if (intEl) intEl.textContent = isAgnostic ? 'Todos' : (cartState.targetInterest || 'Todos');
      if (ageEl) ageEl.textContent = isAgnostic ? 'Todos' : (cartState.targetAge || 'Todos');
      if (genEl) genEl.textContent = isAgnostic ? 'Todos' : (cartState.targetGender || 'Todos');

      const digListEl = document.getElementById('resumo-digital-list');
      if (digListEl) {
        if (isAgnostic) {
          digListEl.innerHTML = `
            <div class="py-3">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <input type="checkbox" disabled class="w-4 h-4 rounded border-gray-300">
                  <span class="text-xs font-bold text-[#282E38]">Produto Digital selecionado</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="bg-[#282E38] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1">🖥 display / vídeo</span>
                  <button type="button" class="text-gray-400 hover:text-red-600 cursor-pointer" title="Remover produto">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
              <div class="pl-7 mt-3 flex items-start gap-7 text-xs">
                <div>
                  <span class="block text-[11px] text-[#64748B]">impressões</span>
                  <span class="block font-medium text-[#282E38] mt-0.5">—</span>
                </div>
                <div>
                  <span class="block text-[11px] text-[#64748B]">CPM</span>
                  <span class="block font-medium text-[#282E38] mt-0.5">—</span>
                </div>
                <div>
                  <span class="block text-[11px] text-[#64748B]">investimento</span>
                  <strong class="block font-extrabold text-[#282E38] mt-0.5">R$ —</strong>
                </div>
              </div>
            </div>
          `;
        } else if (hasDig) {
          digListEl.innerHTML = cartState.digitalItems.map(item => {
            const estImp = Math.round((item.budget / item.cpm) * 1000);
            const fmtLower = (item.format || 'display').toLowerCase();
            return `
              <div class="py-3">
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" ${item.selectedForBatch ? 'checked' : ''} onchange="toggleItemBatchSelection('digital', '${item.id}', this.checked)" class="w-4 h-4 rounded accent-[#FF4F00] cursor-pointer">
                    <span class="text-xs font-bold text-[#282E38]">${item.title}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="bg-[#282E38] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1">
                      ${item.formatIcon === 'video' ? '▶' : '🖥'} ${fmtLower}
                    </span>
                    <button type="button" onclick="removeSingleCartItem('digital', '${item.id}')" class="text-gray-400 hover:text-red-600 cursor-pointer transition" title="Remover produto">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>
                <div class="pl-7 mt-3 flex items-start gap-7 text-xs">
                  <div>
                    <span class="block text-[11px] text-[#64748B]">impressões</span>
                    <span class="block font-medium text-[#282E38] mt-0.5">${estImp.toLocaleString('pt-BR')}</span>
                  </div>
                  <div>
                    <span class="block text-[11px] text-[#64748B]">CPM</span>
                    <span class="block font-medium text-[#282E38] mt-0.5">${formatBRL(item.cpm)}</span>
                  </div>
                  <div>
                    <span class="block text-[11px] text-[#64748B]">investimento</span>
                    <strong class="block font-extrabold text-[#282E38] mt-0.5">${formatBRL(item.budget)}</strong>
                  </div>
                </div>
              </div>
            `;
          }).join('');
        } else {
          digListEl.innerHTML = `<div class="py-3 px-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-3"><div><p class="text-xs font-bold text-[#282E38]">Nenhum formato Digital adicionado ao plano</p><p class="text-[11px] text-[#64748B] mt-0.5">Combine sua campanha com portais e produtos digitais da Globo.</p></div><button type="button" onclick="switchPlpChannel('digital')" class="px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-gray-50 text-xs font-bold text-[#282E38] shrink-0 cursor-pointer transition">Explorar Digital</button></div>`;
        }
      }

      const oohListEl = document.getElementById('resumo-ooh-list');
      if (oohListEl) {
        if (isAgnostic) {
          oohListEl.innerHTML = `
            <div class="py-3">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                  <input type="checkbox" disabled class="w-4 h-4 rounded border-gray-300">
                  <span class="text-xs font-bold text-[#282E38]">Ponto OOH selecionado</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="bg-[#94A3B8] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1">👁 —</span>
                  <span class="bg-[#E2E8F0] text-[#282E38] text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1">🏢 ambiente</span>
                  <span class="bg-[#3F1195] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1">🖥 formato</span>
                  <button type="button" class="text-gray-400 hover:text-red-600 cursor-pointer" title="Remover ponto">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
              <div class="pl-7 mt-3 flex items-baseline justify-between gap-4">
                <span class="text-[11px] text-[#64748B]">Endereço do ponto selecionado</span>
                <div>
                  <strong class="text-xs font-extrabold text-[#282E38]">R$ —</strong>
                  <span class="text-[11px] text-[#64748B]">/ período</span>
                </div>
              </div>
            </div>
          `;
        } else if (hasOoh) {
          const periodLabel = cartState.durationDays === 28 ? '4 semanas' : '2 semanas';
          oohListEl.innerHTML = cartState.oohItems.map(item => {
            const itemPrice = item.basePrice2w * mult;
            const itemImp = Math.round(item.impressions * (cartState.durationDays === 28 ? 2 : 1));
            const envLabel = (item.environment || 'residencial').toLowerCase();
            const fmtLabel = (item.format || 'digital').toLowerCase();

            return `
              <div class="py-3">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" ${item.selectedForBatch ? 'checked' : ''} onchange="toggleItemBatchSelection('ooh', '${item.id}', this.checked)" class="w-4 h-4 rounded accent-[#FF4F00] cursor-pointer">
                    <span class="text-xs font-bold text-[#282E38]">${item.name}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="bg-[#94A3B8] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1">👁 ${itemImp.toLocaleString('pt-BR')}</span>
                    <span class="bg-[#E2E8F0] text-[#282E38] text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1">🏢 ${envLabel}</span>
                    <span class="bg-[#3F1195] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1">🖥 ${fmtLabel}</span>
                    <button type="button" onclick="removeSingleCartItem('ooh', '${item.id}')" class="text-gray-400 hover:text-red-600 cursor-pointer transition" title="Remover ponto">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>
                <div class="pl-7 mt-3 flex items-baseline justify-between gap-4">
                  <span class="text-[11px] text-[#64748B]">${item.address}</span>
                  <div>
                    <strong class="text-xs font-extrabold text-[#282E38]">${formatBRL(itemPrice)}</strong>
                    <span class="text-[11px] text-[#64748B]">/ ${periodLabel}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('');
        } else {
          oohListEl.innerHTML = `<div class="py-3 px-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-3"><div><p class="text-xs font-bold text-[#282E38]">Nenhum ponto OOH adicionado ao plano</p><p class="text-[11px] text-[#64748B] mt-0.5">Escolha telas residenciais, comerciais, shoppings ou mobiliário urbano no mapa.</p></div><button type="button" onclick="switchPlpChannel('ooh')" class="px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-gray-50 text-xs font-bold text-[#282E38] shrink-0 cursor-pointer transition">Explorar OOH</button></div>`;
        }
      }

      updateBatchBarsUI();
      updateResumoRightCardUI();
      syncPlpStickyBar();
      if (window.AquiAdsUI && window.AquiAdsUI.hooks && typeof window.AquiAdsUI.hooks.afterResumoContent === 'function') {
        const slot = document.getElementById('hook-after-resumo-content');
        const customResumoHtml = window.AquiAdsUI.hooks.afterResumoContent({ cartState, formatBRL, slot });
        if (typeof customResumoHtml === 'string' && slot) {
          slot.innerHTML = customResumoHtml;
        }
      }
    }

    function updateResumoDigitalBudget(id, rawVal) {
      const item = cartState.digitalItems.find(x => x.id === id);
      if (!item) return;
      const minB = item.minBudget || 900;
      item.budget = Math.max(minB, Number(rawVal) || minB);
      populateResumoScreen();
    }

    function removeSingleCartItem(channel, id) {
      if (channel === 'digital') {
        cartState.digitalItems = cartState.digitalItems.filter(x => x.id !== id);
      } else {
        cartState.oohItems = cartState.oohItems.filter(x => x.id !== id);
      }
      populateResumoScreen();
      showToast('Item removido do plano de mídia.');
    }

    // Seleção em lote (exibe barra apenas quando há item marcado)
    function toggleItemBatchSelection(channel, id, checked) {
      const list = channel === 'digital' ? cartState.digitalItems : cartState.oohItems;
      const target = list.find(x => x.id === id);
      if (target) target.selectedForBatch = Boolean(checked);
      populateResumoScreen();
    }

    function toggleSelectAllChannel(channel, checked) {
      const list = channel === 'digital' ? cartState.digitalItems : cartState.oohItems;
      list.forEach(item => { item.selectedForBatch = Boolean(checked); });
      populateResumoScreen();
    }

    function removeBatchSelected(channel) {
      if (channel === 'digital') {
        const removed = cartState.digitalItems.filter(x => x.selectedForBatch).length;
        cartState.digitalItems = cartState.digitalItems.filter(x => !x.selectedForBatch);
        showToast(`${removed} produto(s) Digital removido(s) do plano.`);
      } else {
        const removed = cartState.oohItems.filter(x => x.selectedForBatch).length;
        cartState.oohItems = cartState.oohItems.filter(x => !x.selectedForBatch);
        showToast(`${removed} ponto(s) OOH removido(s) do plano.`);
      }
      populateResumoScreen();
    }

    function updateBatchBarsUI() {
      const digSelected = cartState.digitalItems.filter(x => x.selectedForBatch).length;
      const digBar = document.getElementById('batch-bar-digital');
      const digLabel = document.getElementById('batch-remove-label-digital');
      const digCheckAll = document.getElementById('batch-check-all-digital');
      const digBtnRemove = document.getElementById('batch-btn-remove-digital');
      if (digCheckAll) {
        digCheckAll.checked = cartState.digitalItems.length > 0 && digSelected === cartState.digitalItems.length;
      }
      if (digBtnRemove) {
        if (digSelected > 0) {
          digBtnRemove.classList.remove('hidden');
          digBtnRemove.classList.add('inline-flex');
          if (digLabel) digLabel.textContent = `remover ${digSelected} do plano`;
        } else {
          digBtnRemove.classList.add('hidden');
          digBtnRemove.classList.remove('inline-flex');
        }
      }
      if (digBar) {
        if (digSelected > 0) {
          digBar.classList.remove('hidden');
          digBar.classList.add('flex');
        } else {
          digBar.classList.add('hidden');
          digBar.classList.remove('flex');
        }
      }

      const oohSelected = cartState.oohItems.filter(x => x.selectedForBatch).length;
      const oohBar = document.getElementById('batch-bar-ooh');
      const oohLabel = document.getElementById('batch-remove-label-ooh');
      const oohCheckAll = document.getElementById('batch-check-all-ooh');
      const oohBtnRemove = document.getElementById('batch-btn-remove-ooh');
      if (oohCheckAll) {
        oohCheckAll.checked = cartState.oohItems.length > 0 && oohSelected === cartState.oohItems.length;
      }
      if (oohBtnRemove) {
        if (oohSelected > 0) {
          oohBtnRemove.classList.remove('hidden');
          oohBtnRemove.classList.add('inline-flex');
          if (oohLabel) oohLabel.textContent = `remover ${oohSelected} do plano`;
        } else {
          oohBtnRemove.classList.add('hidden');
          oohBtnRemove.classList.remove('inline-flex');
        }
      }
      if (oohBar) {
        if (oohSelected > 0) {
          oohBar.classList.remove('hidden');
          oohBar.classList.add('flex');
        } else {
          oohBar.classList.add('hidden');
          oohBar.classList.remove('flex');
        }
      }
    }

    function updateResumoCampaignName(val) {
      cartState.campaignName = val;
      const countEl = document.getElementById('resumo-char-count');
      if (countEl) countEl.textContent = `${(val || '').length}/30 caracteres`;
    }

    function updateResumoDuration(daysStr) {
      if (daysStr === 'agnostic') return;
      const days = Number(daysStr) || 14;
      cartState.durationDays = days;
      cartState.endDate = days === 28 ? '25/11/2026' : '11/11/2026';
      const durSelect = document.getElementById('resumo-duration-select');
      if (durSelect) durSelect.value = String(days);
      const endEl = document.getElementById('resumo-end-date');
      if (endEl) endEl.textContent = cartState.endDate;
      populateResumoScreen();
    }

    function updateResumoStartDate(isoVal) {
      if (!isoVal) return;
      const parts = isoVal.split('-');
      if (parts.length === 3) {
        cartState.startDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        const startObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        startObj.setDate(startObj.getDate() + (cartState.durationDays || 14));
        const dd = String(startObj.getDate()).padStart(2, '0');
        const mm = String(startObj.getMonth() + 1).padStart(2, '0');
        const yyyy = startObj.getFullYear();
        cartState.endDate = `${dd}/${mm}/${yyyy}`;
        populateResumoScreen();
      } else if (isoVal.includes('/')) {
        cartState.startDate = isoVal;
        populateResumoScreen();
      }
    }

    function formatAbbrevMil(val, decimals = 2) {
      const n = Number(val) || 0;
      if (n >= 1000) {
        const k = n / 1000;
        const formatted = k.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: decimals });
        return `${formatted} mil`;
      }
      return n.toLocaleString('pt-BR');
    }

    function updateResumoRightCardUI() {
      const hasDig = (cartState.digitalItems || []).length > 0;
      const hasOoh = (cartState.oohItems || []).length > 0;
      const isAgnostic = !hasDig && !hasOoh;

      const nameInput = document.getElementById('resumo-camp-name');
      const countEl = document.getElementById('resumo-char-count');
      const durSelect = document.getElementById('resumo-duration-select');
      const durOptAgnostic = document.getElementById('resumo-dur-opt-agnostic');
      const startInput = document.getElementById('resumo-start-date');
      const endEl = document.getElementById('resumo-end-date');

      if (isAgnostic) {
        if (nameInput && document.activeElement !== nameInput) {
          nameInput.value = cartState.campaignName || '';
        }
        if (countEl) countEl.textContent = `${(cartState.campaignName || '').length}/30 caracteres`;
        if (durOptAgnostic) durOptAgnostic.classList.remove('hidden');
        if (durSelect) durSelect.value = 'agnostic';
        if (startInput && document.activeElement !== startInput) startInput.value = 'dd/mm/aaaa';
        if (endEl) endEl.textContent = 'dd/mm/aaaa';
      } else {
        const activeName = cartState.campaignName || 'Campanha-sem_nome-2026-10-29';
        if (nameInput && document.activeElement !== nameInput) {
          nameInput.value = activeName;
        }
        if (countEl) countEl.textContent = `${activeName.length}/30 caracteres`;
        if (durOptAgnostic) durOptAgnostic.classList.add('hidden');
        if (durSelect) durSelect.value = String(cartState.durationDays || 28);
        if (startInput && document.activeElement !== startInput) startInput.value = cartState.startDate || '29/10/2026';
        if (endEl) endEl.textContent = cartState.endDate || '25/11/2026';
      }

      const pillsWrap = document.getElementById('resumo-summary-tags');
      if (pillsWrap) {
        if (isAgnostic) {
          pillsWrap.innerHTML = `
            <span class="bg-[#E2E8F0] text-[#282E38] text-[10px] font-semibold px-2 py-0.5 rounded-sm inline-flex items-center gap-1">🏢 Ambiente OOH</span>
            <span class="bg-[#E2E8F0] text-[#282E38] text-[10px] font-semibold px-2 py-0.5 rounded-sm inline-flex items-center gap-1">🖥 Digital</span>
          `;
        } else {
          const pills = [];
          if (hasOoh) pills.push(`<span class="bg-[#E2E8F0] text-[#282E38] text-[10px] font-semibold px-2 py-0.5 rounded-sm inline-flex items-center gap-1">🏢 Elevadores Residenciais</span>`);
          if (hasDig) pills.push(`<span class="bg-[#E2E8F0] text-[#282E38] text-[10px] font-semibold px-2 py-0.5 rounded-sm inline-flex items-center gap-1">🖥 Digital</span>`);
          pillsWrap.innerHTML = pills.join('');
        }
      }

      const digBlock = document.getElementById('resumo-perf-digital-block');
      const perfDivider = document.getElementById('resumo-perf-divider');
      const oohBlock = document.getElementById('resumo-perf-ooh-block');
      if (digBlock) {
        if (hasDig || isAgnostic) digBlock.classList.remove('hidden');
        else digBlock.classList.add('hidden');
      }
      if (perfDivider) {
        if ((hasDig && hasOoh) || isAgnostic) perfDivider.classList.remove('hidden');
        else perfDivider.classList.add('hidden');
      }
      if (oohBlock) {
        if (hasOoh || isAgnostic) oohBlock.classList.remove('hidden');
        else oohBlock.classList.add('hidden');
      }

      const digImpEl = document.getElementById('resumo-perf-dig-imp');
      const digPortalsEl = document.getElementById('resumo-perf-dig-portals');
      if (isAgnostic) {
        if (digImpEl) digImpEl.textContent = '—';
        if (digPortalsEl) digPortalsEl.innerHTML = '<span class="text-xs font-extrabold text-[#282E38]">—</span>';
      } else if (hasDig) {
        const digImp = cartState.digitalItems.reduce((acc, d) => acc + Math.round((d.budget / d.cpm) * 1000), 0);
        if (digImpEl) digImpEl.textContent = formatAbbrevMil(digImp, 0);

        if (digPortalsEl) {
          const seen = new Set();
          const badges = [];
          cartState.digitalItems.forEach(item => {
            (item.portalBadges || []).forEach(b => {
              if (!seen.has(b.label)) {
                seen.add(b.label);
                badges.push(b);
              }
            });
          });
          digPortalsEl.innerHTML = badges.map(b =>
            `<span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold leading-none" style="background-color:${b.bg}; color:${b.fg || '#FFFFFF'};">${b.label}</span>`
          ).join('');
        }
      }

      const elOohViews = document.getElementById('resumo-perf-ooh-views');
      const elOohReach = document.getElementById('resumo-perf-ooh-reach');
      const elOohImpact = document.getElementById('resumo-perf-ooh-impact');
      const elOohFreq = document.getElementById('resumo-perf-ooh-freq');
      const elOohScreens = document.getElementById('resumo-perf-ooh-screens');

      if (isAgnostic) {
        if (elOohViews) elOohViews.textContent = '—';
        if (elOohReach) elOohReach.textContent = '—';
        if (elOohImpact) elOohImpact.textContent = '—';
        if (elOohFreq) elOohFreq.textContent = '—';
        if (elOohScreens) elOohScreens.textContent = '—';
      } else if (hasOoh) {
        const durFactor = cartState.durationDays === 28 ? 2 : 1;
        const oohImp = cartState.oohItems.reduce((acc, o) => acc + Math.round(o.impressions * durFactor), 0);
        const oohReach = cartState.oohItems.reduce((acc, o) => acc + o.reach, 0);
        const oohScreens = cartState.oohItems.reduce((acc, o) => acc + o.screens, 0);
        const avgFreq = (cartState.oohItems.reduce((acc, o) => acc + Number(o.freq || 11.1), 0) / cartState.oohItems.length).toFixed(1).replace('.', ',');
        const oohImpact = Math.round(oohReach * 11.1);

        if (elOohViews) elOohViews.textContent = formatAbbrevMil(oohImp, 2);
        if (elOohReach) elOohReach.textContent = oohReach.toLocaleString('pt-BR');
        if (elOohImpact) elOohImpact.textContent = formatAbbrevMil(oohImpact, 2);
        if (elOohFreq) elOohFreq.textContent = avgFreq;
        if (elOohScreens) elOohScreens.textContent = String(oohScreens);
      }

      const { digTotal, oohTotal, subtotal, total } = getCartTotals();
      const rowDig = document.getElementById('resumo-row-val-digital');
      const rowOoh = document.getElementById('resumo-row-val-ooh');
      if (rowDig) {
        if (hasDig || isAgnostic) rowDig.classList.remove('hidden');
        else rowDig.classList.add('hidden');
      }
      if (rowOoh) {
        if (hasOoh || isAgnostic) rowOoh.classList.remove('hidden');
        else rowOoh.classList.add('hidden');
      }

      const elValDig = document.getElementById('resumo-val-digital');
      const elValOoh = document.getElementById('resumo-val-ooh');
      const elValSub = document.getElementById('resumo-val-subtotal');
      const elValTot = document.getElementById('resumo-val-total');
      if (isAgnostic) {
        if (elValDig) elValDig.textContent = 'R$ —';
        if (elValOoh) elValOoh.textContent = 'R$ —';
        if (elValSub) elValSub.textContent = 'R$ —';
        if (elValTot) elValTot.textContent = 'R$ —';
      } else {
        if (elValDig) elValDig.textContent = formatBRL(digTotal);
        if (elValOoh) elValOoh.textContent = formatBRL(oohTotal);
        if (elValSub) elValSub.textContent = formatBRL(subtotal);
        if (elValTot) elValTot.textContent = formatBRL(total);
      }
    }

    // =========================================================================
    // TELA 1.C: ENVIAR CRIATIVO (#view-envio-arte) - 3 SUBVIEWS FIÉIS AO 05
    // =========================================================================
    let uploadedFormatsState = { digital: false, ooh: false };

    function openEnvioArteFromResumo() {
      showScreen('view-envio-arte');
    }

    function populateEnvioArteScreen() {
      const hasDig = (cartState.digitalItems || []).length > 0;
      const hasOoh = (cartState.oohItems || []).length > 0;
      const isEmpty = !hasDig && !hasOoh;

      const campEl = document.getElementById('envio-arte-camp-name');
      const subName = document.getElementById('upload-subview-camp-name');
      const campLabel = cartState.campaignName && cartState.campaignName.trim() ? cartState.campaignName : '—';
      if (campEl) campEl.textContent = campLabel;
      if (subName) subName.textContent = campLabel;

      const urlBlock = document.getElementById('block-url-destino');
      const urlInput = document.getElementById('creative-dest-url');
      if (urlBlock) {
        if (hasDig || isEmpty) urlBlock.classList.remove('hidden');
        else urlBlock.classList.add('hidden');
      }
      if (urlInput && document.activeElement !== urlInput) {
        urlInput.value = cartState.destinationUrl || '';
      }

      const accDig = document.getElementById('upload-acc-digital');
      const accOoh = document.getElementById('upload-acc-ooh');
      if (accDig) {
        if (hasDig || isEmpty) accDig.classList.remove('hidden');
        else accDig.classList.add('hidden');
      }
      if (accOoh) {
        if (hasOoh || isEmpty) accOoh.classList.remove('hidden');
        else accOoh.classList.add('hidden');
      }

      backToArtSelection();
      selectArtCreationMethod(cartState.creativeOption || null);
      updateArtUploadProgressUI();
    }

    function selectArtCreationMethod(method) {
      cartState.creativeOption = method;
      cartState.creativeServiceFee = method === 'contratar' ? 199.99 : 0;

      ['upload', 'modelos', 'contratar'].forEach(m => {
        const card = document.getElementById(`art-method-card-${m}`);
        const radio = document.getElementById(`radio-art-${m}`);
        if (card) {
          if (m === 'contratar') {
            card.className = `rounded-lg border ${m === method ? 'border-2 border-[#FF4F00]' : 'border-gray-200 hover:border-gray-300'} bg-white p-6 cursor-pointer transition flex flex-col justify-between`;
          } else {
            card.className = `rounded-lg border ${m === method ? 'border-2 border-[#FF4F00]' : 'border-gray-200 hover:border-gray-300'} bg-white p-6 cursor-pointer transition flex flex-col`;
          }
        }
        if (radio) {
          radio.checked = (m === method);
        }
      });

      const nextBtn = document.getElementById('art-selection-next-btn');
      if (nextBtn) {
        if (!method) {
          nextBtn.className = 'px-5 py-2.5 rounded-lg bg-[#FF9B71] text-white text-xs font-semibold inline-flex items-center gap-2 cursor-not-allowed transition';
        } else {
          nextBtn.className = 'px-5 py-2.5 rounded-lg bg-[#FF4F00] hover:bg-[#E04600] text-white text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition';
        }
      }

      const briefingBlock = document.getElementById('block-briefing-contratar');
      if (briefingBlock) {
        if (method === 'contratar') briefingBlock.classList.remove('hidden');
        else briefingBlock.classList.add('hidden');
      }
    }

    function proceedFromArtSelection() {
      if (!cartState.creativeOption) return;

      const urlInput = document.getElementById('creative-dest-url');
      if (urlInput) cartState.destinationUrl = urlInput.value.trim();

      const sel = document.getElementById('art-subview-selecao');
      const upl = document.getElementById('art-subview-upload');
      const mod = document.getElementById('art-subview-modelos');

      if (cartState.creativeOption === 'contratar') {
        showToast('Briefing salvo! Serviço de criação adicionado ao plano.');
        goToPagamento();
        return;
      }

      if (sel) sel.classList.add('hidden');
      if (cartState.creativeOption === 'modelos') {
        if (mod) mod.classList.remove('hidden');
        if (upl) upl.classList.add('hidden');
      } else {
        if (upl) upl.classList.remove('hidden');
        if (mod) mod.classList.add('hidden');
        const hasOohOnly = (cartState.oohItems || []).length > 0 && (cartState.digitalItems || []).length === 0;
        switchUploadFormatPreview(hasOohOnly ? 'ooh' : 'digital');
      }
    }

    function backToArtSelection() {
      const sel = document.getElementById('art-subview-selecao');
      const upl = document.getElementById('art-subview-upload');
      const mod = document.getElementById('art-subview-modelos');
      if (sel) sel.classList.remove('hidden');
      if (upl) upl.classList.add('hidden');
      if (mod) mod.classList.add('hidden');
    }

    function switchUploadFormatPreview(channel) {
      const title = document.getElementById('upload-preview-title');
      const sub = document.getElementById('upload-preview-subtitle');
      const ruler = document.getElementById('upload-ooh-safety-ruler');
      const headline = document.getElementById('upload-canvas-headline');

      if (channel === 'ooh') {
        if (title) title.textContent = 'Elevadores Digitais (900x600 px)';
        if (sub) sub.textContent = 'Visualização com margem de segurança OOH';
        if (ruler) ruler.classList.remove('hidden');
        if (headline) headline.textContent = uploadedFormatsState.ooh ? 'Criativo OOH 900x600 Validado ✓' : 'Sua marca nas telas de elevadores';
      } else {
        if (title) title.textContent = 'Banner Retângulo Médio (300x250 px)';
        if (sub) sub.textContent = 'Visualização no inventário Digital | Globo';
        if (ruler) ruler.classList.add('hidden');
        if (headline) headline.textContent = uploadedFormatsState.digital ? 'Banners Portais Globo Validados ✓' : 'Sua campanha em destaque nos Portais Globo';
      }
    }

    function simulateFormatFileUpload(channel) {
      uploadedFormatsState[channel] = true;
      const pill = document.getElementById(`upload-pill-${channel}`);
      if (pill) {
        pill.textContent = '✓ Arquivo validado';
        pill.className = 'text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full';
      }
      switchUploadFormatPreview(channel);
      updateArtUploadProgressUI();
      showToast(`Criativo ${channel === 'ooh' ? 'OOH (900x600)' : 'Digital | Globo (300x250)'} enviado com sucesso!`);
    }

    function updateArtUploadProgressUI() {
      const hasDig = (cartState.digitalItems || []).length > 0;
      const hasOoh = (cartState.oohItems || []).length > 0;
      const totalReq = (hasDig ? 1 : 0) + (hasOoh ? 1 : 0) || 1;
      const done = (hasDig && uploadedFormatsState.digital ? 1 : 0) + (hasOoh && uploadedFormatsState.ooh ? 1 : 0);

      const progTxt = document.getElementById('art-upload-progress-text');
      const badge = document.getElementById('art-upload-status-badge');
      if (progTxt) progTxt.textContent = `${done} de ${totalReq} formatos concluídos`;
      if (badge) {
        if (done >= totalReq) {
          badge.textContent = 'Pronto para pagamento ✓';
          badge.className = 'text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full';
        } else {
          badge.textContent = 'Pendente de envio';
          badge.className = 'text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full';
        }
      }
    }

    function updateReadyTemplatePreview() {
      const hIn = document.getElementById('tpl-headline-input');
      const cIn = document.getElementById('tpl-cta-input');
      const hOut = document.getElementById('tpl-preview-title');
      const cOut = document.getElementById('tpl-preview-cta');
      if (hIn && hOut) hOut.textContent = hIn.value || 'Título da sua campanha';
      if (cIn && cOut) cOut.textContent = cIn.value || 'Saiba mais';
    }

    function generateAiCreativeCopy() {
      const suggestions = [
        { h: 'Condições exclusivas para sua empresa crescer mais rápido', c: 'Solicite proposta hoje' },
        { h: 'Sua marca presente nos melhores pontos e portais do país', c: 'Conheça as ofertas' },
        { h: 'Atendimento especializado perto de você com desconto especial', c: 'Agende agora' }
      ];
      const pick = suggestions[Math.floor(Math.random() * suggestions.length)];
      const hIn = document.getElementById('tpl-headline-input');
      const cIn = document.getElementById('tpl-cta-input');
      if (hIn) hIn.value = pick.h;
      if (cIn) cIn.value = pick.c;
      updateReadyTemplatePreview();
      showToast('Sugestão de texto gerada com IA!');
    }

    function applyReadyTemplateAndContinue() {
      uploadedFormatsState.digital = true;
      uploadedFormatsState.ooh = true;
      showToast('Modelo personalizado aplicado a todos os formatos da campanha!');
      goToPagamento();
    }

    // =========================================================================
    // TELA 1.D: CHECKOUT / PAGAMENTO (#view-pagamento) - FIEL AOS PRINTS 08, 09 E 10
    // =========================================================================
    function goToPagamento() {
      showScreen('view-pagamento');
    }

    function toggleBillingProfile() {
      cartState.billingType = cartState.billingType === 'pf' ? 'pj' : 'pf';
      populateCheckoutScreen();
      const label = cartState.billingType === 'pj' ? 'Pessoa Jurídica (CNPJ)' : 'Pessoa Física (CPF)';
      showToast(`Dados de faturamento alterados para ${label}`);
    }

    function toggleCheckoutFaq(key) {
      const body = document.getElementById(`checkout-faq-body-${key}`);
      const icon = document.getElementById(`checkout-faq-icon-${key}`);
      if (!body) return;
      body.classList.toggle('hidden');
      if (icon) icon.classList.toggle('rotate-180');
    }

    function removeCreativeServiceFromCheckout() {
      cartState.creativeOption = 'enviar';
      cartState.creativeServiceFee = 0;
      populateCheckoutScreen();
      showToast('Serviço de criação de arte removido do resumo.');
    }

    function promptCoupon() {
      showToast('Campo de cupom de desconto aberto!');
    }

    function populateCheckoutScreen() {
      const { digTotal, oohTotal, subtotal, total } = getCartTotals();
      const hasDig = (cartState.digitalItems || []).length > 0;
      const hasOoh = (cartState.oohItems || []).length > 0;
      const isAgnostic = !hasDig && !hasOoh;
      const hasCreativeFee = (cartState.creativeServiceFee || 0) > 0 || cartState.creativeOption === 'contratar';

      const bType = cartState.billingType || 'pf';
      const prof = billingProfiles[bType] || billingProfiles.pf || billingProfiles.pj;
      const bBadge = document.getElementById('billing-profile-badge');
      const bName = document.getElementById('billing-profile-name');
      const bDoc = document.getElementById('billing-profile-doc');
      const bAddr = document.getElementById('billing-profile-address');

      if (bBadge) bBadge.textContent = bType === 'pj' ? 'pessoa jurídica' : 'pessoa física';
      if (isAgnostic) {
        if (bName) bName.textContent = '—';
        if (bDoc) bDoc.textContent = '—';
        if (bAddr) bAddr.textContent = '—';
      } else {
        if (bName) bName.textContent = (prof.name || 'TITULAR DA CONTA').toUpperCase();
        if (bDoc) bDoc.textContent = (prof.documentLabel || '').replace(/^(CPF|CNPJ):\s*/i, '');
        if (bAddr) bAddr.textContent = prof.addressLabel || '';
      }

      const rowDig = document.getElementById('checkout-row-digital');
      const rowOoh = document.getElementById('checkout-row-ooh');
      const rowCreative = document.getElementById('checkout-row-creative-fee');
      const digEl = document.getElementById('checkout-val-digital');
      const oohEl = document.getElementById('checkout-val-ooh');
      const creativeEl = document.getElementById('checkout-val-creative');
      const subEl = document.getElementById('checkout-val-subtotal');
      const totEl = document.getElementById('checkout-val-total');
      const globoCnpjEl = document.getElementById('checkout-globo-cnpj');
      const faqArtEl = document.getElementById('checkout-faq-art');
      const faqArtBodyEl = document.getElementById('checkout-faq-body-art');
      const faqArtIconEl = document.getElementById('checkout-faq-icon-art');
      const gatewayLogoEl = document.getElementById('checkout-gateway-logo');
      const instEl = document.getElementById('checkout-installments-select');

      if (rowDig) {
        if (hasDig || isAgnostic) rowDig.classList.remove('hidden');
        else rowDig.classList.add('hidden');
      }
      if (rowOoh) {
        if (hasOoh || isAgnostic) rowOoh.classList.remove('hidden');
        else rowOoh.classList.add('hidden');
      }
      if (rowCreative) {
        if (hasCreativeFee) rowCreative.classList.remove('hidden');
        else rowCreative.classList.add('hidden');
      }
      if (faqArtEl) {
        if (hasCreativeFee) {
          faqArtEl.classList.remove('hidden');
          if (faqArtBodyEl) faqArtBodyEl.classList.remove('hidden');
          if (faqArtIconEl) faqArtIconEl.classList.add('rotate-180');
        } else {
          faqArtEl.classList.add('hidden');
          if (faqArtBodyEl) faqArtBodyEl.classList.add('hidden');
          if (faqArtIconEl) faqArtIconEl.classList.remove('rotate-180');
        }
      }
      if (globoCnpjEl) {
        if (hasDig || isAgnostic) globoCnpjEl.classList.remove('hidden');
        else globoCnpjEl.classList.add('hidden');
      }
      if (gatewayLogoEl) {
        if (hasOoh && !hasDig) {
          gatewayLogoEl.innerHTML = '<span class="text-[#FF4F00] font-black text-xl tracking-tight">rede</span> <span class="text-[10px] font-bold text-[#FF4F00] uppercase">itaú</span>';
        } else {
          gatewayLogoEl.innerHTML = '<span class="text-[#16A34A] font-black text-xl tracking-tight">stone</span>';
        }
      }

      if (digEl) digEl.textContent = isAgnostic ? 'R$ —' : `${formatBRL(digTotal)}*`;
      if (oohEl) oohEl.textContent = isAgnostic ? 'R$ —' : formatBRL(oohTotal);
      if (creativeEl) creativeEl.textContent = formatBRL(cartState.creativeServiceFee || 199.99);
      if (subEl) subEl.textContent = isAgnostic ? 'R$ —' : formatBRL(subtotal);
      if (totEl) totEl.textContent = isAgnostic ? 'R$ —' : formatBRL(total);

      if (instEl) {
        if (isAgnostic || total <= 0) {
          instEl.innerHTML = `
            <option value="1" selected>1x de R$ — (sem juros)</option>
            <option value="2">2x de R$ — (sem juros)</option>
            <option value="3">3x de R$ — (sem juros)</option>
          `;
        } else {
          instEl.innerHTML = `
            <option value="1" selected>1x de ${formatBRL(total)} (sem juros)</option>
            <option value="2">2x de ${formatBRL(total / 2)} (sem juros)</option>
            <option value="3">3x de ${formatBRL(total / 3)} (sem juros)</option>
          `;
        }
      }

      selectPaymentMethod(cartState.paymentMethod || null);
    }

    function selectPaymentMethod(method) {
      cartState.paymentMethod = method || null;
      ['card', 'pix'].forEach(m => {
        const btn = document.getElementById(`pay-method-${m}`);
        const box = document.getElementById(`pay-form-${m}`);
        const isSelected = m === cartState.paymentMethod;
        if (btn) {
          btn.className = isSelected
            ? 'h-[88px] rounded-xl border border-gray-900 bg-[#F1F5F9] p-4 flex flex-col items-start justify-between text-left cursor-pointer transition'
            : 'h-[88px] rounded-xl border border-gray-200 bg-white hover:border-gray-300 p-4 flex flex-col items-start justify-between text-left cursor-pointer transition';
        }
        if (box) {
          if (isSelected) box.classList.remove('hidden');
          else box.classList.add('hidden');
        }
      });
    }

    function completeCheckoutPurchase() {
      const { total } = getCartTotals();
      const newId = String(Math.floor(751000 + Math.random() * 8999));
      const hasDig = cartState.digitalItems.length > 0;
      const hasOoh = cartState.oohItems.length > 0;
      const channel = (hasDig && hasOoh) ? 'Hibrida' : (hasDig ? 'Digital' : 'OOH');
      const pills = [];
      if (hasOoh) pills.push('OOH');
      if (hasDig) pills.push('DIGITAL');

      campaignsData.unshift({
        id: newId,
        title: cartState.campaignName || 'Nova Campanha Aqui Ads',
        channel,
        formatPills: pills.length ? pills : ['OOH'],
        startDate: cartState.startDate,
        endDate: cartState.endDate,
        duration: cartState.durationDays === 28 ? '28 dias' : '14 dias',
        price: formatBRL(total),
        priceNum: total,
        statusTop: 'anúncio pendente',
        statusSub: 'aguardando aprovação',
        badgeType: 'pending_approval',
        ctaType: 'ver_detalhes',
        image: 'theme_amber',
        deliveryPct: 0,
        oohStats: { days: '0', screens: '4', spaces: '2', impact: '0', reach: '1.460', freq: '11,1', deliv: '0', contr: '40.368', rate: '0%' }
      });

      showScreen('screen-list');
      switchTopTab('planos');
      showToast(`Pedido #${newId} confirmado com sucesso! Sua campanha já está em Meus Anúncios.`);
    }

    // =========================================================================
    // TELA 1.E: RASCUNHOS EM MEUS ANÚNCIOS + SALVAR COMO RASCUNHO
    // =========================================================================
    function openSaveDraftModal() {
      const modal = document.getElementById('modal-save-draft');
      const input = document.getElementById('save-draft-name-input');
      if (input) input.value = cartState.campaignName || 'Campanha Multicanal';
      if (modal) modal.classList.remove('hidden');
    }

    function closeSaveDraftModal() {
      const modal = document.getElementById('modal-save-draft');
      if (modal) modal.classList.add('hidden');
    }

    function confirmSaveDraft() {
      const input = document.getElementById('save-draft-name-input');
      const title = (input ? input.value : '').trim() || cartState.campaignName || 'Novo Rascunho';
      cartState.campaignName = title;

      const hasDig = cartState.digitalItems.length > 0;
      const hasOoh = cartState.oohItems.length > 0;
      const channel = (hasDig && hasOoh) ? 'Hibrida' : (hasDig ? 'Digital' : 'OOH');
      const channelsList = [];
      if (hasOoh) channelsList.push('OOH');
      if (hasDig) channelsList.push('DIGITAL');

      const summaryParts = [];
      if (hasDig) summaryParts.push(`${cartState.digitalItems.length} produto(s) Digital`);
      if (hasOoh) summaryParts.push(`${cartState.oohItems.length} ponto(s) OOH`);

      draftsData.unshift({
        id: 'RASC-' + Math.floor(910 + Math.random() * 89),
        title,
        channel,
        channelsList: channelsList.length ? channelsList : ['OOH'],
        updatedAt: 'Agora mesmo',
        startDate: cartState.startDate,
        endDate: cartState.endDate,
        durationDays: cartState.durationDays,
        expiredDate: false,
        summaryText: summaryParts.join(' + ') || 'Plano personalizado salvo',
        digitalItems: JSON.parse(JSON.stringify(cartState.digitalItems)),
        oohItems: JSON.parse(JSON.stringify(cartState.oohItems))
      });

      closeSaveDraftModal();
      showScreen('screen-list');
      switchTopTab('rascunhos');
      applyDraftFilters();
      showToast(`Rascunho "${title}" salvo em Meus Anúncios!`);
    }

    function setDraftChannelFilter(channel) {
      currentDraftChannelFilter = channel;
      document.querySelectorAll('.draft-channel-pill').forEach(btn => {
        if (btn.dataset.dchannel === channel) {
          btn.className = 'draft-channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#1E2229] text-white border border-[#1E2229] transition cursor-pointer';
        } else {
          btn.className = 'draft-channel-pill px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-gray-700 border border-gray-300 hover:border-gray-500 transition cursor-pointer';
        }
      });
      applyDraftFilters();
    }

    function resetDraftFilters() {
      const s = document.getElementById('draft-filter-search');
      const d1 = document.getElementById('draft-filter-start');
      const d2 = document.getElementById('draft-filter-end');
      if (s) s.value = '';
      if (d1) d1.value = '';
      if (d2) d2.value = '';
      setDraftChannelFilter('todos');
      showToast('Filtros de rascunhos limpos.');
    }

    function calcDraftTotal(d) {
      const mult = d.durationDays === 28 ? 1.85 : 1;
      const dig = (d.digitalItems || []).reduce((acc, x) => acc + (Number(x.budget) || 0), 0);
      const ooh = (d.oohItems || []).reduce((acc, x) => acc + (x.basePrice2w * mult), 0);
      return dig + ooh;
    }

    function applyDraftFilters() {
      const grid = document.getElementById('drafts-grid-container');
      const emptyEl = document.getElementById('drafts-empty-state');
      if (!grid) return;

      const q = (document.getElementById('draft-filter-search')?.value || '').toLowerCase().trim();

      const countAll = draftsData.length;
      const countOoh = draftsData.filter(d => d.channel === 'OOH').length;
      const countDig = draftsData.filter(d => d.channel === 'Digital').length;
      const countMulti = draftsData.filter(d => d.channel === 'Multicanal' || d.channel === 'Hibrida').length;

      const elTopTab = document.getElementById('drafts-tab-count');
      if (elTopTab) elTopTab.textContent = countAll;

      document.querySelectorAll('.draft-channel-pill').forEach(btn => {
        const ch = btn.dataset.dchannel;
        if (ch === 'todos') btn.textContent = `Todos (${countAll})`;
        else if (ch === 'OOH') btn.textContent = `OOH (${countOoh})`;
        else if (ch === 'Digital') btn.textContent = `Digital | Globo (${countDig})`;
        else if (ch === 'Hibrida') btn.textContent = `Híbrida (${countMulti})`;
      });

      const filtered = draftsData.filter(d => {
        const matchQ = !q || d.title.toLowerCase().includes(q) || d.summaryText.toLowerCase().includes(q) || d.id.toLowerCase().includes(q);
        const normCh = d.channel === 'Multicanal' ? 'Hibrida' : d.channel;
        const matchCh = currentDraftChannelFilter === 'todos' || normCh === currentDraftChannelFilter;
        return matchQ && matchCh;
      });

      if (filtered.length === 0) {
        grid.classList.add('hidden');
        if (emptyEl) emptyEl.classList.remove('hidden');
      } else {
        grid.classList.remove('hidden');
        if (emptyEl) emptyEl.classList.add('hidden');
      }

      grid.innerHTML = filtered.map(d => {
        const total = calcDraftTotal(d);
        const isDigitalOnly = d.channel === 'Digital';
        const coverGradient = isDigitalOnly
          ? 'from-[#EEF4FF] to-[#DBEAFE]'
          : 'from-[#FFF4ED] to-[#FFEDD5]';

        return `
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition">
            <div>
              <div class="h-24 bg-gradient-to-br ${coverGradient} p-3.5 flex items-start justify-between border-b border-gray-100">
                <div class="flex items-center gap-1.5 flex-wrap">
                  ${d.channelsList.map(ch => `<span class="bg-white/95 text-gray-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded shadow-2xs">${ch}</span>`).join('')}
                </div>
                <span class="text-[10px] font-semibold text-gray-600 bg-white/80 px-2 py-0.5 rounded">Salvo: ${d.updatedAt}</span>
              </div>

              <div class="p-4">
                <h4 class="text-sm font-bold text-gray-900 leading-snug">${d.title}</h4>
                <p class="text-[11px] text-gray-500 mt-1">${d.summaryText}</p>

                <div class="mt-3 pt-3 border-t border-gray-100 space-y-1.5 text-[11px]">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">Período planejado:</span>
                    <span class="font-semibold ${d.expiredDate ? 'text-amber-700' : 'text-gray-800'}">${d.startDate} a ${d.endDate}</span>
                  </div>
                  ${d.expiredDate ? `<p class="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">Período expirado — ao editar, a data será ajustada automaticamente.</p>` : ''}
                  <div class="flex items-center justify-between pt-1">
                    <span class="text-gray-500">Valor estimado:</span>
                    <strong class="text-sm font-extrabold text-gray-900">${formatBRL(total)}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-4 pb-4 pt-2 flex items-center gap-2.5">
              <button type="button" onclick="deleteDraftItem('${d.id}')" class="flex-1 py-2 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 inline-flex items-center justify-center gap-1.5 cursor-pointer transition">
                <svg class="w-3.5 h-3.5" style="color:#4B5563" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                <span>excluir</span>
              </button>
              <button type="button" onclick="openDraftInSummary('${d.id}')" class="flex-1 py-2 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-800 inline-flex items-center justify-center gap-1.5 cursor-pointer transition">
                <svg class="w-3.5 h-3.5" style="color:#4B5563" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span>editar</span>
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    function deleteDraftItem(draftId) {
      const target = draftsData.find(d => d.id === draftId);
      draftsData = draftsData.filter(d => d.id !== draftId);
      applyDraftFilters();
      showToast(`Rascunho "${target ? target.title : draftId}" excluído.`);
    }

    function openDraftInSummary(draftId) {
      const d = draftsData.find(x => x.id === draftId);
      if (!d) return;

      cartState.campaignName = d.title.slice(0, 30);
      cartState.durationDays = d.durationDays || 14;
      if (d.expiredDate) {
        cartState.startDate = '28/10/2026';
        cartState.endDate = cartState.durationDays === 28 ? '25/11/2026' : '11/11/2026';
      } else {
        cartState.startDate = d.startDate;
        cartState.endDate = d.endDate;
      }
      cartState.digitalItems = JSON.parse(JSON.stringify(d.digitalItems || []));
      cartState.oohItems = JSON.parse(JSON.stringify(d.oohItems || []));

      showScreen('view-resumo');
      if (d.expiredDate) {
        showToast('Período anterior expirado: datas atualizadas automaticamente para 28/10/2026!');
      } else {
        showToast(`Rascunho "${d.title}" carregado no Plano de mídia!`);
      }
    }

// 4. Aliases Globais de Compatibilidade (Retrocompatibilidade 100% com Protótipos)
window.switchMainScreen = showScreen;
window.setPlpChannel = switchPlpChannel;
window.togglePointInCart = toggleOohCatalogItem;
window.openPointModal = openOohPointModal;
window.renderResumoView = populateResumoScreen;

// 5. API Pública Modular (window.AquiAdsUI)
window.AquiAdsUI = {
  version: '2.0.0-smb-web',
  mounted: false,
  config: {
    initialScreen: 'view-resultados',
    initialChannel: 'ooh',
    initialTab: 'planos',
    cartPreset: 'empty',
    shellOnly: false
  },
  hooks: {},

  registerHooks(hooksObj) {
    if (hooksObj && typeof hooksObj === 'object') {
      Object.assign(this.hooks, hooksObj);
    }
    return this;
  },

  getState() {
    return {
      cartState: typeof cartState !== 'undefined' ? cartState : null,
      oohCatalog: typeof oohCatalog !== 'undefined' ? oohCatalog : [],
      digitalSections: typeof digitalSections !== 'undefined' ? digitalSections : [],
      digitalCatalog: typeof digitalCatalog !== 'undefined' ? digitalCatalog : [],
      mediaPlansCatalog: typeof campaignsData !== 'undefined' ? campaignsData : [],
      draftsCatalog: typeof draftsData !== 'undefined' ? draftsData : [],
      currentPlpChannel: typeof currentPlpChannel !== 'undefined' ? currentPlpChannel : 'ooh',
      currentOohAmbience: typeof currentOohAmbience !== 'undefined' ? currentOohAmbience : 'todos'
    };
  },

  setCartPreset(presetKey, silent = false) {
    const normalizedKey = presetKey === 'midiaMista' ? 'hybrid'
      : presetKey === 'ooh_only' ? 'oohOnly'
      : presetKey === 'digital_only' ? 'digitalOnly'
      : presetKey;
    loadCartPreset(normalizedKey, silent);
  },

  refresh() {
    if (!this.config.shellOnly) {
      renderOohPlp();
      renderDigitalPlp();
      syncPlpStickyBar();
      populateResumoScreen();
      populateEnvioArteScreen();
      populateCheckoutScreen();
    }
  },

  mount(selectorOrConfig, optionalConfig) {
    const resolvedCustomConfig = (typeof selectorOrConfig === 'string')
      ? (optionalConfig || {})
      : (selectorOrConfig || {});
    const mergedConfig = Object.assign({}, this.config, window.AQUI_ADS_CONFIG || {}, resolvedCustomConfig);
    if (!resolvedCustomConfig.initialScreen && resolvedCustomConfig.initialView) {
      const viewAliasMap = {
        'resultados': 'view-resultados',
        'resumo': 'view-resumo',
        'envio-arte': 'view-envio-arte',
        'pagamento': 'view-pagamento',
        'checkout': 'view-pagamento',
        'list': 'screen-list',
        'detail': 'screen-detail'
      };
      mergedConfig.initialScreen = viewAliasMap[resolvedCustomConfig.initialView] || resolvedCustomConfig.initialView;
    }
    this.config = mergedConfig;
    if (mergedConfig.hooks) {
      this.registerHooks(mergedConfig.hooks);
    }

    // Injetar Shell no DOM caso ainda não esteja montado
    if (!document.getElementById('main-header')) {
      document.body.className = 'bg-white text-gray-900 antialiased min-h-screen flex flex-col';

      // Preservar conteúdo customizado se existir #custom-prototype-root ou #aqui-ads-custom-content no HTML
      const existingCustomNode = document.getElementById('custom-prototype-root') || document.getElementById('aqui-ads-custom-content');
      const preservedCustomHtml = existingCustomNode ? existingCustomNode.innerHTML : '';
      if (existingCustomNode) existingCustomNode.remove();

      const centerViewsHtml = mergedConfig.shellOnly
        ? '<main id="custom-prototype-root" class="flex-1 bg-[#F8F9FA] apply-zoom">' + preservedCustomHtml + '</main>'
        : AQUI_ADS_JOURNEY_VIEWS_HTML;

      const existingShellRoot = document.getElementById('aqui-ads-shell-root');
      if (existingShellRoot) {
        existingShellRoot.className = 'flex-1 flex flex-col min-h-screen';
        existingShellRoot.innerHTML = AQUI_ADS_SHELL_HEADER_HTML + centerViewsHtml + AQUI_ADS_SHELL_FOOTER_HTML;
      } else {
        const mountContainer = document.getElementById('aqui-ads-app') || document.body;
        const wrapper = document.createElement('div');
        wrapper.id = 'aqui-ads-shell-root';
        wrapper.className = 'flex-1 flex flex-col min-h-screen';
        wrapper.innerHTML = AQUI_ADS_SHELL_HEADER_HTML + centerViewsHtml + AQUI_ADS_SHELL_FOOTER_HTML;

        if (mountContainer === document.body) {
          document.body.insertBefore(wrapper, document.body.firstChild);
        } else {
          mountContainer.innerHTML = '';
          mountContainer.appendChild(wrapper);
        }
      }
    }

    this.mounted = true;

    // Executar hooks estruturais de topo
    if (typeof this.hooks.afterHeader === 'function') {
      const slot = document.getElementById('hook-after-header');
      const res = this.hooks.afterHeader(this);
      if (typeof res === 'string' && slot) slot.innerHTML = res;
    }

    if (!mergedConfig.shellOnly) {
      if (typeof this.hooks.beforeResultsContent === 'function') {
        const slot = document.getElementById('hook-before-results-content');
        const res = this.hooks.beforeResultsContent(this);
        if (typeof res === 'string' && slot) slot.innerHTML = res;
      }

      const presetKey = mergedConfig.cartPreset || 'empty';
      if (presetKey && presetKey !== 'empty') {
        this.setCartPreset(presetKey, true);
      } else {
        loadCartPreset('empty', true);
      }

      applyCampaignFilters();
      applyDraftFilters();
      initDigitalChart();
      renderOohPlp();
      renderDigitalPlp();
      syncPlpStickyBar();
      populateResumoScreen();
      populateEnvioArteScreen();
      populateCheckoutScreen();

      const initScreen = mergedConfig.initialScreen || 'view-resultados';
      const initChannel = mergedConfig.initialChannel || 'ooh';
      const initTab = mergedConfig.initialTab || 'planos';

      if (initScreen === 'view-resultados') {
        switchPlpChannel(initChannel);
      } else {
        showScreen(initScreen);
        if (initScreen === 'screen-list') {
          switchTopTab(initTab);
        }
      }
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons(); } catch (e) {}
    }

    if (typeof this.hooks.onReady === 'function') {
      this.hooks.onReady(this);
    }

    return this;
  }
};

// Auto-mount ao carregar o DOM (a menos que window.AQUI_ADS_MANUAL_MOUNT === true)
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    if (!window.AQUI_ADS_MANUAL_MOUNT && !window.AquiAdsUI.mounted) {
      window.AquiAdsUI.mount();
    }
  });
} else {
  if (!window.AQUI_ADS_MANUAL_MOUNT && !window.AquiAdsUI.mounted) {
    window.AquiAdsUI.mount();
  }
}