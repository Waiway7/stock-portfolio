# == Schema Information
#
# Table name: stocks
#
#  id         :bigint           not null, primary key
#  company    :string           not null
#  shares     :integer          not null
#  ticker     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_stocks_on_company  (company)
#  index_stocks_on_shares   (shares)
#  index_stocks_on_ticker   (ticker)
#  index_stocks_on_user_id  (user_id)
#
require 'net/http'
require 'json'
class Stock < ApplicationRecord
    validates :ticker, :company, :shares, :user_id, presence: true
    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User


    def self.quote(ticker)
        url = "https://sandbox.iexapis.com/stable/stock/#{ticker}/quote?token=#{Rails.application.credentials.iex[:api_key]}"
        uri = URI(url)
        response = Net::HTTP.get(uri)
        if (JSON.parse(response))
            return JSON.parse(response)
        else 
            return false
        end
       
    end

    def self.batch(query)
        url = "https://sandbox.iexapis.com/stable/stock/market/batch?symbols=#{query}&types=quote&token=#{Rails.application.credentials.iex[:api_key]}"
        uri = URI(url)
        response = Net::HTTP.get(uri)

        if (JSON.parse(response))
            return JSON.parse(response)
        else 
            return false
        end

    end
end
