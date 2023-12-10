var gameroomData = {
    "gameroom": [
        {
            "name": "Cs",
            "imagePath": "img/cs-icon.png",
            "roomLink": "lobby-room.html",
        },
        {
            "name": "Vava",
            "imagePath": "img/valorant-icon.png",
            "roomLink": "lobby-room.html",
        },
        {
            "name": "Lol",
            "imagePath": "img/lol-icon.png",
            "roomLink": "lobby-room.html",
        },
        {
            "name": "Rocket",
            "imagePath": "img/rocket-icon.png",
            "roomLink": "lobby-room.html",
        }
    ]
};

function randomizarSalas() {
    var numSalas = 8;

    for (var i = 1; i <= numSalas; i++) {
        var salaID = "sala" + i;
        var numPessoas = Math.floor(Math.random() * 10) + 1;
        var isLimiteAtingido = numPessoas === 10;
        var salaElement = document.getElementById(salaID);
        var salaInfo = gameroomData.gameroom[0]
        // Verificar se salaInfo é undefined
        if (salaInfo) {
            salaElement.innerHTML = `
                <div class="row">
                    <div class="top">
                        <h4>${salaID}</h4>
                        <img src="${salaInfo.imagePath}" style="width: 75px; border-radius: 5%;">
                    </div>
                    <div class="middle">
                        Sala de Jogos
                    </div>
                    <div class="bottom">
                        <a class="button-gamer" 
                            style="text-decoration: none; padding: 2px;"
                            href="${salaInfo.roomLink}"
                            ${isLimiteAtingido ? 'disabled' : ''}
                        >
                            Entrar
                        </a>
                        <p>${numPessoas} / 10 players</p>
                    </div>
                </div>
            `;
        } else {
            console.error(`Sala "${salaID}" não encontrada em gameroomData.gameroom`);
        }
    }
}

window.onload = randomizarSalas;