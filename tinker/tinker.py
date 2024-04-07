import time
import threading
from fastapi import FastAPI
from contextlib import asynccontextmanager
import requests

import joblib
from keras.models import load_model
import pandas as pd
import numpy as np

class Tinker(threading.Thread):
    
    def __init__(self):
        threading.Thread.__init__(self)
        self.running = True

        # Load ML model and scaler
        self.model_loaded = load_model('model/lstm_model_1.keras')
        self.scaler_X_loaded = joblib.load('model/scaler_X.save')
        self.scaler_y_loaded = joblib.load('model/scaler_y.save')

        self.context = pd.read_csv('model/first_vals.csv', dtype=np.float32)
        self.context.drop(columns=['close'], inplace=True)
        self.context = self.scaler_X_loaded.transform(self.context)

        self.MODEL_UPDATE_INTERVAL = 60 * 60 # hourly update
        self.SENTIMENT_UPDATE_INTERVAL = 10

        self.result = { "up": True, "volatility": 0.1, "trust": 0.5, "predictions": [1, 2, 3], "price" : 1 }
    
    def get_result(self):
        return self.result

    def get_price(self):
        return self.current_price
    
    def __request_price(self):
        ret = requests.get('https://api.uphold.com/v0/ticker/BTC-USD')
        return ret.json()['bid']
    
    def predict(self):
        p = self.model_loaded.predict(np.array([self.context]))
        return p[0][0]

    def update_result(self, predictions):
        up = True
        if float(predictions[0][0]) <= float(self.current_price):
            up = False

        predictions = [float(p[0]) for p in predictions]
        self.result = { "up": up, "volatility": 0.1, "trust": 0.5, "predictions": predictions, "price" : float(self.current_price) }

    def run(self,*args,**kwargs):
        last_prediction_time = 0
        last_sentiment_time = 0
        while self.running:
            print("Price Monitor is running...")
            self.current_price = self.__request_price()
            print("Predicting...")
            next_price = self.predict()
            self.context[-1, -1] = next_price

            print("Next price: ", next_price)

            daily_predictions = []
            if time.time() - last_prediction_time >= self.MODEL_UPDATE_INTERVAL:
                print("Predicting for the next 24 hours...")
                for i in range(23):
                    prediction = self.predict()
                    daily_predictions.append(prediction)
                    self.context[-1, -1] = prediction            
                
                # Add the next_price to the daily_predictions (head)
                daily_predictions.insert(0, next_price)

                # Scale the predictions back to the original scale
                daily_predictions = self.scaler_y_loaded.inverse_transform(np.array(daily_predictions).reshape(-1, 1))

                self.update_result(daily_predictions)
                last_prediction_time = time.time()
            else:
                print("Will predict in ", self.MODEL_UPDATE_INTERVAL - (time.time() - last_prediction_time), " seconds.")

            if time.time() - last_sentiment_time >= self.SENTIMENT_UPDATE_INTERVAL:
                print("Updating sentiment...")
                last_sentiment_time = time.time()
            else:
                print("Will update sentiment in ", self.SENTIMENT_UPDATE_INTERVAL - (time.time() - last_sentiment_time), " seconds.")

            time.sleep(1)
    
    def stop(self):
        self.running = False

app = FastAPI()
tinker = None

@app.on_event("startup")
async def start_event():
    global tinker
    print("Starting Tinker...")
    tinker = Tinker()
    tinker.start()

@app.on_event("shutdown")
async def shutdown_event():
    global tinker
    if tinker is None:
        return
    tinker.stop()
    tinker.join()
    print("Tinker stopped.")


@app.get('/result')
async def result():
    global tinker
    if tinker is None:
        return 500, "Tinker is not initialized"
    return tinker.get_result()
