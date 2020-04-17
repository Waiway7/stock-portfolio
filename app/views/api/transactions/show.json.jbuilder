json.date @transaction.created_at.to_date
json.partial! 'api/transactions/transaction', transaction: @transaction