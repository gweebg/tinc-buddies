import pickle
import time
import threading
from fastapi import FastAPI
from contextlib import asynccontextmanager


class Tinker(threading.Thread):
    
    def __init__(self):
        threading.Thread.__init__(self)
        self.running = True

        # Load ML model
        with open('model/linear_regression.pkl', 'rb') as f:
            self.model = pickle.load(f)
    
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
