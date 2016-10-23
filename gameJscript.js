//------------------------Score&Turn ------------------------------------
var score=0;
var turn=1;
function updateScore() {
    document.getElementById("score").innerHTML= "Score: "+score;
}
updateScore();
function updateTurn() {
    document.getElementById("turn").innerHTML = "Turn: "+turn;
}
updateTurn();
//------------------------Image------------------------------------------
var counter = 0; //number that card that is open

var allImage = [{src: 'image1.jpeg', id:1},{src: 'image2.jpeg', id:2},{src: 'image3.jpeg', id:3},{src: 'image4.jpeg', id:4},{src: 'image5.jpeg', id:5},{src: 'image6.jpeg', id:6},
                {src: 'image7.jpeg', id:7},{src: 'image8.jpeg', id:8},{src: 'image9.jpeg', id:9},{src: 'image10.jpeg', id:10},{src: 'image11.jpeg', id:11},{src: 'image12.jpeg', id:12},
                {src: 'image13.jpeg', id:13},{src: 'image14.jpeg', id:14},{src: 'image15.jpeg', id:15},{src: 'image16.jpeg', id:16},{src: 'image17.jpeg', id:17},{src: 'image18.jpeg', id:18},
                {src: 'image19.jpeg', id:1},{src: 'image20.jpeg', id:2},{src: 'image21.jpeg', id:3},{src: 'image22.jpeg', id:4},{src: 'image23.jpeg', id:5},{src: 'image24.jpeg', id:6},
                {src: 'image25.jpeg', id:7},{src: 'image26.jpeg', id:8},{src: 'image27.jpeg', id:9},{src: 'image28.jpeg', id:10},{src: 'image29.jpeg', id:11},{src: 'image30.jpeg', id:12},
                {src: 'image31.jpeg', id:13},{src: 'image32.jpeg', id:14},{src: 'image33.jpeg', id:15},{src: 'image34.jpeg', id:16},{src: 'image35.jpeg', id:17},{src: 'image36.jpeg', id:18}];

var usedImage = [{src: 'image1.jpeg', id:1},{src: 'image2.jpeg', id:2},{src: 'image3.jpeg', id:3},{src: 'image4.jpeg', id:4},{src: 'image5.jpeg', id:5},{src: 'image6.jpeg', id:6},
                {src: 'image7.jpeg', id:7},{src: 'image8.jpeg', id:8},{src: 'image9.jpeg', id:9},{src: 'image10.jpeg', id:10},{src: 'image11.jpeg', id:11},{src: 'image12.jpeg', id:12},
                {src: 'image13.jpeg', id:13},{src: 'image14.jpeg', id:14},{src: 'image15.jpeg', id:15},{src: 'image16.jpeg', id:16},{src: 'image17.jpeg', id:17},{src: 'image18.jpeg', id:18},
                {src: 'image19.jpeg', id:1},{src: 'image20.jpeg', id:2},{src: 'image21.jpeg', id:3},{src: 'image22.jpeg', id:4},{src: 'image23.jpeg', id:5},{src: 'image24.jpeg', id:6},
                {src: 'image25.jpeg', id:7},{src: 'image26.jpeg', id:8},{src: 'image27.jpeg', id:9},{src: 'image28.jpeg', id:10},{src: 'image29.jpeg', id:11},{src: 'image30.jpeg', id:12},
                {src: 'image31.jpeg', id:13},{src: 'image32.jpeg', id:14},{src: 'image33.jpeg', id:15},{src: 'image34.jpeg', id:16},{src: 'image35.jpeg', id:17},{src: 'image36.jpeg', id:18}]; //length = 36

var updateImage = [];

function randomImage(length) {
    var number = Math.ceil(Math.random()*(length-1));
    return number;
}

var imageElement = document.getElementsByClassName("my_image");

function start() {

    for(var i = 0; i<imageElement.length;i++) {
        var imageRandom = randomImage(usedImage.length); 
        imageElement[i].setAttribute('alt',usedImage[imageRandom].id); 
        imageElement[i].setAttribute('src',usedImage[imageRandom].src);
        updateImage.push({src: usedImage[imageRandom].src, id: usedImage[imageRandom].id}); //push 
        usedImage.splice(imageRandom,1);
    }
    setTimeout(function() {
        for(var i = 0; i<imageElement.length;i++) {
            imageElement[i].setAttribute('src', 'back.png');    
        }
    }, 4000);
}
var answer1=0;
var answer2=0;
function changeImage(image) { 
    if(image.getAttribute("src") != 'back.png') { //can only change card that's not open yet
         return false;
    }
   /* var confirmation = confirm("Do you want to select this card?");
    if(confirmation==false) {
        return false;
    }*/
    if(counter<1) {
        for(var i = 0; i<imageElement.length;i++) {
            if(image == imageElement[i]) {
                imageElement[i].setAttribute('src',updateImage[i].src);
                imageElement[i].setAttribute('alt',updateImage[i].id);
                answer1 = updateImage[i].id;
                counter++;
            }
                
        }
    } else if(counter==1) {
        for(var i = 0; i<imageElement.length;i++) {
            if(image == imageElement[i]) {
                imageElement[i].setAttribute('src',updateImage[i].src);
                imageElement[i].setAttribute('alt',updateImage[i].id);
                answer2=updateImage[i].id;
                counter++;
            }   
        }

    } else {
        return false;
    }
    if(counter==2) check();
}
function check() {
    if(answer1 == answer2) {
        var text = document.getElementById("head").innerHTML;
        document.getElementById("head").innerHTML = "CORRECT!!";
        setTimeout(function () {
            document.getElementById("head").innerHTML = text;
            counter = 0;
    }, 1000);
        score+=1;
        turn+=1;
        updateScore();
        updateTurn();
    } else {
        var text = document.getElementById("head").innerHTML;
        document.getElementById("head").innerHTML = "WRONG!!";
        score-=1;
        updateScore();
        setTimeout(function () {
            document.getElementById("head").innerHTML = text;
            for(var i=0;i<imageElement.length;i++) {
                if(imageElement[i].alt == answer1 && imageElement[i].src != 'back.png') {
                    imageElement[i].setAttribute('src', 'back.png');
                } 
                if(imageElement[i].alt == answer2 && imageElement[i].src != 'back.png') {
                    imageElement[i].setAttribute('src', 'back.png');
                }
            }
            counter = 0;
            turn+=1;
            updateTurn();
        }, 1000);
    }
}

//how to specify 1 element in the class  -> possibly can't need to change class to id instead
/*$(".my_image").hover(function(){
    $(this).attr("src", "lenin.jpg");
    }, function(){
    $(this).attr("src", "");
}); */


//-------------------- Game -----------------------
var Player="";
     Player = prompt('Please enter your name:', ' ');
    if ( Player==' ' || Player==null ) {
        Player="Bob";
    }
document.getElementsByTagName("h3")[0].innerHTML = "Player: "+Player;

if(Player!="") {
    var confirmation= confirm("You have 4 second to remember all the image. May the force be with you");
    if(confirmation == true) {
        start();
    } else {
        alert("Coward.");
    }
}
    
