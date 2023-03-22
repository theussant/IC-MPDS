fetch("https://raw.githubusercontent.com/theussant/IC-MPDS/master/data/info.txt")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#raw-content").textContent = data;
        });


// Requisição do arquivo RAW do GitHub usando a função "fetch" do JavaScript.

/* function loadImages() {
	fetch('data')
	  .then(response => response.text())
	  .then(text => {
		const parser = new DOMParser();
		const html = parser.parseFromString(text, 'text/html');
		const images = Array.from(html.querySelectorAll('a'))
		  .filter(link => link.href.match(/\.(jpe?g|png|gif)$/))
		  .map(link => link.href);
		const gallery = document.querySelector('.slides');
		images.forEach(image => {
		  const img = document.createElement('img');
		  img.src = image;
		  gallery.appendChild(img);
		});
	  });
  }
  
  loadImages(); */


// API Fetch do JavaScript para carregar os arquivos de imagem e a tag <img> para exibi-los na página.


// A função loadImages() usa o método fetch() para fazer uma solicitação HTTP GET para o recurso no caminho ./received-images. O resultado da solicitação é uma promessa que é resolvida com a resposta da solicitação.

/* 

O método then() é usado para encadear duas funções de retorno de chamada.

A primeira função recebe a resposta como parâmetro e a converte em texto usando
o método text().

A segunda função de retorno de chamada usa um DOMParser() para analisar o texto
HTML em um documento HTML e, em seguida, seleciona todas os links (a) no
documento que apontam para imagens nos formatos jpg, jpeg, png ou gif.

Essas âncoras são filtradas usando o método filter() e transformadas em uma
matriz de URLs de imagens usando o método map().

Em seguida, a galeria de slides é selecionada usando 
document.querySelector('.slides') e cada URL de imagem é iterada usando
um loop forEach().

Para cada imagem, um novo elemento img é criado usando
document.createElement('img') e o src do elemento é definido como a URL da
imagem.

Em seguida, a imagem é anexada à galeria de slides
usando gallery.appendChild(img). */

// Teste de outro algoritmo:

const user = "theussant";
const repo = "IC-MPDS";
const path = "./data";
const imageElement = document.getElementById("latest-image");

fetch(`https://api.github.com/repos/${user}/${repo}/contents/${path}`)
  .then(response => response.json())
  .then(data => {
    const images = data.filter(item => item.type === "file" && item.name.match(/\.(jpg|jpeg|png|gif)$/i));
    images.sort((a, b) => new Date(b.last_modified) - new Date(a.last_modified));
    const newestImage = images[0];
    const imageUrl = newestImage.download_url;
    imageElement.src = imageUrl;
  });




// Script para menu e navbar

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

