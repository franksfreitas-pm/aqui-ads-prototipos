/**
 * Aqui Ads - Protótipo Interativo de Alta Fidelidade (Melhorias no Mapa)
 * Baseado 100% no DOM real de produção (https://aqui.globo/resultados)
 */

(function () {
  'use strict';

  // Alias maplibregl para mapboxgl para compatibilidade total
  if (window.maplibregl && !window.mapboxgl) {
    window.mapboxgl = window.maplibregl;
  }

  // ==========================================================================
  // 1. DATASET REALISTA (86 PONTOS OOH EM VILA OLÍMPIA E REGIÃO)
  // Os primeiros 20 pontos são extraídos de forma idêntica do espelho de produção.
  // ==========================================================================
  const REAL_20_POINTS = [
    {
      id: 1,
      title: 'VN Alvorada 1217',
      addr: 'Rua Alvorada - 1217 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000015387.webp',
      category: 'elevadores residenciais',
      iconClass: 'uil-estate',
      dist: '21 m',
      views: '9,74 mil',
      reach: '98',
      freq: '21',
      screens: 2,
      price: 264.96,
      // Posicionado levemente separado para demonstrar destaque de pino individual logo no início
      lng: -46.6798,
      lat: -23.5998
    },
    {
      id: 2,
      title: 'The World Hotels',
      addr: 'Rua Gomes de Carvalho - 1005 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000019950.webp',
      category: 'elevadores residenciais',
      iconClass: 'uil-estate',
      dist: '34 m',
      views: '19,49 mil',
      reach: '929',
      freq: '31',
      screens: 4,
      price: 264.96,
      // Dentro do cluster denso central da Vila Olímpia (>25 pontos)
      lng: -46.6836,
      lat: -23.5976
    },
    {
      id: 3,
      title: 'Solar Vila Olímpia',
      addr: 'Rua Gomes de Carvalho - 940 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000028368.webp',
      category: 'elevadores residenciais',
      iconClass: 'uil-estate',
      dist: '62 m',
      views: '9,74 mil',
      reach: '297',
      freq: '21',
      screens: 2,
      price: 264.96,
      lng: -46.6831,
      lat: -23.5973
    },
    {
      id: 4,
      title: 'Le Premier',
      addr: 'Rua Gomes de Carvalho - 892 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000029588.webp',
      category: 'elevadores comerciais',
      iconClass: 'uil-building',
      dist: '87 m',
      views: '7,2 mil',
      reach: '536',
      freq: '9',
      screens: 3,
      price: 537.42,
      // Pino individual desagrupado a leste para fácil visualização no hover
      lng: -46.6782,
      lat: -23.5964
    },
    {
      id: 5,
      title: 'Advanced Tower',
      addr: 'Rua Gomes de Carvalho - 1069 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000006771.webp',
      category: 'elevadores comerciais',
      iconClass: 'uil-building',
      dist: '101 m',
      views: '12 mil',
      reach: '2,4 mil',
      freq: '10',
      screens: 5,
      price: 895.70,
      lng: -46.6841,
      lat: -23.5979
    },
    {
      id: 6,
      title: 'Vila Olímpia Prime Offices',
      addr: 'Rua Alvorada - 1289 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000026671.webp',
      category: 'elevadores comerciais',
      iconClass: 'uil-building',
      dist: '103 m',
      views: '24 mil',
      reach: '2,26 mil',
      freq: '11',
      screens: 10,
      price: 1791.40,
      // Pino individual ao norte-leste da Vila Olímpia
      lng: -46.6775,
      lat: -23.5938
    },
    {
      id: 7,
      title: 'Palazzo Mona Lisa',
      addr: 'Avenida Doutor Cardoso de Melo - 1060 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025025.webp',
      category: 'elevadores residenciais',
      iconClass: 'uil-estate',
      dist: '111 m',
      views: '9,74 mil',
      reach: '234',
      freq: '21',
      screens: 2,
      price: 264.96,
      lng: -46.6838,
      lat: -23.5985
    },
    {
      id: 8,
      title: 'Gc Square Corporate - Vitacon',
      addr: 'Rua Gomes de Carvalho - 1108 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010445.webp',
      category: 'elevadores comerciais',
      iconClass: 'uil-building',
      dist: '114 m',
      views: '7,2 mil',
      reach: '680',
      freq: '9',
      screens: 3,
      price: 537.42,
      lng: -46.6844,
      lat: -23.5977
    },
    {
      id: 9,
      title: 'GO850',
      addr: 'Rua Gomes de Carvalho - 850 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025224.webp',
      category: 'elevadores residenciais',
      iconClass: 'uil-estate',
      dist: '131 m',
      views: '9,74 mil',
      reach: '389',
      freq: '23',
      screens: 2,
      price: 264.96,
      lng: -46.6826,
      lat: -23.5971
    },
    {
      id: 10,
      title: 'Dr. Cardoso de Mello',
      addr: 'Avenida Doutor Cardoso de Melo - 900 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000000773.webp',
      category: 'elevadores comerciais',
      iconClass: 'uil-building',
      dist: '137 m',
      views: '9,6 mil',
      reach: '2,58 mil',
      freq: '12',
      screens: 4,
      price: 716.56,
      lng: -46.6828,
      lat: -23.5983
    },
    {
      id: 11,
      title: 'Helena Milan',
      addr: 'Rua Júlio Diniz - 56 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000000484.webp',
      category: 'elevadores comerciais',
      iconClass: 'uil-building',
      dist: '139 m',
      views: '9,6 mil',
      reach: '1,09 mil',
      freq: '7',
      screens: 4,
      price: 716.56,
      lng: -46.6822,
      lat: -23.5968
    },
    {
      id: 12,
      title: 'Thai Beauty',
      addr: 'R. Júlio Diniz - 32 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/smb/elt-salao-de-beleza.webp',
      category: 'salão de beleza',
      iconClass: 'elt-beauty',
      dist: '142 m',
      views: '672',
      reach: '400',
      freq: '1',
      screens: 1,
      price: 194.00,
      lng: -46.6819,
      lat: -23.5966
    },
    {
      id: 13,
      title: 'VN Gomes de Carvalho',
      addr: 'Rua Gomes de Carvalho - 1146 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010192.webp',
      category: 'elevadores residenciais',
      iconClass: 'uil-estate',
      dist: '153 m',
      views: '14,62 mil',
      reach: '234',
      freq: '23',
      screens: 3,
      price: 264.96,
      lng: -46.6848,
      lat: -23.5978
    },
    {
      id: 14,
      title: 'Edifício Ouro Velho',
      addr: 'Rua Casa do Ator - 853 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025342.webp',
      category: 'elevadores residenciais',
      iconClass: 'uil-estate',
      dist: '154 m',
      views: '4,87 mil',
      reach: '206',
      freq: '23',
      screens: 1,
      price: 264.96,
      lng: -46.6834,
      lat: -23.5991
    },
    {
      id: 15,
      title: 'Condomínio Amaralina',
      addr: 'Rua Gomes de Carvalho - 837 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000036468.webp',
      category: 'elevadores residenciais',
      iconClass: 'uil-estate',
      dist: '160 m',
      views: '9,74 mil',
      reach: '310',
      freq: '20',
      screens: 2,
      price: 264.96,
      lng: -46.6825,
      lat: -23.5972
    },
    {
      id: 16,
      title: 'Platinum Tower',
      addr: 'Avenida Doutor Cardoso de Melo - 878 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010651.webp',
      category: 'elevadores comerciais',
      iconClass: 'uil-building',
      dist: '171 m',
      views: '12 mil',
      reach: '570',
      freq: '6',
      screens: 5,
      price: 895.70,
      lng: -46.6827,
      lat: -23.5982
    },
    {
      id: 17,
      title: 'Meursault',
      addr: 'Rua Casa do Ator - 803 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000022398.webp',
      category: 'elevadores residenciais',
      iconClass: 'uil-estate',
      dist: '174 m',
      views: '9,74 mil',
      reach: '159',
      freq: '20',
      screens: 2,
      price: 264.96,
      lng: -46.6830,
      lat: -23.5989
    },
    {
      id: 18,
      title: 'Condomínio San Georges',
      addr: 'Rua Casa do Ator - 783 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000031461.webp',
      category: 'elevadores residenciais',
      iconClass: 'uil-estate',
      dist: '191 m',
      views: '4,87 mil',
      reach: '194',
      freq: '22',
      screens: 1,
      price: 264.96,
      lng: -46.6829,
      lat: -23.5988
    },
    {
      id: 19,
      title: 'Madison Building',
      addr: 'Rua Gomes de Carvalho - 1195 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025085.webp',
      category: 'elevadores comerciais',
      iconClass: 'uil-building',
      dist: '202 m',
      views: '14,4 mil',
      reach: '1,29 mil',
      freq: '10',
      screens: 6,
      price: 1074.84,
      lng: -46.6852,
      lat: -23.5976
    },
    {
      id: 20,
      title: 'Memphis Office Center',
      addr: 'Rua Gomes de Carvalho - 1266 , Vila Olímpia - São Paulo',
      img: 'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000003534.webp',
      category: 'elevadores comerciais',
      iconClass: 'uil-building',
      dist: '213 m',
      views: '12 mil',
      reach: '910',
      freq: '8',
      screens: 5,
      price: 895.70,
      lng: -46.6856,
      lat: -23.5974
    }
  ];

  // Imagens reais do repositório CDN Eletromidia para os outros 66 pontos da região
  const ELETROMIDIA_IMAGES = [
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000015387.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000019950.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000028368.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000029588.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000006771.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000026671.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025025.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010445.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025224.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000000773.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000000484.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010192.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025342.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000036468.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000010651.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000022398.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000031461.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000025085.webp',
    'https://cdn.eletromidia.com.br/seahorse/repositorio/imagens_predios/0000003534.webp'
  ];

  // Gerador determinístico de 66 pontos complementares formando clusters densos (>20 pontos)
  function buildCompleteDataset() {
    const allPoints = [...REAL_20_POINTS];

    const hubs = [
      // Hub 1: Core Vila Olímpia (soma com os iniciais para formar cluster > 28 pontos)
      {
        centerLng: -46.6838,
        centerLat: -23.5978,
        spread: 0.0022,
        count: 14,
        neighborhood: 'Vila Olímpia',
        streets: ['Rua Gomes de Carvalho', 'Rua Alvorada', 'Av. Dr. Cardoso de Melo', 'Rua Helena'],
        names: [
          'Edifício Vila Olímpia Corporate', 'Condomínio Maison Alvorada', 'Tower Gomes de Carvalho',
          'Berrini Prime Executive', 'Residencial Piazza Vila Olímpia', 'Edifício Atrium V.O.',
          'One Vila Olímpia', 'Olimpia Park Offices', 'Condomínio Grand Helena',
          'Smart Vila Olímpia', 'Hub Faria Lima Sul', 'Edifício Millennium',
          'Vila Olímpia Square', 'Residencial Domus'
        ]
      },
      // Hub 2: Eixo Funchal / JK / Shopping Vila Olímpia (Cluster denso de 24 pontos!)
      {
        centerLng: -46.6902,
        centerLat: -23.5948,
        spread: 0.0025,
        count: 24,
        neighborhood: 'Vila Olímpia',
        streets: ['Rua Funchal', 'Av. Pres. Juscelino Kubitschek', 'Rua Olimpíadas', 'Rua Fidêncio Ramos'],
        names: [
          'JK Financial Center', 'Shopping Vila Olímpia - Mídia Mall', 'Funchal Corporate Tower',
          'Edifício Fidêncio Ramos', 'E-Tower JK', 'Torre Sul JK', 'Plaza Funchal',
          'Smart Fit Funchal', 'Condomínio JK Residence', 'Olimpíadas Trade Center',
          'WTC Funchal Link', 'Abrigo Av. JK 1830', 'Abrigo Rua Funchal 418',
          'Academia Bio Ritmo V.O.', 'Continental Square Funchal', 'Passarela JK Digital',
          'Edifício São Paulo Corporate', 'Vila Olímpia West Tower', 'Torre Chedid Jafet',
          'Condomínio Lumière V.O.', 'Funchal Business Park', 'Shopping JK Iguatemi Entorno',
          'Abrigo Av. Chedid Jafet', 'Residencial Funchal Garden'
        ]
      },
      // Hub 3: Eixo Bandeira Paulista / Itaim Bibi (Cluster de 16 pontos)
      {
        centerLng: -46.6788,
        centerLat: -23.5882,
        spread: 0.0028,
        count: 16,
        neighborhood: 'Itaim Bibi',
        streets: ['Rua Joaquim Floriano', 'Rua Bandeira Paulista', 'Rua João Cachoeira', 'Av. Nove de Julho'],
        names: [
          'Itaim Corporate Center', 'Bandeira Paulista Offices', 'Joaquim Floriano Prime',
          'VN João Cachoeira', 'Condomínio Itaim Classic', 'Brascan Century Plaza',
          'Abrigo Joaquim Floriano 912', 'Smart Fit Itaim Bibi', 'Edifício Brascan Offices',
          'Residencial Maison Itaim', 'Boutique Mall Itaim', 'Torre Horácio Lafer',
          'Condomínio San Pietro Itaim', 'Edifício Faria Lima Square', 'Abrigo Bandeira Paulista',
          'Studio Velocity Itaim'
        ]
      },
      // Hub 4: Eixo Berrini / Brooklin / Moema (12 pontos)
      {
        centerLng: -46.6885,
        centerLat: -23.6042,
        spread: 0.0032,
        count: 12,
        neighborhood: 'Berrini / Moema',
        streets: ['Av. Eng. Luís Carlos Berrini', 'Rua Sansão Alves dos Santos', 'Av. Santo Amaro', 'Av. Ibirapuera'],
        names: [
          'Berrini One', 'Plaza Centenário Digital', 'WTC São Paulo Tower',
          'Abrigo Av. Berrini 1140', 'Condomínio Reserva Berrini', 'Shopping Ibirapuera Entorno',
          'Moema Medical Center', 'Academia Bodytech Indianópolis', 'Torre Nações Unidas',
          'Edifício Berrini 500', 'Residencial Pássaros Moema', 'Abrigo Av. Santo Amaro 2400'
        ]
      }
    ];

    let nextId = 21;
    hubs.forEach((hub, hIdx) => {
      for (let i = 0; i < hub.count; i++) {
        // Distribuição espiral determinística para evitar sobreposição exata de coordenadas
        const angle = (i * 2.39996) + hIdx;
        const radius = (0.18 + 0.82 * Math.sqrt((i + 1) / hub.count)) * hub.spread;
        const lng = +(hub.centerLng + Math.cos(angle) * radius * 1.15).toFixed(6);
        const lat = +(hub.centerLat + Math.sin(angle) * radius * 0.9).toFixed(6);

        const title = hub.names[i % hub.names.length];
        const street = hub.streets[i % hub.streets.length];
        const num = 120 + ((i * 73 + hIdx * 110) % 1450);

        // Categoria variada compatível com os chips do #tour-filter
        let category = 'elevadores comerciais';
        let iconClass = 'uil-building';
        let price = 537.42;
        let screens = 3;
        let views = '12 mil';
        let reach = '1,2 mil';
        let freq = '10';

        if (title.startsWith('Abrigo')) {
          category = 'ponto de ônibus';
          iconClass = 'uil-map-marker';
          price = 1290.00;
          screens = 2;
          views = '48,5 mil';
          reach = '18,2 mil';
          freq = '4';
        } else if (title.includes('Shopping') || title.includes('Mall') || title.includes('Plaza')) {
          category = 'shopping';
          iconClass = 'uil-shopping-cart';
          price = 1791.40;
          screens = 8;
          views = '64 mil';
          reach = '22,4 mil';
          freq = '6';
        } else if (title.includes('Academia') || title.includes('Smart Fit') || title.includes('Bio Ritmo') || title.includes('Velocity')) {
          category = 'academia';
          iconClass = 'uil-users-alt';
          price = 480.00;
          screens = 4;
          views = '15,2 mil';
          reach = '3,1 mil';
          freq = '14';
        } else if (title.includes('Condomínio') || title.includes('Residencial') || title.startsWith('VN ')) {
          category = 'elevadores residenciais';
          iconClass = 'uil-estate';
          price = 264.96;
          screens = 2;
          views = '9,74 mil';
          reach = '340';
          freq = '22';
        } else {
          const tiers = [
            { price: 537.42, screens: 3, views: '7,2 mil', reach: '640', freq: '9' },
            { price: 716.56, screens: 4, views: '9,6 mil', reach: '1,4 mil', freq: '11' },
            { price: 895.70, screens: 5, views: '14,4 mil', reach: '2,1 mil', freq: '10' },
            { price: 1074.84, screens: 6, views: '18,8 mil', reach: '2,8 mil', freq: '12' }
          ];
          const t = tiers[i % tiers.length];
          price = t.price;
          screens = t.screens;
          views = t.views;
          reach = t.reach;
          freq = t.freq;
        }

        const distMeters = 220 + ((nextId * 37) % 1650);
        const distLabel = distMeters >= 1000
          ? `${(distMeters / 1000).toFixed(1).replace('.', ',')} km`
          : `${distMeters} m`;

        allPoints.push({
          id: nextId,
          title,
          addr: `${street} - ${num} , ${hub.neighborhood} - São Paulo`,
          img: ELETROMIDIA_IMAGES[(nextId - 1) % ELETROMIDIA_IMAGES.length],
          category,
          iconClass,
          dist: distLabel,
          views,
          reach,
          freq,
          screens,
          price,
          lng,
          lat
        });

        nextId++;
      }
    });

    return allPoints;
  }

  const ALL_POINTS = buildCompleteDataset();

  // ==========================================================================
  // 2. ESTADO DA APLICAÇÃO
  // ==========================================================================
  const state = {
    cart: new Set(),                 // IDs dos pontos adicionados ao carrinho
    activeCategory: 'todos',         // Chip ativo em #tour-filter
    searchQuery: '',                 // Filtro textual se o usuário digitar
    visiblePoints: [...ALL_POINTS],  // Pontos atualmente filtrados (viewport ou geometria)
    displayedCardLimit: 20,          // Paginação inicial estilo produção
    isMapExpanded: false,            // Modo Split-Screen (false) vs Modo Mapa 100% (true)
    hoveredPointId: null,            // Ponto em hover na lista lateral
    clusters: [],                    // Clusters e pinos calculados no zoom atual
    pointToMarkerMap: new Map(),     // point.id -> { type: 'pin' | 'cluster', el, marker, cluster }
    activePopup: null,               // Instância do MapLibre Popup aberto
    // Ferramentas de desenho (Smart Actions)
    drawingMode: null,               // null | 'radius' | 'polygon'
    radiusCenter: null,              // [lng, lat]
    radiusMeters: 0,                 // metros
    polygonVertices: [],             // Array de [lng, lat]
    cursorLngLat: null,              // Posição atual do mouse durante desenho
    activeGeometry: null             // null | { type: 'radius', center, radiusMeters } | { type: 'polygon', coordinates }
  };

  // ==========================================================================
  // 3. UTILITÁRIOS DE FORMATAÇÃO E GEOMETRIA ESPACIAL
  // ==========================================================================
  function formatCurrencyBRL(value) {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatCompactBRL(value) {
    return 'R$ ' + Math.round(value).toLocaleString('pt-BR');
  }

  // Distância Haversine em metros entre duas coordenadas [lng, lat]
  function haversineDistanceMeters(coord1, coord2) {
    const R = 6371000;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(coord2[1] - coord1[1]);
    const dLng = toRad(coord2[0] - coord1[0]);
    const lat1 = toRad(coord1[1]);
    const lat2 = toRad(coord2[1]);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // Gera um polígono circular GeoJSON de 64 lados a partir de [lng, lat] e raio em metros
  function createCircleGeoJSON(center, radiusMeters, steps = 64) {
    const coords = [];
    const distanceX = radiusMeters / (111320 * Math.cos((center[1] * Math.PI) / 180));
    const distanceY = radiusMeters / 110574;

    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * (2 * Math.PI);
      const x = distanceX * Math.cos(theta);
      const y = distanceY * Math.sin(theta);
      coords.push([center[0] + x, center[1] + y]);
    }

    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coords]
      },
      properties: {}
    };
  }

  // Algoritmo Ray-Casting para verificar se [lng, lat] está dentro de um polígono
  function isPointInPolygon(point, polygonCoords) {
    const x = point[0];
    const y = point[1];
    let inside = false;
    for (let i = 0, j = polygonCoords.length - 1; i < polygonCoords.length; j = i++) {
      const xi = polygonCoords[i][0], yi = polygonCoords[i][1];
      const xj = polygonCoords[j][0], yj = polygonCoords[j][1];
      const intersect = ((yi > y) !== (yj > y)) &&
        (x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-12) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // ==========================================================================
  // 4. TEMPLATES HTML OFICIAIS DE PRODUÇÃO (SINCRONIZADOS 100% COM aqui_ads_ui.js)
  // ==========================================================================
  const PROMO_BANNER_1_HTML = `
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
        <button type="button" onclick="if (typeof showToast === 'function') showToast('Serviço Contrate uma Arte (R$ 99,00): disponível na etapa de Envio de Arte!')" class="bg-[#282E38] hover:bg-[#1E2229] text-white text-xs font-bold px-4 py-2 rounded-md cursor-pointer transition">
          saiba mais
        </button>
      </div>
    </li>`;

  const PROMO_BANNER_2_HTML = `
    <li class="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-2xs flex flex-col justify-between p-5">
      <div>
        <h3 class="text-base font-bold text-[#282E38] leading-snug mb-2">Crie sua conta ou entre para guardar sua seleção</h3>
        <p class="text-xs text-[#64748B] leading-relaxed mb-4">Salve os pontos escolhidos, compartilhe seu plano e continue sua campanha de onde parou.</p>
        <button type="button" onclick="if (typeof showToast === 'function') showToast('Fluxo de autenticação / criação de conta')" class="w-full py-2.5 px-4 rounded-lg border border-[#282E38] text-[#282E38] text-xs font-bold hover:bg-gray-50 transition cursor-pointer">
          entrar ou criar conta
        </button>
      </div>
      <div class="mt-4 flex justify-center">
        <img src="https://aqui.globo/images/banners/results/campanha-completa.webp" alt="Campanha completa" class="h-[130px] w-auto object-contain">
      </div>
    </li>`;

  function getOfficialEnvIconSvg(envStr) {
    const s = String(envStr || '').toLowerCase();
    if (s.includes('residencia')) {
      return '<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-10.5z"/></svg>';
    }
    if (s.includes('ônibus') || s.includes('onibus')) {
      return '<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="15" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M4 11h16M8 15h.01M16 15h.01M6 18v3M18 18v3"/></svg>';
    }
    return '<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>';
  }

  function isFourWeeksSelected() {
    try {
      const durLabel = document.getElementById('plp-ooh-duration-label');
      if (durLabel && durLabel.textContent && durLabel.textContent.includes('4')) {
        return true;
      }
      if (window.AquiAdsUI && typeof window.AquiAdsUI.getState === 'function') {
        const uiState = window.AquiAdsUI.getState();
        return Boolean(uiState && uiState.cartState && uiState.cartState.durationDays === 28);
      }
    } catch (err) {
      // fallback seguro para 2 semanas
    }
    return false;
  }

  function renderCardHTML(point) {
    const isAdded = state.cart.has(point.id);
    const is4w = isFourWeeksSelected();
    const periodLabel = is4w ? '4 semanas' : '2 semanas';
    const displayPrice = is4w ? point.price * 1.8 : point.price;
    const formattedPrice = formatCurrencyBRL(displayPrice);
    const envIconSvg = getOfficialEnvIconSvg(point.category);
    const fmtIconSvg = '<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 20h8M12 16v4"/></svg>';

    return `
      <li data-point-id="${point.id}" isaddedtocart="${isAdded}" class="carditem min-h-[462px] rounded-[12px] overflow-hidden transition-all duration-200 flex flex-col justify-between ${isAdded ? 'bg-[#F0FDF4] border-[1.5px] border-[#22C55E] shadow-[0_2px_10px_rgba(34,197,94,0.08)]' : 'bg-white border border-[#d9d9d9] shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-md'}">
        <div data-action="focus-map" data-point-id="${point.id}" class="relative h-[122px] w-full bg-slate-200 overflow-hidden cursor-pointer group">
          <img src="${point.img}" alt="${point.title}" loading="lazy" class="relative h-full w-full object-cover object-center group-hover:scale-105 transition duration-300">
          <div class="absolute left-3 right-3 top-3 flex items-center justify-between gap-1 z-10">
            <div class="flex items-center gap-1 min-w-0">
              <span class="bg-white/95 backdrop-blur-sm text-slate-800 text-[10.5px] leading-tight font-medium px-2 py-1 rounded-[5px] whitespace-nowrap flex items-center gap-1 shadow-xs">
                ${envIconSvg}
                <span>${point.category}</span>
              </span>
              <span class="bg-[#430099] text-white text-[10.5px] leading-tight font-medium px-2 py-1 rounded-[5px] whitespace-nowrap flex items-center gap-1 shadow-xs">
                ${fmtIconSvg}
                <span>digital</span>
              </span>
            </div>
            <span class="bg-[#8E8E93]/90 backdrop-blur-sm text-white text-[10.5px] leading-tight font-medium px-2 py-1 rounded-[5px] whitespace-nowrap flex items-center gap-1 flex-shrink-0">
              <svg class="w-2.5 h-2.5 text-white shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>${point.dist}</span>
            </span>
          </div>
        </div>
        <div class="px-[20px] pt-[18px] pb-[20px] flex-1 flex flex-col justify-between">
          <div>
            <div class="mb-[20px]">
              <h3 data-action="focus-map" data-point-id="${point.id}" class="text-xl leading-7 font-bold text-[#0c0a09] mb-[4px] truncate cursor-pointer hover:text-[#FF4F00] transition" title="${point.title}">${point.title}</h3>
              <p class="text-[12px] leading-normal text-[#8c97a6] line-clamp-2 min-h-[36px]" title="${point.addr}">${point.addr}</p>
            </div>

            <div>
              <div class="flex justify-normal text-left">
                <div class="mr-4">
                  <span class="text-[12px] text-[#5f6b7a] flex items-center gap-1 mb-[4px]">
                    <span>exibições</span>
                    <svg class="w-3 h-3 text-[#5f6b7a] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </span>
                  <strong class="block text-[14px] font-bold text-[#0c0a09] leading-tight">${point.views}</strong>
                </div>
                <div class="mr-4">
                  <span class="text-[12px] text-[#5f6b7a] flex items-center gap-1 mb-[4px]">
                    <span>alcance</span>
                    <svg class="w-3 h-3 text-[#5f6b7a] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </span>
                  <strong class="block text-[14px] font-bold text-[#0c0a09] leading-tight">${point.reach}</strong>
                </div>
                <div>
                  <span class="text-[12px] text-[#5f6b7a] flex items-center gap-1 mb-[4px]">
                    <span>frequência</span>
                    <svg class="w-3 h-3 text-[#5f6b7a] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  </span>
                  <strong class="block text-[14px] font-bold text-[#0c0a09] leading-tight">${point.freq}</strong>
                </div>
              </div>
              <div class="mt-[10px] text-[10px] font-normal text-[#5f6b7a]">Telas: ${point.screens}</div>
            </div>
          </div>

          <div>
            <div class="mt-[38px] flex items-baseline gap-1 min-h-[28px] mb-1">
              <strong class="text-2xl font-extrabold leading-6 text-[#0c0a09]">R$&nbsp;${formattedPrice}</strong>
              <span class="text-base font-normal text-[#8c97a6]">/ ${periodLabel}</span>
            </div>

            <div class="mt-[26px] flex items-center justify-between">
              <button type="button" data-action="toggle-cart" data-point-id="${point.id}" class="flex-1 h-10 px-4 rounded-[8px] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${isAdded ? 'bg-white hover:bg-slate-50 text-[#0c0a09] border border-transparent shadow-2xs' : 'border border-[#3A9F3A] bg-white text-[#3A9F3A] hover:bg-green-50'}">
                <span class="p-button-label">${isAdded ? 'remover ponto' : 'adicionar ponto'}</span>
                ${isAdded
                  ? '<svg class="w-4 h-4 text-[#0c0a09]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>'
                  : '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'}
              </button>
              <button type="button" onclick="if (typeof showToast === 'function') showToast('Ponto salvo nos seus favoritos!')" aria-label="Favoritar ponto" class="ml-5 w-6 h-6 flex items-center justify-center text-[#94a3b8] hover:text-[#EF4444] transition-colors shrink-0 cursor-pointer">
                <svg class="w-5 h-5 text-[#94a3b8]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </li>`;
  }

  // ==========================================================================
  // 5. INICIALIZAÇÃO DO MAPLIBRE GL JS (TILES ESRI ARCGIS WORLD STREET MAP)
  // 100% compatível com file:// (sem bloqueio 403 e sem marca d'água de API Key)
  // ==========================================================================
  let map = null;
  let activeDomMarkers = [];
  let isPointerDraggingDraw = false;

  function initMap() {
    const mapContainer = document.getElementById('mapa');
    if (!mapContainer) return;
    mapContainer.innerHTML = '';

    // Tiles Esri ArcGIS World Street Map: 100% compatível com file:// e sem marca d'água de API Key
    const arcgisLightStyle = {
      version: 8,
      sources: {
        'arcgis-world-street': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256,
          attribution: 'Tiles &copy; Esri'
        }
      },
      layers: [
        {
          id: 'arcgis-world-street-layer',
          type: 'raster',
          source: 'arcgis-world-street',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    };

    map = new maplibregl.Map({
      container: 'mapa',
      style: arcgisLightStyle,
      center: [-46.6842, -23.5968], // Centro exato da Vila Olímpia
      zoom: 14.1,
      minZoom: 10,
      maxZoom: 18,
      attributionControl: false
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    // Renderiza pinos, clusters e cards imediatamente (mesmo antes do download completo dos tiles externos)
    try {
      filterAndSyncAll();
    } catch (err) {
      console.error('Erro inicial em filterAndSyncAll:', err);
    }

    map.on('load', () => {
      map.resize();
      renderDrawingSVG();
      filterAndSyncAll();
    });

    // Mantém o desenho SVG de Área à Mão Livre perfeitamente colado às coordenadas geográficas durante o pan/zoom
    map.on('move', () => {
      renderDrawingSVG();
    });

    // Atualização em tempo real ao mover ou dar zoom no mapa (Fim do botão "Pesquisar nessa área")
    map.on('moveend', () => {
      renderDrawingSVG();
      filterAndSyncAll();
    });

    // Eventos de interação em 1 único gesto (Segurar, Arrastar e Soltar) para "Desenhar área"
    map.on('mousedown', handleMapMouseDownForDrawing);
    map.on('mousemove', handleMapMouseMoveForDrawing);
    map.on('mouseup', handleMapMouseUpForDrawing);

    // Suporte mobile/touch para o desenho à mão livre em 1 gesto
    map.on('touchstart', handleMapMouseDownForDrawing);
    map.on('touchmove', handleMapMouseMoveForDrawing);
    map.on('touchend', handleMapMouseUpForDrawing);
  }

  // ==========================================================================
  // 6. MOTOR VETORIAL SVG EM 60FPS PARA DESENHO À MÃO LIVRE (FREEHAND LASSO)
  // Renderiza fora do <canvas> para manter a cor laranja #FF4F00 100% vibrante!
  // ==========================================================================
  function renderDrawingSVG() {
    const svg = document.getElementById('map-drawing-svg');
    if (!svg || !map) return;

    // Determina qual geometria desenhar (ativa ou rascunho em tempo real durante o arrasto)
    let geom = state.activeGeometry;
    let isDraft = false;

    if (!geom && state.drawingMode === 'polygon' && state.polygonVertices.length > 0) {
      geom = {
        type: 'polygon',
        coordinates: state.polygonVertices
      };
      isDraft = true;
    }

    if (!geom) {
      svg.innerHTML = '';
      return;
    }

    if (geom.type === 'polygon' && geom.coordinates.length > 0) {
      const projectedPts = geom.coordinates.map((c) => map.project(c));
      if (projectedPts.length === 1) {
        const p0 = projectedPts[0];
        svg.innerHTML = `
          <circle cx="${p0.x.toFixed(1)}" cy="${p0.y.toFixed(1)}" r="6"
            fill="#FF4F00" stroke="#FFFFFF" stroke-width="2.5" />
        `;
        return;
      }

      const d =
        projectedPts
          .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
          .join(' ') + ' Z';

      const startPt = projectedPts[0];

      svg.innerHTML = `
        <path d="${d}"
          fill="rgba(255, 79, 0, 0.17)"
          stroke="#FF4F00"
          stroke-width="2.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="${isDraft ? '6 4' : 'none'}" />
        <circle cx="${startPt.x.toFixed(1)}" cy="${startPt.y.toFixed(1)}" r="5.5"
          fill="#FF4F00" stroke="#FFFFFF" stroke-width="2" />
      `;
    }
  }

  // ==========================================================================
  // 7. MOTOR DE CLUSTERIZAÇÃO ESPACIAL E MARCADORES DOM (LISTA <-> MAPA)
  // Usa .aqui-marker-anchor como raiz do MapLibre Marker para que o scale()
  // no filho (.aqui-cluster-marker / .aqui-pin-marker) NUNCA mova o marcador!
  // ==========================================================================
  function renderMapClustersAndPins() {
    if (!map) return;

    // Remove marcadores anteriores
    activeDomMarkers.forEach((m) => m.remove());
    activeDomMarkers = [];
    state.pointToMarkerMap.clear();
    state.clusters = [];

    const zoom = map.getZoom();
    // Pontos que pertencem à categoria ativa (e geometria ativa, se houver)
    const candidatePoints = ALL_POINTS.filter((p) => {
      if (state.activeCategory !== 'todos' && p.category !== state.activeCategory) {
        return false;
      }
      if (state.activeGeometry) {
        if (state.activeGeometry.type === 'radius') {
          return haversineDistanceMeters(state.activeGeometry.center, [p.lng, p.lat]) <= state.activeGeometry.radiusMeters;
        }
        if (state.activeGeometry.type === 'polygon') {
          return isPointInPolygon([p.lng, p.lat], state.activeGeometry.coordinates);
        }
      }
      return true;
    });

    // Distância em pixels para agrupar em cluster (desagrupa totalmente acima do zoom 16.1)
    const clusterPixelRadius = zoom >= 16.1 ? 0 : zoom >= 15.2 ? 42 : 58;
    const assigned = new Set();

    // Preserva os pontos individuais estratégicos (IDs 1, 4, 6) como pinos desagrupados em zoom >= 13.5
    // para que o usuário veja simultaneamente clusters densos (>20 pontos) e pinos individuais!
    const forceUnclusteredIds = zoom >= 13.5 ? new Set([1, 4, 6]) : new Set();

    const projected = candidatePoints.map((pt) => {
      const px = map.project([pt.lng, pt.lat]);
      return { pt, x: px.x, y: px.y };
    });

    for (let i = 0; i < projected.length; i++) {
      const item = projected[i];
      if (assigned.has(item.pt.id)) continue;

      if (clusterPixelRadius === 0 || forceUnclusteredIds.has(item.pt.id)) {
        assigned.add(item.pt.id);
        state.clusters.push({
          isCluster: false,
          points: [item.pt],
          lng: item.pt.lng,
          lat: item.pt.lat
        });
        continue;
      }

      const members = [item.pt];
      assigned.add(item.pt.id);

      for (let j = i + 1; j < projected.length; j++) {
        const other = projected[j];
        if (assigned.has(other.pt.id) || forceUnclusteredIds.has(other.pt.id)) continue;
        const dx = item.x - other.x;
        const dy = item.y - other.y;
        const distPx = Math.sqrt(dx * dx + dy * dy);
        if (distPx <= clusterPixelRadius) {
          members.push(other.pt);
          assigned.add(other.pt.id);
        }
      }

      if (members.length === 1) {
        state.clusters.push({
          isCluster: false,
          points: members,
          lng: item.pt.lng,
          lat: item.pt.lat
        });
      } else {
        const sumLng = members.reduce((acc, p) => acc + p.lng, 0);
        const sumLat = members.reduce((acc, p) => acc + p.lat, 0);
        state.clusters.push({
          isCluster: true,
          points: members,
          count: members.length,
          lng: sumLng / members.length,
          lat: sumLat / members.length
        });
      }
    }

    // Cria os elementos DOM no MapLibre usando sempre um wrapper .aqui-marker-anchor
    state.clusters.forEach((group) => {
      if (group.isCluster) {
        const count = group.count;
        const size = count >= 25 ? 52 : count >= 12 ? 46 : 40;
        const fontSize = count >= 25 ? '15px' : '14px';
        const inCartCount = group.points.filter((p) => state.cart.has(p.id)).length;

        const anchorEl = document.createElement('div');
        anchorEl.className = 'aqui-marker-anchor';

        const el = document.createElement('div');
        el.className = 'aqui-cluster-marker';
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.fontSize = fontSize;
        el.innerHTML = `
          <span>${count}</span>
          ${inCartCount > 0 ? `<span class="cluster-cart-badge" title="${inCartCount} selecionados neste grupo">${inCartCount}✓</span>` : ''}
        `;

        anchorEl.appendChild(el);

        // Clique no Cluster -> Foco suave e contido para desembolar apenas a região clicada (Seção 4.1)
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          if (state.drawingMode) return;
          const bounds = new maplibregl.LngLatBounds();
          group.points.forEach((p) => bounds.extend([p.lng, p.lat]));
          map.fitBounds(bounds, {
            padding: 80,
            maxZoom: Math.min(map.getZoom() + 2.1, 16.6),
            duration: 650
          });
        });

        const marker = new maplibregl.Marker({ element: anchorEl, anchor: 'center' })
          .setLngLat([group.lng, group.lat])
          .addTo(map);

        activeDomMarkers.push(marker);
        group.el = el;
        group.anchorEl = anchorEl;
        group.marker = marker;

        group.points.forEach((pt) => {
          state.pointToMarkerMap.set(pt.id, {
            type: 'cluster',
            el,
            anchorEl,
            marker,
            group,
            point: pt
          });
        });
      } else {
        const pt = group.points[0];
        const inCart = state.cart.has(pt.id);

        const anchorEl = document.createElement('div');
        anchorEl.className = 'aqui-marker-anchor';

        const el = document.createElement('div');
        el.className = `aqui-pin-marker ${inCart ? 'is-in-cart' : ''}`;
        el.innerHTML = `
          <span class="pin-dot"></span>
          <span>${inCart ? '✓ ' : ''}${formatCompactBRL(pt.price)}</span>
        `;

        anchorEl.appendChild(el);

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          if (state.drawingMode) return;
          openPinPopup(pt);
        });

        const marker = new maplibregl.Marker({ element: anchorEl, anchor: 'bottom' })
          .setLngLat([pt.lng, pt.lat])
          .addTo(map);

        activeDomMarkers.push(marker);
        state.pointToMarkerMap.set(pt.id, {
          type: 'pin',
          el,
          anchorEl,
          marker,
          group,
          point: pt
        });
      }
    });

    // Reaplica destaque se o mouse ainda estiver sobre algum card
    if (state.hoveredPointId) {
      highlightPointOnMap(state.hoveredPointId);
    }
  }

  // ==========================================================================
  // 8. SINCRONIA VISUAL ESPACIAL UNIDIRECIONAL (LISTA -> MAPA | SEÇÃO 4.1)
  // Ao fazer hover num card da lista lateral:
  // - Se o ponto estiver desagrupado: destaca o pino individual no mapa (sem sair do lugar!).
  // - Se o ponto estiver agrupado: destaca a bolha do cluster pai com anel pulsante e callout (sem sair do lugar!).
  // ==========================================================================
  function highlightPointOnMap(pointId) {
    clearMapHighlights();
    state.hoveredPointId = pointId;

    const entry = state.pointToMarkerMap.get(pointId);
    if (!entry) return;

    if (entry.anchorEl) {
      entry.anchorEl.classList.add('is-highlighted-anchor');
    }

    if (entry.type === 'pin') {
      entry.el.classList.add('is-pin-highlighted');
      const callout = document.createElement('div');
      callout.className = 'pin-hover-callout';
      callout.textContent = `📍 ${entry.point.title}`;
      entry.el.appendChild(callout);
    } else if (entry.type === 'cluster') {
      entry.el.classList.add('is-cluster-highlighted');
      const callout = document.createElement('div');
      callout.className = 'cluster-hover-callout';
      callout.innerHTML = `📍 <strong>${entry.point.title}</strong> está neste cluster (${entry.group.count} pontos)`;
      entry.el.appendChild(callout);
    }
  }

  function clearMapHighlights() {
    state.hoveredPointId = null;
    document.querySelectorAll('.is-highlighted-anchor').forEach((el) => {
      el.classList.remove('is-highlighted-anchor');
    });
    document.querySelectorAll('.is-pin-highlighted').forEach((el) => {
      el.classList.remove('is-pin-highlighted');
    });
    document.querySelectorAll('.is-cluster-highlighted').forEach((el) => {
      el.classList.remove('is-cluster-highlighted');
    });
    document.querySelectorAll('.pin-hover-callout, .cluster-hover-callout').forEach((el) => {
      el.remove();
    });
  }

  // ==========================================================================
  // 9. POPUP DE PINO INDIVIDUAL (MINI-CARD PADRÃO AQUI ADS)
  // ==========================================================================
  function openPinPopup(point) {
    if (state.activePopup) {
      state.activePopup.remove();
      state.activePopup = null;
    }

    const isAdded = state.cart.has(point.id);
    const popupHtml = `
      <div class="flex flex-col bg-white text-[#282E38]">
        <div class="relative h-[112px] w-full overflow-hidden bg-slate-100">
          <img src="${point.img}" alt="${point.title}" class="h-full w-full object-cover">
          <div class="absolute left-2.5 top-2.5 flex items-center gap-1.5">
            <span class="rounded bg-white/95 px-2 py-0.5 text-[10.5px] font-bold text-[#282E38] shadow-sm">${point.category}</span>
            <span class="rounded bg-[#695CFF] px-2 py-0.5 text-[10.5px] font-bold text-white shadow-sm">digital</span>
          </div>
        </div>
        <div class="flex flex-col p-3.5">
          <strong class="truncate text-[15px] font-extrabold text-[#0A0A0A]">${point.title}</strong>
          <p class="mt-0.5 truncate text-[11.5px] text-[#64748B]">${point.addr}</p>
          <div class="mt-2.5 flex items-center justify-between border-y border-[#EDF2F8] py-1.5 text-[11px] text-[#64748B]">
            <span><strong class="text-[#282E38]">${point.views}</strong> exib.</span>
            <span><strong class="text-[#282E38]">${point.reach}</strong> alc.</span>
            <span><strong class="text-[#282E38]">${point.screens}</strong> telas</span>
          </div>
          <div class="mt-2.5 flex items-baseline justify-between">
            <div>
              <strong class="text-[17px] font-extrabold text-[#0A0A0A]">R$ ${formatCurrencyBRL(point.price)}</strong>
              <span class="text-[11px] text-[#8C97A6]"> / 2 sem</span>
            </div>
          </div>
          <button type="button" id="popup-toggle-cart-btn" data-point-id="${point.id}"
            class="mt-3 flex h-[34px] w-full items-center justify-center gap-1.5 rounded-md border text-[12.5px] font-bold transition-colors cursor-pointer ${
              isAdded
                ? 'border-[#3A9F3A] bg-[#3A9F3A] text-white'
                : 'border-[#3A9F3A] bg-white text-[#3A9F3A] hover:bg-[#F0FDF4]'
            }">
            <span>${isAdded ? 'ponto adicionado ✓' : 'adicionar ponto'}</span>
          </button>
        </div>
      </div>
    `;

    const popup = new maplibregl.Popup({ offset: 18, closeButton: true, closeOnClick: true })
      .setLngLat([point.lng, point.lat])
      .setHTML(popupHtml)
      .addTo(map);

    state.activePopup = popup;

    setTimeout(() => {
      const btn = document.getElementById('popup-toggle-cart-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          togglePointInCart(point.id);
          openPinPopup(point); // Atualiza estado visual do popup
        });
      }
    }, 20);
  }

  // ==========================================================================
  // 10. FILTRAGEM AUTOMÁTICA E ATUALIZAÇÃO DE LISTA + SMART ACTIONS
  // ==========================================================================
  function filterAndSyncAll() {
    if (!map) return;

    const bounds = map.getBounds();

    state.visiblePoints = ALL_POINTS.filter((pt) => {
      // Filtro de categoria (#tour-filter)
      if (state.activeCategory !== 'todos' && pt.category !== state.activeCategory) {
        return false;
      }
      // Filtro por busca textual se houver
      if (state.searchQuery.trim() !== '') {
        const q = state.searchQuery.toLowerCase();
        const matchTitle = pt.title.toLowerCase().includes(q);
        const matchAddr = pt.addr.toLowerCase().includes(q);
        const matchCat = pt.category.toLowerCase().includes(q);
        if (!matchTitle && !matchAddr && !matchCat) return false;
      }
      // Se houver Raio ou Área Desenhada ativa, filtra estritamente pela marcação
      if (state.activeGeometry) {
        if (state.activeGeometry.type === 'radius') {
          return haversineDistanceMeters(state.activeGeometry.center, [pt.lng, pt.lat]) <= state.activeGeometry.radiusMeters;
        }
        if (state.activeGeometry.type === 'polygon') {
          return isPointInPolygon([pt.lng, pt.lat], state.activeGeometry.coordinates);
        }
      }
      // Caso contrário, filtra pela área visível do mapa (viewport bounds)
      return bounds.contains([pt.lng, pt.lat]);
    });

    renderCardList();
    renderMapClustersAndPins();
    updateCountersAndSmartActionsUI();
  }

  function renderCardList() {
    const container = document.getElementById('plp-cards-grid') || document.getElementById('cardlist_container');
    if (!container) return;

    const pointsToShow = state.visiblePoints.slice(0, state.displayedCardLimit);

    if (pointsToShow.length === 0) {
      container.innerHTML = `
        <li class="col-span-full flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-10 text-center">
          <i class="uil uil-map-marker text-4xl text-[#FF4F00] mb-2"></i>
          <strong class="text-lg font-bold text-[#282E38]">Nenhum ponto encontrado nesta área específica</strong>
          <p class="mt-1 text-sm text-[#64748B] max-w-md">Arraste ou reduza o zoom do mapa (ou limpe a marcação de área) para visualizar mais pontos comerciais e residenciais na região.</p>
          <button type="button" id="btn-empty-reset-map" class="mt-4 rounded-lg bg-[#FF4F00] px-4 py-2 text-sm font-bold text-white hover:bg-[#E04500] cursor-pointer">
            Centralizar em Vila Olímpia
          </button>
        </li>`;
      const resetBtn = document.getElementById('btn-empty-reset-map');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          clearActiveGeometry();
          state.activeCategory = 'todos';
          syncFilterChipsUI();
          map.flyTo({ center: [-46.6842, -23.5968], zoom: 14.1, duration: 700 });
        });
      }
      return;
    }

    const htmlParts = [];
    pointsToShow.forEach((pt, idx) => {
      htmlParts.push(renderCardHTML(pt));
      // Insere os banners promocionais oficiais do template na mesma posição (após 6º e 11º cards)
      if (idx === 5 && state.activeCategory === 'todos') {
        htmlParts.push(PROMO_BANNER_1_HTML);
      } else if (idx === 10 && state.activeCategory === 'todos') {
        htmlParts.push(PROMO_BANNER_2_HTML);
      }
    });

    container.innerHTML = htmlParts.join('');

    // Atualiza visibilidade do botão "ver mais" (.load-more-products)
    const loadMoreBtn = document.querySelector('.load-more-products');
    if (loadMoreBtn) {
      if (state.visiblePoints.length > state.displayedCardLimit) {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.classList.add('items-center', 'justify-center');
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }

    bindCardEvents();
  }

  function bindCardEvents() {
    const cards = document.querySelectorAll('#plp-cards-grid .carditem, #cardlist_container .carditem');
    cards.forEach((cardEl) => {
      const pointId = Number(cardEl.getAttribute('data-point-id'));
      if (!pointId) return;

      // Hover Lista -> Mapa (Sincronia Visual Espacial Unidirecional)
      cardEl.addEventListener('mouseenter', () => {
        highlightPointOnMap(pointId);
      });

      cardEl.addEventListener('mouseleave', () => {
        clearMapHighlights();
      });

      // Clique na foto ou no título do card -> destaca e abre o popup do ponto no mapa
      const focusEls = cardEl.querySelectorAll('[data-action="focus-map"]');
      focusEls.forEach((el) => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const pt = ALL_POINTS.find((p) => p.id === pointId);
          if (pt && map) {
            map.easeTo({ center: [pt.lng, pt.lat], zoom: Math.max(map.getZoom(), 16.2), duration: 550 });
            setTimeout(() => openPinPopup(pt), 580);
          }
        });
      });
    });

    // Botões "adicionar ponto" / "remover ponto" dentro dos cards
    const addButtons = document.querySelectorAll('#plp-cards-grid button[data-action="toggle-cart"], #cardlist_container button[data-action="toggle-cart"]');
    addButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = Number(btn.getAttribute('data-point-id'));
        if (id) togglePointInCart(id);
      });
    });
  }

  // ==========================================================================
  // 11. GESTÃO DO CARRINHO E SINCRONIZAÇÃO DE SMART ACTIONS
  // ==========================================================================
  function togglePointInCart(pointId) {
    if (state.cart.has(pointId)) {
      state.cart.delete(pointId);
    } else {
      state.cart.add(pointId);
    }
    syncCartStateEverywhere();
  }

  function addBatchPointsToCart(pointsArray) {
    if (!pointsArray || pointsArray.length === 0) return;
    const allAlreadyInCart = pointsArray.every((p) => state.cart.has(p.id));
    if (allAlreadyInCart) {
      pointsArray.forEach((p) => state.cart.delete(p.id));
    } else {
      pointsArray.forEach((p) => state.cart.add(p.id));
    }
    syncCartStateEverywhere();
  }

  function syncCartStateEverywhere() {
    // 1. Atualiza cards visíveis com o estilo oficial (borda verde, fundo #F0FDF4 e ícone de lixeira/carrinho)
    renderCardList();

    // 2. Atualiza marcadores e clusters no mapa
    renderMapClustersAndPins();

    // 3. Atualiza barra de Smart Actions e barra inferior oficial
    updateCountersAndSmartActionsUI();
    updateBottomCartBarUI();
  }

  function updateCountersAndSmartActionsUI() {
    const count = state.visiblePoints.length;
    const totalVisiblePrice = state.visiblePoints.reduce((acc, p) => acc + p.price, 0);
    const allVisibleInCart = count > 0 && state.visiblePoints.every((p) => state.cart.has(p.id));
    const hasMarking = Boolean(state.activeGeometry);

    // Smart Actions no Modo Mapa 100%:
    // O botão "Adicionar" fica OCULTO por padrão e SÓ aparece quando o cliente faz o desenho da área!
    const btnAddVisible = document.getElementById('btn-add-visible-area');
    const btnAddVisibleLabel = document.getElementById('btn-add-visible-area-label');
    const btnClearGeom = document.getElementById('btn-clear-geometry');

    if (btnAddVisible) {
      btnAddVisible.classList.toggle('hidden', !hasMarking);
      if (hasMarking && btnAddVisibleLabel) {
        if (allVisibleInCart) {
          btnAddVisible.classList.remove('smart-action-btn--primary');
          btnAddVisible.classList.add('smart-action-btn--success');
          btnAddVisibleLabel.textContent = `✓ ${count} pontos da área adicionados`;
        } else {
          btnAddVisible.classList.add('smart-action-btn--primary');
          btnAddVisible.classList.remove('smart-action-btn--success');
          btnAddVisibleLabel.textContent = `Adicionar ${count} ${count === 1 ? 'ponto' : 'pontos'} da área`;
        }
      }
    }

    if (btnClearGeom) {
      btnClearGeom.classList.toggle('hidden', !hasMarking);
    }

    // Painel Flutuante de Área Desenhada (#map-selection-pill): Exibido SOMENTE quando o cliente faz o desenho
    const selectionPill = document.getElementById('map-selection-pill');
    const pillTitle = document.getElementById('selection-pill-title');
    const pillSubtitle = document.getElementById('selection-pill-subtitle');
    const pillBatchBtn = document.getElementById('btn-add-selection-batch');

    if (selectionPill) {
      if (hasMarking) {
        selectionPill.classList.remove('hidden');
        selectionPill.classList.add('flex');
        if (pillTitle) {
          pillTitle.textContent = `🎯 Área desenhada: ${count} ${count === 1 ? 'ponto encontrado' : 'pontos encontrados'}`;
        }
        if (pillSubtitle) {
          pillSubtitle.textContent = `Investimento estimado: R$ ${formatCurrencyBRL(totalVisiblePrice)} / 2 semanas`;
        }
        if (pillBatchBtn) {
          pillBatchBtn.innerHTML = allVisibleInCart
            ? `<i class="uil uil-check mr-1"></i> ${count} pontos adicionados`
            : `<i class="uil uil-shopping-cart mr-1"></i> Adicionar ${count} pontos da área`;
        }
      } else {
        selectionPill.classList.add('hidden');
        selectionPill.classList.remove('flex');
      }
    }
  }

  function updateBottomCartBarUI() {
    const selectedPoints = ALL_POINTS.filter((p) => state.cart.has(p.id));
    const count = selectedPoints.length;
    const totalPrice = selectedPoints.reduce((acc, p) => acc + p.price, 0);
    const totalScreens = selectedPoints.reduce((acc, p) => acc + p.screens, 0);

    // Sincroniza com o estado global do AquiAdsUI (para permitir avançar para Resumo do Plano / Checkout)
    try {
      const uiState = (window.AquiAdsUI && typeof window.AquiAdsUI.getState === 'function') ? window.AquiAdsUI.getState() : null;
      if (uiState && uiState.cartState) {
        uiState.cartState.oohItems = selectedPoints.map((p) => ({
          id: String(p.id),
          name: p.title,
          title: p.title,
          address: p.addr,
          sub: p.addr,
          environment: p.category,
          environmentLabel: p.category,
          format: 'digital',
          basePrice2w: p.price,
          price4w: p.price * 1.8,
          price: p.price,
          impressions: p.screens * 18000,
          reach: p.screens * 2400,
          freq: p.freq,
          screens: p.screens,
          img: p.img,
          selectedForBatch: false
        }));
      }
    } catch (err) {
      // ignora caso AquiAdsUI.getState não esteja disponível
    }

    const headerBadge = document.getElementById('header-cart-badge');
    const hdrCartBadge = document.getElementById('hdr-cart-badge');
    const bottomBadge = document.getElementById('bottom-cart-badge');
    const bottomTitle = document.getElementById('bottom-cart-title');
    const bottomMetrics = document.getElementById('bottom-cart-metrics');
    const bottomTotal = document.getElementById('bottom-cart-total');
    const clearCartBtn = document.getElementById('btn-clear-cart');
    const nextBtn = document.getElementById('resultpage_next-button');

    // Elementos da barra inferior oficial do AquiAdsUI (#actions-bar-results)
    const plpBarLeft = document.getElementById('plp-bar-summary-left');
    const plpBarCount = document.getElementById('plp-bar-count');
    const plpBarLabel = document.getElementById('plp-bar-count-label');
    const plpBarTotal = document.getElementById('plp-bar-total');

    if (headerBadge) {
      headerBadge.textContent = String(count);
      headerBadge.classList.toggle('hidden', count === 0);
    }

    if (hdrCartBadge) {
      hdrCartBadge.textContent = String(count);
      hdrCartBadge.classList.toggle('hidden', count === 0);
    }

    if (plpBarLeft) {
      if (count > 0) {
        plpBarLeft.classList.remove('hidden');
        plpBarLeft.classList.add('flex');
      } else {
        plpBarLeft.classList.add('hidden');
        plpBarLeft.classList.remove('flex');
      }
    }

    if (plpBarCount) {
      plpBarCount.textContent = String(count);
    }

    if (plpBarLabel) {
      plpBarLabel.textContent = count === 1
        ? 'ponto adicionado ao plano de mídia'
        : 'pontos adicionados ao plano de mídia';
    }

    if (plpBarTotal) {
      plpBarTotal.textContent = `R$ ${formatCurrencyBRL(totalPrice)}`;
    }

    if (bottomBadge) {
      bottomBadge.textContent = String(count);
      bottomBadge.className = count > 0
        ? 'inline-flex h-7 min-w-[28px] items-center justify-center rounded-full bg-[#3A9F3A] px-2 text-[13px] font-extrabold text-white'
        : 'inline-flex h-7 min-w-[28px] items-center justify-center rounded-full bg-[#EDF2F8] px-2 text-[13px] font-extrabold text-[#64748B]';
    }

    if (bottomTitle) {
      bottomTitle.textContent = count === 0
        ? 'Nenhum ponto selecionado'
        : `${count} ${count === 1 ? 'ponto selecionado' : 'pontos selecionados'} para a campanha`;
    }

    if (bottomMetrics) {
      bottomMetrics.textContent = count === 0
        ? 'Adicione pontos na lista ou diretamente pelo mapa'
        : `${totalScreens} telas digitais • Vila Olímpia e região`;
    }

    if (bottomTotal) {
      bottomTotal.textContent = `R$ ${formatCurrencyBRL(totalPrice)}`;
    }

    if (clearCartBtn) {
      clearCartBtn.classList.toggle('hidden', count === 0);
    }

    if (nextBtn) {
      if (count > 0) {
        nextBtn.removeAttribute('disabled');
        nextBtn.setAttribute('aria-disabled', 'false');
        nextBtn.classList.remove('p-disabled', 'bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
        nextBtn.classList.add('bg-[#FF4F00]', 'hover:bg-[#e04500]', 'text-white', 'cursor-pointer', 'shadow-md');
      } else {
        nextBtn.setAttribute('disabled', '');
        nextBtn.setAttribute('aria-disabled', 'true');
        nextBtn.classList.add('p-disabled', 'bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
        nextBtn.classList.remove('bg-[#FF4F00]', 'hover:bg-[#e04500]', 'text-white', 'cursor-pointer', 'shadow-md');
      }
    }
  }

  // ==========================================================================
  // 12. TRANSIÇÃO SPLIT-SCREEN <-> MODO MAPA 100% (SEÇÃO 4.2) & SCROLL LOCK AIRBNB
  // ==========================================================================
  function syncOohScrollLockMode() {
    const viewResultados = document.getElementById('view-resultados');
    const plpModeOoh = document.getElementById('plp-mode-ooh');
    const vpContainer = document.getElementById('viewport-container');

    const isResultadosActive = viewResultados
      ? (viewResultados.classList.contains('active') && !viewResultados.classList.contains('hidden'))
      : true;
    const isOohVisible = plpModeOoh ? !plpModeOoh.classList.contains('hidden') : true;
    const isMobileFrame = vpContainer ? vpContainer.classList.contains('mobile-frame') : false;

    document.body.classList.toggle('mobile-frame-active', isMobileFrame);
    const shouldLock = isResultadosActive && isOohVisible && !isMobileFrame && window.innerWidth >= 1024;
    document.body.classList.toggle('ooh-split-scroll-lock', shouldLock);

    const layoutEl = document.querySelector('.results-ooh-layout');
    const listWrap = document.getElementById('list-column-wrapper');
    const mapWrap = document.getElementById('map-sticky-wrapper');
    const mapaEl = document.getElementById('mapa');

    if (layoutEl) {
      if (shouldLock) {
        const bottomBar = document.querySelector('#actions-bar-results, .actions-bar-results');
        const bottomBarHeight = bottomBar && bottomBar.offsetHeight > 0 ? bottomBar.offsetHeight : 68;
        const rectTop = Math.round(layoutEl.getBoundingClientRect().top);
        const layoutTop = rectTop > 80 && rectTop < 420 ? rectTop : 210;
        const splitHeight = Math.max(460, Math.floor(window.innerHeight - layoutTop - bottomBarHeight - 10));

        document.documentElement.style.setProperty('--ooh-split-height', `${splitHeight}px`);
        layoutEl.style.setProperty('--ooh-split-height', `${splitHeight}px`);
        layoutEl.style.height = `${splitHeight}px`;

        if (listWrap && !state.isMapExpanded) {
          listWrap.style.height = `${splitHeight}px`;
          listWrap.style.maxHeight = `${splitHeight}px`;
        }
        if (mapWrap) {
          mapWrap.style.height = `${splitHeight}px`;
          mapWrap.style.minHeight = '460px';
        }
        if (mapaEl) {
          mapaEl.style.height = `${splitHeight}px`;
          mapaEl.style.minHeight = '460px';
        }
      } else {
        document.documentElement.style.removeProperty('--ooh-split-height');
        layoutEl.style.removeProperty('--ooh-split-height');
        layoutEl.style.removeProperty('height');
        if (listWrap) {
          listWrap.style.removeProperty('height');
          listWrap.style.removeProperty('max-height');
        }
        if (mapWrap && !state.isMapExpanded) {
          mapWrap.style.height = isMobileFrame ? '260px' : '580px';
        }
        if (mapaEl && !state.isMapExpanded) {
          mapaEl.style.height = isMobileFrame ? '260px' : '580px';
        }
      }
    }

    if (map) {
      map.resize();
      renderDrawingSVG();
      setTimeout(() => {
        if (map) {
          map.resize();
          renderDrawingSVG();
        }
      }, 60);
    }
  }

  function syncExpandedMapHeight() {
    const mapWrapper = document.getElementById('map-sticky-wrapper');
    if (!mapWrapper) return;

    // No modo Airbnb (body.ooh-split-scroll-lock), syncOohScrollLockMode já aplica a altura exata em pixels
    if (document.body.classList.contains('ooh-split-scroll-lock')) {
      syncOohScrollLockMode();
      return;
    }

    if (!state.isMapExpanded) {
      mapWrapper.style.removeProperty('--expanded-map-height');
      mapWrapper.style.removeProperty('height');
      return;
    }

    const bottomBar = document.querySelector('#actions-bar-results, .actions-bar-results');
    const mapRect = mapWrapper.getBoundingClientRect();
    const bottomBarTop = bottomBar
      ? bottomBar.getBoundingClientRect().top
      : window.innerHeight - 80;

    const desiredGapPx = 24;
    const calculatedHeight = Math.max(260, Math.floor(bottomBarTop - mapRect.top - desiredGapPx));

    mapWrapper.style.setProperty('--expanded-map-height', `${calculatedHeight}px`);
    mapWrapper.style.setProperty('height', `${calculatedHeight}px`, 'important');
  }

  function toggleMapExpandedMode() {
    state.isMapExpanded = !state.isMapExpanded;

    if (state.isMapExpanded) {
      window.scrollTo(0, 0);
    }

    document.body.classList.toggle('is-map-100-mode', state.isMapExpanded);

    const layoutEl = document.querySelector('.results-ooh-layout');
    const expandBtn = document.getElementById('map-expand-floating-button');

    if (layoutEl) {
      layoutEl.classList.toggle('map-expanded-mode', state.isMapExpanded);
    }

    if (expandBtn) {
      const spans = expandBtn.querySelectorAll('span');
      const labelEl = spans.length > 0 ? spans[spans.length - 1] : null;
      if (labelEl) {
        labelEl.textContent = state.isMapExpanded ? 'voltar para lista' : 'expandir mapa';
      }
      expandBtn.setAttribute(
        'aria-label',
        state.isMapExpanded ? 'Voltar para visualização em lista' : 'Expandir mapa'
      );
    }

    if (!state.isMapExpanded && state.drawingMode) {
      cancelDrawingMode();
    }

    syncExpandedMapHeight();

    if (map) {
      map.resize();
      setTimeout(() => {
        syncExpandedMapHeight();
        map.resize();
        renderDrawingSVG();
        filterAndSyncAll();
      }, 150);
      setTimeout(() => {
        syncExpandedMapHeight();
        map.resize();
        renderDrawingSVG();
      }, 350);
    }
  }

  // ==========================================================================
  // 13. NOVA EXPERIÊNCIA DE DESENHO EM 1 GESTO ("DESENHAR ÁREA" - FREEHAND LASSO)
  // Segure o clique, arraste contornando a área e solte para concluir automaticamente!
  // ==========================================================================
  function startPolygonMode() {
    if (state.drawingMode === 'polygon') {
      cancelDrawingMode();
      return;
    }
    state.drawingMode = 'polygon';
    isPointerDraggingDraw = false;
    state.polygonVertices = [];
    state.radiusCenter = null;
    state.activeGeometry = null;

    if (map && map.dragPan) map.dragPan.disable();
    document.body.classList.add('is-drawing-on-map');

    syncDrawingUI('Segure o clique e arraste à mão livre para contornar a região desejada');
    renderDrawingSVG();
    filterAndSyncAll();
  }

  function cancelDrawingMode() {
    state.drawingMode = null;
    isPointerDraggingDraw = false;
    state.radiusCenter = null;
    state.radiusMeters = 0;
    state.polygonVertices = [];
    state.cursorLngLat = null;

    if (map && map.dragPan) map.dragPan.enable();
    document.body.classList.remove('is-drawing-on-map');

    syncDrawingUI('');
    renderDrawingSVG();
  }

  function clearActiveGeometry() {
    state.activeGeometry = null;
    cancelDrawingMode();
    renderDrawingSVG();
    filterAndSyncAll();
  }

  function syncDrawingUI(helperText) {
    const btnPolygon = document.getElementById('btn-tool-polygon');
    const helperBar = document.getElementById('map-drawing-helper');
    const helperTextEl = document.getElementById('map-drawing-helper-text');

    if (btnPolygon) btnPolygon.classList.toggle('is-active-tool', state.drawingMode === 'polygon');

    if (helperBar) {
      if (state.drawingMode) {
        helperBar.classList.remove('hidden');
        helperBar.classList.add('flex');
      } else {
        helperBar.classList.add('hidden');
        helperBar.classList.remove('flex');
      }
    }

    if (helperTextEl && helperText) {
      helperTextEl.textContent = helperText;
    }
  }

  function handleMapMouseDownForDrawing(e) {
    if (state.drawingMode !== 'polygon' || !e.lngLat) return;
    if (e.originalEvent && e.originalEvent.button !== undefined && e.originalEvent.button !== 0) return;

    isPointerDraggingDraw = true;
    const coord = [e.lngLat.lng, e.lngLat.lat];
    state.polygonVertices = [coord];
    syncDrawingUI('Continue arrastando ao redor da área e solte o clique para concluir');
    renderDrawingSVG();
  }

  function handleMapMouseMoveForDrawing(e) {
    if (state.drawingMode !== 'polygon' || !isPointerDraggingDraw || !e.lngLat) return;
    const coord = [e.lngLat.lng, e.lngLat.lat];

    const lastCoord = state.polygonVertices[state.polygonVertices.length - 1];
    if (lastCoord) {
      const lastPx = map.project(lastCoord);
      const currPx = e.point || map.project(coord);
      const distPx = Math.hypot(currPx.x - lastPx.x, currPx.y - lastPx.y);
      if (distPx >= 6) {
        state.polygonVertices.push(coord);
        renderDrawingSVG();
      }
    }
  }

  function handleMapMouseUpForDrawing() {
    if (state.drawingMode !== 'polygon' || !isPointerDraggingDraw) return;
    isPointerDraggingDraw = false;

    if (state.polygonVertices.length >= 3) {
      state.activeGeometry = {
        type: 'polygon',
        coordinates: [...state.polygonVertices]
      };
      state.drawingMode = null;
      state.polygonVertices = [];

      if (map && map.dragPan) map.dragPan.enable();
      document.body.classList.remove('is-drawing-on-map');

      syncDrawingUI('');
      renderDrawingSVG();
      filterAndSyncAll();
    } else {
      state.polygonVertices = [];
      renderDrawingSVG();
      syncDrawingUI('Segure o botão do mouse pressionado e arraste para desenhar o contorno de uma só vez');
    }
  }

  // ==========================================================================
  // 14. ADAPTAÇÃO CIRÚRGICA DO TEMPLATE OFICIAL (PRESERVA 100% DO DOM DE aqui_ads_ui.js)
  // ==========================================================================
  function mountOohSplitScreenDOM() {
    const oohSubTab = document.getElementById('oohSubTab');
    if (!oohSubTab || document.getElementById('mapa')) return;

    const mainGrid = oohSubTab.querySelector('.grid');
    if (!mainGrid || mainGrid.children.length < 2) return;

    mainGrid.classList.add('results-ooh-layout');

    const leftCol = mainGrid.children[0];
    const rightCol = mainGrid.children[1];

    leftCol.id = 'list-column-wrapper';

    // Coleta as 3 seções inferiores oficiais do template ("Explore outros ambientes", FAQ e SEO)
    // para que fiquem dentro do scroll da coluna esquerda enquanto o mapa à direita permanece 100% fixo
    const bottomSections = [];
    Array.from(oohSubTab.children).forEach((child) => {
      if (child !== mainGrid) {
        bottomSections.push(child);
      }
    });

    // Preserva o zoom 0.8 oficial do template exclusivamente nos cards e nas seções inferiores
    // mantendo coordenadas 1:1 no MapLibre GL JS e no SVG de desenho à direita
    const zoomWrap = document.createElement('div');
    zoomWrap.id = 'list-zoom-content';
    zoomWrap.className = 'apply-zoom w-full';

    while (leftCol.firstChild) {
      zoomWrap.appendChild(leftCol.firstChild);
    }

    // Configura o botão oficial "ver mais" (#FF4F00) para carregar mais pontos reais sem disparar apenas toast
    const officialLoadMoreBtn = zoomWrap.querySelector('button');
    if (officialLoadMoreBtn) {
      officialLoadMoreBtn.classList.add('load-more-products');
      officialLoadMoreBtn.removeAttribute('onclick');
    }

    bottomSections.forEach((sec) => {
      zoomWrap.appendChild(sec);
    });

    leftCol.appendChild(zoomWrap);

    // Substitui apenas o quadro estático do mapa à direita pelo Mapa Interativo MapLibre + Overlays
    rightCol.id = 'map-sticky-wrapper';
    rightCol.className = 'w-full h-[560px] lg:h-[580px] rounded-[20px] overflow-hidden shadow-sm border border-[#E2E8F0] relative bg-[#EDF2F7]';
    rightCol.style.minHeight = '480px';
    rightCol.style.height = '580px';
    rightCol.innerHTML = `
      <div id="mapa" class="w-full h-full" style="position:absolute;inset:0;width:100%;height:100%;min-height:480px;"></div>

      <!-- Camada SVG para Desenho de Área em 1 Gesto (Freehand Lasso) -->
      <svg id="map-drawing-svg" class="pointer-events-none absolute inset-0 w-full h-full z-[15]"></svg>

      <!-- Botão Flutuante Expandir Mapa / Voltar para Lista -->
      <button
        type="button"
        id="map-expand-floating-button"
        aria-label="Expandir mapa"
        class="map-expand-floating-btn"
      >
        <i class="uil uil-expand-arrows-alt text-sm text-[#FF4F00]"></i>
        <span>expandir mapa</span>
      </button>

      <!-- Barra de Ações Inteligentes do Modo Mapa 100% (Desenhar Área) -->
      <div id="map-smart-actions-bar" aria-label="Ferramentas de seleção no mapa">
        <button type="button" id="btn-tool-polygon" class="smart-action-btn">
          <i class="uil uil-pen text-sm text-[#FF4F00]"></i>
          <span>Desenhar área</span>
        </button>
        <button type="button" id="btn-add-visible-area" class="smart-action-btn smart-action-btn--primary hidden">
          <i class="uil uil-shopping-cart text-sm"></i>
          <span id="btn-add-visible-area-label">Adicionar pontos da área</span>
        </button>
        <button type="button" id="btn-clear-geometry" class="smart-action-btn hidden text-red-600 border-red-200 bg-red-50">
          <i class="uil uil-times-circle text-sm"></i>
          <span>Limpar área</span>
        </button>
      </div>

      <!-- Helper Flutuante durante o Desenho à Mão Livre -->
      <div id="map-drawing-helper" class="hidden">
        <span class="w-2 h-2 rounded-full bg-[#FF4F00] animate-ping"></span>
        <span id="map-drawing-helper-text">Segure o clique e arraste à mão livre para contornar a região desejada</span>
        <button type="button" id="btn-cancel-drawing" class="ml-2 underline font-bold text-orange-300 hover:text-white">
          Cancelar (Esc)
        </button>
      </div>

      <!-- Pill Inferior de Conversão em Lote (Exibida após desenhar área no mapa) -->
      <div id="map-selection-pill" class="hidden">
        <div class="flex flex-col">
          <span id="selection-pill-title" class="text-xs font-extrabold text-slate-900">0 pontos na área desenhada</span>
          <span id="selection-pill-subtitle" class="text-[11px] font-medium text-slate-500">0 telas • Total estimado: R$ 0,00</span>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" id="btn-add-selection-batch" class="px-3.5 py-2 rounded-full bg-[#FF4F00] hover:bg-[#e04500] text-white text-xs font-bold shadow-sm transition-all cursor-pointer">
            + Adicionar todos da área
          </button>
          <button type="button" id="btn-pill-clear-geom" class="px-2.5 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-all cursor-pointer">
            Limpar área
          </button>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // 15. EVENT LISTENERS DOS CONTROLES DO HEADER, FILTROS OFICIAIS E BOTÕES
  // ==========================================================================
  const AMBIENCE_MAP_TO_CATEGORY = {
    todos: 'todos',
    comercial: 'elevadores comerciais',
    residencial: 'elevadores residenciais',
    onibus: 'pontos de ônibus',
    shopping: 'shoppings',
    academia: 'academias'
  };

  function syncFilterChipsUI() {
    const officialBtns = document.querySelectorAll('#plp-ambience-chips .plp-ambience-btn');
    officialBtns.forEach((btn) => {
      const ambKey = btn.getAttribute('data-amb') || 'todos';
      const mappedCategory = AMBIENCE_MAP_TO_CATEGORY[ambKey] || ambKey;
      const isActive = mappedCategory === state.activeCategory;
      btn.className = isActive
        ? 'plp-ambience-btn px-3 py-1.5 rounded-md text-xs font-semibold bg-[#4E5D6C] border border-[#4E5D6C] text-white cursor-pointer transition'
        : 'plp-ambience-btn px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#282E38] cursor-pointer transition';
    });
  }

  function applyAmbienceCategoryFilter(ambKeyOrCategory) {
    const raw = String(ambKeyOrCategory || 'todos').trim().toLowerCase();
    const mapped = AMBIENCE_MAP_TO_CATEGORY[raw] || raw || 'todos';
    state.activeCategory = mapped;
    state.displayedCardLimit = 20;
    syncFilterChipsUI();
    filterAndSyncAll();
    const listWrap = document.getElementById('list-column-wrapper');
    if (listWrap) listWrap.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function bindGlobalUIEvents() {
    // 1. Garante classe .uil em todos os ícones Unicons existentes
    document.querySelectorAll('[class*="uil-"]').forEach((el) => {
      if (!el.classList.contains('uil')) el.classList.add('uil');
    });

    // 2. Botão Expandir Mapa / Voltar para Lista (#map-expand-floating-button)
    const expandBtn = document.getElementById('map-expand-floating-button');
    if (expandBtn) {
      expandBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMapExpandedMode();
      });
    }

    // Recalcula modo scroll-lock e altura do Mapa ao redimensionar a janela
    window.addEventListener('resize', () => {
      syncOohScrollLockMode();
      if (state.isMapExpanded) {
        syncExpandedMapHeight();
        if (map) map.resize();
      }
    });

    // Encaminha rolagem do mouse (wheel) sobre áreas neutras da página OOH diretamente para a lista de pontos (#list-column-wrapper)
    const plpModeOoh = document.getElementById('plp-mode-ooh');
    if (plpModeOoh) {
      plpModeOoh.addEventListener(
        'wheel',
        (e) => {
          if (!document.body.classList.contains('ooh-split-scroll-lock') || state.isMapExpanded) return;
          const mapWrap = document.getElementById('map-sticky-wrapper');
          const listWrap = document.getElementById('list-column-wrapper');
          if (!listWrap) return;
          if (mapWrap && mapWrap.contains(e.target)) return;
          if (listWrap.contains(e.target)) return;
          listWrap.scrollTop += e.deltaY;
          e.preventDefault();
        },
        { passive: false }
      );
    }

    // Intercepta funções globais da shell oficial (aqui_ads_ui.js) para manter 100% de integração
    window.renderOohPlp = function () {
      renderCardList();
    };

    window.filterPlpAmbience = function (ambKey) {
      applyAmbienceCategoryFilter(ambKey);
    };

    if (typeof window.toggleOohSearchDuration === 'function' && !window.__oohDurationHooked) {
      window.__oohDurationHooked = true;
      const origToggleDuration = window.toggleOohSearchDuration;
      window.toggleOohSearchDuration = function () {
        origToggleDuration();
        renderCardList();
        updateCountersAndSmartActionsUI();
      };
    }

    if (typeof window.showScreen === 'function' && !window.__oohShowScreenHooked) {
      window.__oohShowScreenHooked = true;
      const origShowScreen = window.showScreen;
      window.showScreen = function (screenId) {
        origShowScreen(screenId);
        syncOohScrollLockMode();
      };
    }

    if (typeof window.switchPlpChannel === 'function' && !window.__oohSwitchChannelHooked) {
      window.__oohSwitchChannelHooked = true;
      const origSwitchPlpChannel = window.switchPlpChannel;
      window.switchPlpChannel = function (channel) {
        origSwitchPlpChannel(channel);
        syncOohScrollLockMode();
      };
    }

    if (typeof window.setViewportMode === 'function' && !window.__oohViewportHooked) {
      window.__oohViewportHooked = true;
      const origSetViewportMode = window.setViewportMode;
      window.setViewportMode = function (mode) {
        origSetViewportMode(mode);
        syncOohScrollLockMode();
      };
    }

    // 3. Pílulas oficiais de filtro de ambientes (#plp-ambience-chips .plp-ambience-btn)
    const officialChips = document.querySelectorAll('#plp-ambience-chips .plp-ambience-btn');
    officialChips.forEach((chip) => {
      chip.removeAttribute('onclick');
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const ambKey = chip.getAttribute('data-amb') || chip.textContent || 'todos';
        applyAmbienceCategoryFilter(ambKey);
      });
    });

    // 4. Barra de Busca Oficial (#plp-search-address e botão Lupa Laranja #FF4F00)
    const addressInput = document.getElementById('plp-search-address');
    const searchBarWrap = addressInput ? addressInput.closest('.max-w-\\[688px\\]') : null;
    const searchSubmitBtn = searchBarWrap ? searchBarWrap.querySelector('button.bg-\\[\\#FF4F00\\]') : null;
    const clearAddrBtn = addressInput && addressInput.parentElement ? addressInput.parentElement.querySelector('button') : null;

    function executeAddressFlyTo() {
      if (!addressInput || !map) return;
      const val = addressInput.value.toLowerCase();
      if (val.includes('itaim')) {
        map.flyTo({ center: [-46.6788, -23.5882], zoom: 14.8, duration: 750 });
      } else if (val.includes('berrini') || val.includes('moema')) {
        map.flyTo({ center: [-46.6885, -23.6042], zoom: 14.6, duration: 750 });
      } else if (val.includes('funchal') || val.includes('jk')) {
        map.flyTo({ center: [-46.6902, -23.5948], zoom: 15.0, duration: 750 });
      } else {
        map.flyTo({ center: [-46.6842, -23.5968], zoom: 14.2, duration: 750 });
      }
      const listWrap = document.getElementById('list-column-wrapper');
      if (listWrap) listWrap.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (addressInput) {
      addressInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          executeAddressFlyTo();
        }
      });
    }

    if (searchSubmitBtn) {
      searchSubmitBtn.removeAttribute('onclick');
      searchSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        executeAddressFlyTo();
      });
    }

    if (clearAddrBtn && addressInput) {
      clearAddrBtn.removeAttribute('onclick');
      clearAddrBtn.addEventListener('click', () => {
        addressInput.value = '';
        state.searchQuery = '';
        addressInput.focus();
        filterAndSyncAll();
      });
    }

    // 5. Botão oficial "ver mais" (.load-more-products)
    const loadMoreBtn = document.querySelector('.load-more-products');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        state.displayedCardLimit += 24;
        renderCardList();
      });
    }

    // 6. Smart Actions no Modo Mapa 100% (Desenhar Área + Adicionar Pontos da Área)
    const btnAddVisibleArea = document.getElementById('btn-add-visible-area');
    if (btnAddVisibleArea) {
      btnAddVisibleArea.addEventListener('click', () => {
        addBatchPointsToCart(state.visiblePoints);
      });
    }

    const btnAddSelectionBatch = document.getElementById('btn-add-selection-batch');
    if (btnAddSelectionBatch) {
      btnAddSelectionBatch.addEventListener('click', () => {
        addBatchPointsToCart(state.visiblePoints);
      });
    }

    const btnToolPolygon = document.getElementById('btn-tool-polygon');
    if (btnToolPolygon) {
      btnToolPolygon.addEventListener('click', startPolygonMode);
    }

    const btnCancelDrawing = document.getElementById('btn-cancel-drawing');
    if (btnCancelDrawing) {
      btnCancelDrawing.addEventListener('click', cancelDrawingMode);
    }

    const btnClearGeom = document.getElementById('btn-clear-geometry');
    const btnPillClearGeom = document.getElementById('btn-pill-clear-geom');
    [btnClearGeom, btnPillClearGeom].forEach((btn) => {
      if (btn) btn.addEventListener('click', clearActiveGeometry);
    });

    // 7. Barra inferior do carrinho (#btn-clear-cart e #resultpage_next-button)
    const btnClearCart = document.getElementById('btn-clear-cart');
    if (btnClearCart) {
      btnClearCart.addEventListener('click', () => {
        state.cart.clear();
        syncCartStateEverywhere();
      });
    }

    const nextBtn = document.getElementById('resultpage_next-button');
    if (nextBtn) {
      nextBtn.removeAttribute('onclick');
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.cart.size === 0) return;
        if (typeof window.showScreen === 'function') {
          window.showScreen('view-resumo');
        }
      });
    }
  }

  function bootOohInteractiveMapApp() {
    try {
      if (window.AquiAdsUI && !window.AquiAdsUI.mounted && typeof window.AquiAdsUI.mount === 'function') {
        window.AquiAdsUI.mount();
      }
    } catch (err) {
      console.error('Erro em AquiAdsUI.mount:', err);
    }

    try {
      mountOohSplitScreenDOM();
    } catch (err) {
      console.error('Erro em mountOohSplitScreenDOM:', err);
    }

    try {
      initMap();
    } catch (err) {
      console.error('Erro em initMap:', err);
    }

    try {
      renderCardList();
    } catch (err) {
      console.error('Erro em renderCardList:', err);
    }

    try {
      syncOohScrollLockMode();
    } catch (err) {
      console.error('Erro em syncOohScrollLockMode:', err);
    }

    try {
      bindGlobalUIEvents();
    } catch (err) {
      console.error('Erro em bindGlobalUIEvents:', err);
    }

    try {
      updateBottomCartBarUI();
    } catch (err) {
      console.error('Erro em updateBottomCartBarUI:', err);
    }

    requestAnimationFrame(() => syncOohScrollLockMode());
    setTimeout(syncOohScrollLockMode, 180);
    setTimeout(syncOohScrollLockMode, 500);
  }

  // Inicialização quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootOohInteractiveMapApp);
  } else {
    bootOohInteractiveMapApp();
  }
})();
