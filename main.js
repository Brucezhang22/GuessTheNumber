(function() {
	var randomNum;
	var guessCount;
	var gameOver;
	var numInput = document.querySelector(".num-input");
	var resultP = document.querySelector(".result");
	var historyUl = document.querySelector(".history");

	Element.prototype.on = function(type, listener) {
		var element = this;
		if (document.addEventListener) {
			element.addEventListener(type, listener);
		} else if (document.attachEvent) {
			element.attachEvent("on" + type, listener);
		} else {
			element["on" + type] = listener;
		}
	};

	function getRandomNumber(min, max) {
		var num = Math.round(Math.random() * (max - min) + min);
		console.log(num);
		return num;
	}

	function addHistory(item){
		var li = document.createElement("li");
		li.innerText = item;
		historyUl.appendChild(li);
	}

	function guess(e) {
		if (gameOver) {
			var restart = confirm("do you want to play again?");
			if (restart) {
				reset();
			}
			return;
		}
		var inputNum = numInput.value;
		var resultTxt;
		console.log(inputNum);
		if (inputNum.length <= 0) {
			resultTxt = "Please enter a valid number first!";
		} else {
			if (guessCount < 10) {
				if (inputNum < randomNum) {
					resultTxt = "Oops, it's a bit small";
				} else if (inputNum > randomNum) {
					resultTxt = "Oops, it's a bit large";
				} else {
					resultTxt = "Well done! You got me!";
					gameOver = true;
				}
				addHistory(inputNum);
			} else {
				resultTxt = "Game over, you've used up your chance!";
				gameOver = true;
			}
		}
		resultP.innerText = resultTxt;
	}

	function reset() {
		randomNum = getRandomNumber(0, 100);
		guessCount = 0;
		resultP.innerText = "Please enter a number!";
		numInput.value = null;
		historyUl.innerHTML = "";
		gameOver = false;
	}

	function initial() {
		reset();
		var startBtn = document.querySelector(".btn-start");
		var guessBtn = document.querySelector(".btn-guess");
		numInput.on("keyup", function(e){
			var keyCode = e.keyCode || e.which;
			if (keyCode === 13) {
				guess();
				this.value = null;
			}
		})
		startBtn.on("click", function(e) {
			reset();
		});
		guessBtn.on("click", guess);
	}

	initial();
})();
