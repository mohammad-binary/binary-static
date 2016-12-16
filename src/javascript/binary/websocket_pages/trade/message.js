var TradingAnalysis   = require('./analysis').TradingAnalysis;
var displayCurrencies = require('./currency').displayCurrencies;
var Notifications     = require('./notifications').Notifications;
var Purchase          = require('./purchase').Purchase;
var Symbols           = require('./symbols').Symbols;
var Tick              = require('./tick').Tick;
var PortfolioWS = require('../user/account/portfolio/portfolio.init').PortfolioWS;
var ProfitTableWS = require('../user/account/profit_table/profit_table.init').ProfitTableWS;
var StatementWS = require('../user/account/statement/statement.init').StatementWS;
var State = require('../../base/storage').State;
var GTM = require('../../base/storage').GTM;

/*
 * This Message object process the response from server and fire
 * events based on type of response
 */
var Message = (function () {
    'use strict';

    var process = function (msg) {
        var response = JSON.parse(msg.data);
        if (!State.get('is_trading')) {
            forgetTradingStreams();
            return;
        }
        if (response) {
            var type = response.msg_type;
            if (type === 'active_symbols') {
                processActiveSymbols(response);
            } else if (type === 'contracts_for') {
                Notifications.hide('CONNECTION_ERROR');
                processContract(response);
                window.contracts_for = response;
            } else if (type === 'payout_currencies' && response.hasOwnProperty('echo_req') && (!response.echo_req.hasOwnProperty('passthrough') || !response.echo_req.passthrough.hasOwnProperty('handler'))) {
                page.client.set_storage_value('currencies', response.payout_currencies);
                displayCurrencies();
                Symbols.getSymbols(1);
            } else if (type === 'proposal') {
                processProposal(response);
            } else if (type === 'buy') {
                Purchase.display(response);
                GTM.push_purchase_data(response);
            } else if (type === 'tick') {
                processTick(response);
            } else if (type === 'history') {
                var digit_info = TradingAnalysis.digit_info();
                if (response.req_id === 1 || response.req_id === 2) {
                    digit_info.show_chart(response.echo_req.ticks_history, response.history.prices);
                } else                    {
                    Tick.processHistory(response);
                }
            } else if (type === 'trading_times') {
                processTradingTimes(response);
            } else if (type === 'statement') {
                StatementWS.statementHandler(response);
            } else if (type === 'profit_table') {
                ProfitTableWS.profitTableHandler(response);
            } else if (type === 'error') {
                $('.error-msg').text(response.error.message);
            } else if (type === 'portfolio') {
                PortfolioWS.updatePortfolio(response);
            } else if (type === 'proposal_open_contract') {
                PortfolioWS.updateIndicative(response);
            } else if (type === 'transaction') {
                PortfolioWS.transactionResponseHandler(response);
            }
        } else {
            console.log('some error occured');
        }
    };

    return {
        process: process,
    };
})();

module.exports = {
    Message: Message,
};
