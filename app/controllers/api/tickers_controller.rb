class Api::TickersController < ApplicationController

    def show
        @quote = Stock.quote(params[:id])
        if (@quote)
            @symbol = @quote["symbol"]
            @price = @quote["latestPrice"]
            @latestUpdate = @quote["latestUpdate"]
            @company = @quote["companyName"]
            @open = @quote["open"]
            @prevClose = @quote["previousClose"]
            render "api/stocks/show"
        else 
            render json: {error:'Invalid Ticker. Please Retry Again'}, status: 404
        end
    end

    def index 
        owned_stocks = Stock.all.where(user_id: current_user.id)
        @data = {}
        query_string = ""
        owned_stocks.each_with_index {|stock, index|
            query_string += stock.ticker
            if (index + 1 != owned_stocks)
                query_string += ","
            end
        }
        
        stocks = Stock.batch(query_string);
        owned_stocks.each {|stock|
            @data[stock.id] = {
                ticker: stock.ticker,
                current_price: stocks[stock.ticker]["quote"]["latestPrice"],
                open: stocks[stock.ticker]["quote"]["open"],
                prevClose: stocks[stock.ticker]["quote"]["previousClose"]
            }
        }

        render "api/tickers/index"
    end
end
