class Question {
    constructor(notes, correctAnswer) {
        this.notes = notes;
        this.correctAnswer = correctAnswer;
        this.totalTime = 4;
    }
}

class Note {
    constructor(pitch, startTime, endTime) {
        this.pitch = pitch;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

function getRandomInteger(min, max) {
    var min = Math.floor(min);
    var max = Math.floor(max);
    return Math.floor(Math.random()*(max - min) + min)
}

function createRandomInterval() {
    var firstPitch = getRandomInteger(40, 89); // limit the pitch range
    var firstNote = new Note(firstPitch, 0.0, 2.0);
    var secondNote = new Note(getRandomInteger(firstPitch-13, firstPitch+13),
                              2.0, 4.0); // might get a unison and don't forget about tritone
    return [firstNote, secondNote]
}


function calcCorrectAnswer(interval) {
    var pitch_dict = {
        0:"Unison",
        1:"m2",
        2:"M2",
        3:"m3",
        4:"M3",
        5:"P4",
        6:"Tritone",
        7:"P5",
        8:"m6",
        9:"M6",
        10:"m7",
        11:"M7",
        12:"P8" }
    
    var firstPitch = interval[0].pitch;
    var secondPitch = interval[1].pitch;
    var difference = Math.abs(firstPitch-secondPitch);
    return pitch_dict[difference];
}



// for debugging purposes
// var randomInterval = createRandomInterval();
// console.log(randomInterval);
// console.log(calcCorrectAnswer(randomInterval));
// const q = new Question(randomInterval, 
//                        calcCorrectAnswer(randomInterval),
//                         4);
// console.log(q);
//


let questions = []
for(i=0; i<8; i++) {
    let randomInterval = createRandomInterval();
    const q = new Question(randomInterval, calcCorrectAnswer(randomInterval), 4);
    questions.push(q);                             
}
console.log(questions);
