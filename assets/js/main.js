
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
