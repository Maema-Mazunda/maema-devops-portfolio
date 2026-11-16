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
