document.getElementById("photoForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  document.getElementById("status").textContent = "Enviando...";

  try {
    const response = await fetch("/send", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    document.getElementById("status").textContent = result.message;
  } catch (error) {
    document.getElementById("status").textContent = "Error al enviar.";
  }
});
