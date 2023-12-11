URL1 = 'https://match-time-backend.vercel.app/users'
URL2 = 'https://match-time-backend.vercel.app/games'

const container = document.querySelector('.profile');
const HeaderPfp = document.querySelector('.header-picture');


//funcao para checar se tem usuario logado e mudar o header de acordo
const renderHeaderPfp = async () => {
    const res1 = await fetch(URL1);
    const profiles = await res1.json();
    const idUsuarioLogado = localStorage.getItem("idUsuarioLogado");

    if (localStorage.getItem("idUsuarioLogado") == null || localStorage.getItem("idUsuarioLogado") == -1) {
        //console.log(localStorage.getItem("idUsuarioLogado"));
        let fotinha = '';

        fotinha += `
        <a class="nav-link dropdown-toggle mouse-efeito-navbar" href="#" role="button"data-bs-toggle="dropdown" aria-expanded="false"><img src="img/perfil.png"width="50px"></a>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item dpdefect" href="login.html">Fazer login</a></li>
            <li><a class="dropdown-item dpdefect" href="register.html">Criar conta</a></li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item dpdefect" href="index.html">Sair</a></li>
        </ul>
        `;

        HeaderPfp.innerHTML = fotinha;

    } else {
        //console.log(localStorage.getItem("idUsuarioLogado"));
        let fotinha = '';

        fotinha += `
        <a class="nav-link dropdown-toggle mouse-efeito-navbar" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="${profiles[idUsuarioLogado].foto}" style="border-radius: 30px;" width="50px">
        </a>
        <ul class="dropdown-menu">
        <li><a class="dropdown-item dpdefect" href="Gprofile.html">Ver perfil</a></li>
            <li><a class="dropdown-item dpdefect" href="editprofile.html">Editar perfil</a></li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><button id="botao-sair" type="button" class="dropdown-item dpdefect" onclick="deslogar()">Sair</button></li>
        </ul>
        `;

        HeaderPfp.innerHTML = fotinha;
    }
}


//funcao carregar dinamicamente o perfil do user
const renderProfile = async () => {
    const res1 = await fetch(URL1);
    const res2 = await fetch(URL2);
    const profiles = await res1.json();
    const games = await res2.json();

    const idUsuarioLogado = localStorage.getItem("idUsuarioLogado");


    let perfil = '';


    perfil += `
            <div class="container">
            <div class="container mt-5">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 text-center">
                        <h2>${profiles[idUsuarioLogado].nome}</h2>
                        <img src="${profiles[idUsuarioLogado].foto}" style="width: 30%; object-fit: cover;" alt="Foto de Perfil">
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <h4>Bio do Jogador</h4>
                        <p>${profiles[idUsuarioLogado].bio}</p>
                        <a class="btn button-gamer" href="editprofile.html">Editar Perfil</a>
                    </div>
                </div> 

                <h4
                    style="margin: 50px;text-align: left; color:white; text-shadow: 0 0 0.2em #87F, 0 0 0.2em #87F, 0 0 0.2em #87F">
                    Jogos Jogados
                </h4>`;


    perfil += `<ul class="list-unstyled game-list row">`

    for (let i = 0; i < profiles[idUsuarioLogado].idJogos.length; i++) {
        let j = profiles[idUsuarioLogado].idJogos[i];

        perfil += `
                <li class="col-lg-6 col-md-12 col-sm-12">
                <img class="game-image" style="width: 25%;" src="${games[j].fotoCard}" alt="${games[j].nome}"">
                <h5 class="game-name">${games[j].nome}</h5>
                </li>
                `
    }

    perfil += `</ul>`

    container.innerHTML = perfil;
}



const renderEditProfile = async () => {
    const res1 = await fetch(URL1);
    const profiles = await res1.json();

    const idUsuarioLogado = localStorage.getItem("idUsuarioLogado");

    document.getElementById("currentName").innerHTML = `
        <h2>${profiles[idUsuarioLogado].nome}</h2>
    `;

    document.getElementById("currentPfp").innerHTML = `
        <img src="${profiles[idUsuarioLogado].foto}" style="width: 30%;" class="img-fluid"alt="Foto de Perfil">
    `;

    document.getElementById("currentBio").innerHTML = `
        <h4>Bio do Jogador</h4>
        <p>
            ${profiles[idUsuarioLogado].bio}
        </p>
    `;


}

//funcao deslogar quando aperta o botao "sair" enquanto logado
const deslogar = async () => {
    localStorage.setItem("idUsuarioLogado", "-1");
    window.location.replace('index.html');
}

