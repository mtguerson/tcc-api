"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalBotToolsPrompt = exports.generalBotPrompt = void 0;
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
exports.generalBotPrompt = generalBotPrompt;
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
exports.generalBotToolsPrompt = generalBotToolsPrompt;
