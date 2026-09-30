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
