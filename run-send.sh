#!/bin/bash
# Ajustar caminhos de acordo com o teste.
cd ~/IC-MPDS/data 

# Copia a imagem para a pasta "data"
cp /caminho da img.jpg .

# Comandos do Git
git remote set-url origin git@github.com:theussant/IC-MPDS.git
git add imagem.jpg
git commit -m "Nova imagem"
git push
