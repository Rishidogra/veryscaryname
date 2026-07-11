(function () {
  window.Components = window.Components || {};

  window.Components.diary = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-diary";
      div.innerHTML = `
        <div class="diary-container">
          <div class="diary-book">
            <div class="diary-cover">
              <h2 class="diary-cover-title">${section.coverTitle || "Our Story"}</h2>
              <p class="diary-cover-subtitle">${section.coverSubtitle || "8 chapters, one heart"}</p>
            </div>
            <div class="diary-pages">
              ${section.pages.map((page, i) => `
                <div class="diary-page${i === 0 ? ' active' : ''}" data-page="${i}">
                  <div class="page-content">
                    <img class="diary-photo" src="${page.photo}" alt="Memory ${i + 1}" />
                    <div class="page-text">
                      <p class="diary-memory-title">${page.date || `Memory ${i + 1}`}</p>
                      <p class="diary-memory-text">${page.memory || ""}</p>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
        <div class="diary-nav">
          <button class="diary-btn prev-btn" disabled>← Previous</button>
          <span class="diary-page-indicator"><span class="current-page">1</span> / ${section.pages.length}</span>
          <button class="diary-btn next-btn">Next →</button>
        </div>
        <p class="diary-complete">${section.completeText || "Tap the heart to continue..."}</p>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const book = el.querySelector(".diary-book");
      const cover = el.querySelector(".diary-cover");
      const pages = el.querySelectorAll(".diary-page");
      const nav = el.querySelector(".diary-nav");
      const complete = el.querySelector(".diary-complete");
      const nextBtn = el.querySelector(".next-btn");
      const prevBtn = el.querySelector(".prev-btn");
      const currentPageEl = el.querySelector(".current-page");

      let currentPage = 0;
      const totalPages = pages.length;

      gsap.set(book, { scale: 0.8, opacity: 0 });
      gsap.set(pages, { opacity: 0, transform: "rotateY(180deg)", transformOrigin: "left center" });
      gsap.set(nav, { opacity: 0, y: 20 });
      gsap.set(complete, { opacity: 0 });

      tl.to(book, { duration: 1, scale: 1, opacity: 1, ease: "back.out(1.4)" })
        .to(cover, { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, "-=0.3")
        .to(cover, { duration: 0.8, rotationY: -180, transformOrigin: "left center", ease: "power2.inOut" })
        .to(pages[0], { duration: 0.8, opacity: 1, transform: "rotateY(0deg)", ease: "power2.out" }, "-=0.4")
        // Pause on first page for reading
        .to(nav, { duration: 0.5, opacity: 1, y: 0 }, "-=0.2")
        .set(nextBtn, { className: "+=visible" })
        .set(prevBtn, { className: "+=visible" });

      const goToPage = (pageIndex) => {
        if (pageIndex < 0 || pageIndex >= totalPages) return;
        
        const current = pages[currentPage];
        const next = pages[pageIndex];
        
        const isForward = pageIndex > currentPage;
        
        tl.to(current, { 
          duration: 0.6, 
          opacity: 0, 
          transform: `rotateY(${isForward ? -180 : 180}deg)`, 
          ease: "power2.in" 
        })
        .set(next, { 
          transform: `rotateY(${isForward ? 180 : -180}deg)`,
          opacity: 0
        }, "<")
        .to(next, { 
          duration: 0.6, 
          opacity: 1, 
          transform: "rotateY(0deg)", 
          ease: "power2.out" 
        }, "<")
        // Add delay so user can read the memory
        .set(currentPageEl, { innerText: pageIndex + 1 }, "<")
        .set(prevBtn, { disabled: pageIndex === 0 })
        .set(nextBtn, { disabled: pageIndex === totalPages - 1 });

        // Update page classes
        pages.forEach((p, i) => {
          p.classList.remove('active', 'prev');
          if (i === pageIndex) p.classList.add('active');
          else if (i < pageIndex) p.classList.add('prev');
        });

        currentPage = pageIndex;
      };

      nextBtn.addEventListener("click", () => goToPage(currentPage + 1));
      prevBtn.addEventListener("click", () => goToPage(currentPage - 1));

      const waitForLastPage = new Promise((resolve) => {
        const checkLastPage = () => {
          if (currentPage === totalPages - 1) {
            nextBtn.removeEventListener("click", checkLastPage);
            resolve();
          }
        };
        nextBtn.addEventListener("click", checkLastPage);
      });

      tl.add(() => waitForLastPage);

      tl.to(complete, { duration: 0.8, opacity: 1, y: -10, ease: "power2.out" })
        .to(nav, { duration: 0.5, opacity: 0, y: 20 }, "-=0.3");
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.6, opacity: 0, scale: 0.95 });
    }
  };
})();