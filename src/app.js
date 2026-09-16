const API_URL = "http://localhost:3000"; // Ajuste para a porta onde seu servidor Express está rodando

export async function salvarAgendamento(dadosAgendamento) {
    const response = await fetch(`${API_URL}/agendamentos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAgendamento),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Erro ao salvar agendamento");
    }

    return result;
}