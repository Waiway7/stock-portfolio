Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index, :update]
    resources :stocks, only: [:create, :show, :index]
    resources :transactions, only: [:create, :index]
    resources :tickers, only: [:show, :index]
    resource :session, only: [:create, :destroy]
  end
end
