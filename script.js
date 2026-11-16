// Responsive navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Contact email copy action
document.getElementById("copyEmail").addEventListener("click", async () => {
  const feedback = document.getElementById("copyFeedback");
  try {
    await navigator.clipboard.writeText("maemamazunda10@gmail.com");
    feedback.textContent = "Email address copied.";
  } catch {
    feedback.textContent = "Copy isn't available here. Use the email link above.";
  }
});

// Architecture image lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
document.querySelectorAll(".diagram-button").forEach(button => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.image;
    lightboxTitle.textContent = button.dataset.title;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });

// Portfolio assistant interface
const launcher = document.getElementById("assistantLauncher");
const panel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");
const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const messages = document.getElementById("chatMessages");

function openChat() {
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  input.focus();
}
function hideChat() {
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
}
launcher.addEventListener("click", openChat);
closeChat.addEventListener("click", hideChat);

function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

// Curated answers based on the projects and experience described on this site.
// This is a local demo knowledge base, not a live generative AI connection.
function portfolioAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("three-tier") || q.includes("3-tier") || q.includes("architecture") || q.includes("availability zone")) {
    return "The portfolio shows a three-tier AWS web application design across two Availability Zones. It includes CloudFront, an Internet Gateway, public subnets with NAT Gateways, an Application Load Balancer, EC2 instances in an Auto Scaling Group, and an RDS MySQL primary database with a read replica.";
  }
  if (q.includes("terraform") || q.includes("github")) {
    return "The enhanced architecture diagram includes Terraform and GitHub as part of the supporting engineering workflow. The diagram alone does not establish the exact deployment or CI/CD implementation details.";
  }
  if (q.includes("cloudwatch") || q.includes("monitor")) {
    return "The enhanced AWS architecture includes CloudWatch alarms as a monitoring component.";
  }
  if (q.includes("s3") || q.includes("storage")) {
    return "Amazon S3 is shown as an additional storage component in the enhanced architecture diagram.";
  }
  if (q.includes("aws") || q.includes("cloud") || q.includes("devops")) {
    return "The portfolio highlights AWS architecture and cloud engineering topics including VPC networking, CloudFront, load balancing, EC2 Auto Scaling, NAT Gateways, RDS MySQL, security groups and CloudWatch.";
  }
  if (q.includes("uipath") || q.includes("invoice") || q.includes("automation")) {
    return "The UiPath project covers invoice information extraction, invoice register updates, document generation and email-based processing.";
  }
  if (q.includes("wordpress") || q.includes("malware") || q.includes("security")) {
    return "The portfolio includes experience contributing to WordPress security investigations and malware cleanup using cPanel, Linux commands and SSH access. Client-specific details are excluded.";
  }
  if (q.includes("skill") || q.includes("technology") || q.includes("tools")) {
    return "The listed technologies include AWS, Linux, SSH, Terraform, GitHub, CloudWatch, UiPath, Python, FastAPI, HTML, CSS, JavaScript and PostgreSQL. Some are hands-on areas and others are active learning topics.";
  }
  if (q.includes("experience") || q.includes("role") || q.includes("current")) {
    return "The portfolio presents Maema as a DevOps Engineer, with a focus on cloud infrastructure, automation, Linux systems and technical operations.";
  }
  if (q.includes("contact") || q.includes("email")) {
    return "You can contact Maema at maemamazunda10@gmail.com using the Contact section.";
  }
  if (q.includes("project")) {
    return "Featured work includes an AWS three-tier web application, an enhanced AWS infrastructure design, UiPath invoice automation, WordPress security investigation and an invoice management learning project.";
  }
  return "I can answer questions about the AWS architecture diagrams, cloud and DevOps skills, Terraform, GitHub, CloudWatch, UiPath automation, WordPress security work and contact details. What would you like to know?";
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) return;
  addMessage(question, "user");
  input.value = "";
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = "Assistant is thinking...";
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
  window.setTimeout(() => {
    typing.remove();
    addMessage(portfolioAnswer(question), "bot");
  }, 650);
});

document.querySelectorAll(".suggested-questions button").forEach(button => {
  button.addEventListener("click", () => {
    input.value = button.dataset.question;
    form.requestSubmit();
  });
});

/* =====================================================
   Fun & interactive extras
   ===================================================== */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

// Make thumbnails open the lightbox too, and show a tidy placeholder if an image is missing
document.querySelectorAll(".project-thumb").forEach(img => {
  const card = img.closest(".project-card");
  const button = card.querySelector(".diagram-button");
  img.addEventListener("click", () => button && button.click());
  img.addEventListener("error", () => {
    const note = document.createElement("div");
    note.className = "thumb-missing";
    note.textContent = "Diagram unavailable — check assets/ folder";
    img.replaceWith(note);
    if (button) button.style.display = "none";
  });
});

