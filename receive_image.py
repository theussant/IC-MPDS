import serial
import numpy as np
from PIL import Image

# Porta serial
port = '/dev/ttyUSB0'   # Substitua pela porta serial correta

# Função para reconstruir a imagem a partir do vetor unidimensional
def reconstruct_image(vector, width, height):
    # Reshape do vetor para a dimensão original
    reshaped_vector = vector.reshape((height, width))

    # Converter a matriz para uma imagem PIL
    reconstructed_image = Image.fromarray(reshaped_vector.astype(np.uint8), mode='L')

    return reconstructed_image

width = 16
height = 9
# Tamanho do vetor recebido (conhecido previamente)
vector_length = width * height  # Substitua pela dimensão correta do vetor

# Receber os bytes pela porta serial
with serial.Serial(port, baudrate=9600) as ser:
    gray_bytes = ser.read(vector_length)

# Converter os bytes de volta para o vetor
received_vector = np.frombuffer(gray_bytes, dtype=np.uint8)
image = reconstruct_image(received_vector, width, height)
image.save('reconstructed_image.jpg')
# Limpar o terminal
print("\033c")
print("Dados recebidos com sucesso!")