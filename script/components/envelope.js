(function () {
  window.Components = window.Components || {};

  window.Components.envelope = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-envelope";
      div.innerHTML = `
        <div class="envelope-wrapper">
          <div class="envelope-container">
            <div class="envelope-back"></div>
            <div class="envelope-front">
              <div class="envelope-seal">❤️</div>
            </div>
            <div class="envelope-flap"></div>
            <div class="envelope-letter">
              <div class="letter-content">
                <p>${section.previewText || "Before this day ends... there's something I wanted to share with you.."}</p>
              </div>
            </div>
          </div>
          <p class="envelope-prompt">${section.promptText || "When you're ready... Open it."}</p>
          
        </div>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const envelopeContainer = el.querySelector(".envelope-container");
      const flap = el.querySelector(".envelope-flap");
      const seal = el.querySelector(".envelope-seal");
      const prompt = el.querySelector(".envelope-prompt");
      const letter = el.querySelector(".envelope-letter");
      const continuePrompt = el.querySelector(".envelope-continue");

      gsap.set(envelopeContainer, { scale: 0.8, opacity: 0 });
      gsap.set(prompt, { opacity: 0 });
      gsap.set(letter, { transform: "translateY(100%)" });
      gsap.set(continuePrompt, { opacity: 0 });

      tl.to(envelopeContainer, { duration: 1, scale: 1, opacity: 1, ease: "back.out(1.4)" })
        .to(prompt, { duration: 0.6, opacity: 1, y: -10 }, "-=0.3")
        .to(seal, { duration: 1, scale: 1.1, repeat: -1, yoyo: true, ease: "power1.inOut" }, "-=0.5");

      // Wait for click to open
      const openPromise = new Promise((resolve) => {
        const handleClick = () => {
          envelopeContainer.removeEventListener("click", handleClick);
          resolve();
        };
        envelopeContainer.addEventListener("click", handleClick);
        envelopeContainer.style.cursor = "pointer";
      });

      tl.add(() => openPromise);

      tl.to(seal, { duration: 0.3, scale: 1, clearProps: "all" })
        .to(flap, { duration: 0.8, rotationX: -180, transformOrigin: "top center", ease: "power2.inOut" })
        .to(letter, { duration: 0.8, y: 0, ease: "power2.out" }, "-=0.4")
        .to(prompt, { duration: 0.3, opacity: 0 }, "-=0.6")
        // Show continue prompt after letter is open
        .to(continuePrompt, { duration: 0.5, opacity: 1, y: -10, ease: "power2.out" }, "+=0.5")
        // Wait for click to continue
        .add(() => new Promise((resolve) => {
          const handleClick = () => {
            envelopeContainer.removeEventListener("click", handleClick);
            resolve();
          };
          envelopeContainer.addEventListener("click", handleClick);
        }))
        .to(continuePrompt, { duration: 0.3, opacity: 0 })
        .to(envelopeContainer, { duration: 0.6, opacity: 0, scale: 0.9 });
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.5, opacity: 0 });
    }
  };
})();