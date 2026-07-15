// ---------- Dados iniciais (a partir da lista de compras em PDF) ----------
const DADOS_INICIAIS = [
  { categoria: "Proteínas", itens: [
    { nome: "Frango (peito/coxa)", qtd: "2 kg", preco: 43.00 },
    { nome: "Carne moída", qtd: "1 kg", preco: 30.00 },
    { nome: "Carne para bife (patinho/alcatra)", qtd: "1 kg", preco: 42.00 },
    { nome: "Linguiça", qtd: "500 g", preco: 15.00 },
    { nome: "Bacon", qtd: "250 g", preco: 14.00 },
    { nome: "Ovos", qtd: "2 dúzias", preco: 23.00 },
    { nome: "Feijão", qtd: "2 kg", preco: 14.00 },
  ]},
  { categoria: "Grãos e básicos", itens: [
    { nome: "Arroz", qtd: "5 kg", preco: 26.00 },
    { nome: "Macarrão", qtd: "2 pacotes (500g)", preco: 8.00 },
    { nome: "Farinha de trigo", qtd: "1 kg", preco: 6.00 },
    { nome: "Açúcar", qtd: "1 kg", preco: 5.00 },
    { nome: "Café", qtd: "500 g", preco: 15.00 },
    { nome: "Óleo de soja", qtd: "900 ml", preco: 7.50 },
    { nome: "Sal", qtd: "1 kg", preco: 3.00 },
    { nome: "Cuscuz (flocão de milho)", qtd: "2 pacotes (500g cada)", preco: 12.00 },
    { nome: "Tapioca (goma)", qtd: "500 g", preco: 8.00 },
  ]},
  { categoria: "Hortifruti", itens: [
    { nome: "Banana", qtd: "1 kg", preco: 7.00 },
    { nome: "Maçã", qtd: "1 kg", preco: 11.50 },
    { nome: "Laranja", qtd: "1 kg", preco: 6.30 },
    { nome: "Tomate", qtd: "1 kg", preco: 7.90 },
    { nome: "Cebola", qtd: "1 kg", preco: 5.50 },
    { nome: "Alho", qtd: "200 g", preco: 4.00 },
    { nome: "Batata", qtd: "1 kg", preco: 6.00 },
    { nome: "Cenoura", qtd: "500 g", preco: 3.00 },
    { nome: "Alface/couve", qtd: "1 unidade", preco: 4.00 },
  ]},
  { categoria: "Laticínios", itens: [
    { nome: "Leite", qtd: "6 litros", preco: 33.00 },
    { nome: "Queijo mussarela", qtd: "300 g", preco: 14.00 },
    { nome: "Manteiga/margarina", qtd: "500 g", preco: 10.00 },
    { nome: "Iogurte", qtd: "4 unidades", preco: 12.00 },
  ]},
  { categoria: "Padaria", itens: [
    { nome: "Pão de forma", qtd: "500 g", preco: 8.60 },
    { nome: "Pão francês", qtd: "1 kg (compra semanal)", preco: 20.00 },
  ]},
  { categoria: "Molhos e conservas", itens: [
    { nome: "Extrato/molho de tomate", qtd: "340 g", preco: 4.50 },
    { nome: "Milho em lata", qtd: "200 g", preco: 4.00 },
    { nome: "Ervilha em lata", qtd: "200 g", preco: 4.00 },
    { nome: "Vinagre", qtd: "500 ml", preco: 5.00 },
    { nome: "Maionese", qtd: "500 g", preco: 9.00 },
  ]},
  { categoria: "Limpeza", itens: [
    { nome: "Detergente", qtd: "2 unidades (500ml)", preco: 6.00 },
    { nome: "Sabão em pó", qtd: "1 kg", preco: 15.00 },
    { nome: "Álcool 70%", qtd: "1 litro", preco: 10.00 },
    { nome: "Esponja de louça", qtd: "3 unidades", preco: 6.00 },
    { nome: "Sacos de lixo", qtd: "1 pacote (30 un)", preco: 12.00 },
    { nome: "Desinfetante", qtd: "500 ml", preco: 8.00 },
    { nome: "Água sanitária", qtd: "1 litro", preco: 6.00 },
  ]},
  { categoria: "Higiene", itens: [
    { nome: "Papel higiênico", qtd: "12 rolos", preco: 22.00 },
    { nome: "Sabonete", qtd: "3 unidades", preco: 9.00 },
    { nome: "Pasta de dente", qtd: "2 unidades", preco: 16.00 },
    { nome: "Shampoo", qtd: "1 frasco (350ml)", preco: 18.00 },
    { nome: "Desodorante", qtd: "2 unidades", preco: 24.00 },
  ]},
];

