document.addEventListener("DOMContentLoaded", function () {
  let index = 1;

  // Get DOM elements
  let preformContainer = document.getElementById("preform-container");
  let preform = document.getElementById("preform");
  let isEligibleMessage = document.getElementById("slide-eligible");
  let isNotEligibleMessage = document.getElementById("slide-not-eligible");
  let closePreform = document.getElementById("close-preform");

  // Function to handle slide actions
  function slideAction(id) {
    const buttonSlide = document.getElementById(`next-slide-${id}`);
    const slideElement = document.getElementById(`slide-${id}`);

    slideElement.style.transition = "transform 0.4s ease-in-out";

    if (buttonSlide) {
      buttonSlide.onclick = function () {
        if (
          slideElement.id === "slide-2" &&
          document.querySelector('input[id="reside"]').checked
        ) {
          const alreadyInFrance = document.getElementById("slide-in-france");
          preform.classList.remove("flex");
          preform.classList.add("hidden");
          alreadyInFrance.classList.remove("hidden");
          alreadyInFrance.classList.remove("flex");
        } else {
          // Récupérer la largeur du slideElement
          const slideWidth = preform.offsetWidth;
          const newPosition = -(slideWidth * index); // Calculer la nouvelle position
          slideElement.style.transform = `translateX(${newPosition}px)`; // Appliquer la nouvelle position
          index++;

          const newElement = document.getElementById(`slide-${index}`);
          newElement.style.transform = "translateX(0)";

          slideAction(index);
        }
      };
    }
  }

    function addParamsToUrl() {
        console.log('working');
        // Récupérer l'URL de la page en cours
        var currentPageUrl = window.location.href;
        // Récupérer les paramètres de l'URL
        var urlParams = new URLSearchParams(currentPageUrl.split('?')[1]);

        // Récupérer tous les boutons avec la classe "candidature"
        var buttons = document.querySelectorAll("#slide-eligible a, #slide-in-france a");

        // Pour chaque bouton
        buttons.forEach(function(button) {
            // Vérifier si l'attribut "href" existe
            if (!button.hasAttribute("href")) {
                console.error("Le bouton avec la classe 'candidature' doit avoir un attribut 'href'");
                return; // Si l'attribut "href" est absent, sortir de la boucle
            }

            // Bloquer le lien d'origine du bouton
            button.addEventListener("click", function(event) {
                event.preventDefault();
            });

            // Récupérer l'URL présente sur le bouton
            var buttonUrl = button.getAttribute("href");
            // Vérifier si l'attribut "target" existe
            var isBlank = button.hasAttribute("target") && button.getAttribute("target") === "_blank";
            // Vérifier si l'URL contient déjà des paramètres
            var hasParams = buttonUrl.includes("?");
            // Ajouter le point d'interrogation s'il n'existe pas déjà
            buttonUrl += hasParams ? "&" : "?";
            // Créer une copie des paramètres pour chaque bouton
            var buttonUrlParams = new URLSearchParams(urlParams);
            // Ajouter les paramètres à l'URL présente sur le bouton
            buttonUrlParams.forEach(function(value, key) {
                buttonUrl += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
            });
            // Supprimer le dernier "&"
            buttonUrl = buttonUrl.slice(0, -1);
            // Définir l'attribut "href" du bouton avec la nouvelle URL
            button.setAttribute("href", buttonUrl);
            // Ajouter l'attribut target="_blank" pour ouvrir le lien dans un nouvel onglet
            button.setAttribute("target", "_blank");
        });
    }

    addParamsToUrl();

  function displayFinalMessage(e) {
    e.preventDefault();
    const userResidence = document.querySelector(
      'input[name="residence"]:checked'
    );
    const userBudget = document.querySelector('input[name="budget"]:checked');
    const speakingLevel = document.querySelector(
      'input[name="speaking-level"]:checked'
    );

    // Hide the form
    preform.classList.remove("flex");
    preform.classList.add("hidden");

    // Display appropriate message based on form inputs
    if (
      userResidence.value === "no" &&
      userBudget.value !== "small" &&
      speakingLevel.value !== "beginner"
    ) {
      isEligibleMessage.classList.remove("hidden");
      isEligibleMessage.classList.add("flex");
      setTimeout(() => {
        document.querySelector("#slide-eligible a").click();
      }, 1000);
    } else {
      isNotEligibleMessage.classList.remove("hidden");
      isNotEligibleMessage.classList.add("flex");
      if (window.innerWidth < 768) {
        isNotEligibleMessage.style.width = `${window.innerWidth}px`;
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
    "Admission Internationale": "International Admission",
    "Avant de commencer, vérifions ensemble si nos programmes vous correspondent.":
      "Before we begin, let's check if our programs are right for you.",
    "Cette procédure d’admission internationale est à destination d’étudiants étrangers résident hors de France.":
      "This international admission procedure is intended for foreign students living outside France.",
    "Si vous êtes déjà en France, je vous invite à candidater directement sur le site des écoles.":
      "If you are already in France, please apply directly on the schools' websites",
    Candidater: "Candidate",
    Continuer: "Continue",
    "Candidature nationale": "National application",
    soumettre: "Submit",
    "Êtes-vous résident en France ?": "Are you a resident of France?",
    "Je suis étudiant international résident hors de France":
      "I am an international student living outside France",
    "Je suis étudiant international résident en France":
      "I am an international student living in France",
    "Quel est votre budget annuel d'étude ?":
      "What is your annual study budget?",
    "Moins de 7 000 euros par an": "Less than 7,000 euros a year",
    "Entre 7 000 et 12 000 euros par an":
      "Between 7,000 and 12,000 euros per year",
    "Plus de 12 000 euros par an": "More than 12,000 euros a year",
    "Dans quelle langue souhaitez-vous réaliser vos études ?":
      "In which language would you like to study?",
    Français: "French",
    Anglais: "English",
    "Quel est votre niveau dans la langue d'enseignement ?":
      "What is your level in the language of instruction?",
    "Débutant (A1-A2)": "Beginner (A1-A2)",
    "Intermédiaire (B1-B2)": "Intermediate (B1-B2)",
    "Confirmé (C1-C2)": "Advanced (C1-C2)",
    "Nous vous remercions pour l’intérêt que vous portez à nos formations.":
      "Thank you for your interest in our training courses.",
    "Attention, afin de pouvoir candidater, nous exigeons un niveau minimum intermédiaire (B2) dans la langue d’enseignement.":
      "Please note that in order to apply, we require a minimum intermediate level (B2) in the language of instruction.",
    "Aussi, nos formations commencent à partir à 7000 € par an.":
      "Our training courses start at €7000 per year.",
    "N’hésitez pas à nous contacter si besoin :":
      "Don't hesitate to contact us:",
    "L'Equipe des admissions internationales": "International Admissions Team",
    "Vous êtes éligible à la candidature.": "You are eligible to apply.",
    "Vous allez être redirigé vers le formulaire de candidature dans quelques secondes.":
      "You'll be redirected to the application form in a few seconds.",
    "Si ce n’est pas le cas, cliquez sur le lien ci-dessous :":
      "If not, click on the link below:",
    "Lien vers le formulaire de candidature": "Link to application form",
    Fermer: "Close",
    "Lien vers le formulaire de candidature": "Link to application form",
  };

  // Traduire si la langue du navigateur n'est pas en français
  // if (!userLang.startsWith('fr')) {
  //     const elements = document.querySelectorAll(".to-translate");

  //     elements.forEach(el => {
  //         const text = el.textContent.trim();
  //         if (enTranslation[text]) {
  //             el.textContent = enTranslation[text];
  //         }
  //     });
  // }
});
