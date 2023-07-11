document.addEventListener('DOMContentLoaded', function() {
    // Initialize index
    let index = 1;
    let currentSlideIndex;
    let nextSlideIndex;

    // Get DOM elements
    let preformContainer = document.getElementById('preform-container');
    let computedStyle;
    let preform;
    let preformSlider;
    let isEligibleMessage;
    let isNotEligibleMessage;
    let closePreform;

    // HTML template for the form
    const formHTML = `
        <div id="preform-section" class="w-full flex items-center justify-center h-full">
        <form id="preform" class="flex flex-col items-start sm:min-h[70vh] max-h-[90vh] md:h-preform-fieldset-h w-full md:max-w-preform-fieldset-w md:w-preform-fieldset-w px-12 py-6 shadow-fieldset-shadow overflow-hidden relative">
            <h5 class="font-inseecu text-h5 mb-6">Admission Internationale</h5>
            <div id="preform-slider" class="flex items-start gap-12 transition">
                <fieldset id="slide-1" class="flex flex-col items-start gap-8 md:gap-4 md:w-calc-fieldset-w" style="border: none;">
                    <h6 class="w-full font-inter pt-2 font-bold text-h6">Avant de commencer, vérifions ensemble si nos programmes vous correspondent.</h6>
                    <p class="w-full font-inter text-p pb-6">Cette procédure d’admission internationale est à destination d’étudiant étrangers résident hors de France. Si vous êtes déjà en France, je vous invite à candidater directement sur le site des écoles.</p>
                    <div class="flex flex-col items-start md:flex-row gap-6">
                        <a id="next-slide-1" class="font-inter text-button uppercase font-bold px-button-x py-button-y bg-inseec-purple text-white hover:bg-black transition hover:cursor-pointer rounded-button">Continuer</a>
                        <a href=" https://www.omneseducation.com/le-groupe/international/etudiant-francais/" class="font-inter text-button uppercase font-bold px-button-x py-button-y bg-gray-200 text-inseec-purple hover:bg-black transition hover:cursor-pointer rounded-button">Candidature nationale</a>
                    </div>
                </fieldset>
                <fieldset id="slide-2" class="flex flex-col items-start gap-4 md:gap-2 md:w-calc-fieldset-w h-full" style="border: none;">
                    <h6 class="font-bold font-inter text-h6 mb-2 mt-4">
                        Êtes-vous résident en France ?
                    </h6>
                    <div>
                        <input type="radio" name="residence" id="ne-reside-pas" value="no" class="accent-inseec-purple hover:cursor-pointer" checked>
                        <label for="ne-reside-pas">Je suis étudiant international résident hors de France</label>
                    </div>
                    <div>
                        <input type="radio" name="residence" id="reside" value="yes"  class="accent-inseec-purple hover:cursor-pointer">
                        <label for="reside">Je suis étudiant international résident en France</label>
                    </div>
                    <div class="flex flex-col md:flex-row items-start md:items-end gap-4 mt-28 md:mt-20 md:gap-0 w-4/6 md:w-full justify-between ">
                        <div class="w-full flex items-center justify-between md:justify-normal md:gap-4">
                            <hr class="h-3 w-12 bg-inseec-purple">
                            <hr class="h-3 w-12 bg-gray-200">
                            <hr class="h-3 w-12 bg-gray-200">
                            <hr class="h-3 w-12 bg-gray-200">
                        </div>
                        <a id="next-slide-2" class="font-inter text-button uppercase font-bold px-button-x py-button-y bg-inseec-purple text-white hover:text-white hover:bg-black transition hover:cursor-pointer rounded-button">Continuer</a>
                    </div>
                </fieldset>
                <fieldset id="slide-3" class="flex flex-col items-start gap-4 md:gap-2 md:w-calc-fieldset-w h-full" style="border: none;">
                    <h6 class="font-bold font-inter text-h6 mb-2 mt-4">
                        Quel est votre budget annuel d'étude ?
                    </h6>
                    <div>
                        <input type="radio" name="budget" id="small" value="small" class="accent-inseec-purple hover:cursor-pointer" checked>
                        <label for="small">Moins de 7 000 euros par an</label>
                    </div>
                    <div>
                        <input type="radio" name="budget" id="medium" value="medium"  class="accent-inseec-purple hover:cursor-pointer">
                        <label for="medium">Entre 7 000 et 12 000 euros par an</label>
                    </div>
                    <div>
                        <input type="radio" name="budget" id="large" value="large"  class="accent-inseec-purple hover:cursor-pointer">
                        <label for="large">Plus de 12 000 euros par an</label>
                    </div>
                    <div class="flex flex-col md:flex-row items-start md:items-end gap-4 mt-20 md:mt-12 md:gap-0 w-4/6 md:w-full justify-between ">
                        <div class="w-full flex items-center justify-between md:justify-normal md:gap-4">
                            <hr class="h-3 w-12 bg-black">
                            <hr class="h-3 w-12 bg-inseec-purple">
                            <hr class="h-3 w-12 bg-gray-200">
                            <hr class="h-3 w-12 bg-gray-200">
                        </div>
                        <a id="next-slide-3" class="font-inter text-button uppercase font-bold px-button-x py-button-y bg-inseec-purple text-white hover:text-white hover:bg-black transition hover:cursor-pointer rounded-button">Continuer</a>
                    </div>
                </fieldset>
                <fieldset id="slide-4" class="flex flex-col items-start gap-4 md:gap-2 md:w-calc-fieldset-w h-full" style="border: none;">
                    <h6 class="font-bold font-inter text-h6 mt-6">
                        Dans quelle langue souhaitez-vous réaliser vos études ?
                    </h6>
                    <div>
                        <input type="radio" name="language" id="french" value="french" class="accent-inseec-purple hover:cursor-pointer" checked>
                        <label for="french">Français</label>
                    </div>
                    <div>
                        <input type="radio" name="language" id="english" value="english" class="accent-inseec-purple hover:cursor-pointer">
                        <label for="english">Anglais</label>
                    </div>
                    <div class="flex flex-col md:flex-row items-start md:items-end gap-4 mt-20 md:gap-0 w-4/6 md:w-full justify-between ">
                        <div class="w-full flex items-center justify-between md:justify-normal md:gap-4">
                            <hr class="h-3 w-12 bg-black">
                            <hr class="h-3 w-12 bg-black">
                            <hr class="h-3 w-12 bg-inseec-purple">
                            <hr class="h-3 w-12 bg-gray-200">
                        </div>
                        <a id="next-slide-4" class="font-inter text-button uppercase font-bold px-button-x py-button-y bg-inseec-purple text-white hover:text-white hover:bg-black transition hover:cursor-pointer rounded-button">Continuer</a>
                    </div>
                </fieldset>
                <fieldset id="slide-5" class="flex flex-col items-start gap-4 md:gap-2 md:w-calc-fieldset-w" style="border: none;">
                    <h6 class="font-bold font-inter text-h6">
                       Quel est votre niveau de la langue d'enseignement ?
                    </h6>
                    <div>
                        <input type="radio" name="speaking-level" id="beginner" value="beginner" class="accent-inseec-purple hover:cursor-pointer" checked>
                        <label for="beginner">Débutant (A1-A2)</label>
                    </div>
                    <div>
                        <input type="radio" name="speaking-level" id="intermediate" value="intermediate" class="accent-inseec-purple hover:cursor-pointer">
                        <label for="intermediate">Intermédiaire (B1-B2)</label>
                    </div>
                    <div>
                        <input type="radio" name="speaking-level" id="confirmed" value="confirmed" class="accent-inseec-purple hover:cursor-pointer">
                        <label for="confirmed">Confirmé (C1-C2)</label>
                    </div>
                    <div class="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-0 w-4/6 mt-20 md:w-full justify-between mt-8 md:mt-20">
                        <div class="w-full flex items-center justify-between md:justify-normal md:gap-4">
                            <hr class="h-3 w-12 bg-black">
                            <hr class="h-3 w-12 bg-black">
                            <hr class="h-3 w-12 bg-black">
                            <hr class="h-3 w-12 bg-inseec-purple">
                        </div>
                        <button type="submit" id="next-slide-5" style="border: none;" class="font-inter text-button uppercase font-bold px-button-x py-button-y bg-inseec-purple text-white hover:text-white hover:bg-black transition hover:cursor-pointer rounded-button">soumettre</button>
                    </div>
                </fieldset>
            </div>
        </form>
        <div id="slide-not-eligible" class="hidden flex-col items-start gap-6 min-h-preform-fieldset-h max-w-preform-fieldset-w lg:w-preform-fieldset-w px-12 py-8 shadow-fieldset-shadow">
            <h6 class="font-bold font-inter text-h6">Nous vous remercions pour l’intérêt que vous portez à nos formations.</h6>
            <p class="font-inter font-normal text-p flex flex-col items-center gap-8">
                Attention, afin de pouvoir candidater, nous exigeons un niveau minimum intermédiaire (B2) dans la langue d’enseignement.
                <br class="my-2">
                Aussi, nos formations commencent à partir à 7000 € par an.
            </p>
            <p class="font-inter font-normal pb-2 text-p flex flex-col items-start">N’hésitez pas à nous contacter si besoin :
                <a href="mailto:internationaladmissions@omneseducation.com" class="my-2 font-inter font-normal text-p underline text-inseec-purple hover:text-black transition">internationaladmissions@omneseducation.com</a>
                <a class="font-inter font-normal text-p underline text-inseec-purple hover:text-black transition">+33 01 53 38 84 30</a>
            </p>
            <p class="font-inter font-normal text-p flex items-center">
                L'Equipe des admissions internationales
                <br class="my-1">
                Omnes Education
            </p>
            <a id="close-preform" class="font-inter text-button uppercase font-bold px-button-x py-button-y bg-inseec-purple text-white hover:bg-black transition rounded-button">Fermer</a>
        </div>

        <div id="slide-eligible" class="hidden flex-col items-start gap-4 md:w-preform-fieldset-w px-12 py-16 shadow-fieldset-shadow">
            <h6 class="font-bold font-inter text-h6">Vous êtes éligible à la candidature.</h6>
            <p class="font-inter font-normal text-p">
                Vous allez être redirigé vers le formulaire de candidature dans quelques secondes.
                Si ce n’est pas le cas, cliquez sur le lien ci-dessous :
            </p>
            <a href="https://candidater.omneseducation.com/#/international" target="_blank" class="font-inter font-normal text-p underline text-inseec-purple hover:text-black transition hover:cursor-pointer">Link to application form</a>
        </div>
    </div>
    `;

    // Function to generate the preform
    function generatePreform() {
        preformContainer.innerHTML = formHTML;
    }

    // Function to handle slide actions
    function slideAction(id) {
        const buttonSlide = document.getElementById(`next-slide-${id}`);

        if (buttonSlide) {
            nextSlideIndex = (parseInt(computedStyle.width) * index) - (parseInt(computedStyle.paddingRight) * index)
            currentSlideIndex = (parseInt(computedStyle.width) * (index - 1))  - (parseInt(computedStyle.paddingRight) * index)
            // Set onclick event for the slide button
            buttonSlide.onclick = function () {
                displaySlide(currentSlideIndex, nextSlideIndex);
            };
        }
    }

    // Function to display a slide
    function displaySlide(removeTransformWidth, addTransformWidth) {
        index >= 1 ? preformSlider.style.cssText = `transform: translateX(-${removeTransformWidth}px)` : ""
        preformSlider.style.cssText = `transform: translateX(-${addTransformWidth}px)`

        index++;
        // Set up slide action for the next slide
        slideAction(index);
    }

    // Function to display the final message based on form inputs
    function displayFinalMessage(e) {
        e.preventDefault();
        const userResidence = document.querySelector('input[name="residence"]:checked');
        const userBudget = document.querySelector('input[name="budget"]:checked');
        const speakingLevel = document.querySelector('input[name="speaking-level"]:checked');

        // Hide the form
        preform.classList.remove('flex');
        preform.classList.add('hidden');

        // Display appropriate message based on form inputs
        if (
            userResidence.value === 'no' && userBudget.value !== 'small' && speakingLevel.value !== 'beginner'
        ) {
            isEligibleMessage.classList.remove('hidden');
            isEligibleMessage.classList.add('flex');
            setTimeout(() => {
                window.open('https://candidater.omneseducation.com/#/international', '_blank');
            }, 1000)
        } else {
            isNotEligibleMessage.classList.remove('hidden');
            isNotEligibleMessage.classList.add('flex');
        }
    }

    // Function to set up the preform and attach event handlers
    window.onload = function () {
        // Generate the preform
        // generatePreform();

        // Get additional DOM elements
        preform = document.getElementById('preform');
        preformSlider = document.getElementById('preform-slider');
        isEligibleMessage = document.getElementById('slide-eligible');
        isNotEligibleMessage = document.getElementById('slide-not-eligible');
        closePreform = document.getElementById('close-preform');
        computedStyle = window.getComputedStyle(preform)

        if(innerWidth < 768) {
            const width = parseInt(computedStyle.width) - (parseInt(computedStyle.paddingRight) * 2)
            for (let i = 1; i <= 5; i++) {
                document.getElementById(`slide-${i}`).style.width = `${width}px`;
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                document.getElementById(`slide-${i}`).style.cssText = ''
            }
        }

        // Set up slide action for the initial slide
        slideAction(index);

        // Event handler for closing the "not eligible" message
        closePreform.onclick = function () {
            isNotEligibleMessage.classList.remove('flex');
            isNotEligibleMessage.classList.add('hidden');
        };

        // Event handler for form submission
        preform.onsubmit = displayFinalMessage;
    };
});