const META_INICIAL = 600.00;

const LS_ITENS = "lc_itens";
const LS_META = "lc_meta";
const LS_HISTORICO = "lc_historico";
const LS_REMOVIDOS_MES = "lc_removidos_mes";

// ---------- Estado ----------
let itens = [];
let meta = META_INICIAL;
let historico = [];
let removidosMes = [];
let filtroAtual = "pendentes";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function gerarItensIniciais() {
  const lista = [];
  DADOS_INICIAIS.forEach(bloco => {
    bloco.itens.forEach(it => {
      lista.push({
        id: uid(),
        categoria: bloco.categoria,
        nome: it.nome,
        qtd: it.qtd,
        preco: it.preco,
        comprado: false,
      });
    });
  });
  return lista;
}

// ---------- Persistência ----------
function carregar() {
  const itensSalvos = localStorage.getItem(LS_ITENS);
  itens = itensSalvos ? JSON.parse(itensSalvos) : gerarItensIniciais();

  const metaSalva = localStorage.getItem(LS_META);
  meta = metaSalva !== null ? parseFloat(metaSalva) : META_INICIAL;

  const histSalvo = localStorage.getItem(LS_HISTORICO);
  historico = histSalvo ? JSON.parse(histSalvo) : [];

  const removidosSalvos = localStorage.getItem(LS_REMOVIDOS_MES);
  removidosMes = removidosSalvos ? JSON.parse(removidosSalvos) : [];

  if (!itensSalvos) salvarItens();
  if (metaSalva === null) salvarMeta();
}

function salvarItens() {
  localStorage.setItem(LS_ITENS, JSON.stringify(itens));
}
function salvarMeta() {
  localStorage.setItem(LS_META, String(meta));
}
function salvarHistorico() {
  localStorage.setItem(LS_HISTORICO, JSON.stringify(historico));
}
function salvarRemovidosMes() {
  localStorage.setItem(LS_REMOVIDOS_MES, JSON.stringify(removidosMes));
}

// ---------- Utilidades ----------
function formatarMoeda(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarToast(msg, acao) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  const toastBtn = document.getElementById("toastActionBtn");

  toastMsg.textContent = msg;
  toast.classList.remove("hidden");

  if (acao) {
    toastBtn.textContent = acao.label;
    toastBtn.classList.remove("hidden");
    toastBtn.onclick = () => {
      toast.classList.add("hidden");
      clearTimeout(mostrarToast._t);
      acao.onClick();
    };
  } else {
    toastBtn.classList.add("hidden");
    toastBtn.onclick = null;
  }

  clearTimeout(mostrarToast._t);
  mostrarToast._t = setTimeout(() => toast.classList.add("hidden"), acao ? 5000 : 2200);
}

// ---------- Confirmação (substitui window.confirm nativo) ----------
const confirmOverlay = document.getElementById("confirmOverlay");
const confirmMsg = document.getElementById("confirmMsg");
const confirmOkBtn = document.getElementById("confirmOkBtn");
const confirmCancelBtn = document.getElementById("confirmCancelBtn");
let _confirmCallback = null;

function confirmarAcao(mensagem, onConfirm, textoBtn) {
  confirmMsg.textContent = mensagem;
  confirmOkBtn.textContent = textoBtn || "Confirmar";
  _confirmCallback = onConfirm;
  confirmOverlay.classList.remove("hidden");
}

function fecharConfirm() {
  confirmOverlay.classList.add("hidden");
  _confirmCallback = null;
}

