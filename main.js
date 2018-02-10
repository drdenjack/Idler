
var handData = {
    idx: 0,
    label: "Hands",
    num: 10000,
    id: "hands",
    cost: null,
};
handData.costId=handData.id+"Cost";

var armData = {
    idx: 1,
    label: "Arms",
    num: 0,
    id: "arms",
    cost: 0,
};
armData.costId=armData.id+"Cost";

var footData = {
    idx: 2,
    label: "Feet",
    num: 0,
    id: "feet",
    cost: 0,
};
footData.costId=footData.id+"Cost";

function printItem(item){

    console.log("item.idx: "+item.idx);
    console.log("item.label: "+item.label);
    console.log("item.num: "+item.numj);
    console.log("item.id: "+item.id);
    console.log("item.cost: "+item.cost);
    console.log("item.costId: "+item.costId);
}

function setElemData(id,val){
    document.getElementById(id).innerHTML = val;
}

function calcCost(item){
    console.log(item.idx);
    item.cost = Math.floor(Math.pow(10,item.idx) * Math.pow(1.1,item.num));
    setElemData(item.costId,item.cost);
}

function handClick(num){
    handData.num = handData.num + num;
    setElemData(handData.id,handData.num);
}

function buyItem(item){
    printItem(item);
    if(item.cost == null) {
	item.num = item.num + 1;      
	setElemData(handData.id,handData.num);
    }
    else if(handData.num >= item.cost){
        item.num = item.num + 1;
    	handData.num = handData.num - item.cost;
	
	setElemData(item.id,item.num);
	setElemData(handData.id,handData.num);
	calcCost(item);
    };

};

function getRandInt(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function getChance(val){
    // for a 1 in 20 chance, val==20
    return (getRandInt(0,val) == 0);
}

function setRandTestVal(){

    var randVal=getRandInt(0,100);
    setElemData("randTest",randVal);

}

function makeTableRow(itemData){
    var colWidth=100;
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var name = document.createTextNode(itemData.label+": ");
    td.appendChild(name);
    td.width=colWidth;
    tr.appendChild(td);
    var span = document.createElement("span");
    span.id=itemData.id;
    span.innerHTML=itemData.id;
    td.appendChild(span);
    td.width=colWidth;
    tr.appendChild(td);
    var td = document.createElement("td");
    if(itemData.cost != null)
    {
    	var costText = document.createTextNode("Cost: ");
    	td.appendChild(costText);
    	var span = document.createElement("span");
    	span.id=itemData.costId;
    	span.innerHTML=itemData.cost;
    	td.appendChild(span);
    }
    td.width=colWidth;
    tr.appendChild(td);
    var td = document.createElement("td");
    var button = document.createElement("Button");
    button.innerHTML = "Buy "+itemData.label;
    button.onclick = function(){buyItem(itemData)};
    td.width=colWidth;
    td.appendChild(button);
    tr.appendChild(td);
    
    return tr;
}

function makeItemTable(){

    var colWidth=100;
    
    var itemTableDiv = document.getElementById("itemTableDiv");
    itemTableDiv.innerHTML="";
    var table = document.createElement("TABLE");
    var tableBody = document.createElement("TBODY");

    tr = makeTableRow(handData);
    tableBody.appendChild(tr);
    
    tr = makeTableRow(armData);
    tableBody.appendChild(tr);

    tr = makeTableRow(footData);
    tableBody.appendChild(tr);
	
    table.appendChild(tableBody);
    itemTableDiv.appendChild(table);
    
}

function init(){
    makeItemTable();
    setElemData(handData.id,handData.num);
    setElemData(armData.id,armData.num);
    setElemData(footData.id,footData.num);
    calcCost(armData);
    calcCost(footData);
}

function saveStuff(){
    
    var save = {
	hands: hands,
	arms: arms,
	// feet: feet,
    }

    localStorage.setItem("save",JSON.stringify(save));
}

function loadStuff(){
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.hands !== "undefined")
	hands = savegame.hands;
    if (typeof savegame.arms !== "undefined")
    	arms = savegame.arms;
    if (typeof savegame.feet !== "undefined")
    	feet = savegame.feet;
    init();

    // // if successful ...
    // localStorage.removeItem("save")
}



function myMove() {
  var elem = document.getElementById("myAnimation");   
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = pos + 'px'; 
      elem.style.left = pos + 'px'; 
    }
  }
}

var fishData = {
    state: 0,
    intervalId: 0,
    elemId: "fish",
    speed: 1,
    xPos: 0,
    yPos: 0,
    xDir: "right",
    yDir: "down",
};


function startFish() {
    
    if(fishData.state == 0)
    {
	fishData.state = 1;
	var elem = document.getElementById(fishData.elemId);   
	fishData.intervalId = setInterval(frame, 10);
	function frame() {
	    var rx = 1*fishData.speed;
	    var ry = 1*fishData.speed;

	    
	    
	    if (fishData.yPos > 380) {
	    	fishData.yDir = "up";
	    	fishData.yPos = 379;
	    }
	    else if(fishData.yPos < 0) {
	    	fishData.yDir = "down";
	    	fishData.yPos = 1;
	    }
	    else {

		if(getChance(50))
		{
		    if(fishData.yDir == "down") {
			fishData.yDir = "up";
		    }
		    else {
			fishData.yDir = "down";
		    }
		}
		if(getChance(100))
		{
		    if(fishData.xDir == "left") {
			fishData.xDir = "right";
		    }
		    else {
			fishData.xDir = "left";
		    }
		}
		    
		
	    	if(fishData.yDir == "down") {
	    	    fishData.yPos += ry;
	    	}
	    	else {
	    	    fishData.yPos -= ry;
	    	}
	    }
	    elem.style.top = fishData.yPos + 'px'; 
	    
	    if (fishData.xPos > 350) {
		fishData.xDir = "left";
		fishData.xPos = 349;
		// console.log("GO LEFT");
	    }
	    else if(fishData.xPos < 0) {
		fishData.xDir = "right";
		fishData.xPos = 1;
		// console.log("GO RIGHT");
	    }
	    else {
		if(fishData.xDir == "right") {
		    fishData.xPos += rx;
		    // console.log("Moving RIGHT");
		}
		else {
		    fishData.xPos -= rx;
		    // console.log("Moving LEFT");
		}
	    }
	    elem.style.left = fishData.xPos + 'px'; 

	}
    }
}

function stopFish() {
    fishData.state=0;
    // var elem = document.getElementById("fish");   
    clearInterval(fishData.intervalId);
}

window.setInterval(function(){
    // handClick(armData.num);
    handClick(armData.num+2*footData.num);

}, 1000);

// // autosave?
// window.setInterval(function(){
//     save();
// }, 10000);

init();
