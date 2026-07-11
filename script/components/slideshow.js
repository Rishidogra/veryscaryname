(function () {
  window.Components = window.Components || {};

  window.Components.slideshow = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-slideshow";
      div.innerHTML = `
        <div class="slideshow-container">
          <div class="slideshow-wrapper">
            ${section.slides.map((slide, i) => `
              <div class="slide${i === 0 ? ' active' : ''}" data-index="${i}">
                <div class="slide-content">
                  <img class="slide-photo" src="${slide.photo}" alt="Memory ${i + 1}" />
                  <p class="slide-memory">${slide.memory || `Memory ${i + 1}`}</p>
                </div>
              </div>
            `).join("")}
          </div>
          <div class="slideshow-nav">
            <span class="slide-indicator">
              <span class="current-slide">1</span> / ${section.slides.length}
            </span>
            <button class="slide-next-btn" aria-label="Next memory">Next →</button>
          </div>
          <p class="slideshow-hint">Click anywhere or press Next to continue</p>
        </div>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const wrapper = el.querySelector(".slideshow-wrapper");
      const slides = el.querySelectorAll(".slide");
      const nav = el.querySelector(".slideshow-nav");
      const hint = el.querySelector(".slideshow-hint");
      const nextBtn = el.querySelector(".slide-next-btn");
      const currentSlideEl = el.querySelector(".current-slide");

      let currentSlide = 0;
      const totalSlides = slides.length;

      gsap.set(wrapper, { opacity: 0 });
      gsap.set(slides, { opacity: 0, scale: 0.95, y: 30 });
      gsap.set(nav, { opacity: 0, y: 20 });
      gsap.set(hint, { opacity: 0 });

      // Initial animation
      tl.to(wrapper, { duration: 0.8, opacity: 1, ease: "power2.out" })
        .to(slides[0], { duration: 1, opacity: 1, scale: 1, y: 0, ease: "back.out(1.4)" }, "-=0.3")
        .to(nav, { duration: 0.5, opacity: 1, y: 0 }, "-=0.2")
        .to(hint, { duration: 0.5, opacity: 0.5, ease: "power2.out" }, "-=0.2");

      const goToSlide = (slideIndex) => {
        if (slideIndex < 0 || slideIndex >= totalSlides) return;
        if (slideIndex === currentSlide) return;

        const current = slides[currentSlide];
        const next = slides[slideIndex];
        const isForward = slideIndex > currentSlide;

        // Animate out current
        tl.to(current, {
          duration: 0.5,
          opacity: 0,
          scale: 0.95,
          y: isForward ? -30 : 30,
          ease: "power2.in"
        })
        // Prepare and animate in next
        .set(next, {
          opacity: 0,
          scale: 0.95,
          y: isForward ? 30 : -30
        }, "<")
        .to(next, {
          duration: 0.6,
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "back.out(1.3)"
        }, "<0.2")
        // Update UI
        .set(currentSlideEl, { innerText: slideIndex + 1 }, "<")
        .set(nextBtn, { disabled: slideIndex === totalSlides - 1 });

        currentSlide = slideIndex;
      };

      // Click anywhere on wrapper or next button
      const handleAdvance = () => {
        if (currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
        }
      };

      wrapper.style.cursor = "pointer";
      wrapper.addEventListener("click", handleAdvance);
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleAdvance();
      });

      // Wait for last slide
      const waitForLastSlide = new Promise((resolve) => {
        const checkLast = () => {
          if (currentSlide === totalSlides - 1) {
            wrapper.removeEventListener("click", handleAdvance);
            nextBtn.removeEventListener("click", handleAdvance);
            resolve();
          }
        };
        wrapper.addEventListener("click", checkLast);
        nextBtn.addEventListener("click", checkLast);
      });

      tl.add(() => waitForLastSlide);

      // Fade out slideshow
      tl.to(hint, { duration: 0.3, opacity: 0 }, "-=0.2")
        .to(nav, { duration: 0.3, opacity: 0, y: 20 }, "-=0.2")
        .to(slides[currentSlide], { duration: 0.5, opacity: 0, scale: 0.95, y: 30, ease: "power2.in" })
        .to(wrapper, { duration: 0.5, opacity: 0 }, "-=0.2");
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.5, opacity: 0 });
    }
  };
})();