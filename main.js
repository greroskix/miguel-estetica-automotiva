document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.querySelector(".hero__image");
  if (heroImage) {
    const images = ["assets/img/carros-exposicao/carro1.jpeg", "assets/img/carros-exposicao/carro2.jpeg", "assets/img/carros-exposicao/carro3.jpeg", "assets/img/carros-exposicao/carro4.jpeg", "assets/img/carros-exposicao/carro5.jpeg"];
    let currentIndex = 0;
    heroImage.style.transition = "opacity 0.5s ease-in-out";
    const changeImage = () => {
      heroImage.style.opacity = "0";
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        heroImage.src = images[currentIndex];
        heroImage.style.opacity = "1";
      }, 500);
    };
    setInterval(changeImage, 3000);
  }

  const revealElements = document.querySelectorAll(".reveal");
  let ticking = false;
  
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const trigger = window.innerHeight * 0.82;
        revealElements.forEach((el) => {
          if (!el.classList.contains("reveal--visible")) {
            const rect = el.getBoundingClientRect();
            if (rect.top < trigger) {
              el.classList.add("reveal--visible");
            }
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuToggle = document.getElementById("menu-toggle");
  const navMobile = document.getElementById("nav-mobile");
  const navMobileLinks = document.querySelectorAll(".nav-mobile__link");

  let closeMobileMenu = () => {};
  if (menuToggle && navMobile) {
    const toggleMenu = (isActive) => {
      menuToggle.classList.toggle("active", isActive);
      navMobile.classList.toggle("active", isActive);
      navMobile.style.pointerEvents = isActive ? "auto" : "none";
    };
    closeMobileMenu = () => toggleMenu(false);
    menuToggle.addEventListener("click", () => toggleMenu(!menuToggle.classList.contains("active")));
    navMobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));
    document.addEventListener("click", (e) => {
      if (navMobile.classList.contains("active") && !menuToggle.contains(e.target) && !navMobile.contains(e.target)) closeMobileMenu();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  const formatStat = (val, suffix) => suffix === "+" ? `+${val}` : suffix === "%" ? `${val}%` : suffix === ".0" ? Number(val).toFixed(1) : val;
  const animateCounter = (element, target, suffix = "", duration = 2000) => {
    let start = 0;
    const inc = target / (duration / 16);
    const timer = setInterval(() => {
      start += inc;
      element.textContent = formatStat(start >= target ? target : Math.floor(start), suffix);
      if (start >= target) clearInterval(timer);
    }, 16);
  };

  const statNumbers = document.querySelectorAll(".about__stat-number");
  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
          entry.target.classList.add("animated");
          const originalText = entry.target.textContent.trim();
          let target = parseFloat(originalText.replace(/[^0-9.]/g, ""));
          let suffix = "";
          
          if (originalText.includes("+")) suffix = "+";
          else if (originalText.includes("%")) suffix = "%";
          else if (originalText.includes(".")) suffix = ".0";
          
          animateCounter(entry.target, target, suffix, 2000);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach((stat) => statsObserver.observe(stat));
  }

  const reviewCards = document.querySelectorAll(".review__card");
  if (reviewCards.length > 0) {
    const reviewObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        reviewObserver.unobserve(el);
      });
    }, { threshold: 0.2 });
    reviewCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
      reviewObserver.observe(card);
    });
  }

  let lastScroll = 0;
  let lastHeaderHidden = false;
  let lastShadow = "";
  let scrollTicking = false;
  const header = document.querySelector(".topbar");
  const SHADOW_DEFAULT = "0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 4px 24px rgba(0, 0, 0, 0.4)";
  const SHADOW_SCROLL = "0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 8px 32px rgba(0, 0, 0, 0.6)";
  if (header) {
    window.addEventListener("scroll", () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;
          const hidden = currentScroll > 0 && currentScroll > lastScroll && currentScroll > 100;
          const shadow = currentScroll > 50 ? SHADOW_SCROLL : SHADOW_DEFAULT;
          if (currentScroll <= 0) {
            lastHeaderHidden = false;
            if (lastShadow !== SHADOW_DEFAULT) {
              header.style.boxShadow = SHADOW_DEFAULT;
              lastShadow = SHADOW_DEFAULT;
            }
          } else {
            if (lastHeaderHidden !== hidden) {
              header.style.transform = hidden ? "translateY(-100%)" : "translateY(0)";
              header.style.transition = "transform 0.3s ease-in-out";
              lastHeaderHidden = hidden;
            }
            if (lastShadow !== shadow) {
              header.style.boxShadow = shadow;
              lastShadow = shadow;
            }
          }
          lastScroll = currentScroll;
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }

  const serviceModal = document.getElementById("service-modal");
  const serviceModalContent = document.getElementById("service-modal-content");
  const serviceModalClose = document.querySelector(".service-modal__close");
  const serviceButtons = document.querySelectorAll(".service-card__button[data-service]");

  const serviceData = {
    "lavagem-tradicional": {
      title: "Lavagem tradicional",
      price: "A partir de R$ 60",
      description: "Lavagem completa do veículo com produtos de qualidade. Preço varia conforme o tamanho do carro.",
      features: [
        "Lavagem completa externa",
        "Limpeza de rodas e pneus",
        "Secagem profissional",
        "Produtos de qualidade",
        "Preço varia conforme o tamanho do carro"
      ],
      beforeAfter: [
        ["assets/img/lavagem-tradicional/molde3.jpeg", "assets/img/lavagem-tradicional/molde4.jpeg"]
      ],
      images: [
        "assets/img/lavagem-tradicional/molde1.jpg",
        "assets/img/lavagem-tradicional/molde2.gif"
      ]
    },
    cristalizacao: {
      title: "Lavagem tradicional + Cristalização de pára-brisa",
      price: "A partir de R$ 90",
      description: "Proteção e cristalização do pára-brisa com tratamento especializado. Inclui lavagem tradicional.",
      features: [
        "Cristalização do pára-brisa",
        "Proteção contra riscos",
        "Melhor visibilidade",
        "Inclui lavagem tradicional",
        "Tratamento especializado"
      ],
      images: [
        "assets/img/lavagem-tradicional-parabrisa/molde1.jpeg",
        "assets/img/lavagem-tradicional-parabrisa/molde2.gif"
      ]
    },
    "lavagem-motor": {
      title: "Lavagem tradicional + Lavagem de motor",
      price: "A partir de R$ 140",
      description: "Lavagem completa do veículo com limpeza detalhada do motor. Inclui lavagem tradicional externa.",
      features: [
        "Lavagem completa externa",
        "Limpeza detalhada do motor",
        "Remoção de sujeira e óleo",
        "Proteção de componentes elétricos",
        "Secagem profissional",
        "Produtos de qualidade"
      ],
      images: [
        "assets/img/lavagem-tradicional-motor/molde1.png",
        "assets/img/lavagem-tradicional-motor/molde2.jpeg"
      ]
    },
    "lavagem-detalhada": {
      title: "Lavagem detalhada",
      price: "A partir de R$ 150",
      description: "Limpeza detalhada e cuidadosa do veículo, com atenção especial aos detalhes e acabamentos.",
      features: [
        "Limpeza detalhada completa",
        "Atenção aos detalhes",
        "Limpeza de acabamentos",
        "Produtos premium",
        "Acabamento impecável"
      ],
      beforeAfter: [
        ["assets/img/lavagem-detalhada/molde1.jpg", "assets/img/lavagem-detalhada/molde2.jpg"],
        ["assets/img/lavagem-detalhada/molde3.jpg", "assets/img/lavagem-detalhada/molde4.jpg"]
      ]
    },
    higienizacao: {
      title: "Higienização interna",
      price: "A partir de R$ 350",
      description: "Limpeza profunda de bancos, teto, painel e carpete, eliminando odores e manchas. Preço varia conforme o carro.",
      features: [
        "Limpeza profunda de bancos (couro, tecido ou alcântara)",
        "Higienização completa do teto e painel",
        "Limpeza e desinfecção de carpete",
        "Remoção de odores e manchas",
        "Proteção e hidratação de materiais",
        "Preço varia conforme o carro"
      ],
      beforeAfter: [
        ["assets/img/higienizacao-interna/molde4.jpeg", "assets/img/higienizacao-interna/molde3.jpeg"]
      ],
      images: [
        "assets/img/higienizacao-interna/molde1.gif",
        "assets/img/higienizacao-interna/molde2.gif"
      ]
    },
    "servicos-personalizados": {
      title: "Serviços personalizados",
      price: "Sob consulta",
      description: "Combine diferentes serviços ou solicite tratamentos específicos para o seu veículo. Entre em contato e receba um orçamento personalizado de acordo com suas necessidades.",
      features: [
        "Combinação de múltiplos serviços",
        "Tratamentos específicos sob medida",
        "Orçamento personalizado",
        "Atendimento consultivo",
        "Soluções adaptadas ao seu veículo",
        "Entre em contato para mais informações"
      ],
      images: [
        "assets/img/lavagem-detalhada/capa.jpg"
      ]
    }
  };

  const openServiceModal = (serviceId) => {
    const service = serviceData[serviceId];
    if (!service) return;

    serviceModalContent.innerHTML = `
      <div class="service-modal__header">
        <h2 class="service-modal__title">${service.title}</h2>
        <div class="service-modal__price">${service.price}</div>
      </div>
      
      <p class="service-modal__description">${service.description}</p>
      
      ${service.images && service.images.length > 0 ? `
        <div class="service-modal__gallery">
          ${service.images.map(img => {
            if (img.endsWith('.mp4') || img.endsWith('.webm') || img.endsWith('.mov')) {
              return `<video src="${img}" alt="${service.title}" controls autoplay loop muted playsinline></video>`;
            } else {
              return `<img src="${img}" alt="${service.title}" loading="lazy" />`;
            }
          }).join('')}
        </div>
      ` : ''}
      ${service.beforeAfter && service.beforeAfter.length > 0 ? `
        <div class="service-modal__before-after">
          ${service.beforeAfter.map((pair, i) => `
            <div class="service-modal__before-after-pair">
              <div class="service-modal__before-after-col">
                <span class="service-modal__before-after-label">Antes</span>
                <img src="${pair[0]}" alt="${service.title} - Antes" loading="lazy" />
              </div>
              <div class="service-modal__before-after-col">
                <span class="service-modal__before-after-label">Depois</span>
                <img src="${pair[1]}" alt="${service.title} - Depois" loading="lazy" />
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      <ul class="service-modal__features">
        ${service.features.map(feature => `
          <li>${feature}</li>
        `).join('')}
      </ul>
      
      <div class="service-modal__cta">
        <a href="#agendar" class="btn btn--primary" data-service-cta="agendar">Agendar serviço</a>
        <a href="https://wa.me/5511943219718?text=${encodeURIComponent('Quero saber mais sobre ' + service.title.toLowerCase())}" target="_blank" rel="noopener noreferrer" class="btn btn--whatsapp-primary" data-service-cta="whatsapp">Falar no WhatsApp</a>
      </div>
    `;
    serviceModalContent.querySelector("[data-service-cta=agendar]")?.addEventListener("click", (e) => {
      e.preventDefault();
      closeServiceModal();
      setTimeout(() => (window.openBookingModal ? window.openBookingModal() : document.getElementById("open-booking-modal")?.click()), 300);
    });
    serviceModalContent.querySelector("[data-service-cta=whatsapp]")?.addEventListener("click", () => closeServiceModal());
    serviceModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeServiceModal = () => {
    serviceModal.classList.remove("active");
    document.body.style.overflow = "";
    const gallery = serviceModalContent.querySelector(".service-modal__gallery");
    gallery?.querySelectorAll("img, video").forEach((el) => {
      if (el.src?.includes(".gif")) {
        const s = el.src;
        el.src = "";
        setTimeout(() => (el.src = s), 10);
      }
    });
  };

  serviceButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const serviceId = button.getAttribute("data-service");
      openServiceModal(serviceId);
    });
  });

  if (serviceModalClose) {
    serviceModalClose.addEventListener("click", closeServiceModal);
  }

  if (serviceModal) {
    serviceModal.addEventListener("click", (e) => {
      if (e.target === serviceModal || e.target.classList.contains("service-modal__overlay")) {
        closeServiceModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (serviceModal?.classList.contains("active")) closeServiceModal();
    else if (bookingModal?.classList.contains("active")) closeBookingModal();
  });

  (function initServicesCarousel() {
    const carousel = document.querySelector(".services-carousel");
    const track = document.querySelector(".services-carousel__track");
    const dotsContainer = document.querySelector(".services-carousel__dots");
    if (!carousel || !track || !dotsContainer) return;

    const total = track.querySelectorAll(".service-card").length;
    if (total === 0) return;

    const MOBILE_BREAKPOINT = 720;
    let currentIndex = 0;
    let autoTimer = null;
    let touchStartX = 0;

    function updateTransform() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function updateDots() {
      const buttons = dotsContainer.querySelectorAll("button");
      buttons.forEach((btn, i) => {
        btn.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
      });
    }

    function goTo(index) {
      currentIndex = ((index % total) + total) % total;
      updateTransform();
      updateDots();
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => goTo(currentIndex + 1), 3000);
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    function onTouchStart(e) {
      touchStartX = e.touches[0].clientX;
    }

    function onTouchEnd(e) {
      const touchEndX = e.changedTouches[0].clientX;
      const delta = touchStartX - touchEndX;
      if (Math.abs(delta) < 50) return;
      if (delta > 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
      startAuto();
    }

    function buildDots() {
      dotsContainer.innerHTML = "";
      for (let i = 0; i < total; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-label", `Serviço ${i + 1} de ${total}`);
        btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
        btn.addEventListener("click", () => {
          goTo(i);
          startAuto();
        });
        dotsContainer.appendChild(btn);
      }
    }

    function enableCarousel() {
      track.style.transform = "";
      currentIndex = 0;
      buildDots();
      updateTransform();
      updateDots();
      startAuto();
      carousel.addEventListener("touchstart", onTouchStart, { passive: true });
      carousel.addEventListener("touchend", onTouchEnd, { passive: true });
    }

    function disableCarousel() {
      stopAuto();
      carousel.removeEventListener("touchstart", onTouchStart);
      carousel.removeEventListener("touchend", onTouchEnd);
      track.style.transform = "";
      dotsContainer.innerHTML = "";
    }

    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    function onMatch() {
      if (media.matches) enableCarousel();
      else disableCarousel();
    }
    media.addEventListener("change", onMatch);
    onMatch();
  })();

  const bookingModal = document.getElementById("booking-modal");
  const openBookingBtn = document.getElementById("open-booking-modal");
  const closeBookingBtn = document.querySelector(".booking-modal__close");
  const bookingForm = document.getElementById("booking-modal-form");
  const bookingSteps = document.querySelectorAll(".booking-step");
  const progressSteps = document.querySelectorAll(".booking-progress__step");
  const bookingServiceCards = document.querySelectorAll(".booking-service-card");
  const bookingServiceInput = document.getElementById("booking-service");
  const bookingNextBtn = document.querySelector(".booking-step__next");
  const bookingBackBtn = document.querySelector(".booking-step__back");
  const bookingBackFirstBtn = document.querySelector(".booking-step__back-first");
  const bookingSelectedPreview = document.getElementById("booking-selected-service-preview");
  const bookingSelectedCustom = document.getElementById("booking-selected-service-custom");
  const bookingSelectedImg = document.getElementById("booking-selected-img");
  const bookingSelectedName = document.getElementById("booking-selected-name");
  const bookingSelectedPrice = document.getElementById("booking-selected-price");
  const bookingSelectedCustomName = document.getElementById("booking-selected-custom-name");
  const bookingSelectedCustomPrice = document.getElementById("booking-selected-custom-price");
  const bookingCustomField = document.getElementById("booking-custom-service-field");
  const bookingCustomTextarea = document.getElementById("booking-custom-service");
  const CALENDLY_BASE_URL = "https://calendly.com/miguelesteticautomotiva/agendamentos-estetica-automotiva";

  let currentBookingStep = 1;
  let selectedBookingService = null;

  const openBookingModal = () => {
    if (bookingModal) {
      bookingModal.classList.add("active");
      document.body.style.overflow = "hidden";
      currentBookingStep = 1;
      updateBookingProgress();
      resetBookingForm();
    }
  };

  window.openBookingModal = openBookingModal;

  const closeBookingModal = () => {
    bookingModal.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
      currentBookingStep = 1;
      updateBookingProgress();
      resetBookingForm();
    }, 300);
  };

  const resetBookingForm = () => {
    bookingSteps.forEach((step, i) => step.classList.toggle("booking-step--active", i === 0));
    bookingServiceCards.forEach((c) => c.classList.remove("selected"));
    if (bookingNextBtn) bookingNextBtn.disabled = true;
    selectedBookingService = null;
    bookingForm?.reset();
  };

  const updateBookingProgress = () => {
    progressSteps.forEach((step, index) => {
      const stepNum = index + 1;
      step.classList.remove("booking-progress__step--active", "booking-progress__step--completed");
      
      if (stepNum < currentBookingStep) {
        step.classList.add("booking-progress__step--completed");
      } else if (stepNum === currentBookingStep) {
        step.classList.add("booking-progress__step--active");
      }
    });
  };

  const goToBookingStep = (step) => {
    bookingSteps.forEach((s, i) => s.classList.toggle("booking-step--active", i + 1 === step));
    currentBookingStep = step;
    updateBookingProgress();
    if (step === 2) updateAgendarButtonState();
  };

  const bookingAgendarBtn = bookingForm?.querySelector('button[type="submit"]');
  const bookingNameEl = document.getElementById("booking-name");
  const bookingPhoneEl = document.getElementById("booking-phone");
  const bookingCarEl = document.getElementById("booking-car");
  const bookingEmailEl = document.getElementById("booking-email");
  const bookingMessageEl = document.getElementById("booking-message");

  function isBookingStep2Valid() {
    const name = (bookingNameEl?.value || "").trim();
    const phoneRaw = (bookingPhoneEl?.value || "").trim();
    const car = (bookingCarEl?.value || "").trim();
    const phoneDigits = phoneRaw.replace(/\D/g, "");
    if (!name || !car || phoneDigits.length < 10) return false;
    if (selectedBookingService === "Serviços personalizados") {
      const custom = (bookingCustomTextarea?.value || "").trim();
      if (!custom) return false;
    }
    return true;
  }

  function updateAgendarButtonState() {
    if (!bookingAgendarBtn) return;
    const valid = isBookingStep2Valid();
    bookingAgendarBtn.classList.toggle("btn--agendar--invalid", !valid);
  }

  [bookingNameEl, bookingPhoneEl, bookingCarEl, bookingCustomTextarea].forEach((el) => {
    if (el) {
      el.addEventListener("input", updateAgendarButtonState);
      el.addEventListener("change", updateAgendarButtonState);
    }
  });

  if (openBookingBtn) {
    openBookingBtn.addEventListener("click", openBookingModal);
  }

  const navMobileAgendarLink = document.getElementById("nav-mobile-agendar-link");
  if (navMobileAgendarLink) navMobileAgendarLink.addEventListener("click", closeMobileMenu);

  if (closeBookingBtn) {
    closeBookingBtn.addEventListener("click", closeBookingModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener("click", (e) => {
      if (e.target === bookingModal || e.target.classList.contains("booking-modal__overlay")) {
        closeBookingModal();
      }
    });
  }

  bookingServiceCards.forEach((card) => {
    card.addEventListener("click", function () {
      bookingServiceCards.forEach((c) => c.classList.remove("selected"));
      this.classList.add("selected");
      
      const service = this.getAttribute("data-service");
      const image = this.getAttribute("data-image");
      const price = this.getAttribute("data-price");
      
      selectedBookingService = service;
      bookingServiceInput.value = service;
      bookingNextBtn.disabled = false;

      if (service === "Serviços personalizados") {
        bookingSelectedPreview.classList.add("is-hidden");
        bookingSelectedCustom.classList.remove("is-hidden");
        bookingSelectedCustomName.textContent = "Serviços personalizados";
        bookingSelectedCustomPrice.textContent = price || "Sob consulta";
      } else {
        bookingSelectedPreview.classList.remove("is-hidden");
        bookingSelectedCustom.classList.add("is-hidden");
        if (image) {
          bookingSelectedImg.src = image;
          bookingSelectedImg.alt = service;
        }
        bookingSelectedName.textContent = service;
        bookingSelectedPrice.textContent = `A partir de ${price}`;
      }
    });
  });

  if (bookingNextBtn) {
    bookingNextBtn.addEventListener("click", () => {
      if (selectedBookingService) {
        goToBookingStep(2);
        if (selectedBookingService === "Serviços personalizados") {
          bookingCustomField.classList.remove("is-hidden");
          bookingCustomTextarea.required = true;
        } else {
          bookingCustomField.classList.add("is-hidden");
          bookingCustomTextarea.required = false;
        }
      }
    });
  }

  if (bookingBackBtn) {
    bookingBackBtn.addEventListener("click", () => {
      goToBookingStep(1);
    });
  }

  if (bookingBackFirstBtn) {
    bookingBackFirstBtn.addEventListener("click", () => {
      closeBookingModal();
    });
  }

  const closeConfirmationBtn = document.querySelector(".booking-confirmation__close");
  if (closeConfirmationBtn) {
    closeConfirmationBtn.addEventListener("click", closeBookingModal);
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = (bookingNameEl?.value || "").trim();
      const phoneRaw = (bookingPhoneEl?.value || "").trim();
      const car = (bookingCarEl?.value || "").trim();
      const email = (bookingEmailEl?.value || "").trim();
      const service = bookingServiceInput?.value || "";
      const customService = (bookingCustomTextarea?.value || "").trim();
      const message = (bookingMessageEl?.value || "").trim();

      const phoneDigits = phoneRaw.replace(/\D/g, "");
      if (!name || !car || phoneDigits.length < 10) return;
      if (service === "Serviços personalizados" && !customService) return;

      const serviceText = service === "Serviços personalizados" && customService
        ? `Serviços personalizados: ${customService}`
        : service;
      const params = new URLSearchParams();
      params.set("name", name);
      if (email) params.set("email", email);
      params.set("a1", phoneRaw);
      params.set("a2", car);
      params.set("a3", serviceText || "");
      params.set("a4", message);
      const calendlyUrl = `${CALENDLY_BASE_URL}?${params.toString()}`;
      window.open(calendlyUrl, "_blank");

      goToBookingStep(3);
    });
  }
});
