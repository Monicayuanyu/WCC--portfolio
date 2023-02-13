//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded


let persona;

function setup() {
  createCanvas(500, 500);

  angleMode(RADIANS);
  //no animation / interaction chart
  noLoop();


  fetch("./json/persona.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    // console.log(data);
    
    persona= data.persona;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);

}

function drawChart(){

  console.log(persona);
  
  
  let total = 0;
  for(let i = 0; i < persona.length; i++){
    //get total
    total += persona[i].amount;
    
  }
  
  console.log(total);
  
  let centerX = width/2;
  let centerY = height/2;
  let diam = 300;
  let angleStart = TWO_PI*0.2;
  
  for(let i = 0; i < persona.length; i++){
    //draw
    let item = persona[i];
    
    let itemFraction = item.amount/total;
    let itemAngle = itemFraction * TWO_PI;
    let angleEnd = angleStart + itemAngle;
    
    let lineEndX = cos(angleEnd) * (diam*0.75);
    let lineEndY = sin(angleEnd) * (diam*0.75);
    
    
    stroke(0,0,0);
    strokeWeight(1);
    
    line(centerX,centerY,centerX+lineEndX,centerY+lineEndY);
    
    
    fill(item.color);
    arc(centerX,centerY,diam,diam,angleStart,angleEnd,PIE);
    
    angleStart += itemAngle;
  }
  
  textAlign(CENTER, TOP);
  fill (64, 64, 64);
  text ("Why people need to have public persona ？", width/2, 50);
  
}