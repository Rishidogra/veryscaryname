(function () {
  window.Components = window.Components || {};

  window.Components.memoryPage = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-memory-page";
      div.innerHTML = `
        <div class="memory-page-container">
          ${section.memories.map((memory, i) => `
            <div class="memory-card" data-index="${i}">
              <img class="memory-photo" src="${memory.photo}" alt="Memory ${i + 1}" />
              <p class="memory-text">${memory.text || `Memory ${i + 1}`}</p>
            </div>
          `).join("")}
        </div>
        <p class="memory-complete">Click to continue...</p>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el, config) {
      const container = el.querySelector(".memory-page-container");
      const cards = el.querySelectorAll(".memory-card");
      const complete = el.querySelector(".memory-complete");

      gsap.set(container, { opacity: 0 });
      gsap.set(cards, { opacity: 0, y: 50 });
      gsap.set(complete, { opacity: 0 });

      // Initial animation - cards stagger in
      tl.to(container, { duration: 0.8, opacity: 1, ease: "power2.out" })
        .to(cards, {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.2
        }, "-=0.4")
        // Pause for reading
        .to({}, { duration: 3 }, "+=0.5");

      // Wait for click anywhere
      const clickPromise = new Promise((resolve) => {
        const handleClick = () => {
          container.removeEventListener("click", handleClick);
          resolve();
        };
        container.addEventListener("click", handleClick);
        container.style.cursor = "pointer";
      });

      tl.add(() => clickPromise);

      // Fade out and continue
      tl.to(complete, { duration: 0.8, opacity: 1, y: -10, ease: "power2.out" })
        .to(container, { duration: 1, opacity: 0, ease: "power2.in" }, "+=1");
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.5, opacity: 0 });
    }
  };
})();