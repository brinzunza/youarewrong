import requests
import sys
import os

def analyze_argument(argument):
    HUGGINGFACE_API_TOKEN = os.getenv('HUGGINGFACE_API_TOKEN')
    API_URL = "https://router.huggingface.co/novita/v3/openai/chat/completions"
    headers = {"Authorization": f"Bearer {HUGGINGFACE_API_TOKEN}"}
    payload = {
        "messages": [
            {
                "role": "user",
                "content": f"You are an eloquent, ruthless intellectual — the type who could dismantle an argument with a calm voice and a sharpened wit. Someone just made this argument: {argument} Respond with a confident, logical, and slightly sarcastic counterargument that clearly explains why the original point is wrong. Use 3–5 strong, well-reasoned points. Keep the tone intelligent and composed, with just enough humor to make it clear the original argument doesn't hold up. It should feel like common sense is being restored. No disclaimers, just show how weak the original logic is.",
            }
        ],
        "model": "deepseek/deepseek-v3-0324",
    }

    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()["choices"][0]["message"]["content"]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide an argument to analyze.")
        sys.exit(1)

    argument = sys.argv[1]
    response = analyze_argument(argument)
    print(response)