// Scroll progress bar + active nav link
const progress = document.getElementById("scrollProgress");
const navLinks = [...mainNav.querySelectorAll("a")];
const sections = navLinks.map(a => document.querySelector(a.getAttribute("href")));
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  let current = -1;
  sections.forEach((sec, i) => { if (sec && sec.getBoundingClientRect().top < innerHeight * 0.35) current = i; });
  navLinks.forEach((a, i) => a.classList.toggle("active", i === current));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Rotating typed headline
const typedEl = document.getElementById("typedLine");
const phrases = ["building what’s next.", "automating the boring.", "keeping servers happy.", "shipping to the cloud.", "never breaking prod."];
if (!reduceMotion) {
  let p = 0, c = phrases[0].length, deleting = true;
  setTimeout(function tick() {
    const word = phrases[p];
    c += deleting ? -1 : 1;
    typedEl.textContent = word.slice(0, c);
    let delay = deleting ? 35 : 70;
    if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 300; }
    else if (!deleting && c === phrases[p].length) { deleting = true; delay = 2200; }
    setTimeout(tick, delay);
  }, 2600);
}

// Robot: eyes follow the cursor, click to poke
const robot = document.getElementById("robot");
const bubble = document.getElementById("robotBubble");
const pokeCount = document.getElementById("pokeCount");
const eyes = document.querySelectorAll("#robotEyes i");
if (finePointer && !reduceMotion) {
  addEventListener("mousemove", e => {
    eyes.forEach(eye => {
      const r = eye.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const angle = Math.atan2(dy, dx), dist = Math.min(5, Math.hypot(dx, dy) / 40);
      eye.style.setProperty("--ex", `${Math.cos(angle) * dist}px`);
      eye.style.setProperty("--ey", `${Math.sin(angle) * dist}px`);
    });
  });
}
const quips = [
  "Hi! I'm running on 100% uptime and good vibes.",
  "Did you know? This robot is pure CSS. No images were harmed.",
  "terraform apply… just kidding, I only plan.",
  "Ouch. That's an unauthorised request. 403!",
  "Auto Scaling engaged: I feel taller already.",
  "Have you tried turning it off and on again?",
  "My favourite exercise? Load balancing.",
  "Try the terminal below — type 'deploy'.",
  "OK, I'm getting dizzy now…"
];
let pokes = 0, bubbleTimer;
function say(text, ms = 3000) {
  bubble.textContent = text;
  bubble.classList.add("show");
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubble.classList.remove("show"), ms);
}
robot.addEventListener("click", () => {
  pokes++;
  pokeCount.textContent = String(pokes).padStart(2, "0");
  robot.classList.remove("happy", "dizzy", "boost");
  void robot.offsetWidth;
  if (pokes % 9 === 0) { robot.classList.add("dizzy"); say(quips[8]); }
  else if (pokes === 15) { robot.classList.add("happy"); say("15 pokes! You've unlocked: confetti. 🎉"); burstConfetti(); }
  else { robot.classList.add(pokes % 2 ? "happy" : "boost"); say(quips[(pokes - 1) % 8]); }
  setTimeout(() => robot.classList.remove("happy", "boost"), 1400);
});
setTimeout(() => say("Psst… click me.", 2600), 1800);

