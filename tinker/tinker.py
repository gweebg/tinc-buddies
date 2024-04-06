import time
import threading
from fastapi import FastAPI
from contextlib import asynccontextmanager

import joblib
from keras.models import load_model
import pandas as pd
import ast
   
class Tinker(threading.Thread):
    
    def __init__(self):
        threading.Thread.__init__(self)
        self.running = True

        # Load ML model and scaler
        self.model_loaded = load_model('lstm_model.keras')
        self.scaler_loaded = joblib.load('scaler.save')

        with open('first_vals.txt', 'r') as f:
            first_vals_file = f.read()
        self.first_vals = pd.DataFrame(ast.literal_eval(first_vals_file))
    
    def get_price(self):
        return self.current_price
    
    def __request_price(self):
        return self.current_price + 1 # TODO: Request to backend
    
    def run(self,*args,**kwargs):
        while self.running:
            print("Price Monitor is running...")
            self.current_price = self.__request_price()
            print("Predicting...")
            p = self.model.predict([[67636.46,67999.29,67636.46,67855.65,440621.46465022647]])
            print("Predicted price: ", p)
            time.sleep(5)
    
    def stop(self):
        self.running = False

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting Tinker...")
    tinker = Tinker()
    tinker.start()
    yield
    print("Stopping Tinker...")
    tinker.stop()
    tinker.join()
    print("Tinker stopped.")

app = FastAPI(lifespan=lifespan)

@app.get('/result')
async def result():
    return { "up": True, "volatility": 0.1, "trust": 0.5, "predictions": [1, 2, 3], "price" : 1 }
