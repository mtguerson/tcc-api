"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportBotPrompt = reportBotPrompt;
function reportBotPrompt({ checkingAccounts, categories, transactions, }) {
    const categoriesFormatted = categories
        .map((category) => `- ${category.name}`)
        .join('\n');
    const checkingAccountsFormatted = checkingAccounts
        .map((checkingAccount) => `- ${checkingAccount.name}\n Saldo Final: ${checkingAccount.balance}`)
        .join('\n');
    const transactionsFormatted = transactions
        .map((transaction) => `Nome: ${transaction.name}\n Valor: ${transaction.value}\n Data: ${new Date(transaction.date).toLocaleString('pt-BR')}\n Tipo: ${transaction.type}\n Categoria: ${transaction.categories.name}\n Conta: ${transaction.checkingAccounts.name}`)
        .join('\n');
    return [
        {
            role: 'assistant',
            content: 'Você é um chatbot de finanças que gera relatários financeiros.',
        },
        {
            role: 'assistant',
            content: `Antes de gerar o relatório, peça ao usuário para escolher um tipo de relatório isso será um campo aberto não precisa sugerir opções.`,
        },
        {
            role: 'assistant',
            content: 'Se faltar qualquer informação, informe ao usuário que não é possível gerar o relatório. Se uma categoria ou conta não existir, informe ao usuário.',
        },
        {
            role: 'assistant',
            content: 'Após coletar essas informações, gere o relatório em um formato de texto para ser lido no telegram. Com base nos seguintes dados:',
        },
        {
            role: 'assistant',
            content: `Estas são suas categorias disponíveis:
        ${categoriesFormatted}`,
        },
        {
            role: 'assistant',
            content: `Estas são suas contas correntes disponíveis:
        ${checkingAccountsFormatted}`,
        },
        {
            role: 'assistant',
            content: `Estes são as transações disponíveis:
        ${transactionsFormatted}`,
        },
        {
            role: 'assistant',
            content: 'Após gerar o relatório, envie o relatório para o usuário e pergunte se ele deseja gerar outro relatório. Ou se deseja encerrar a sessão. Para encerrar a sessão, Digite Sair.',
        },
    ];
}