//chama funcoes sempre que pagina carrega
window.addEventListener('DOMContentLoaded', (e) => renderProfile());
window.addEventListener('DOMContentLoaded', (e) => renderEditProfile());
window.addEventListener('DOMContentLoaded', (e) => renderHeaderPfp());


//funcao para validar usuario
const validateUser = async (userEmail, userPassword) => {
    const res1 = await fetch(URL1);
    const profiles = await res1.json();

    var emailExist = false;
    var idUserFound = -1;

    profiles.forEach(user => {
        //console.log(user.email);

        if (user.email == userEmail) {
            //console.log("Email encontrado");

            emailExist = true;
            idUserFound = user.id;
        } else {
            //console.log("Email não encontrado");
        }
    });

    if (emailExist && profiles[idUserFound].senha == userPassword) {
        localStorage.setItem("idUsuarioLogado", idUserFound);
        window.location.replace('index.html');
    } else {
        alert("Dados incorretos.");
    }


}




//funcao para cadastrar novo usuario
const registerUser = async (userName, userEmail, userPassword) => {
    const res1 = await fetch(URL1);
    const profiles = await res1.json();

    const newId = profiles.length;

    const data = {
        id: newId,
        nome: userName,
        email: userEmail,
        senha: userPassword,
        foto: "/img/perfil2.png",
        bio: "",
        idJogos: [],
        comunidadesCriadas: [],
        comunidadesEntradas: []
    }

    fetch(URL1, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })

    alert("Usuário sendo criado com sucesso! Aguarde alguns instantes para fazer login.");
    window.location.replace('index.html');
}

//funcao pegar informacoes do login e chama funcao para validar usuario
const formLogin = document.querySelector("#userLogin");
if (formLogin) {
    const fields = ["inputEmail", "inputPassword"];

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        let userEmail = document.querySelector(`#${fields[0]}`).value;
        let userPassword = document.querySelector(`#${fields[1]}`).value;

        if (userEmail == false || userPassword == false) {
            alert("Gentileza preencher todos os campos");
        } else {
            //console.log(userEmail);
            //console.log(userPassword);

            validateUser(userEmail, userPassword);

        }

    });
}

const formRegister = document.querySelector("#userRegister");
if (formRegister) {
    const fields = ["inputNameRegister", "inputEmailRegister", "inputPasswordRegister", "inputPasswordConfirmationRegister"];

    formRegister.addEventListener("submit", (e) => {
        e.preventDefault();

        let userName = document.querySelector(`#${fields[0]}`).value;
        let userEmail = document.querySelector(`#${fields[1]}`).value;
        let userPassword = document.querySelector(`#${fields[2]}`).value;
        let userPasswordConfirmation = document.querySelector(`#${fields[3]}`).value;

        let emailAlreadyRegistered = false;

        if (userEmail == false || userPassword == false || userName == false || userPasswordConfirmation == false) {
            alert("Gentileza preencher todos os campos");
        } else {
            if (userPassword != userPasswordConfirmation) {
                alert("As senhas não coincidem, gentileza tentar novamente.");
            } else {               
                registerUser(userName, userEmail, userPassword);
            }
        }
    });
}



const editAll = async (userName, userPfp, userBio, userFavoriteGames) => {
    const res1 = await fetch(URL1);
    const profiles = await res1.json();

    var newName = userName;
    var newPfp = userPfp;
    var newBio = userBio;
    var newUserFavoriteGames = userFavoriteGames;

    //checa quais estão vazios para manter
    if(userName == "0" || userName == null){
        newName = profiles[idUsuarioLogado].nome;
    }
    if(newPfp == "0" || newPfp == null){
        newPfp = profiles[idUsuarioLogado].foto;
    }
    if(newBio == "0" || newBio == null){
        newBio = profiles[idUsuarioLogado].bio;
    }
    if(newUserFavoriteGames == [] || newUserFavoriteGames == null){
        newUserFavoriteGames = profiles[idUsuarioLogado].nome;
    }


    //muda no db
    const data = {
        nome: newName,
        foto: newPfp,
        bio: newBio,
        idJogos: newUserFavoriteGames
    }

    const idUsuarioLogado = localStorage.getItem("idUsuarioLogado");

    fetch(`${URL1}/${idUsuarioLogado}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })

    window.location.replace('Gprofile.html');
}



const getCheckedItems = async () => {

    const username = document.getElementById("editUsername").value;
    const pfp = document.getElementById("editPfp").value;
    const bio = document.getElementById("editBioText").value;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedItems = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          checkedItems.push(checkbox.value);
        }
    });

    // Do something with the checked items
    console.log("Checked items:", checkedItems);

    console.log(username);
    console.log(pfp);
    console.log(bio);
    // You can perform further actions with the checked items here

    editAll(username, pfp, bio, checkedItems);



}
