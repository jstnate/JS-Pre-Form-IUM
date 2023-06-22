let index = 1

function slideAction(id) {
    let currentSlide = document.getElementById(`slide-${id}`)
    let buttonSlide = document.getElementById(`next-slide-${id}`)
    let nextSlide = document.getElementById(`slide-${id+1}`)

    if (buttonSlide && currentSlide && nextSlide) {
        buttonSlide.onclick = function(event) {
            displaySlide(currentSlide, nextSlide, event);
        };
    }
}

function displaySlide(slide, nextSlide) {
    console.log(slide, nextSlide)
    slide.classList.remove('flex')
    slide.classList.add('hidden')
    nextSlide.classList.remove('hidden')
    nextSlide.classList.add('flex')
    index++
    slideAction(index)
}

window.onload = function() {
    slideAction(index);
};