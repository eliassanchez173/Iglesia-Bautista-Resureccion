// ===== Alert =====
const alertConfig = {
  enabled: false, // turn true to display
  message: "TODAS LAS ACTIVIDADES PROGRAMADAS PARA ESTE FIN DE SEMANA ESTAN SUSPENDIDAS POR LAS CONDICIONES CLIMATICAS 01/09-01/11",
  startDate: null, // e.g. "2026-02-01T00:00:00-05:00"
  endDate: null    // e.g. "2026-02-02T12:00:00-05:00"
};

function withinWindow(now, startDate, endDate) {
  if (startDate && now < new Date(startDate)) return false;
  if (endDate && now > new Date(endDate)) return false;
  return true;
}

function showAlert(msg) {
  const backdrop = document.getElementById("alertBackdrop");
  const messageEl = document.getElementById("alertMessage");
  const closeBtn = document.getElementById("alertCloseBtn");

  messageEl.textContent = msg;
  backdrop.classList.add("show");
  backdrop.setAttribute("aria-hidden", "false");

  closeBtn.addEventListener("click", () => {
    backdrop.classList.remove("show");
    backdrop.setAttribute("aria-hidden", "true");
  });
}

(() => {
  const now = new Date();
  if (alertConfig.enabled && withinWindow(now, alertConfig.startDate, alertConfig.endDate)) {
    showAlert(alertConfig.message);
  }
})();


// ===== VBS (Vacation Bible School) =====
// To turn this off after VBS week, just set enabled to false.
const vbsConfig = {
  enabled: true,
  title: "Estación Iluminación",
  dates: "29 de Junio – 3 de Julio • 6:00–9:00 pm",
  ageRange: "Para todas las edades • Pre-K a Adultos",
  banner: "✨ Inscripciones abiertas para Estación Iluminación, nuestra Escuela Bíblica de Vacaciones (29 jun–3 jul)",
  bannerLinkText: "Ver detalles",
  ctaText: "Más información",
  page: "vbs.html"
};

function showVbsPopup(config) {
  const backdrop = document.getElementById("vbsBackdrop");
  if (!backdrop) return;

  const titleEl = document.getElementById("vbsModalTitle");
  const datesEl = document.getElementById("vbsModalDates");
  const ctaEl = document.getElementById("vbsModalCta");
  const closeBtn = document.getElementById("vbsCloseBtn");

  if (titleEl) titleEl.textContent = config.title;
  if (datesEl) datesEl.textContent = `${config.dates} — ${config.ageRange}`;
  if (ctaEl) ctaEl.setAttribute("href", config.page);

  // Don't re-show the popup if the person already dismissed it this session
  if (sessionStorage.getItem("vbsPopupDismissed") === "1") return;

  backdrop.classList.add("show");
  backdrop.setAttribute("aria-hidden", "false");

  closeBtn?.addEventListener("click", () => {
    backdrop.classList.remove("show");
    backdrop.setAttribute("aria-hidden", "true");
    sessionStorage.setItem("vbsPopupDismissed", "1");
  });
}

function showVbsBanner(config) {
  const banner = document.getElementById("vbsBanner");
  if (!banner) return;

  if (sessionStorage.getItem("vbsBannerDismissed") === "1") return;

  const textEl = document.getElementById("vbsBannerText");
  const linkEl = document.getElementById("vbsBannerLink");
  const closeBtn = document.getElementById("vbsBannerCloseBtn");

  if (textEl) textEl.textContent = config.banner;
  if (linkEl) {
    linkEl.textContent = config.bannerLinkText;
    linkEl.setAttribute("href", config.page);
  }

  banner.classList.add("show");
  document.body.classList.add("has-vbs-banner");

  function syncHeaderOffset() {
    document.documentElement.style.setProperty("--vbs-banner-height", `${banner.offsetHeight}px`);
  }
  syncHeaderOffset();
  window.addEventListener("resize", syncHeaderOffset);

  closeBtn?.addEventListener("click", () => {
    banner.classList.remove("show");
    document.body.classList.remove("has-vbs-banner");
    sessionStorage.setItem("vbsBannerDismissed", "1");
    window.removeEventListener("resize", syncHeaderOffset);
  });
}

(() => {
  const onVbsPage = /vbs\.html$/.test(window.location.pathname);
  if (vbsConfig.enabled && !onVbsPage) {
    showVbsBanner(vbsConfig);
    showVbsPopup(vbsConfig);
  }
})();


// ===== DOCTRINE CAROUSEL =====
(function initDoctrineCarousel() {
  const carousel = document.getElementById("doctrineCarousel");
  if (!carousel) return;

  const slides = carousel.querySelectorAll(".slide");
  const counter = document.getElementById("slideCounter");
  const prevBtn = document.getElementById("doctrinePrev");
  const nextBtn = document.getElementById("doctrineNext");

  if (!slides.length) return;

  let current = 0;

  function render() {
    slides.forEach((s, i) => s.classList.toggle("active", i === current));
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  }

  prevBtn?.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    render();
  });

  nextBtn?.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    render();
  });

  render();
})();
