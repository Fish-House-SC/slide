const slides = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

// Total de imagens originais (sem contar as duplicadas)
const totalImages = 4; 

//variaveis para toque
let startX = 0
let endX = 0

// Atualiza a posição das imagens
function updateSlider(animated = true) {
    const width = slides.querySelector('img').clientWidth;

    // Habilita ou desabilita a transição
    
    slides.style.transition = animated ? "transform 0.5s ease": "none"
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
        startX = event.touches[0].clientX  // ponto inicial do toque

    })

    slides.addEventListener('touchmove', (event)=>{
        endX = event.touches[0].clientX // Atualiza o ponto final enquanto desliza

    })

    slides.addEventListener('touchend',() =>{
        const diffx = end - startX
        if(Math.abs(diffx)> 50){  // Deslize valido(distacia minima)
            if(diffx > 0){
                //deslizou para a direita
                currentIndex--
                if(currentIndex < 0){
                    currentIndex = totalImages - 1 // volta ao final
                    updateSlider(false)
                } else{
                    updateSlider()
                }
            }else {
              // deslizou para esquerda
              currentIndex++
              if(currentIndex === totalImages){
                currentIndex = 0
                updateSlider(false)
              }  else{
                updateSlider()
              }
            }
        }
    })

// Inicializa o carrossel
updateSlider();
