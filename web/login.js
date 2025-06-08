import { config } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.querySelector("#email");
  const senhaInput = document.querySelector("#senha");
  const erroMsg = document.querySelector("#erro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const senha = senhaInput.value;

    try {
      const response = await fetch(`${config.BASE_URL}/posto/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) throw new Error("Erro ao logar");

      const data = await response.json();

      localStorage.setItem("id_posto", data.posto.id);
      window.location.href = "agendamento.html";
    } catch (error) {
      erroMsg.textContent = "Erro ao conectar com o servidor.";
      console.error("Erro no login:", error);
    }
  });
});