confirmOkBtn.addEventListener("click", () => {
  const cb = _confirmCallback;
  fecharConfirm();
  if (cb) cb();
});
confirmCancelBtn.addEventListener("click", fecharConfirm);
confirmOverlay.addEventListener("click", (e) => {
  if (e.target === confirmOverlay) fecharConfirm();
});

// ---------- Cálculos ----------
function totalComprado() {
  return itens.filter(i => i.comprado).reduce((s, i) => s + i.preco, 0);
}
function totalGeral() {
  return itens.reduce((s, i) => s + i.preco, 0);
}
function totalPendente() {
  return itens.filter(i => !i.comprado).reduce((s, i) => s + i.preco, 0);
}

// ---------- Renderização ----------
const listaContainer = document.getElementById("listaContainer");

function render() {
  renderResumo();
  renderLista();
  renderCategoriasDatalist();
}

function renderResumo() {
  document.getElementById("metaInput").value = meta ? meta.toFixed(2) : "";
  const gasto = totalComprado();
  document.getElementById("totalGasto").textContent = `${formatarMoeda(gasto)} comprado`;
  document.getElementById("totalMeta").textContent = `de ${formatarMoeda(meta)}`;
  document.getElementById("totalPendente").textContent = formatarMoeda(totalPendente());
  document.getElementById("totalGeral").textContent = formatarMoeda(totalGeral());

  const pct = meta > 0 ? Math.min((gasto / meta) * 100, 100) : 0;
  const fill = document.getElementById("progressFill");
  fill.style.width = pct + "%";
  fill.classList.toggle("over", gasto > meta && meta > 0);

  document.getElementById("miniResumo").textContent = `${formatarMoeda(gasto)} / ${formatarMoeda(meta)}`;
}

function itensFiltrados() {
  if (filtroAtual === "pendentes") return itens.filter(i => !i.comprado);
  if (filtroAtual === "comprados") return itens.filter(i => i.comprado);
  return itens;
}

