import pandas as pd

# Read the CSV file
df = pd.read_csv('Gemini_BTCUSD_1h.csv')

# Drop the 'unix' and 'symbol' columns
df.drop(['unix', 'symbol', 'Volume BTC'], axis=1, inplace=True)

# Convert 'date' column to datetime format
df['date'] = pd.to_datetime(df['date'])

# Extract date without time
df['date'] = df['date'].dt.date

# Group by 'date' and assign incremental numbers
df['date'] = df.groupby('date').ngroup(ascending=False) + 1

# Write the modified DataFrame back to CSV
df.to_csv('modified_gemini_dataset.csv', index=False)

print("Modification complete. Check 'modified_dataset.csv' for the updated dataset.")
