/**
 * BANCO DE DADOS MOCKADO AGNÓSTICO E CENTRALIZADO — AQUI ADS (ESPELHO DE PRODUÇÃO)
 * Fonte única da verdade para todas as telas dos templates higienizados.
 * 100% agnóstico (zero nomes de clientes reais) e fiel aos prints de produção.
 */
window.AQUI_ADS_MOCK_DATA = {
  // 1. Catálogo OOH (Pontos Reais do CDN Eletromidia + Coordenadas Vila Olímpia/Itaim)
  oohCatalog: [
    {
      id: 'vn-alvorada',
      name: 'VN Alvorada 1217',
      address: 'Rua Alvorada, 1217 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Alvorada, 1217 - Vila Olímpia, São Paulo - SP, 04550-004',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000015387.webp',
      lat: -23.5972,
      lng: -46.6815,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '65 m',
      views2w: 16200,
      viewsText: '16,2 mil',
      reach2w: 872,
      reachText: '872',
      impact2w: 16200,
      frequency2w: 11,
      screens: 2,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'the-world-hotels',
      name: 'The World Hotels',
      address: 'Rua Gomes de Carvalho, 1005 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Gomes de Carvalho, 1005 - Vila Olímpia, São Paulo - SP, 04547-004',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000019950.webp',
      lat: -23.5955,
      lng: -46.6845,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '155 m',
      views2w: 10080,
      viewsText: '10,08 mil',
      reach2w: 533,
      reachText: '533',
      impact2w: 10080,
      frequency2w: 16,
      screens: 3,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'solar-vila-olimpia',
      name: 'Solar Vila Olímpia',
      address: 'Rua Alvorada, 1047 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Alvorada, 1047 - Vila Olímpia, São Paulo - SP, 04550-004',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000028368.webp',
      lat: -23.5982,
      lng: -46.6805,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '167 m',
      views2w: 10800,
      viewsText: '10,8 mil',
      reach2w: 587,
      reachText: '587',
      impact2w: 10800,
      frequency2w: 11,
      screens: 1,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'clodomiro-amazonas',
      name: 'Clodomiro Amazonas',
      address: 'Rua Clodomiro Amazonas, 1435 - Vila Nova Conceição, São Paulo',
      fullAddress: 'Rua Clodomiro Amazonas, 1435 - Vila Nova Conceição, São Paulo - SP, 04537-012',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010445.webp',
      lat: -23.5915,
      lng: -46.6752,
      environmentLabel: 'elevadores comerciais',
      environmentShort: 'comercial',
      format: 'digital',
      distance: '178 m',
      views2w: 40320,
      viewsText: '40,32 mil',
      reach2w: 2240,
      reachText: '2,24 mil',
      impact2w: 40320,
      frequency2w: 12,
      screens: 6,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 915.70,
      price4w: 1648.26
    },
    {
      id: 'palazzo-residencial',
      name: 'Palazzo Residencial',
      address: 'Rua Alvorada, 1022 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Alvorada, 1022 - Vila Olímpia, São Paulo - SP, 04550-004',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025224.webp',
      lat: -23.5948,
      lng: -46.6872,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '184 m',
      towersBadge: 'condomínio • 2 torres',
      views2w: 57020,
      viewsText: '57,02 mil',
      reach2w: 2880,
      reachText: '2,88 mil',
      impact2w: 57020,
      frequency2w: 12,
      screens: 14,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 3751.48,
      price4w: 6752.66
    },
    {
      id: 'atilio-innocenti',
      name: 'Atilio Innocenti',
      address: 'Rua Atílio Innocenti, 474 - Vila Nova Conceição, São Paulo',
      fullAddress: 'Rua Atílio Innocenti, 474 - Vila Nova Conceição, São Paulo - SP, 04538-001',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000000484.webp',
      lat: -23.5938,
      lng: -46.6859,
      environmentLabel: 'elevadores comerciais',
      environmentShort: 'comercial',
      format: 'digital',
      distance: '196 m',
      views2w: 30240,
      viewsText: '30,24 mil',
      reach2w: 924,
      reachText: '924',
      impact2w: 30240,
      frequency2w: 12,
      screens: 3,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 557.42,
      price4w: 1003.35
    },
    {
      id: 'le-premier',
      name: 'Le Premier',
      address: 'Rua Doutor Cardoso de Melo, 900 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Doutor Cardoso de Melo, 900 - Vila Olímpia, São Paulo - SP, 04548-003',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000029588.webp',
      lat: -23.5998,
      lng: -46.6788,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '216 m',
      views2w: 7200,
      viewsText: '7,2 mil',
      reach2w: 284,
      reachText: '284',
      impact2w: 7200,
      frequency2w: 15,
      screens: 1,
      favorite: true,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'piazza-navona',
      name: 'Piazza Navona',
      address: 'Rua Ministro Jesuíno Cardoso, 566 - Vila Nova Conceição, São Paulo',
      fullAddress: 'Rua Ministro Jesuíno Cardoso, 566 - Vila Nova Conceição, São Paulo - SP, 04544-051',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010192.webp',
      lat: -23.5952,
      lng: -46.6889,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '228 m',
      views2w: 21600,
      viewsText: '21,6 mil',
      reach2w: 756,
      reachText: '756',
      impact2w: 21600,
      frequency2w: 17,
      screens: 2,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'transatlantico',
      name: 'Transatlântico',
      address: 'Rua Gomes de Carvalho, 1306 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Gomes de Carvalho, 1306 - Vila Olímpia, São Paulo - SP, 04547-005',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025342.webp',
      lat: -23.5965,
      lng: -46.6828,
      environmentLabel: 'elevadores comerciais',
      environmentShort: 'comercial',
      format: 'digital',
      distance: '232 m',
      views2w: 36000,
      viewsText: '36 mil',
      reach2w: 2330,
      reachText: '2,33 mil',
      impact2w: 36000,
      frequency2w: 11,
      screens: 4,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 610.46,
      price4w: 1098.82
    },
    {
      id: 'vila-olimpia-1195',
      name: 'Vila Olimpia',
      address: 'Rua Gomes de Carvalho, 1195 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Gomes de Carvalho, 1195 - Vila Olímpia, São Paulo - SP, 04547-004',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000036468.webp',
      lat: -23.5979,
      lng: -46.6836,
      environmentLabel: 'elevadores comerciais',
      environmentShort: 'comercial',
      format: 'digital',
      distance: '240 m',
      views2w: 14400,
      viewsText: 'Fixa',
      reach2w: 720,
      reachText: '720',
      impact2w: 14400,
      frequency2w: 8,
      screens: 3,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'sp-gomes-de-carvalho',
      name: 'SP Gomes de Carvalho',
      address: 'Rua Gomes de Carvalho, 911 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Gomes de Carvalho, 911 - Vila Olímpia, São Paulo - SP, 04547-003',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010651.webp',
      lat: -23.5961,
      lng: -46.6819,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '248 m',
      views2w: 10080,
      viewsText: '10,08 mil',
      reach2w: 533,
      reachText: '533',
      impact2w: 10080,
      frequency2w: 16,
      screens: 2,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'o-2000',
      name: 'O.2000',
      address: 'Rua Gomes de Carvalho, 1065 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Gomes de Carvalho, 1065 - Vila Olímpia, São Paulo - SP, 04547-004',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000015387.webp',
      lat: -23.5958,
      lng: -46.6841,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '254 m',
      views2w: 16200,
      viewsText: '16,2 mil',
      reach2w: 872,
      reachText: '872',
      impact2w: 16200,
      frequency2w: 11,
      screens: 2,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'dr-cardoso-de-melo',
      name: 'Dr. Cardoso de Melo',
      address: 'Rua Doutor Cardoso de Melo, 1155 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Doutor Cardoso de Melo, 1155 - Vila Olímpia, São Paulo - SP, 04548-004',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000000773.webp',
      lat: -23.5988,
      lng: -46.6851,
      environmentLabel: 'elevadores comerciais',
      environmentShort: 'comercial',
      format: 'digital',
      distance: '260 m',
      views2w: 50400,
      viewsText: '50,4 mil',
      reach2w: 2880,
      reachText: '2,88 mil',
      impact2w: 50400,
      frequency2w: 12,
      screens: 5,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 763.08,
      price4w: 1373.54
    },
    {
      id: 'edificio-ouro-verde',
      name: 'Edifício Ouro Verde',
      address: 'Rua Alvorada, 899 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Alvorada, 899 - Vila Olímpia, São Paulo - SP, 04550-003',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025342.webp',
      lat: -23.5974,
      lng: -46.6812,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '268 m',
      views2w: 10800,
      viewsText: '10,8 mil',
      reach2w: 587,
      reachText: '587',
      impact2w: 10800,
      frequency2w: 11,
      screens: 1,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'netuno-building',
      name: 'Netuno Building',
      address: 'Rua Fidêncio Ramos, 223 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Fidêncio Ramos, 223 - Vila Olímpia, São Paulo - SP, 04551-010',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010445.webp',
      lat: -23.5945,
      lng: -46.6881,
      environmentLabel: 'elevadores comerciais',
      environmentShort: 'comercial',
      format: 'digital',
      distance: '275 m',
      views2w: 122400,
      viewsText: '122,4 mil',
      reach2w: 7350,
      reachText: '7,35 mil',
      impact2w: 122400,
      frequency2w: 11,
      screens: 10,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 1526.16,
      price4w: 2747.08
    },
    {
      id: 'esplanada-vila-olimpia',
      name: 'Esplanada Vila Olímpia',
      address: 'Rua Alvorada, 780 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Alvorada, 780 - Vila Olímpia, São Paulo - SP, 04550-003',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000028368.webp',
      lat: -23.5991,
      lng: -46.6795,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '282 m',
      views2w: 16200,
      viewsText: '16,2 mil',
      reach2w: 872,
      reachText: '872',
      impact2w: 16200,
      frequency2w: 11,
      screens: 2,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'montreal',
      name: 'Montreal',
      address: 'Rua Gomes de Carvalho, 830 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Gomes de Carvalho, 830 - Vila Olímpia, São Paulo - SP, 04547-003',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000019950.webp',
      lat: -23.5969,
      lng: -46.6821,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '290 m',
      views2w: 10800,
      viewsText: '10,8 mil',
      reach2w: 587,
      reachText: '587',
      impact2w: 10800,
      frequency2w: 11,
      screens: 1,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'millenium-tower',
      name: 'Millenium Tower',
      address: 'Rua Doutor Cardoso de Melo, 1340 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Doutor Cardoso de Melo, 1340 - Vila Olímpia, São Paulo - SP, 04548-004',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000036468.webp',
      lat: -23.5983,
      lng: -46.6862,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '298 m',
      views2w: 32400,
      viewsText: '32,4 mil',
      reach2w: 872,
      reachText: '872',
      impact2w: 32400,
      frequency2w: 11,
      screens: 2,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 915.70,
      price4w: 1648.26
    },
    {
      id: 'marques-office-center',
      name: 'Marquês Office Center',
      address: 'Rua Fidêncio Ramos, 195 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Fidêncio Ramos, 195 - Vila Olímpia, São Paulo - SP, 04551-010',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000000484.webp',
      lat: -23.5949,
      lng: -46.6892,
      environmentLabel: 'elevadores comerciais',
      environmentShort: 'comercial',
      format: 'digital',
      distance: '305 m',
      views2w: 36000,
      viewsText: '36 mil',
      reach2w: 924,
      reachText: '924',
      impact2w: 36000,
      frequency2w: 12,
      screens: 6,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 882.79,
      price4w: 1589.02
    },
    {
      id: 'residencial-vila-olimpia',
      name: 'Residencial Vila Olímpia',
      address: 'Rua Alvorada, 1100 - Vila Olímpia, São Paulo',
      fullAddress: 'Rua Alvorada, 1100 - Vila Olímpia, São Paulo - SP, 04550-004',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010192.webp',
      lat: -23.5976,
      lng: -46.6818,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '312 m',
      views2w: 10800,
      viewsText: '10,8 mil',
      reach2w: 587,
      reachText: '587',
      impact2w: 10800,
      frequency2w: 11,
      screens: 1,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 264.96,
      price4w: 476.92
    },
    {
      id: 'solar-santo-antonio',
      name: 'Solar Santo Antônio',
      address: 'Rua Santo Antônio, 650 - Centro, Juiz de Fora',
      fullAddress: 'Rua Santo Antônio, 650 - Centro, Juiz de Fora - MG, 36015-001',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000029588.webp',
      lat: -23.5965,
      lng: -46.6828,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '90 m',
      views2w: 20184,
      viewsText: '20,18 mil',
      reach2w: 1121,
      reachText: '1,12 mil',
      impact2w: 20184,
      frequency2w: 18,
      screens: 1,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 225.43,
      price4w: 405.77
    },
    {
      id: 'edificio-saint-martin',
      name: 'Edifício Saint Martin',
      address: 'Rua Espírito Santo, 1115 - Centro, Juiz de Fora',
      fullAddress: 'Rua Espírito Santo, 1115 - Centro, Juiz de Fora - MG, 36016-200',
      photo: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010651.webp',
      lat: -23.5979,
      lng: -46.6836,
      environmentLabel: 'elevadores residenciais',
      environmentShort: 'residencial',
      format: 'digital',
      distance: '110 m',
      views2w: 15816,
      viewsText: '15,81 mil',
      reach2w: 879,
      reachText: '879',
      impact2w: 15816,
      frequency2w: 18,
      screens: 1,
      dimension: '800x600px',
      hasSafetyRuler62px: true,
      price2w: 225.43,
      price4w: 405.77
    },
    {
      id: 'ponto-onibus-pacaembu-35',
      name: 'AV PACAEMBU, 35 X R BRIG GALVÃO',
      address: 'AV PACAEMBU - 35 , PACAEMBU - São Paulo',
      fullAddress: 'Av. Pacaembu, 35 - Pacaembu, São Paulo - SP',
      photo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
      lat: -23.5315,
      lng: -46.6602,
      environmentLabel: 'ponto de ônibus',
      environmentShort: 'onibus',
      format: 'impresso',
      distance: '120 m',
      views2w: 85000,
      viewsText: 'Fixa',
      reach2w: 1710000,
      reachText: '1,71 mi',
      impact2w: 85000,
      frequency2w: 3,
      screens: 1,
      dimension: 'Mobiliário Urbano',
      hasSafetyRuler62px: false,
      price2w: 2135.00,
      price4w: 3946.80
    }
  ],

  // 2. Seções Oficiais da Página de Resultados Digital (6 seções na ordem exata de produção)
  digitalSections: [
    'Notícias & Grandes Portais',
    'Negócios e finanças',
    'Automotivo & Tecnologia',
    'Estilo de Vida',
    'Casa & Família',
    'Vídeo & Entretenimento'
  ],

  // 3. Catálogo Digital (20 produtos oficiais nas 6 seções)
  digitalCatalog: [
    // Seção 1: Notícias & Grandes Portais
    {
      id: 'display-portais-globo',
      section: 'Notícias & Grandes Portais',
      name: 'Display - Portais Globo',
      format: 'display',
      cpm: 9.60,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie em grandes portais da Globo e ganhe visibilidade em conteúdos de notícias, esportes e entretenimento.',
      photo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'g1', color: '#C4170C' },
        { label: 'ge', color: '#06AA48' },
        { label: 'gshow', color: '#FF6700' },
        { label: 'receitas', color: '#9B111E' },
        { label: 'globo.com', color: '#005CEF' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'video-15s-portais-globo',
      section: 'Notícias & Grandes Portais',
      name: 'Vídeo de 15 segundos - Portais Globo',
      format: 'vídeo',
      cpm: 40.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'exibições',
      description: 'Anuncie com vídeos de 15 segundos não puláveis em grandes portais da Globo e ganhe visibilidade em conteúdos de notícias, esportes e entretenimento.',
      photo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'g1', color: '#C4170C' },
        { label: 'ge', color: '#06AA48' },
        { label: 'gshow', color: '#FF6700' },
        { label: 'receitas', color: '#9B111E' },
        { label: 'globo.com', color: '#005CEF' }
      ],
      creativeFormats: ['1920x1080px (MP4 15s)']
    },
    {
      id: 'video-30s-portais-globo',
      section: 'Notícias & Grandes Portais',
      name: 'Vídeo de 30 a 120 segundos - Portais Globo',
      format: 'vídeo',
      cpm: 70.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'exibições',
      description: 'Anuncie com vídeos de 30 a 120 segundos em grandes portais da Globo e apresente sua marca com mais profundidade em conteúdos de notícias, esportes e entretenimento.',
      photo: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'g1', color: '#C4170C' },
        { label: 'ge', color: '#06AA48' },
        { label: 'gshow', color: '#FF6700' },
        { label: 'receitas', color: '#9B111E' },
        { label: 'globo.com', color: '#005CEF' }
      ],
      creativeFormats: ['1920x1080px (MP4 30s-120s)']
    },
    {
      id: 'display-extra',
      section: 'Notícias & Grandes Portais',
      name: 'Display - Extra',
      format: 'display',
      cpm: 11.50,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no jornal digital Extra, portal de notícias de grande alcance popular, e ganhe visibilidade entre milhões de leitores em todo o país.',
      photo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Extra', color: '#111827' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'display-galileu',
      section: 'Notícias & Grandes Portais',
      name: 'Display - Galileu',
      format: 'display',
      cpm: 15.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no site da revista Galileu e conecte sua marca a conteúdos de ciência, inovação e cultura.',
      photo: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Galileu', color: '#111827' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'display-globo-rural',
      section: 'Notícias & Grandes Portais',
      name: 'Display - Globo Rural',
      format: 'display',
      cpm: 20.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no portal Globo Rural e impacte um público interessado em agronegócio, economia rural e sustentabilidade.',
      photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Globo Rural', color: '#2E7D32' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'display-o-globo',
      section: 'Notícias & Grandes Portais',
      name: 'Display - O Globo',
      format: 'display',
      cpm: 16.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no jornal digital O Globo, um dos veículos de notícias mais tradicionais e influentes do país, e associe sua marca a informação de alta credibilidade.',
      photo: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'O Globo', color: '#1E3A8A' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },

    // Seção 2: Negócios e finanças
    {
      id: 'display-epoca-negocios',
      section: 'Negócios e finanças',
      name: 'Display - Época Negócios',
      format: 'display',
      cpm: 25.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no site da revista Época Negócios e posicione sua marca junto a conteúdos sobre inovação, liderança, gestão e tendências do mercado.',
      photo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Época Negócios', color: '#111827' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'display-pegn',
      section: 'Negócios e finanças',
      name: 'Display - Pequenas Empresas & Grandes Negócios',
      format: 'display',
      cpm: 20.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no site da revista Pequenas Empresas & Grandes Negócios e conecte sua marca a empreendedores, gestores e interessados em inovação e oportunidades de mercado.',
      photo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Pequenas Empresas & Grandes Negócios', color: '#EA580C' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'display-valor-investe',
      section: 'Negócios e finanças',
      name: 'Display - Valor Investe',
      format: 'display',
      cpm: 25.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no portal Valor Investe e conecte sua marca a leitores interessados em investimentos, finanças pessoais e educação financeira.',
      photo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Valor Investe', color: '#312E81' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'display-valor-economico',
      section: 'Negócios e finanças',
      name: 'Display - Valor Econômico',
      format: 'display',
      cpm: 35.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no jornal digital Valor Econômico, referência em economia, negócios e finanças no Brasil, e conecte sua marca a um público qualificado e tomador de decisão.',
      photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Valor Econômico', color: '#0F766E' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },

    // Seção 3: Automotivo & Tecnologia
    {
      id: 'display-auto-esporte',
      section: 'Automotivo & Tecnologia',
      name: 'Display - Auto Esporte',
      format: 'display',
      cpm: 20.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no portal AutoEsporte e conecte sua marca a um público interessado em carros, mobilidade, lançamentos e tecnologia automotiva.',
      photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Auto Esporte', color: '#DC2626' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'display-techtudo',
      section: 'Automotivo & Tecnologia',
      name: 'Display - TechTudo',
      format: 'display',
      cpm: 20.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no portal TechTudo e conecte sua marca a milhões de usuários interessados em tecnologia, jogos, aplicativos e inovação.',
      photo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'TechTudo', color: '#F59E0B' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },

    // Seção 4: Estilo de Vida
    {
      id: 'display-marie-claire',
      section: 'Estilo de Vida',
      name: 'Display - Marie Claire',
      format: 'display',
      cpm: 20.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no site da revista Marie Claire e posicione sua marca junto a conteúdos de moda, beleza, comportamento e estilo de vida.',
      photo: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Marie Claire', color: '#111827' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'display-monet',
      section: 'Estilo de Vida',
      name: 'Display - Monet',
      format: 'display',
      cpm: 15.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no site da revista Monet e posicione sua marca junto a conteúdos sobre séries, filmes, cultura pop e entretenimento.',
      photo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Monet', color: '#F59E0B' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'display-quem',
      section: 'Estilo de Vida',
      name: 'Display - Quem',
      format: 'display',
      cpm: 15.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no site da revista Quem e conecte sua marca a conteúdos sobre celebridades, entretenimento, cultura pop e estilo de vida.',
      photo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Quem', color: '#111827' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },

    // Seção 5: Casa & Família
    {
      id: 'display-casa-e-jardim',
      section: 'Casa & Família',
      name: 'Display - Casa e Jardim',
      format: 'display',
      cpm: 20.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no site da revista Casa e Jardim e associe sua marca a conteúdos de arquitetura, decoração, design e bem-estar no lar.',
      photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Casa e Jardim', color: '#111827' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },
    {
      id: 'display-crescer',
      section: 'Casa & Família',
      name: 'Display - Crescer',
      format: 'display',
      cpm: 15.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'impressões',
      description: 'Anuncie no site da revista Crescer e conecte sua marca a conteúdos voltados para maternidade, paternidade, educação e vida em família.',
      photo: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Crescer', color: '#A7F3D0', fg: '#065F46' }
      ],
      creativeFormats: ['300x250px', '728x90px', '970x250px']
    },

    // Seção 6: Vídeo & Entretenimento
    {
      id: 'video-15s-globoplay',
      section: 'Vídeo & Entretenimento',
      name: 'Vídeo de 15 segundos - Globoplay',
      format: 'vídeo',
      cpm: 80.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'exibições',
      description: 'Anuncie em vídeo de 15 segundos não pulável no Globoplay e impacte sua audiência enquanto ela assiste a séries, novelas, filmes e programas da Globo.',
      photo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Globoplay', color: '#E11D48' }
      ],
      creativeFormats: ['1920x1080px (MP4 15s)']
    },
    {
      id: 'video-30s-globoplay',
      section: 'Vídeo & Entretenimento',
      name: 'Vídeo de 30 a 120 segundos - Globoplay',
      format: 'vídeo',
      cpm: 134.00,
      minInvestment: 900,
      defaultInvestment: 900,
      metricLabel: 'exibições',
      description: 'Anuncie com vídeos de 30 a 120 segundos no Globoplay para apresentar sua marca ou produto com mais profundidade durante o consumo de conteúdos da plataforma.',
      photo: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80',
      portalBadges: [
        { label: 'Globoplay', color: '#E11D48' }
      ],
      creativeFormats: ['1920x1080px (MP4 30s-120s)']
    }
  ],

  // 4. Presets Contextuais de Carrinho (Híbrido, Apenas OOH, Apenas Digital)
  cartPresets: {
    hybrid: {
      campaignName: 'Campanha Multicanal — 27/10',
      duration: '2 semanas',
      startDate: '03/11/2026',
      endDate: '17/11/2026',
      targetAudience: {
        local: 'Todos',
        interesse: 'Todos',
        idade: 'Todos',
        genero: 'Todos'
      },
      digitalItems: [
        {
          id: 'display-portais-globo',
          investment: 900.00,
          selected: false
        }
      ],
      oohItems: [
        { id: 'vn-alvorada', selected: false },
        { id: 'clodomiro-amazonas', selected: false }
      ]
    },
    oohOnly: {
      campaignName: 'Campanha OOH — Vila Olímpia',
      duration: '2 semanas',
      startDate: '03/11/2026',
      endDate: '17/11/2026',
      targetAudience: {
        local: 'Todos',
        interesse: 'Todos',
        idade: 'Todos',
        genero: 'Todos'
      },
      digitalItems: [],
      oohItems: [
        { id: 'vn-alvorada', selected: false },
        { id: 'the-world-hotels', selected: false }
      ]
    },
    digitalOnly: {
      campaignName: 'Campanha Digital — Portais',
      duration: '2 semanas',
      startDate: '03/11/2026',
      endDate: '17/11/2026',
      targetAudience: {
        local: 'Todos',
        interesse: 'Todos',
        idade: 'Todos',
        genero: 'Todos'
      },
      digitalItems: [
        {
          id: 'display-portais-globo',
          investment: 900.00,
          selected: false
        },
        {
          id: 'video-15s-portais-globo',
          investment: 900.00,
          selected: false
        }
      ],
      oohItems: []
    }
  },

  // 5. Catálogo Agnóstico de Planos de Mídia (Meus Anúncios — 10 status sem nomes de clientes)
  mediaPlansCatalog: [
    {
      id: 0,
      name: 'Campanha Institucional 01 — Multicanal',
      date: '15 de mai de 2026 - 15 de jun de 2026',
      status: 'veiculando',
      subStatus: 'running',
      progress: 64,
      media: ['OOH', 'Digital'],
      value: 'R$ 3.450,00',
      creativeType: 'institucional_multicanal',
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100',
      digitalTitle: 'Display - Portais Globo',
      digitalFormat: 'Display (300x250, 728x90)',
      digitalTarget: 'São Paulo - SP • Todos os públicos • Notícias e Negócios',
      oohImpacts: '28.140',
      oohPoints: '3',
      oohScreens: '6',
      digImpressions: '145.800',
      digClicks: '1.890',
      digCtr: '1,30%',
      paymentMethod: 'Cartão de Crédito (**** 4532)',
      installments: '3x de R$ 1.150,00 sem juros',
      paymentStatus: 'Pago',
      invoiceNumber: 'NF-e #00048291'
    },
    {
      id: 1,
      name: 'Campanha Regional 02 — Circuito OOH',
      date: '05 de ago de 2026 - 12 de ago de 2026',
      status: 'veiculando',
      subStatus: 'running',
      progress: 96,
      media: ['OOH'],
      value: 'R$ 529,92',
      creativeType: 'circuito_ooh',
      address: 'Rua Alvorada, 1217 - Vila Olímpia, São Paulo - SP, 04550-004',
      digitalTitle: '',
      digitalFormat: '',
      digitalTarget: '',
      oohImpacts: '42.132',
      oohPoints: '2',
      oohScreens: '5',
      digImpressions: '0',
      digClicks: '0',
      digCtr: '0,00%',
      paymentMethod: 'PIX (À vista)',
      installments: '1x de R$ 529,92',
      paymentStatus: 'Pago',
      invoiceNumber: 'NF-e #00047102'
    },
    {
      id: 2,
      name: 'Campanha Promocional 03 — Portais Globo',
      date: '19 de nov de 2026 - 03 de dez de 2026',
      status: 'veiculando',
      subStatus: 'running',
      progress: 92,
      media: ['Digital'],
      value: 'R$ 900,00',
      creativeType: 'promocional_digital',
      address: '',
      digitalTitle: 'Display - Portais Globo',
      digitalFormat: 'Display (300x250, 728x90, 970x250)',
      digitalTarget: 'Brasil • 25 a 54 anos • Compras e Varejo',
      oohImpacts: '0',
      oohPoints: '0',
      oohScreens: '0',
      digImpressions: '93.750',
      digClicks: '1.120',
      digCtr: '1,19%',
      paymentMethod: 'Cartão de Crédito (**** 8819)',
      installments: '2x de R$ 450,00 sem juros',
      paymentStatus: 'Pago',
      invoiceNumber: 'NF-e #00049310'
    },
    {
      id: 3,
      name: 'Campanha Lançamento 04 — Aguardando Criativo',
      date: '10 de dez de 2026 - 24 de dez de 2026',
      status: 'pendentes',
      subStatus: 'pending_art',
      progress: 0,
      media: ['OOH', 'Digital'],
      value: 'R$ 1.850,00',
      creativeType: 'institucional_multicanal',
      address: 'Rua Gomes De Carvalho, 1005 - Vila Olímpia, São Paulo - SP, 04547-004',
      digitalTitle: 'Display - Portais Globo',
      digitalFormat: 'Display (300x250, 728x90)',
      digitalTarget: 'São Paulo - SP • 18 a 44 anos • Entretenimento',
      oohImpacts: '0',
      oohPoints: '2',
      oohScreens: '5',
      digImpressions: '0',
      digClicks: '0',
      digCtr: '0,00%',
      paymentMethod: 'Cartão de Crédito (**** 1204)',
      installments: '3x de R$ 616,67 sem juros',
      paymentStatus: 'Pago',
      invoiceNumber: 'NF-e #00050112'
    },
    {
      id: 4,
      name: 'Campanha Sazonal 05 — Criativo em Moderação',
      date: '12 de dez de 2026 - 26 de dez de 2026',
      status: 'pendentes',
      subStatus: 'pending_approval',
      progress: 0,
      media: ['OOH'],
      value: 'R$ 794,88',
      creativeType: 'circuito_ooh',
      address: 'Rua Alvorada, 1047 - Vila Olímpia, São Paulo - SP, 04550-004',
      digitalTitle: '',
      digitalFormat: '',
      digitalTarget: '',
      oohImpacts: '0',
      oohPoints: '3',
      oohScreens: '6',
      digImpressions: '0',
      digClicks: '0',
      digCtr: '0,00%',
      paymentMethod: 'PIX (À vista)',
      installments: '1x de R$ 794,88',
      paymentStatus: 'Pago',
      invoiceNumber: 'NF-e #00050148'
    },
    {
      id: 5,
      name: 'Campanha Corporativa 06 — Ajuste de Criativo',
      date: '14 de dez de 2026 - 28 de dez de 2026',
      status: 'pendentes',
      subStatus: 'art_rejected',
      rejectionReason: 'O QR Code e o telefone de contato estão posicionados nos 62px inferiores da peça 800x600px, onde fica a régua de informações do elevador.',
      progress: 0,
      media: ['OOH', 'Digital'],
      value: 'R$ 2.100,00',
      creativeType: 'institucional_multicanal',
      address: 'Rua Fidêncio Ramos, 100 - Vila Olímpia, São Paulo - SP, 04551-010',
      digitalTitle: 'Display - Valor Econômico',
      digitalFormat: 'Display (300x250, 728x90)',
      digitalTarget: 'São Paulo - SP • 25 a 55+ anos • Negócios e Finanças',
      oohImpacts: '0',
      oohPoints: '2',
      oohScreens: '4',
      digImpressions: '0',
      digClicks: '0',
      digCtr: '0,00%',
      paymentMethod: 'Cartão de Crédito (**** 9012)',
      installments: '3x de R$ 700,00 sem juros',
      paymentStatus: 'Pago',
      invoiceNumber: 'NF-e #00050199'
    },
    {
      id: 6,
      name: 'Campanha Varejo 07 — Aguardando Pagamento',
      date: '18 de dez de 2026 - 01 de jan de 2027',
      status: 'pendentes',
      subStatus: 'pending_payment',
      progress: 0,
      media: ['Digital'],
      value: 'R$ 1.200,00',
      creativeType: 'promocional_digital',
      address: '',
      digitalTitle: 'Display - Portais Globo',
      digitalFormat: 'Display (300x250, 728x90)',
      digitalTarget: 'Sudeste • Todos os públicos • Varejo e Serviços',
      oohImpacts: '0',
      oohPoints: '0',
      oohScreens: '0',
      digImpressions: '0',
      digClicks: '0',
      digCtr: '0,00%',
      paymentMethod: 'PIX (Aguardando confirmação)',
      installments: '1x de R$ 1.200,00',
      paymentStatus: 'Aguardando pagamento',
      invoiceNumber: 'Será emitida após confirmação'
    },
    {
      id: 7,
      name: 'Campanha Institucional 08 — Programada',
      date: '15 de jan de 2027 - 15 de fev de 2027',
      status: 'a_iniciar',
      subStatus: 'scheduled',
      progress: 0,
      media: ['OOH', 'Digital'],
      value: 'R$ 2.890,00',
      creativeType: 'institucional_multicanal',
      address: 'Rua Gomes De Carvalho, 1356 - Vila Olímpia, São Paulo - SP, 04547-005',
      digitalTitle: 'Display - Crescer',
      digitalFormat: 'Display (300x250, 728x90)',
      digitalTarget: 'São Paulo - SP • 25 a 44 anos • Casa e Família',
      oohImpacts: '0',
      oohPoints: '3',
      oohScreens: '6',
      digImpressions: '0',
      digClicks: '0',
      digCtr: '0,00%',
      paymentMethod: 'Cartão de Crédito (**** 3310)',
      installments: '3x de R$ 963,33 sem juros',
      paymentStatus: 'Pago',
      invoiceNumber: 'NF-e #00050320'
    },
    {
      id: 8,
      name: 'Campanha Regional 09 — Finalizada',
      date: '01 de out de 2026 - 15 de out de 2026',
      status: 'concluidos',
      subStatus: 'completed',
      progress: 100,
      media: ['OOH', 'Digital'],
      value: 'R$ 1.694,86',
      creativeType: 'institucional_multicanal',
      address: 'Rua Santo Antônio, 650 - Centro, Juiz de Fora - MG, 36015-001',
      digitalTitle: 'Display - Portais Globo',
      digitalFormat: 'Display (300x250, 728x90)',
      digitalTarget: 'Minas Gerais • Todos os públicos • Notícias',
      oohImpacts: '36.000',
      oohPoints: '2',
      oohScreens: '2',
      digImpressions: '93.750',
      digClicks: '1.240',
      digCtr: '1,32%',
      paymentMethod: 'Cartão de Crédito (**** 4532)',
      installments: '2x de R$ 847,43 sem juros',
      paymentStatus: 'Pago',
      invoiceNumber: 'NF-e #00044910'
    },
    {
      id: 9,
      name: 'Campanha Institucional 10 — Cancelada',
      date: '01 de set de 2026 - 15 de set de 2026',
      status: 'cancelados',
      subStatus: 'cancelled',
      progress: 0,
      media: ['OOH'],
      value: 'R$ 529,92',
      creativeType: 'circuito_ooh',
      address: 'Rua Helena, 260 - Vila Olímpia, São Paulo - SP, 04552-050',
      digitalTitle: '',
      digitalFormat: '',
      digitalTarget: '',
      oohImpacts: '0',
      oohPoints: '2',
      oohScreens: '4',
      digImpressions: '0',
      digClicks: '0',
      digCtr: '0,00%',
      paymentMethod: 'PIX (Expirado)',
      installments: '1x de R$ 529,92',
      paymentStatus: 'Cancelado',
      invoiceNumber: 'Cancelada antes da emissão'
    }
  ],

  // 6. Catálogo Agnóstico de Rascunhos (Meus Rascunhos — 4 cenários)
  draftsCatalog: [
    {
      id: 'draft-1',
      name: 'Rascunho 01 — Campanha OOH',
      updatedAt: 'Editado hoje às 14:20',
      channels: ['OOH'],
      presetKey: 'oohOnly',
      period: '2 semanas (03/11/2026 a 17/11/2026)',
      expiredDate: false,
      summaryText: '2 pontos selecionados • 5 telas (Vila Olímpia, São Paulo - SP)',
      totalValue: 'R$ 529,92'
    },
    {
      id: 'draft-2',
      name: 'Rascunho 02 — Campanha Multicanal',
      updatedAt: 'Editado ontem às 18:45',
      channels: ['OOH', 'Digital'],
      presetKey: 'hybrid',
      period: '2 semanas (03/11/2026 a 17/11/2026)',
      expiredDate: false,
      summaryText: '2 pontos OOH + Display Portais Globo (93.750 impressões)',
      totalValue: 'R$ 1.350,86'
    },
    {
      id: 'draft-3',
      name: 'Rascunho 03 — Campanha Digital',
      updatedAt: 'Editado há 3 dias',
      channels: ['Digital'],
      presetKey: 'digitalOnly',
      period: '2 semanas (03/11/2026 a 17/11/2026)',
      expiredDate: false,
      summaryText: 'Display Portais Globo + Vídeo 15s Portais Globo',
      totalValue: 'R$ 1.800,00'
    },
    {
      id: 'draft-4',
      name: 'Rascunho 04 — Período Expirado',
      updatedAt: 'Editado em 01/10/2026',
      channels: ['OOH'],
      presetKey: 'oohOnly',
      period: '2 semanas (10/10/2026 a 24/10/2026)',
      expiredDate: true,
      summaryText: '2 pontos selecionados • Datas originais no passado',
      totalValue: 'R$ 529,92'
    }
  ],

  // 7. Perfis de Faturamento Agnósticos (PF e PJ)
  billingProfiles: {
    pf: {
      badge: 'pessoa física',
      name: 'Titular Agnóstico / Conta Demonstração',
      docLabel: 'CPF',
      docValue: '000.000.000-00',
      birthDate: '01/01/1990',
      phone: '(11) 99999-0000',
      email: 'contato@empresaexemplo.com.br',
      address: 'Avenida Paulista, 1000, Conjunto 101, Bela Vista, São Paulo, SP, 01310-100',
      notice: 'Cadastre um perfil pessoa jurídica para associar esta campanha aos dados da sua empresa'
    },
    pj: {
      badge: 'pessoa jurídica',
      name: 'Empresa Demonstração LTDA',
      docLabel: 'CNPJ',
      docValue: '00.000.000/0001-00',
      birthDate: 'Fundação: 10/05/2018',
      phone: '(11) 3000-0000',
      email: 'financeiro@empresademonstracao.com.br',
      address: 'Rua Fidêncio Ramos, 100, 8º Andar, Vila Olímpia, São Paulo, SP, 04551-010',
      notice: 'Faturamento vinculado ao CNPJ da Empresa Demonstração LTDA para emissão de NF-e.'
    }
  }
};

