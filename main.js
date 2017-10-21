(function () {

	var randomNum;
	var guessCount;
	var numInput = document.querySelector(".num-input");
	var resultP = document.querySelector(".result");

	Element.prototype.on = function(type, listener){
		var element = this;
		if (document.addEventListener) {
			element.addEventListener(type, listener);
		}else if(document.attachEvent){
			element.attachEvent("on"+type, listener);
		}else{
			element["on"+type]=listener;
		}
	}

	function getRandomNumber(min, max){
		var num = Math.round(Math.random() * (max - min) + min);
		console.log(num);
		return num;
	}

	function guess(e){
		var inputNum = numInput.value;
		console.log(inputNum);
		var resultTxt;
		if (guessCount < 10) {
			if (inputNum < randomNum) {
				resultTxt = "Oops, it's a bit small";
			}else if (inputNum > randomNum) {
				resultTxt = "Oops, it's a bit large";
			}else{
				resultTxt = "Well done! You got me!";
			}
		}else{
			resultTxt = "Game over, you've used up your chance!";
		}
		resultP.innerText = resultTxt;
	}

	function reset(){
		randomNum = getRandomNumber(0,100);
		guessCount = 0;
		resultP.innerText = "Please enter a number!";
	}

	function initial(){
		reset();
		var startBtn = document.querySelector(".btn-start");
		var guessBtn = document.querySelector(".btn-guess");
		startBtn.on("click", function(e){
			reset();
		});
		guessBtn.on("click", guess);
	}

	initial();

})();