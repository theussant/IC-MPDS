#!/bin/bash

# Execute dentro da mesma pasta.

# Executar o código Python de recebimento de imagem.

python3 image_processing.py

# Repositório Remoto
git remote set-url origin git@github.com:theussant/IC-MPDS.git

# Adicionar a imagem ao repositório Git.

git add reconstructed_image_receivec.jpg

# Fazer o commit da imagem.

git commit -m "Adicionando imagem recebida"

# Push para o repositório remoto

git push
