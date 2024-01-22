# Import necessary libraries
import numpy as np
import os
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, UpSampling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.models import load_model


def restore_image(image_path):
    # Load the pre-trained denoising autoencoder model
    autoencoder = load_model('denoising_autoencoder_model.h5')

    # Load the input image
    img = load_img(image_path, target_size=(256, 256))
    img_array = img_to_array(img) / 255.0  # Normalize pixel values to [0, 1]
    input_image = np.expand_dims(img_array, axis=0)

    # Use the autoencoder to restore the image
    restored_image = autoencoder.predict(input_image)

    # Rescale pixel values back to [0, 255]
    restored_image = (restored_image * 255).astype(np.uint8)

    return restored_image[0]


# Define Denoising Autoencoder model
def denoising_autoencoder(input_shape=(256, 256, 3)):
    # Encoder
    input_img = Input(shape=input_shape)
    x = Conv2D(32, (3, 3), activation='relu', padding='same')(input_img)
    x = MaxPooling2D((2, 2), padding='same')(x)
    x = Conv2D(64, (3, 3), activation='relu', padding='same')(x)
    encoded = MaxPooling2D((2, 2), padding='same')(x)

    # Decoder
    x = Conv2D(64, (3, 3), activation='relu', padding='same')(encoded)
    x = UpSampling2D((2, 2))(x)
    x = Conv2D(32, (3, 3), activation='relu', padding='same')(x)
    x = UpSampling2D((2, 2))(x)
    decoded = Conv2D(3, (3, 3), activation='sigmoid', padding='same')(x)

    # Autoencoder model
    autoencoder = Model(input_img, decoded)
    autoencoder.compile(optimizer=Adam(lr=0.001), loss='mean_squared_error')

    return autoencoder

def load_images_from_directory(directory_path, target_size=(256, 256), normalize=True):
    images = []
    for filename in os.listdir(directory_path):
        img_path = os.path.join(directory_path, filename)
        img = load_img(img_path, target_size=target_size)
        img_array = img_to_array(img)
        if normalize:
            img_array = img_array / 255.0  # Normalize pixel values to [0, 1]
        images.append(img_array)
    return np.array(images)


# Data augmentation
def apply_data_augmentation(images, datagen):
    augmented_images = []
    for img in images:
        img = np.expand_dims(img, axis=0)
        augmented_img = datagen.flow(img, batch_size=1)[0][0]
        augmented_images.append(augmented_img)
    return np.array(augmented_images)

image_directory = 'C:/Users/NPUA-1/Desktop/images'
X_train = load_images_from_directory(image_directory, target_size=(256, 256), normalize=True)

# Optional: Data augmentation
datagen = ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)


augmented_X_train = apply_data_augmentation(X_train, datagen)

# Combine original and augmented data
X_train = np.concatenate((X_train, augmented_X_train), axis=0)

# Normalize the pixel values to be between 0 and 1
X_train = X_train / 255.0

# Instantiate the Denoising Autoencoder model
autoencoder = denoising_autoencoder()

# Train the model (replace epochs and batch_size with your preferred values)
autoencoder.fit(X_train, X_train, epochs=10, batch_size=32, shuffle=True, validation_split=0.2)

# Save the trained model
autoencoder.save('denoising_autoencoder_model.h5')
