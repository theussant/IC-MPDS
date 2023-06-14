import numpy as np
from PIL import Image
import serial
import os
import cv2 as cv
import time

ser = serial.Serial('/dev/ttyUSB1', 9600)
directory = r'/home/almeida/Desktop/MPDS'
os.chdir(directory) 

webcam = cv.VideoCapture(0)
ret, frame = webcam.read()
cv.imwrite("Foto.jpg", frame)
webcam.release()

# Carregar a imagem
image = Image.open('Foto.jpg')
image = image.resize((80, 60))
# Converter a imagem para escala de cinza
gray_image = image.convert('L')

# Converter a imagem para uma matriz
gray_matrix = np.array(gray_image)

print(gray_matrix)
# Converter a matriz em um vetor unidimensional
gray_vector = gray_matrix.ravel()

print(len(gray_vector))


# Função para reconstruir a imagem a partir do vetor unidimensional
def reconstruct_image(vector, width, height):
    # Reshape do vetor para a dimensão original
    reshaped_vector = vector.reshape((height, width))

    # Converter a matriz para uma imagem PIL
    reconstructed_image = Image.fromarray(reshaped_vector.astype(np.uint8), mode='L')

    return reconstructed_image    

# Obter as dimensões originais da imagem
width, height = gray_matrix.shape

# Reconstruir a imagem
reconstructed_image = reconstruct_image(gray_vector, width, height)

# Salvar a imagem reconstruída
# reconstructed_image.save('reconstructed_image.jpg')

# Porta serial
port = '/dev/ttyUSB0'  # Substitua pela porta serial correta

# Converter o vetor em bytes
dados = gray_vector.tobytes()

# Enviar os bytes pela porta serial
# with serial.Serial(port, baudrate=9600) as ser:
#     ser.write(gray_bytes)

tamanho_pacote = 50

# Envia cada pacote sequencialmente
with serial.Serial(port, baudrate=9600) as ser:
    for i in range(0, len(dados), tamanho_pacote):
        pacote = dados[i:i+tamanho_pacote]
        ser.write(pacote) # converte a string em bytes antes de enviar
        time.sleep(2)



# Limpar o terminal
print("\033c")
print("Dados enviados com sucesso!")