import json
import joblib
import pandas as pd
import numpy as np

# Load the keras model and scaler
from keras.models import load_model

model_loaded = load_model('../model/lstm_model_1.keras')
scaler_X_loaded = joblib.load('../model/scaler_X.save')
scaler_y_loaded = joblib.load('../model/scaler_y.save')


df = pd.read_csv('../data/final_dataset.csv')
df = df[:30000]
df.drop(columns=['close', "date"], inplace=True)
df_scaled = scaler_X_loaded.transform(df)

first_vals = df_scaled[:24]

prediction_results = []

for index, row in df.iterrows():
    result = { "up": True, "volatility": 0.1, "trust": 0.5, "predictions": [], "price" : row['open'] }
    print(f"Predicting for {index} of {len(df)}")
    for i in range(24):
        prediction = model_loaded.predict(np.array([first_vals]), verbose=0)
        result['predictions'].append(prediction[0][0])

json.dump(prediction_results, open('../data/test_results.json', 'w'))