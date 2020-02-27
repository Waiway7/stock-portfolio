# == Schema Information
#
# Table name: stocks
#
#  id          :bigint           not null, primary key
#  company     :string           not null
#  shares      :integer          not null
#  ticker      :string           not null
#  total_price :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_stocks_on_company      (company)
#  index_stocks_on_shares       (shares)
#  index_stocks_on_ticker       (ticker)
#  index_stocks_on_total_price  (total_price)
#  index_stocks_on_user_id      (user_id)
#
require 'net/http'
require 'json'
class Stock < ApplicationRecord
    validates :ticker, :company, :shares, :total_price, :user_id, presence: true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    def self.quote(ticker)
        url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=#{ticker}&apikey=#{Rails.application.credentials.alpha[:api_key]}"

        uri = URI(url)
        response = Net::HTTP.get(uri)
        stock = JSON.parse(response)

        if (stock["Note"])
            return stock
        end
        return stock
    end

    def self.company(ticker)
        url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=#{ticker}&apikey=#{Rails.application.credentials.alpha[:api_key]}"
        uri = URI(url)
        response = Net::HTTP.get(uri)
        JSON.parse(response)
    end
end
