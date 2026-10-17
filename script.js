let currentPage = 0;
const pages = document.querySelectorAll(".page");
const book = document.getElementById("card-book");
const welcome = document.getElementById("welcome-screen");

function showPage(index) {
  currentPage = (index + pages.length) % pages.length;
  pages.forEach((page, i) => page.classList.toggle("active", i === currentPage));
  document.getElementById("pageNumber").textContent = `${currentPage + 1} / ${pages.length}`;
}
function nextPage() { showPage(currentPage + 1); }
function prevPage() { showPage(currentPage - 1); }
function restart() { showPage(0); }

function openCard() {
  // Thử phát nhạc sau thao tác bấm của người dùng để tránh bị trình duyệt chặn.
  if (music.paused) music.play().then(updateMusicButton).catch(updateMusicButton);
  welcome.classList.add("leaving");
  window.setTimeout(() => {
    welcome.style.display = "none";
    book.classList.add("open");
    showPage(0);
  }, 650);
}
function backToWelcome() {
  book.classList.remove("open");
  welcome.style.display = "flex";
  welcome.classList.remove("leaving");
}
function saveWish() {
  const name = document.getElementById("receiver").value.trim();
  const wish = document.getElementById("wish").value.trim();
  document.getElementById("finalTitle").textContent = name ? `Gửi ${name} thân mến!` : "Gửi bạn ngàn yêu thương!";
  document.getElementById("finalWish").textContent = wish || "Chúc bạn một ngày 20/10 thật rực rỡ!";
  const btn = document.querySelector(".page.active .primary-button");
  if (btn) {
    const oldText = btn.innerHTML;
    btn.innerHTML = "Đã lưu lời chúc ✓";
    window.setTimeout(() => btn.innerHTML = oldText, 1600);
  }
}

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.getElementById("musicStatus");
function updateMusicButton() {
  musicButton.textContent = music.paused ? "♫ Bật nhạc" : "♫ Tắt nhạc";
  if (musicStatus) musicStatus.textContent = music.paused ? "♪ Chạm nút nhạc để phát" : "♪ Đang phát nhạc nền";
}
function toggleMusic() {
  if (music.paused) {
    music.play().then(updateMusicButton).catch(() => {
      if (musicStatus) musicStatus.textContent = "Kiểm tra file music/nhac.mp3 nhé";
    });
  } else {
    music.pause();
    updateMusicButton();
  }
}
window.addEventListener("load", () => {
  music.play().then(updateMusicButton).catch(updateMusicButton);
});
document.addEventListener("pointerdown", function startMusicOnce() {
  if (music.paused) music.play().then(updateMusicButton).catch(() => {});
}, { once: true });

const emojis = ["💗", "💖", "💜", "💙", "💛", "💚", "❤️", "🤍", "✨"];
function createHeart() {
  const layer = document.getElementById("floatingHearts");
  const h = document.createElement("span");
  h.className = "floating-heart";
  h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  h.style.left = Math.random() * 100 + "%";
  h.style.fontSize = (12 + Math.random() * 24) + "px";
  const duration = 6 + Math.random() * 7;
  h.style.animationDuration = duration + "s";
  layer.appendChild(h);
  window.setTimeout(() => h.remove(), duration * 1000);
}
window.setInterval(createHeart, 280);

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
function resizeStars() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: Math.min(220, Math.floor(window.innerWidth / 4)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.6 + .2,
    a: Math.random() * 6,
    speed: Math.random() * .014 + .003
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const s of stars) {
    s.a += s.speed;
    const alpha = .25 + (Math.sin(s.a) + 1) * .35;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,235,255,${alpha})`;
    ctx.shadowBlur = s.r > 1.2 ? 9 : 0;
    ctx.shadowColor = "#e9a8ff";
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
window.addEventListener("resize", resizeStars);
resizeStars();
drawStars();
showPage(0);
