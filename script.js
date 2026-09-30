const copyButton = document.getElementById("copy-ip-btn");
const copyStatus = document.getElementById("copy-status");
const serverIpNode = document.getElementById("server-ip");
const yearNode = document.getElementById("year");

async function copyServerIp() {
  if (!copyButton || !copyStatus || !serverIpNode) return;

  const ip = serverIpNode.textContent?.trim() || "";

  if (!ip) {
    copyStatus.textContent = "Không tìm thấy IP.";
    return;
  }

  try {
    await navigator.clipboard.writeText(ip);
    copyStatus.textContent = "Đã copy IP!";
  } catch {
    const tempInput = document.createElement("input");
    tempInput.value = ip;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    tempInput.remove();
    copyStatus.textContent = "Đã copy IP!";
  }

  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 2200);
}

if (copyButton) {
  copyButton.addEventListener("click", copyServerIp);
}

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const revealNodes = document.querySelectorAll(".section, .site-footer");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let revealObserver = null;

function disableRevealAnimation() {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }

  revealNodes.forEach((node) => {
    node.classList.remove("scroll-reveal");
    node.classList.add("is-visible");
  });
}

function enableRevealAnimation() {
  if (!("IntersectionObserver" in window)) {
    disableRevealAnimation();
    return;
  }

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px",
    }
  );

  revealNodes.forEach((node) => {
    node.classList.add("scroll-reveal");
    node.classList.remove("is-visible");
    revealObserver.observe(node);
  });
}

function syncRevealMotionPreference() {
  if (reducedMotionQuery.matches) {
    disableRevealAnimation();
    return;
  }

  enableRevealAnimation();
}

syncRevealMotionPreference();

if (typeof reducedMotionQuery.addEventListener === "function") {
  reducedMotionQuery.addEventListener("change", syncRevealMotionPreference);
} else if (typeof reducedMotionQuery.addListener === "function") {
  reducedMotionQuery.addListener(syncRevealMotionPreference);
}
