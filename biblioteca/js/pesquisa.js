// Lista da biblioteca
const biblioteca = [
    "Eleanor & Grey",
    "O Rei Perverso",
    "Orgulho e Preconceito",
    "A Garota do Lago",
    "O Pequeno Príncipe",
    "Dom Casmurro",
    "O Príncipe Cruel",
    "A Rainha do Nada",
    "Caraval",
    "A Rainha Vermelha",
    "O Que Aconteceu Com Annie",
    "A Empregada",
    "A Mulher da Janela",
    "Um de Nós Está Mentindo",
    "A Hipótese do Amor",
    "Uma Farça de Amor na Espanha",
    "Teto para Dois",
    "Iracema",
    "Dom Quixote",
    "O Cortiço"
];

document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("botaoBusca");
    const campo = document.getElementById("campoBusca");

    botao.addEventListener("click", function () {

        const texto = campo.value.trim().toLowerCase();

        if (texto === "") {
            alert("Digite o nome de um livro.");
            return;
        }

        const encontrado = biblioteca.some(
            livro => livro.toLowerCase() === texto
        );

        if (encontrado) {
            alert("📚 O livro está na biblioteca!");
        } else {
            alert("❌ O livro NÃO está na biblioteca.");
        }
    });
});
