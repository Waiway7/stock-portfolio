class Api::UsersController < ApplicationController


    def index
        @users = User.all
        render "api/users/index"
    end

    def show
        @user = User.find(params[:id])
        render "api/users/show"
    end

    def create 
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = current_user
        
        if (params[:trans] == "sell")
            if (current_user.update(balance: current_user.balance + params[:total_price].to_f))
                render "api/users/show"
            end
        else
            if (current_user.balance > params[:total_price].to_f)
                if (current_user.update(balance: current_user.balance - params[:total_price].to_f))
                    render "api/users/show"
                end
            else
                render json: {error: 'Insufficient Funds'}, status: 404
            end
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :username, :total_price, :trans)
    end

    def balance_params
        params.require(:total_price).permit(:totalPrice)
    end
end