// Hidratação automática de propriedades (garante compatibilidade total entre schemas)
(function hydrateAquiAdsMockData(data) {
  if (!data) return;
  if (Array.isArray(data.oohCatalog)) {
    data.oohCatalog.forEach(item => {
      item.img = item.img || item.photo;
      item.basePrice2w = item.basePrice2w ?? item.price2w;
      item.impressions = item.impressions ?? item.views2w;
      item.reach = item.reach ?? item.reach2w;
      item.freq = item.freq ?? item.frequency2w;
      item.environment = item.environment || item.environmentShort;
    });
  }
  if (Array.isArray(data.digitalCatalog)) {
    data.digitalCatalog.forEach(item => {
      item.category = item.category || item.section;
      item.sectionId = item.sectionId || item.section;
      item.title = item.title || item.name;
      item.desc = item.desc || item.description;
      item.formatIcon = item.formatIcon || (item.format === 'vídeo' || item.format === 'video' ? 'video' : 'display');
      item.minBudget = item.minBudget ?? item.minInvestment;
      item.defaultBudget = item.defaultBudget ?? item.defaultInvestment;
      item.budget = item.budget ?? item.defaultInvestment;
      if (Array.isArray(item.portalBadges)) {
        item.portalBadges = item.portalBadges.map(b => ({
          ...b,
          bg: b.bg || b.color || '#111827',
          fg: b.fg || '#FFFFFF'
        }));
      }
      item.badges = item.badges || (item.portalBadges || []).map(b => b.label);
    });
  }
  if (data.cartPresets && typeof data.cartPresets === 'object') {
    Object.keys(data.cartPresets).forEach(key => {
      const preset = data.cartPresets[key];
      if (!preset) return;
      if (Array.isArray(preset.oohItems)) {
        preset.oohItems = preset.oohItems.map(ref => {
          const found = (data.oohCatalog || []).find(x => x.id === ref.id) || {};
          return {
            ...found,
            ...ref,
            selectedForBatch: Boolean(ref.selectedForBatch ?? ref.selected)
          };
        });
      }
      if (Array.isArray(preset.digitalItems)) {
        preset.digitalItems = preset.digitalItems.map(ref => {
          const found = (data.digitalCatalog || []).find(x => x.id === ref.id) || {};
          const resolvedBudget = Number(ref.budget ?? ref.investment ?? found.defaultBudget ?? found.defaultInvestment) || 900;
          return {
            ...found,
            ...ref,
            budget: resolvedBudget,
            selectedForBatch: Boolean(ref.selectedForBatch ?? ref.selected)
          };
        });
      }
    });
  }
})(window.AQUI_ADS_MOCK_DATA);



// Aliases canônicos de compatibilidade para presets de carrinho (midiaMista / ooh_only / digital_only)
if (window.AQUI_ADS_MOCK_DATA && window.AQUI_ADS_MOCK_DATA.cartPresets) {
  const cp = window.AQUI_ADS_MOCK_DATA.cartPresets;
  if (cp.hybrid && !cp.midiaMista) cp.midiaMista = cp.hybrid;
  if (cp.midiaMista && !cp.hybrid) cp.hybrid = cp.midiaMista;
  if (cp.oohOnly && !cp.ooh_only) cp.ooh_only = cp.oohOnly;
  if (cp.ooh_only && !cp.oohOnly) cp.oohOnly = cp.ooh_only;
  if (cp.digitalOnly && !cp.digital_only) cp.digital_only = cp.digitalOnly;
  if (cp.digital_only && !cp.digitalOnly) cp.digitalOnly = cp.digital_only;
}