draw = document.getElementById("cavegame").getContext("2d")

xRes = window.innerWidth
yRes = window.innerHeight

playerX = 46
highScore = 0
draw.mozImageSmoothingEnabled = false;
draw.webkitImageSmoothingEnabled = false;
draw.imageSmoothingEnabled = false;

frame = 0

if (xRes/96 > yRes/64) {
	scale = Math.round(yRes/64-0.49)
} else {
	scale = Math.round(xRes/96-0.49)
}

space = 48

dead = false

document.getElementById("cavegame").width = (96)
document.getElementById("cavegame").height = (64)

width = document.getElementById("cavegame").width
height = document.getElementById("cavegame").height

bg = "rgba(255,255,255,0.2)"

cave = new Array()
cave2 = new Array

for (var i = 0; i < 48; i++) {
	cave.push(width/4)
	cave2.push(width/4*3)
}

function init() {
	cave = new Array()
	cave2 = new Array

	for (var i = 0; i < 48; i++) {
		cave.push(width/4)
		cave2.push(width/4*3)
	}

	playerX = 46
	space = 48

	window.requestAnimationFrame(loop)
}

var map = []; // Or you could call it "key"
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
}

function loop(timestamp) {

	draw.fillStyle = bg
	draw.fillRect(0,0,document.getElementById("cavegame").width,document.getElementById("cavegame").height)

	draw.fillStyle = "#000000"

	for (var i = 0; i < 48; i++) {
		draw.fillRect(0,i*2,cave[i],2)
		draw.fillRect(cave2[i],i*2,width,2)
	}

	// Draw player

	draw.beginPath()
	draw.moveTo(playerX-0.5,0.5)
	draw.lineTo(playerX+4,0.5)
	draw.lineTo(playerX+1.5,2.5)
	draw.fill()

	cave.push(cave[cave.length-1]+Math.round(Math.random()*2-1))
	cave2.push(cave[cave.length-1]+space)
	cave.shift()
	cave2.shift()
	if (frame % 300 == 0) {
		space--
	}

	if (map[37] && playerX > 0) {
		playerX--
	}

	if (map[39] && playerX < 92) {
		playerX++
	}

	if (playerX <= cave[0] || playerX+3 >= cave2[0]) {
		console.log("ded")
		dead = true
		gameOver()
		return true
	}

	//debug()

	draw.fillStyle = "#808080"
	draw.fillText("Score:" + frame,0,60)

	frame++
  window.requestAnimationFrame(loop);
}

function gameOver() {
	if (frame > highScore) {
		highScore = frame
	}
	draw.fillStyle = "rgba(0,0,0,0.25)"
	draw.fillRect(0,0,96,64)
	draw.fillStyle = "#FFFFFF"
	var str = "HI:" + highScore
	draw.fillText(str,Math.floor((96-draw.measureText(str).width)/2),24)
	var str = "Score:" + frame
	draw.fillText(str,Math.floor((96-draw.measureText(str).width)/2),32)
	draw.fillText("Press Space to",12,40)
	draw.fillText("try again",24,48)

	//console.log(map)

	if (map[32]) {
		frame = 0
		window.requestAnimationFrame(init);
		return true
	}

	window.requestAnimationFrame(gameOver);
}