const slides = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

// Total de imagens originais (sem contar as duplicadas)
const totalImages = 4; 

// Variáveis para toque
let startX = 0;
let endX = 0;

// Atualiza a posição das imagens
function updateSlider(animated = true) {
    const width = slides.querySelector('img').clientWidth;

    // Habilita ou desabilita a transição
    slides.style.transition = animated ? "transform 0.5s ease" : "none";
    slides.style.transform = `translateX(-${currentIndex * width}px)`;
}

// Botão "Próximo"
nextButton.addEventListener('click', () => {
    currentIndex++;
    updateSlider();

    // Reinicia para o início quando atinge o final
    if (currentIndex === totalImages) {
        setTimeout(() => {
            currentIndex = 0;
            updateSlider(false); // Atualiza sem animação
        }, 500); // Tempo igual à duração da transição
    }
});

// Botão "Anterior"
prevButton.addEventListener('click', () => {
    currentIndex--;
    updateSlider();

    // Reinicia para o final quando atinge o início
    if (currentIndex < 0) {
        setTimeout(() => {
            currentIndex = totalImages - 1;
            updateSlider(false); // Atualiza sem animação
        }, 500);
    }
});

// Eventos de toque
slides.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX; // Ponto inicial do toque
});

slides.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX; // Atualiza o ponto final enquanto desliza
});

slides.addEventListener('touchend', () => {
    const diffX = endX - startX;

    if (Math.abs(diffX) > 50) { // Deslize válido (distância mínima)
        if (diffX > 0) {
            // Deslizou para a direita
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = totalImages - 1; // Volta ao final
                updateSlider(false);
            } else {
                updateSlider();
            }
        } else {
            // Deslizou para a esquerda
            currentIndex++;
            if (currentIndex === totalImages) {
                currentIndex = 0; // Volta ao início
                updateSlider(false);
            } else {
                updateSlider();
            }
        }
    }
});

// Inicializa o carrossel
updateSlider();


const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]; // Cores
         currentIndex = 0;

        function changeBackground() {
            // Muda a cor de fundo
            document.body.style.backgroundColor = colors[currentIndex];
            currentIndex = (currentIndex + 1) % colors.length; // Próxima cor em loop
        }

        // Muda a cor a cada 2 segundos
        setInterval(changeBackground, 1000);