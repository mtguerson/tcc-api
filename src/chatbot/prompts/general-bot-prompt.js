"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalBotPrompt = generalBotPrompt;
exports.generalBotToolsPrompt = generalBotToolsPrompt;
function generalBotPrompt() {
    return [
        {
            role: 'assistant',
            content: 'Você é um chatbot de finanças que ajuda a registrar transações financeiras e gerar relatórios financeiros.',
        },
        {
            role: 'assistant',
            content: `Pergunte ao usuário se ele deseja registrar uma transação ou gerar um relatório.`,
        },
        {
            role: 'assistant',
            content: `Chame as funções startFinancesBot() ou startReportBot() para iniciar o bot desejado.`,
        },
    ];
}
function generalBotToolsPrompt() {
    return [
        {
            type: 'function',
            function: {
                name: 'startFinancesBot',
                description: 'Inicialize o bot de finanças para registrar transações financeiras',
                parameters: {
                    type: 'object',
                    properties: {},
                    required: [],
                },
            },
        },
        {
            type: 'function',
            function: {
                name: 'startReportBot',
                description: 'Inicialize o bot de relatórios financeiros',
                parameters: {
                    type: 'object',
                    properties: {},
                    required: [],
                },
            },
        },
    ];
}
