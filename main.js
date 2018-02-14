
var foodData = {
    idx: 0,
    label: "Food",
    num: 10000,
    id: "food",
    cost: null,
};
foodData.costId=foodData.id+"Cost";

var bugData = {
    idx: 1,
    label: "Bugs",
    num: 0,
    id: "bugs",
    cost: 0,
};
bugData.costId=bugData.id+"Cost";

function printItem(item){

    console.log("item.idx: "+item.idx);
    console.log("item.label: "+item.label);
    console.log("item.num: "+item.num);
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

function foodClick(num){
    foodData.num = foodData.num + num;
    setElemData(foodData.id,foodData.num);
}

function buyItem(item){
    printItem(item);
    if(item.cost == null) {
	item.num = item.num + 1;      
	setElemData(foodData.id,foodData.num);
    }
    else if(foodData.num >= item.cost){
        item.num = item.num + 1;
    	foodData.num = foodData.num - item.cost;
	
	setElemData(item.id,item.num);
	setElemData(foodData.id,foodData.num);
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
    var itemTableDiv = document.getElementById("itemTableDiv");
    itemTableDiv.innerHTML="";
    var table = document.createElement("TABLE");
    table.setAttribute("id","itemTable");
    var tableBody = document.createElement("TBODY");
    tableBody.setAttribute("id","itemTableBody");

    tr = makeTableRow(foodData);
    tableBody.appendChild(tr);
    
    tr = makeTableRow(bugData);
    tableBody.appendChild(tr);

    table.appendChild(tableBody);
    itemTableDiv.appendChild(table);
    
}

function makeLogTable(){

    var logTableDiv = document.getElementById("logTableDiv");
    logTableDiv.innerHTML="";
    var table = document.createElement("TABLE");
    table.setAttribute("id","logTable");
    var tableBody = document.createElement("TBODY");
    tableBody.setAttribute("id","logTableBody");
    
    table.appendChild(tableBody);
    logTableDiv.appendChild(table);
}

function getLogTime() {
    var t = new Date();

    var hh = t.getHours();
    if(hh<10)
	hh="0"+hh;
    var mm = t.getMinutes();
    if(mm<10)
	mm="0"+mm;    
    var ss = t.getSeconds();
    if(ss<10)
	ss="0"+ss;
    
    return hh+":"+mm+":"+ss;
}

function addLogItem(msg) {

    var colWidth = 100;
    var maxNumRows = 10;

    var currTime = getLogTime();
    var logMsg = currTime+": "+msg;
    console.log(logMsg);

    var logTable = document.getElementById("logTable");
    var tr = logTable.insertRow(0);
    
    var td = document.createElement("td");
    var msgNode = document.createTextNode(logMsg);
    td.appendChild(msgNode);
    // td.width=colWidth;
    tr.appendChild(td);

    var numRows = logTable.rows.length;
    while(numRows>maxNumRows)
    {
	logTable.deleteRow(numRows-1);
	numRows = logTable.rows.length;
    }
    
    
}


function init(){
    makeItemTable();
    makeLogTable();
    setElemData(foodData.id,foodData.num);
    setElemData(bugData.id,bugData.num);
    calcCost(bugData);
}

function saveStuff(){
    
    var save = {
	foods: foods,
	bugs: bugs,
    }

    localStorage.setItem("save",JSON.stringify(save));
}

function loadStuff(){
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.foods !== "undefined")
	foods = savegame.foods;
    if (typeof savegame.bugs !== "undefined")
    	bugs = savegame.bugs;
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

    // var newWidth = Math.floor(mccPosData.width);
    var newWidth = mccPosData.width;
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
	addLogItem("Starting Fish ...");
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
    addLogItem("Stopping Fish ...");

    // var elem = document.getElementById("fish");   
    clearInterval(fishData.intervalId);
}

window.setInterval(function(){
    foodClick(bugData.num);
    
}, 1000);

// // autosave?
// window.setInterval(function(){
//     save();
// }, 10000);

init();
