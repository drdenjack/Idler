
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
    // val==0 returns 0

    if(val == 0)
	return 0;
    else
	return (getRandInt(0,val) == 0);
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

var fishTankData = {
    height: 400,
    width: 700,
    maxW: 1200,
    minW: 300,
}

function initFishTank() {
    midColCenter = document.getElementById("midColCenter");
    var mccPosData = midColCenter.getBoundingClientRect();

    var newWidth = Math.floor(mccPosData.width);
    if(newWidth < fishTankData.minW)
	newWidth = fishTankData.minW;
    else if(newWidth > fishTankData.maxW)
	newWidth = fishTankData.maxW;

    fishTankData.width=newWidth;
    
    tankElem = document.getElementById("fishTank");
    tankElem.style.height = fishTankData.height + "px";

    tankElem.style.width = newWidth + "px";
    
}

function doResize() {

    initFishTank();
    
    tankSize = document.getElementById("tankSize");
    tankSize.innerHTML="( "+fishTankData.height+" x "+fishTankData.width+" )";

}

doResize();

var fishData = {
    state: 0,
    intervalId: 0,
    elemId: "fish",
    speed: 1,
    xPos: 0,
    yPos: 0,
    xDir: "right",
    yDir: "down",
    height: 20,
    width: 40,
    color: "purple",
    rightText: ">---|>",
    leftText: "<|---<",
};

function fishInit() {
    fishElem = document.getElementById("fish");
    fishElem.style.height = fishData.height+"px";
    fishElem.style.width = fishData.width+"px";
    fishElem.style.background = fishData.color;
    
    fishText = document.getElementById("fishText");
    fishText.innerHTML = fishData.rightText;
}
fishInit();

function startFish() {
    
    if(fishData.state == 0)
    {
	fishData.state = 1;
	var elem = document.getElementById(fishData.elemId);   
	fishData.intervalId = setInterval(frame, 10);
	function frame() {
	    var rx = 1*fishData.speed;
	    var ry = 1*fishData.speed;

	    var ymax = fishTankData.height - fishData.height;
	    var xmax = fishTankData.width - fishData.width;

	    // var xChangeChance = 100;
	    // var yChangeChance = 50;
	    var xChangeChance = 0;
	    var yChangeChance = 110;
	    
	    if (fishData.yPos > ymax) {
	    	fishData.yDir = "up";
	    	fishData.yPos = ymax;
	    }
	    else if(fishData.yPos < 0) {
	    	fishData.yDir = "down";
	    	fishData.yPos = 0;
	    }
	    else {

		if(getChance(yChangeChance))
		{
		    if(fishData.yDir == "down") {
			fishData.yDir = "up";
		    }
		    else {
			fishData.yDir = "down";
		    }
		}
		if(getChance(xChangeChance))
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
	    
	    if (fishData.xPos > xmax) {
		fishData.xDir = "left";
		fishData.xPos = xmax;
	    }
	    else if(fishData.xPos < 0) {
		fishData.xDir = "right";
		fishData.xPos = 0;
	    }
	    else {
		if(fishData.xDir == "right") {
		    fishData.xPos += rx;
		}
		else {
		    fishData.xPos -= rx;
		}
	    }
	    elem.style.left = fishData.xPos + 'px'; 

	    fishText = document.getElementById("fishText");
	    if(fishData.xDir=="left") {
		fishText.innerHTML = fishData.leftText;
	    }
	    else {
		fishText.innerHTML = fishData.rightText;
	    }
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
