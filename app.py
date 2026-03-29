from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI Multi Brain Running 🚀"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    msg = data.get("message", "")
    brain = data.get("brain", "gpt")

    if brain == "deepseek":
        reply = f"DeepSeek Brain: {msg}"

    elif brain == "code":
        reply = f"Code Brain: {msg}"

    elif brain == "image":
        reply = "Image Brain coming soon 🎨"

    else:
        reply = f"GPT Brain: {msg}"

    return jsonify({"reply": reply})

app.run(host="0.0.0.0", port=10000)
