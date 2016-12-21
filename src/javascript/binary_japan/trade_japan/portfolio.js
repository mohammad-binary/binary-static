var State = require('../../binary/base/storage').State;
var PortfolioWS = require('../../binary/websocket_pages/user/account/portfolio/portfolio.init').PortfolioWS;

var JapanPortfolio = (function() {
    var $portfolio;
    var isPortfolioActive = false;

    function init() {
        if (isActive()) {
            $('#tab_portfolio').removeClass('invisible');
        }

        var $container = $('#tab_portfolio-content');
        $portfolio = $portfolio || $('#portfolio');

        if ($portfolio &&
      (!$('#portfolio').parent().length ||
        $('#portfolio').parent().get(0).id !== 'tab_portfolio-content')) {
            $portfolio.detach();
            $container.append($portfolio);
        }
    }

    function show() {
        if (isTradePage() && !isPortfolioActive) {
            PortfolioWS.onLoad();
            isPortfolioActive = true;
        }
    }

    function isActive() {
        if (page.client.is_logged_in && isTradePage()) {
            return true;
        }
        return false;
    }

    function hide() {
        if (isTradePage() && isPortfolioActive) {
            PortfolioWS.onUnload();
            isPortfolioActive = false;
        }
    }

    function isTradePage() {
        return State.get('is_mb_trading');
    }

    return {
        init    : init,
        show    : show,
        hide    : hide,
        isActive: isActive,
    };
})();

module.exports = {
    JapanPortfolio: JapanPortfolio,
};
