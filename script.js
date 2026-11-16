
function portfolioAnswer(question) {
  const q = question.toLowerCase().trim();

  // 1. UiPath Invoice Automation
  if (
    q.includes("uipath") ||
    q.includes("invoice automation") ||
    q.includes("automation")
  ) {
    return "The UiPath Invoice Automation project demonstrates invoice information extraction, invoice register updates, document generation and email-based processing.";
  }

  // 2. WordPress Security Investigation
  if (
    q.includes("wordpress") ||
    q.includes("malware") ||
    q.includes("security")
  ) {
    return "The WordPress Security Investigation involved investigating and cleaning malware-affected WordPress websites using cPanel, Linux commands and SSH access. Client-specific details remain confidential.";
  }

  // 3. Invoice Management Application
  if (
    q.includes("fastapi") ||
    q.includes("postgresql") ||
    q.includes("application development")
  ) {
    return "The Invoice Management Application is a full-stack learning project involving frontend development, Python, FastAPI, PostgreSQL, testing and Docker.";
  }

  // Terraform and GitHub
  if (q.includes("terraform") || q.includes("github")) {
    return "Maema's DevOps toolkit includes Terraform and Git-based workflows, focusing on infrastructure as code and deployment practices.";
  }

  // AWS and Cloud Skills
  if (
    q.includes("aws") ||
    q.includes("cloud") ||
    q.includes("devops")
  ) {
    return "Maema's technical toolkit includes AWS concepts and services such as VPC, EC2, Application Load Balancers, Auto Scaling, CloudFront, RDS, S3, NAT Gateway and VPN, alongside Linux systems.";
  }

  // Technical Skills
  if (
    q.includes("skill") ||
    q.includes("technology") ||
    q.includes("tools")
  ) {
    return "The portfolio lists AWS, Linux, SSH, Terraform, GitHub, UiPath, Python, FastAPI, HTML, CSS, JavaScript and PostgreSQL. These represent a combination of practical experience and ongoing learning.";
  }

  // Professional Experience
  if (
    q.includes("experience") ||
    q.includes("role") ||
    q.includes("current")
  ) {
    return "Maema is presented as a DevOps Engineer at Cloudstead, focusing on cloud infrastructure, automation, Linux systems and technical operations.";
  }

  // Contact Information
  if (q.includes("contact") || q.includes("email")) {
    return `You can contact Maema at ${email} through the Contact section.`;
  }

  // Featured Projects
  if (q.includes("project")) {
    return "The three featured projects are UiPath Invoice Automation, WordPress Security Investigation and Invoice Management Application.";
  }

  // Default Response
  return "I can answer questions about Maema's DevOps skills, AWS toolkit, UiPath automation, Linux systems, WordPress security investigation, application development and contact information.";
}
