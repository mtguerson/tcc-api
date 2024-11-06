"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.financesBotToolsPrompt = exports.financesBotPrompt = void 0;
function financesBotPrompt({ checkingAccounts, categories, }) {
    return [
        {
            role: 'assistant',
            content: 'Você é um chatbot de finanças que ajuda a registrar transações financeiras. Você deve coletar: valor, categoria, conta corrente e tipo (Entrada ou Saída). ',
        },
        {
            role: 'assistant',
            content: `Estas são suas categorias disponíveis (Não exiba o ID para o usuário) Mostre para ele em forma de lista:
      ${categories.map((category) => `- ${category.name} (ID: ${category.id})`).join('\n')}`,
        },
        {
            role: 'assistant',
            content: `Estas são suas contas correntes disponíveis (Não exiba o ID para o usuário) Mostre para ele em forma de lista:
      ${checkingAccounts.map((checkingAccount) => `- ${checkingAccount.name} (ID: ${checkingAccount.id})`).join('\n')}`,
        },
        {
            role: 'assistant',
            content: `Para registrar uma transação, siga este processo: 1. Pergunte o valor da transação 2. Pergunte o tipo (Entrada ou Saída) 3. Mostre as categorias disponíveis e peça para escolher uma 4. Mostre as contas correntes disponíveis e peça para escolher uma 5. Confirme os dados com o usuário 6. Se confirmado, chame a funcão handelTransaction(), o nome da transação gere com base no contexto a data `,
        },
        {
            role: 'assistant',
            content: 'Se faltar qualquer informação, peça educadamente ao usuário. Se uma categoria ou conta não existir, informe ao usuário.',
        },
        {
            role: 'assistant',
            content: 'Depois de chamar a função handelTransaction(), pergunte ao usuário se ele deseja registrar outra transação ou encerrar a sessão. Para encerrar a sessão, o usuário deve digitar "sair".',
        },
    ];
}
exports.financesBotPrompt = financesBotPrompt;
function financesBotToolsPrompt() {
    return [
        {
            type: 'function',
            function: {
                name: 'handelTransaction',
                description: 'Cria um registro de transação financeira',
                parameters: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nome ou descrição da transação',
                        },
                        value: {
                            type: 'number',
                            description: 'O valor monetário da transação',
                        },
                        balanceAdjustment: {
                            type: 'boolean',
                            description: 'Será sempre falso, pois não é um ajuste de saldo',
                        },
                        type: {
                            type: 'string',
                            description: 'Tipo da transação, ex: INCOME, OUTCOME',
                        },
                        checkingAccountId: {
                            type: 'string',
                            description: 'ID opcional da conta corrente associada',
                        },
                        categoryId: {
                            type: 'string',
                            description: 'ID opcional da categoria da transação',
                        },
                    },
                    required: ['name', 'value', 'balanceAdjustment', 'type'],
                },
            },
        },
    ];
}
exports.financesBotToolsPrompt = financesBotToolsPrompt;
