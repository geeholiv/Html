function carregarCategoriasHome() {
    fetch("http://localhost:8080/categoria")
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById("categoriasHome");
            lista.innerHTML = "";

            data.forEach(cat => {
                lista.innerHTML += `
                    <div class="text-center">
                        <img src="${cat.imagem}" 
                             class="w-52 h-52 object-cover rounded-xl shadow-lg mx-auto">

                        <p class="mt-3 font-semibold text-lg">
                            ${cat.nome}
                        </p>
                    </div>
                `;
            });
        });
}

carregarCategoriasHome();