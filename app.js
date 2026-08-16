(() => {
  "use strict";

  const cfg = window.DMVCAT_CONFIG;

  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => {
    const el = $(selector);
    if (el && value) el.textContent = value;
  };

  setText("[data-token-name]", cfg.token.name);
  setText("[data-token-ticker]", cfg.token.ticker);
  setText("[data-chain]", cfg.token.chain);
  setText("[data-ticket]", cfg.trading.ticket);
  setText("[data-ca]", cfg.token.contractAddress || "CONTRACT ADDRESS NOT SET");

  const buy = $("[data-buy]");
  if (buy) {
    if (cfg.links.pumpFun) {
      buy.href = cfg.links.pumpFun;
      buy.removeAttribute("aria-disabled");
    } else {
      buy.href = "#contract";
      buy.setAttribute("aria-disabled", "true");
      buy.addEventListener("click", (e) => {
        e.preventDefault();
        alert("The Pump.fun URL has not been configured yet.");
      });
    }
  }

  for (const [selector, key] of [
    ["[data-x]", "x"],
    ["[data-telegram]", "telegram"],
  ]) {
    const el = $(selector);
    if (!el) continue;
    if (cfg.links[key]) {
      el.href = cfg.links[key];
      el.removeAttribute("aria-disabled");
    } else {
      el.href = "#footer";
      el.setAttribute("aria-disabled", "true");
      el.title = "Social link not configured";
    }
  }

  // Load the real DexScreener embed only when explicitly enabled and configured.
  const chartFallback = $("#chart-fallback");
  const chartFrame = $("#chart-frame");
  if (cfg.trading.dexScreenerEnabled && cfg.trading.dexScreenerEmbedUrl) {
    chartFallback.hidden = true;
    chartFrame.hidden = false;
    chartFrame.src = cfg.trading.dexScreenerEmbedUrl;
  }

  const ca = cfg.token.contractAddress.trim();
  const copyButton = $("[data-copy-ca]");
  const copyStatus = $("[data-copy-status]");

  async function copyCA() {
    if (!ca) {
      copyStatus.textContent = "Contract address not configured";
      copyStatus.dataset.state = "error";
      return;
    }
    try {
      await navigator.clipboard.writeText(ca);
    } catch {
      const area = document.createElement("textarea");
      area.value = ca;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    copyStatus.textContent = "Copied";
    copyStatus.dataset.state = "success";
    clearTimeout(window.__copyTimer);
    window.__copyTimer = setTimeout(() => {
      copyStatus.textContent = "";
      copyStatus.dataset.state = "";
    }, 1800);
  }
  copyButton?.addEventListener("click", copyCA);

  const assets = cfg.assets || [];
  const gallery = $("#gallery");
  if (gallery) {
    gallery.innerHTML = assets.map((asset) => `
      <article class="asset-card">
        <div class="asset-preview">
          <img src="${asset.file}" alt="${asset.name}" loading="lazy">
        </div>
        <div class="asset-meta">
          <div>
            <strong>${asset.name}</strong>
            <span>${asset.type || "Asset"}</span>
          </div>
          <a class="text-link" href="${asset.download || asset.file}" download>Download</a>
        </div>
      </article>
    `).join("");
  }

  document.querySelectorAll("[data-faq]").forEach((item) => {
    const button = item.querySelector("button");
    button.addEventListener("click", () => {
      const open = item.hasAttribute("open");
      document.querySelectorAll("[data-faq][open]").forEach((x) => x.removeAttribute("open"));
      if (!open) item.setAttribute("open", "");
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      target?.focus({ preventScroll: true });
    });
  });

  // Footer year.
  setText("[data-year]", String(new Date().getFullYear()));
})();
