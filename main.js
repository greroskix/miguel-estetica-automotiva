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
    
    setInterval(changeImage, 4500);
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

  const form = document.getElementById("booking-form");
  if (form) {
    const serviceCards = document.querySelectorAll(".service-selection__card");
    const serviceInput = document.getElementById("service");
    const nextBtn = document.querySelector(".form__next-btn");
    const backBtn = document.querySelector(".form__back-btn");
    const step1 = document.querySelector('[data-step="1"]');
    const step2 = document.querySelector('[data-step="2"]');
    const selectedServicePreview = document.getElementById("selected-service-preview");
    const selectedServiceCustom = document.getElementById("selected-service-custom");
    const selectedServiceImg = document.getElementById("selected-service-img");
    const selectedServiceName = document.getElementById("selected-service-name");
    const selectedServicePrice = document.getElementById("selected-service-price");
    const selectedServiceCustomName = document.getElementById("selected-service-custom-name");
    const selectedServiceCustomPrice = document.getElementById("selected-service-custom-price");
    const customServiceField = document.getElementById("custom-service-field");
    const customServiceTextarea = document.getElementById("custom-service");

    let selectedService = null;

    serviceCards.forEach((card) => {
      card.addEventListener("click", function () {
        serviceCards.forEach((c) => c.classList.remove("selected"));
        this.classList.add("selected");
        
        const service = this.getAttribute("data-service");
        const image = this.getAttribute("data-image");
        const price = this.getAttribute("data-price");
        
        selectedService = service;
        serviceInput.value = service;
        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";

        if (service === "personalizado" || service === "Serviços personalizados") {
          selectedServicePreview.style.display = "none";
          selectedServiceCustom.style.display = "flex";
          selectedServiceCustomName.textContent = service === "Serviços personalizados" ? "Serviços personalizados" : "Serviço personalizado";
          selectedServiceCustomPrice.textContent = price || "Sob consulta";
        } else {
          selectedServicePreview.style.display = "flex";
          selectedServiceCustom.style.display = "none";
          if (image) {
            selectedServiceImg.src = image;
            selectedServiceImg.alt = service;
          }
          selectedServiceName.textContent = service;
          selectedServicePrice.textContent = `A partir de ${price}`;
        }
      });
    });

    nextBtn.addEventListener("click", function () {
      if (selectedService) {
        step1.classList.remove("form__step--active");
        step2.classList.add("form__step--active");
        
        if (selectedService === "personalizado" || selectedService === "Serviços personalizados") {
          customServiceField.style.display = "flex";
          customServiceTextarea.required = true;
          setTimeout(() => {
            customServiceTextarea.focus();
          }, 300);
        } else {
          customServiceField.style.display = "none";
          customServiceTextarea.required = false;
        }
      }
    });

    backBtn.addEventListener("click", function () {
      step2.classList.remove("form__step--active");
      step1.classList.add("form__step--active");
    });

    const formFields = form.querySelectorAll("input, textarea");
    
    formFields.forEach((field) => {
      field.addEventListener("input", function () {
        if (this.value.length > 0) {
          this.style.borderColor = "rgba(33, 150, 243, 0.5)";
          this.parentElement.querySelector("label")?.style.setProperty("color", "#2196f3");
        } else {
          this.style.borderColor = "";
          this.parentElement.querySelector("label")?.style.setProperty("color", "#b5b5b5");
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px; animation: spin 1s linear infinite;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg> Enviando...';
      submitBtn.style.opacity = "0.7";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Enviado!';
        submitBtn.style.background = "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)";
        
        setTimeout(() => {
          const phone = document.getElementById("phone")?.value || "";
          const name = document.getElementById("name")?.value || "";
          const car = document.getElementById("car")?.value || "";
          const service = document.getElementById("service")?.value || "";
          const customService = document.getElementById("custom-service")?.value || "";
          const message = document.getElementById("message")?.value || "";
          
          let serviceText = service;
          if ((service === "personalizado" || service === "Serviços personalizados") && customService) {
            serviceText = `Serviços personalizados: ${customService}`;
          }
          
          const whatsappMessage = `Olá! Meu nome é ${name}. Tenho interesse em ${serviceText || "um serviço"} para meu veículo: ${car}. ${message ? `Mensagem: ${message}` : ""}`;
          window.open(`https://wa.me/5511943219718?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
          
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
          submitBtn.style.opacity = "1";
          submitBtn.disabled = false;
          form.reset();
          
          if (step1 && step2) {
            step2.classList.remove("form__step--active");
            step1.classList.add("form__step--active");
            serviceCards.forEach((c) => c.classList.remove("selected"));
            if (nextBtn) {
              nextBtn.disabled = true;
              nextBtn.style.opacity = "0.5";
            }
            if (selectedServicePreview) {
              selectedServicePreview.style.display = "none";
            }
            if (selectedServiceCustom) {
              selectedServiceCustom.style.display = "none";
            }
          }
        }, 1500);
      }, 1000);
    });
  }

  if (!document.getElementById("ripple-styles")) {
    const rippleStyle = document.createElement("style");
    rippleStyle.id = "ripple-styles";
    rippleStyle.textContent = `.btn { position: relative; overflow: hidden; } @keyframes ripple-animation { to { transform: scale(4); opacity: 0; } }`;
    document.head.appendChild(rippleStyle);
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
        "assets/img/carros-exposicao/carro2.jpeg",
        "assets/img/carros-exposicao/carro3.jpeg"
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
        "assets/img/carros-exposicao/carro1.jpeg",
        "assets/img/carros-exposicao/carro2.jpeg"
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
      images: [
        "assets/img/carros-exposicao/carro3.jpeg",
        "assets/img/carros-exposicao/carro4.jpeg"
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
        "assets/img/carros-exposicao/carro1.jpeg",
        "assets/img/carros-exposicao/carro2.jpeg"
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
      
      <ul class="service-modal__features">
        ${service.features.map(feature => `
          <li>${feature}</li>
        `).join('')}
      </ul>
      
      <div class="service-modal__cta">
        <a href="#agendar" class="btn btn--primary" onclick="document.getElementById('service-modal').classList.remove('active'); document.body.style.overflow = '';">Agendar serviço</a>
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
  });
});
