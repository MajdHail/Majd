let slashTriggered = false;

      function showPage(pageName) {
        document.querySelectorAll(".page").forEach((page) => {
          page.classList.remove("active");
        });

        document.getElementById(pageName).classList.add("active");

        document.querySelectorAll("nav button").forEach((btn) => {
          btn.classList.remove("active");
        });
        document.getElementById("nav-" + pageName).classList.add("active");

        if (pageName === "history" && !slashTriggered) {
          setTimeout(() => {
            triggerSlashAnimation();
          }, 500);
        }

        const currentPage = document.getElementById(pageName);
        const characters = currentPage.querySelectorAll(".hidden-character");

        characters.forEach((char) => {
          char.style.animation = "none";
          char.offsetHeight;
          char.style.animation = null;

          const reveal = char.querySelector(".character-reveal");
          char.removeEventListener("mouseenter", handleCharacterHover);
          char.addEventListener("mouseenter", handleCharacterHover);
        });
      }

      function handleCharacterHover() {
        const reveal = this.querySelector(".character-reveal");
        reveal.classList.add("discovered");
      }

      function triggerSlashAnimation() {
        slashTriggered = true;
        const slashContainer = document.getElementById("slash-container");
        const experiencePanel = document.getElementById("experience-panel");
        const specialMessage = document.getElementById("special-message");

        setTimeout(() => {
          slashContainer.classList.add("slashing");

          setTimeout(() => {
            experiencePanel.classList.add("slashed");
            setTimeout(() => {
              specialMessage.classList.add("visible");
            }, 800);
          }, 300);
        }, 500);
      }

      document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".hidden-character").forEach((char) => {
          char.addEventListener("mouseenter", handleCharacterHover);
        });
      });

      document
        .getElementById("contactForm")
        .addEventListener("submit", async function (e) {
          e.preventDefault();
          const formData = new FormData(this);
          const data = Object.fromEntries(formData);

          try {
            const response = await fetch("https://formspree.io/f/xldokzyk", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (response.ok) {
              alert("Message sent successfully");
              this.reset();
            }
          } catch (error) {
            alert("Error sending message. Please try again.");
          }
        });
