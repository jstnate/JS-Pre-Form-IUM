document.addEventListener('DOMContentLoaded', function() {
    let index = 1;

    // Get DOM elements
    let preformContainer = document.getElementById('preform-container');
    let preform = document.getElementById('preform');
    let isEligibleMessage = document.getElementById('slide-eligible');
    let isNotEligibleMessage = document.getElementById('slide-not-eligible');
    let closePreform = document.getElementById('close-preform');

    // Function to handle slide actions
    function slideAction(id) {
        const buttonSlide = document.getElementById(`next-slide-${id}`);
        const slideElement = document.getElementById(`slide-${id}`);

        if (buttonSlide) {
            buttonSlide.onclick = function () {
                // Récupérer la largeur du slideElement
                const slideWidth = preform.offsetWidth;
                const newPosition = -(slideWidth * index);  // Calculer la nouvelle position
                slideElement.style.transform = `translateX(${newPosition}px)`; // Appliquer la nouvelle position
                index++;

                const newElement = document.getElementById(`slide-${index}`);
                newElement.style.transform = 'translateX(0)';

                slideAction(index)
            };
        }
    }

    // Initialize slides to their starting positions
    for (let i = 1; i <= 5; i++) {
        const slideElement = document.getElementById(`slide-${i}`);
        if(i === 1) {
            slideElement.style.transform = 'translateX(0)';
        } else {
            slideElement.style.transform = `translateX(${preform.offsetWidth}px)`;
        }
        setTimeout(() => slideElement.classList.add('transition'), 1500);
    }

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
            if (window.innerWidth < 768) {
                isNotEligibleMessage.style.width = `${window.innerWidth}px`
            }
        }
    }

    // Set up the first slide action
    slideAction(index);
    preform.onsubmit = displayFinalMessage;

    // Détecter la langue du navigateur
    const userLang = navigator.language || navigator.userLanguage;

    // Textes en anglais pour la traduction
    const enTranslation = {
        'Admission Internationale' : 'International Admission',
        'Avant de commencer, vérifions ensemble si nos programmes vous correspondent.' : 'Before we begin, let\'s check if our programs are right for you.',
        'Cette procédure d’admission internationale est à destination d’étudiants étrangers résident hors de France.' : "This international admission procedure is intended for foreign students living outside France.",
        "Si vous êtes déjà en France, je vous invite à candidater directement sur le site des écoles." : "If you are already in France, please apply directly on the schools' websites",
        'Continuer' : 'Continue',
        'Candidature nationale' : 'National application',
        'soumettre' : 'Submit',
        "Êtes-vous résident en France ?" : "Are you a resident of France?",
        "Je suis étudiant international résident hors de France" : "I am an international student living outside France",
        "Je suis étudiant international résident en France" : "I am an international student living in France",
        "Quel est votre budget annuel d'étude ?" : "What is your annual study budget?",
        "Moins de 7 000 euros par an" : "Less than 7,000 euros a year",
        "Entre 7 000 et 12 000 euros par an" : "Between 7,000 and 12,000 euros per year",
        "Plus de 12 000 euros par an" : "More than 12,000 euros a year",
        "Dans quelle langue souhaitez-vous réaliser vos études ?" : "In which language would you like to study?",
        "Français" : "French",
        "Anglais" : "English",
        "Quel est votre niveau dans la langue d'enseignement ?" : "What is your level in the language of instruction?",
        "Débutant (A1-A2)" : "Beginner (A1-A2)",
        "Intermédiaire (B1-B2)" : "Intermediate (B1-B2)",
        "Confirmé (C1-C2)" : "Advanced (C1-C2)",
        "Nous vous remercions pour l’intérêt que vous portez à nos formations." : "Thank you for your interest in our training courses.",
        "Attention, afin de pouvoir candidater, nous exigeons un niveau minimum intermédiaire (B2) dans la langue d’enseignement." : "Please note that in order to apply, we require a minimum intermediate level (B2) in the language of instruction.",
        "Aussi, nos formations commencent à partir à 7000 € par an." : "Our training courses start at €7000 per year.",
        "N’hésitez pas à nous contacter si besoin :" : "Don't hesitate to contact us:",
        "L'Equipe des admissions internationales" : "International Admissions Team",
        "Vous êtes éligible à la candidature." : "You are eligible to apply.",
        "Vous allez être redirigé vers le formulaire de candidature dans quelques secondes." : "You'll be redirected to the application form in a few seconds.",
        "Si ce n’est pas le cas, cliquez sur le lien ci-dessous :" : "If not, click on the link below:",
        "Lien vers le formulaire de candidature" : "Link to application form",
        'Fermer' : 'Close',
        'Lien vers le formulaire de candidature' : 'Link to application form'
    };

    // Traduire si la langue du navigateur n'est pas en français
    if (!userLang.startsWith('fr')) {
        const elements = document.querySelectorAll(".to-translate");

        elements.forEach(el => {
            const text = el.textContent.trim();
            if (enTranslation[text]) {
                el.textContent = enTranslation[text];
            }
        });
    }
});
