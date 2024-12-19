const slides = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

// Total de imagens originais (sem contar as duplicadas)
const totalImages = 4; 

// Atualiza a posição das imagens
function updateSlider(animated = true) {
    const width = slides.querySelector('img').clientWidth;

    // Habilita ou desabilita a transição
    if (animated) {
        slides.style.transition = "transform 0.5s ease";
    } else {
        slides.style.transition = "none";
    }

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

// Inicializa o carrossel
updateSlider();
