document.addEventListener("DOMContentLoaded", function () {


    //tudo sobre o chat
  
    // login elements
    const login = document.querySelector(".login")
    const loginForm = login.querySelector(".login__form")
    const loginInput = login.querySelector(".login__input")
  
    // chat elements
    const chat = document.querySelector(".chat")
    const chatForm = chat.querySelector(".chat__form")
    const chatInput = chat.querySelector(".chat__input")
    const chatMessages = chat.querySelector(".chat__messages")
    const chatMessagesWrapper = chat.querySelector(".chat__messages-wrapper"); // Adicionado
  
    const colors = [
      "cadetblue",
      "darkgoldenrod",
      "cornflowerblue",
      "darkkhaki",
      "hotpink",
      "gold"
    ]
  
    const user = { id: "", name: "", color: "" }
  
    let websocket
  
    const createMessageSelfElement = (content) => {
      const div = document.createElement("div")
  
      div.classList.add("message--self")
      div.innerHTML = content
  
      return div
    }
  
    const createMessageOtherElement = (content, sender, senderColor) => {
      const div = document.createElement("div")
      const span = document.createElement("span")
  
      div.classList.add("message--other")
  
      span.classList.add("message--sender")
      span.style.color = senderColor
  
      div.appendChild(span)
  
      span.innerHTML = sender
      div.innerHTML += content
  
      return div
    }
  
    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length)
      return colors[randomIndex]
    }
  
    const scrollScreen = () => {
      window.document.querySelector("#rolar").scrollTo({
        top: document.querySelector("#rolar").scrollHeight,
        behavior: "smooth"
      })
    }
  
    const processMessage = ({ data }) => {
      const { userId, userName, userColor, content } = JSON.parse(data)
  
      const message =
        userId == user.id
          ? createMessageSelfElement(content)
          : createMessageOtherElement(content, userName, userColor)
  
      chatMessages.appendChild(message)
      scrollScreen()
    }
  
    const handleLogin = (event) => {
      event.preventDefault()
  
      user.id = crypto.randomUUID()
      user.name = loginInput.value
      user.color = getRandomColor()
  
      login.style.display = "none"
      chat.style.display = "flex"
  
      websocket = new WebSocket("wss://backend-chat-msny.onrender.com")
      websocket.onmessage = processMessage
    }
  
    const sendMessage = (event) => {
      event.preventDefault()
  
      const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
      }
  
      websocket.send(JSON.stringify(message))
  
      chatInput.value = ""
    }
  
    loginForm.addEventListener("submit", handleLogin)
    chatForm.addEventListener("submit", sendMessage)
  
    //tudo sobre o chat^^
  
  
    //Lista de players 
  
  
    $(document).ready(function () {
      var users; // Variável para armazenar todos os usuários carregados
      var currentIndexTeam1 = 0; // Índice do usuário atual para a Equipe 1
      var currentIndexTeam2 = 0; // Índice do usuário atual para a Equipe 2
  
      $('#team1JoinButton').on('click', function () {
        var cardGroup = $('#team1Players');
        addNextPlayerToTeam(cardGroup, 1);
      });
  
      $('#team2JoinButton').on('click', function () {
        var cardGroup2 = $('#team2Players');
        addNextPlayerToTeam(cardGroup2, 2);
      });
  
      function addNextPlayerToTeam(cardGroup, teamNumber) {
        if (!users || (teamNumber === 1 && currentIndexTeam1 >= users.length) || (teamNumber === 2 && currentIndexTeam2 >= users.length)) {
          // Se não houver usuários ou se todos os usuários já foram adicionados, pare
          return;
        }
  
        var userData = users[teamNumber === 1 ? currentIndexTeam1++ : currentIndexTeam2++]; // Obtém o próximo jogador da lista
        var cardHtml = `
        <div class="user-sample w-100 mr-3" style="text-align: left; font-size: 25px;">
          <img src="${userData.foto}" alt="${userData.nome}" style="max-width: 60px; max-height: 60px; border-radius: 50%;" class="mb-2">
          ${userData.nome}
        </div>
      `;
        cardGroup.append(cardHtml);
      }
  
      // Função para carregar todos os usuários uma vez
      function loadUsers() {
        $.ajax({
          url: 'https://match-time-backend.vercel.app/users',
          dataType: 'json',
          success: function (data) {
            users = data; // Armazena todos os usuários carregados na variável
          },
          error: function (xhr, status, error) {
            console.error('Erro ao carregar dados:', status, error);
          }
        });
      }
  
      // Carregar todos os usuários uma vez quando a página é carregada
      loadUsers();
    });
  });