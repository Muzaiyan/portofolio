/* ==========================================================
   RENDER
   Mengubah data di data.js menjadi isi halaman.
   Biasanya file ini tidak perlu diubah.
   ========================================================== */
(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const joinId = a => a.length > 1 ? a.slice(0, -1).join(", ") + ", dan " + a[a.length - 1] : (a[0] || "");
  const initials = n => String(n).trim().split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
  const sealText = s => {
    const t = String(s).replace(/[^A-Za-z0-9]/g, "");
    if (t.length && t.length <= 4) return t.toUpperCase();
    return String(s).replace(/[^A-Za-z0-9 ]/g, "").trim().split(/\s+/).map(w => w[0] || "").join("").slice(0, 3).toUpperCase() || "ID";
  };
  const isRelative = u => !/^(https?:)?\/\//i.test(u) && !/^(mailto|tel|data):/i.test(u);
  const itemName = i => typeof i === "string" ? i : i.name;
  const itemLevel = i => typeof i === "object" && typeof i.level === "number" ? Math.max(0, Math.min(100, i.level)) : null;

  /* ---------- Potongan HTML yang dipakai ulang ---------- */
  const monoHTML = name =>
    `<span class="mark" aria-hidden="true">${esc(initials(name))}</span><span class="ph-cap">Foto profil</span>`;

  const sealHTML = issuer =>
    `<svg viewBox="0 0 120 120" role="img" aria-label="Lambang ${esc(issuer)}">
      <circle cx="60" cy="60" r="54" fill="none" stroke="var(--a1)" stroke-width="2"/>
      <circle cx="60" cy="60" r="45" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="2 4"/>
      <text x="60" y="68" text-anchor="middle" font-size="26" fill="var(--ink)" style="font-family:var(--f-display)">${esc(sealText(issuer))}</text>
    </svg>`;

  const projectMedia = p => p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" data-fallback="art" data-art="${esc(p.art)}">`
    : (window.ART[p.art] || "");

  /* ---------- Diagram jalur jaringan ---------- */
  function glyph(type, cx) {
    if (type === "isp") {
      return `<circle class="gl" cx="${cx}" cy="60" r="10"/><ellipse class="gl" cx="${cx}" cy="60" rx="4.5" ry="10"/><line class="gl" x1="${cx - 10}" y1="60" x2="${cx + 10}" y2="60"/>`;
    }
    if (type === "client") {
      return `<rect class="gl" x="${cx - 12}" y="48" width="24" height="15" rx="2"/><line class="gl" x1="${cx}" y1="63" x2="${cx}" y2="69"/><line class="gl" x1="${cx - 7}" y1="69" x2="${cx + 7}" y2="69"/>`;
    }
    return [0, 1].map(r => [0, 1, 2, 3].map(c =>
      `<rect class="pt" x="${cx - 19 + c * 10}" y="${50 + r * 12}" width="8" height="8" rx="2"/>`).join("")).join("");
  }

  function topoSVG(T) {
    const n = T.nodes.length, x0 = 60, x1 = 900;
    const step = n > 1 ? (x1 - x0) / (n - 1) : 0;
    const cx = i => Math.round(x0 + i * step);
    let s = `<svg viewBox="0 0 960 140" role="group" aria-label="Diagram jalur jaringan">`;

    T.links.forEach((kind, i) => {
      if (i >= n - 1) return;
      const a = cx(i) + 30, b = cx(i + 1) - 30, mid = Math.round((a + b) / 2);
      const fiber = kind === "fiber";
      s += `<line class="lk${fiber ? " fiber" : ""}" x1="${a}" y1="60" x2="${b}" y2="60"/>`;
      if (fiber) s += `<path class="pulse${i % 2 ? " b" : ""}" d="M${a} 60H${b}" pathLength="100"/>`;
      s += `<text class="tx sm" x="${mid}" y="44" text-anchor="middle">${fiber ? "fiber optik" : "UTP"}</text>`;
    });

    T.nodes.forEach((nd, i) => {
      const x = cx(i);
      s += `<g class="node" tabindex="0" role="button" aria-pressed="false" aria-label="${esc(nd.label)}" data-i="${i}">
        <rect class="hit" x="${x - 60}" y="24" width="120" height="100"/>
        <rect class="nd" x="${x - 30}" y="38" width="60" height="44" rx="12"/>
        ${glyph(nd.type, x)}
        <text class="tx" x="${x}" y="108" text-anchor="middle">${esc(nd.label)}</text>
      </g>`;
    });
    return s + "</svg>";
  }

  /* ---------- Render halaman ---------- */
  function render(C) {
    document.title = `${C.name} | ${C.roles[0] || "Portofolio"}`;

    /* Header */
    $("#brand-mark").textContent = initials(C.name);
    $("#brand-name").textContent = C.name;
    $("#nav-list").innerHTML = C.nav.map(n => `<li><a href="#${esc(n.id)}" data-spy="${esc(n.id)}">${esc(n.label)}</a></li>`).join("");

    /* Hero */
    $("#status").textContent = C.status;
    const words = String(C.name).trim().split(/\s+/);
    $("#name").innerHTML = words.length > 1
      ? `${esc(words[0])} <em class="grad">${esc(words.slice(1).join(" "))}</em>`
      : esc(C.name);
    $("#roles-sr").textContent = joinId(C.roles) + ".";
    $("#intro").textContent = C.intro;
    $("#portrait").innerHTML = C.photo
      ? `<img src="${esc(C.photo)}" alt="Foto ${esc(C.name)}" data-fallback="mono">`
      : monoHTML(C.name);

    ["#cv-bar", "#cv-hero", "#cv-contact"].forEach(sel => {
      const a = $(sel);
      a.href = C.cv;
      if (isRelative(C.cv)) a.setAttribute("download", "");
    });

    /* Terminal kecil di samping foto */
    const lines = [
      ["whoami", C.name],
      ["role", C.roles.join(" / ")],
      ["status", C.status]
    ];
    $("#term").innerHTML = `<div class="term-bar"><i></i><i></i><i></i><span>~/portofolio</span></div>
      <div class="term-body">${lines.map((l, i) => `<p style="--i:${i}"><b>$</b> ${esc(l[0])}</p><p class="out" style="--i:${i + .5}"><span>${esc(l[1])}</span></p>`).join("")}</div>`;

    /* Statistik: semua angka dihitung dari data */
    const edu = C.education[0];
    const techCount = C.technical.reduce((n, g) => n + g.items.length, 0);
    const stats = [];
    if (edu) stats.push({ v: edu.gpa, dec: 2, label: "IPK dari " + edu.scaleText });
    stats.push({ v: C.projects.length, dec: 0, label: "Proyek terdokumentasi" });
    stats.push({ v: techCount, dec: 0, label: "Kompetensi teknis" });
    stats.push({ v: C.certs.filter(c => !/^\[/.test(c.name)).length, dec: 0, label: "Pelatihan sertifikasi" });
    $("#stats").innerHTML = stats.map((s, i) => `
      <div class="stat card rv" style="--d:${i * .08}s"><b><em data-count="${s.v}" data-dec="${s.dec}">0</em></b><span>${esc(s.label)}</span></div>`).join("");

    /* Jalur jaringan */
    $("#topo-svg").innerHTML = topoSVG(C.topology);
    $("#topo-title").textContent = "Jalur jaringan";
    $("#topo-note").textContent = C.topology.hint;

    /* Marquee: gabungan keahlian dan tag proyek, tanpa duplikat */
    const words2 = [];
    C.technical.forEach(g => g.items.forEach(i => words2.push(itemName(i))));
    C.projects.forEach(p => p.tags.forEach(t => words2.push(t)));
    const uniq = Array.from(new Set(words2));
    const row = uniq.map(w => `<span>${esc(w)}</span>`).join("");
    $("#marquee").innerHTML = row + row;

    /* Tentang */
    $("#about").innerHTML = C.about.map(p => `<p>${esc(p)}</p>`).join("");
    $("#facts").innerHTML = C.facts.map((f, i) => `<div class="fact card" style="--d:${i * .06}s"><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join("");

    /* Keahlian */
    $("#tech").innerHTML = C.technical.map((g, gi) => {
      const withBar = g.items.filter(i => itemLevel(i) !== null);
      const plain = g.items.filter(i => itemLevel(i) === null);
      return `
      <article class="skill-card card rv" style="--d:${gi * .08}s">
        <div class="skill-head"><span class="ico-box">${window.ICONS[g.icon] || ""}</span><h3>${esc(g.group)}</h3></div>
        ${withBar.length ? `<div class="bars">${withBar.map(i => `
          <div class="bar-row"><div class="top"><span>${esc(itemName(i))}</span><span>${itemLevel(i)}%</span></div>
          <div class="track" role="img" aria-label="${esc(itemName(i))}: ${itemLevel(i)} persen"><i style="--v:${itemLevel(i)}%"></i></div></div>`).join("")}</div>` : ""}
        ${plain.length ? `<ul class="chips">${plain.map(i => `<li class="chip">${esc(itemName(i))}</li>`).join("")}</ul>` : ""}
      </article>`;
    }).join("");
    $("#soft").innerHTML = C.soft.map((s, i) => `
      <div class="card rv" style="--d:${i * .07}s"><span class="num grad">0${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("");

    /* Proyek + saringan tag */
    const tagSet = Array.from(new Set(C.projects.flatMap(p => p.tags)));
    $("#filters").innerHTML = tagSet.length > 1
      ? [`<button class="filter" type="button" data-filter="" aria-pressed="true">Semua</button>`]
          .concat(tagSet.map(t => `<button class="filter" type="button" data-filter="${esc(t)}" aria-pressed="false">${esc(t)}</button>`)).join("")
      : "";
    $("#projects").innerHTML = C.projects.map((p, i) => `
      <article class="proj card rv" data-tags="${esc(p.tags.join("|"))}" style="--d:${(i % 3) * .08}s">
        <button class="shot" type="button" data-project="${i}" aria-label="Buka detail proyek ${esc(p.title)}">${projectMedia(p)}</button>
        <div class="proj-body">
          <p class="ctx">${esc(p.context)}</p>
          <h3>${esc(p.title)}</h3>
          <p class="txt">${esc(p.text)}</p>
          <div class="tag-row">${p.tags.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        </div>
      </article>`).join("");

    /* Pengalaman */
    $("#experience").innerHTML = C.experience.map(j => `
      <article class="job card rv">
        <div class="job-top">
          <div><h3>${esc(j.role)}</h3><p class="org">${esc(j.company)}</p></div>
          <p class="period">${esc(j.period)}</p>
        </div>
        <ul class="bul">${j.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      </article>`).join("");

    /* Sertifikasi */
    $("#certs").innerHTML = C.certs.map((c, i) => `
      <article class="cert card rv" style="--d:${(i % 3) * .08}s">
        ${c.image
          ? `<button class="cert-thumb" type="button" data-media="${esc(c.image)}" data-alt="${esc(c.name)}" aria-label="Perbesar sertifikat ${esc(c.name)}"><img src="${esc(c.image)}" alt="Sertifikat ${esc(c.name)}" data-fallback="seal" data-issuer="${esc(c.issuer)}"></button>`
          : `<div class="cert-thumb">${sealHTML(c.issuer)}</div>`}
        <div class="cert-body">
          <h3>${esc(c.name)}</h3>
          <p class="org">${esc(c.issuer)}</p>
          ${c.link ? `<a class="lnk" href="${esc(c.link)}" target="_blank" rel="noopener">Lihat sertifikat</a>` : ""}
          <div class="cert-meta"><span class="chip">${esc(c.type)}</span><span class="period">${esc(c.year)}</span></div>
        </div>
      </article>`).join("");

    /* Pendidikan: IPK sebagai cincin progres */
    $("#education").innerHTML = C.education.map(e => {
      const frac = Math.max(0, Math.min(1, e.gpa / e.scale));
      const off = Math.round(327 * (1 - frac));
      return `
      <article class="edu card rv">
        <div>
          <h3>${esc(e.school)}</h3>
          <p class="org">${esc(e.program)}</p>
          <p class="period">${esc(e.period)}</p>
        </div>
        <div class="ring" role="img" aria-label="IPK ${esc(e.gpaText)} dari ${esc(e.scaleText)}">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs><linearGradient id="ring-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--a1)"/><stop offset="1" stop-color="var(--a2)"/></linearGradient></defs>
            <circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" cx="60" cy="60" r="52" style="--off:${off}"/>
          </svg>
          <div class="ring-txt"><b>${esc(e.gpaText)}</b><small>IPK / ${esc(e.scaleText)}</small></div>
        </div>
      </article>`;
    }).join("");

    /* Kontak */
    $("#contact-lead").textContent = C.contactLead;
    const k = C.contact;
    const rows = [
      ["Email",    k.email.text,    "mailto:" + k.email.text, false],
      ["WhatsApp", k.whatsapp.text, k.whatsapp.url,           true],
      ["LinkedIn", k.linkedin.text, k.linkedin.url,           true],
      ["GitHub",   k.github.text,   k.github.url,             true]
    ];
    $("#contacts").innerHTML = rows.map(r => `
      <div class="crow">
        <span class="clabel">${esc(r[0])}</span>
        <span class="cval">${esc(r[1])}</span>
        <span class="cact">
          <button class="mini" type="button" data-copy="${esc(r[1])}">Salin</button>
          <a class="mini" href="${esc(r[2])}"${r[3] ? ' target="_blank" rel="noopener"' : ""}>Buka</a>
        </span>
      </div>`).join("");

    /* Footer */
    $("#foot-links").innerHTML = rows.slice(1).map(r => `<li><a href="${esc(r[2])}" target="_blank" rel="noopener">${esc(r[0])}</a></li>`).join("");
    $("#copy").textContent = "© " + new Date().getFullYear() + " " + C.name;
  }

  window.SiteUI = { render: render, projectMedia: projectMedia, sealHTML: sealHTML, monoHTML: monoHTML, esc: esc };
})();
