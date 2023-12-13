const languages = ['pt', 'en', 'es'];

const text_survey = {
    pt: [
        "O artigo foi útil?",
        "Sim",
        "Não",
        "Por que o artigo não foi útil?",
        "Deixe um comentário (opcional)",
        "Limite de 100 caracteres",
        "Enviar",
        "Cancelar",
        "Agradecemos o seu comentário",
    ],
    en: [
        "Was this article helpful?",
        "Yes",
        "No",
        "Why wasn't the article helpful?",
        "Leave a comment (optional)",
        "100 characters limit",
        "Send",
        "Cancel",
        "Thanks for your feedback"
    ],
    es: [
        "¿Este artículo ha sido útil?",
        "Sí",
        "No",
        "¿Por qué no te resultó útil el artículo?",
        "Dejar un comentario (opcional)",
        "Límite de 100 caracteres",
        "Enviar",
        "Cancelar",
        "Gracias por su respuesta",
    ],
}

const text_negative_feedback_options = {
    pt: [
        "Difícil de entender",
        "Informações incorretas",
        "Não contém as informações que eu preciso",
        "Desatualizado",
        "Outro",
    ],
    en: [
        "Hard to understand",
        "Incorrect information",
        "Missing the information I need",
        "Translation is wrong",
        "Other",
    ],
    es: [
        "Difícil de entender",
        "Información incorrecta",
        "Falta la información que necesito",
        "Problema de traducción",
        "Otro",
    ],
}

function generateSurveyHTML(language) {
    const negativeFeedbackHTML = generateNegativeFeedbackHTML(language);

    return `
        <div class="wrap-survey">
            <div class="article-survey" id="article-survey">
                <span>${text_survey[language][0]}</span>
                <div class="button-group" id="button-group">
                    <button class="article-survey-button" data-value="1" type="button" id="article-survey-button-yes">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" id="article-survey-button-yes"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" id="article-survey-button-yes"/></svg>
                    ${text_survey[language][1]}
                    </button>
                    <button class="article-survey-button" data-value="0" type="button" id="article-survey-button-no">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"><path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" /></svg>
                    ${text_survey[language][2]}
                    </button>
                </div>
            </div>
            
            <div class="modal-feedback" id="modal-feedback">
                ${negativeFeedbackHTML}
            </div>

            <div class="feedback-finish" id="feedback-finish">
                <span>${text_survey[language][8]}</span>
            </div>
        </div>`;
}

function generateNegativeFeedbackHTML(language) {
    const textNegativeFeedbackOptions = text_negative_feedback_options[language];
    const optionsNegativeFeedbackHTML = textNegativeFeedbackOptions
        .map((option, index) => `
            <div class="container-reason-negative-feedback">
                <input type="radio" class="reason-negative-feedback" name="reason-negative-feedback" id="${option}">
                <label for="${option}">${text_negative_feedback_options[language][index]}</label>
            </div>`)
        .join('');

    const negativeFeedbackHTML = `
        
        <div class="dialog-negative-feedback" id="dialog-negative-feedback">
            <span class="header-dialog-negative-feedback">${text_survey[language][3]}</span>

            ${optionsNegativeFeedbackHTML}
            
            <div class="container-negative-feedback-comment">
                <label for="negative-feedback-comment">${text_survey[language][4]}</label>
                <textarea id="negative-feedback-comment" name="negative-feedback-comment" maxlength="100"></textarea>
                <span>${text_survey[language][5]}</span>
            </div>

            <button class="button_send_negative_feedback" id="button_send_negative_feedback">${text_survey[language][6]}</button>
            <button class="button_cancel_negative_feedback" id="button_cancel_negative_feedback">${text_survey[language][7]}</button>
        </div>
    `;

    return negativeFeedbackHTML;
}

