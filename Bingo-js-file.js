
// var fillRandoum = (arr) => {
//     var x = Math.floor((Math.random() * 16) + 1);
//     console.log(x)
//     if (arr.includes(x)) {
//         const index = arr.indexOf(x);
//         if (index > -1) {
//             arr.splice(index, 1);
//         }
//     }
//         return x;

// }


//new Audio("https://www.soundjay.com/button/sounds/button-50.mp3").play(); sound effect for click
//http://freesoundeffect.net/sites/default/files/voice-clip-female-262-sound-effect-64550782.mp3 sound effect for winner "BINGO"


// random numbers 
function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}

let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

// Unique random number
var uRandomNumber = () => {
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
var start = () => {
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
    //disapper card
    // $('.container-2 > .numbers').css({"visibility": "hidden"});
    // console.log(myArray);
    //     for(key in myArray){
    //         myArray[key].html(fillRandoum)  
    //     }
    //     // $j_object = $('.numbers');
    //     // console.log($j_object);

    $(".numbers").attr("disabled", false);
    $('.container-2 > .numbers').css({ "visibility": "hidden" });
    $('.item-start').unbind( "click" );
    


}

$('.item-start').on('click', start)
//.one() click one time 

function search(numberKey, type, card) {
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

    // else if(type == "number"){
    //     for (var i=0; i < postion.length; i++) {
    //         if (postion[i].number === numberKey) {
    //             result = postion[i].class[1];
    //         }
    //     }
    // }
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
    var choiceNumber = splitclassName[0]      // splitclassName[0] = numbers

    var idBtnOfTheAnotherCard = search(text, "id", card) // id = #n?
    var classBtnOfTheAnotherCard = search(text, "class", card) // class =  number-? 
    var idBtnOfTheCard = search(text, "id",currentCard)
    console.log("rtyuiolkmjnhgfdsdfg",idBtnOfTheCard)


    // var $athourPlayerBtn = $(`.container-2 button:contains("${text}")`)

    // var choiceClass = []                    // Emty class for athour player Btn
    // choiceClass.push($athourPlayerBtn.attr('class')) //  class for athour player Btn
    // // console.log(" athour player Btn", choiceClass); // check
    // var athourPlayerBtnClass = choiceClass[0].split(" ")

    // console.log(" athour player Btn Number", athourPlayerBtnClass[1]);

    $(`${idBtnOfTheAnotherCard}`).css({ "background-color": "green", "color": "white" }); // change style
    $(`${idBtnOfTheCard}`).css({ "background-color": "green", "color": "white" });


    var choiceBtn = splitclassName[1] // splitclassName[1] = numbers-?


    evt.target.disabled = true;
    $(`${idBtnOfTheAnotherCard}`).disabled = true;

    // $('.container-1 > .numbers').css({ "visibility": "hidden" });
    // $('.container-2 > .numbers').css({"visibility": "visible"});

    if (turn == 1) {
        $('.container-1 > .numbers').css({ "visibility": "hidden" });
        $('.container-2 > .numbers').css({ "visibility": "visible" });


        player1.push(choiceBtn) // splitclassName[1] = numbers-?
        player2.push(classBtnOfTheAnotherCard) 
        // console.log("choiceBtn", choiceBtn); // check
        console.log("player 1 1 ", player1) // check
        console.log("player 2 1 ", player2)
        console.log(" ★ player 1 ★ ")

        // $("#screen").text("PLAYER 2 TURN FOLLOWS"); 
        // Check sign font from font-awesome 
        // $(this).addClass("fa fa-check");
        if (printwinner(player1, "Player 1") && printwinner(player2, "Player 2")){
            $('.item-winer > h3').html(`تعادل`);
        }
        printwinner(player1, "Player 1")
        printwinner(player2, "Player 2")

        turn = 2;
        card = 1;
        currentCard = 2;
    }
    else {
        $('.container-2 > .numbers').css({ "visibility": "hidden" });
        $('.container-1 > .numbers').css({ "visibility": "visible" });
        player2.push(choiceBtn) // splitclassName[1] = numbers-?
        player1.push(classBtnOfTheAnotherCard) 
        // console.log("choiceBtn", choiceBtn); // check
        console.log("player 2 2", player2) // check
        console.log("player 1 2 ", player1)
        console.log(" ★ player2 ★ ")

        // $("#screen").text("PLAYER 1 TURN FOLLOWS");

        // Cross sign font from font-awesome 
        // $(this).addClass("fa fa-times");
        printwinner(player2, "Player 2")
        printwinner(player1, "Player 1")

        turn = 1;
        card = 1;
        currentCard = 2;
    }


})

// if (turn == 0) { turn = 1 } else { turn = 0 }

// function checkOdd(int) {
//     return int % 2;
// }

// if (checkOdd(turnTacker)) {
//     // player2 has to play
//     $('.container-1 > .numbers').css({ "visibility": "hidden" });
//     $('.container-2 > .numbers').css({ "visibility": "visible" });
// } else {
//     // player1 has to play
//     $('.container-2 > .numbers').css({ "visibility": "hidden" });
//     $('.container-1 > .numbers').css({ "visibility": "visible" });
// };



// printwinner (player1);


function printwinner(player, playernName) {

    // if (player.Includes (number-1) && Includes (number-2) && Includes (number-3) && Includes (number-4) ) {
    //     return alert("no one win") 
    // }
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

    

    const contains = (first, second) => {
        const indexArray = first.map(el => {
            return second.indexOf(el);
        });

        return indexArray.indexOf(-1) === -1;
    }

    for (let i = 0; i < ProbabilityOfWin.length; i++) {
        if (contains(ProbabilityOfWin[i], player) == true) {
            
            
            $(".numbers").unbind( "click" );
            $('.container-2 > .numbers').css({ "visibility": "visible" });
            $('.container-1 > .numbers').css({ "visibility": "visible" });
            // $("myAudio").pause();
            $('.item-winer > h3').html(`${playernName} Win 🎊 `);
            audio.play();
            result = true;
            
            
        }

    }
    return result;
}
