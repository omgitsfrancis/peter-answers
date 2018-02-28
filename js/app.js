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

        /*  OLD Code - Delete
        console.log(e.data);
        var petitionLength = view.getPetitionLength();

        if(e.data === '.') {
            model.answerToggle = !model.answerToggle;
            view.renderInput();
        } else if(model.answerToggle && e.inputType === "deleteContentBackward") {
            model.answer = model.answer.slice(0,-1);
        } else if(model.answerToggle) {
            model.answer += e.data;
            view.renderInput();
        }
        console.log("answer: ", model.answer);        
        */
        
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
            return model.answer;
        } else {                                    // Invalid Response
            let randomNum = Math.floor(Math.random() * invalidResponse.length);
            return invalidResponse[randomNum];
        }
    }
}

var view = {
    init: () => {
        document.getElementById('answerButton').addEventListener('click', () => {
            view.renderAnswer();
        });
        document.getElementById('petition').onkeydown = (event) => {return controller.keyDown(event)};
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
        
    }
}


controller.init();