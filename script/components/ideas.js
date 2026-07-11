(function () {
  window.Components = window.Components || {};



  window.Components.ideas = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-ideas";

      const lines = section.lines || [];
      lines.forEach((line) => {
        const p = document.createElement("p");
        p.className = "idea-line";
        p.innerHTML = line;
        div.appendChild(p);
      });

      // Big letters (e.g. "SO")
      if (section.bigLetters) {
        const p = document.createElement("p");
        p.className = "idea-big-letters";
        p.innerHTML = section.bigLetters;
        div.appendChild(p);
      }

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const allLines = el.querySelectorAll(".idea-line");
      const bigLetters = el.querySelector(".idea-big-letters");

      allLines.forEach((line) => {
        tl.fromTo(line, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "+=0.5")
          .to(line, { opacity: 0, y: -20, duration: 0.6, ease: "power2.in" }, "+=2");
      });

      if (bigLetters) {
        tl.fromTo(bigLetters, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "+=0.5")
          .to(bigLetters, { opacity: 0, scale: 0.8, duration: 0.8, ease: "power2.in" }, "+=2");
      }
    },
  };
})();
