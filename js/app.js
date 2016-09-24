$(function(){

	var gameList = [];

	var newGame = function() {
		var Game = {
			gameNum: 0,
			boardLayout: {
					a1: false,
					a2: false,
					a3: false,
					b1: false,
					b2: false,
					b3: false,
					c1: false,
					c2: false,
					c3: false
			},
			tied: false,
			won: false,
			playerTurns: 0
		};
		// Create a new game object
		var thisGame = Object.create(Game);

		// Set new game objects values
		thisGame.gameNum = gameList.length;

		//push object into list
		gameList.push(thisGame);

		createBoard(thisGame)
	};

	var createBoard =function(currentGame){

		// Clone new board from template
		var newBoard = $('.templates .board').clone();

		// Remove the default board class from template
		newBoard.removeClass('board');

		// Add new board-board# class to the board before appending it to the game-row
		newBoard.addClass('board-' + currentGame.gameNum);
		$('div.game-row').append(newBoard);
	};

	var playerTurn = function(board, cell){
		if((gameList[board].playerTurns + 1) % 2 == 0){
			$('.board-' + board + ' #' + cell).text('X');
			gameList[board].boardLayout[cell] = true;
			gameList[board].playerTurns++;
		} else {
			$('.board-' + board + ' #' + cell).text('O');
			gameList[board].boardLayout[cell] = true;
			gameList[board].playerTurns++;
		}
	};

	newGame();

	$('.game-row').on('click', '.cell', function(){
		// Grab which board is being clicked
		var clickedBoard = $(this).parent().parent()
		console.log(this)

		// Iterate through the boards in play and find which one is being clicked by class
		for(var i = 0; i < gameList.length; i++) {
			if(clickedBoard.hasClass('board-' + i)){
				var thisMoveBoard = i;
				var thisMoveCell = $(this).attr('id')
				playerTurn(thisMoveBoard, thisMoveCell);
			}
		}
	});

	$('.new-game').click(function(){
		newGame()
	});
})