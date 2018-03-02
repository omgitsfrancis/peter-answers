var model = {
    answer: "",
    answerToggle: false,
    petitionText: "Peter please answer the following question"
}

var controller = {
    init: () => {
        view.init();
    },
    keyDown: (e) => {
        let len = view.getPetitionLength();
        
        if(e.key === '.'){
            model.answerToggle = !model.answerToggle;
            document.getElementById('petition').value += model.petitionText[len];
            return false;
        } else if (e.key.length === 1 && model.answerToggle) {
            model.answer += e.key;
            document.getElementById('petition').value += model.petitionText[len];
            console.log(model.answer);
            return false;
        } else if (e.key === "Backspace") {
            model.answer = model.answer.slice(0,-1);
        }
    },

    getPetitionChar: () => {
        return model.petitionText[view.getPetitionLength()-1];
    },
    getAnswer: () => {
        const invalidResponse = [
            "That's not how you petition to Peter.",
            "Invalid petition. Please try again.",
            "You're not asking correctly",
            "Why should I answer to that?",
            "Please try again tomorrow. Or never...",
            "I'm tired... Try again another time.",
            "Not now, I'm busy. Maybe later.",
            "Fix your petition please.",
        ];
        const invalidQuestion = "Please ask Peter a valid question.";
        if (!view.getQuestion().includes('?')) {    // Valid Question check
            return invalidQuestion;
        } else if(model.answer) {                   // Valid Petition check
            return "Peter says " + model.answer;
        } else {                                    // Invalid Response
            let randomNum = Math.floor(Math.random() * invalidResponse.length);
            return invalidResponse[randomNum];
        }
        
    },
    reset: () => {
        model.answer = '';
        model.answerToggle = false;
        view.resetUi();
    }
}

var view = {
    init: () => {
        document.getElementById('answerButton').addEventListener('click', () => {
            view.renderAnswer();
        });
        document.getElementById('resetButton').addEventListener('click', controller.reset);
        document.getElementById('petition').onkeydown = (event) => {return controller.keyDown(event)};
        document.getElementById('question').onkeydown = (event) => {
            if(event.key === '?') view.renderAnswer();
        };
    },
    getInputText: () => {
        return document.getElementById('petition').value;
    },
    getPetitionLength: () => {
        return document.getElementById('petition').value.length;
    },
    getQuestion: () => {
        return document.getElementById('question').value;
    },
    renderAnswer: () => {
        document.getElementById('answer').innerHTML = controller.getAnswer();
        view.disableQuestion();
        view.clearPetition();
    },
    resetUi: () => {
        view.clearPetition();
        view.clearQuestion();
        view.clearAnswer();
        document.getElementById('question').disabled = false;
    },
    clearPetition: () => {
        document.getElementById('petition').value = '';
    },
    clearQuestion: () => {
        document.getElementById('question').value = '';
    },
    clearAnswer: () => {
        document.getElementById('answer').innerHTML = '';
    },
    disableQuestion: () => {
        document.getElementById('question').disabled = true;
    }
}


controller.init();