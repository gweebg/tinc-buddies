import pandas as pd

# Read modified_gemini_dataset.csv
df = pd.read_csv('price/hour/modified_gemini_dataset.csv')

# Read blockchain-dataset.csv
df2 = pd.read_csv('blockchain.com/blockchain-dataset.csv')

# Rename 'Volume USD' to 'volume'
df2.rename(columns={'Volume USD': 'volume'}, inplace=True)

# Write the modified DataFrame back to CSV
df.to_csv('final_dataset.csv', index=False)