// Requisição do arquivo RAW do GitHub usando a função "fetch" do JavaScript.

  const user = "theussant";
  const repo = "IC-MPDS";
  const path = "./data";
  const imageElement = document.getElementById("latest-image");
    
  fetch(`https://api.github.com/repos/${user}/${repo}/contents/${path}`, {
    headers: {
      Accept: "application/vnd.github.VERSION.raw"
    }
  })
  .then(response => response.json())
  .then(data => {
    const images = data.filter(item => item.type === "file" && item.name.match(/\.(jpg|jpeg|png|gif)$/i));
    const newestImage = images.reduce((a, b) => new Date(a.created_at) > new Date(b.created_at) ? a : b);
    const imageUrl = newestImage.download_url;
    imageElement.src = imageUrl;
  });
  


// Script para verificar

// ler o conteúdo do arquivo de texto usando a API Fetch
fetch('https://raw.githubusercontent.com/theussant/IC-MPDS/master/response.txt')
  .then(response => response.text())
  .then(text => {
    // comparando arquivo de texto com as strings "tem vazamento" ou "não tem vazamento"
    const cor = text.trim().toLowerCase() === 'tem vazamento' ? 'red' : 'green';
    
    // alterar a cor do quadrado usando a propriedade style.background
    const content = document.getElementById('raw-content');
    content.innerText = cor === 'red' ? 'Tem vazamento' : 'Não tem vazamento';
    content.style.background = cor;
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

