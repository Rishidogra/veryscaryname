(function () {
  window.Components = window.Components || {};

  window.Components.moon = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-moon";
      div.innerHTML = `
        <div class="moon-scene">
          <div class="moon-wrapper">
            <div class="moon">
              <div class="moon-surface"></div>
              <div class="moon-glow"></div>
            </div>
            <div class="stars-bg"></div>
          </div>
          <div class="moon-text">
            <p class="moon-line">${section.line1 || "I don't know where life will take us."}</p>
            <p class="moon-line">${section.line2 || "But..."}</p>
            <p class="moon-line">${section.line3 || "If I had to choose again..."}</p>
            <p class="moon-line">${section.line4 || "I'd still choose you."}</p>
            <p class="moon-line repeat">${section.line5 || "Again."}</p>
            <p class="moon-line repeat">${section.line6 || "Again."}</p>
            <p class="moon-line repeat">${section.line7 || "And again."}</p>
          </div>
          <div class="final-message">
            <p class="final-line1">I love you</p>
            <p class="final-line2">to the moon</p>
            <p class="final-line3">and back.</p>
            <p class="final-birthday">Happy Birthday ❤️</p>
          </div>
        </div>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const scene = el.querySelector(".moon-scene");
      const moon = el.querySelector(".moon");
      const moonSurface = el.querySelector(".moon-surface");
      const moonGlow = el.querySelector(".moon-glow");
      const starsBg = el.querySelector(".stars-bg");
      const textLines = el.querySelectorAll(".moon-line");
      const finalMessage = el.querySelector(".final-message");
      const finalLines = el.querySelectorAll(".final-line1, .final-line2, .final-line3, .final-birthday");

      // Create stars
      for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.className = "bg-star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3 + "s";
        star.style.width = star.style.height = (Math.random() * 2 + 1) + "px";
        starsBg.appendChild(star);
      }

      gsap.set(scene, { opacity: 0 });
      gsap.set(moon, { scale: 0.5, rotation: -30 });
      gsap.set(moonSurface, { borderRadius: "50%" });
      gsap.set(textLines, { opacity: 0, y: 30 });
      gsap.set(finalMessage, { opacity: 0 });
      gsap.set(finalLines, { opacity: 0, y: 20 });

      // Fade in scene
      tl.to(scene, { duration: 1, opacity: 1, ease: "power2.out" })
        // Moon enters
        .to(moon, { duration: 1.5, scale: 1, rotation: 0, ease: "elastic.out(1, 0.5)" }, "-=0.5")
        .to(moonGlow, { duration: 2, opacity: 1, ease: "power2.out" }, "-=1")

        // Text lines appear one by one
        .to(textLines[0], { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, "+=0.5")
        .to(textLines[1], { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, "+=0.8")
        .to(textLines[2], { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, "+=0.8")
        .to(textLines[3], { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, "+=0.8")
        .to(textLines[4], { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" }, "+=0.6")
        .to(textLines[5], { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" }, "+=0.6")
        .to(textLines[6], { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" }, "+=0.6")

        // Fade out text lines
        .to(textLines, { duration: 0.5, opacity: 0, y: -20, stagger: 0.05 }, "+=1")

        // Moon transforms to heart
        .to(moonSurface, { 
          duration: 1.5, 
          borderRadius: "0 50% 50% 50%", 
          transformOrigin: "center center",
          ease: "power2.inOut" 
        }, "-=0.3")
        .to(moon, { 
          duration: 1.5, 
          rotation: -45, 
          scale: 1.2,
          ease: "power2.inOut" 
        }, "<")
        .to(moonGlow, { duration: 1, scale: 1.5, opacity: 0.8 }, "<")

        // Final message appears
        .to(finalMessage, { duration: 0.5, opacity: 1 }, "-=0.5")
        .to(finalLines[0], { duration: 0.8, opacity: 1, y: 0, ease: "back.out(1.7)" }, "+=0.3")
        .to(finalLines[1], { duration: 0.8, opacity: 1, y: 0, ease: "back.out(1.7)" }, "+=0.3")
        .to(finalLines[2], { duration: 0.8, opacity: 1, y: 0, ease: "back.out(1.7)" }, "+=0.3")
        .to(finalLines[3], { duration: 1, opacity: 1, y: 0, ease: "power2.out" }, "+=0.5");
    },

    exit(tl, el) {
      tl.to(el, { duration: 1, opacity: 0 });
    }
  };
})();