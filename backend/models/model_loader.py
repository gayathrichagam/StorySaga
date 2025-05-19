import os
from transformers import AutoModelForCausalLM, AutoTokenizer
# from dotenv import load_dotenv

# load_dotenv()

# Set the Hugging Face token from environment variable
# os.environ['HF_TOKEN'] = os.getenv('HF_TOKEN')

def load_model(model_name):
    model = AutoModelForCausalLM.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    # Set the pad_token_id to eos_token_id
    tokenizer.pad_token_id = tokenizer.eos_token_id
    return model, tokenizer
