# == Schema Information
#
# Table name: transactions
#
#  id         :bigint           not null, primary key
#  action     :string           not null
#  amount     :integer          not null
#  company    :string           not null
#  price      :float            not null
#  ticker     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_transactions_on_amount   (amount)
#  index_transactions_on_company  (company)
#  index_transactions_on_price    (price)
#  index_transactions_on_ticker   (ticker)
#  index_transactions_on_user_id  (user_id)
#


class Transaction < ApplicationRecord
    validates :ticker, :company, :amount, :action, :price, :user_id, presence: true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

   
end
