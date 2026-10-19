// app.js

const CLOUD_SYNC_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a1557525822195';
const LOCAL_STORAGE_KEY = 'aqui_ads_tracking_decisions_v1';

const state = {
    events: [],
    decisionsMap: {},
    view: 'list', // 'list' or 'details'
    selectedEventOriginalName: null,
    filters: {
        search: '',
        module: 'Todos',
        errorCategory: 'Todas',
        resolutionAction: 'Todas',
        volumeStatus: 'Todos',
        reviewStatus: 'Todos', // 'Todos', 'Pendentes', 'Aprovados', 'Com Comentário'
        quickFilter: 'all' // 'all', 'in_codebase', 'legacy', 'needs_fix', 'prop_changes', 'approved', 'commented'
    },
    isSaving: false
};

function loadLocalDecisions() {
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

function saveLocalDecisions(decisionsMap) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(decisionsMap));
    } catch (e) {
        console.warn('Falha ao gravar no localStorage:', e);
    }
}

function applyDecisionsToEvents(decisionsMap) {
    if (!decisionsMap || typeof decisionsMap !== 'object') return;
    state.events = state.events.map(ev => {
        const dec = decisionsMap[ev.original_name];
        if (!dec) return ev;
        return {
            ...ev,
            approved: dec.approved !== undefined ? dec.approved : ev.approved,
            pm_comments: dec.pm_comments !== undefined ? dec.pm_comments : ev.pm_comments,
            suggested_name: dec.suggested_name !== undefined ? dec.suggested_name : ev.suggested_name,
            resolution_action: dec.resolution_action !== undefined ? dec.resolution_action : ev.resolution_action
        };
    });
}

async function syncFromCloud() {
    const localDecs = loadLocalDecisions();
    let cloudDecs = {};
    try {
        const res = await fetch(CLOUD_SYNC_URL, { cache: 'no-store' });
        if (res.ok) {
            const payload = await res.json();
            cloudDecs = (payload && payload.data && payload.data.decisions) ? payload.data.decisions : {};
        }
    } catch (e) {
        console.warn('Modo offline/local — usando cache local:', e.message);
    }

    // Merge localDecs and cloudDecs by updated_at timestamp
    const merged = { ...cloudDecs };
    let needsCloudPush = false;
    for (const [key, localVal] of Object.entries(localDecs)) {
        const cloudVal = merged[key];
        if (!cloudVal || (localVal.updated_at || 0) > (cloudVal.updated_at || 0)) {
            merged[key] = localVal;
            needsCloudPush = true;
        }
    }

    state.decisionsMap = merged;
    saveLocalDecisions(merged);
    applyDecisionsToEvents(merged);

    if (needsCloudPush) {
        try {
            await fetch(CLOUD_SYNC_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'aqui-ads-tracking-decisions',
                    data: { updated_at: new Date().toISOString(), decisions: merged }
                })
            });
        } catch (e) {
            // Ignora falha silenciosa
        }
    }
}

async function init() {
    try {
        const response = await fetch('./tracking_plan_data.json', { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        state.events = await response.json();

        // Sincroniza decisões salvas na nuvem (funciona em qualquer máquina)
        await syncFromCloud();

        // Setup initial UI bindings
        setupTopBar();
        render();
    } catch (error) {
        document.getElementById('app').innerHTML = `
            <div class="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200 shadow-sm max-w-2xl mx-auto mt-10">
                <h2 class="text-lg font-bold mb-2">Erro ao carregar dados</h2>
                <p class="text-sm">${error.message}</p>
            </div>
        `;
    }
}

// ----------------------------------------------------
// API & Cloud Sync (Multi-Máquina)
// ----------------------------------------------------
async function updateEventDataOnServer(eventName, updates) {
    const eventIndex = state.events.findIndex(e => e.original_name === eventName);
    if (eventIndex === -1) return;

    // Optimistic UI update
    const updatedEvent = { ...state.events[eventIndex], ...updates };
    state.events[eventIndex] = updatedEvent;
    render(); // Immediate re-render

    showSaveStatus('saving');

    // Atualiza o mapa de decisões
    const decisionEntry = {
        approved: !!updatedEvent.approved,
        pm_comments: updatedEvent.pm_comments || '',
        suggested_name: updatedEvent.suggested_name,
        resolution_action: updatedEvent.resolution_action,
        updated_at: Date.now()
    };
    state.decisionsMap[eventName] = decisionEntry;
    saveLocalDecisions(state.decisionsMap);

    let cloudSaved = false;

    // 1. Grava na nuvem compartilhada (acessível de qualquer máquina no GitHub Pages)
    try {
        // Busca estado mais recente da nuvem antes de mesclar para evitar sobrescrita concorrente
        try {
            const latestRes = await fetch(CLOUD_SYNC_URL, { cache: 'no-store' });
            if (latestRes.ok) {
                const latestPayload = await latestRes.json();
                const remoteDecs = (latestPayload && latestPayload.data && latestPayload.data.decisions) ? latestPayload.data.decisions : {};
                state.decisionsMap = { ...remoteDecs, ...state.decisionsMap, [eventName]: decisionEntry };
                saveLocalDecisions(state.decisionsMap);
                applyDecisionsToEvents(state.decisionsMap);
            }
        } catch (_) {}

        const putRes = await fetch(CLOUD_SYNC_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'aqui-ads-tracking-decisions',
                data: {
                    updated_at: new Date().toISOString(),
                    decisions: state.decisionsMap
                }
            })
        });
        if (putRes.ok) {
            cloudSaved = true;
        }
    } catch (err) {
        console.warn('Aviso ao sincronizar na nuvem:', err);
    }

    // 2. Se estiver rodando localmente (localhost:8000), também grava direto no disco
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        try {
            const payload = { original_name: eventName, ...updates };
            const localRes = await fetch('/api/event/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (localRes.ok) cloudSaved = true;
        } catch (_) {}
    }

    if (cloudSaved) {
        showSaveStatus('success');
    } else {
        showSaveStatus('local_only');
    }
}

