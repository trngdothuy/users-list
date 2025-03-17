from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from home"}

@app.get("/api/data")
def get_data():
    return {"data": ["Item 1", "Item 2", "Item 3"]}