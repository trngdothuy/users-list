import boto3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI()

# Enable CORS for FE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://aaatest098.s3-website.eu-north-1.amazonaws.com"], #Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
try:
    table = dynamodb.Table('test-111')
    response = table.scan()
    print("DynamoDB data:", response)
except Exception as e:
    print("Error connecting to DynamoDB:", e)


# Data model
class Item(BaseModel):
    name: str
    age: int
    

@app.get("/")
def get_items():
    return {"message": "Hello from backend"}


# Add item to dynamodb
@app.post("/add")
def add_item(item: Item):   
    item_id = str(uuid.uuid4())
    new_item = {
            'id': item_id,
            'name': item.name,
            'age': item.age
        }
    table.put_item(Item=new_item)
    return new_item

# Get all items
@app.get("/items")
def get_items():
    return {"items": response.get("Items", [])}

# Delete item
@app.delete("/delete/{item_id}")
async def delete_item(item_id: str):
    table.delete_item(Key={'id': item_id})
    return {"message": "Item deleted"}
    