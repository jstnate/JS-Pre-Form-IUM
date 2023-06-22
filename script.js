// Initialize index
let index = 1;

// Get DOM elements
let preformContainer = document.getElementById('preform-container');
let preform;
let isEligibleMessage;
let isNotEligibleMessage;
let closePreform;

// HTML template for the form
const formHTML = `
    <div id="preform-section" class="w-full flex items-center justify-center h-full">
        <form id="preform" class="flex items-center w-full items-center justify-center">
            <fieldset id="slide-1" class="flex flex-col items-start gap-8 md:gap-4 h-responsive md:h-preform-fieldset-h md:max-w-preform-fieldset-w md:w-preform-fieldset-w px-12 py-8 shadow-fieldset-shadow">
                <h5 class="font-tungsten text-h5 p-0">Admission</h5>
                <p class="font-raleway text-p pb-6">Lorem ipsum dolor sit amet consectetur. Mattis sem maecenas mauris condimentum nulla nunc molestie fermentum at. Convallis risus nulla tempor vulputate volutpat adipiscing.</p>
                <a id="next-slide-1" class="font-raleway text-button uppercase font-bold px-button-x py-button-y bg-inseec-red text-white hover:bg-black transition hover:pointer">Continue</a>
            </fieldset>
            <fieldset id="slide-2" class="hidden flex-col items-start justify-between w-full h-responsive md:h-preform-fieldset-h md:max-w-preform-fieldset-w md:w-preform-fieldset-w px-12 py-8 shadow-fieldset-shadow">
                <h5 class="font-tungsten text-h5 p-0">Admission</h5>
                <h6 class="font-bold font-raleway text-h6 mt-4 mb-2 ">
                    What is your English level ?
                </h6>
                <div>
                    <input type="radio" name="english-level" id="no-skills" value="no-skills"  class="accent-inseec-red hover:pointer" checked>
                    <label for="no-skills">I don't speak English</label>
                </div>
                <div>
                    <input type="radio" name="english-level" id="beginner" value="beginner" class="accent-inseec-red hover:pointer">
                    <label for="beginner">Beginner (A1-A2)</label>
                </div>
                <div>
                    <input type="radio" name="english-level" id="intermediate" value="intermediate" class="accent-inseec-red hover:pointer">
                    <label for="intermediate">Intermediate (B1-B2)</label>
                </div>
                <div>
                    <input type="radio" name="english-level" id="advance" value="advance" class="accent-inseec-red hover:pointer">
                    <label for="advance">Advance (C1)</label>
                </div>
                <div>
                    <input type="radio" name="english-level" id="native" value="native" class="accent-inseec-red hover:pointer">
                    <label for="native">Native (C2)</label>
                </div>
                <div class="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-0 md:w-full justify-between mt-12 md:mt-6">
                    <div class="w-full flex items-center justify-between md:justify-normal md:gap-4">
                        <hr class="h-3 w-12 bg-inseec-red">
                        <hr class="h-3 w-12 bg-gray-200">
                    </div>
                    <a id="next-slide-2" class="font-raleway text-button uppercase font-bold px-button-x py-button-y bg-inseec-red text-white hover:bg-black transition hover:pointer">Next</a>
                </div>
            </fieldset>
            <fieldset id="slide-3" class="hidden flex-col items-start justify-between w-full h-responsive md:h-preform-fieldset-h md:max-w-preform-fieldset-w md:w-preform-fieldset-w px-12 py-8 shadow-fieldset-shadow">
                <h5 class="font-tungsten text-h5 p-0">Admission</h5>
                <h6 class="font-bold font-raleway text-h6">
                    Are you aware that tuition fees for you program are about :
                </h6>
                <p class="w-full font-raleway font-normal text-p pb-6 flex md:items-center items-start flex-col md:flex-row">
                    <span class="w-full md:w-auto font-raleway font-normal text-p flex items-center justify-between md:justify-normal">
                                <span>
                                    <strong class="mr-1">Bachelor :</strong>
                                    13 500€
                                </span>
                        <span class="flex bg-inseec-red rounded-full w-[5px] h-[5px] my-4 md:my-0 md:mx-4"></span>
                        <span>
                            <strong class="mr-1">MSC :</strong>
                            25 000€
                        </span>
                    </span>
                    <span class="hidden md:flex bg-inseec-red rounded-full w-[5px] h-[5px] my-4 md:my-0 md:mx-4"></span>
                    <span class="w-full md:w-auto font-raleway font-normal text-p flex items-center justify-between md:justify-normal">
                        <span>
                            <strong class="mr-1">MBA :</strong>
                            40 000 €
                        </span>
                        <span class="flex bg-inseec-red rounded-full w-[5px] h-[5px] my-4 md:my-0 ml-6 md:mx-4"></span>
                        <span>
                            <strong class="mr-1">DBA :</strong>
                            49 500€
                        </span>
                    </span>
                </p>
                <div>
                    <input type="radio" name="aware-abt-fees" id="aware" value="aware" class="accent-inseec-red hover:pointer" checked>
                    <label for="aware">Yes</label>
                </div>
                <div>
                    <input type="radio" name="aware-abt-fees" id="not-aware" value="not-aware" class="accent-inseec-red hover:pointer">
                    <label for="not-aware">No</label>
                </div>
                <div class="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-0 md:w-full justify-between mt-12 md: mt-0">
                    <div class="w-full flex items-center justify-between md:justify-normal md:gap-4">
                        <hr class="h-3 w-12 bg-black">
                        <hr class="h-3 w-12 bg-inseec-red">
                    </div>
                    <button type="submit" id="next-slide-3" class="font-raleway text-button uppercase font-bold px-button-x py-button-y bg-inseec-red text-white hover:bg-black transition hover:pointer">Submit</button>
                </div>
            </fieldset>
        </form>
        <div id="slide-not-eligible" class="hidden flex-col items-start gap-6 min-h-preform-fieldset-h max-w-preform-fieldset-w lg:w-preform-fieldset-w px-12 py-8 shadow-fieldset-shadow">
            <h6 class="font-bold font-raleway text-h6">Thank for your interest in our University.</h6>
            <p class="font-raleway font-normal text-p flex items-center">
                It looks like you are not eligible to apply for this program according to the answers you provided.
                However, we would be delighted to guide you and to tell you more about another program that would be suitable for your profile.
            </p>
            <p class="font-raleway font-normal pb-2 text-p" >In case of any doubt, please contact the Admissions Team at <a href="mailto:admissions@monaco.edu" class="ml-1 font-raleway font-normal text-p underline text-inseec-red hover:text-black transition">admissions@monaco.edu</a></p>
            <a id="close-preform" class="font-raleway text-button uppercase font-bold px-button-x py-button-y bg-inseec-red text-white hover:bg-black transition">Close</a>
        </div>

        <div id="slide-eligible" class="hidden flex-col items-start gap-4 md:w-preform-fieldset-w px-12 py-16 shadow-fieldset-shadow">
            <h6 class="font-bold font-raleway text-h6">You are eligible to apply.</h6>
            <p class="font-raleway font-normal text-p">
                You will be redirected to the application form in a few seconds.
                If not, click the link below :
            </p>
            <a href="https://candidater.monaco.edu/#/ium" target="_blank" class="font-raleway font-normal text-p underline text-inseec-red hover:text-black transition hover:pointer">Link to application form</a>
        </div>
    </div>
`;

