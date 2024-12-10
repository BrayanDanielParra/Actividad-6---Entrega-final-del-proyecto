(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);


// Chat

const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', handleUserInput);

function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    addMessageToChat(userMessage, 'user');
    userInput.value = '';

    handleBotResponse(userMessage);
}

function addMessageToChat(message, sender) {
    const chatWindow = document.getElementById('chatWindow');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);


    if (message.includes('\n')) {
        messageElement.innerHTML = message.replace(/\n/g, '<br>');
    } else {
        messageElement.innerHTML = message;
    }

    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function handleBotResponse(userMessage) {
    let botMessage = '';

    switch (userMessage) {
        case '1':
            botMessage = '¿Qué sesión desea visitar?\n';
            botMessage += '1.1 Página de inicio\n';
            botMessage += '1.2 ¿Quiénes somos?\n';
            botMessage += '1.3 Otra...\n';
            currentStep = '1';
            break;
        case '2':

            botMessage = '<a href="/index.html" target="_blank">Da click aquí para conocer nuestros centros médicos aliados...</a>';

            break;
        case '3':

            botMessage = '<a href="/index.html" target="_blank">Da click aquí para conocer nuestras oficinass...</a>';
            break;
        case '4':
            botMessage = 'Redirigiendo con un Asesor...\n';
            botMessage += 'Por favor espere un momento, ya que nuestros asesores se encuentran ocupados.';
            setTimeout(() => window.location.href = '#contacto', 1000);
            break;

        case '1.1':
            botMessage = '<a href="/index.html" target="_blank">Da click aquí para ir al Inicio...</a>';
            
            break;
        case '1.2':
            botMessage = 'Te dirigimos a la sección "¿Quiénes somos?"';
            setTimeout(() => window.location.href = '/inicio', 1000);
            break;
        case '1.3':
            botMessage = 'Te ofrecere otras opciones, por favor espera un momento...';
            break;
        default:
            botMessage = 'Por favor, elige una opción válida: 1, 2, 3 o 4.';
    }

    addMessageToChat(botMessage, 'bot');

}
