class Api::TransactionsController < ApplicationController


    def index
        @transactions = Transaction.all.where(user_id: current_user.id)
        render "api/transactions/index"
    end

    def create
        data = params[:transaction]
        @stock = Stock.where(ticker: data[:ticker], user_id: current_user.id)
        if (current_user.balance > data[:current_price].to_f * data[:qty].to_i || data[:trans] == "sell" && @stock.shares - data[:qty].to_i >= 0 )
            @transaction = Transaction.new(company: data[:company], ticker: data[:ticker], amount: data[:qty], 
                                         user_id: current_user.id, price: data[:current_price], action: data[:trans])
            if (@transaction.save)
                render "api/transactions/show"
            end
        else 
            render json: {error: 'Insufficient Funds'}, status: 404
        end

    end


end