// Skill cards: spotlight follows the pointer
document.querySelectorAll(".skill").forEach(card => {
  card.addEventListener("pointermove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// Project filters
const chips = document.querySelectorAll(".filter-chip");
const cards = document.querySelectorAll(".project-card[data-category]");
chips.forEach(chip => chip.addEventListener("click", () => {
  chips.forEach(c => { c.classList.toggle("active", c === chip); c.setAttribute("aria-pressed", String(c === chip)); });
  const f = chip.dataset.filter;
  cards.forEach(card => {
    const show = f === "all" || card.dataset.category === f;
    card.classList.toggle("hidden", !show);
    card.classList.remove("pop");
    if (show && !reduceMotion) { void card.offsetWidth; card.classList.add("pop"); }
  });
}));

// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [], confettiRunning = false;
function burstConfetti() {
  if (reduceMotion) return;
  canvas.width = innerWidth; canvas.height = innerHeight;
  const colors = ["#56ddf5", "#7188ff", "#4be3a4", "#ffd166", "#edf5ff"];
  for (let i = 0; i < 140; i++) {
    pieces.push({ x: innerWidth / 2, y: innerHeight * 0.45, vx: (Math.random() - .5) * 16, vy: Math.random() * -14 - 4,
      s: Math.random() * 6 + 4, r: Math.random() * 6, vr: (Math.random() - .5) * .3, c: colors[i % colors.length], life: 0 });
  }
  if (!confettiRunning) { confettiRunning = true; requestAnimationFrame(drawConfetti); }
}
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
    ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
  });
  pieces = pieces.filter(p => p.y < canvas.height + 40 && p.life < 400);
  if (pieces.length) requestAnimationFrame(drawConfetti);
  else { confettiRunning = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}
document.getElementById("copyEmail").addEventListener("click", () => setTimeout(burstConfetti, 50));

// Terminal playground
const termOut = document.getElementById("terminalOutput");
const termForm = document.getElementById("terminalForm");
const termInput = document.getElementById("terminalInput");
const cmdHistory = []; let histIndex = 0, busy = false;
const wait = ms => new Promise(r => setTimeout(r, reduceMotion ? 0 : ms));

function print(html, cls = "") {
  const line = document.createElement("div");
  line.className = `line ${cls}`;
  line.innerHTML = html;
  termOut.appendChild(line);
  termOut.scrollTop = termOut.scrollHeight;
  return line;
}
const esc = t => t.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

const commands = {
  help: () => print(
`Available commands:
  <span class="t-accent">whoami</span>       who built this site
  <span class="t-accent">skills</span>       toolkit overview
  <span class="t-accent">projects</span>     list featured work
  <span class="t-accent">open</span> &lt;n&gt;     jump to project n (1–5)
  <span class="t-accent">deploy</span>       run the CI/CD pipeline
  <span class="t-accent">uptime</span>       how long you've been here
  <span class="t-accent">contact</span>      get in touch
  <span class="t-accent">theme</span>        toggle the neon
  <span class="t-accent">clear</span>        clear the screen
<span class="t-muted">Tip: ↑/↓ for history, Tab to autocomplete.</span>`),
  whoami: () => print(`<span class="t-ok">maema-mazunda</span> — DevOps Engineer @ Cloudstead
Cloud infrastructure · automation · Linux systems`),
  skills: () => {
    const rows = [["AWS", 9], ["Linux & SSH", 8], ["Terraform / IaC", 7], ["UiPath RPA", 7], ["Python & FastAPI", 6], ["Web (HTML/CSS/JS)", 6]];
    print(rows.map(([n, v]) => `${n.padEnd(19)}<span class="bar">${"█".repeat(v)}</span><span class="t-muted">${"░".repeat(10 - v)}</span>`).join("\n"));
    print(`<span class="t-muted">Bars show focus areas, not exam scores.</span>`);
  },
  projects: () => print([...document.querySelectorAll(".project-card h3")]
    .map((h, i) => `<span class="t-accent">[${i + 1}]</span> ${esc(h.textContent)}`).join("\n") + `\n<span class="t-muted">Type 'open 1' to jump to one.</span>`),
  open: arg => {
    const n = parseInt(arg, 10), list = document.querySelectorAll(".project-card");
    if (!n || n < 1 || n > list.length) return print(`open: give a project number from 1 to ${list.length}, e.g. 'open 2'`, "t-err");
    document.querySelector('.filter-chip[data-filter="all"]').click();
    list[n - 1].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    list[n - 1].classList.remove("pop"); void list[n - 1].offsetWidth; list[n - 1].classList.add("pop");
    print(`Opening project ${n}…`, "t-ok");
  },
  uptime: () => {
    const s = Math.floor(performance.now() / 1000);
    print(`up ${Math.floor(s / 60)} min ${s % 60} sec, 1 user, load average: 0.42 (mostly curiosity)`);
  },
  contact: () => print(`Email: <a class="t-accent" href="mailto:maemamazunda10@gmail.com">maemamazunda10@gmail.com</a>`),
  theme: () => {
    const root = document.documentElement.style;
    const alt = root.getPropertyValue("--cyan") !== "#ff7ad9";
    root.setProperty("--cyan", alt ? "#ff7ad9" : "#56ddf5");
    root.setProperty("--blue", alt ? "#ffd166" : "#7188ff");
    print(alt ? "Synthwave mode enabled. Run 'theme' again to go back." : "Back to classic cyan.", "t-ok");
  },
  clear: () => { termOut.innerHTML = ""; },
  ls: () => print("about/  skills/  projects/  experience/  contact/  <span class='t-ok'>secret.txt</span>"),
  "cat": arg => arg === "secret.txt"
    ? print("There's no secret. But try 'sudo hire-me'. 😉", "t-warn")
    : print(`cat: ${esc(arg || "")}: No such file`, "t-err"),
  "rm": () => print("Nice try. This portfolio is immutable infrastructure. 🔒", "t-warn"),
  sudo: async arg => {
    if (arg === "hire-me") {
      print("[sudo] password for guest: ********", "t-muted");
      await wait(600);
      print("Access granted ✔ Excellent decision.", "t-ok");
      burstConfetti();
      print(`Opening your mail client… <a class="t-accent" href="mailto:maemamazunda10@gmail.com?subject=Let's%20work%20together">or click here</a>`);
      await wait(900);
      location.href = "mailto:maemamazunda10@gmail.com?subject=Let's%20work%20together";
    } else print(`guest is not in the sudoers file. This incident will be reported. 🚨\n<span class="t-muted">(Hint: try 'sudo hire-me')</span>`, "t-err");
  },
  deploy: async () => {
    const stages = [
      ["Checkout", "git clone portfolio.git", 500],
      ["Lint", "html, css, js … 0 problems", 600],
      ["Test", "running 42 tests", 900],
      ["Plan", "terraform plan: 3 to add, 0 to change, 0 to destroy", 800],
      ["Deploy", "ALB → Auto Scaling group (2 AZs)", 1000],
      ["Health", "GET /health → 200 OK", 500]
    ];
    print(`<span class="t-accent">▶ Pipeline #${Math.floor(Math.random() * 900 + 100)} started</span>`);
    const flaky = Math.random() < 0.35;
    for (const [name, detail, ms] of stages) {
      const line = print(`  ⠋ ${name.padEnd(8)}<span class="t-muted">${detail}</span>`);
      const frames = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏"; let f = 0;
      const spin = setInterval(() => { line.firstChild.textContent = `  ${frames[++f % 10]} ${name.padEnd(8)}`; }, 80);
      await wait(ms);
      if (name === "Test" && flaky) {
        clearInterval(spin);
        line.innerHTML = `  <span class="t-err">✖ ${name.padEnd(8)}</span><span class="t-muted">1 flaky test failed</span>`;
        print(`  <span class="t-warn">↻ retrying…</span>`);
        await wait(700);
        print(`  <span class="t-ok">✔ ${name.padEnd(8)}</span><span class="t-muted">42 passed on retry</span>`);
        continue;
      }
      clearInterval(spin);
      line.innerHTML = `  <span class="t-ok">✔ ${name.padEnd(8)}</span><span class="t-muted">${detail}</span>`;
    }
    print(`<span class="t-ok">✔ Deployed successfully.</span> You're looking at it. 🚀`);
    burstConfetti();
  }
};
const aliases = { "?": "help", man: "help", cls: "clear", hire: "sudo", email: "contact" };

async function run(raw) {
  const input = raw.trim();
  print(`<span class="t-cmd"><b>guest@mm</b>:~$ ${esc(input)}</span>`);
  if (!input) return;
  cmdHistory.push(input); histIndex = cmdHistory.length;
  let [cmd, ...rest] = input.split(/\s+/);
  cmd = cmd.toLowerCase(); cmd = aliases[cmd] || cmd;
  let arg = rest.join(" ").toLowerCase();
  if (input.toLowerCase() === "hire me") arg = "hire-me";
  const fn = commands[cmd];
  if (!fn) return print(`${esc(cmd)}: command not found. Type <span class="t-accent">help</span> for options.`, "t-err");
  busy = true; termInput.disabled = true;
  try { await fn(arg); } finally { busy = false; termInput.disabled = false; if (document.activeElement === document.body) termInput.focus({ preventScroll: true }); }
}

termForm.addEventListener("submit", e => {
  e.preventDefault();
  if (busy) return;
  const v = termInput.value; termInput.value = "";
  run(v);
});
termInput.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && cmdHistory.length) { histIndex = Math.max(0, histIndex - 1); termInput.value = cmdHistory[histIndex]; e.preventDefault(); }
  else if (e.key === "ArrowDown") { histIndex = Math.min(cmdHistory.length, histIndex + 1); termInput.value = cmdHistory[histIndex] || ""; e.preventDefault(); }
  else if (e.key === "Tab") {
    const v = termInput.value.toLowerCase();
    const match = Object.keys(commands).find(c => v && c.startsWith(v));
    if (match) { termInput.value = match + " "; e.preventDefault(); }
  }
});
document.getElementById("terminal").addEventListener("click", e => {
  if (!e.target.closest("a") && !getSelection().toString()) termInput.focus({ preventScroll: true });
});
document.querySelectorAll("#commandChips button").forEach(btn =>
  btn.addEventListener("click", () => { if (!busy) run(btn.dataset.cmd); }));

print(`Welcome to <span class="t-accent">maema-portfolio</span> (Linux 6.x, totally real).`);
print(`Type <span class="t-accent">help</span> to see what you can do.`, "t-muted");

// Konami code easter egg: ↑ ↑ ↓ ↓ ← → ← → b a
const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let kIndex = 0;
addEventListener("keydown", e => {
  kIndex = e.key === konami[kIndex] ? kIndex + 1 : (e.key === konami[0] ? 1 : 0);
  if (kIndex === konami.length) { kIndex = 0; burstConfetti(); say("Cheat code accepted. +30 lives. 🕹️", 3500); }
});
