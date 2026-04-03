   /* ============================================================
       CURSOR
    ============================================================ */
    const cursor = document.getElementById("cursor");
    const cursorRing = document.getElementById("cursor-ring");
    let mx = 0, my = 0;
 
    document.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
      cursorRing.style.left = mx + "px";
      cursorRing.style.top = my + "px";
    });
 
    document.querySelectorAll("a, button, .project-card").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%,-50%) scale(2)";
        cursorRing.style.transform = "translate(-50%,-50%) scale(1.5)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%,-50%) scale(1)";
        cursorRing.style.transform = "translate(-50%,-50%) scale(1)";
      });
    });
 
    function updateCursorColors() {
      const accent = getComputedStyle(document.body).getPropertyValue("--accent").trim();
      if (cursor) cursor.style.background = accent;
      if (cursorRing) cursorRing.style.borderColor = accent;
    }
 
    /* ============================================================
       3D CANVAS BACKGROUND
    ============================================================ */
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
 
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
 
    const spheres = Array.from({length: 6}, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 80 + Math.random() * 160,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: 0.04 + Math.random() * 0.06
    }));
 
    function drawCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accent = getComputedStyle(document.body).getPropertyValue("--accent").trim() || "#e91e63";
 
      spheres.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -s.r) s.x = canvas.width + s.r;
        if (s.x > canvas.width + s.r) s.x = -s.r;
        if (s.y < -s.r) s.y = canvas.height + s.r;
        if (s.y > canvas.height + s.r) s.y = -s.r;
 
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        g.addColorStop(0, hexToRgba(accent, s.opacity));
        g.addColorStop(1, hexToRgba(accent, 0));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
 
      requestAnimationFrame(drawCanvas);
    }
 
    function hexToRgba(hex, alpha) {
      hex = hex.replace("#","");
      if (hex.length === 3) hex = hex.split("").map(c => c+c).join("");
      const r = parseInt(hex.substring(0,2),16);
      const g = parseInt(hex.substring(2,4),16);
      const b = parseInt(hex.substring(4,6),16);
      return `rgba(${r},${g},${b},${alpha})`;
    }
 
    drawCanvas();
 
//     /* ============================================================
//        THEMES
//     ============================================================ */
//     const themes = [
//       { name: "spring", icon: "🌸", label: "Spring" },
//       { name: "summer", icon: "☀️", label: "Summer" },
//       { name: "autumn", icon: "🍂", label: "Autumn" },
//       { name: "rainy",  icon: "🌧️", label: "Rainy"  },
//       { name: "winter", icon: "❄️", label: "Winter" },
//     ];
//     let currentTheme = 0;
 
//     const savedTheme = localStorage.getItem("aashi-theme");
//     if (savedTheme) {
//       const idx = themes.findIndex(t => t.name === savedTheme);
//       if (idx !== -1) { currentTheme = idx; }
//     }
 
//     function applyTheme(idx) {
//       themes.forEach(t => document.body.classList.remove(t.name));
//       document.body.classList.add(themes[idx].name);
//       document.getElementById("theme-toggle").textContent = themes[idx].icon;
      
//       localStorage.setItem("aashi-theme", themes[idx].name);
//       updateCursorColors();
//       updateParticles(themes[idx].name);
//       // playThemeSong(themes[idx].name); 
//     }
 
//     applyTheme(currentTheme);
 
//     document.getElementById("theme-toggle").addEventListener("click", () => {
//       currentTheme = (currentTheme + 1) % themes.length;
//       applyTheme(currentTheme);
//     });
//     // ============-======== song ------------------------
// // // ============ THEME SONGS ============
// const themeSongs = {
//   spring: "songs/spring.mp3",
//   summer: "songs/summer.mp3",
//   autumn: "songs/autumn.mp3",
//   rainy:  "songs/rainy.mp3",
//   winter: "songs/winter.mp3"
// };

// const audio = document.getElementById("bg-music");
// const muteBtn = document.getElementById("mute-toggle");
// let isPlaying = false;

// //// Call this every time theme changes
// // function playThemeSong(themeName) {
// //   const newSrc = themeSongs[themeName];

// //   // Only swap if song actually changed
// //   if (!audio.src.endsWith(newSrc)) {
// //     audio.src = newSrc;
// //     audio.volume = 0.3;
// //   }

