class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.string :company, null: false
      t.integer :shares, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :stocks, :ticker
    add_index :stocks, :company
    add_index :stocks, :shares
    add_index :stocks, :user_id
  end
end
