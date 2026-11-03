/* ==========================================================
   ILUSTRASI DAN IKON
   Gambar pengganti saat foto belum tersedia, plus ikon kecil.
   Semua warna memakai token dari css/tokens.css.
   ========================================================== */
(function () {
  "use strict";

  /* Serat optik: empat serat menembus pelindung sambungan */
  const fiberColors = ["blue", "orange", "green", "brown"].map(c => "var(--fiber-" + c + ")");
  const fiber = `<svg viewBox="0 0 320 240" role="img" aria-label="Ilustrasi penyambungan serat optik">
    <rect x="12" y="36" width="28" height="168" rx="3" fill="var(--ink)"/>
    <rect x="280" y="36" width="28" height="168" rx="3" fill="var(--ink)"/>
    ${[60, 100, 140, 180].map((y, i) => `
      <line x1="40" y1="${y}" x2="140" y2="${y}" stroke="${fiberColors[i]}" stroke-width="5" stroke-linecap="round"/>
      <line x1="180" y1="${y}" x2="280" y2="${y}" stroke="${fiberColors[i]}" stroke-width="5" stroke-linecap="round"/>
      <rect x="140" y="${y - 9}" width="40" height="18" rx="3" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.5"/>
      <circle cx="160" cy="${y}" r="2.5" fill="var(--accent)"/>`).join("")}
  </svg>`;

  /* Konektor RJ45 dengan urutan warna T568B */
  const t568b = [["orange", 1], ["orange", 0], ["green", 1], ["blue", 0], ["blue", 1], ["green", 0], ["brown", 1], ["brown", 0]];
  const lan = `<svg viewBox="0 0 320 240" role="img" aria-label="Ilustrasi konektor kabel LAN">
    <rect x="70" y="4" width="180" height="22" rx="4" fill="var(--ink)"/>
    ${t568b.map(([c, striped], i) => {
      const x = 83 + i * 20, col = "var(--fiber-" + c + ")";
      return striped
        ? `<rect x="${x}" y="22" width="14" height="96" fill="var(--fiber-white)" stroke="${col}" stroke-width="2.5"/>`
        : `<rect x="${x}" y="22" width="14" height="96" fill="${col}"/>`;
    }).join("")}
    <rect x="70" y="104" width="180" height="84" rx="5" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.75"/>
    ${t568b.map((_, i) => `<rect x="${87 + i * 20}" y="166" width="6" height="22" fill="var(--muted)"/>`).join("")}
    <rect x="140" y="188" width="40" height="16" rx="2" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.75"/>
  </svg>`;

  /* Panel depan switch dengan LED status */
  const led = "ggggogggrggo"; // g = aktif, o = mati, r = gangguan
  const sw = `<svg viewBox="0 0 320 240" role="img" aria-label="Ilustrasi panel depan switch jaringan">
    <rect x="20" y="64" width="280" height="112" rx="5" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.75"/>
    ${Array.from({ length: 12 }, (_, i) => {
      const row = i < 6 ? 0 : 1, col = i % 6, x = 44 + col * 40, y = row ? 134 : 96;
      const c = led[i] === "g" ? "var(--ok)" : led[i] === "r" ? "var(--accent)" : "var(--muted)";
      return `<circle cx="${x + 13}" cy="${y - 9}" r="3" fill="${c}"/><rect x="${x}" y="${y}" width="26" height="22" rx="2" fill="var(--soft)" stroke="var(--ink)" stroke-width="1.5"/>`;
    }).join("")}
  </svg>`;

  window.ART = { fiber: fiber, lan: lan, switch: sw };

  /* Ikon garis 24x24 untuk grup keahlian */
  const svg = inner => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  window.ICONS = {
    fiber:   svg('<path d="M2.5 17c5 0 5.5-10 9.5-10s4.5 10 9.5 10"/><circle cx="12" cy="7" r="1.6" fill="currentColor" stroke="none"/>'),
    network: svg('<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>'),
    doc:     svg('<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>')
  };
})();
