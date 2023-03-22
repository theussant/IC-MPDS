/* fetch("https://github.com/theussant/IC-MPDS/blob/master/received-images/lab-2.jpg?raw=true")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#raw-content").textContent = data;
        });


// Requisição do arquivo RAW do GitHub usando a função "fetch" do JavaScript.
 */

function loadImages() {
	fetch('received-images')
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
  
  loadImages();


// API Fetch do JavaScript para carregar os arquivos de imagem e a tag <img> para exibi-los na página.


// A função loadImages() usa o método fetch() para fazer uma solicitação HTTP GET para o recurso no caminho ./received-images. O resultado da solicitação é uma promessa que é resolvida com a resposta da solicitação.

/* O método then() é usado para encadear duas funções de retorno de chamada. A primeira função recebe a resposta como parâmetro e a converte em texto usando o método text(). A segunda função de retorno de chamada usa um DOMParser() para analisar o texto HTML em um documento HTML e, em seguida, seleciona todas as âncoras (a) no documento que apontam para imagens nos formatos jpg, jpeg, png ou gif.

Essas âncoras são filtradas usando o método filter() e transformadas em uma matriz de URLs de imagens usando o método map(). Em seguida, a galeria de slides é selecionada usando document.querySelector('.slides') e cada URL de imagem é iterada usando um loop forEach(). Para cada imagem, um novo elemento img é criado usando document.createElement('img') e o src do elemento é definido como a URL da imagem. Em seguida, a imagem é anexada à galeria de slides usando gallery.appendChild(img). */