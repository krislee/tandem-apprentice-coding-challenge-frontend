const url = 'http://localhost:3000/trivia'

// Global variables
let executed = false // Initiate variable that will allow getTrivia function to only run once in the beginning of the game when executed is false
let score = 0 // Initiate score to 0 which will be incremented in the playTrivia function when the trivia game starts
let triviaData // Declare variable globally instead of inside playTrivia function so that the playTrivia function can be executed continuously when clicking next. If variable is declared locally inside the playTrivia function, then when the function runs the 2nd time, it will be unitinialized again and we do not want to initialize to the JSON data again because that resets the number of questions again.
let questionNumber = 0 

// Get JSON data from server
async function getTrivia() {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Show questions, answer choices, submit, next, and replay buttons
async function playTrivia() {
    // Local global variable to store the JSON data piece later 
    let triviaObject

    // Make the start button disappear after user clicks start button
    $('.start').css('display', 'none')

    // If getTrivia function has not been executed yet, which is dependent whether executed variable is true or false, then getTrivia function runs to get the JSON data once
    if (!executed){
        // Store the JSON data from getTrivia function in the global variable
        triviaData = await getTrivia()
        // getTrivia function has ran so executed is true
        executed = true 
    } 
    
    // Only run the following code block if there are JSON data left to render on browser
    if(triviaData.length > 0){
        
        // Empty the div that contains the previous question, answer choices, submit or next button before rendering the next set of trivia questions, answer choices, and buttons
        $('#trivia').empty()

        // Get a random trivia JSON data and store in triviaObject variable
        let randomIndex = Math.floor(Math.random() * triviaData.length)
        triviaObject = triviaData[randomIndex]

        // Store the incorrect and correct answers inside the answerChoices variable array and shuffle the array by calling fisherYatesShuffle helper function to have the order of answer choices be rendered differently 
        const answerChoices = [triviaObject.correct]
        for(let i = 0; i < triviaObject.incorrect.length; i++) {
            answerChoices.push(triviaObject.incorrect[i])
        }
        fisherYatesShuffle(answerChoices)

        // Render the question 
        $('#trivia').append($('<h1>').text(`Question ${questionNumber+=1}: ${triviaObject.question}`))

        // Render the answer choices in radio button format
        for(let i = 0; i < answerChoices.length; i++) {
            const labelAnswers = $('<label>').attr('for', triviaObject.question).text(answerChoices[i])
            const answers = $('<input>').attr({'type': 'radio', 'id': triviaObject.question, 'name': "trivia", 'value': answerChoices[i]})
            $('#trivia').append(answers).append(labelAnswers)
        }

        // After the JSON data has been rendered, splice it from the array so that the question does not reappear
        triviaData.splice(randomIndex, 1)
    }

    
    console.log(triviaData)

    // After the question and answer choices are rendered, render the submit button. When submit button is clicked, a callback function is run.
    $('#trivia').append($('<button>').addClass('submit').text('Submit').on('click', function(e) {

        // If the value of radio input clicked matches the correct answer, increment score
        if ($('input[name=trivia]:checked').val() === triviaObject.correct) score += 1

        // Render the correct answer and score
        $('#trivia').append($('<p>').text(`The correct answer is ${triviaObject.correct}`))
        $('#trivia').append($('<p>').text(`You have a total of ${score} points.`))

        // Want the submit button to disappear after clicking the submit button. Instead, a next button or replay button shows up depending if it is the last question
        $('.submit').css('display', 'none')

        if(triviaData.length == 0) {
            const replayButton = $('<button>').addClass('replay').text('Replay').on('click', function(){
                // reset score and executed so that JSON data is fetched from the server again 
                score = 0
                executed = false
                questionNumber = 0
                // Replay the game by running playTrivia again
                playTrivia()
            })
            $('#trivia').append(replayButton)
        } else {
            $('#trivia').append($('<button>').addClass('next').text('Next').on('click', playTrivia)) // continue playing the game by executing playTrivia function
        }
    }))
}

// Shuffle array
function fisherYatesShuffle(arr) {
    for (let i = arr.length -1; i > 0; i--) {
        j = Math.floor(Math.random() * i)
        k = arr[i]
        arr[i] = arr[j]
        arr[j] = k
      }
}

// Start the trivia game by executing the playTrivia function when Start button is clicked
$('.start').on('click', playTrivia)

// Resources to grab input value of radio button:
// https://stackoverflow.com/questions/18043452/in-jquery-how-do-i-get-the-value-of-a-radio-button-when-they-all-have-the-same
// https://stackoverflow.com/questions/15530582/check-if-a-radio-button-is-checked-jquery
// https://stackoverflow.com/questions/2272507/find-out-whether-radio-button-is-checked-with-jquery