//   // Only play if user has already pressed play
//   if (isPlaying) {
//     audio.play().catch(() => {});
//   }
// // }

// // // Play/Pause toggle button
// // muteBtn.addEventListener("click", () => {
// //   if (!audio.src) {
// //     // First ever click — load current theme song
// //     audio.src = themeSongs[themes[currentTheme].name];
// //     audio.volume = 0.3;
// //   }

// //   if (isPlaying) {
// //     audio.pause();
// //     isPlaying = false;
// //     muteBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
// //   } else {
// //     audio.play().catch(() => {});
// //     isPlaying = true;
// //     muteBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
// //   }
// // });

// // Also stop/start on tab visibility change (good UX)
// document.addEventListener("visibilitychange", () => {
//   if (document.hidden) {
//     audio.pause();
//   } else if (isPlaying) {
//     audio.play().catch(() => {});
//   }
// });


/* ============================================================
   THEMES
============================================================ */
const themes = [
  { name: "spring", icon: "🌸", label: "Spring" },
  { name: "summer", icon: "☀️", label: "Summer" },
  { name: "autumn", icon: "🍂", label: "Autumn" },
  { name: "rainy",  icon: "🌧️", label: "Rainy"  },
  { name: "winter", icon: "❄️", label: "Winter" },
];
let currentTheme = 0;

// ✅ Moved UP here so they exist before applyTheme() runs
const audio = document.getElementById("bg-music");
const muteBtn = document.getElementById("mute-toggle");
let isPlaying = false;

const themeSongs = {
  spring: "songs/spring.mp3",
  summer: "songs/summer.mp3",
  autumn: "songs/autumn.mp3",
  rainy:  "songs/rainy.mp3",
  winter: "songs/winter.mp3"
};

function playThemeSong(themeName) {
  const newSrc = themeSongs[themeName];
  if (!audio.src.endsWith(newSrc)) {
    audio.src = newSrc;
    audio.volume = 0.3;
  }
  if (isPlaying) {
    audio.play().catch(() => {});
  }
}

const savedTheme = localStorage.getItem("aashi-theme");
if (savedTheme) {
  const idx = themes.findIndex(t => t.name === savedTheme);
  if (idx !== -1) currentTheme = idx;
}

function applyTheme(idx) {
  themes.forEach(t => document.body.classList.remove(t.name));
  document.body.classList.add(themes[idx].name);
  document.getElementById("theme-toggle").textContent = themes[idx].icon;
  localStorage.setItem("aashi-theme", themes[idx].name);
  updateCursorColors();
  updateParticles(themes[idx].name);
  playThemeSong(themes[idx].name); // ✅ now audio is defined when this runs
}

applyTheme(currentTheme);

document.getElementById("theme-toggle").addEventListener("click", () => {
  currentTheme = (currentTheme + 1) % themes.length;
  applyTheme(currentTheme);
});

