
# THIS IS A CONCEPTUAL REFERENCE FOR YOUR PYTHON BACKEND
# Using FastAPI for maximum performance and easy integration with Gemini

from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="HUB E-Commerce API")

class Product(BaseModel):
    id: str
    name: str
    price: float
    category: str
    stock: int

# Mock Database
products_db = [
    {"id": "1", "name": "Aura Headphones", "price": 299.99, "category": "Electronics", "stock": 10},
    {"id": "2", "name": "Minimalist Watch", "price": 189.50, "category": "Fashion", "stock": 5},
]

@app.get("/api/products", response_model=List[Product])
async def get_products():
    return products_db

@app.post("/api/orders")
async def create_order(order: dict):
    # Process secure payment (e.g., Stripe)
    # Update inventory
    return {"status": "success", "order_id": "python-ord-123"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
