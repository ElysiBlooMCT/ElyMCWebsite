/* =====================================================================
   BỘ DỰNG TRANG
   Mỗi mục trên trang là một "module": một <section data-module="tên">
   trong index.html và một file nội dung data/tên.js.
   Sửa file trong data/ là trang tự đổi, không cần động vào HTML.
   ===================================================================== */
const SITE_DATA = window.SITE || {};
// Thông tin server từ data/site.js. Nếu file đó lỗi thì dùng tạm IP/port đang ghi sẵn trong thẻ IP của index.html.
const SERVER = {
  ip: document.getElementById("server-ip")?.textContent.trim(),
  bedrockPort: document.getElementById("bedrock-port")?.textContent.trim(),
  ...SITE_DATA.server,
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Thay {ip}, {port}, {name} bằng giá trị trong data/site.js
function fill(value) {
  return String(value)
    .replace(/\{ip\}/g, SERVER.ip ?? "")
    .replace(/\{port\}/g, SERVER.bedrockPort ?? "")
    .replace(/\{name\}/g, SERVER.name ?? "");
}

// Viết chữ thường, bọc **như vậy** để in đậm. Luôn dùng textContent nên gõ ký tự đặc biệt không sợ lỗi.
function richText(parent, value) {
  fill(value)
    .split("**")
    .forEach((part, index) => {
      if (!part) return;
      parent.append(index % 2 === 1 ? el("strong", "", part) : document.createTextNode(part));
    });
  return parent;
}

function linkButton(button) {
  const style = button.style === "secondary" ? "secondary" : "primary";
  const link = el("a", `btn btn-${style}`, button.label || "Xem thêm");
  link.href = button.url || "#";
  if (/^https?:\/\//i.test(link.getAttribute("href"))) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  return link;
}

function renderNote(parent, note) {
  if (note) parent.append(richText(el("p", "note"), note));
}

function renderSteps(steps, className) {
  const list = el("ol", className);
  steps.forEach((step) => list.append(richText(el("li"), step)));
  return list;
}

function renderAbout(data) {
  const fragment = document.createDocumentFragment();
  [].concat(data.text || []).forEach((paragraph) => fragment.append(richText(el("p"), paragraph)));
  return fragment;
}

// Dùng chung cho Chế độ chơi, Ủng hộ & Vote, Cộng đồng
function renderCards(data) {
  const grid = el("div", data.columns === 2 ? "card-grid card-grid-2" : "card-grid");
  (data.items || []).forEach((item) => {
    const card = el("article", "card");
    if (item.icon) {
      const icon = el("span", "card-icon", item.icon);
      icon.setAttribute("aria-hidden", "true");
      card.append(icon);
    }
    card.append(el("h3", "", fill(item.title || "")));
    if (item.text) card.append(richText(el("p"), item.text));
    if (item.buttons && item.buttons.length) {
      const actions = el("div", "card-actions");
      item.buttons.forEach((button) => actions.append(linkButton(button)));
      card.append(actions);
    }
    grid.append(card);
  });
  return grid;
}

function renderFeatures(data) {
  const list = el("ul", "feature-list");
  (data.items || []).forEach((item) => list.append(richText(el("li"), item)));
  return list;
}

function renderStats(data) {
  const fragment = document.createDocumentFragment();
  const grid = el("div", "card-grid stats-grid");
  (data.items || []).forEach((item) => {
    const card = el("article", "card stat");
    card.append(el("p", "stat-label", fill(item.label || "")), el("p", "stat-value", fill(item.value || "")));
    grid.append(card);
  });
  fragment.append(grid);
  renderNote(fragment, data.note);
  return fragment;
}

function renderJoin(data) {
  const fragment = document.createDocumentFragment();
  const grid = el("div", "join-grid");
  (data.platforms || []).forEach((platform) => {
    const card = el("article", "join-card");
    card.append(el("h3", "", fill(platform.name || "")), renderSteps(platform.steps || [], "steps"));
    grid.append(card);
  });
  fragment.append(grid);
  renderNote(fragment, data.note);
  return fragment;
}

function renderRules(data) {
  const fragment = document.createDocumentFragment();
  fragment.append(renderSteps(data.items || [], "steps steps-grid"));
  renderNote(fragment, data.note);
  return fragment;
}

function renderTeam(data) {
  const grid = el("div", "card-grid");
  (data.members || []).forEach((member) => {
    const card = el("article", "card member");
    const avatar = el("span", "avatar");
    avatar.setAttribute("aria-hidden", "true");
    const hint = member.avatar || "";
    if (/[./]/.test(hint)) {
      const image = el("img");
      image.src = hint;
      image.alt = "";
      avatar.append(image);
    } else {
      avatar.textContent = hint || (member.name || "?").charAt(0).toUpperCase();
    }
    card.append(avatar, el("h3", "", member.name || ""));
    if (member.role) card.append(el("p", "role", member.role));
    grid.append(card);
  });
  return grid;
}

const CHANGE_TAGS = {
  new: ["tag-new", "Mới"],
  fix: ["tag-fix", "Sửa lỗi"],
  balance: ["tag-balance", "Cân bằng"],
  change: ["tag-change", "Thay đổi"],
  remove: ["tag-remove", "Gỡ bỏ"],
};

function renderChangelog(data) {
  const list = el("ol", "changelog");
  (data.entries || []).forEach((entry) => {
    const item = el("li", "log-item");
    const head = el("div", "log-head");
    head.append(el("span", "log-version", entry.version || ""));
    if (entry.title) head.append(el("span", "log-title", entry.title));
    if (entry.date) head.append(el("span", "log-date", entry.date));
    const changes = el("ul", "log-list");
    (entry.changes || []).forEach(([type, text]) => {
      const [tagClass, tagLabel] = CHANGE_TAGS[type] || ["tag-change", String(type)];
      const row = el("li");
      row.append(el("span", `tag ${tagClass}`, tagLabel), richText(el("span", "log-text"), text || ""));
      changes.append(row);
    });
    item.append(head, changes);
    list.append(item);
  });
  return list;
}

function renderFaq(data) {
  const wrap = el("div", "faq-list");
  (data.items || []).forEach((item) => {
    const details = el("details");
    details.append(el("summary", "", fill(item.q || "")), richText(el("p"), item.a || ""));
    wrap.append(details);
  });
  return wrap;
}

// Tên module (khớp data-module trong index.html và file data/tên.js) -> hàm dựng
const MODULE_RENDERERS = {
  about: renderAbout,
  modes: renderCards,
  features: renderFeatures,
  stats: renderStats,
  join: renderJoin,
  rules: renderRules,
  team: renderTeam,
  changelog: renderChangelog,
  support: renderCards,
  community: renderCards,
  faq: renderFaq,
};

function buildModules() {
  const navLinks = document.getElementById("nav-links");

  document.querySelectorAll("[data-module]").forEach((section) => {
    const name = section.dataset.module;
    const data = SITE_DATA[name];
    const render = MODULE_RENDERERS[name];

    if (!data || !render) {
      section.hidden = true;
      console.warn(`Module "${name}" bị ẩn: thiếu data/${name}.js hoặc file đang bị lỗi cú pháp.`);
      return;
    }

    try {
      const container = el("div", "container");
      if (data.title) {
        const heading = el("h2", "", fill(data.title));
        heading.id = `${name}-title`;
        container.append(heading);
        section.setAttribute("aria-labelledby", heading.id);
      }
      container.append(render(data));
      section.id = name;
      section.append(container);

      if (data.nav && navLinks) {
        const item = el("li");
        const link = el("a", "", data.nav);
        link.href = `#${name}`;
        item.append(link);
        navLinks.append(item);
      }
    } catch (error) {
      section.hidden = true;
      section.replaceChildren();
      console.error(`Module "${name}" bị ẩn vì lỗi nội dung:`, error);
    }
  });
}

// Thẻ IP ở đầu trang lấy dữ liệu từ data/site.js
function fillHero() {
  const ip = document.getElementById("server-ip");
  if (ip && SERVER.ip) ip.textContent = SERVER.ip;

  const port = document.getElementById("bedrock-port");
  if (port && SERVER.bedrockPort) port.textContent = SERVER.bedrockPort;

  const chips = document.querySelector(".panel-meta");
  if (chips && Array.isArray(SERVER.chips)) {
    chips.replaceChildren(...SERVER.chips.map((label) => el("li", "", label)));
  }
}

fillHero();
buildModules();

/* ===================================================================== */

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
