(function () {
  window.Components = window.Components || {};

  window.Components.videoCarousel = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-video-carousel";
      div.innerHTML = `
        <div class="video-carousel-wrapper">
          <p class="carousel-intro">${section.introText || "One more thing..."}</p>
          <div class="video-player-container">
            <video class="video-player" playsinline>
              <source src="${section.videos[0]}" type="video/mp4">
              Your browser doesn't support video playback.
            </video>
          </div>
          <button class="video-continue-btn" disabled>Continue ❤️</button>
        </div>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el, config) {
      const section = config.sections && config.sections.find(s => s.type === "videoCarousel") || { videos: ["./assets/video/friends_video_1.mp4", "./assets/video/friends_video_2.mp4", "./assets/video/friends_video_3.mp4"] };
      const videos = section.videos || ["./assets/video/friends_video_1.mp4", "./assets/video/friends_video_2.mp4", "./assets/video/friends_video_3.mp4"];

      const wrapper = el.querySelector(".video-carousel-wrapper");
      const intro = el.querySelector(".carousel-intro");
      const videoContainer = el.querySelector(".video-player-container");
      const video = el.querySelector(".video-player");
      const continueBtn = el.querySelector(".video-continue-btn");

      gsap.set(wrapper, { opacity: 0 });
      gsap.set(intro, { opacity: 0, y: 20 });
      gsap.set(videoContainer, { opacity: 0, scale: 0.95 });
      gsap.set(continueBtn, { opacity: 0, pointerEvents: "none" });

      // Show intro text
      tl.to(intro, { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" })
        .to(intro, { duration: 0.5, opacity: 0, y: -10 }, "+=2")
        // Fade in video player
        .to(videoContainer, { duration: 0.8, opacity: 1, scale: 1, ease: "power2.out" }, "-=0.3")
        // Start playing first video
        .call(() => {
          video.play().catch(e => console.log("Video autoplay prevented:", e));
        });

      let currentVideoIndex = 0;

      const playNextVideo = () => {
        currentVideoIndex++;
        if (currentVideoIndex >= videos.length) return false;

        // Fade out current video
        tl.to(video, { duration: 0.5, opacity: 0, scale: 0.95, ease: "power2.in" })
          .call(() => {
            video.querySelector("source").src = videos[currentVideoIndex];
            video.load();
          })
          .to(video, { duration: 0.8, opacity: 1, scale: 1, ease: "power2.out" })
          .call(() => {
            video.play().catch(e => console.log("Video autoplay prevented:", e));
          });
        return true;
      };

      const handleVideoEnd = () => {
        video.removeEventListener("ended", handleVideoEnd);
        const hasMore = playNextVideo();
        if (!hasMore) {
          // All videos done - show continue button and wait for click
          tl.to(continueBtn, { duration: 0.5, opacity: 1, ease: "power2.out", pointerEvents: "auto" })
            .call(() => {
              return new Promise((resolve) => {
                const handleClick = () => {
                  continueBtn.removeEventListener("click", handleClick);
                  resolve();
                };
                continueBtn.addEventListener("click", handleClick);
              });
            });
        } else {
          // Show continue button for next video
          tl.to(continueBtn, { duration: 0.5, opacity: 1, ease: "power2.out", pointerEvents: "auto" })
            .call(() => {
              return new Promise((resolve) => {
                const handleClick = () => {
                  continueBtn.removeEventListener("click", handleClick);
                  continueBtn.style.pointerEvents = "none";
                  tl.to(continueBtn, { duration: 0.3, opacity: 0 });
                  resolve();
                };
                continueBtn.addEventListener("click", handleClick);
              });
            })
            .call(() => {
              video.addEventListener("ended", handleVideoEnd, { once: true });
            });
      };

      // Start the video end listener chain
      tl.call(() => {
        video.addEventListener("ended", handleVideoEnd, { once: true });
      });
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.5, opacity: 0 });
    }
  };
})();