document.getElementById("calcForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const dados = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    const resposta = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (resposta.ok) {
        window.location.href = "sucesso.html";
    } else {
        window.location.href = "falha.html";
    }
});