class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :ticker, null: false
      t.string :company, null: false
      t.string :action, null: false
      t.float :price, null: false
      t.integer :amount, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :transactions, :ticker
    add_index :transactions, :company
    add_index :transactions, :price
    add_index :transactions, :amount
    add_index :transactions, :user_id
  end
end
