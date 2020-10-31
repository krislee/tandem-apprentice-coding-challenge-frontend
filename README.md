# Trivia #

## <ins> How Trivia Game Works </ins> ##

### JSON Data ###
Trivia is a trivia game designed to test your knowledge. JSON data containing a set of trivia questions, incorrect answers, and correct answers are sent from the server set up by Express framework. The ```getTrivia``` function is executed once in the beginning of the game which is determined by the falsiness of ```executed``` variable. When ```getTrivia``` function runs, a GET request is made to the server and the JSON data is stored in the variable ```triviaData```.

### Render JSON Data ###
To make the game less predictable, questions are randomized. In order for questions to be randomized, the ```playTrivia``` function has a random array index to get a random piece of JSON data object and utilizes the the ```fisherYatesShuffle``` helper function to ensure the order of answer choices for each question are random. The questions and answer choices are then rendered using jQuery. Once they are rendered, the JSON data object is spliced out from the array so that the question is not repeated when ```playTrivia``` function continues running when the ```next``` button is clicked. 

### Keeping a Record of the Score ###
In ```playTrivia``` function, a submit button is created after the question and answer choices are rendered. The submit button has an onclick event handler function, which checks the selected answer choice against the correct answer. If the selected answer choice is the correct answer, ```score``` variable is incremented by 1. The correct answer choice and score are rendered in jQuery next.

### Submit, Next, and Replay Buttons ###
The submit button is replaced by either a next or replay button depending if it is the 10th question or not. Both next and replay buttons have onclick event handler function, which calls the ```playTrivia``` function again in order to render the JSON data continuously. However, the replay button also resets the ```score``` and ```questionNumber``` variables to 0 and ```executed``` variable to false to fetch the JSON data again.

## <ins> Issues </ins> ##
- Initially, to retrieve the value of the selected answer choice the code was written out as:

```javascript
($("[name=trivia]").is(':checked')){

    $(this).attr("checked", "checked")

    if ($("[checked=checked]").value === triviaObject.correct) {
        // code runs if selected answer choice is correct
    }
})
```

However, this code did not grab the value of the radio button. After researching how to check if the radio button is selected, a promising resource from [StackOverFlow](https://stackoverflow.com/questions/18043452/in-jquery-how-do-i-get-the-value-of-a-radio-button-when-they-all-have-the-same) allowed the checked radio button value to be grabbed. 

## <ins> Future Features </ins> ##

- Improve UI 
- Use a frontend framework i.e. Vue

## ## <ins> Backend </ins> ##
Click [here](https://github.com/krislee/tandem-apprentice-coding-challenge-backend) to view the backend repository.

## <ins> Deployed Trivia Game </ins> ##
Click [here](https://krislee.github.io/tandem-apprentice-coding-challenge-frontend) to play the game.