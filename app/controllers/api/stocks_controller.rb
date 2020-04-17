class Api::StocksController < ApplicationController


    def index 
        @stocks = Stock.all.where(user_id: current_user.id).where("shares > 0")
        render "api/stocks/index"
    end

  

    def create
        if (stock_params[:qty].to_f == 0 || stock_params[:qty].to_f % 1 != 0)
            render json: [error_qty: "Please enter a valid quantity"], status: 420
            return;
        end
        if (stock_params[:trans] == "buy" && current_user.balance < stock_params[:totalPrice].to_f)
            render json: {error_fund: 'Insufficient Funds'}, status: 404
            return;
        end

        stock_ticker = Stock.where(ticker: stock_params[:ticker], user_id: current_user.id)
            if (stock_ticker.length() > 0)
                @stock = stock_ticker[0]
                qty = 0
                if (stock_params[:trans] == "buy")
                    qty = @stock.shares + stock_params[:qty].to_i
                else 
                    qty = @stock.shares - stock_params[:qty].to_i
                end
                if (qty >= 0 && @stock.update(shares: qty))
                    render "api/stocks/stock_show"
                    return;
                else 
                    render json: {error_qty: "No shares in security"}
                    return;
                end
            end
            @stock = Stock.new(company: stock_params[:company], ticker: stock_params[:ticker], user_id: current_user.id, shares: stock_params[:qty])
            if (@stock.save)
                render "api/stocks/stock_show"
                return;
            else 
                render json: {error_qty: "Please enter a valid quantity"}, status: 401
            end
            
    end

    private

    def stock_params
        params.require(:stock).permit(:company, :ticker, :user_id, :qty, :totalPrice, :current_price, :trans, :total_price, :error)
    end
end
