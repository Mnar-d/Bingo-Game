
// random numbers 
const getRandomNumber = (min, max) => {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}

let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

// Unique random number
const uRandomNumber = () => {
    let randomIndex = getRandomNumber(0, numbersArray.length - 1);
    let randomNumber = numbersArray[randomIndex];
    numbersArray.splice(randomIndex, 1);
    if (numbersArray.length == 0) {
        numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    }
    return randomNumber;
}


// var postion = [{ number: 12, id: 1}, {}]
var postion = []

$(".numbers").attr("disabled", true);
//start game 
const start = () => {

    // Play the video 
    $("#myAudio").trigger('play');

    // Distribute random numbers to start the game
    $('.numbers').html(uRandomNumber)
    console.log("numbers ", $('.numbers')) // check

    // array of button, access to get push({id: i+1, number: ""}
    for (let i = 1; i <= 32; i++) {
        postion.push({ id: `#n${i}`, class: $(`#n${i}`).attr('class').split(" "), number: $(`#n${i}`).text() })
    }

    console.log("postion", postion) // check


    $('.container-2').css({ "background-color": "#4387be", "border": "20px #4387be solid" });
    $('.numbers').css({ "background-color": "#fff", "color": "#46458a" });

    // new Audio("https://www.soundjay.com/button/sounds/button-50.mp3").play(); 

    $(".numbers").attr("disabled", false);
    $('.container-2 > .numbers').css({ "visibility": "hidden" });
    $('.item-start').attr("disabled", true);

}

$('.item-start').on('click', start)
//.one() click one time 

const search = (numberKey, type, card) => {
    var result = '';
    var card = Number(card);

    if (type === "id") {
        if (card === 1) {
            for (var i = 0; i < 16; i++) {
                if (postion[i].number === numberKey) {
                    result = postion[i]["id"];
                }
            }
        } else if (card === 2) {
            for (var i = 16; i < 32; i++) {
                if (postion[i].number === numberKey) {
                    result = postion[i]["id"];
                }
            }

        }

    } else if (type === "class") {


        if (card === 1) {
            for (var i = 0; i < 16; i++) {
                if (postion[i].number === numberKey) {
                    result = postion[i].class[1];
                }
            }
        } else if (card === 2) {
            for (var i = 16; i < 32; i++) {
                if (postion[i].number === numberKey) {
                    result = postion[i].class[1];
                }
            }
        }
    }


    return result;
}


let player1 = [];
let player2 = [];

var turn = 1;
var card = 2;
var currentCard = 1;


var audio = new Audio("./sound-effect-BINGO-1.mp3");

