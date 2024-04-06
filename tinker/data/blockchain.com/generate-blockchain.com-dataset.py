import json
import csv

market_price_json = json.load(open('market-price.json'))
hash_rate_json = json.load(open('hash-rate.json'))
fees_per_transaction_json = json.load(open('fees-usd-per-transaction.json'))

# Count each json file "market-price" length
print("Length of each json file 'market-price':")
print(len(hash_rate_json["market-price"]))
print(len(fees_per_transaction_json["market-price"]))
print(len(market_price_json["market-price"]))

# Count each json file specific key length
print("Length of each json file key:")
print(len(hash_rate_json["hash-rate"]))
print(len(fees_per_transaction_json["fees-usd-per-transaction"]))
print(len(market_price_json["market-price"]))


# Create CSV file
# day,market-price,hash-rate,fees-usd-per-transaction,trade-volume
with open('blockchain-dataset.csv', mode='w') as blockchain_dataset:
    blockchain_writer = csv.writer(blockchain_dataset, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    blockchain_writer.writerow(['day', 'market-price', 'hash-rate', 'fees-usd-per-transaction'])
    for i in range(0, len(market_price_json["market-price"])):
        blockchain_writer.writerow([i, market_price_json["market-price"][i]["y"], hash_rate_json["hash-rate"][i]["y"], fees_per_transaction_json["fees-usd-per-transaction"][i]["y"]])

print("CSV file created successfully!")