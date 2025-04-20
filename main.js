function abrirAba(id) {
    document.querySelectorAll(".tab-content").forEach(div => div.classList.remove("active"));
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    document.querySelector(`[onclick="abrirAba('${id}')"]`).classList.add("active");
}

const corpoTabela = document.getElementById("corpoTabela");
const form = document.getElementById("formTarefa");

function obterDiaSemana(dataString) {
    const [dia, mes, ano] = dataString.split("/").map(Number);
    const data = new Date(`20${ano}-${mes}-${dia}`);
    const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    return dias[data.getDay()];
}

function carregarTarefas() {
    corpoTabela.innerHTML = "";
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const tarefasComIndice = tarefas.map((t, i) => ({ ...t, originalIndex: i }));
    tarefasComIndice.sort((a, b) => {
        const [d1, m1, a1] = a.data.split("/").map(Number);
        const [d2, m2, a2] = b.data.split("/").map(Number);
        return new Date(2000 + a1, m1 - 1, d1) - new Date(2000 + a2, m2 - 1, d2);
    });
    tarefasComIndice.forEach(t => {
        const tr = document.createElement("tr");
        const diaSemana = obterDiaSemana(t.data);
        tr.innerHTML = `
            <td>${t.data}</td>
            <td>${diaSemana}</td>
            <td>${t.materia}</td>
            <td>${t.tipo}</td>
            <td>${t.tarefa}</td>
            <td><button onclick="excluirTarefa(${t.originalIndex})">Excluir</button></td>
        `;
        corpoTabela.appendChild(tr);
    });
}

function excluirTarefa(indice) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
        tarefas.splice(indice, 1);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        carregarTarefas();
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = document.getElementById("data").value;
    const materia = document.getElementById("materia").value;
    const tipo = document.getElementById("tipo").value;
    const tarefa = document.getElementById("tarefa").value;

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push({ data, materia, tipo, tarefa });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    alert("Tarefa adicionada com sucesso!");
    form.reset();
    carregarTarefas();
});

carregarTarefas();
