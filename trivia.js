const url = 'http://localhost:3000/trivia'

async function getTrivia() {
    // let triviaObject
    let score = 0
    const response = await fetch(url)
    const data = await response.json()
    const copyOfdata = await data
    return await {copyOfdata, score}
}



async function trivia() {
    const {copyOfdata, score} = await getTrivia()
    console.log(copyOfdata, "triviaObject")
    console.log(score, "score")

    let randomIndex
    
    if(copyOfdata.length > 0){
        
        $('#trivia').empty()

        randomIndex = Math.floor(Math.random() * copyOfdata.length)
        triviaObject = copyOfdata[randomIndex]


        $('#trivia').append($('<h1>').text(triviaObject.question))

        const answerChoices = [triviaObject.correct]
        for(let i = 0; i < triviaObject.incorrect.length; i++) {
            answerChoices.push(triviaObject.incorrect[i])
        }

        fisherYatesShuffle(answerChoices)

        for(let i = 0; i < answerChoices.length; i++) {
            const labelAnswers = $('<label>').attr('for', triviaObject.question).text(answerChoices[i])
            const answers = $('<input>').attr({'type': 'radio', 'id': triviaObject.question, 'name': "trivia", 'value': answerChoices[i]})
            $('#trivia').append(answers).append(labelAnswers)
        }
    }

    copyOfdata.splice(randomIndex, 1)
    console.log(copyOfdata)

    $('#trivia').append($('<button>').addClass('submit').text('Submit').on('click', function(e) {
        if ($('input[name=trivia]:checked').val() === triviaObject.correct) score += 1

        $('#trivia').append($('<p>').text(`The correct answer is ${triviaObject.correct}`))
        $('#trivia').append($('<p>').text(`You have a total of ${score} points!`))
        $('.submit').css('display', 'none')
        if(copyOfdata.length == 0) {
            const replayButton = $('<button>').addClass('replay').text('Replay')
            $('#trivia').append(replayButton)
        } else {
            $('#trivia').append($('<button>').addClass('next').text('Next').on('click', trivia))
        }
    }))
}

// $('.next').on('click', function(){
//     console.log("hi")
// })

$('.replay').on('click', trivia)

$('.submit').on('click', function (e, answer, score){
    console.log(e.target.parent)
    if((input).is(':checked')){
        if (input.attr('value') === answer) {
            score += 1
        } 
        $('<p>').text(`The correct answer is ${answer}`)
        $('<p>').text(`You have a total of ${score} points!`)
    }
    trivia()
})








function fisherYatesShuffle(arr) {
    for (let i = arr.length -1; i > 0; i--) {
        j = Math.floor(Math.random() * i)
        k = arr[i]
        arr[i] = arr[j]
        arr[j] = k
      }
}

$('.button').on('click', trivia)


  // $('#trivia').append($('<button>').text('Submit').on('click', () => {
            //     if($("[name=trivia]").is(':checked')){

            //         $(this).attr("checked", "checked")

            //         if ($("[checked=checked]").value === data.correct) {
            //             score += 1
            //             console.log(score)
            //         } 
            //         $('<p>').text(`The correct answer is ${data.correct}`)
            //         $('<p>').text(`You have a total of ${score} points!`)
            //     }
            // }))

// https://stackoverflow.com/questions/18043452/in-jquery-how-do-i-get-the-value-of-a-radio-button-when-they-all-have-the-same
// https://stackoverflow.com/questions/15530582/check-if-a-radio-button-is-checked-jquery
// https://stackoverflow.com/questions/2272507/find-out-whether-radio-button-is-checked-with-jquery