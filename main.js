document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal animation
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
      navMobile.style.pointerEvents = isActive ? "auto" : "none";
    });

    navMobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMobile.classList.remove("active");
        navMobile.style.pointerEvents = "none";
      });
    });

    document.addEventListener("click", (e) => {
      if (
        !menuToggle.contains(e.target) &&
        !navMobile.contains(e.target) &&
        navMobile.classList.contains("active")
      ) {
        menuToggle.classList.remove("active");
        navMobile.classList.remove("active");
        navMobile.style.pointerEvents = "none";
      }
    });
  }

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Animação de contador para números
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        const value = Math.floor(start);
        if (target.toString().includes("+")) {
          element.textContent = `+${value}`;
        } else if (target.toString().includes("%")) {
          element.textContent = `${value}%`;
        } else {
          element.textContent = value.toFixed(1);
        }
      }
    }, 16);
  };

  const statNumbers = document.querySelectorAll(".about__stat-number");
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
        entry.target.classList.add("animated");
        const text = entry.target.textContent.trim();
        let target = parseFloat(text.replace(/[^0-9.]/g, ""));
        if (text.includes("+")) {
          animateCounter(entry.target, target, 2000);
          entry.target.textContent = `+${target}`;
        } else if (text.includes("%")) {
          animateCounter(entry.target, target, 2000);
          entry.target.textContent = `${target}%`;
        } else {
          animateCounter(entry.target, target, 2000);
        }
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Parallax effect para hero image
  const heroImage = document.querySelector(".hero__image");
  if (heroImage) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      heroImage.style.transform = `translateY(${rate}px)`;
    });
  }

  // Efeito de typing para hero title (opcional)
  const heroTitle = document.querySelector(".hero__title");
  if (heroTitle && !heroTitle.dataset.typed) {
    heroTitle.dataset.typed = "true";
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = "";
    heroTitle.style.opacity = "1";
    
    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        heroTitle.innerHTML += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    };
    
    setTimeout(() => {
      typeWriter();
    }, 500);
  }

  // Animação de hover para cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Animação de review cards
  const reviewCards = document.querySelectorAll(".review__card");
  reviewCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;

    const reviewObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.2 });

    reviewObserver.observe(card);
  });

  // Efeito de glow pulsante para botões
  const buttons = document.querySelectorAll(".btn--primary, .btn--whatsapp-header");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 0 20px rgba(33, 150, 243, 0.6), 0 0 40px rgba(33, 150, 243, 0.4)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.boxShadow = "";
    });
  });

  // Animação de scroll para header
  let lastScroll = 0;
  const header = document.querySelector(".topbar");
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.style.boxShadow = "0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 4px 24px rgba(0, 0, 0, 0.4)";
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = "translateY(-100%)";
      header.style.transition = "transform 0.3s ease-in-out";
    } else {
      header.style.transform = "translateY(0)";
    }

    if (currentScroll > 50) {
      header.style.boxShadow = "0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 8px 32px rgba(0, 0, 0, 0.6)";
    } else {
      header.style.boxShadow = "0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 4px 24px rgba(0, 0, 0, 0.4)";
    }

    lastScroll = currentScroll;
  });

  // Efeito de partículas no hero (criando elementos dinâmicos)
  const createParticle = () => {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = Math.random() * 4 + 2 + "px";
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(33, 150, 243, ${Math.random() * 0.5 + 0.2})`;
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1";
    particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
    
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    }
  };

  // Adicionar keyframes para animação de partículas
  if (!document.getElementById("particle-styles")) {
    const style = document.createElement("style");
    style.id = "particle-styles";
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        50% {
          transform: translateY(-20px) translateX(10px);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Criar partículas periodicamente
  setInterval(() => {
    if (window.pageYOffset < window.innerHeight) {
      createParticle();
    }
  }, 300);

  // Animação de formulário
  const formFields = document.querySelectorAll(".form__field input, .form__field textarea, .form__field select");
  formFields.forEach((field) => {
    field.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)";
      this.parentElement.style.transition = "transform 0.2s ease";
    });

    field.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)";
    });

    // Efeito de label flutuante
    field.addEventListener("input", function () {
      if (this.value.length > 0) {
        this.style.borderColor = "rgba(33, 150, 243, 0.5)";
      } else {
        this.style.borderColor = "";
      }
    });
  });

  // Animação de submit do formulário
  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = "Enviando...";
      submitBtn.style.opacity = "0.7";
      submitBtn.disabled = true;

      // Simular envio (substituir pela lógica real)
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
          const whatsappUrl = `https://wa.me/5511943219718?text=${encodeURIComponent(whatsappMessage)}`;
          
          window.open(whatsappUrl, "_blank");
          
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
          submitBtn.style.opacity = "1";
          submitBtn.disabled = false;
          form.reset();
        }, 1500);
      }, 1000);
    });
  }

  // Efeito de cursor personalizado (opcional)
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid rgba(33, 150, 243, 0.8);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
  `;
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px";
    cursor.style.top = e.clientY - 10 + "px";
  });

  // Mostrar cursor customizado em elementos interativos
  const interactiveElements = document.querySelectorAll("a, button, .card, .review__card");
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.display = "block";
      cursor.style.transform = "scale(1.5)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.display = "none";
      cursor.style.transform = "scale(1)";
    });
  });

  // Animação de loading inicial
  window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";
    
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  });

  // Efeito de ripple nos botões
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  const buttonsWithRipple = document.querySelectorAll(".btn");
  buttonsWithRipple.forEach((button) => {
    button.addEventListener("click", createRipple);
  });

  // Adicionar estilos para ripple
  if (!document.getElementById("ripple-styles")) {
    const rippleStyle = document.createElement("style");
    rippleStyle.id = "ripple-styles";
    rippleStyle.textContent = `
      .btn {
        position: relative;
        overflow: hidden;
      }
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyle);
  }
});
