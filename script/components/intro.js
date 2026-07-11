(function () {
  window.Components = window.Components || {};

  window.Components.intro = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-intro";
      div.innerHTML = `
        <div class="intro-terminal" style="display: none;">
          <div class="terminal-header">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
            <span class="terminal-title">bash - node project.js</span>
          </div>
          <div class="terminal-body">
            <div class="terminal-lines">
              <div class="terminal-line init-line" style="opacity: 0;">
                <span class="label">Initializing Project...</span>
              </div>
              
              <div class="loading-bar-container" style="opacity: 0;">
                <div class="loading-bar"></div>
              </div>

              <div class="terminal-line step-line success" style="opacity: 0;">
                <span class="label">Loading Assets...</span>
                <span class="status">✓</span>
              </div>
              <div class="terminal-line step-line success" style="opacity: 0;">
                <span class="label">Checking Browser...</span>
                <span class="status">✓</span>
              </div>
              <div class="terminal-line step-line success" style="opacity: 0;">
                <span class="label">Checking Compatibility...</span>
                <span class="status">✓</span>
              </div>
              <div class="terminal-line step-line success" style="opacity: 0;">
                <span class="label">Loading Dependencies...</span>
                <span class="status">✓</span>
              </div>
              <div class="terminal-line step-line success" style="opacity: 0;">
                <span class="label">Verifying Build...</span>
                <span class="status">✓</span>
              </div>

              <div class="terminal-line locating-line" style="opacity: 0;">
                <span class="label">Locating Reviewer...</span>
              </div>

              <div class="terminal-line found-line success" style="opacity: 0;">
                <span class="label">Reviewer Found:</span>
                <span class="status">Parika</span>
              </div>

              <div class="terminal-line opening-line" style="opacity: 0;">
                <span class="label">Opening Project...</span>
              </div>

              <div class="terminal-line error-line error" style="opacity: 0;">
                <span class="label">ERROR 404</span>
                <span class="status">FAIL</span>
              </div>

              <div class="terminal-line notfound-line error" style="opacity: 0;">
                <span class="label">College Project Not Found.</span>
              </div>

              <div class="terminal-line searching-line" style="opacity: 0;">
                <span class="label">Searching...</span>
              </div>

              <div class="terminal-line recovery-line success" style="opacity: 0;">
                <span class="label">Recovery Successful.</span>
                <span class="status">✓</span>
              </div>

              <div class="terminal-line altfound-line success" style="opacity: 0;">
                <span class="label">Alternative Project Located.</span>
                <span class="status">✓</span>
              </div>
            </div>
          </div>
        </div>
        <div class="final-reveal"></div>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el, config) {
      const terminal = el.querySelector(".intro-terminal");
      const finalReveal = el.querySelector(".final-reveal");
      
      const initLine = el.querySelector(".init-line");
      const loadingBarContainer = el.querySelector(".loading-bar-container");
      const loadingBar = el.querySelector(".loading-bar");
      const stepLines = el.querySelectorAll(".step-line");
      const locatingLine = el.querySelector(".locating-line");
      const foundLine = el.querySelector(".found-line");
      const openingLine = el.querySelector(".opening-line");
      const errorLine = el.querySelector(".error-line");
      const notfoundLine = el.querySelector(".notfound-line");
      const searchingLine = el.querySelector(".searching-line");
      const recoveryLine = el.querySelector(".recovery-line");
      const altfoundLine = el.querySelector(".altfound-line");

      tl.pause();

      const clickPrompt = document.createElement("div");
      clickPrompt.className = "click-prompt";
      clickPrompt.innerHTML = '<span>$</span> node project.js<br><br><span class="pulse-text">Click anywhere to run the project...</span>';
      el.appendChild(clickPrompt);

      const startIntro = () => {
        el.removeChild(clickPrompt);
        document.removeEventListener("click", startIntro);
        document.removeEventListener("touchstart", startIntro);
        
        terminal.style.display = "block";
        gsap.fromTo(terminal, { opacity: 0, scale: 0.9 }, { duration: 0.5, opacity: 1, scale: 1, ease: "power2.out" });
        tl.play();
      };

      document.addEventListener("click", startIntro);
      document.addEventListener("touchstart", startIntro);

      // 1. Initializing...
      tl.to(initLine, { duration: 0.4, opacity: 1, y: 0 });

      // 2. Loading Bar
      tl.to(loadingBarContainer, { duration: 0.3, opacity: 1 })
        .to(loadingBar, { duration: 1.5, width: "100%", ease: "power1.inOut" })
        .to(loadingBarContainer, { duration: 0.3, opacity: 0.5 });

      // 3. Sequential checklists
      stepLines.forEach((stepLine) => {
        tl.to(stepLine, { duration: 0.3, opacity: 1, y: 0 }, "+=0.2");
      });

      // 4. Locating...
      tl.to(locatingLine, { duration: 0.4, opacity: 1, y: 0 }, "+=0.4");

      // 5. Reviewer Found: Parika
      tl.to(foundLine, { duration: 0.4, opacity: 1, y: 0 }, "+=0.6");

      // 6. Opening Project...
      tl.to(openingLine, { duration: 0.4, opacity: 1, y: 0 }, "+=0.6");

      // 7. ERROR 404
      tl.to(errorLine, { duration: 0.4, opacity: 1, y: 0 }, "+=1.0");

      // 8. College Project Not Found
      tl.to(notfoundLine, { duration: 0.4, opacity: 1, y: 0 }, "+=0.5");

      // 9. Searching...
      tl.to(searchingLine, { duration: 0.4, opacity: 1, y: 0 }, "+=2.0");

      // 10. Recovery Successful
      tl.to(recoveryLine, { duration: 0.4, opacity: 1, y: 0 }, "+=1.0");

      // 11. Alternative Project Located
      tl.to(altfoundLine, { duration: 0.5, opacity: 1, y: 0 }, "+=1.0");

      // Fade everything to black
      tl.to(el, { duration: 1.0, backgroundColor: "#000000" }, "+=1.5");
      tl.to(terminal, { duration: 0.5, opacity: 0 }, "-=0.5");

      // 12. Dramatic Reveal
      tl.call(() => {
        terminal.style.display = "none";
        finalReveal.innerHTML = "❤️ ONE BIRTHDAY GIRL ❤️";
      });

      tl.fromTo(finalReveal, 
        { opacity: 0, scale: 0.8 }, 
        { 
          duration: 1.5, 
          opacity: 1, 
          scale: 1, 
          ease: "power3.out",
          onStart: () => {
            const audio = document.querySelector(".song");
            if (audio) {
              audio.querySelector("source").src = config.music;
              audio.load();
              const playPromise = audio.play();
              if (playPromise !== undefined) {
                playPromise.catch(error => {
                  console.log("Playback prevented, trying simple fallback play on document click", error);
                });
              }
            }
          }
        }
      );

      tl.to(document.body, { duration: 3.0, background: "#0f172a", ease: "power1.inOut" }, "-=0.5");
      tl.to(finalReveal, { duration: 1.0, opacity: 0, y: -30, ease: "power2.in" }, "+=3.0");
      tl.to(el, { duration: 0.5, opacity: 0, display: "none" });
    }
  };
})();