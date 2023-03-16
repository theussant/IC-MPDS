fetch("https://raw.githubusercontent.com/theussant/IC-MPDS/master/assets/sistema.PNG")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#raw-content").textContent = data;
        });


// Requisição do arquivo RAW do GitHub usando a função "fetch" do JavaScript.