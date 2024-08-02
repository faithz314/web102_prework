/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js'; //some dependency errors: so I add ./ in front to get it to work on live server
// create a list of objects to store the data about the games using JSON.parse
const games = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

        // loop over each item in the data
       games.forEach(game => {
        // Append the <ul> element containing the games to the page
        // create a new div element, which will become the game card
        // add the class game-card to the list
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card'); 
        gameCard.textContent= "hkjkj";
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        // append the game to the games-container
        
        gameCard.innerHTML= 
        `<img class= "game-img" src= "${game.img}" />
        <p>This game is called ${game.name} and 
        the description is as follows: ${game.description}.</p>
        `;
        gamesContainer.appendChild(gameCard);
    });
}


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(games);







// /*************************************************************************************
//  * Challenge 4: Create the summary statistics at the top of the page displaying the
//  * total number of contributions, amount donated, and number of games on the site.
//  * Skills used: arrow functions, reduce, template literals
// */

//I know this is all super extra, but I wanted to practice DOM, so I wrote everything as a DOM element


// // grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// // use reduce() to count the number of total contributions by summing the backers
const totalBackers= games.reduce((acc, game) => {  return acc + game.backers}, 0);

// // set the inner HTML using a template literal and toLocaleString to get a number with commas
const totaled= document.createElement('p');
totaled.innerHTML= `${totalBackers.toLocaleString('en-US')}`
contributionsCard.appendChild(totaled)


// // grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalMoney= games.reduce((acc, game) => {return acc + game.pledged}, 0);

// // set inner HTML using template literal
const totaledMoney= document.createElement('p');
totaledMoney.innerHTML= `$${totalMoney.toLocaleString('en-US')}`;
raisedCard.appendChild(totaledMoney);


// // grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames= games.reduce(
    (acc, game) => { return acc + 1}, 
    0
);

const totaledGames= document.createElement('p');
totaledGames.innerHTML= `${totalGames}`
gamesCard.appendChild(totaledGames)


// /*************************************************************************************
//  * Challenge 5: Add functions to filter the funded and unfunded games
//  * total number of contributions, amount donated, and number of games on the site.
//  * Skills used: functions, filter
// */

// // show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

//     // use filter() to get a list of games that have not yet met their goal

    let unmetGoal= games.filter(
        (game) => { return game.pledged< game.goal}
    );

//     // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unmetGoal);
}


// // show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

//     // use filter() to get a list of games that have met or exceeded their goal

    let metGoal= games.filter(
            (game) => { return game.pledged>= game.goal}
        );

    addGamesToPage(metGoal);
//     // use the function we previously created to add unfunded games to the DOM

}


// // show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

//     // add all games from the JSON data to the DOM
    let all= games.filter((game)=> {return game});
    addGamesToPage(all);
}


// // select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// // add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);




// /*************************************************************************************
//  * Challenge 6: Add more information at the top of the page about the company.
//  * Skills used: template literals, ternary operator
// */

// // grab the description container
const descriptionContainer = document.getElementById("description-container");

// // use filter or reduce to count the number of unfunded games
const totalUnfunded= games.reduce(
    (acc, game) => 
        {const num = game.pledged < game.goal ? 1 : 0

            return acc + num;}, 
    0);
descriptionContainer.innerHTML= `Total Number of Unfunded Games: ${totalUnfunded}`

// // create a string that explains the number of unfunded games using the ternary operator
const displayStr= `A total of $${totalMoney.toLocaleString('en-US')} has been raised for ${totalGames} games. 
Currently, ${totalUnfunded} game remains unfunded. We're on our hands and knees begging you to help us fund more games.`


const newParagraph= document.createElement('p');
newParagraph.innerHTML= `${displayStr}`
descriptionContainer.appendChild(newParagraph)



// // create a new DOM element containing the template string and append it to the description container

// /************************************************************************************
//  * Challenge 7: Select & display the top 2 games
//  * Skills used: spread operator, destructuring, template literals, sort 
//  */

// const firstGameContainer = document.getElementById("first-game");
// const secondGameContainer = document.getElementById("second-game");

// const sortedGames =  games.sort( (item1, item2) => {
//     return item2.pledged - item1.pledged;
// });

// // use destructuring and the spread operator to grab the first and second games

// // create a new element to hold the name of the top pledge game, then append it to the correct element

// // do the same for the runner up item