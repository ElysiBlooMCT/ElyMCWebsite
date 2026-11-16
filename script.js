/* =====================================================================
   BỘ DỰNG TRANG
   Website gồm nhiều trang: trang chủ (/) và mỗi mục một thư mục riêng
   (/rules/, /join/, ...). Mỗi trang chỉ cần khai báo các module nó dùng:
       <section data-module="rules"></section>
   script.js tự nạp data/site.js và data/<module>.js rồi dựng nội dung,
   cùng header (logo + menu) và footer dùng chung.
   Sửa file trong data/ là trang tự đổi, không cần động vào HTML.
   ===================================================================== */

// Thư mục chứa script.js = gốc của website ("/" hoặc "/tên-repo/")
const ROOT = (() => {
  const src = document.currentScript && document.currentScript.src;
  return src ? new URL(".", src).pathname : "/";
})();

window.SITE = window.SITE || {};
const SITE_DATA = window.SITE;
let SERVER = {}; // thông tin server từ data/site.js, gán sau khi nạp xong

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Link nội bộ viết dạng "/rules/" sẽ được gắn thêm thư mục gốc; link ngoài hoặc "#" giữ nguyên
function siteUrl(path) {
  if (typeof path === "string" && path.startsWith("/") && !path.startsWith("//")) {
    return ROOT + path.slice(1);
  }
  return path;
}

function loadData(name) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `${ROOT}data/${name}.js`;
    script.onload = script.onerror = () => resolve();
    document.head.append(script);
  });
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
  link.href = siteUrl(button.url || "#");
  if (/^https?:\/\//i.test(String(button.url || ""))) {
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

// Dùng chung cho Trang chủ, Chế độ chơi, Ủng hộ & Vote, Cộng đồng
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
      image.src = siteUrl(hint.startsWith("http") || hint.startsWith("/") ? hint : `/${hint}`);
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

// Tên module (khớp data-module trong HTML và file data/tên.js) -> hàm dựng
const MODULE_RENDERERS = {
  home: renderCards,
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

// Trang hiện tại so với thư mục gốc: "" (trang chủ), "rules", "join"...
function currentSlug() {
  const path = location.pathname;
  const relative = path.startsWith(ROOT) ? path.slice(ROOT.length) : path.replace(/^\//, "");
  return relative.replace(/index\.html$/, "").replace(/\/+$/, "");
}

const slugOf = (url) => String(url || "").replace(/^\/+|\/+$/g, "");

// Link cũ dạng /#rules trên trang chủ -> chuyển sang /rules/
function redirectLegacyHash() {
  const legacy = location.hash.slice(1);
  if (!legacy || currentSlug() !== "") return false;
  const alias = { features: "about", stats: "about" };
  const target = alias[legacy] || legacy;
  const hit = (SITE_DATA.nav || []).find((item) => slugOf(item.url) === target);
  if (!hit) return false;
  location.replace(siteUrl(hit.url));
  return true;
}

// Header (logo + menu) và footer dùng chung cho mọi trang
function renderShell() {
  const name = SERVER.name || "ElysiBlooMCT";

  const header = document.querySelector(".site-header");
  if (header) {
    const wrap = el("div", "container nav-wrap");
    const brand = el("a", "brand");
    brand.href = ROOT;
    brand.setAttribute("aria-label", `${name} trang chủ`);
    const logo = el("img", "brand-logo");
    logo.src = `${ROOT}logo.png`;
    logo.width = 960;
    logo.height = 181;
    logo.alt = name;
    brand.append(logo);

    const nav = el("nav");
    nav.setAttribute("aria-label", "Điều hướng chính");
    const list = el("ul", "nav-links");
    const here = currentSlug();
    (SITE_DATA.nav || []).forEach((item) => {
      const li = el("li");
      const link = el("a", "", item.label || "");
      link.href = siteUrl(item.url || "/");
      if (slugOf(item.url) && slugOf(item.url) === here) link.setAttribute("aria-current", "page");
      li.append(link);
      list.append(li);
    });
    nav.append(list);
    wrap.append(brand, nav);
    header.append(wrap);
  }

  const footer = document.querySelector(".site-footer");
  if (footer) {
    const wrap = el("div", "container footer-wrap");
    wrap.append(el("p", "", `© ${new Date().getFullYear()} ${name}. Crafted with pink magic.`));
    const top = el("a", "", "Lên đầu trang");
    top.href = "#top";
    wrap.append(top);
    footer.append(wrap);
  }
}

function buildModules() {
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
        const heading = el(section.dataset.heading === "h1" ? "h1" : "h2", "section-title", fill(data.title));
        heading.id = `${name}-title`;
        container.append(heading);
        section.setAttribute("aria-labelledby", heading.id);
      }
      container.append(render(data));
      section.id = name;
      section.append(container);
    } catch (error) {
      section.hidden = true;
      section.replaceChildren();
      console.error(`Module "${name}" bị ẩn vì lỗi nội dung:`, error);
    }
  });
}

// Thẻ IP ở trang chủ lấy dữ liệu từ data/site.js
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

function initCopyButton() {
  const copyButton = document.getElementById("copy-ip-btn");
  const copyStatus = document.getElementById("copy-status");
  const serverIpNode = document.getElementById("server-ip");
  if (!copyButton || !copyStatus || !serverIpNode) return;

  copyButton.addEventListener("click", async () => {
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
  });
}

function initRevealAnimation() {
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
}

async function main() {
  const modules = [...document.querySelectorAll("[data-module]")].map((node) => node.dataset.module);
  await Promise.all([...new Set(["site", ...modules])].map(loadData));

  // Nếu data/site.js lỗi, dùng tạm IP/port đang ghi sẵn trong thẻ IP ở trang chủ
  SERVER = {
    ip: document.getElementById("server-ip")?.textContent.trim(),
    bedrockPort: document.getElementById("bedrock-port")?.textContent.trim(),
    ...SITE_DATA.server,
  };

  if (redirectLegacyHash()) return;

  renderShell();
  fillHero();
  buildModules();
  initCopyButton();
  initRevealAnimation();
}

main();
