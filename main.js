document.addEventListener("DOMContentLoaded", () => {
  // Animação de revelação ao rolar
  const revealElements = document.querySelectorAll(".reveal");

  const onScroll = () => {
    const trigger = window.innerHeight * 0.82;

    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger) {
        el.classList.add("reveal--visible");
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  // Menu hambúrguer
  const menuToggle = document.getElementById("menu-toggle");
  const navMobile = document.getElementById("nav-mobile");
  const navMobileLinks = document.querySelectorAll(".nav-mobile__link");

  if (menuToggle && navMobile) {
    menuToggle.addEventListener("click", () => {
      const isActive = menuToggle.classList.toggle("active");
      navMobile.classList.toggle("active");
      // Habilitar/desabilitar pointer-events baseado no estado
      navMobile.style.pointerEvents = isActive ? "auto" : "none";
    });

    // Fechar menu ao clicar em um link
    navMobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMobile.classList.remove("active");
        navMobile.style.pointerEvents = "none";
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        !menuToggle.contains(e.target) &&
        !navMobile.contains(e.target) &&
        navMobile.classList.contains("active")
      ) {
        menuToggle.classList.remove("active");
        navMobile.classList.remove("active");
        // Garantir que pointer-events seja desabilitado
        navMobile.style.pointerEvents = "none";
      }
    });
  }
});

