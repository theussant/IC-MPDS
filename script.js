fetch("https://raw.githubusercontent.com/theussant/IC-MPDS/master/test.txt?token=GHSAT0AAAAAAB7F7CJOVPW74LTE3SW6QX26ZASNGEQ")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#raw-content").textContent = data;
        });


// Requisição do arquivo RAW do GitHub usando a função "fetch" do JavaScript.