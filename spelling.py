from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
app = Flask(__name__)
CORS(app)

tokenizer = AutoTokenizer.from_pretrained("oliverguhr/spelling-correction-english-base")
model = AutoModelForSeq2SeqLM.from_pretrained("oliverguhr/spelling-correction-english-base")
fix_spelling = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

# fix_spelling = pipeline("text2text-generation", model="oliverguhr/spelling-correction-english-base")

@app.route('/correct', methods=['POST'])
def correct_text():
    # Get the text to be corrected from the request
    text = request.json.get('text')

    # Use the spelling correction model
    corrected_text = fix_spelling(text, max_length = 2048)  # Adjust as needed

    # Return the corrected text as JSON
    return jsonify({'corrected_text': corrected_text[0]['generated_text']})

if __name__ == '__main__':
    app.run(debug=True)
