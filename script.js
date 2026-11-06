(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const toast = document.querySelector("[data-toast]");

  // Personal details: edit this date if you want to reuse the template.
  const birthDate = new Date(2001, 11, 19);

  function calculateAge(date) {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const beforeBirthday =
      today.getMonth() < date.getMonth() ||
      (today.getMonth() === date.getMonth() && today.getDate() < date.getDate());
    if (beforeBirthday) age -= 1;
    return age;
  }

  document.querySelectorAll("[data-age]").forEach((element) => {
    element.textContent = String(calculateAge(birthDate));
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = savedTheme || (systemPrefersLight ? "light" : "dark");
  setTheme(initialTheme);

  function setTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
    document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#10110f" : "#efeee8");
  }

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });

  function setMenu(open) {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    mobileMenu.setAttribute("aria-hidden", String(!open));
    mobileMenu.classList.toggle("is-open", open);
    body.classList.toggle("menu-open", open);
  }

  menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  let lastScrollY = 0;
  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      header.classList.toggle("is-scrolled", currentScrollY > 10);
      header.classList.toggle("is-hidden", currentScrollY > 200 && currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    },
    { passive: true }
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5%" }
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const visible = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-filtered-out", !visible);
      });
    });
  });

  const testimonials = Array.from(document.querySelectorAll(".testimonial"));
  const currentTestimonial = document.querySelector("[data-testimonial-current]");
  let testimonialIndex = 0;

  function showTestimonial(index) {
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    testimonials.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === testimonialIndex);
    });
    currentTestimonial.textContent = String(testimonialIndex + 1).padStart(2, "0");
  }

  document.querySelector("[data-testimonial-prev]").addEventListener("click", () => {
    showTestimonial(testimonialIndex - 1);
  });

  document.querySelector("[data-testimonial-next]").addEventListener("click", () => {
    showTestimonial(testimonialIndex + 1);
  });

  let toastTimer;
  document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      toast.classList.add("is-visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
    });
  });

  const cursorGlow = document.querySelector(".cursor-glow");
  window.addEventListener(
    "pointermove",
    (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );
})();
