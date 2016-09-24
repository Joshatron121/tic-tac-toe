$(function(){

	var gameList = [];

	var newGame = function() {
		var Game = {
			gameNum: 0,
			boardLayout: {
				X: {
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
				O: {
					a1: false,
					a2: false,
					a3: false,
					b1: false,
					b2: false,
					b3: false,
					c1: false,
					c2: false,
					c3: false					
				}
			},
			draw: false,
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

		// Set the Current player to X
		var playerField = newBoard.find('.current-player');
		playerField.text('X')

		// Add new board-board# class to the board before appending it to the game-row
		newBoard.addClass('board-' + currentGame.gameNum);
		$('div.game-row').append(newBoard);
	};

	var playerTurn = function(board, cell){
		clearError(board)

		// Check who's turn it is (if even, x's turn)
		if(gameList[board].won || gameList[board].draw){
			buildError(board, 'This game has been completed, restart or try a new one!')
		} else if(gameList[board].boardLayout.O[cell] || gameList[board].boardLayout.X[cell]) {
			buildError(board, 'Please select an unoccupied cell.');
		} else if((gameList[board].playerTurns + 1) % 2 == 0){
			$('.board-' + board + ' #' + cell).text('O');
			gameList[board].boardLayout.O[cell] = true;
			gameList[board].playerTurns++;
			checkWin(board, 'O');
			setPlayer(board, 'X');
		} else {
			$('.board-' + board + ' #' + cell).text('X');
			gameList[board].boardLayout.X[cell] = true;
			gameList[board].playerTurns++;
			checkWin(board, 'X');
			setPlayer(board, 'O');
		};
	};

	var buildError = function(board, error) {
		var boardErrorElem = ('.board-' + board + ' .info-field')
		$(boardErrorElem + ' p').text(error)
		$(boardErrorElem).css('visibility', 'visible');
	}
	var clearError = function(board){
		$('.board-' + board + ' .info-field').css('visibility','hidden');
	}

	var checkWin = function(board, player){
		var thisLayout = gameList[board].boardLayout[player];
		if(gameList[board].playerTurns == 9){
			setWin(board, 'draw')
		} else if(thisLayout.a1){
			if(thisLayout.a2){
				if(thisLayout.a3){
					setWin(board, player);
				}
			} else if(thisLayout.b1){
				if(thisLayout.c1){
					setWin(board,player);
				}
			} else if(thisLayout.b2){
				if(thisLayout.c3){
					setWin(board, player);
				}
			}
		} else if (thisLayout.b1){
			if(thisLayout.b2){
				if(thisLayout.b3){;
					setWin(board, player);
				}
			}
		} else if (thisLayout.c1){
			if(thisLayout.c2){
				if(thisLayout.c3){
					setWin(board, player);
				}
			} else if (thisLayout.b2){
				if(thisLayout.a3){
					setWin(board, player);
				}
			}
		} else if (thisLayout.a2){
			if(thisLayout.b2){
				if(thisLayout.c2){
					setWin(board, player);
				}
			}
		} else if (thisLayout.a3){
			if(thisLayout.b3){
				if(thisLayout.c3){
					setWin(board, player);
				}
			}
		}

	}

	var setPlayer = function(board, player){
		$('.board-' + board + ' .player-info .current-player').text(player);
	}

	var setWin = function(board, player) {
		var winBoard = ('.board-' + board + ' .player-info')
		if(player == 'draw'){
			$(winBoard + ' h3').html('Draw! Try Again!');
			$(winBoard + ' .current-player').text('');
			gameList[board].draw = true;
		} else {
			$(winBoard + ' h3').html('Player ' + player + ' wins!');
			$(winBoard + ' .current-player').text('');
			gameList[board].won = true;
		}
	}

	var determineBoard = function(board){
		for(var i = 0; i < gameList.length; i++) {
			if(board.hasClass('board-' + i)){
				return i;
			}
		}
	}

	var clearBoard = function(board){
		var thisGame = gameList[board]
		for(key in thisGame.boardLayout.X){
			thisGame.boardLayout.X[key] = false;
		}
		for(key in thisGame.boardLayout.O){
			thisGame.boardLayout.O[key] = false;
		}
		thisGame.playerTurns = 0
		thisGame.won = false;
		thisGame.draw = false;
		$('.board-' + board + ' .info-field').css('visibility','hidden');
		// $('.board-' + board + ' .player-info span.current-player').text('X');
		$('.board-' + board + ' .player-info h3').html('Current Player:  <span class="current-player">X</span>')
		$('.board-' + board + ' .cell').text('\xa0');	
	}

	var deleteBoard = function(board){
		$('.board-' + board).remove();
	}

	newGame();

	$('.game-row').on('click', '.cell', function(){
		// Grab which board is being clicked
		var clickedBoard = $(this).parent().parent().parent()
		// Iterate through the boards in play and find which one is being clicked by class
		var thisMoveBoard = determineBoard(clickedBoard)
		var thisMoveCell = $(this).attr('id')
		playerTurn(thisMoveBoard, thisMoveCell);
	});

	$('.new-game').click(function(){
		newGame()
	});

	$('.game-row').on('click', '.restart-button', function(){
		var clickedBoard = $(this).parent().parent();
		var thisMoveBoard = determineBoard(clickedBoard);
		clearBoard(thisMoveBoard)
	});

	$('.game-row').on('click', '.remove-button', function(){
		var clickedBoard = $(this).parent().parent();
		var thisMoveBoard = determineBoard(clickedBoard);
		deleteBoard(thisMoveBoard)
	})
})