function renderLista() {
  listaContainer.innerHTML = "";
  const visiveis = itensFiltrados();

  if (visiveis.length === 0) {
    const msg = filtroAtual === "pendentes"
      ? "Nenhum item pendente. Tudo comprado! 🎉"
      : filtroAtual === "comprados"
        ? "Nenhum item comprado ainda."
        : "Sua lista está vazia. Adicione itens abaixo.";
    listaContainer.innerHTML = `<div class="empty-state">${msg}</div>`;
    return;
  }

  const categoriasOrdem = [...new Set(DADOS_INICIAIS.map(b => b.categoria))];
  const categoriasPresentes = [...new Set(visiveis.map(i => i.categoria))];
  categoriasPresentes.sort((a, b) => {
    const ia = categoriasOrdem.indexOf(a);
    const ib = categoriasOrdem.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  categoriasPresentes.forEach(cat => {
    const itensCat = visiveis.filter(i => i.categoria === cat);
    const subtotal = itensCat.reduce((s, i) => s + i.preco, 0);

    const bloco = document.createElement("div");
    bloco.className = "categoria-bloco";
    bloco.innerHTML = `
      <div class="categoria-titulo">
        <span>${cat}</span>
        <span class="categoria-subtotal">${formatarMoeda(subtotal)}</span>
      </div>
    `;

    itensCat.forEach(item => bloco.appendChild(renderItemCard(item)));
    listaContainer.appendChild(bloco);
  });
}

function alternarComprado(item) {
  item.comprado = !item.comprado;
  salvarItens();
  render();
}

let _ultimoRemovido = null;

function removerItem(item) {
  const indice = itens.findIndex(i => i.id === item.id);
  if (indice === -1) return;
  itens.splice(indice, 1);
  salvarItens();

  const logEntry = {
    nome: item.nome,
    categoria: item.categoria,
    qtd: item.qtd,
    preco: item.preco,
    data: new Date().toISOString(),
  };
  removidosMes.push(logEntry);
  salvarRemovidosMes();

  _ultimoRemovido = { item, indice, logEntry };
  render();
  mostrarToast(`"${item.nome}" removido`, {
    label: "Desfazer",
    onClick: () => {
      if (!_ultimoRemovido) return;
      itens.splice(Math.min(_ultimoRemovido.indice, itens.length), 0, _ultimoRemovido.item);
      salvarItens();
      removidosMes = removidosMes.filter(r => r !== _ultimoRemovido.logEntry);
      salvarRemovidosMes();
      _ultimoRemovido = null;
      render();
    },
  });
}

const SWIPE_LIMIAR = 84;

function anexarSwipe(wrap, card, swipeBg, item) {
  let startX = 0, startY = 0, dx = 0, arrastando = false, decidido = false, pointerId = null;

  function aoMover(e) {
    if (pointerId !== null && e.pointerId !== pointerId) return;
    const novoDx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (!decidido) {
      if (Math.abs(novoDx) > 10 || Math.abs(dy) > 10) {
        decidido = true;
        arrastando = Math.abs(novoDx) > Math.abs(dy);
        if (arrastando) {
          card.style.transition = "none";
          if (document.activeElement && card.contains(document.activeElement)) {
            document.activeElement.blur();
          }
        }
      } else {
        return;
      }
    }
    if (!arrastando) return;

    e.preventDefault();
    dx = novoDx;
    card.style.transform = `translateX(${dx}px)`;

    const intensidade = Math.min(Math.abs(dx) / SWIPE_LIMIAR, 1);
    swipeBg.style.opacity = intensidade;
    swipeBg.classList.toggle("dir-right", dx > 0);
    swipeBg.classList.toggle("dir-left", dx < 0);
    swipeBg.textContent = dx > 0
      ? (item.comprado ? "↩ Desmarcar" : "✓ Comprado")
      : "🗑 Excluir";
  }

  function aoSoltar(e) {
    if (pointerId !== null && e.pointerId !== pointerId) return;
    card.removeEventListener("pointermove", aoMover);
    card.removeEventListener("pointerup", aoSoltar);
    card.removeEventListener("pointercancel", aoSoltar);
    pointerId = null;
    card.style.userSelect = "";

    if (!arrastando) { decidido = false; return; }

    card.style.transition = "transform .22s ease";

    if (dx > SWIPE_LIMIAR) {
      card.style.transform = `translateX(110%)`;
      swipeBg.style.opacity = 1;
      setTimeout(() => alternarComprado(item), 180);
    } else if (dx < -SWIPE_LIMIAR) {
      card.style.transform = `translateX(-110%)`;
      swipeBg.style.opacity = 1;
      setTimeout(() => removerItem(item), 180);
    } else {
      card.style.transform = "translateX(0)";
      swipeBg.style.opacity = 0;
    }
    dx = 0;
    arrastando = false;
    decidido = false;
  }

  card.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".checkbox") || e.target.closest(".item-del")) return;
    startX = e.clientX;
    startY = e.clientY;
    dx = 0;
    decidido = false;
    arrastando = false;
    pointerId = e.pointerId;
    card.style.userSelect = "none";
    card.addEventListener("pointermove", aoMover);
    card.addEventListener("pointerup", aoSoltar);
    card.addEventListener("pointercancel", aoSoltar);
  });
}

