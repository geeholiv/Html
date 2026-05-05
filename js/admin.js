console.log("JS carregado");
const form = document.getElementById("categoriaForm");
const mensagem = document.getElementById("mensagem");

let imagemBase64 = "";


// PREVIEW DA IMAGEM

document.getElementById("fotoInput").addEventListener("change", function (e) {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagemBase64 = e.target.result;

            const preview = document.getElementById("preview");
            preview.src = imagemBase64;
            preview.classList.remove("hidden");
        };

        reader.readAsDataURL(file);
    }
});


// LISTAR CATEGORIAS

function listarCategorias() {
    fetch("http://localhost:8080/categoria")
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById("listaCategorias");
            lista.innerHTML = "";

            data.forEach(cat => {
                lista.innerHTML += `
                    <div class="bg-white p-4 rounded-xl shadow text-center">
                        
                        <img src="${cat.imagem}" 
                             class="w-24 h-24 object-cover mx-auto rounded-lg">

                        <p class="mt-2 font-bold">${cat.nome}</p>

                        <div class="flex justify-center gap-2 mt-3">

                            <button onclick="editar(${cat.id})"
                                class="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500">
                                Editar
                            </button>

                            <button onclick="deletar(${cat.id})"
                                class="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500">
                                Excluir
                            </button>

                        </div>
                    </div>
                `;
            });
        });
}


// EDITAR
function editar(id) {
    fetch(`http://localhost:8080/categoria/${id}`)
        .then(res => res.json())
        .then(cat => {
            document.getElementById("id").value = cat.id;
            document.getElementById("nome").value = cat.nome;
            document.getElementById("descricao").value = cat.descricao;

            imagemBase64 = cat.imagem;

            const preview = document.getElementById("preview");
            preview.src = cat.imagem;
            preview.classList.remove("hidden");
        });
}


// DELETAR
function deletar(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    fetch(`http://localhost:8080/categoria/${id}`, {
        method: "DELETE"
    })
    .then(() => listarCategorias());
}


// SALVAR (POST / PUT)
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("id").value;

    const categoria = {
        nome: document.getElementById("nome").value,
        descricao: document.getElementById("descricao").value,
        ativo: true,
        imagem: imagemBase64
    };

    const url = id
        ? `http://localhost:8080/categoria/${id}`
        : "http://localhost:8080/categoria";

    const method = id ? "PUT" : "POST";

    fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoria)
    })
    .then(res => {
        if (!res.ok) throw new Error();

        mensagem.innerHTML = "<span class='text-green-600'>Salvo com sucesso!</span>";

        form.reset();
        document.getElementById("preview").classList.add("hidden");
        document.getElementById("id").value = "";
        imagemBase64 = "";

        listarCategorias();
    })
    .catch(() => {
        mensagem.innerHTML = "<span class='text-red-500'>Erro ao salvar.</span>";
    });
});

listarCategorias();