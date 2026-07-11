(function () {
  window.Components = window.Components || {};

  window.Components.ps = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-ps";
      div.innerHTML = `
        <div class="ps-content">
          <p class="ps-text">${section.text || "P.S.\nYou actually did help me\ntest my college project.\nLooks like...\nit works perfectly. ❤️"}</p>
          <p class="ps-replay" id="replay">${section.replayText || "Watch Again ❤️"}</p>
        </div>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const text = el.querySelector(".ps-text");
      const replay = el.querySelector(".ps-replay");

      gsap.set(text, { opacity: 0, y: 20 });
      gsap.set(replay, { opacity: 0, pointerEvents: "none" });

      tl.to(text, { duration: 1.2, opacity: 1, y: 0, ease: "power2.out" })
        .to(replay, { duration: 0.8, opacity: 1, y: -10, ease: "back.out(1.7)", pointerEvents: "auto" }, "+=1");
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.5, opacity: 0 });
    }
  };
})();