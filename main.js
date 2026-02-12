document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.querySelector(".hero__image");
  if (heroImage) {
    const images = [
      "assets/img/carros-exposicao/carro1.jpeg",
      "assets/img/carros-exposicao/carro2.jpeg",
      "assets/img/carros-exposicao/carro3.jpeg",
      "assets/img/carros-exposicao/carro4.jpeg",
      "assets/img/carros-exposicao/carro5.jpeg"
    ];
    
    let currentIndex = 0;
    
    const changeImage = () => {
      heroImage.style.opacity = "0";
      heroImage.style.transition = "opacity 0.5s ease-in-out";
      
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

  if (menuToggle && navMobile) {
    const toggleMenu = (isActive) => {
      menuToggle.classList.toggle("active", isActive);
      navMobile.classList.toggle("active", isActive);
      navMobile.style.pointerEvents = isActive ? "auto" : "none";
    };

    menuToggle.addEventListener("click", () => {
      const isActive = !menuToggle.classList.contains("active");
      toggleMenu(isActive);
    });

    navMobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggleMenu(false);
      });
    });

    document.addEventListener("click", (e) => {
      if (
        navMobile.classList.contains("active") &&
        !menuToggle.contains(e.target) &&
        !navMobile.contains(e.target)
      ) {
        toggleMenu(false);
      }
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

  const animateCounter = (element, target, suffix = "", duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = suffix === "+" ? `+${target}` : suffix === "%" ? `${target}%` : suffix === ".0" ? `${target.toFixed(1)}` : target;
        clearInterval(timer);
      } else {
        const value = Math.floor(start);
        element.textContent = suffix === "+" ? `+${value}` : suffix === "%" ? `${value}%` : suffix === ".0" ? value.toFixed(1) : value;
      }
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
    reviewCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;

      const reviewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            reviewObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      reviewObserver.observe(card);
    });
  }

  let lastScroll = 0;
  let scrollTicking = false;
  const header = document.querySelector(".topbar");
  
  if (header) {
    window.addEventListener("scroll", () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;
          
          if (currentScroll <= 0) {
            header.style.boxShadow = "0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 4px 24px rgba(0, 0, 0, 0.4)";
            lastScroll = currentScroll;
            scrollTicking = false;
            return;
          }

          if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = "translateY(-100%)";
            header.style.transition = "transform 0.3s ease-in-out";
          } else {
            header.style.transform = "translateY(0)";
          }

          header.style.boxShadow = currentScroll > 50 
            ? "0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 8px 32px rgba(0, 0, 0, 0.6)"
            : "0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 4px 24px rgba(0, 0, 0, 0.4)";

          lastScroll = currentScroll;
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }


  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.cssText = `
      position: absolute;
      width: ${diameter}px;
      height: ${diameter}px;
      left: ${event.clientX - button.getBoundingClientRect().left - radius}px;
      top: ${event.clientY - button.getBoundingClientRect().top - radius}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    `;
    circle.classList.add("ripple");

    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) existingRipple.remove();

    button.appendChild(circle);
  };

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", createRipple);
  });

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
        <a href="#agendar" class="btn btn--primary" onclick="document.getElementById('service-modal').classList.remove('active'); document.body.style.overflow = ''; setTimeout(() => { if (window.openBookingModal) window.openBookingModal(); else document.getElementById('open-booking-modal')?.click(); }, 300);">Agendar serviço</a>
        <a href="https://wa.me/5511943219718?text=${encodeURIComponent('Quero saber mais sobre ' + service.title.toLowerCase())}" target="_blank" rel="noopener noreferrer" class="btn btn--whatsapp-primary" onclick="document.getElementById('service-modal').classList.remove('active'); document.body.style.overflow = '';">Falar no WhatsApp</a>
      </div>
    `;

    serviceModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeServiceModal = () => {
    serviceModal.classList.remove("active");
    document.body.style.overflow = "";
    
    const gallery = serviceModalContent.querySelector('.service-modal__gallery');
    if (gallery) {
      const mediaElements = gallery.querySelectorAll('img, video');
      mediaElements.forEach(element => {
        if (element.src && (element.src.endsWith('.gif') || element.src.includes('.gif'))) {
          const src = element.src;
          element.src = '';
          setTimeout(() => {
            element.src = src;
          }, 10);
        }
      });
    }
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
    if (e.key === "Escape" && serviceModal && serviceModal.classList.contains("active")) {
      closeServiceModal();
    }
    if (e.key === "Escape" && bookingModal && bookingModal.classList.contains("active")) {
      closeBookingModal();
    }
  });

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

  // Link do seu evento no Calendly (troque pelo seu link real)
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
    bookingSteps.forEach((step, index) => {
      if (index === 0) {
        step.classList.add("booking-step--active");
      } else {
        step.classList.remove("booking-step--active");
      }
    });
    bookingServiceCards.forEach(card => card.classList.remove("selected"));
    bookingNextBtn.disabled = true;
    bookingNextBtn.style.opacity = "0.5";
    selectedBookingService = null;
    if (bookingForm) bookingForm.reset();
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
    bookingSteps.forEach((s, index) => {
      if (index + 1 === step) {
        s.classList.add("booking-step--active");
      } else {
        s.classList.remove("booking-step--active");
      }
    });
    currentBookingStep = step;
    updateBookingProgress();
  };

  if (openBookingBtn) {
    openBookingBtn.addEventListener("click", openBookingModal);
  }

  const navMobileAgendarLink = document.getElementById("nav-mobile-agendar-link");
  if (navMobileAgendarLink && menuToggle && navMobile) {
    navMobileAgendarLink.addEventListener("click", () => {
      if (navMobile.classList.contains("active")) {
        menuToggle.classList.remove("active");
        navMobile.classList.remove("active");
        navMobile.style.pointerEvents = "none";
      }
    });
  }

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
      bookingNextBtn.style.opacity = "1";
      bookingNextBtn.style.cursor = "pointer";

      if (service === "Serviços personalizados") {
        bookingSelectedPreview.style.display = "none";
        bookingSelectedCustom.style.display = "flex";
        bookingSelectedCustomName.textContent = "Serviços personalizados";
        bookingSelectedCustomPrice.textContent = price || "Sob consulta";
      } else {
        bookingSelectedPreview.style.display = "flex";
        bookingSelectedCustom.style.display = "none";
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
          bookingCustomField.style.display = "flex";
          bookingCustomTextarea.required = true;
        } else {
          bookingCustomField.style.display = "none";
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

      const nameEl = document.getElementById("booking-name");
      const phoneEl = document.getElementById("booking-phone");
      const carEl = document.getElementById("booking-car");
      const emailEl = document.getElementById("booking-email");

      const name = (nameEl?.value || "").trim();
      const phoneRaw = (phoneEl?.value || "").trim();
      const car = (carEl?.value || "").trim();
      const email = (emailEl?.value || "").trim();
      const service = bookingServiceInput?.value || "";
      const customService = (bookingCustomTextarea?.value || "").trim();
      const message = (document.getElementById("booking-message")?.value || "").trim();

      const phoneDigits = phoneRaw.replace(/\D/g, "");
      const errors = [];

      if (!name) errors.push("Preencha o nome completo.");
      if (!car) errors.push("Preencha o modelo e ano do veículo.");
      if (!phoneRaw) {
        errors.push("Preencha o número de WhatsApp.");
      } else if (phoneDigits.length < 10) {
        errors.push("O WhatsApp deve conter apenas números (mínimo 10 dígitos).");
      }
      if (service === "Serviços personalizados" && !customService) {
        errors.push("Descreva o serviço personalizado.");
      }

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

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