muteBtn.addEventListener("click", () => {
  if (!audio.src) {
    audio.src = themeSongs[themes[currentTheme].name];
    audio.volume = 0.3;
  }
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    muteBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    audio.play().catch(() => {});
    isPlaying = true;
    muteBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    audio.pause();
  } else if (isPlaying) {
    audio.play().catch(() => {});
  }
});
    /* ============================================================
       PARTICLES
    ============================================================ */
    function updateParticles(theme) {
      document.querySelectorAll(".particles-layer").forEach(l => l.classList.remove("active"));
 
      if (theme === "spring") {
        const layer = document.getElementById("layer-spring");
        layer.classList.add("active");
        if (!layer.children.length) {
          for (let i = 0; i < 18; i++) {
            const p = document.createElement("span");
            p.className = "particle";
            p.textContent = ["🌸","🌺","🌹","🌼","🌻"][Math.floor(Math.random()*5)];
            p.style.cssText = `
              left:${Math.random()*100}vw;
              font-size:${12+Math.random()*18}px;
              animation-duration:${8+Math.random()*10}s;
              animation-delay:${-Math.random()*10}s;
            `;
            layer.appendChild(p);
          }
        }
      } else if (theme === "rainy") {
        const layer = document.getElementById("layer-rain");
        layer.classList.add("active");
        if (!layer.children.length) {
          for (let i = 0; i < 80; i++) {
            const p = document.createElement("span");
            p.className = "particle";
            p.style.cssText = `
              left:${Math.random()*100}vw;
              width:1.5px;
              height:${15+Math.random()*10}px;
              background:rgba(88,166,255,0.5);
              border-radius:2px;
              animation-duration:${0.4+Math.random()*0.6}s;
              animation-delay:${-Math.random()*2}s;
            `;
            layer.appendChild(p);
          }
        }
      } else if (theme === "winter") {
        const layer = document.getElementById("layer-snow");
        layer.classList.add("active");
        if (!layer.children.length) {
          for (let i = 0; i < 28; i++) {
            const p = document.createElement("span");
            p.className = "particle";
            p.textContent = "❄";
            p.style.cssText = `
              left:${Math.random()*100}vw;
              font-size:${10+Math.random()*16}px;
              animation-duration:${7+Math.random()*8}s;
              animation-delay:${-Math.random()*8}s;
              color:rgba(144,202,249,0.7);
            `;
            layer.appendChild(p);
          }
        }
      } else if (theme === "summer") {
        const layer = document.getElementById("layer-summer");
        layer.classList.add("active");
        if (!layer.children.length) {
          for (let i = 0; i < 14; i++) {
            const p = document.createElement("span");
            p.className = "particle";
            p.textContent = ["⭐","✨","🌟","💫"][Math.floor(Math.random()*4)];
            p.style.cssText = `
              left:${Math.random()*100}vw;
              font-size:${10+Math.random()*14}px;
              animation-duration:${5+Math.random()*8}s;
              animation-delay:${-Math.random()*5}s;
            `;
            layer.appendChild(p);
          }
        }// Add autumn case to updateParticles()
} else if (theme === "autumn") {
  const layer = document.getElementById("layer-autumn");
  layer.classList.add("active");
  if (!layer.children.length) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.textContent = ["🍂","🍁","🍃"][Math.floor(Math.random()*3)];
      p.style.cssText = `left:${Math.random()*100}vw;font-size:${12+Math.random()*16}px;animation-duration:${7+Math.random()*9}s;animation-delay:${-Math.random()*8}s;`;
      layer.appendChild(p);
    }
  }
}
      }
    
 /* ============================================================
       tech stack
    ============================================================ */

      
    const row1Pills = [
  {ico:"⚛",label:"React.js"},{ico:"🟨",label:"JavaScript"},
  {ico:"🍃",label:"MongoDB"},{ico:"🟢",label:"Node.js"},
  {ico:"🔷",label:"TypeScript"},{ico:"🌐",label:"HTML5"},
  {ico:"🎨",label:"CSS3"},{ico:"⛓",label:"Solidity"},
];
const row2Pills = [
  {ico:"🐙",label:"GitHub"},{ico:"☕",label:"Java"},
  {ico:"🔌",label:"REST API"},{ico:"🌍",label:"Web3.js"},
  {ico:"💡",label:"Figma"},{ico:"⚙️",label:"VS Code"},
  {ico:"🔐",label:"Smart Contracts"},{ico:"🖼",label:"Canva"},
];
function buildRow(id, pills) {
  const track = document.getElementById(id);
  [...pills, ...pills].forEach(p => { // duplicate for seamless loop
    const el = document.createElement("div");
    el.className = "tech-pill";
    el.innerHTML = `<span class="ico">${p.ico}</span><span>${p.label}</span>`;
    track.appendChild(el);
  });
}
buildRow("r1", row1Pills);
buildRow("r2", row2Pills);
  
    /* ============================================================
       3D CARD MOUSE TILT
    ============================================================ */
    const heroCard = document.getElementById("hero-card");
    if (heroCard) {
      heroCard.parentElement.addEventListener("mousemove", e => {
        const rect = heroCard.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        heroCard.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg) translateZ(10px)`;
      });
      heroCard.parentElement.addEventListener("mouseleave", () => {
        heroCard.style.transform = "rotateY(0) rotateX(0) translateZ(0)";
      });
    }
 
    /* ============================================================
       TYPEWRITER
    ============================================================ */
    const phrases = ["", " — Full Stack Dev", " — Blockchain Nerd", " — UI Enthusiast", " — Problem Solver"];
    let pIdx = 0, cIdx = 0, deleting = false;
    const tw = document.getElementById("typewriter");
 
    function typewrite() {
      const phrase = phrases[pIdx];
      if (!deleting && cIdx <= phrase.length) {
        tw.textContent = phrase.slice(0, cIdx++);
        setTimeout(typewrite, 90);
      } else if (!deleting && cIdx > phrase.length) {
        deleting = true;
        setTimeout(typewrite, 1800);
      } else if (deleting && cIdx >= 0) {
        tw.textContent = phrase.slice(0, cIdx--);
        setTimeout(typewrite, 50);
      } else {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(typewrite, 400);
      }
    }
    typewrite();
 
    /* ============================================================
       SCROLL REVEAL
    ============================================================ */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          // Stagger children
          e.target.querySelectorAll(".project-card, .contact-item").forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.1}s`;
          });
        }
      });
    }, { threshold: 0.1 });
 
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
 
    /* ============================================================
       HAMBURGER
    ============================================================ */
    const ham = document.getElementById("hamburger");
    const nav = document.getElementById("main-nav");
    ham.addEventListener("click", () => nav.classList.toggle("open"));
 
    /* ============================================================
       CONTACT FORM
    ============================================================ */
    document.getElementById("contact-form").addEventListener("submit", e => {
      e.preventDefault();
      const btn = e.target.querySelector("button[type=submit]");
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        e.target.reset();
      }, 3000);
    });



    //  ============================================================
    //    ANALOG CLOCK
    // ========================================================== 
    const ticksG = document.getElementById("clock-ticks");
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * 360;
      const rad = (angle - 90) * Math.PI / 180;
      const isMain = i % 3 === 0;
      const r1 = isMain ? 36 : 39, r2 = 42;
      const x1 = 50 + r1 * Math.cos(rad), y1 = 50 + r1 * Math.sin(rad);
      const x2 = 50 + r2 * Math.cos(rad), y2 = 50 + r2 * Math.sin(rad);
      const line = document.createElementNS("http://www.w3.org/2000/svg","line");
      line.setAttribute("x1", x1); line.setAttribute("y1", y1);
      line.setAttribute("x2", x2); line.setAttribute("y2", y2);
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("stroke-width", isMain ? "2.5" : "1");
      line.setAttribute("stroke-linecap", "round");
      if (ticksG) ticksG.appendChild(line);
    }
 
