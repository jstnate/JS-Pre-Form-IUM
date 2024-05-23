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
            <h5 class="font-tungsten text-h5">Admission</h5>
            <div id="preform-slider" class="flex items-start gap-12 transition">
                <fieldset id="slide-1" class="flex flex-col items-start gap-8 md:gap-4 md:w-calc-fieldset-w" style="border: none;">
                    <p class="w-full font-raleway text-p pb-6 pt-2">
                        Welcome to the International University of Monaco!
                        Thank you for your interest.
                        Before you start your application, we have a few questions for you.
                    </p>
                    <a id="next-slide-1" class="font-raleway text-button uppercase font-bold px-button-x py-button-y bg-inseec-red text-white hover:bg-black transition hover:cursor-pointer">Continue</a>
                </fieldset>
                <fieldset id="slide-2" class="flex flex-col items-start gap-4 md:gap-2 md:w-calc-fieldset-w" style="border: none;">
                    <h6 class="font-bold font-raleway text-h6  mb-2 ">
                        What is your English level ?
                    </h6>
                    <div>
                        <input type="radio" name="english-level" id="no-skills" value="no-skills"  class="accent-inseec-red hover:cursor-pointer" checked>
                        <label for="no-skills">I don't speak English</label>
                    </div>
                    <div>
                        <input type="radio" name="english-level" id="beginner" value="beginner" class="accent-inseec-red hover:cursor-pointer">
                        <label for="beginner">Beginner (A1-A2)</label>
                    </div>
                    <div>
                        <input type="radio" name="english-level" id="intermediate" value="intermediate" class="accent-inseec-red hover:cursor-pointer">
                        <label for="intermediate">Intermediate (B1-B2)</label>
                    </div>
                    <div>
                        <input type="radio" name="english-level" id="advance" value="advance" class="accent-inseec-red hover:cursor-pointer">
                        <label for="advance">Advance (C1)</label>
                    </div>
                    <div>
                        <input type="radio" name="english-level" id="native" value="native" class="accent-inseec-red hover:cursor-pointer">
                        <label for="native">Native (C2)</label>
                    </div>
                    <div class="flex flex-col md:flex-row items-start md:items-end gap-4 mt-6 md:mt-0 md:gap-0 md:w-full justify-between ">
                        <div class="w-full flex items-center justify-between md:justify-normal md:gap-4">
                            <hr class="h-3 w-12 bg-inseec-red">
                            <hr class="h-3 w-12 bg-gray-200">
                        </div>
                        <a id="next-slide-2" class="font-raleway text-button uppercase font-bold px-button-x py-button-y bg-inseec-red text-white hover:text-white hover:bg-black transition hover:cursor-pointer">Next</a>
                    </div>
                </fieldset>
                <fieldset id="slide-3" class="flex flex-col items-start gap-4 md:gap-2 md:w-calc-fieldset-w" style="border: none;">
                    <h6 class="font-bold font-raleway text-h6">
                        Do you know the steps to apply ?
                    </h6>
                    <p class="w-full font-raleway font-normal text-p pb-2 flex md:items-center items-start flex-col md:flex-row">
                            <span class="w-full md:w-auto font-raleway font-normal text-p flex md:flex-row flex-col md:items-center md:justify-between justify-normal md:my-2">
                                <span>
                                    <strong class="mr-1">Step 1 :</strong>
                                    Fill in the application form and upload your documents
                                </span>
                                <span class="flex bg-inseec-red rounded-full w-[5px] md:w-[8px] h-[5px] my-4 md:my-0 md:mr-6 md:ml-4"></span>
                                <span>
                                    <strong class="mr-1">Step 2 :</strong>
                                    Pay the application fee from <span class="text-inseec-red">70 to 80 euros</span>
                                </span>
                                <span class="flex bg-inseec-red rounded-full w-[5px] md:w-[8px] h-[5px] my-4 md:my-0 md:mr-6 md:ml-4"></span>
                                <span>
                                    <strong class="mr-1">Step 3 :</strong>
                                    Wait for you eligibility
                                </span>
                            </span>
                    </p>
                    <div>
                        <input type="radio" name="aware-abt-fees" id="aware" value="aware" class="accent-inseec-red hover:cursor-pointer" checked>
                        <label for="aware">Yes</label>
                    </div>
                    <div>
                        <input type="radio" name="aware-abt-fees" id="not-aware" value="not-aware" class="accent-inseec-red hover:cursor-pointer">
                        <label for="not-aware">No</label>
                    </div>
                    <div class="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-0 md:w-full justify-between mt-8">
                        <div class="w-full flex items-center justify-between md:justify-normal md:gap-4">
                            <hr class="h-3 w-12 bg-black">
                            <hr class="h-3 w-12 bg-inseec-red">
                        </div>
                        <button type="submit" id="next-slide-3" style="border-radius: 0; border: none;" class="font-raleway text-button uppercase font-bold px-button-x py-button-y bg-inseec-red text-white hover:bg-black transition hover:cursor-pointer">Submit</button>
                    </div>
                </fieldset>
            </div>
        </form>
        <div id="slide-not-eligible" class="hidden flex-col items-start gap-6 min-h-preform-fieldset-h max-w-preform-fieldset-w lg:w-preform-fieldset-w px-12 py-8 shadow-fieldset-shadow">
            <h6 class="font-bold font-raleway text-h6">Thank for your interest in our University.</h6>
            <p class="font-raleway font-normal text-p flex items-center">
                It looks like you are not eligible to apply for this program according to the answers you provided.
                However, we would be delighted to guide you and to tell you more about another program that would be suitable for your profile.
            </p>
            <p class="font-raleway font-normal pb-2 text-p" >In case of any doubt, please contact the Admissions Team at <a href="mailto:admissions@monaco.edu" class="ml-1 font-raleway font-normal text-p underline text-inseec-red hover:text-black transition">admissions@monaco.edu</a> or at +377 97 98 69 96</p>
            <a id="close-preform" class="font-raleway text-button uppercase font-bold px-button-x py-button-y bg-inseec-red text-white hover:bg-black transition">Close</a>
        </div>

        <div id="slide-eligible" class="hidden flex-col items-start gap-4 md:w-preform-fieldset-w px-12 py-16 shadow-fieldset-shadow">
            <h6 class="font-bold font-raleway text-h6">You are eligible to apply.</h6>
            <p class="font-raleway font-normal text-p">
                You will be redirected to the application form in a few seconds.
                If not, click the link below :
            </p>
            <a href="https://candidater.monaco.edu/#/ium" target="_blank" class="font-raleway font-normal text-p underline text-inseec-red hover:text-black transition hover:cursor-pointer">Link to application form</a>
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
        const englishLevelChoice = document.querySelector('input[name="english-level"]:checked');

        // Hide the form
        preform.classList.remove('flex');
        preform.classList.add('hidden');

        // Display appropriate message based on form inputs
        if (englishLevelChoice.value === 'intermediate' || englishLevelChoice.value === 'advance' || englishLevelChoice.value === 'native') {
            isEligibleMessage.classList.remove('hidden');
            isEligibleMessage.classList.add('flex');
            const link = document.querySelector("#slide-eligible a");
            if (link) {
                setTimeout(() => {
                    window.open(link.href, '_blank');
                }, 1000);
            }
        } else {
            isNotEligibleMessage.classList.remove('hidden');
            isNotEligibleMessage.classList.add('flex');

            if (window.innerWidth < 768) {
                isNotEligibleMessage.style.width = `${window.innerWidth}px`
            }
        }
    }

    // Function to set up the preform and attach event handlers
    window.onload = function () {
        // Generate the preform
        // generatePreform();

        // Détecter la langue du navigateur
        // const userLang = navigator.language || navigator.userLanguage;
        //
        // // Textes en anglais pour la traduction
        // const enTranslation = {
        //     "Questions d'éligibilité" : "Eligibility Questions",
        //     "Bienvenue à l'Université Internationale de Monaco ! Nous vous remercions de votre intérêt." : "Welcome to the International University of Monaco! Thank you for your interest.",
        //     "Avant de commencer votre candidature, nous avons quelques questions à vous poser." : "Before you start your application, we'd like to ask you a few questions.",
        //     "Continuer" : "Continue",
        //     "Quel est votre niveau d'anglais ?" : "What's your level of English?",
        //     "Je ne parle pas anglais" : "I don't speak english",
        //     "Débutant (A1-A2)" : "Beginner (A1-A2)",
        //     "Intermédiaire (B1-B2)" : "Intermediate (B1-B2)",
        //     "Avancé (C1)" : "Advanced (C1)",
        //     "Natif (C2)" : "Native (C2)",
        //     "Suivant" : "Next",
        //     "Connaissez-vous les étapes pour candidater ?" : "Are you aware about the steps to apply ?",
        //     "Etape 1 :" : "Step 1 :",
        //     "Etape 2 :" : "Step 2 :",
        //     "Etape 3 :" : "Step 3 :",
        //     "Remplir le formulaire de demande et télécharger vos documents" : "Fill in the application form and upload your documents",
        //     "Payez les frais de dossier de" : "Pay the application fee from ",
        //     "70 à 80 euros" : "70 to 80 euros",
        //     "L'équipe d'admission vous informera de votre admissibilité." : "The admissions team will let you know about your eligibility.",
        //     "Oui" : "Yes",
        //     "Non" : "No",
        //     "Soumettre" : "Submit",
        //     "Nous vous remercions de l'intérêt que vous portez à notre université." : "Thank you for your interest in our university.",
        //     "D'après les réponses que vous avez fournies, il semble que vous ne soyez pas éligible pour ce programme." : "From the answers you've given, it seems that you're not eligible for this program.",
        //     "Cependant, nous serions ravis de vous guider et de vous renseigner sur un autre programme qui conviendrait à votre profil." : "However, we'd be delighted to guide you and tell you about another program that suits your profile.",
        //     "En cas de doute, veuillez contacter l'équipe chargée des admissions à l'adresse suivante :" : "If in doubt, please contact the admissions team at the following address",
        //     "ou à" : "or at",
        //     "Fermer" : "Close",
        //     "Vous êtes éligible à la candidature." : "You are eligible to apply.",
        //     "Vous serez redirigé vers le formulaire de candidature dans quelques secondes." : "You'll be redirected to the application form in a few seconds.",
        //     "Si ce n'est pas le cas, cliquez sur le lien ci-dessous :" : "If not, click on the link below:",
        //     "Lien vers le formulaire de candidature" : "Link to application form"
        // };
        //
        // // Traduire si la langue du navigateur n'est pas en français
        // if (!userLang.startsWith('fr')) {
        //     const elements = document.querySelectorAll(".to-translate");
        //
        //     elements.forEach(el => {
        //         const text = el.textContent.trim();
        //         console.log(text)
        //         if (enTranslation[text]) {
        //             el.textContent = enTranslation[text];
        //         }
        //     });
        // }

        // Get additional DOM elements
        preform = document.querySelector('form#preform');
        preformSlider = document.getElementById('preform-slider');
        isEligibleMessage = document.getElementById('slide-eligible');
        isNotEligibleMessage = document.getElementById('slide-not-eligible');
        closePreform = document.getElementById('close-preform');
        computedStyle = window.getComputedStyle(preform)

        if(innerWidth < 768) {
            const width = parseInt(computedStyle.width) - (parseInt(computedStyle.paddingRight) * 2)

            for (let i = 1; i <= 3; i++) {
                document.getElementById(`slide-${i}`).style.width = `${width}px`
            }
        } else {
            for (let i = 1; i <= 3; i++) {
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

    function addParamsToUrl() {
        console.log("new");
    
        // Get the current page URL
        var currentPageUrl = window.location.href;
        // Get the URL parameters
        var urlParams = new URLSearchParams(currentPageUrl.split('?')[1]);
    
        // Get all the buttons with the class "candidature"
        var buttons = document.querySelectorAll("#slide-eligible a, #slide-in-france a");
    
        // For each button
        buttons.forEach(function(button) {
            // Check if the "href" attribute exists
            if (!button.hasAttribute("href")) {
                console.error("The button must have an 'href' attribute");
                return; // If the "href" attribute is missing, exit the loop
            }
    
            // Get the URL present on the button
            var buttonUrl = new URL(button.getAttribute("href"), window.location.origin);
    
            // Append the current URL parameters to the button URL
            urlParams.forEach((value, key) => {
                buttonUrl.searchParams.set(key, value);
            });
            console.log(buttonUrl.toString());
    
            // Set the "href" attribute of the button with the new URL
            button.setAttribute("href", buttonUrl.toString());
    
            // Add the target="_blank" attribute to open the link in a new tab
            button.setAttribute("target", "_blank");
        });
    }
    
    addParamsToUrl();
    

    addParamsToUrl();

    window.addEventListener('resize', () => {
        if(innerWidth < 768) {
            const width = parseInt(computedStyle.width) - (parseInt(computedStyle.paddingRight) * 2)

            for (let i = 1; i <= 3; i++) {
                document.getElementById(`slide-${i}`).style.width = `${width}px`
            }
        } else {
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`slide-${i}`).style.cssText = ''
            }
        }
        slideAction(index)
    });

});


