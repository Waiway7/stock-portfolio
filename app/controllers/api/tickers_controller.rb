class Api::TickersController < ApplicationController

    def show
        @quote = Stock.quote(params[:id])
        if (@quote["Note"])
            render json: {"error": quoteData["Note"]}, status: 402
            return;
        end
        if (@quote["Global Quote"])
            @symbol = @quote["Global Quote"]['01. symbol']
            @open = @quote["Global Quote"]['02. open']
            @price = @quote["Global Quote"]['05. price']
            @company = Stock.company(params[:id])["bestMatches"][0]["2. name"]
            render "api/stocks/show"
        else 
            render json: {error:'Invalid Ticker. Please Retry Again'}, status: 404
        end
    end

    def index 
        owned_stocks = Stock.all.where(user_id: current_user.id)
        @data = {}
        owned_stocks.each {|stock|
            quoteData = Stock.quote((stock.ticker))
            if (quoteData["Note"])
                render json: {"error": quoteData["Note"]}, status: 402
                return;
            end
            @data[stock.id] = {
                ticker: stock.ticker,
                current_price: quoteData["Global Quote"]['05. price'],
                open: quoteData["Global Quote"]['02. open']
            }
        }
        render "api/tickers/index"
    end
end