$('.numbers').on('click', (evt) => {

    //     var $className = this.className;
    //    console.log($className)
    // console.log (" 1 : ",search("1", "class", card)
    //             ," 2 : ",search("1", "class", 1)
    //             ," 3 : ",search("1", "class", card) 
    //             ," 4 : ",search("1", "class", currentCard) 
    //             ," 5 : ",search("1", "id", card) 
    //             ," 6 : ",search("1", "id", currentCard) 
    //             ," 7 : ",search("1", "id", card) 
    //             ," 8 : ",search("1", "id", currentCard))

    var className = evt.target.className; // two class (numbers number-? )
    var text = evt.target.innerText;      // text inside the button ckliced 
    // console.log("Text", text)                   // check
    var splitclassName = className.split(" ") // two class convert to array [numbers , number- ]

    var idBtnOfTheAnotherCard = search(text, "id", card) // id = #n?
    var classBtnOfTheAnotherCard = search(text, "class", card) // class =  number-? 
    var idBtnOfTheCard = search(text, "id", currentCard)
    var classBtnOfTheCard = search(text, "class", currentCard)

    // console.log("id number", idBtnOfTheCard)
    // console.log(" currentCard ","player", turn," number ", text," class number ", classBtnOfTheAnotherCard," id number ", idBtnOfTheAnotherCard)
    // console.log(" card ","player", turn," number ", text," class number ", classBtnOfTheCard," id number ", idBtnOfTheCard)

    $(`${idBtnOfTheAnotherCard}`).css({ "background-color": "green", "color": "white" }); // change style
    $(`${idBtnOfTheCard}`).css({ "background-color": "green", "color": "white" });

    evt.target.disabled = true;
    $(`${idBtnOfTheAnotherCard}`).attr("disabled", true);


    if (turn == 1) {
        $('.container-1 > .numbers').css({ "visibility": "hidden" });
        setTimeout(function () { $('.container-2 > .numbers').css({ "visibility": "visible" }); }, 1500);
        player1.push(classBtnOfTheCard) // classBtnOfTheCard = numbers-?
        player2.push(classBtnOfTheAnotherCard) // classBtnOfTheAnotherCard = numbers-?
        // console.log("choiceBtn", choiceBtn); // check
        // console.log("player 1 arr ", player1) // check
        // console.log("player 2 arr ", player2)
        // console.log(" ★ player 1 ★ ")

        calculateResult()
        turn = 2;
        card = 1;
        currentCard = 2;
    }
    else {
        $('.container-2 > .numbers').css({ "visibility": "hidden" });
        setTimeout(function () { $('.container-1 > .numbers').css({ "visibility": "visible" }); }, 1500);
        player2.push(classBtnOfTheCard) // splitclassName[1] = numbers-?
        player1.push(classBtnOfTheAnotherCard)
        // console.log("choiceBtn", choiceBtn); // check

        // console.log("player 2 array", player2) // check
        // console.log("player 1 array ", player1)
        // console.log(" ★ player2 ★ ")

        calculateResult()

        turn = 1;
        card = 2;
        currentCard = 1;
    }


})


const printwinner = (player, playernName) => {

    var result = false;
    const ProbabilityOfWin =
        [["number-1", "number-2", "number-3", "number-4"],
        ["number-5", "number-6", "number-7", "number-8"],
        ["number-9", "number-10", "number-11", "number-12"],
        ["number-13", "number-14", "number-15", "number-16"],
        ["number-1", "number-5", "number-9", "number-13"],
        ["number-2", "number-6", "number-10", "number-14"],
        ["number-3", "number-7", "number-11", "number-15"],
        ["number-4", "number-8", "number-12", "number-16"],
        ["number-4", "number-7", "number-10", "number-13"],
        ["number-1", "number-6", "number-11", "number-16"]];



    const contains = (Probability, playerArry) => {
        const indexArray = Probability.map(el => {
            return playerArry.indexOf(el);
        });

        return indexArray.indexOf(-1) === -1;
    }

    for (let i = 0; i < ProbabilityOfWin.length; i++) {
        if (contains(ProbabilityOfWin[i], player) == true) {
            $(".numbers").attr("disabled", true);
            $('.container-2 > .numbers').css({ "visibility": "visible" });
            $('.container-1 > .numbers').css({ "visibility": "visible" });



            // Pause the video 
            $("#myAudio").trigger('pause');
            $('.item-winer > h3').html(`${playernName} Win 🎊 `);
            audio.play();
            console.log(" Probability ", i)
            result = true;


        }

    }
    return result;
}

const calculateResult = () => {
    if (printwinner(player1, "Player 1 ") && printwinner(player2, "Player 2 ")) {
        $('.item-winer > h3').html(`no winer(tie)`);
    } else {
        printwinner(player2, "Player 2  👉")
        printwinner(player1, " 👈 Player 1 ")
    }

}


const restart = () => {

    postion = []
    player1 = [];
    player2 = [];
    turn = 1;
    card = 2;
    currentCard = 1;
    $('.item-winer > h3').html(`Result`);
    start()
    $(".numbers").on("click");
    $(".numbers").attr("disabled", false);
}

$(".item-restart").click(restart);