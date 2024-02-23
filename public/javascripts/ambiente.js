// Data atual
const dataAtual = new Date();

// Data de destino (10 de agosto de 2024 às 18:00)
const dataDestino = new Date(2024, 7, 10, 18, 0, 0); // Mês é 0-based, então 7 representa agosto.

// Calcular a diferença em milissegundos
const diferencaEmMilissegundos = dataDestino - dataAtual;

// Calcular dias, horas, minutos e segundos
let diasFaltando = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
let horasFaltando = Math.floor((diferencaEmMilissegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutosFaltando = Math.floor((diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60));
let segundosFaltando = Math.floor((diferencaEmMilissegundos % (1000 * 60)) / 1000);

console.log("Faltam", diasFaltando, "dias,", horasFaltando, "horas,", minutosFaltando, "minutos e", segundosFaltando, "segundos até as 18:00 do dia 10 de agosto de 2024.");
