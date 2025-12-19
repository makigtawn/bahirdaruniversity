document.addEventListener("DOMContentLoaded", () => {  /* to make sure all html elements are 
  loaded before JavaScript tries to access them  */
  /*      HAMBURGER MENU */
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");

  if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("active");
      console.log("hamburger clicked");

    });
  }
  /*      NEWSLETTER SUBSCRIBE  */
  const form = document.querySelector(".form-box2");

  if (form) {
    const input = form.querySelector("input");
    const button = form.querySelector("button[type='submit']");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = input.value.trim();

      if (!email || !email.includes("@")) {
        alert("Please enter a valid email address");
        return;
      }

      const originalText = button.textContent;

      button.textContent = "✓ Successfully Subscribed!";
      button.style.background = "#2bc0cd";
      input.value = "";

      showNotification();

      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "#1E96C8";
      }, 3000);
    });
  }

  /*      HERO COUNTER ANIMATION  */
  function animateCounters() {     
    const counters = document.querySelectorAll(".stat-number[data-target]");

    counters.forEach(counter => {
      const target = Number(counter.dataset.target);
      let current = 0;
      const speed = target / 100;

      const update = () => {
        if (current < target) {
          current += speed;
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      const observer = new IntersectionObserver(entries => { /*intersection observer lets the 
        browser know when something appears on screen. So animations run only when users 
        actually see them */
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            update();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(counter);
    });
  }


  /*      SUBSCRIPTION POPUP  */
  function showNotification() {
    const note = document.createElement("div");

    note.textContent = "You'll get campus news and notifications!";
    note.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #2bc0cd;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      transform: translateX(120%);
      transition: transform 0.3s ease;
      z-index: 9999;
    `;

    document.body.appendChild(note);

    requestAnimationFrame(() => { /*not using set interval b/se smoother and more efficient 
      because it syncs with the browser’s rendering cycle. It also pauses automatically when
       the tab is not active.*/
      note.style.transform = "translateX(0)";
    });

    setTimeout(() => {
      note.style.transform = "translateX(120%)";
      setTimeout(() => note.remove(), 300);
    }, 4000);
  }

  animateCounters();
});
