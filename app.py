from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
from keras.preprocessing import image
from keras.applications.efficientnet import preprocess_input
from keras.models import load_model
import base64
from io import BytesIO

app = Flask(__name__)

# Definição do caminho do modelo
MODEL_PATH = "cenario2_mobv2.h5"
model = None

def load_model_if_needed():
    global model
    if model is None:
        model = load_model(MODEL_PATH)

class ImageService:
    class_indices = {
        0: 'NMELAN',
        1: 'OTHERS',
    }

    @staticmethod
    def preprocess_image(img_base64):
        img_bytes = base64.b64decode(img_base64)
        img = Image.open(BytesIO(img_bytes))
        img = img.resize((224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        return preprocess_input(img_array)

    @staticmethod
    def predict_image(img_preprocessed):
        load_model_if_needed()
        predictions = model.predict(img_preprocessed)
        return predictions.flatten()

class ImageController:
    @app.route('/enviar-imagem', methods=['POST'])
    def enviar_imagem():
        img_base64 = request.json.get('imagem')
        if img_base64:
            try:
                img_preprocessed = ImageService.preprocess_image(img_base64)
                predictions = ImageService.predict_image(img_preprocessed)
                response = {ImageService.class_indices[i]: float(pred) for i, pred in enumerate(predictions)}

                print('Previsão concluída')
                print('Probabilidades:', response)

                return jsonify(response)

            except Exception as e:
                print('Erro:', str(e))
                return jsonify({'erro': 'Erro durante o processamento da imagem'})

        else:
            return jsonify({'erro': 'Nenhum dado de imagem encontrado na requisição'})

if __name__ == '__main__':
    app.run()
