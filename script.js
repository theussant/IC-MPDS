/* fetch("https://github.com/theussant/IC-MPDS/blob/master/received-images/lab-2.jpg?raw=true")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#raw-content").textContent = data;
        });


// Requisição do arquivo RAW do GitHub usando a função "fetch" do JavaScript.
 */

function loadImages() {
	fetch('/received-images')
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
