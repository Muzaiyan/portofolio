/* ==========================================================
   INTERAKSI
   Tema dan warna aksen, menu, palet perintah, animasi muncul,
   penghitung angka, teks mengetik, saringan proyek, jalur jaringan,
   jendela detail, salin kontak, dan form pesan.
   ========================================================== */
(function () {
  "use strict";

  const C = window.PORTFOLIO;
  const UI = window.SiteUI;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* abaikan */ } }
  };

  /* Gambar yang gagal dimuat diganti ilustrasi atau inisial.
     Dipasang sebelum render agar tidak ada yang terlewat. */
  document.addEventListener("error", e => {
    const t = e.target;
    if (!t || t.tagName !== "IMG" || !t.dataset.fallback) return;
    const host = t.parentElement;
    if (t.dataset.fallback === "art") host.innerHTML = window.ART[t.dataset.art] || "";
    else if (t.dataset.fallback === "mono") host.innerHTML = UI.monoHTML(C.name);
    else if (t.dataset.fallback === "seal") {
      const box = document.createElement("div");
      box.className = "cert-thumb";
      box.innerHTML = UI.sealHTML(t.dataset.issuer);
      host.replaceWith(box);
    }
  }, true);

  UI.render(C);

  /* ---------- Toast ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2000);
  }

  /* ---------- Tema terang atau gelap ---------- */
  const themeMeta = $('meta[name="theme-color"]');
  function syncThemeColor() {
    if (themeMeta) themeMeta.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg").trim());
  }
  syncThemeColor();

  function applyTheme(next) {
    root.setAttribute("data-theme", next);
    syncThemeColor();
  }
  /* Beralih tema dengan efek lingkaran yang meluas dari tombol (jika didukung browser) */
  function setTheme(next, origin) {
    store.set("theme", next);
    if (!document.startViewTransition || reduced) { applyTheme(next); return; }
    const r = origin ? origin.getBoundingClientRect() : { left: innerWidth / 2, top: 0, width: 0, height: 0 };
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(() => applyTheme(next));
    t.ready.then(() => {
      root.animate(
        { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + rad + "px at " + x + "px " + y + "px)"] },
        { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(() => {});
  }
  const currentTheme = () => root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const toggleTheme = origin => setTheme(currentTheme() === "dark" ? "light" : "dark", origin);
  $("#theme-btn").addEventListener("click", e => toggleTheme(e.currentTarget));

  /* Ikuti pengaturan perangkat selama pengunjung belum memilih sendiri */
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!store.get("theme")) applyTheme(e.matches ? "dark" : "light");
  });

  /* ---------- Warna aksen ---------- */
  const ACCENTS = [
    { id: "aurora",  label: "Aurora",  sw: "linear-gradient(135deg,#7C6CFF,#2DD4E8)" },
    { id: "emerald", label: "Zamrud",  sw: "linear-gradient(135deg,#10B981,#22D3EE)" },
    { id: "sunset",  label: "Senja",   sw: "linear-gradient(135deg,#F43F8E,#F59E0B)" },
    { id: "azure",   label: "Azure",   sw: "linear-gradient(135deg,#3B82F6,#38E0F5)" }
  ];
  const accentBtn = $("#accent-btn"), accentPop = $("#accent-pop");
  const swatches = $("#swatches");
  swatches.innerHTML = ACCENTS.map(a =>
    `<button class="swatch" type="button" data-accent="${a.id}" style="--sw:${a.sw}" aria-label="${a.label}" aria-pressed="false" title="${a.label}"></button>`).join("");
  function setAccent(id, save) {
    if (!ACCENTS.some(a => a.id === id)) id = "aurora";
    root.setAttribute("data-accent", id);
    $$(".swatch").forEach(s => s.setAttribute("aria-pressed", s.dataset.accent === id ? "true" : "false"));
    if (save) store.set("accent", id);
    syncThemeColor();
  }
  setAccent(root.getAttribute("data-accent") || "aurora", false);
  function setPop(open) {
    accentPop.hidden = !open;
    accentBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  accentBtn.addEventListener("click", e => { e.stopPropagation(); setPop(accentPop.hidden); });
  swatches.addEventListener("click", e => {
    const b = e.target.closest(".swatch");
    if (b) { setAccent(b.dataset.accent, true); toast("Warna aksen: " + b.getAttribute("aria-label")); }
  });
  document.addEventListener("click", e => { if (!accentPop.hidden && !e.target.closest(".accent-wrap")) setPop(false); });

  /* ---------- Menu di layar kecil ---------- */
  const nav = $("#nav"), menuBtn = $("#menu-btn");
  function setMenu(open) {
    nav.dataset.open = open ? "true" : "false";
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }
  menuBtn.addEventListener("click", () => setMenu(nav.dataset.open !== "true"));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { setMenu(false); setPop(false); } });
  window.matchMedia("(min-width: 861px)").addEventListener("change", e => { if (e.matches) setMenu(false); });

  /* ---------- Penanda section aktif ---------- */
  const links = $$("[data-spy]");
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(a => a.setAttribute("aria-current", a.dataset.spy === en.target.id ? "true" : "false"));
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    C.nav.forEach(n => { const s = document.getElementById(n.id); if (s) spy.observe(s); });
  }

  /* ---------- Garis kemajuan dan tombol ke atas ---------- */
  const bar = $("#progress"), toTop = $("#to-top");
  let ticking = false;
  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.setProperty("--p", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
    toTop.hidden = window.scrollY < 700;
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

  /* ---------- Muncul saat di-scroll + penghitung angka ---------- */
  function countUp(el) {
    const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0;
    const fmt = v => v.toLocaleString("id-ID", { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (reduced) { el.textContent = fmt(end); return; }
    const t0 = performance.now(), dur = 1400;
    (function step(now) {
      const p = Math.min(1, (now - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(end * eased);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  const rvs = $$(".rv");
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    rvs.forEach(el => io.observe(el));
  } else {
    rvs.forEach(el => { el.classList.add("in"); $$("[data-count]", el).forEach(countUp); });
  }

  /* ---------- Teks peran yang mengetik ---------- */
  const typed = $("#typed");
  const roles = C.roles.slice();
  if (reduced || roles.length < 2) {
    typed.textContent = roles[0] || "";
  } else {
    let ri = 0, ci = 0, del = false;
    (function tick() {
      const word = roles[ri];
      ci += del ? -1 : 1;
      typed.textContent = word.slice(0, ci);
      let wait = del ? 35 : 80;
      if (!del && ci === word.length) { del = true; wait = 1600; }
      else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; wait = 350; }
      setTimeout(tick, wait);
    })();
  }

  /* ---------- Cahaya kartu mengikuti kursor ---------- */
  document.addEventListener("pointermove", e => {
    const card = e.target.closest && e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) + "px");
    card.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  /* ---------- Saringan proyek ---------- */
  const filters = $("#filters");
  filters.addEventListener("click", e => {
    const b = e.target.closest(".filter");
    if (!b) return;
    $$(".filter", filters).forEach(f => f.setAttribute("aria-pressed", f === b ? "true" : "false"));
    const tag = b.dataset.filter;
    $$(".proj").forEach(p => {
      const show = !tag || p.dataset.tags.split("|").indexOf(tag) !== -1;
      p.hidden = !show;
      if (show) { p.classList.remove("pop"); void p.offsetWidth; p.classList.add("pop"); }
    });
  });

  /* ---------- Jalur jaringan ---------- */
  const nodes = $$(".node");
  function selectNode(i) {
    const nd = C.topology.nodes[i];
    if (!nd) return;
    nodes.forEach((n, k) => { n.classList.toggle("on", k === i); n.setAttribute("aria-pressed", k === i ? "true" : "false"); });
    $("#topo-title").textContent = nd.label;
    $("#topo-note").textContent = nd.note;
  }
  const topo = $("#topo-svg");
  topo.addEventListener("click", e => { const n = e.target.closest(".node"); if (n) selectNode(+n.dataset.i); });
  topo.addEventListener("mouseover", e => { const n = e.target.closest(".node"); if (n) selectNode(+n.dataset.i); });
  topo.addEventListener("focusin", e => { const n = e.target.closest(".node"); if (n) selectNode(+n.dataset.i); });
  topo.addEventListener("keydown", e => {
    const n = e.target.closest(".node");
    if (n && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); selectNode(+n.dataset.i); }
  });

  /* ---------- Jendela detail ---------- */
  const dlg = $("#dlg");
  const canDialog = typeof dlg.showModal === "function";
  function show(onlyMedia) {
    dlg.classList.toggle("only-media", !!onlyMedia);
    document.body.classList.add("lock");
    dlg.showModal();
  }
  function openProject(i) {
    const p = C.projects[i];
    if (!p) return;
    const e = UI.esc;
    $("#dlg-media").innerHTML = UI.projectMedia(p);
    $("#dlg-body").innerHTML =
      `<div><p class="ctx">${e(p.context)}</p><h3 id="dlg-title">${e(p.title)}</h3></div>
       <p>${e(p.text)}</p>
       ${p.details && p.details.length ? `<div><p class="sub">Yang saya kerjakan</p><ul class="bul">${p.details.map(d => `<li>${e(d)}</li>`).join("")}</ul></div>` : ""}
       <div class="tag-row" style="padding:0">${p.tags.map(t => `<span class="chip">${e(t)}</span>`).join("")}</div>
       ${p.link ? `<a class="lnk" href="${e(p.link)}" target="_blank" rel="noopener">Lihat dokumentasi</a>` : ""}`;
    show(false);
  }
  function openMedia(src, alt) {
    $("#dlg-media").innerHTML = `<img src="${UI.esc(src)}" alt="${UI.esc(alt || "")}">`;
    $("#dlg-body").innerHTML = `<h3 id="dlg-title" class="sr">${UI.esc(alt || "Pratinjau")}</h3>`;
    show(true);
  }
  if (canDialog) {
    dlg.addEventListener("close", () => { if (!cmd.open) document.body.classList.remove("lock"); });
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  } else {
    $$("[data-project], [data-media]").forEach(el => { el.disabled = true; });
  }

  /* ---------- Palet perintah (Ctrl atau Cmd + K) ---------- */
  const cmd = $("#cmd"), cmdInput = $("#cmd-input"), cmdList = $("#cmd-list");
  $("#kbd-hint").textContent = isMac ? "⌘ K" : "Ctrl K";
  const go = id => () => { const s = document.getElementById(id); if (s) s.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); };
  const actions = [];
  C.nav.forEach(n => actions.push({ g: "Lompat ke", label: n.label, hint: "#" + n.id, run: go(n.id) }));
  actions.push(
    { g: "Aksi", label: "Ganti tema terang atau gelap", hint: "tema", run: () => toggleTheme($("#theme-btn")) },
    { g: "Aksi", label: "Unduh CV", hint: "PDF", run: () => $("#cv-hero").click() },
    { g: "Aksi", label: "Salin alamat email", hint: C.contact.email.text, run: () => copyText(C.contact.email.text, "Email tersalin") },
    { g: "Aksi", label: "Cetak halaman ini", hint: "print", run: () => window.print() }
  );
  ACCENTS.forEach(a => actions.push({ g: "Warna aksen", label: a.label, hint: "aksen", run: () => { setAccent(a.id, true); toast("Warna aksen: " + a.label); } }));

  let shown = [], sel = 0;
  function drawCmd(q) {
    q = (q || "").trim().toLowerCase();
    shown = actions.filter(a => !q || (a.label + " " + a.g + " " + a.hint).toLowerCase().indexOf(q) !== -1);
    sel = 0;
    if (!shown.length) { cmdList.innerHTML = '<p class="cmd-empty">Tidak ada hasil.</p>'; return; }
    let html = "", last = "";
    shown.forEach((a, i) => {
      if (a.g !== last) { html += `<p class="cmd-group">${UI.esc(a.g)}</p>`; last = a.g; }
      html += `<button class="cmd-item" type="button" role="option" data-i="${i}" aria-selected="${i === 0}">${UI.esc(a.label)}<span class="hint">${UI.esc(a.hint)}</span></button>`;
    });
    cmdList.innerHTML = html;
  }
  function pick(i) {
    sel = (i + shown.length) % shown.length;
    $$(".cmd-item", cmdList).forEach((b, k) => b.setAttribute("aria-selected", k === sel ? "true" : "false"));
    const cur = $$(".cmd-item", cmdList)[sel];
    if (cur) cur.scrollIntoView({ block: "nearest" });
  }
  function openCmd() {
    if (typeof cmd.showModal !== "function" || cmd.open) return;
    if (dlg.open) dlg.close();
    setMenu(false);
    cmdInput.value = "";
    drawCmd("");
    document.body.classList.add("lock");
    cmd.showModal();
    cmdInput.focus();
  }
  function runCmd(i) {
    const a = shown[i];
    if (!a) return;
    cmd.close();
    setTimeout(a.run, 60);
  }
  cmd.addEventListener("close", () => document.body.classList.remove("lock"));
  cmd.addEventListener("click", e => { if (e.target === cmd) cmd.close(); });
  cmdInput.addEventListener("input", () => drawCmd(cmdInput.value));
  cmdInput.addEventListener("keydown", e => {
    if (e.key === "ArrowDown") { e.preventDefault(); if (shown.length) pick(sel + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (shown.length) pick(sel - 1); }
    else if (e.key === "Enter") { e.preventDefault(); runCmd(sel); }
  });
  cmdList.addEventListener("click", e => { const b = e.target.closest(".cmd-item"); if (b) runCmd(+b.dataset.i); });
  cmdList.addEventListener("mousemove", e => { const b = e.target.closest(".cmd-item"); if (b && +b.dataset.i !== sel) pick(+b.dataset.i); });
  $("#cmd-btn").addEventListener("click", openCmd);
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmd.open ? cmd.close() : openCmd(); }
  });

  /* ---------- Salin teks ---------- */
  function copyText(text, msg) {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { /* abaikan */ }
      ta.remove();
      toast(ok ? msg : "Salin manual: " + text);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast(msg), fallback);
    else fallback();
  }

  /* ---------- Klik: detail proyek, pratinjau sertifikat, salin kontak ---------- */
  document.addEventListener("click", e => {
    const pj = e.target.closest("[data-project]");
    if (pj && canDialog) { openProject(+pj.dataset.project); return; }

    const md = e.target.closest("[data-media]");
    if (md && canDialog) { openMedia(md.dataset.media, md.dataset.alt); return; }

    const cp = e.target.closest("[data-copy]");
    if (!cp) return;
    copyText(cp.dataset.copy, "Tersalin: " + cp.dataset.copy);
    cp.textContent = "Tersalin";
    setTimeout(() => { cp.textContent = "Salin"; }, 1600);
  });

  /* ---------- Form pesan: membuka aplikasi email ---------- */
  const form = $("#compose");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#f-name"), msg = $("#f-msg");
    let ok = true;
    [name, msg].forEach(f => {
      const bad = !f.value.trim();
      f.classList.toggle("bad", bad);
      if (bad) ok = false;
    });
    if (!ok) { $("#compose-note").textContent = "Isi nama dan pesan terlebih dahulu."; return; }
    const subject = encodeURIComponent("Halo dari portofolio Anda");
    const body = encodeURIComponent("Halo " + C.name + ",\n\n" + msg.value.trim() + "\n\nSalam,\n" + name.value.trim());
    $("#compose-note").textContent = "Membuka aplikasi email Anda. Jika tidak terbuka, salin alamat email di atas.";
    window.location.href = "mailto:" + C.contact.email.text + "?subject=" + subject + "&body=" + body;
  });
})();
