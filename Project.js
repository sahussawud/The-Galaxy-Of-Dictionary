var c = document.getElementById("c");
var ctx = c.getContext("2d");
var input = document.getElementById("input");
var ig = 2;
var times = 60000;
var multiplier = 1;
var startTime = 0,
	endTime = 0;
var endscene = false;
//words from http://www.world-english.org/english500.htm
//hand-typed cause dedication, cant sleep, relieve some thoughts 
var words = ["the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", "with", "as", "I", "his", "they", "be", "at", "one", "have", "this", "from", "or", "had", "by", "hot", "but", "some", "what", "there", "we", "can", "out", "other", "were", "all", "your", "when", "up", "use", "word", "how", "said", "an", "each", "she", "which", "do", "their", "time", "if", "will", "way", "about", "many", "then", "them", "would", "write", "like", "so", "these", "her", "long", "make", "thing", "see", "him", "two", "has", "look", "more", "day", "could", "go", "come", "did", "my", "sound", "no", "most", "number", "who", "over", "know", "water", "than", "call", "first", "people", "may", "down", "side", "been", "now", "find", "any", "new", "work", "part", "take", "get", "place", "made", "live", "where", "after", "back", "little", "only", "round", "man", "year", "came", "show", "every", "good", "me", "give", "our", "under", "name", "very", "through", "just", "form", "much", "great", "think", "say", "help", "low", "line", "before", "turn", "cause", "same", "mean", "differ", "move", "right", "boy", "old", "too", "does", "tell", "sentence", "set", "three", "want", "air", "well", "also", "play", "small", "end", "put", "home", "read", "hand", "port", "large", "spell", "add", "event", "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", "men", "change", "went", "light", "kind", "off", "need", "house", "picture", "try", "us", "again", "animal", "point", "mother", "world", "near", "build", "self", "earth", "father", "head", "stand", "own", "page", "should", "country", "found", "answer", "school", "grow", "study", "still", "learn", "plant", "cover", "food", "sun", "four", "thought", "let", "keep", "eye", "never", "last", "door", "between", "city", "tree", "cross", "since", "hard", "start", "might", "story", "saw", "far", "sea", "draw", "left", "late", "run", "don't", "while", "press", "close", "night", "real", "life", "few", "stop", "open", "seem", "together", "next", "white", "children", "begin", "got", "walk", "example", "ease", "paper", "often", "always", "music", "those", "both", "mark", "book", "letter", "until", "mile", "river", "car", "feet", "care", "second", "group", "carry", "took", "rain", "eat", "room", "friend", "began", "idea", "fish", "mountain", "north", "once", "base", "hear", "horse", "cut", "sure", "watch", "color", "face", "wood", "main", "enough", "plain", "girl", "usual", "young", "ready", "above", "ever", "red", "list", "though", "feel", "talk", "bird", "soon", "body", "dog", "family", "direct", "pose", "leave", "song", "measure", "state", "product", "black", "short", "numeral", "class", "wind", "question", "happen", "complete", "ship", "area", "half", "rock", "order", "fire", "south", "problem", "piece", "told", "knew", "pass", "farm", "top", "whole", "king", "size", "heard", "best", "hour", "better", "true", "during", "hundred", "am", "remember", "step", "early", "hold", "west", "ground", "interest", "reach", "fast", "five", "sing", "listen", "six", "table", "travel", "less", "morning", "ten", "simple", "several", "vowel", "toward", "war", "lay", "against", "pattern", "slow", "center", "love", "person", "money", "serve", "appear", "road", "map", "science", "rule", "govern", "pull", "cold", "notice", "voice", "fall", "power", "town", "fine", "certain",/*getting paranoid of typos or mixed dreams, anyways, last 100ish words, didn't take as long as i thought, only been about 30 minutes or so*/ "fly", "unit", "lead", "cry", "dark", "machine", "note", "wait", "plan", "figure", "star", "box", "noun", "field", "rest", "correct", "able", "pound", "done", "beauty", "drive", "stood", "contain", "front", "teach", "week", "final", "gave", "green", "oh", "quick", "develop", "sleep", "warm", "free", "minute", "strong",/*left pinky and right ring finger beginning to hurt*/ "special", "mind", "behind", "clear", "tail", "produce", "fact", "street", "inch", "lot", "nothing", "course", "stay", "wheel", "full", "force", "blue", "object", "decide", "surface", "deep", "moon", "island", "foot", "yet", "busy", "record", "boat", "common", "gold", "possible", "plane", "age", "dry", "wonder", "laugh", "thousand", "ago", "ran", "check", "game", "shape", "yes", "hot",/*did hot come up twice?*/ "miss", "brought", "heat", "snow", "bed", "bring", "sit", "perhaps", "fill", "east", "weight", "language", "among"];
var secret = "SmVzc2ljYQ==";
var enemies = [],
	enemyWords = [];
