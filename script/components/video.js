(function () {
  window.Components = window.Components || {};

  window.Components.video = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-video";
      div.innerHTML = `
        <div class="video-wrapper">
          <p class="video-intro">${section.introText || "One more thing..."}</p>
          <video class="video-player" playsinline>
            <source src="${section.videoSrc}" type="video/mp4">
            Your browser doesn't support video playback.
          </video>
        </div>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const wrapper = el.querySelector(".video-wrapper");
      const intro = el.querySelector(".video-intro");
      const video = el.querySelector(".video-player");

      gsap.set(wrapper, { opacity: 0 });
      gsap.set(intro, { opacity: 0, y: 20 });
      gsap.set(video, { opacity: 0, scale: 0.95 });

      // Show intro text
      tl.to(intro, { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" })
        .to(intro, { duration: 0.5, opacity: 0, y: -10 }, "+=2")
        // Fade in video
        .to(video, { duration: 0.8, opacity: 1, scale: 1, ease: "power2.out" }, "-=0.3")
        // Start playing
        .call(() => {
          video.play().catch(e => console.log("Video autoplay prevented:", e));
        });

      // Wait for video to end
      const videoEnded = new Promise((resolve) => {
        video.addEventListener("ended", () => resolve(), { once: true });
      });

      tl.add(() => videoEnded);

      // Fade out video
      tl.to(video, { duration: 0.8, opacity: 0, scale: 0.95, ease: "power2.in" })
        .to(wrapper, { duration: 0.5, opacity: 0 }, "-=0.3");
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.5, opacity: 0 });
    }
  };
})();