//Get the input from the HTML

//Variable declarations
let commonWordsArr = ['the','and','is','an','a']
let moviesData = [];
let tempSentenceArr = [];
let moviesFinalList = [];
let matchIsFound = false;
let flgMovieInList = false;

//Gets the API Data saves this to an array. If we find a match, save this match to a new array and remove this item from the original array


// Connect to the API
let requestData = new XMLHttpRequest();

//Opens the connection
requestData.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
requestData.send ();


// Do something with the requested data
requestData.onload = function () {
       
let receivedData = JSON.parse(this.response)
       
//Go through each item of the array and puts it through a function
receivedData.forEach( currentItem => {
	moviesData.push(currentItem);
        });
}
	   
//moviesData[] has now got the list of movies

// --------------------- FUNCTIONS SECTION ---------------------

//Function to check two strings against each other
function checkMatch(currentWord, currentMovieTitle) {

	//We can't pass variables directly into RegExp so creating this object
	let tempRegEx = new RegExp(currentWord.toLowerCase());

	if(currentMovieTitle.toLowerCase().match(tempRegEx) != null) {
		return true;
	}

}

function checkForSubmit(event){

	if (event.keyCode == 13) {
		showMySentence();
	}
}



//Main function that gets called everytime
function showMySentence() {

	moviesFinalList = [];
	tempSentenceArr = [];

	//Save the current sentence to a variable
	let mySentence =  (document.getElementById('sentence') as HTMLInputElement).value;

        // turn the current search into an array
	tempSentenceArr = mySentence.split(" ");

	// Go through and compare each item of the array and see if there's a match. If there is a match go through another loop and see if the movie has been added to the final movie list	
	tempSentenceArr.forEach( currentItem => {
	
	// Make sure that the current array item isn't empty
	if (currentItem != "") {

		for (let x = 0; x < moviesData.length; x++) {
			matchIsFound = checkMatch(currentItem,moviesData[x].title);
	
			if (matchIsFound == true) {
		
				// Go through each item in moviesFinalList and if the movie doesn't exist, add it
				flgMovieInList = false;
				for (let i = 0; i < moviesFinalList.length; i++) {

					if(moviesData[x].title == moviesFinalList[i].title) {
						flgMovieInList = true;
					}		

				}

				if(flgMovieInList == false) {
					moviesFinalList.push(moviesData[x]);
				}

			}
		}
	}

	});	

   //Call the function to display the result
   displayResults();

}


function displayResults () {

	const mainContainer = document.getElementById("main-display");
	const displayContainer = document.createElement('div');
	displayContainer.setAttribute('class','container');

	mainContainer.appendChild(displayContainer);

	// Go through each item of the moviesFinalList and display it in a card
	moviesFinalList.forEach( currentDisplayMovie => {
      		const card = document.createElement('div');
      		card.setAttribute('class','card');

      		const h1 = document.createElement('h1');
      		h1.textContent = currentDisplayMovie.title;

      		const p = document.createElement('p');
      		p.textContent = currentDisplayMovie.description.substring(0,300) + "...";

      		mainContainer.appendChild(card);
      		card.appendChild(h1);
      		card.appendChild(p);

   	});
}