// Function to generate the preform
function generatePreform() {
    preformContainer.innerHTML = formHTML;
}

// Function to handle slide actions
function slideAction(id) {
    const currentSlide = document.getElementById(`slide-${id}`);
    const nextSlide = document.getElementById(`slide-${id + 1}`);
    const buttonSlide = document.getElementById(`next-slide-${id}`);

    if (buttonSlide && currentSlide && nextSlide) {
        // Set onclick event for the slide button
        buttonSlide.onclick = function (event) {
            displaySlide(currentSlide, nextSlide, event);
        };
    }
}

// Function to display a slide
function displaySlide(slide, nextSlide) {
    // Hide current slide
    slide.classList.remove('flex');
    slide.classList.add('hidden');
    // Show next slide
    nextSlide.classList.remove('hidden');
    nextSlide.classList.add('flex');
    // Increment index
    index++;
    // Set up slide action for the next slide
    slideAction(index);
}

// Function to display the final message based on form inputs
function displayFinalMessage(e) {
    e.preventDefault();
    const englishLevelChoice = document.querySelector('input[name="english-level"]:checked');
    const isAwareAboutTuitionFees = document.querySelector('input[name="aware-abt-fees"]:checked');

    // Hide the form
    preform.classList.remove('flex');
    preform.classList.add('hidden');

    // Display appropriate message based on form inputs
    if (
        (englishLevelChoice.value === 'intermediate' || englishLevelChoice.value === 'advance' || englishLevelChoice.value === 'native')
        && isAwareAboutTuitionFees.value === 'aware'
    ) {
        isEligibleMessage.classList.remove('hidden');
        isEligibleMessage.classList.add('flex');
    } else {
        isNotEligibleMessage.classList.remove('hidden');
        isNotEligibleMessage.classList.add('flex');
    }
}

// Function to set up the preform and attach event handlers
window.onload = function () {
    // Generate the preform
    generatePreform();
    // Set up slide action for the initial slide
    slideAction(index);

    // Get additional DOM elements
    preform = document.getElementById('preform');
    isEligibleMessage = document.getElementById('slide-eligible');
    isNotEligibleMessage = document.getElementById('slide-not-eligible');
    closePreform = document.getElementById('close-preform');

    // Event handler for closing the "not eligible" message
    closePreform.onclick = function () {
        isNotEligibleMessage.classList.remove('flex');
        isNotEligibleMessage.classList.add('hidden');
    };

    // Event handler for form submission
    preform.onsubmit = displayFinalMessage;
};
