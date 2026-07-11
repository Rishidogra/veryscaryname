(function () {
  window.Components = window.Components || {};

  window.Components.chatbox = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-chatbox";
      div.innerHTML = `
        <div class="text-box">
          <div class="hbd-chatbox"></div>
          <p class="fake-btn">${section.buttonText || "Send"}</p>
        </div>
      `;
      const chatbox = div.querySelector(".hbd-chatbox");
      const msg = section.message || "Happy Birthday!";
      
      // Split by double newline to get individual phrases/paragraphs
      const lines = msg.split("\n\n");
      chatbox.innerHTML = lines
        .map((line) => `<p class="chat-line" style="opacity: 0; transform: translateY(10px); margin-bottom: 0.8rem;">${line.replace(/\n/g, "<br>")}</p>`)
        .join("");

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const lines = el.querySelectorAll(".chat-line");
      tl.from(el.querySelector(".text-box"), {
        duration: 0.7, scale: 0.2, opacity: 0,
      })
      .from(el.querySelector(".fake-btn"), {
        duration: 0.3, scale: 0.2, opacity: 0,
      });

      // Animate each complete sentence/phrase cinematic fade-in
      lines.forEach((line) => {
        tl.to(line, {
          duration: 0.6,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        }, "+=1.0");
      });

      tl.to(el.querySelector(".fake-btn"), {
        duration: 0.1, backgroundColor: "rgb(127, 206, 248)",
      }, "+=1.5")
      .to(el.querySelector(".text-box"), {
        duration: 0.5, scale: 0.2, opacity: 0, y: -150,
      }, "+=1");
    },
  };
})();