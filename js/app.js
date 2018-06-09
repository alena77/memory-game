//check if dom is ready
document.addEventListener('DOMContentLoaded', function () {
      


	//array definition with all cards
	var cards = [
	'<li class="card"><i class="fa fa-diamond"></i></li>',
	'<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
	'<li class="card match"><i class="fa fa-anchor"></i></li>',
	'<li class="card"><i class="fa fa-bolt"></i></li>',
	'<li class="card"><i class="fa fa-cube"></i></li>',
	'<li class="card match"><i class="fa fa-anchor"></i></li>',
	'<li class="card"><i class="fa fa-leaf"></i></li>',
	'<li class="card"><i class="fa fa-bicycle"></i></li>',
	'<li class="card"><i class="fa fa-diamond"></i></li>',
	'<li class="card"><i class="fa fa-bomb"></i></li>',
	'<li class="card"><i class="fa fa-leaf"></i></li>',
	'<li class="card"><i class="fa fa-bomb"></i></li>',
	'<li class="card"><i class="fa fa-bolt"></i></li>',
	'<li class="card"><i class="fa fa-bicycle"></i></li>',
	'<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
	'<li class="card"><i class="fa fa-cube"></i></li>'
	];

	var count=1;
	var score=0;

	//initial card shuffle at page load
	shuffle(cards);

	console.log(document.getElementsByClassName("deck"));
	//display initial shuffled cards on page
	document.getElementsByClassName("deck")[0].innerHTML = cards.join("");



	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {
	    var currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

	    return array;
	}


	/*
	 * set up the event listener for a card. If a card is clicked:
	 *  - display the card's symbol (put this functionality in another function that you call from this one)
	 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
	 *  - if the list already has another card, check to see if the two cards match
	 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
	 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
	 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
	 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one) 
	 */

	//event listener for cards
	var cardEl = document.querySelector('.deck');
	console.log(cardEl);
	cardEl.addEventListener("click", respondToTheClick);

	//function called when card is clicked
	function respondToTheClick(evt) {
		if (evt.target.nodeName === 'LI') {  // ← verifies target is desired element
			//define current card
			var cCard= evt.target;
        	//check if card is already open or matched
        	if (cCard.classList.contains('open') || cCard.classList.contains('match')){
        		console.log("card is already open");
        		//next line plays clap sound
        		document.querySelector(".clap").play();

        	//open card if first in pair of cards
        	}else if(count%2==1){
        		//call flip function
        		count++;
        		flip(cCard);
        		//next line plays tink sound
        		document.querySelector(".tink").play();

        	//open card if second in pair, but check for winning and matching conditions
        	}else{
        		//call flip function
        		count++;
        		flip(cCard);

        		//check for win!
        		if(score===14){
        			console.log("YOU WIN!!!");

        		//check for match
        		}else if(1==1){
        			score=score+2;
        			matchC();

        		//explode unmatched pair
        		}else{
        			explode();
        		}


        		//next line plays tink sound
        		document.querySelector(".boom").play();
        		
        		
        	}

        	

    	}
	}

	//function flipping cards
	function flip(cCard){
		
        //next 2 lines add class open + show
		cCard.classList.toggle('open');
        cCard.classList.toggle('show');
	}


	//function matching cards
	function matchC(){
		console.log("match cards function was called");
	}

	//function exploding cards
	function explode(){
		console.log("explode cards function was called");
	}
});