import cv2
import numpy as np

# Read the image from the IR camera
image = cv2.imread('reconstructed_image.jpg', cv2.IMREAD_GRAYSCALE)

# Apply the Jet colormap
colormap_image = cv2.applyColorMap(image, cv2.COLORMAP_JET)

# Define lower and upper thresholds for red color in HSV color space
lower_red = np.array([0, 100, 100])
upper_red = np.array([0, 255, 255])

# Convert colormap image to HSV color space
hsv_image = cv2.cvtColor(colormap_image, cv2.COLOR_BGR2HSV)

# Create a mask to select the red color range
mask = cv2.inRange(hsv_image, lower_red, upper_red)

# Apply the mask to the colormap image
red_frequency_image = cv2.bitwise_and(colormap_image, colormap_image, mask=mask)

# Convert the image to grayscale
gray_image = cv2.cvtColor(red_frequency_image, cv2.COLOR_BGR2GRAY)

# Find contours in the grayscale image
contours, _ = cv2.findContours(gray_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Filtra os contornos com base na área mínima e máxima
area_minima = 10  # Defina um valor adequado para sua imagem
area_maxima = 1000
contornos_filtrados = [cnt for cnt in contours if area_minima < cv2.contourArea(cnt) > area_maxima]

# Ordena os contornos em ordem decrescente de área
contornos_ordenados = sorted(contornos_filtrados, key=cv2.contourArea, reverse=True)

# Draw the contours on the original image
# cv2.drawContours(colormap_image, contornos_ordenados, -1, (0, 0, 0), 2)

x, y, w, h = cv2.boundingRect(contornos_ordenados[0])

# Crop the image based on the bounding rectangle
cropped_image = colormap_image[y:y+h, x:x+w]

cropped_image = cv2.resize(cropped_image, None, fx=3, fy=3, interpolation=cv2.INTER_LINEAR)

if cropped_image.shape[0] > 1.2 * cropped_image.shape[1]:
    print("sem vazamento")
else:
    print("com vazamento")
# Apply another red mask to the cropped image
lower_red2 = np.array([0, 100, 100])
upper_red2 = np.array([0, 255, 255])

hsv_cropped_image = cv2.cvtColor(cropped_image, cv2.COLOR_BGR2HSV)
mask2 = cv2.inRange(hsv_cropped_image, lower_red2, upper_red2)

edges = cv2.Canny(mask2, threshold1=50, threshold2=150)
edges = cv2.dilate(edges, None, iterations=1)

# Find contours in the edges image
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Filter the contours based on their area
min_contour_area = 10
max_contour_area = 100
filtered_contours = [cnt for cnt in contours if min_contour_area <cv2.contourArea(cnt) > max_contour_area]


# Sort the filtered contours by area in ascending order
filtered_contours = sorted(filtered_contours, key=cv2.contourArea)

# Select the smallest contour
if filtered_contours:
    smallest_contour = filtered_contours[0]

    # Draw the contour on the cropped image
    cv2.drawContours(cropped_image, [smallest_contour], -1, (255, 0, 0), 2)


# Display the resulting image with filtered lines
cv2.imshow('Cropped Image with Small Lines', cropped_image)
# cv2.imshow('Cropped Image with Circles', edges)

cv2.waitKey(0)
cv2.destroyAllWindows()