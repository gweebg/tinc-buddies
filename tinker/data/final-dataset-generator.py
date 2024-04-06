import pandas as pd

# Read modified_gemini_dataset.csv
df = pd.read_csv('price/hour/modified_gemini_dataset.csv')

# Read blockchain-dataset.csv
df2 = pd.read_csv('blockchain.com/blockchain-dataset.csv')

# Write the modified DataFrame back to CSV
df.to_csv('final_dataset.csv', index=False)