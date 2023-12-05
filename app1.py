# app.py

from flask import Flask, render_template, request, send_file
import cv2
import numpy as np
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/restore', methods=['POST'])
def restore():
    try:
        uploaded_file = request.files['image']
        algorithm = request.form['algorithm']

        # Save the uploaded file
        uploaded_file_path = 'uploads/' + uploaded_file.filename
        uploaded_file.save(uploaded_file_path)

        # Load the image
        image = cv2.imread(uploaded_file_path)

        # Implement your image restoration logic based on the selected algorithm
        if algorithm == 'denoise':
            denoised_image = cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)
            result_image = denoised_image
        else:
            # Handle other restoration algorithms
            result_image = image

        # Save the restored image
        restored_file_path = 'restored/' + uploaded_file.filename
        cv2.imwrite(restored_file_path, result_image)

        return send_file(restored_file_path, mimetype='image/*', as_attachment=True, download_name='restored_image.jpg')

    except Exception as e:
        return str(e)

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    os.makedirs('restored', exist_ok=True)
    app.run(debug=True)
