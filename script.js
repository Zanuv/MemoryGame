const gameContainer = document.getElementById("game");
let hasFlippedCard = false;
let firstCard;
let secondCard;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  if (noClicking) {
    return;
  }

  if (event.target.classList.contains("flip")) {
    return;
  }

  //change background color of card
  let selectedColor = event.target.className;
  event.target.style.backgroundColor = selectedColor;

  event.target.classList.add("flip");

  //Get the count of cards flipped
  let flipCount = document.querySelectorAll("div .flip").length;

  //Set the value of the first and second cards
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
  }

  if (flipCount < 2) {
    return;
  }

  //Compare the background color of the cards
  //If it matches keep the cards face up and remove the option to flip
  if (
    flipCount === 2 &&
    firstCard.style.backgroundColor == secondCard.style.backgroundColor
  ) {
    function matchedCards() {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
    }
    matchedCards();
  }

  //Reset the cards after 1 second if they are not a match
  else {
    noClicking = true;
    function resetCards() {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      firstCard.style.backgroundColor = "";
      secondCard.style.backgroundColor = "";
      noClicking = false;
    }
    setTimeout(resetCards, 1000);
  }
}
// when the DOM loads
createDivsForColors(shuffledColors);