function renderItemCard(item) {
  const wrap = document.createElement("div");
  wrap.className = "item-card-wrap";
  wrap.dataset.id = item.id;

  const swipeBg = document.createElement("div");
  swipeBg.className = "swipe-bg";

  const card = document.createElement("div");
  card.className = "item-card" + (item.comprado ? " comprado" : "");

  const check = document.createElement("button");
  check.className = "checkbox" + (item.comprado ? " checked" : "");
  check.textContent = "✓";
  check.title = "Marcar como comprado";
  check.addEventListener("click", () => alternarComprado(item));

  const info = document.createElement("div");
  info.className = "item-info";

  const nomeInput = document.createElement("input");
  nomeInput.className = "item-nome";
  nomeInput.value = item.nome;
  nomeInput.addEventListener("change", () => {
    item.nome = nomeInput.value.trim() || item.nome;
    salvarItens();
  });

  const qtdInput = document.createElement("input");
  qtdInput.className = "item-qtd";
  qtdInput.value = item.qtd;
  qtdInput.placeholder = "Qtd / peso";
  qtdInput.addEventListener("change", () => {
    item.qtd = qtdInput.value.trim();
    salvarItens();
  });

  info.appendChild(nomeInput);
  info.appendChild(qtdInput);

  const precoWrap = document.createElement("div");
  precoWrap.className = "item-preco-wrap";
  const rs = document.createElement("span");
  rs.textContent = "R$";
  const precoInput = document.createElement("input");
  precoInput.type = "number";
  precoInput.step = "0.01";
  precoInput.min = "0";
  precoInput.inputMode = "decimal";
  precoInput.value = item.preco.toFixed(2);
  precoInput.addEventListener("change", () => {
    const v = parseFloat(precoInput.value);
    item.preco = isNaN(v) ? 0 : v;
    precoInput.value = item.preco.toFixed(2);
    salvarItens();
    renderResumo();
    renderLista();
  });
  precoWrap.appendChild(rs);
  precoWrap.appendChild(precoInput);

  const delBtn = document.createElement("button");
  delBtn.className = "item-del";
  delBtn.textContent = "🗑";
  delBtn.title = "Remover item";
  delBtn.addEventListener("click", () => removerItem(item));

  card.appendChild(check);
  card.appendChild(info);
  card.appendChild(precoWrap);
  card.appendChild(delBtn);

  wrap.appendChild(swipeBg);
  wrap.appendChild(card);
  anexarSwipe(wrap, card, swipeBg, item);

  return wrap;
}

function renderCategoriasDatalist() {
  const dl = document.getElementById("categoriasList");
  const categorias = [...new Set([
    ...DADOS_INICIAIS.map(b => b.categoria),
    ...itens.map(i => i.categoria),
  ])];
  dl.innerHTML = categorias.map(c => `<option value="${c}">`).join("");
}

// ---------- Ações ----------
document.getElementById("metaInput").addEventListener("change", (e) => {
  const v = parseFloat(e.target.value);
  meta = isNaN(v) ? 0 : v;
  salvarMeta();
  renderResumo();
});

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    filtroAtual = tab.dataset.filter;
    renderLista();
  });
});

// ---------- Modal "Adicionar item" ----------
const addModalOverlay = document.getElementById("addModalOverlay");

document.getElementById("fabAdd").addEventListener("click", () => {
  addModalOverlay.classList.remove("hidden");
  document.getElementById("novoNome").focus();
});
document.getElementById("btnFecharAdd").addEventListener("click", () => {
  addModalOverlay.classList.add("hidden");
});
addModalOverlay.addEventListener("click", (e) => {
  if (e.target === addModalOverlay) addModalOverlay.classList.add("hidden");
});

document.getElementById("btnAdd").addEventListener("click", () => {
  const nomeEl = document.getElementById("novoNome");
  const catEl = document.getElementById("novaCategoria");
  const qtdEl = document.getElementById("novaQtd");
  const precoEl = document.getElementById("novoPreco");

  const nome = nomeEl.value.trim();
  if (!nome) {
    mostrarToast("Digite o nome do item");
    nomeEl.focus();
    return;
  }
  const categoria = catEl.value.trim() || "Outros";
  const qtd = qtdEl.value.trim();
  const preco = parseFloat(precoEl.value) || 0;

  itens.push({ id: uid(), categoria, nome, qtd, preco, comprado: false });
  salvarItens();

  nomeEl.value = "";
  catEl.value = "";
  qtdEl.value = "";
  precoEl.value = "";
  nomeEl.focus();

  render();
  mostrarToast(`"${nome}" adicionado`);
});

// Enter no campo nome/preço também adiciona
["novoNome", "novaCategoria", "novaQtd", "novoPreco"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("btnAdd").click();
    }
  });
});

