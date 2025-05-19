from flask import Flask, request, jsonify
from flask_cors import CORS
from deep_translator import GoogleTranslator
import torch
from time import perf_counter
from models.model_loader import load_model

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

model_name = "07jahnavi/tinyllama-storygeneration-v1"
model, tokenizer = load_model(model_name)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def formatted_prompt(pdf_text, user_input) -> str:
    return f"{user_input}\n\n{pdf_text}"

def generate_response(prompt, pdf_text):
    formatted_prompt_text = formatted_prompt(pdf_text, prompt)
    inputs = tokenizer(formatted_prompt_text, return_tensors="pt").to(device)
    generation_config = {
        "penalty_alpha": 0.8,
        "do_sample": True,
        "top_k": 50,
        "top_p": 0.9,
        "temperature": 0.9,
        "repetition_penalty": 1.1,
        "max_new_tokens": 1000,
        "pad_token_id": tokenizer.eos_token_id,
        "eos_token_id": tokenizer.eos_token_id,
    }
    start_time = perf_counter()
    outputs = model.generate(**inputs, **generation_config)
    story = tokenizer.decode(outputs[0], skip_special_tokens=True)
    output_time = perf_counter() - start_time

    # Strip out the PDF content from the generated story
    stripped_story = story.replace(pdf_text, "").strip()

    num_tokens = len(tokenizer.encode(story))
    print(f"Time taken for inference: {round(output_time, 2)} seconds")
    print(f"Number of tokens in the generated story: {num_tokens}")

    return {
        "story": stripped_story,
        "time_taken": round(output_time, 2),
        "num_tokens": num_tokens
    }

@app.route('/generate-story', methods=['POST'])
def generate_story():
    data = request.get_json()
    prompt = data.get('prompt', '')
    pdf_content = data.get('pdf_content', '')

    print('Received prompt:', prompt)  # Debug log
    print('Received PDF content:', pdf_content)  # Debug log

    result = generate_response(prompt, pdf_content)
    result["prompt"] = prompt  # Include the original prompt in the response

    print('Generated story:', result['story'])  # Debug log

    return jsonify(result)

@app.route('/translate', methods=['POST'])
def translate_text():
    text = request.json.get('text')
    to_language = request.json.get('to')

    translated_text = GoogleTranslator(source='auto', target=to_language).translate(text)

    return jsonify({"translatedText": translated_text})

if __name__ == '__main__':
    app.run(debug=True)