var enemySpeed = 0.35;
var generatorNumber = 0.1;
	maxGeneratorNumber = 50;
var value = "";
var score = 0;
	done = 0;
var y = 0;
var storage = window.localStorage;
var laser = false,
	storedX,
	storedY;
var hit = 0,
	full = 0;
var smallSparks = [],
	largeSparks = [];
var sx = [],
	sy = [],
	sc = [],
	ss = [];
var soundFX;
var shot;

function preload(){
	soundFX = new Audio('./Lazerbeam3.wav');
}
preload();
for(var i = 0; i < 250; i++) {
	sx.push(Math.random() * window.innerWidth);
	sy.push(Math.random() * window.innerHeight);
	sc.push("rgb(" + Math.floor(Math.random() * 55) + 200 + ", " + Math.floor(Math.random() * 55) + 200 + ", " + Math.floor(Math.random() * 55) + 200 + ")");
	ss.push(Math.random());
}
if(typeof storage.highscoreYaeQam === "undefined") 
	storage.highscoreYaeQam = 0;
if(typeof storage.highcpmYaeQam === "undefined") 
	storage.highcpmYaeQam = 0;
if(typeof storage.highpercentYaeQam === "undefined") 
	storage.highpercentYaeQam = 0;

function clear() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	for(var i = 0; i < ss.length; i++) {
		ctx.beginPath();
		ctx.fillStyle = sc[i];
		ctx.arc(sx[i], sy[i], ss[i], 0, 2 * Math.PI);
		ctx.fill();
	}
}
function smallExplosion() {
	for(var i = 0; i < 100; i++) {
		//x, y, sideMovement, downSpeed
		smallSparks.push([
			storedX,
			storedY,
			Math.random() * 8 - 4,
			Math.random() * 25 + 5
		]);
			soundFX.play();
	}

}
function bigExplosion() {
	for(var i = 0; i < 500; i++) {
		largeSparks.push([
			Math.random() * c.width,
			-Math.random() * 25,
			Math.random() * 8 - 4,
			Math.random() * 4 + 1,
			"rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ")"
		]);
	}
}
function generate() {
	//x
	enemies.push(
		Math.random() * (c.width - 550) + 200
	);
	//word
	enemyWords.push(
		words[Math.floor(Math.random() * words.length)]
	);
}
function laze() {
	if(laser) {
		ctx.strokeStyle = "#f00";
		ctx.lineWidth = 8;
		ctx.beginPath();
		ctx.moveTo(c.width / 2, c.height - 100);
		ctx.lineTo(storedX, y);
		ctx.stroke();
		smallExplosion();
		laser = false;
	}
}
function test() {
	input.value = input.value.substr(input.value.length - 1, 1);
	value = input.value;
	if(ig==1) {
		if(enemyWords[0].length < 12) {
			if(value === enemyWords[0].substr(0, 1)) {
				enemyWords[0] = enemyWords[0].substr(1);
<<<<<<< HEAD
				score += 2 * multiplier;
=======
				score += 2 * multiplier[timeSelector];
				done++;
>>>>>>> 2fc1b542cd335799a4d91f2734c3974338860d64
				laser = true;
				storedX = enemies[0];
				storedY = y;
				hit++;
			}
			else 
				if(score > 0){
					score -= 2 * multiplier;
				}
<<<<<<< HEAD
=======
				
			full++;
		}
		else {
			if(value === enemyWords[0][0].substr(0, 1)) {
				enemyWords[0][0] = enemyWords[0][0].substr(1);
				score += 1000000;
				done++;
				hit++;
			}
			else
				score -= 2000000;
			full++;
>>>>>>> 2fc1b542cd335799a4d91f2734c3974338860d64
		}
	}
}
function update() {
	input.focus();
	if(input.value.length !== value.length) 
		test();
<<<<<<< HEAD
	if(ig==1) {
		generate();
		if(Math.random() > generatorNumber) {
=======
	if(ig) {
		if(enemies.length < 1) 
			generate();
		if(y < 24) 
			y += 24;
		if(Math.random() < generatorNumber) {
			if(Math.random() < 0.0000000001) {
				enemies.push(
					200
				);
				enemyWords.push(
					[window.atob(secret), "h", "s", "u", "r", "c", "t", "e", "r", "c", "e", "s"]
				);
			}
			else 
>>>>>>> 2fc1b542cd335799a4d91f2734c3974338860d64
				generate();
		}
		y += enemySpeed;
		for(var i = enemies.length - 1; i > -1; i--) {
			if(i * -24 + y >= c.height - 150) {
				enemies.splice(i, 1);
				enemyWords.splice(i, 1);
				if(score > 0){
					score -= 2;
				}
				if(enemyWords[i].length < 12) 
					full += enemyWords[i].length;
				else 
					full += enemyWords[i][0].length;
				y -= 25;
			}
			if(enemyWords[i].length < 12) {
				if(enemyWords[i].length < 1) {
					enemies.splice(i, 1);
					enemyWords.splice(i, 1);
					y -= 25;
				}
			}
			else {
				if(enemyWords[i][0].length < 1) {
					enemies.splice(i, 1);
					enemyWords.splice(i, 1);
					y -= 25;
				}
			}
		}
		if(new Date().getTime() >= endTime) {
			endscene = true;
			ig = 2;
			if(score > Number(storage.highscoreYaeQam)) {
				storage.highscoreYaeQam = score;
				bigExplosion();
			}
<<<<<<< HEAD
			percentage = Math.round((hit / full) * 10000) / 100;
			if(percentage > 100) 
				percentage = 100;
			if(isNaN(percentage))
=======
			if(cpm > Number(storage.highcpmYaeQam)) {
				storage.highcpmYaeQam = cpm;
				bigExplosion();
			}
			percentage = Math.round((hit / full) * 10000) / 100;// ใช้ math.round เพื่อปัดค่าไปเลข interger ที่ใกล้ที่สุด ห
			if(percentage > 100) 
				percentage = 100;
			if(isNaN(percentage)) // isNaN สำหรับเช็คว่าค่า ไม่ใช่ตัวเลข ใช่หรือไม่( is Not-a-number) ใช้เช็ค undifined ได้
>>>>>>> 2fc1b542cd335799a4d91f2734c3974338860d64
				percentage = 0;
			if(percentage > Number(storage.highpercentYaeQam)) {
				storage.highpercentYaeQam = percentage;
				bigExplosion();
			}
		}
		if(timeSelector === 0) 
			cpm = Math.round(done * 2 * 100) / 100;
		if(timeSelector === 1) 
			cpm = Math.round(done * 100) / 100;
		if(timeSelector === 2) 
			cpm = Math.round(done * 0.75 * 100) / 100;
		if(timeSelector === 3) 
			cpm = Math.round(done * 0.5 * 100) / 100;
	}
	else {
<<<<<<< HEAD
=======
		if(value === "+") {
			if(timeSelector < 3) 
				timeSelector++;
			else 
				timeSelector = 0;
			input.value = "az";
		}
		else if(value === "-") {
			if(timeSelector > 0) 
				timeSelector--;
			else 
				timeSelector = 3;
			input.value = "az";
		}
>>>>>>> 2fc1b542cd335799a4d91f2734c3974338860d64
		if(value === " ") {
			score = 0;
			input.value = "";
			enemies = [];
			enemyWords = [];
			generatorNumber = 0.1;
			enemySpeed = 0.35;
			done = 0;
			y = 0;
			hit = 0;
			full = 0;
			startTime = new Date().getTime();
			endTime = startTime + times;
			ig = 1;
		}
	}
	for(var i = 0; i < smallSparks.length; i++) {
		smallSparks[i][0] += smallSparks[i][2];
		smallSparks[i][1] += smallSparks[i][3];
		if(smallSparks[i][1] > c.height) 
			smallSparks.splice(i, 1);
	}
	for(var i = 0; i < largeSparks.length; i++) {
		largeSparks[i][0] += largeSparks[i][2];
		largeSparks[i][1] += largeSparks[i][3];
		if(largeSparks[i][1] > c.height) 
			largeSparks.splice(i, 1);
	}
}
function draw() {
	requestAnimationFrame(draw);
	update();
	clear();
	for(var i = 0; i < smallSparks.length; i++) {
		ctx.fillStyle = "#fff";
		ctx.fillRect(smallSparks[i][0], smallSparks[i][1], 5, 5);
	}
	for(var i = 0; i < largeSparks.length; i++) {
		ctx.fillStyle = largeSparks[i][4];
		ctx.fillRect(largeSparks[i][0], largeSparks[i][1], 10, 10);
	}
	if(ig==1) {
		laze();
		ctx.font = " 32px 'Press Start 2P'";
		ctx.fillStyle = "#fff";
		ctx.fillText(value, c.width / 2 - 12, c.height - 45);
		ctx.font = "32px 'Press Start 2P'";
		for(var i = enemies.length - 1; i > -1; i--) {
			if(i < 1) {
				if(enemyWords[i].length < 12)
					ctx.fillStyle = "#f1bdf1";
				else 
					ctx.fillStyle = "#c03f0e0";
			}
			else {
				if(enemyWords[i].length < 12)
					ctx.fillStyle = "#282";
				else 
					ctx.fillStyle = "#b020d0";
			}
			if(enemyWords[i].length < 12) 
				ctx.fillText(enemyWords[i], enemies[i], i * -24 + y);
			else 
				ctx.fillText(enemyWords[i][0], enemies[i], i * -24 + y);
		}
	}
	if(ig==1) {
		ctx.shadowColor="red";
		ctx.shadowBlur=10;
		ctx.lineWidth=5;
		ctx.fillStyle = "#8fcae4";
		ctx.fillStyle = "#ffa500";
		ctx.fillText(Math.round((endTime - new Date().getTime()) / 1000)+ " s", 4, 36);
	}
<<<<<<< HEAD
	if(ig==2) {
		if (endscene==false){
			ctx.font = "20px 'Press Start 2P'";

			ctx.fillStyle = "#FFEB3B";
			ctx.fillText("HOW TO PLAY!", c.width / 2 - 100, c.height / 2 - +300);
			ctx.font = "15px 'Press Start 2P'";
			ctx.fillText("1.The word will fall down from top of your screen.", c.width / 4 + 25, c.height / 2 - +250);
			ctx.fillText("2.Your have to type following the stress word.", c.width / 4 +25, c.height / 2 - +200);
			ctx.fillText("3.Show me your talent typing skill, Let's SPACE now!!!", c.width / 4 +25, c.height / 2 - +150);



			ctx.font = "24px 'Press Start 2P'";
			ctx.shadowColor="#caef62";
			ctx.shadowBlur=10;
			ctx.lineWidth=5;
			ctx.fillStyle = "#7bff5a";
			ctx.fillText("Press SPACE to start! ", c.width / 2 - 250, c.height / 2 + 94);


			ctx.font = "48px 'Press Start 2P'";
			ctx.shadowColor="red";
			ctx.shadowBlur=10;
			ctx.lineWidth=5;
			ctx.fillStyle = "#8fcae4";
			ctx.fillText("THE GALAXY OF DICTIONARY", c.width / 2 - 560, c.height / 2 + 24);

		
			var sub = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			for(var i=0; i<24 ; i++){
				ctx.font = "24px 'Press Start 2P'";
				ctx.shadowColor="#caef62";
				ctx.fillStyle = "#0808a3";
				ctx.fillText(sub[i], Math.random() * c.width, c.height *Math.random());
			}
	
		}
		else{
			ctx.font = "24px 'Press Start 2P'";
			ctx.shadowColor="#caef62";
			ctx.shadowBlur=10;
			ctx.lineWidth=5;
			ctx.fillStyle = "#7bff5a";
			ctx.fillText("Press SPACE to Retry Again! ", c.width / 2 - 340, c.height / 2 + 94);
			ctx.font = "30px 'Press Start 2P'";
			ctx.fillStyle = "#FF6347";
			ctx.fillText("High Score: "+storage.highscoreYaeQam, c.width /3, c.height / 2 - 180);
			ctx.fillStyle = "#ff0";
			ctx.fillText("Your Score: " + score, c.width /3 + 20, c.height / 2 - 110);
			if(storage.highscoreYaeQam > score){
				ctx.font = "48px 'Press Start 2P'";
				ctx.shadowColor="red";
				ctx.shadowBlur=10;
				ctx.lineWidth=5;
				ctx.fillStyle = "#8fcae4";
				ctx.fillText("Let's Try It Again"+"👽", c.width / 2 - 460, c.height / 2 + 30,);

		
			}else{
				ctx.font = "48px 'Press Start 2P'";
				ctx.shadowColor="red";
				ctx.shadowBlur=10;
				ctx.lineWidth=5;
				ctx.fillStyle = "#8fcae4";
				ctx.fillText("You are monters finger!"+"👩‍💻", c.width / 2 - 560, c.height / 2 + 30,);
			} 
		}
=======
	if(!ig) {
		ctx.font = "24px 'Press Start 2P'";
		ctx.shadowColor="#caef62";
		ctx.shadowBlur=10;
		ctx.lineWidth=5;
		ctx.fillStyle = "#8fcae4";
		ctx.fillStyle = "#2c2a56";
		ctx.fillText("Press SPACE to start! ", c.width / 2 - 250, c.height / 2 + 94);
	}
	if(!ig) {
		ctx.font = "48px 'Press Start 2P'";
		ctx.shadowColor="red";
		ctx.shadowBlur=10;
		ctx.lineWidth=5;
		ctx.fillStyle = "#8fcae4";
		ctx.fillText("THE GALAXY OF DICTIONARY", c.width / 2 - 560, c.height / 2 + 24, );

	}
	else{
		ctx.font = "32px 'Press Start 2P'";
		ctx.fillStyle = "#ff0";
		ctx.fillText("Score: " + score, c.width - score.toString().length * 18 - 310, c.height - 80);
		ctx.fillStyle = "#FF6347";
		ctx.fillText("High Score: "+storage.highscoreYaeQam, c.width - storage.highscoreYaeQam.toString().length * 18 - 450, c.height - 36);
>>>>>>> 2fc1b542cd335799a4d91f2734c3974338860d64
	}

}

draw();

window.oncontextmenu = function() {
	return false;
}