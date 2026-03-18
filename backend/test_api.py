import requests
import json

url = "http://localhost:8000/api/leads"
payload = {
    "destination": "Río de Janeiro",
    "timeframe": "1-3 meses",
    "budget": "Q5,000 – Q7,000",
    "travel_type": "Aventura",
    "meal_plan": "Solo habitación",
    "travelers": 2
}

try:
    response = requests.post(url, json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