// ---------- Finalizar compra do mês ----------
document.getElementById("btnFinalizar").addEventListener("click", () => {
  const comprados = itens.filter(i => i.comprado);
  if (comprados.length === 0 && removidosMes.length === 0) {
    mostrarToast("Marque os itens comprados antes de finalizar");
    return;
  }
  const total = comprados.reduce((s, i) => s + i.preco, 0);
  const agora = new Date();
  const label = agora.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const infoRemovidos = removidosMes.length > 0
    ? `\n${removidosMes.length} item(ns) excluído(s) da lista também entrarão no relatório.`
    : "";

  confirmarAcao(
    `Finalizar compra de ${label}?\nTotal: ${formatarMoeda(total)}${infoRemovidos}\n\nOs itens comprados serão salvos no histórico e desmarcados para o próximo mês.`,
    () => {
      historico.unshift({
        id: uid(),
        data: agora.toISOString(),
        label,
        total,
        itens: comprados.map(i => ({ nome: i.nome, qtd: i.qtd, preco: i.preco, categoria: i.categoria })),
        itensRemovidos: removidosMes.map(r => ({ ...r })),
      });
      salvarHistorico();

      itens.forEach(i => { i.comprado = false; });
      salvarItens();

      removidosMes = [];
      salvarRemovidosMes();

      render();
      mostrarToast(`Compra de ${label} salva no histórico`);
    },
    "Finalizar"
  );
});

// ---------- Histórico (modal) ----------
const modalOverlay = document.getElementById("modalOverlay");

document.getElementById("btnHistorico").addEventListener("click", () => {
  renderHistorico();
  modalOverlay.classList.remove("hidden");
});
document.getElementById("btnFecharHistorico").addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
});
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.add("hidden");
});

function renderHistorico() {
  const container = document.getElementById("historicoLista");
  if (historico.length === 0) {
    container.innerHTML = `<div class="empty-historico">Nenhuma compra finalizada ainda.</div>`;
    return;
  }
  container.innerHTML = "";
  historico.forEach(h => {
    const dataFormatada = new Date(h.data).toLocaleDateString("pt-BR");
    const removidos = h.itensRemovidos || [];
    const bloco = document.createElement("div");
    bloco.className = "historico-item";
    bloco.innerHTML = `
      <div class="historico-item-header">
        <div>
          <strong>${h.label}</strong><br>
          <small>${dataFormatada} · ${h.itens.length} itens comprados${removidos.length ? ` · ${removidos.length} excluídos` : ""}</small>
        </div>
        <strong>${formatarMoeda(h.total)}</strong>
      </div>
      <div class="historico-detalhe">
        ${h.itens.map(it => `<div><span>${it.nome} <small>(${it.qtd || "-"})</small></span><span>${formatarMoeda(it.preco)}</span></div>`).join("")}
        ${removidos.length ? `
          <div class="historico-subtitulo">Excluídos da lista (não comprados)</div>
          ${removidos.map(it => `<div class="historico-removido"><span>${it.nome} <small>(${it.qtd || "-"})</small></span><span>${formatarMoeda(it.preco)}</span></div>`).join("")}
        ` : ""}
        <button class="historico-del" data-id="${h.id}">Excluir este registro</button>
      </div>
    `;
    const header = bloco.querySelector(".historico-item-header");
    const detalhe = bloco.querySelector(".historico-detalhe");
    header.addEventListener("click", () => detalhe.classList.toggle("aberto"));

    bloco.querySelector(".historico-del").addEventListener("click", (e) => {
      e.stopPropagation();
      confirmarAcao("Excluir este registro do histórico?", () => {
        historico = historico.filter(x => x.id !== h.id);
        salvarHistorico();
        renderHistorico();
      }, "Excluir");
    });

    container.appendChild(bloco);
  });
}

// ---------- Cabeçalho recolhível ao rolar ----------
const appHeader = document.querySelector(".app-header");
let _ultimoScrollY = 0;

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (y > 90 && y > _ultimoScrollY) {
    appHeader.classList.add("collapsed");
  } else if (y < 40 || y < _ultimoScrollY - 5) {
    appHeader.classList.remove("collapsed");
  }
  _ultimoScrollY = y;
}, { passive: true });

// ---------- Init ----------
carregar();
render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
