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
	var prevCard;

	//initial card shuffle at page load
	shuffle(cards);

	//display initial shuffled cards on page
	document.getElementsByClassName("deck")[0].innerHTML = cards.join("");






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
			var curCard= evt.target;
        	//check if card is already open or matched
        	if (curCard.classList.contains('open') || curCard.classList.contains('match')){
        		console.log("card is already open");
        		//next line plays boom sound
        		document.querySelector(".boom").play();

        	//open card if first in pair of cards
        	}else if(count%2==1){
        		//call flip function
        		count++;
        		flip(curCard);
        		//next line plays tink sound
        		document.querySelector(".tink").play();

        		//save first card in pair to later compare to second card
        		prevCard=curCard;
        		

        	//open card if second in pair, but check for winning and matching conditions
        	}else{
        		//call flip function
        		count++;
        		flip(curCard);

        		//check for match
        		if(prevCard.innerHTML==curCard.innerHTML){
        			score=score+2;
        			flip(curCard);
        			flip(prevCard);
        			matchCard(curCard,prevCard);


        		//explode unmatched pair
        		}else{
        			//shake cards before exploding
        			setTimeout(function() {
					  explode(curCard,prevCard);
					},0)
					setTimeout(function() {
					  explode(curCard,prevCard);
					}, 1000)


        			//explode cards using flip function
        			setTimeout(function() {
						flip(curCard); // runs first
						flip(prevCard); // runs second
						//play clap sound
        				document.querySelector(".clap").play();
					}, 1000)
        			
        		}

        		//check for win
        		if(score===14){
        			console.log("YOU WIN!!!");
        			//call win function
        			win();
        		}	
        	}
    	}
	}

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

	//function flipping cards
	function flip(curCard){
        //next 2 lines add class open + show
		curCard.classList.toggle('open');
        curCard.classList.toggle('show');
	}


	//function matching cards
	function matchCard(curCard,prevCard){
		console.log("match cards function was called");
		curCard.classList.add('match');
		prevCard.classList.add('match');
		//next line plays tink sound
        document.querySelector(".tink").play();
	}

	//function exploding cards
	function explode(curCard, prevCard){
		console.log("explode cards function was called");
        //next 2 lines add class explode
		curCard.classList.toggle('explode');
		prevCard.classList.toggle('explode');
		
	}
});