document.addEventListener("DOMContentLoaded", () => {
  // Carrossel de imagens do hero
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

  // Scroll reveal com throttling
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

  // Menu mobile
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

  // Smooth scroll
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

  // Animação de contador
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

  // Review cards animation
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

  // Header scroll com throttling
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

  // Formulário
  const form = document.querySelector(".form");
  if (form) {
    const formFields = form.querySelectorAll("input, textarea, select");
    
    formFields.forEach((field) => {
      field.addEventListener("focus", function () {
        this.parentElement.style.transform = "scale(1.02)";
        this.parentElement.style.transition = "transform 0.2s ease";
      });
      
      field.addEventListener("blur", function () {
        this.parentElement.style.transform = "scale(1)";
      });
      
      field.addEventListener("input", function () {
        this.style.borderColor = this.value.length > 0 ? "rgba(33, 150, 243, 0.5)" : "";
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = "Enviando...";
      submitBtn.style.opacity = "0.7";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = "✓ Enviado!";
        submitBtn.style.background = "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)";
        
        setTimeout(() => {
          const phone = document.getElementById("phone")?.value || "";
          const name = document.getElementById("name")?.value || "";
          const car = document.getElementById("car")?.value || "";
          const service = document.getElementById("service")?.value || "";
          const message = document.getElementById("message")?.value || "";
          
          const whatsappMessage = `Olá! Meu nome é ${name}. Tenho interesse em ${service || "um serviço"} para meu veículo: ${car}. ${message ? `Mensagem: ${message}` : ""}`;
          window.open(`https://wa.me/5511943219718?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
          
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
          submitBtn.style.opacity = "1";
          submitBtn.disabled = false;
          form.reset();
        }, 1500);
      }, 1000);
    });
  }

  // Ripple effect
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

  // Modal de Serviços
  const serviceModal = document.getElementById("service-modal");
  const serviceModalContent = document.getElementById("service-modal-content");
  const serviceModalClose = document.querySelector(".service-modal__close");
  const serviceButtons = document.querySelectorAll(".service-card__button[data-service]");

  const serviceData = {
    higienizacao: {
      title: "Higienização interna",
      price: "A partir de R$ 250",
      description: "Nossa higienização interna é um processo completo e profissional que remove profundamente toda sujeira, odores e bactérias do interior do seu veículo. Utilizamos equipamentos de alta pressão e produtos específicos para cada tipo de material, garantindo um interior impecável e higienizado.",
      features: [
        "Limpeza profunda de bancos (couro, tecido ou alcântara)",
        "Higienização completa do teto e painel",
        "Limpeza e desinfecção de carpete",
        "Remoção de odores e manchas",
        "Proteção e hidratação de materiais",
        "Produtos profissionais e seguros"
      ],
      images: [
        "assets/img/carros-exposicao/carro1.jpeg",
        "assets/img/carros-exposicao/carro2.jpeg"
      ]
    },
    polimento: {
      title: "Polimento técnico",
      price: "A partir de R$ 400",
      description: "O polimento técnico é realizado por profissionais especializados que utilizam técnicas avançadas para corrigir micro riscos, marcas de envelhecimento e oxidação da pintura. Devolvemos o brilho original do seu veículo com acabamento de zero km, utilizando produtos premium importados.",
      features: [
        "Correção de micro riscos e marcas",
        "Remoção de oxidação e manchas",
        "Polimento em 3 etapas (composto, polimento e acabamento)",
        "Produtos premium importados",
        "Acabamento espelhado",
        "Proteção da pintura original"
      ],
      images: [
        "assets/img/carros-exposicao/carro3.jpeg",
        "assets/img/carros-exposicao/carro4.jpeg"
      ]
    },
    vitrificacao: {
      title: "Vitrificação de pintura",
      price: "A partir de R$ 600",
      description: "A vitrificação é a proteção mais avançada disponível para a pintura do seu veículo. Forma uma camada transparente e resistente que protege contra raios UV, chuva ácida, poluição e outros agentes externos, mantendo o brilho por até 12 meses. O efeito hidrofóbico faz com que a água escorra facilmente, facilitando a limpeza.",
      features: [
        "Proteção contra raios UV",
        "Resistência à chuva ácida e poluição",
        "Efeito hidrofóbico (água escorre)",
        "Durabilidade de até 12 meses",
        "Brilho intenso e duradouro",
        "Facilita a limpeza do veículo"
      ],
      images: [
        "assets/img/carros-exposicao/carro5.jpeg",
        "assets/img/carros-exposicao/carro1.jpeg"
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
          ${service.images.map(img => `
            <img src="${img}" alt="${service.title}" />
          `).join('')}
        </div>
      ` : ''}
      
      <ul class="service-modal__features">
        ${service.features.map(feature => `
          <li>${feature}</li>
        `).join('')}
      </ul>
      
      <div class="service-modal__cta">
        <a href="#agendar" class="btn btn--primary" onclick="document.getElementById('service-modal').classList.remove('active'); document.body.style.overflow = '';">Agendar serviço</a>
        <a href="https://wa.me/5511943219718?text=Tenho+interesse+em+${encodeURIComponent(service.title)}" target="_blank" rel="noopener noreferrer" class="btn btn--whatsapp-primary" onclick="document.getElementById('service-modal').classList.remove('active'); document.body.style.overflow = '';">Falar no WhatsApp</a>
      </div>
    `;

    serviceModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeServiceModal = () => {
    serviceModal.classList.remove("active");
    document.body.style.overflow = "";
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
