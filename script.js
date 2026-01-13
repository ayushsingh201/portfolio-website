
  /* ---------------- LOADER LOGIC ---------------- */
let percent = 0;
const percentText = document.getElementById("percent");
const bar = document.getElementById("bar");
const loaderContainer = document.getElementById("loader-container");
const mainContent = document.getElementById("main-content");
const loaderText = document.getElementById("text3d");

// Parallax for Loader Text
document.addEventListener("mousemove", (e) => {
    if(loaderContainer.style.display !== "none") {
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;
        loaderText.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateZ(40px)`;
    }
});

const loader = setInterval(() => {
    percent++;
    percentText.textContent = percent + "%";
    bar.style.width = percent + "%";

    if (percent >= 100) {
        clearInterval(loader);
        // Hide loader and show portfolio
        loaderContainer.style.display = "none";
        mainContent.style.display = "block";
        document.body.style.overflow = "auto";
        // Start portfolio animations
        typing();
        initRain();
    }
}, 20);

/* TYPING EFFECT */
const text = "Student at National PG College BCA Student |Aspiring Software Developer ";
let i=0;
function typing(){
  if(i<text.length){
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing,80);
  }
}
typing();

/* WAVE SCROLL */
window.addEventListener("scroll",()=>{
  document.querySelector(".wave-bg").style.transform =
    `translateY(${window.scrollY * 0.3}px)`;
});

/* SCROLL REVEAL (EXCEPT CERTIFICATES) */
const sections = document.querySelectorAll("section:not(#certificates)");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
      sec.classList.add("show");
    }
  });
});


/* CUSTOM CURSOR */
const cursor=document.querySelector(".cursor");
document.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
});

/* -------- LANGUAGE ICON RAIN -------- */
const icons = [
  "fa-html5",
  "fa-css3-alt",
  "fa-js",
  "fa-python",
  "fa-java",
  "fa-git-alt",
  "fa-code"
];

const rainContainer = document.querySelector(".icon-rain");

function createRainIcon(){
  const icon = document.createElement("i");
  icon.classList.add("fa-brands", icons[Math.floor(Math.random() * icons.length)], "rain-icon");

  // Random position & size
  icon.style.left = Math.random() * 100 + "vw";
  icon.style.fontSize = (16 + Math.random() * 18) + "px";

  // Random speed
  const duration = 8 + Math.random() * 6;
  icon.style.animationDuration = duration + "s";

  rainContainer.appendChild(icon);

  // Remove after fall
  setTimeout(() => {
    icon.remove();
  }, duration * 1000);
}

// Continuous rain
setInterval(createRainIcon, 700); // lower = more dense rain

document.querySelectorAll(".project-card").forEach(card => {
    const inner = card.querySelector(".project-inner");

    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
      const rotateY = ((x - centerX) / centerX) * 10;

      inner.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = `${-rotateY*2}px ${rotateX*2}px 30px rgba(255,122,0,0.4)`;
    });

    card.addEventListener("mouseleave", () => {
      inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
      card.style.boxShadow = `0 0 20px rgba(255,122,0,0.4)`;
    });
  });

  /* ---------- PROJECT IMAGE SLIDER ---------- */
  document.querySelectorAll(".project-slider").forEach(slider => {
    let imgs = slider.querySelectorAll("img");
    let index = 0;
    setInterval(() => {
      imgs[index].classList.remove("active");
      index = (index + 1) % imgs.length;
      imgs[index].classList.add("active");
    }, 2000);
  });

  if (window.innerWidth < 768) {
  document.querySelectorAll(".project-card").forEach(card => {
    card.onmousemove = null;
    card.onmouseleave = null;
  });
}
/* ===== HAMBURGER MENU FIX ===== */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");

  if (!toggle || !links) {
    console.error("Navbar elements not found");
    return;
  }

  toggle.addEventListener("click", () => {
    links.classList.toggle("active");
  });

  // Auto-close on click
  links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("active");
    });
  });
});

