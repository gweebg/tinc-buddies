import pandas as pd

# Read modified_gemini_dataset.csv
df = pd.read_csv('price/hour/modified_gemini_dataset.csv')

# Read blockchain-dataset.csv
df2 = pd.read_csv('blockchain.com/blockchain-dataset.csv')

# Add new empty columns to df: 'hash-rate', 'fees-usd-per-transaction', 'trade-volume'
#df['hash-rate'] = ''
#df['fees-usd-per-transaction'] = ''

import math
df['range_estimate'] = (df['high'] - df['low']) / (2 * math.sqrt(3)) # the higher, the more volatile

# Add target 'up' column to df. If close price is higher than open price, set 'up' to 1, else set 'up' to 0
df['up'] = df['close'] > df['open']
df['up'] = df['up'].astype(int)

# Write the modified DataFrame back to CSV
df.to_csv('final_dataset.csv', index=False)