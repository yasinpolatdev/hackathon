import requests
import json

API_KEY = "AIzaSyCQ2ARYWgoOgP6d65ICOdiYUrg-ySrB9MA"
url = f"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={API_KEY}"

headers = {"Content-Type": "application/json"}

data = {
    "contents": [
        {"role": "user",
            "parts": [
                {"text": "Give me five subcategories of jazz?"}
            ]
        }
    ]
}

response = requests.post(url, headers=headers, data=json.dumps(data))

if response.status_code == 200:
    print("Response:", response.json())
else:
    print("Failed with status code:", response.status_code)