let saveStatusTimeout;
function showSaveStatus(status) {
    const el = document.getElementById('save-status');
    if (!el) return;

    clearTimeout(saveStatusTimeout);
    el.classList.remove('hidden', 'bg-blue-100', 'text-blue-700', 'bg-green-50', 'text-green-700', 'border-green-200', 'bg-amber-50', 'text-amber-700', 'border-amber-200', 'bg-red-100', 'text-red-700');
    el.classList.add('flex');

    if (status === 'saving') {
        el.classList.add('bg-blue-100', 'text-blue-700');
        el.innerHTML = `<svg class="animate-spin h-3.5 w-3.5 mr-1" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Sincronizando na nuvem...`;
    } else if (status === 'success') {
        el.classList.add('bg-green-50', 'text-green-700', 'border-green-200');
        el.innerHTML = `<svg class="w-3.5 h-3.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Sincronizado na nuvem ✓`;
    } else if (status === 'local_only') {
        el.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-200');
        el.innerHTML = `<svg class="w-3.5 h-3.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Salvo neste navegador ✓`;
    }
}

// ----------------------------------------------------
// Exports
// ----------------------------------------------------
function setupTopBar() {
    document.getElementById('export-json-btn')?.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.events, null, 2));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "tracking_plan_revisado.json");
        dlAnchorElem.click();
    });

    document.getElementById('export-csv-btn')?.addEventListener('click', () => {
        const headers = ["Nome Original", "Nome Amigável", "Módulo", "No Código Atual", "Status", "Categoria de Diagnóstico", "Nome Sugerido", "Ação Recomendada", "Propriedades Atuais", "Propriedades Sugeridas", "Aprovado", "Comentários do PM"];
        const rows = state.events.map(e => [
            `"${e.original_name || ''}"`,
            `"${e.friendly_name || ''}"`,
            `"${e.module || ''}"`,
            e.in_codebase ? 'Sim' : 'Não',
            `"${e.status || ''}"`,
            `"${e.error_category || ''}"`,
            `"${e.suggested_name || ''}"`,
            `"${e.resolution_action || ''}"`,
            `"${safeArray(e.current_properties).join('; ')}"`,
            `"${safeArray(e.suggested_properties).join('; ')}"`,
            e.approved ? 'Sim' : 'Não',
            `"${(e.pm_comments || '').replace(/"/g, '""')}"`
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", csvContent);
        dlAnchorElem.setAttribute("download", "tracking_plan_revisado.csv");
        dlAnchorElem.click();
    });
}

// ----------------------------------------------------
// Filtering & Derived Data
// ----------------------------------------------------
function getFilteredEvents() {
    return state.events.filter(e => {
        // Text Search (including properties)
        if (state.filters.search) {
            const term = state.filters.search.toLowerCase();
            const currProps = safeArray(e.current_properties).join(' ');
            const suggProps = safeArray(e.suggested_properties).join(' ');
            const govProps = safeArray(e.property_governance).map(p => `${p.property} ${p.suggested || ''} ${p.note || ''}`).join(' ');
            
            const textToSearch = `${e.original_name} ${e.friendly_name} ${e.suggested_name} ${e.diagnostic_description} ${currProps} ${suggProps} ${govProps}`.toLowerCase();
            if (!textToSearch.includes(term)) return false;
        }
        
        // Quick Filters
        if (state.filters.quickFilter === 'in_codebase' && !e.in_codebase) return false;
        if (state.filters.quickFilter === 'legacy' && e.in_codebase) return false;
        if (state.filters.quickFilter === 'needs_fix' && e.error_category === 'Gatilho Válido') return false;
        if (state.filters.quickFilter === 'prop_changes' && !(safeArray(e.property_governance).length > 0 || (safeArray(e.suggested_properties).length > 0 && e.error_category !== 'Gatilho Válido'))) return false;
        if (state.filters.quickFilter === 'approved' && !e.approved) return false;
        
        // Selects
        if (state.filters.module !== 'Todos' && e.module !== state.filters.module) return false;
        if (state.filters.errorCategory !== 'Todas' && e.error_category !== state.filters.errorCategory) return false;
        if (state.filters.resolutionAction !== 'Todas' && e.resolution_action !== state.filters.resolutionAction) return false;
        if (state.filters.volumeStatus !== 'Todos' && e.status !== state.filters.volumeStatus) return false;
        
        // Tabs
        if (state.filters.reviewStatus === 'Pendentes' && e.approved) return false;
        if (state.filters.reviewStatus === 'Aprovados' && !e.approved) return false;
        if (state.filters.reviewStatus === 'Com Comentário' && !(e.pm_comments && e.pm_comments.trim().length > 0)) return false;
        
        return true;
    });
}

function getUniqueValues(key) {
    const vals = new Set();
    state.events.forEach(e => {
        if (e[key]) vals.add(e[key]);
    });
    return Array.from(vals).sort();
}

function safeArray(arr) {
    return Array.isArray(arr) ? arr : [];
}

// ----------------------------------------------------
// Rendering Setup
// ----------------------------------------------------
function render() {
    const app = document.getElementById('app');
    
    if (state.view === 'list') {
        app.innerHTML = '';
        app.appendChild(renderSummaryCards());
        app.appendChild(renderFiltersBar());
        app.appendChild(renderListContainer());
    } else if (state.view === 'details' && state.selectedEventOriginalName) {
        const event = state.events.find(e => e.original_name === state.selectedEventOriginalName);
        if (event) {
            app.innerHTML = '';
            app.appendChild(renderDetails(event));
        } else {
            state.view = 'list';
            render();
        }
    }
}

// ----------------------------------------------------
// Components: Summary & Filters
// ----------------------------------------------------
function renderSummaryCards() {
    const container = document.createElement('div');
    container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6';
    
    const total = state.events.length;
    const inCodebase = state.events.filter(e => e.in_codebase).length;
    const withChanges = state.events.filter(e => e.error_category !== 'Gatilho Válido').length;
    
    let withPropGov = 0;
    state.events.forEach(e => {
        if (safeArray(e.property_governance).length > 0 || (safeArray(e.suggested_properties).length > 0 && e.error_category !== 'Gatilho Válido')) {
            withPropGov++;
        }
    });

    const approved = state.events.filter(e => e.approved).length;
    const commented = state.events.filter(e => e.pm_comments && e.pm_comments.trim().length > 0).length;
    const progressPct = total > 0 ? Math.round((approved / total) * 100) : 0;
    
    const isQF = (filter) => state.filters.quickFilter === filter ? 'ring-2 ring-aqui-orange shadow-md' : 'border-gray-200 hover:border-aqui-orange';

    container.innerHTML = `
        <!-- Total -->
        <div class="bg-white p-4 rounded-xl border ${isQF('all')} shadow-sm flex flex-col justify-center cursor-pointer transition" onclick="setQuickFilter('all')">
            <span class="text-sm text-gray-500 font-medium">Total de Eventos</span>
            <span class="text-2xl font-extrabold text-aqui-bluedark">${total}</span>
        </div>
        <!-- In Codebase -->
        <div class="bg-white p-4 rounded-xl border ${isQF('in_codebase')} shadow-sm flex flex-col justify-center cursor-pointer transition" onclick="setQuickFilter('in_codebase')">
            <span class="text-sm text-gray-500 font-medium">No Código Atual</span>
            <span class="text-2xl font-extrabold text-aqui-bluedark">${inCodebase} <span class="text-xs font-normal text-gray-400">vs ${total - inCodebase} Legado</span></span>
        </div>
        <!-- Needs Refactor -->
        <div class="bg-white p-4 rounded-xl border ${isQF('needs_fix')} shadow-sm flex flex-col justify-center cursor-pointer transition" onclick="setQuickFilter('needs_fix')">
            <span class="text-sm text-gray-500 font-medium">Com Ajustes (Nome/Gatilho)</span>
            <span class="text-2xl font-extrabold text-red-600">${withChanges}</span>
        </div>
        <!-- Prop Gov -->
        <div class="bg-white p-4 rounded-xl border ${isQF('prop_changes')} shadow-sm flex flex-col justify-center cursor-pointer transition" onclick="setQuickFilter('prop_changes')">
            <span class="text-sm text-gray-500 font-medium">Com Ajuste de Props</span>
            <span class="text-2xl font-extrabold text-aqui-orange">${withPropGov}</span>
        </div>
        <!-- Progress (Light Mode update) -->
        <div class="bg-orange-50/40 p-4 rounded-xl border ${isQF('approved') || state.filters.quickFilter === 'all' ? 'border-orange-200' : 'border-gray-200'} shadow-sm flex flex-col justify-center cursor-pointer hover:bg-orange-50 transition" onclick="setQuickFilter('approved')">
            <span class="text-sm text-aqui-bluedark font-bold flex justify-between">Progresso <span>${progressPct}%</span></span>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2 mb-1">
                <div class="bg-aqui-orange h-2 rounded-full" style="width: ${progressPct}%"></div>
            </div>
            <span class="text-xs text-gray-500 font-medium">${approved} aprovados | ${commented} notas</span>
        </div>
    `;
    return container;
}

window.setQuickFilter = function(filter) {
    state.filters.quickFilter = filter;
    render();
}

window.setFilter = function(key, value) {
    state.filters[key] = value;
    render();
}

window.clearFilters = function() {
    state.filters = {
        search: '',
        module: 'Todos',
        errorCategory: 'Todas',
        resolutionAction: 'Todas',
        volumeStatus: 'Todos',
        reviewStatus: 'Todos',
        quickFilter: 'all'
    };
    render();
}

function renderFiltersBar() {
    const container = document.createElement('div');
    container.className = 'bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6';
    
    const modules = getUniqueValues('module');
    const categories = getUniqueValues('error_category');
    const actions = getUniqueValues('resolution_action');
    const statuses = getUniqueValues('status');

    container.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-4 mb-4">
            <div class="flex-1">
                <input type="text" id="search-input" value="${state.filters.search}" placeholder="Buscar evento, descrição ou propriedade..." class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-aqui-orange focus:border-aqui-orange p-2.5">
            </div>
            <div class="flex flex-wrap gap-3">
                <select id="filter-module" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-aqui-orange focus:border-aqui-orange p-2.5 min-w-[150px]">
                    <option value="Todos">Todos Módulos</option>
                    ${modules.map(m => `<option value="${m}" ${state.filters.module === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
                <select id="filter-category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-aqui-orange focus:border-aqui-orange p-2.5 min-w-[150px]">
                    <option value="Todas">Todas Categorias</option>
                    ${categories.map(c => `<option value="${c}" ${state.filters.errorCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
                <select id="filter-action" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-aqui-orange focus:border-aqui-orange p-2.5 min-w-[150px]">
                    <option value="Todas">Todas Ações</option>
                    ${actions.map(a => `<option value="${a}" ${state.filters.resolutionAction === a ? 'selected' : ''}>${a}</option>`).join('')}
                </select>
                <select id="filter-status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-aqui-orange focus:border-aqui-orange p-2.5 min-w-[120px]">
                    <option value="Todos">Qualquer Status</option>
                    ${statuses.map(s => `<option value="${s}" ${state.filters.volumeStatus === s ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="flex items-center justify-between border-t border-gray-100 pt-4">
            <div class="flex gap-2 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
                ${['Todos', 'Pendentes', 'Aprovados', 'Com Comentário'].map(tab => `
                    <button class="filter-tab px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition ${state.filters.reviewStatus === tab ? 'bg-aqui-bluedark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}" data-tab="${tab}">
                        ${tab}
                    </button>
                `).join('')}
            </div>
            <button class="text-sm text-gray-500 hover:text-aqui-orange font-medium px-2 whitespace-nowrap" onclick="clearFilters()">Limpar Filtros</button>
        </div>
    `;

    setTimeout(() => {
        document.getElementById('search-input')?.addEventListener('input', (e) => {
            state.filters.search = e.target.value;
            renderListContainerOnly();
        });
        document.getElementById('filter-module')?.addEventListener('change', (e) => setFilter('module', e.target.value));
        document.getElementById('filter-category')?.addEventListener('change', (e) => setFilter('errorCategory', e.target.value));
        document.getElementById('filter-action')?.addEventListener('change', (e) => setFilter('resolutionAction', e.target.value));
        document.getElementById('filter-status')?.addEventListener('change', (e) => setFilter('volumeStatus', e.target.value));
        
        document.querySelectorAll('.filter-tab').forEach(btn => {
            btn.addEventListener('click', (e) => setFilter('reviewStatus', e.target.getAttribute('data-tab')));
        });
    }, 0);

    return container;
}

function renderListContainerOnly() {
    const listWrapper = document.getElementById('list-wrapper');
    if (listWrapper) {
        const parent = listWrapper.parentNode;
        parent.replaceChild(renderListContainer(), listWrapper);
    }
}

// ----------------------------------------------------
// Components: List
// ----------------------------------------------------
function renderListContainer() {
    const container = document.createElement('div');
    container.id = 'list-wrapper';
    
    const filteredEvents = getFilteredEvents();
    
    if (filteredEvents.length === 0) {
        container.innerHTML = `
            <div class="bg-white p-10 rounded-xl border border-gray-200 text-center">
                <p class="text-gray-500">Nenhum evento corresponde aos filtros atuais.</p>
            </div>
        `;
        return container;
    }
    
    const list = document.createElement('div');
    list.className = 'grid grid-cols-1 gap-5'; // Stacked list for desktop, one per row
    
    filteredEvents.forEach(event => {
        const currentProps = safeArray(event.current_properties);
        const suggestedProps = safeArray(event.suggested_properties);
        const propGov = safeArray(event.property_governance);
        
        // Property diff calculations for summary
        let keep = 0, rename = 0, remove = 0, add = 0, type_fix = 0;
        if (propGov.length > 0) {
            propGov.forEach(p => {
                if(p.action === 'keep') keep++;
                if(p.action === 'rename') rename++;
                if(p.action === 'remove') remove++;
                if(p.action === 'add') add++;
                if(p.action === 'type_fix') type_fix++;
            });
        }
        
        // Property previews logic (max 4 pills)
        let propertyPreviewsHTML = '';
        if (propGov.length > 0) {
            const previewItems = propGov.filter(p => p.action !== 'keep').slice(0, 4); // prioritize changes
            if (previewItems.length === 0) previewItems.push(...propGov.slice(0,4)); // fallback to keep
            
            propertyPreviewsHTML = `<div class="flex flex-wrap gap-1.5 mt-2">`;
            previewItems.forEach(p => {
                if (p.action === 'rename') propertyPreviewsHTML += `<span class="px-2 py-0.5 bg-orange-50 border border-orange-100 text-orange-800 rounded text-[10px] font-mono">${p.property} &rarr; ${p.suggested}</span>`;
                else if (p.action === 'add') propertyPreviewsHTML += `<span class="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded text-[10px] font-mono">+ ${p.suggested || p.property}</span>`;
                else if (p.action === 'remove') propertyPreviewsHTML += `<span class="px-2 py-0.5 bg-red-50 border border-red-100 text-red-800 rounded text-[10px] font-mono line-through">- ${p.property}</span>`;
                else if (p.action === 'type_fix') propertyPreviewsHTML += `<span class="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-800 rounded text-[10px] font-mono">${p.property} (Corrigir)</span>`;
                else propertyPreviewsHTML += `<span class="px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-600 rounded text-[10px] font-mono">${p.property}</span>`;
            });
            if (propGov.length > 4) {
                propertyPreviewsHTML += `<span class="px-2 py-0.5 text-gray-500 rounded text-[10px] font-medium">+${propGov.length - previewItems.length}</span>`;
            }
            propertyPreviewsHTML += `</div>`;
        }

        const hasNameChange = event.original_name !== event.suggested_name && event.suggested_name && event.error_category !== 'Gatilho Válido';
        const isDropped = event.resolution_action === 'Discard/Drop' || event.resolution_action === 'Descartar / Ocultar no Mixpanel' || event.visibility === 'Descartado (Dropped)';

        const card = document.createElement('div');
        card.className = `bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col ${event.approved ? 'border-green-300' : 'border-gray-200 hover:border-gray-300'}`;
        
        card.innerHTML = `
            <!-- Top bar: Badges & Status -->
            <div class="${event.approved ? 'bg-green-50' : 'bg-gray-50'} border-b ${event.approved ? 'border-green-200' : 'border-gray-100'} px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-2 flex-wrap">
                    <span class="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md border ${event.in_codebase ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-gray-100 text-gray-500 border-gray-200'}">${event.module || 'Sem Módulo'}</span>
                    <span class="px-2 py-0.5 text-xs font-medium rounded border border-gray-200 bg-white text-gray-600">${event.status}</span>
                    ${event.visibility !== 'Visível' ? `<span class="px-2 py-0.5 text-xs font-medium rounded border border-yellow-200 bg-yellow-50 text-yellow-800">${event.visibility}</span>` : ''}
                </div>
                <div class="flex items-center gap-2">
                    ${event.approved ? `<span class="text-sm font-bold text-green-700 flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Aprovado</span>` : ''}
                </div>
            </div>
            
            <!-- Main Content Area -->
            <div class="p-5 flex flex-col lg:flex-row gap-6">
                <!-- Left: Naming & Core Info -->
                <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-500 mb-1">${event.friendly_name || ''}</p>
                    
                    <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                        <div class="bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                            <span class="text-xs text-gray-500 block">Como é Hoje</span>
                            <span class="font-mono text-sm font-bold text-slate-700 break-all ${isDropped ? 'line-through text-gray-400' : ''}">${event.original_name}</span>
                        </div>
                        
                        ${hasNameChange ? `
                            <div class="hidden sm:block text-gray-300">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </div>
                            <div class="sm:hidden text-gray-300 flex justify-center py-1">
                                <svg class="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </div>
                            <div class="bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200">
                                <span class="text-xs text-orange-600 block">Sugestão</span>
                                <span class="font-mono text-sm font-bold text-aqui-orangedark break-all">${event.suggested_name}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="space-y-2">
                        <div class="flex items-start gap-2">
                            <span class="w-2 h-2 rounded-full mt-1.5 shrink-0 ${event.error_category !== 'Gatilho Válido' ? 'bg-red-500' : 'bg-green-500'}"></span>
                            <div>
                                <span class="text-sm font-bold ${event.error_category !== 'Gatilho Válido' ? 'text-red-700' : 'text-gray-700'}">${event.error_category}</span>
                                <p class="text-xs text-gray-600 line-clamp-2 mt-0.5">${event.diagnostic_description}</p>
                            </div>
                        </div>
                        <div class="mt-2 text-sm">
                            <span class="font-bold text-aqui-bluedark">Ação:</span> <span class="text-aqui-orangedark font-medium">${event.resolution_action}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Right: Properties Summary & Actions -->
                <div class="w-full lg:w-72 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6 shrink-0">
                    <div class="bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-xs font-bold text-slate-700 uppercase">Propriedades</span>
                            <span class="text-xs text-slate-500 font-mono">${currentProps.length} -> ${suggestedProps.length}</span>
                        </div>
                        ${propGov.length > 0 ? `
                            <div class="flex flex-wrap gap-1.5">
                                ${keep > 0 ? `<span class="px-1.5 py-0.5 text-[10px] font-bold bg-green-100 text-green-800 rounded">${keep} manter</span>` : ''}
                                ${rename > 0 ? `<span class="px-1.5 py-0.5 text-[10px] font-bold bg-orange-100 text-orange-800 rounded">${rename} renomear</span>` : ''}
                                ${type_fix > 0 ? `<span class="px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">${type_fix} corrigir</span>` : ''}
                                ${add > 0 ? `<span class="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">${add} novas</span>` : ''}
                                ${remove > 0 ? `<span class="px-1.5 py-0.5 text-[10px] font-bold bg-red-100 text-red-800 rounded">${remove} remover</span>` : ''}
                            </div>
                        ` : `
                            <p class="text-xs text-gray-500 italic">Sem regras mapeadas.</p>
                        `}
                        
                        <!-- Properties Preview -->
                        ${propertyPreviewsHTML}

                    </div>
                    
                    <div class="flex-1 flex flex-col gap-2 justify-end">
                        <textarea rows="1" placeholder="Nota rápida..." data-event="${event.original_name}" class="list-comment-input w-full text-xs p-2 bg-gray-50 border border-gray-300 rounded focus:ring-aqui-orange focus:border-aqui-orange resize-none transition">${event.pm_comments || ''}</textarea>
                        
                        <div class="flex gap-2">
                            <button class="details-btn flex-1 px-3 py-2 text-xs font-bold rounded-lg text-aqui-bluedark bg-gray-100 hover:bg-gray-200 transition" data-event="${event.original_name}">Auditar Tudo</button>
                            <button class="approve-btn flex-1 px-3 py-2 text-xs font-bold rounded-lg text-white ${event.approved ? 'bg-gray-600 hover:bg-gray-700' : 'bg-aqui-orange hover:bg-aqui-orangedark'} transition shadow-sm" data-event="${event.original_name}">${event.approved ? 'Revogar' : 'Aprovar'}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        list.appendChild(card);
    });
    
    container.appendChild(list);
    
    // Attach listeners
    setTimeout(() => {
        document.querySelectorAll('.list-comment-input').forEach(input => {
            input.addEventListener('change', (e) => {
                updateEventDataOnServer(e.target.getAttribute('data-event'), { pm_comments: e.target.value });
            });
        });
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const evName = e.target.getAttribute('data-event');
                const ev = state.events.find(ev => ev.original_name === evName);
                updateEventDataOnServer(evName, { approved: !ev.approved });
            });
        });
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                state.selectedEventOriginalName = e.target.getAttribute('data-event');
                state.view = 'details';
                render();
                window.scrollTo(0,0);
            });
        });
    }, 0);
    
    return container;
}

// ----------------------------------------------------
// Components: Details View
// ----------------------------------------------------
function renderDetails(event) {
    const container = document.createElement('div');
    container.className = 'w-full max-w-6xl mx-auto';
    
    const filteredEvents = getFilteredEvents();
    const currentIndex = filteredEvents.findIndex(e => e.original_name === event.original_name);
    const prevEvent = currentIndex > 0 ? filteredEvents[currentIndex - 1] : null;
    const nextEvent = currentIndex < filteredEvents.length - 1 ? filteredEvents[currentIndex + 1] : null;

    const currentProps = safeArray(event.current_properties);
    const suggestedProps = safeArray(event.suggested_properties);
    const propGov = safeArray(event.property_governance);
    
    // Build Property Comparison HTML
    let propTableRows = '';
    if (propGov.length > 0) {
        propTableRows = propGov.map(p => {
            let badgeClass, label;
            switch(p.action) {
                case 'keep': badgeClass = 'bg-green-100 text-green-800'; label = 'Manter'; break;
                case 'rename': badgeClass = 'bg-orange-100 text-orange-800'; label = 'Renomear'; break;
                case 'type_fix': badgeClass = 'bg-blue-100 text-blue-800'; label = 'Corrigir Tipo'; break;
                case 'remove': badgeClass = 'bg-red-100 text-red-800'; label = 'Remover'; break;
                case 'add': badgeClass = 'bg-emerald-100 text-emerald-800'; label = 'Nova'; break;
                default: badgeClass = 'bg-gray-100 text-gray-800'; label = p.action || '-';
            }
            
            return `
                <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="p-3 font-mono text-xs font-bold ${p.action === 'remove' ? 'line-through text-gray-400' : 'text-slate-700'}">${p.property}</td>
                    <td class="p-3"><span class="px-2 py-1 text-[10px] font-bold uppercase rounded ${badgeClass}">${label}</span></td>
                    <td class="p-3 font-mono text-xs font-bold text-aqui-orangedark">${p.suggested || '-'}</td>
                    <td class="p-3 text-xs text-gray-600">${p.note || ''}</td>
                </tr>
            `;
        }).join('');
    } else {
        propTableRows = `<tr><td colspan="4" class="p-4 text-center text-sm text-gray-500">Nenhuma regra de governança detalhada.</td></tr>`;
    }

    container.innerHTML = `
        <!-- Navigation -->
        <div class="flex items-center justify-between mb-6">
            <button id="back-btn" class="inline-flex items-center text-sm font-bold text-gray-600 hover:text-aqui-orangedark bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm hover:shadow transition">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Voltar para a Lista
            </button>
            <div class="flex gap-2">
                <button id="prev-btn" ${!prevEvent ? 'disabled' : ''} class="px-3 py-2 border border-gray-200 rounded-lg bg-white ${!prevEvent ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'} text-sm font-medium transition">
                    &larr; Anterior
                </button>
                <button id="next-btn" ${!nextEvent ? 'disabled' : ''} class="px-3 py-2 border border-gray-200 rounded-lg bg-white ${!nextEvent ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'} text-sm font-medium transition">
                    Próximo &rarr;
                </button>
            </div>
        </div>
        
        <!-- Header Section -->
        <div class="bg-white border border-gray-200 rounded-t-2xl shadow-sm p-6 sm:p-8 border-b-0">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                    <h1 class="text-2xl sm:text-3xl font-extrabold text-aqui-bluedark break-words">${event.friendly_name || event.suggested_name || event.original_name}</h1>
                    <div class="flex gap-2 mt-3 flex-wrap items-center">
                        <span class="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-2.5 py-1 rounded-md">${event.module || 'Sem Módulo'}</span>
                        <span class="bg-gray-100 text-gray-700 border border-gray-200 text-xs font-medium px-2.5 py-1 rounded-md">${event.status}</span>
                    </div>
                </div>
                ${event.approved ? `<span class="bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-lg border border-green-200 shadow-sm flex items-center"><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Evento Aprovado</span>` : ''}
            </div>
        </div>
        
        <!-- Section 1: Gatilho & Diagnóstico -->
        <div class="bg-slate-50 border-x border-gray-200 p-6 sm:p-8">
            <h2 class="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                1. Gatilho & Diagnóstico
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Current -->
                <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Como é Hoje</span>
                    <div class="space-y-4">
                        <div>
                            <span class="text-xs text-gray-500 block">Nome Técnico (original_name)</span>
                            <span class="font-mono text-sm font-bold text-slate-800">${event.original_name}</span>
                        </div>
                        <div>
                            <span class="text-xs text-gray-500 block">Visibilidade</span>
                            <span class="text-sm font-medium text-slate-700">${event.visibility}</span>
                        </div>
                        <div class="p-3 bg-red-50/50 border border-red-100 rounded-lg">
                            <span class="text-xs font-bold text-red-800 block mb-1">Diagnóstico: ${event.error_category}</span>
                            <p class="text-sm text-gray-700">${event.diagnostic_description}</p>
                        </div>
                    </div>
                </div>
                <!-- Suggested -->
                <div class="bg-orange-50/30 p-5 rounded-xl border border-orange-200 shadow-sm">
                    <span class="text-xs font-bold text-aqui-orangedark uppercase tracking-wider mb-3 block">Sugestão de Melhoria</span>
                    <div class="space-y-4">
                        <div>
                            <span class="text-xs text-orange-800/60 block">Novo Nome Técnico (Editável)</span>
                            <input type="text" id="detail-suggested-name" value="${event.suggested_name}" class="w-full mt-1 font-mono text-sm font-bold text-aqui-bluedark p-2 border border-orange-300 rounded bg-white focus:ring-aqui-orange focus:border-aqui-orange">
                        </div>
                        <div>
                            <span class="text-xs text-orange-800/60 block">Ação Recomendada</span>
                            <span class="text-sm font-bold text-aqui-orangedark inline-block bg-white px-2 py-1 rounded border border-orange-100">${event.resolution_action}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 2: Propriedades -->
        <div class="bg-white border-x border-gray-200 p-6 sm:p-8">
            <h2 class="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                2. Governança de Propriedades
            </h2>
            
            <!-- Table of rules -->
            <div class="overflow-x-auto rounded-xl border border-gray-200 mb-6 shadow-sm">
                <table class="w-full text-left bg-white">
                    <thead class="bg-slate-50 border-b border-gray-200">
                        <tr>
                            <th class="p-3 text-xs font-bold text-slate-500 uppercase">Propriedade Atual</th>
                            <th class="p-3 text-xs font-bold text-slate-500 uppercase">Ação</th>
                            <th class="p-3 text-xs font-bold text-slate-500 uppercase">Para (Sugerido)</th>
                            <th class="p-3 text-xs font-bold text-slate-500 uppercase">Nota / Regra</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${propTableRows}
                    </tbody>
                </table>
            </div>
            
            <!-- Raw lists side by side -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-sm font-bold text-slate-600 mb-2">Schema Atual (${currentProps.length})</h4>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-1.5">
                        ${currentProps.length ? currentProps.map(p => `<div class="font-mono text-xs bg-white px-2 py-1.5 rounded border border-gray-200">${typeof p === 'object'?p.name:p}</div>`).join('') : '<span class="text-xs text-gray-500">Nenhuma</span>'}
                    </div>
                </div>
                <div>
                    <h4 class="text-sm font-bold text-aqui-orangedark mb-2 flex justify-between items-center">
                        <span>Schema Alvo (${suggestedProps.length})</span>
                    </h4>
                    <div class="bg-orange-50/50 border border-orange-200 rounded-lg p-3 max-h-80 overflow-y-auto custom-scrollbar flex flex-col gap-1.5">
                        ${suggestedProps.length ? suggestedProps.map((p, idx) => `
                            <div class="flex items-center justify-between bg-white px-2 py-1 rounded border border-orange-200 group">
                                <span class="font-mono text-xs text-aqui-bluedark font-bold">${typeof p === 'object'?p.name:p}</span>
                                <button class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition px-1 remove-prop-btn" data-idx="${idx}">&times;</button>
                            </div>
                        `).join('') : '<span class="text-xs text-gray-500">Nenhuma</span>'}
                        
                        <div class="flex gap-2 mt-2 pt-2 border-t border-orange-200/50">
                            <input type="text" id="new-prop-input" placeholder="Nova prop..." class="w-full text-xs p-1.5 border border-orange-300 rounded focus:ring-aqui-orange focus:border-aqui-orange font-mono">
                            <button id="add-prop-btn" class="px-2 py-1.5 text-xs font-bold bg-white text-aqui-orange border border-orange-300 hover:bg-orange-50 rounded shrink-0 transition">Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 3: Comentários e Aprovação (Light Mode) -->
        <div class="bg-orange-50/40 border border-orange-200 rounded-b-2xl p-6 sm:p-8">
            <h2 class="text-lg font-extrabold text-aqui-bluedark mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-aqui-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                3. Decisão do PM
            </h2>
            <div class="space-y-4">
                <div>
                    <label class="block mb-2 text-sm font-bold text-slate-700">Anotações Internas / Orientação para Eng</label>
                    <textarea id="detail-comment" rows="3" class="block w-full p-4 text-sm text-gray-900 bg-white rounded-xl border border-gray-300 focus:ring-4 focus:ring-orange-200 focus:border-aqui-orange transition-shadow shadow-sm" placeholder="Deixe uma observação, justificativa ou aprovação com ressalvas...">${event.pm_comments || ''}</textarea>
                </div>
                <div class="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <button id="detail-save-btn" class="px-6 py-3 text-sm font-bold rounded-xl text-slate-700 bg-white border border-gray-300 hover:bg-gray-50 transition w-full sm:w-auto shadow-sm">
                        Salvar Alterações
                    </button>
                    <button id="detail-approve-btn" class="px-8 py-3 text-sm font-extrabold rounded-xl text-white ${event.approved ? 'bg-slate-600 hover:bg-slate-700' : 'bg-aqui-orange hover:bg-aqui-orangedark'} focus:ring-4 focus:ring-orange-300 transition w-full sm:w-auto shadow-sm flex items-center justify-center gap-2">
                        ${event.approved ? 
                            '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Revogar Aprovação' : 
                            '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Aprovar Schema Oficialmente'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        document.getElementById('back-btn').addEventListener('click', () => {
            state.view = 'list';
            state.selectedEventOriginalName = null;
            render();
        });
        
        if (prevEvent) {
            document.getElementById('prev-btn').addEventListener('click', () => {
                state.selectedEventOriginalName = prevEvent.original_name;
                render();
                window.scrollTo(0,0);
            });
        }
        
        if (nextEvent) {
            document.getElementById('next-btn').addEventListener('click', () => {
                state.selectedEventOriginalName = nextEvent.original_name;
                render();
                window.scrollTo(0,0);
            });
        }
        
        // Auto-save on blur
        document.getElementById('detail-comment').addEventListener('blur', (e) => {
            updateEventDataOnServer(event.original_name, { pm_comments: e.target.value });
        });
        document.getElementById('detail-suggested-name').addEventListener('blur', (e) => {
             updateEventDataOnServer(event.original_name, { suggested_name: e.target.value });
        });

        // Explicit save
        document.getElementById('detail-save-btn').addEventListener('click', () => {
            const comment = document.getElementById('detail-comment').value;
            const sName = document.getElementById('detail-suggested-name').value;
            updateEventDataOnServer(event.original_name, { pm_comments: comment, suggested_name: sName });
        });
        
        document.getElementById('detail-approve-btn').addEventListener('click', () => {
            const comment = document.getElementById('detail-comment').value;
            const sName = document.getElementById('detail-suggested-name').value;
            updateEventDataOnServer(event.original_name, { 
                approved: !event.approved,
                pm_comments: comment,
                suggested_name: sName
            });
        });
        
        // Property Editing
        document.getElementById('add-prop-btn').addEventListener('click', () => {
            const propName = document.getElementById('new-prop-input').value.trim();
            if (propName) {
                const newProps = [...suggestedProps, propName];
                updateEventDataOnServer(event.original_name, { suggested_properties: newProps });
                // Note: Re-render is automatic
            }
        });
        document.getElementById('new-prop-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('add-prop-btn').click();
            }
        });
        
        document.querySelectorAll('.remove-prop-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-idx'), 10);
                const newProps = [...suggestedProps];
                newProps.splice(idx, 1);
                updateEventDataOnServer(event.original_name, { suggested_properties: newProps });
            });
        });
    }, 0);
    
    return container;
}

// Boot up
document.addEventListener('DOMContentLoaded', init);
