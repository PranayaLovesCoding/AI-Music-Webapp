song1="";
song2="";

leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;

score_leftWrist = 0;
score_rightWrist = 0;

status_song1 = "";
status_song2 = "";

function setup(){
    canvas=createCanvas(400,400);
    canvas.position(475,250);
    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelDone);
    poseNet.on('pose',gotPoses);
}

function modelDone(){
    console.log("PoseNet is initialized!")
}

function preload(){
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

function draw(){
    image(video,0,0,400,400);

    status_song1 = song1.isPlaying();
    status_song2 = song2.isPlaying();

    fill("red");
    stroke("red");

    if(score_leftWrist > 0.1){
        circle(leftWrist_x,leftWrist_y,20);
        song2.stop();
        if(status_song2 == false){
            song1.play();
            document.getElementById("song").innerHTML="Playing Harry Potter Theme Song";
        }
    }

    if(score_rightWrist > 0.1){
        circle(rightWrist_x,rightWrist_y,20);
        song1.stop();
        if(status_song1 == false){
            song2.play();
            document.getElementById("song").innerHTML="Playing Peter Pan Song";
        }
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist x = "+leftWrist_x+" leftWrist y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist x = "+rightWrist_x+" rightWrist y = "+rightWrist_y);
        
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("score leftWrist " + score_leftWrist+", score rightWrist " + score_rightWrist);
    
}
}