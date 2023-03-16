fetch("https://raw.githubusercontent.com/theussant/IC-MPDS/master/assets/sistema.PNG")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#raw-content").textContent = data;
        });


// Requisição do arquivo RAW do GitHub usando a função "fetch" do JavaScript.


function carregarImagem(url) {
	var canvas = document.getElementById('raw');
	var context = canvas.getContext('2d');
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	request.onload = function() {
		var bytes = new Uint8ClampedArray(request.response);
		var imageData = new ImageData(bytes, largura, altura);
		canvas.width = 557;
		canvas.height = 516;
		context.putImageData(imageData, 0, 0);
	};
	request.send();
}

carregarImagem('https://raw.githubusercontent.com/theussant/IC-MPDS/master/assets/sistema.PNG');