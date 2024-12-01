from flask import Flask, request, jsonify, render_template
from textblob import TextBlob

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    if not request.is_json:
        return jsonify({"error": "Invalid content type. Expected JSON."}), 400

    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    analysis = TextBlob(text)
    sentiment = "positive" if analysis.sentiment.polarity > 0 else "negative" if analysis.sentiment.polarity < 0 else "neutral"

    return jsonify({
        "text": text,
        "sentiment": sentiment,
        "polarity": analysis.sentiment.polarity,
        "subjectivity": analysis.sentiment.subjectivity
    })

if __name__ == '__main__':
    app.run(debug=True)
