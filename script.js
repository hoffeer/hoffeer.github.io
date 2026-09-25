// ==============================
// CONFIGURACIÓN DEL PROYECTO
// ==============================
// Cambiá estos valores para personalizar la página.

const CONFIG = {
  alias: "Stella.info",
  recaudado: 126000,
  objetivo: 2000000
};

// Elementos
const aliasElement = document.getElementById("alias");
const copyBtn = document.getElementById("copyBtn");
const copyMainBtn = document.getElementById("copyMainBtn");
const shareBtn = document.getElementById("shareBtn");
const toast = document.getElementById("toast");
const status = document.getElementById("status");
const progress = document.getElementById("progress");
const percentage = document.getElementById("percentage");
const raised = document.getElementById("raised");
const goal = document.getElementById("goal");

// Aplicar configuración
aliasElement.textContent = CONFIG.alias;
raised.textContent = formatMoney(CONFIG.recaudado);
goal.textContent = formatMoney(CONFIG.objetivo);

const percent = Math.min(
  100,
  Math.round((CONFIG.recaudado / CONFIG.objetivo) * 100)
);

progress.style.width = percent + "%";
percentage.textContent = percent + "%";

function formatMoney(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(value);
}

async function copyAlias() {
  const alias = CONFIG.alias;

  try {
    await navigator.clipboard.writeText(alias);
  } catch (error) {
    // Método alternativo para navegadores que no permiten clipboard API.
    const textarea = document.createElement("textarea");
    textarea.value = alias;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  status.textContent = "✓ Alias copiado. Ya podés pegarlo en tu billetera.";
  showToast();
}

function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

copyBtn.addEventListener("click", copyAlias);
copyMainBtn.addEventListener("click", copyAlias);

shareBtn.addEventListener("click", async () => {
  const shareData = {
    title: "Stella ST",
    text: "Ayudanos a hacer realidad el proyecto Stella ST 🚀",
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      // El usuario canceló el menú de compartir.
    }
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      status.textContent = "✓ Link de la página copiado.";
      showToast();
    } catch (error) {
      alert("Copiá el enlace de la página desde la barra del navegador.");
    }
  }
});
