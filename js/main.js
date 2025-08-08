/**
 * @file Script principal para la aplicación interactiva "Aprèn Català".
 * Gestiona la navegación, los ejercicios de vocabulario, verbos, diálogos y más.
 * @author Gemini CLI
 * @version 2.1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('button.nav-button[data-target]');
    const sections = document.querySelectorAll('.section-content');
    const currentPage = window.location.pathname.split('/').pop();

    if (navButtons.length > 0 && sections.length > 0) {
        function showSection(targetId) {
            navButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.target === targetId);
            });
            sections.forEach(section => {
                section.classList.toggle('active', section.id === targetId);
            });
        }

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                showSection(button.dataset.target);
            });
        });

        const initialSectionId = window.location.hash ? window.location.hash.substring(1) : (navButtons[0]?.dataset.target || '');
        if (initialSectionId) {
            showSection(initialSectionId);
        }

        if (currentPage === 'unit1.html') {
            initVocabCardsU1();
            initVerbExplorerU1();
            initDialogueCheckU1();
            initMatchingGameU1();
            initPresentationGeneratorU1();
        } else if (currentPage === 'unit2.html') {
            initVocabCardsU2();
            initVerbExplorerU2();
            initDialogueCheckU2();
            initMatchingGameU2();
            initDescriptionGeneratorU2();
        }
    }
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Diccionario de nombres geográficos comunes y su forma correcta en catalán
const geographicalNames = {
    'venezuela': 'Veneçuela',
    'madrid': 'Madrid',
    'barcelona': 'Barcelona',
    'argentina': 'Argentina',
    'colombia': 'Colòmbia',
    'mexico': 'Mèxic',
    'roma': 'Roma',
    'paris': 'París',
    'londres': 'Londres',
    'alemania': 'Alemanya',
    'francia': 'França',
    'italia': 'Itàlia',
    'estados unidos': 'Estats Units',
    'brasil': 'Brasil',
    'chile': 'Xile',
    'peru': 'Perú',
    'ecuador': 'Equador',
    'uruguay': 'Uruguai',
    'paraguay': 'Paraguai',
    'bolivia': 'Bolívia',
    'cuba': 'Cuba',
    'japon': 'Japó',
    'china': 'Xina',
    'rusia': 'Rússia',
    'canada': 'Canadà',
    'australia': 'Austràlia',
    'egipto': 'Egipte',
    'marruecos': 'Marroc',
    'portugal': 'Portugal',
    'grecia': 'Grècia',
    'turquia': 'Turquia',
    'india': 'Índia',
    'corea': 'Corea'
};

function validateAndDisplayTip(inputElement, tipElement, genericTip) {
    const value = inputElement.value.trim();
    let isValid = true;
    let specificTip = '';

    if (value === '') {
        inputElement.style.borderColor = '#ef4444';
        if (tipElement) {
            tipElement.textContent = genericTip;
            tipElement.classList.remove('hidden');
        }
        isValid = false;
    } else {
        inputElement.style.borderColor = '#d1d5db';
        if (tipElement) {
            tipElement.classList.add('hidden');
        }

        // Specific validation for geographical names
        if (inputElement.id === 'city-input' || inputElement.id === 'origin-input') {
            const lowerCaseValue = value.toLowerCase();
            if (geographicalNames[lowerCaseValue] && geographicalNames[lowerCaseValue] !== value) {
                inputElement.style.borderColor = '#ef4444';
                specificTip = `Consell: En català s'escriu "${geographicalNames[lowerCaseValue]}".`;
                if (tipElement) {
                    tipElement.textContent = specificTip;
                    tipElement.classList.remove('hidden');
                }
                isValid = false;
            }
        }
    }
    return isValid;
}

// --- UNITAT 1 ---
function initVocabCardsU1() {
    const section = document.getElementById('vocab');
    if (!section) return;
    const cards = section.querySelectorAll('.vocab-card');
    const resetBtn = section.querySelector('#reset-vocab-u1');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.querySelector('.translation').classList.toggle('hidden');
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            cards.forEach(card => {
                card.querySelector('.translation').classList.add('hidden');
            });
        });
    }
}

function initVerbExplorerU1() {
    const section = document.getElementById('verbs');
    if (!section) return;
    const verbSelect = section.querySelector('#verb-select');
    const pronounSelect = section.querySelector('#pronoun-select');
    const pronounText = section.querySelector('#pronoun-text');
    const verbResult = section.querySelector('#verb-result');
    const resetBtn = section.querySelector('#reset-verbs-u1');
    const verbData = {
        'ser': ['soc', 'ets', 'és', 'som', 'sou', 'són'],
        'dir-se': ['em dic', 'et dius', 'es diu', 'ens diem', 'us dieu', 'es diuen'],
        'viure': ['visc', 'vius', 'viu', 'vivim', 'viviu', 'viuen']
    };

    function updateConjugation() {
        const verb = verbSelect.value;
        const pronounIndex = pronounSelect.value;
        const pronoun = pronounSelect.options[pronounSelect.selectedIndex].text;
        pronounText.textContent = pronoun;
        verbResult.textContent = verbData[verb][pronounIndex];
    }

    function reset() {
        verbSelect.value = 'ser';
        pronounSelect.value = '0';
        updateConjugation();
    }

    verbSelect.addEventListener('change', updateConjugation);
    pronounSelect.addEventListener('change', updateConjugation);
    resetBtn.addEventListener('click', reset);
    updateConjugation();
}

function initDialogueCheckU1() {
    const section = document.getElementById('dialogues');
    if (!section) return;
    const checkBtn = section.querySelector('#check-dialogue-1-btn');
    const resetBtn = section.querySelector('#reset-dialogue-u1');
    const feedbackDiv = section.querySelector('#feedback-d1');
    const answers = {
        d1q1: { expected: 'com', tip: 'Consell: Recorda que per preguntar "cómo te llamas" en català fem servir "com", no "què".' },
        d1q2: { expected: 'quants', tip: 'Consell: Per preguntar per la quantitat d\'anys, pensa en "cuántos".' },
        d1q3: { expected: 'tinc', tip: 'Consell: Per dir l\'edat, fem servir el verb "tenir", no "ser".' },
        d1q4: { expected: 'on', tip: 'Consell: Per preguntar pel lloc d\'origen, pensa en "dónde".' },
        d1q5: { expected: 'soc', tip: 'Consell: Per dir el lloc d\'origen, fem servir el verb "ser", no "viure".' }
    };

    function check() {
        let allCorrect = true;
        for (const qId in answers) {
            const input = section.querySelector(`#${qId}`);
            const tipElement = section.querySelector(`#${qId}-tip`);
            if (input.value.trim().toLowerCase() === answers[qId].expected) {
                input.style.borderColor = '#22c55e';
                tipElement.classList.add('hidden');
            } else {
                input.style.borderColor = '#ef4444';
                tipElement.textContent = answers[qId].tip;
                tipElement.classList.remove('hidden');
                allCorrect = false;
            }
        }
        if (allCorrect) {
            feedbackDiv.textContent = 'Molt bé! Tot correcte.';
            feedbackDiv.className = 'mt-2 font-semibold feedback-correct';
        } else {
            feedbackDiv.textContent = 'Algunes respostes no són correctes. Revisa-les amb els consells.';
            feedbackDiv.className = 'mt-2 font-semibold feedback-incorrect';
        }
    }

    function reset() {
        for (const qId in answers) {
            const input = section.querySelector(`#${qId}`);
            const tipElement = section.querySelector(`#${qId}-tip`);
            input.value = '';
            input.style.borderColor = '#d1d5db';
            tipElement.classList.add('hidden');
            tipElement.textContent = '';
        }
        feedbackDiv.textContent = '';
        feedbackDiv.className = 'mt-2';
    }

    checkBtn.addEventListener('click', check);
    resetBtn.addEventListener('click', reset);
}

function initMatchingGameU1() {
    const section = document.getElementById('match');
    if (!section) return;
    const questionsCol = section.querySelector('#questions-col');
    const answersCol = section.querySelector('#answers-col');
    const matchFeedback = section.querySelector('#match-feedback');
    const resetBtn = section.querySelector('#reset-match-u1');
    let selectedQuestion = null;
    let correctMatches = 0;
    const matchData = {
        questions: [
            { id: 1, text: "Com et dius?" }, { id: 2, text: "Quants anys tens?" }, { id: 3, text: "D'on ets?" },
            { id: 4, text: "On vius?" }, { id: 5, text: "De què fas?" }, { id: 6, text: "Com s'escriu el teu nom?" }
        ],
        answers: [
            { id: 4, text: "Visc a Barcelona." }, { id: 1, text: "Em dic Laia." }, { id: 3, text: "Soc de l'Argentina." },
            { id: 2, text: "Tinc trenta-cinc anys." }, { id: 5, text: "Soc metge." }, { id: 6, text: "S'escriu L-A-I-A." }
        ]
    };

    function render() {
        questionsCol.innerHTML = '<h3 class="font-semibold text-lg mb-2 text-center">Preguntes</h3>';
        answersCol.innerHTML = '<h3 class="font-semibold text-lg mb-2 text-center">Respostes</h3>';
        shuffle(matchData.questions);
        shuffle(matchData.answers);
        matchData.questions.forEach(q => questionsCol.appendChild(createItem(q, 'question-item')));
        matchData.answers.forEach(a => answersCol.appendChild(createItem(a, 'answer-item')));
        addListeners();
    }

    function createItem(data, typeClass) {
        const button = document.createElement('button');
        button.textContent = data.text;
        button.dataset.id = data.id;
        button.className = `match-item ${typeClass} interactive-card bg-white p-4 rounded-lg shadow cursor-pointer mb-2 text-left w-full`;
        return button;
    }

    function addListeners() {
        section.querySelectorAll('.question-item').forEach(item => item.addEventListener('click', onQuestionClick));
        section.querySelectorAll('.answer-item').forEach(item => item.addEventListener('click', onAnswerClick));
    }

    function onQuestionClick(e) {
        const item = e.currentTarget;
        if (item.classList.contains('correct')) return;
        section.querySelectorAll('.question-item').forEach(q => q.classList.remove('selected'));
        item.classList.add('selected');
        selectedQuestion = item;
        matchFeedback.textContent = '';
    }

    function onAnswerClick(e) {
        const item = e.currentTarget;
        if (!selectedQuestion || item.classList.contains('correct')) return;
        if (selectedQuestion.dataset.id === item.dataset.id) {
            selectedQuestion.classList.remove('selected');
            selectedQuestion.classList.add('correct');
            item.classList.add('correct');
            matchFeedback.textContent = 'Correcte!';
            matchFeedback.className = 'text-center mt-4 font-bold feedback-correct';
            selectedQuestion = null;
            correctMatches++;
            if (correctMatches === matchData.questions.length) {
                matchFeedback.textContent = 'Molt bé! Has completat l\'exercici!';
            }
        } else {
            item.classList.add('incorrect');
            matchFeedback.textContent = 'Torna-ho a provar.';
            matchFeedback.className = 'text-center mt-4 font-bold feedback-incorrect';
            setTimeout(() => {
                item.classList.remove('incorrect');
                matchFeedback.textContent = '';
            }, 2000);
        }
    }

    function reset() {
        selectedQuestion = null;
        correctMatches = 0;
        matchFeedback.textContent = '';
        matchFeedback.className = 'text-center mt-4 font-bold';
        render();
    }

    resetBtn.addEventListener('click', reset);
    render();
}

function initPresentationGeneratorU1() {
    const section = document.getElementById('create');
    if (!section) return;
    const generateBtn = section.querySelector('#generate-btn');
    const resetBtn = section.querySelector('#reset-create-u1');
    const inputs = {
        name: section.querySelector('#name-input'),
        age: section.querySelector('#age-input'),
        profession: section.querySelector('#profession-input'),
        city: section.querySelector('#city-input'),
        origin: section.querySelector('#origin-input')
    };
    const tips = {
        name: section.querySelector('#name-tip'),
        age: section.querySelector('#age-tip'),
        profession: section.querySelector('#profession-tip'),
        city: section.querySelector('#city-tip'),
        origin: section.querySelector('#origin-tip')
    };
    const genericTips = {
        name: 'Consell: No oblidis el teu nom!',
        age: 'Consell: L\'edat és un número. Introdueix-la!',
        profession: 'Consell: Quina és la teva feina? Escriu-la!',
        city: 'Consell: On vius? Posa la ciutat!',
        origin: 'Consell: D\'on ets? Escriu el teu lloc d\'origen!'
    };
    const presentationOutput = section.querySelector('#presentation-output');
    const presentationText = section.querySelector('#presentation-text');

    function generate() {
        let allValid = true;
        for (const key in inputs) {
            if (!validateAndDisplayTip(inputs[key], tips[key], genericTips[key])) {
                allValid = false;
            }
        }

        if (allValid) {
            const name = inputs.name.value;
            const age = inputs.age.value;
            const profession = inputs.profession.value;
            const city = inputs.city.value;
            const origin = inputs.origin.value;
            const presentation = `Hola! Em dic ${name} i tinc ${age} anys. Soc ${profession} i visc a ${city}, però soc de ${origin}.`;
            presentationText.textContent = presentation;
            presentationOutput.classList.remove('hidden');
        } else {
            presentationOutput.classList.add('hidden');
        }
    }

    function reset() {
        for (const key in inputs) {
            inputs[key].value = '';
            inputs[key].style.borderColor = '#d1d5db';
            tips[key].classList.add('hidden');
            tips[key].textContent = '';
        }
        presentationOutput.classList.add('hidden');
        presentationText.textContent = '';
    }

    generateBtn.addEventListener('click', generate);
    resetBtn.addEventListener('click', reset);
}

// --- UNITAT 2 ---
function initVocabCardsU2() {
    const section = document.getElementById('vocab2');
    if (!section) return;
    const cards = section.querySelectorAll('.vocab-card');
    const resetBtn = section.querySelector('#reset-vocab-u2');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.querySelector('.translation').classList.toggle('hidden');
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            cards.forEach(card => {
                card.querySelector('.translation').classList.add('hidden');
            });
        });
    }
}

function initVerbExplorerU2() {
    const section = document.getElementById('verbs2');
    if (!section) return;
    const verbSelect = section.querySelector('#verb-select2');
    const pronounSelect = section.querySelector('#pronoun-select2');
    const pronounText = section.querySelector('#pronoun-text2');
    const verbResult = section.querySelector('#verb-result2');
    const resetBtn = section.querySelector('#reset-verbs-u2');
    const verbData = {
        'tenir': ['tinc', 'tens', 'té', 'tenim', 'teniu', 'tenen'],
        'ser': ['soc', 'ets', 'és', 'som', 'sou', 'són'],
        'portar': ['porto', 'portes', 'porta', 'portem', 'porteu', 'porten']
    };

    function updateConjugation() {
        const verb = verbSelect.value;
        const pronounIndex = pronounSelect.value;
        const pronoun = pronounSelect.options[pronounSelect.selectedIndex].text;
        pronounText.textContent = pronoun;
        verbResult.textContent = verbData[verb][pronounIndex];
    }

    function reset() {
        verbSelect.value = 'tenir';
        pronounSelect.value = '0';
        updateConjugation();
    }

    verbSelect.addEventListener('change', updateConjugation);
    pronounSelect.addEventListener('change', updateConjugation);
    resetBtn.addEventListener('click', reset);
    updateConjugation();
}

function initDialogueCheckU2() {
    const section = document.getElementById('dialogues2');
    if (!section) return;
    const checkBtn = section.querySelector('#check-dialogue-2-btn');
    const resetBtn = section.querySelector('#reset-dialogue-u2');
    const feedbackDiv = section.querySelector('#feedback-d2');
    const answers = {
        d2q1: { expected: 'es', tip: 'Consell: Per preguntar el nom d\'una tercera persona, utilitza "es".' },
        d2q2: { expected: 'diu', tip: 'Consell: El verb "dir-se" en tercera persona del singular.' },
        d2q3: { expected: 'té', tip: 'Consell: El verb "tenir" en tercera persona del singular.' },
        d2q4: { expected: 'té', tip: 'Consell: El verb "tenir" en tercera persona del singular.' },
        d2q5: { expected: 'és', tip: 'Consell: El verb "ser" en tercera persona del singular per descriure.' }
    };

    function check() {
        let allCorrect = true;
        for (const qId in answers) {
            const input = section.querySelector(`#${qId}`);
            const tipElement = section.querySelector(`#${qId}-tip`); // Assuming tip elements exist
            if (input.value.trim().toLowerCase() === answers[qId].expected) {
                input.style.borderColor = '#22c55e';
                if (tipElement) tipElement.classList.add('hidden');
            } else {
                input.style.borderColor = '#ef4444';
                if (tipElement) {
                    tipElement.textContent = answers[qId].tip;
                    tipElement.classList.remove('hidden');
                }
                allCorrect = false;
            }
        }
        if (allCorrect) {
            feedbackDiv.textContent = 'Molt bé! Tot correcte.';
            feedbackDiv.className = 'mt-2 font-semibold feedback-correct';
        } else {
            feedbackDiv.textContent = 'Algunes respostes no són correctes. Revisa-les amb els consells.';
            feedbackDiv.className = 'mt-2 font-semibold feedback-incorrect';
        }
    }

    function reset() {
        for (const qId in answers) {
            const input = section.querySelector(`#${qId}`);
            const tipElement = section.querySelector(`#${qId}-tip`); // Assuming tip elements exist
            input.value = '';
            input.style.borderColor = '#d1d5db';
            if (tipElement) {
                tipElement.classList.add('hidden');
                tipElement.textContent = '';
            }
        }
        feedbackDiv.textContent = '';
        feedbackDiv.className = 'mt-2';
    }

    checkBtn.addEventListener('click', check);
    resetBtn.addEventListener('click', reset);
}

function initMatchingGameU2() {
    const section = document.getElementById('match2');
    if (!section) return;
    const questionsCol = section.querySelector('#questions-col2');
    const answersCol = section.querySelector('#answers-col2');
    const matchFeedback = section.querySelector('#match-feedback2');
    const resetBtn = section.querySelector('#reset-match-u2');
    let selectedQuestion = null;
    let correctMatches = 0;
    const matchData = {
        questions: [
            { id: 1, text: "Qui és el pare del teu pare?" },
            { id: 2, text: "Qui és la germana de la teva mare?" },
            { id: 3, text: "Qui és el fill del teu germà?" },
            { id: 4, text: "Qui és la dona del teu oncle?" },
            { id: 5, text: "Qui és el marit de la teva filla?" }
        ],
        answers: [
            { id: 1, text: "És el meu avi." },
            { id: 2, text: "És la meva tia." },
            { id: 3, text: "És el meu nebot." },
            { id: 4, text: "És la meva tieta política." },
            { id: 5, text: "És el meu gendre." }
        ]
    };

    function render() {
        questionsCol.innerHTML = '<h3 class="font-semibold text-lg mb-2 text-center">Persona</h3>';
        answersCol.innerHTML = '<h3 class="font-semibold text-lg mb-2 text-center">Parentiu</h3>';
        shuffle(matchData.questions);
        shuffle(matchData.answers);
        matchData.questions.forEach(q => questionsCol.appendChild(createItem(q, 'question-item')));
        matchData.answers.forEach(a => answersCol.appendChild(createItem(a, 'answer-item')));
        addListeners();
    }

    function createItem(data, typeClass) {
        const button = document.createElement('button');
        button.textContent = data.text;
        button.dataset.id = data.id;
        button.className = `match-item ${typeClass} interactive-card bg-white p-4 rounded-lg shadow cursor-pointer mb-2 text-left w-full`;
        return button;
    }

    function addListeners() {
        section.querySelectorAll('.question-item').forEach(item => item.addEventListener('click', onQuestionClick));
        section.querySelectorAll('.answer-item').forEach(item => item.addEventListener('click', onAnswerClick));
    }

    function onQuestionClick(e) {
        const item = e.currentTarget;
        if (item.classList.contains('correct')) return;
        section.querySelectorAll('.question-item').forEach(q => q.classList.remove('selected'));
        item.classList.add('selected');
        selectedQuestion = item;
        matchFeedback.textContent = '';
    }

    function onAnswerClick(e) {
        const item = e.currentTarget;
        if (!selectedQuestion || item.classList.contains('correct')) return;
        if (selectedQuestion.dataset.id === item.dataset.id) {
            selectedQuestion.classList.remove('selected');
            selectedQuestion.classList.add('correct');
            item.classList.add('correct');
            matchFeedback.textContent = 'Correcte!';
            matchFeedback.className = 'text-center mt-4 font-bold feedback-correct';
            selectedQuestion = null;
            correctMatches++;
            if (correctMatches === matchData.questions.length) {
                matchFeedback.textContent = 'Molt bé! Has completat l\'exercici!';
            }
        } else {
            item.classList.add('incorrect');
            matchFeedback.textContent = 'Torna-ho a provar.';
            matchFeedback.className = 'text-center mt-4 font-bold feedback-incorrect';
            setTimeout(() => {
                item.classList.remove('incorrect');
                matchFeedback.textContent = '';
            }, 2000);
        }
    }

    function reset() {
        selectedQuestion = null;
        correctMatches = 0;
        matchFeedback.textContent = '';
        matchFeedback.className = 'text-center mt-4 font-bold';
        render();
    }

    resetBtn.addEventListener('click', reset);
    render();
}

function initDescriptionGeneratorU2() {
    const section = document.getElementById('create2');
    if (!section) return;
    const generateBtn = section.querySelector('#generate-description-btn');
    const resetBtn = section.querySelector('#reset-description-u2');
    const inputs = {
        name: section.querySelector('#fam-name-input'),
        relation: section.querySelector('#fam-relation-input'),
        age: section.querySelector('#fam-age-input'),
        hair: section.querySelector('#fam-hair-input'),
        adjective: section.querySelector('#fam-adj-input')
    };
    const tips = {
        name: section.querySelector('#fam-name-tip'),
        relation: section.querySelector('#fam-relation-tip'),
        age: section.querySelector('#fam-age-tip'),
        hair: section.querySelector('#fam-hair-tip'),
        adjective: section.querySelector('#fam-adj-tip')
    };
    const genericTips = {
        name: 'Consell: No oblidis el nom del familiar!',
        relation: 'Consell: Quin parentiu té? (ex: pare, germana)',
        age: 'Consell: Quants anys té? Introdueix-los!',
        hair: 'Consell: Quin color de cabell té? (ex: ros, moreno)',
        adjective: 'Consell: Com és? (ex: alt, simpàtic)'
    };
    const descriptionOutput = section.querySelector('#description-output');
    const descriptionText = section.querySelector('#description-text');

    function generate() {
        let allValid = true;
        for (const key in inputs) {
            // Pass the correct tip element to validateAndDisplayTip
            if (!validateAndDisplayTip(inputs[key], tips[key], genericTips[key])) {
                allValid = false;
            }
        }

        if (allValid) {
            const description = `El meu ${inputs.relation.value} es diu ${inputs.name.value}, té ${inputs.age.value} anys. Té el cabell ${inputs.hair.value} i és ${inputs.adjective.value}.`;
            descriptionText.textContent = description;
            descriptionOutput.classList.remove('hidden');
        } else {
            descriptionOutput.classList.add('hidden');
        }
    }

    function reset() {
        for (const key in inputs) {
            inputs[key].value = '';
            inputs[key].style.borderColor = '#d1d5db';
            if (tips[key]) { // Check if tip element exists before trying to modify
                tips[key].classList.add('hidden');
                tips[key].textContent = '';
            }
        }
        descriptionOutput.classList.add('hidden');
        descriptionText.textContent = '';
    }

    generateBtn.addEventListener('click', generate);
    resetBtn.addEventListener('click', reset);
}