function createContainerSurvey(component) {

    const containerSurvey = document.createElement("div");
    containerSurvey.classList.add("container_survey");
    component.insertAdjacentElement("beforebegin", containerSurvey)
    component.remove();

    return containerSurvey;

}

function insertSurvey(language) {
    const html_paragraphs = Array.from(document.querySelectorAll("p"));
    const component_feedback_article = html_paragraphs.find(text => text.innerText === '{{component-feedback-article}}');

    if (component_feedback_article) {

        const containerSurvey = createContainerSurvey(component_feedback_article);
        const surveyHTML = generateSurveyHTML(language);

        renderSurvey(containerSurvey, surveyHTML);

        generateEventsButtonsSurvey();

    } else {

        console.log("Componente de feedback não está incluído nesta página");

    }
}

function renderSurvey(container, surveyHTML) {
    container.innerHTML = surveyHTML;
}

function generateEventsButtonsSurvey() {
    const button_no = document.getElementById("article-survey-button-no");
    const button_yes = document.getElementById("article-survey-button-yes");
    const button_send_negative_feedback = document.getElementById("button_send_negative_feedback");
    const button_cancel_negative_feedback = document.getElementById("button_cancel_negative_feedback");
    const radios_reason_negative_feedback = document.querySelectorAll(".container-reason-negative-feedback input[type='radio']");

    button_yes.addEventListener("click", () => sendPositiveFeedback());
    button_no.addEventListener("click", () => openModalFeedback());

    button_send_negative_feedback.addEventListener("click", () => sendNegativeFeedback());
    button_cancel_negative_feedback.addEventListener("click", () => closeModalFeedback());
    
    disableSendNegativeFeedbackButton();

    radios_reason_negative_feedback.forEach(radio => {
        radio.addEventListener('click', () => {
            console.log(radio.id);
            enableSendFeedbackButton();
        });
    });

}

function disableSendNegativeFeedbackButton() {
    const button_send_negative_feedback = document.getElementById("button_send_negative_feedback");
    button_send_negative_feedback.classList.add("article-survey-button-disabled");
    button_send_negative_feedback.disabled = true;
}

function enableSendFeedbackButton() {
    const button_send_negative_feedback = document.getElementById("button_send_negative_feedback");
    button_send_negative_feedback.classList.remove("article-survey-button-disabled");
    button_send_negative_feedback.disabled = false;
}

function openModalFeedback() {
    const modal_feedback = document.getElementById("modal-feedback");
    modal_feedback.classList.add("show-modal-feedback");

    const button_no = document.getElementById("article-survey-button-no");
    const button_yes = document.getElementById("article-survey-button-yes");
    button_no.disabled = true;
    button_yes.disabled = true;
}

function closeModalFeedback() {
    const modal_feedback = document.getElementById("modal-feedback");
    modal_feedback.classList.remove("show-modal-feedback");

    const button_no = document.getElementById("article-survey-button-no");
    const button_yes = document.getElementById("article-survey-button-yes");
    button_no.disabled = false;
    button_yes.disabled = false;
}

function sendPositiveFeedback() {
    const article_survey = document.getElementById("article-survey");
    const feedback_finish = document.getElementById("feedback-finish");

    article_survey.classList.add("is-closed")
    feedback_finish.classList.add("is-open");
}

function sendNegativeFeedback() {
    const article_survey = document.getElementById("article-survey");
    const feedback_finish = document.getElementById("feedback-finish");
    const modal_feedback = document.getElementById("modal-feedback")

    modal_feedback.classList.remove("show-modal-feedback");
    article_survey.classList.add("is-closed")
    feedback_finish.classList.add("is-open");
}

const url_include_survey = document.URL;
const array_url_include_survey = url_include_survey.split("/");
const language_include_survey = array_url_include_survey[3];

if (languages.includes(language_include_survey)) {
    // Se o idioma estiver disponível
    insertSurvey(language_include_survey);
} else {
    // Se o idioma não estiver disponível
    insertSurvey('pt');
}