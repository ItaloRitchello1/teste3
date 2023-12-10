function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        denunciado: document.getElementById("denunciado").value,
    };

    const serviceID = "service_q2ympqp";
    const templateID = "template_kkni0a8";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            document.getElementById("denunciado").value = "";
            console.log(res);
            alert("Your message sent successfully!!")

        })
        .catch(err => console.log(err));
}


function updateMessageField() {
    var checkboxes = document.querySelectorAll('.Checkbox input[type="checkbox"]:checked');
    var messageField = document.getElementById('message');

    if (checkboxes.length > 3) {
        alert("Você pode selecionar no máximo 3 opções.");
        checkboxes[checkboxes.length - 1].checked = false;
    } else {
        messageField.value = "Opções selecionadas:\n";
        checkboxes.forEach(function (checkbox) {
            messageField.value += "- " + checkbox.value + "\n";
        });

        updateSubmitButton();
    }
}

$(document).ready(function () {
    $.ajax({
        url: 'https://match-time-backend.vercel.app/users',
        dataType: 'json',
        success: function (data) {
            mostraIds(data);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar dados:', status, error);
        }
    });
});

function mostraIds(users) {
    var cardGroup = $('#usuariosDisponiveis');

    $.each(users, function (index, userData) {
        var cardHtml = `
            <div class="user-sample w-100 mr-3" style="text-align: left; font-size: 25px;">
                <img src="${userData.foto}" alt="${userData.nome}" style="max-width: 60px; max-height: 60px; border-radius: 50%;" class="mb-2">
                ${userData.nome}
            </div>
        `;
        cardGroup.append(cardHtml);
    });
}