function updateCalendar() {
  const now = new Date();
  const months  = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const days    = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
  document.getElementById("cal-month").textContent = months[now.getMonth()];
  document.getElementById("cal-day").textContent   = String(now.getDate()).padStart(2,"0");
  document.getElementById("cal-week").textContent  = days[now.getDay()];
}
updateCalendar();

    function updateClock() {
      const now = new Date();
      const h = now.getHours() % 12, m = now.getMinutes(), s = now.getSeconds();
      const ms = now.getMilliseconds();
      const sDeg = (s + ms / 1000) * 6;
      const mDeg = (m + s / 60) * 6;
      const hDeg = (h + m / 60) * 30;
 
      function handCoords(deg, len) {
        const r = (deg - 90) * Math.PI / 180;
        return { x: 50 + len * Math.cos(r), y: 50 + len * Math.sin(r) };
      }
 
      const hPt = handCoords(hDeg, 22);
      const mPt = handCoords(mDeg, 30);
      const sPt = handCoords(sDeg, 34);
 
      const hourHand = document.getElementById("clock-hour");
      const minHand  = document.getElementById("clock-min");
      const secHand  = document.getElementById("clock-sec");
      if (hourHand) { hourHand.setAttribute("x2", hPt.x); hourHand.setAttribute("y2", hPt.y); }
      if (minHand)  { minHand.setAttribute("x2",  mPt.x); minHand.setAttribute("y2",  mPt.y); }
      if (secHand)  { secHand.setAttribute("x2",  sPt.x); secHand.setAttribute("y2",  sPt.y); }
 
      const dig = document.getElementById("clock-digital");
      if (dig) {
        const hh = String(now.getHours()).padStart(2,"0");
        const mm = String(m).padStart(2,"0");
        const ss = String(s).padStart(2,"0");
        dig.textContent = hh + ":" + mm + ":" + ss;
      }
      requestAnimationFrame(updateClock);
    }
    updateClock();


