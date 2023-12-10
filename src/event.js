$(document).ready(function () {
    $.ajax({
        url: 'https://match-time-backend.vercel.app/eventos',
        dataType: 'json',
        success: function (data) {
            mostraEventos(data);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar dados:', status, error);
        }
    });
});

function mostraEventos(eventos) {
    var eventContainer = $('#event-container');

    $.each(eventos, function (index, eventData) {
        var newDiv = $('<div>', {
            class: 'row efeito-fundo',
            css: {
                borderRadius: '10px',
                marginBottom: '30px',
                display: 'flex',
                padding: '20px'
            }
        });

        var imgDiv = $('<div>', {
            class: 'col-lg-2 col-md-6 col-sm-12 event',
            css: {
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center'
            }
        });

        var img = $('<img>', {
            class: 'game-poster',
            css: {
                width: '85%',
                height: '100%',
                borderRadius: '30px'
            },
            src: eventData.img
        });

        imgDiv.append(img);

        var textDiv = $('<div>', {
            class: 'col-lg-9 col-md-6 col-sm-12'
        });

        var eventText = $('<div>', {
            class: 'event-text'
        });

        var title = $('<h4>', {
            text: eventData.Titulo,
            css: {
                margin: '10px',
                padding: '5px',
                textAlign: 'left',
                color: 'white',
                textShadow: '0 0 0.2em #87F, 0 0 0.2em #87F, 0 0 0.2em #87F'
            }
        });

        var description = $('<p>', {
            text: eventData.descricao
        });

        var playButton = $('<button>', {
            class: 'button-gamer',
            css: {
                padding: '10px',
                alignSelf: 'auto',
                backgroundColor: 'azure'
            },
            type: 'button',
            text: 'Jogar Agora',
            click: function () {
                window.location.href = 'lobby-room.html';
            }
        });

        eventText.append(title, description, playButton);
        textDiv.append(eventText);
        newDiv.append(imgDiv, textDiv);
        eventContainer.append(newDiv);
    });
}
