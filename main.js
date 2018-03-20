
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
    button.innerHTML = "Forage "+itemData.label;
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

// fish that are active
var liveFishList = [];

// avaliable fish
var fishTypeList = [];

var fishColors = ["pink","purple","green","red","yellow","silver","white","orange","cyan","magenta","black"];

var fishData = {
    id: 111,
    elemId: "aaa",
    textId: "bbb",
    type: "medium",
    state: 0,
    intervalId: 0,
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
    xChangeChance: 250,
    yChangeChance: 100,
	    
};
fishTypeList.push(fishData);
// this would be better off with constructor, etc.
// make a new one with `fd = new fishData(...)`


function makeFishDiv(fd) {

    fd.id = liveFishList.length;
    fd.elemId = "fish"+fd.id;
    fd.textId = fd.elemId+"Text";
    
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id",fd.elemId);

    var testId = newDiv.getAttribute("id");
    
    var span = document.createElement("span");
    span.setAttribute("id",fd.textId);
    newDiv.appendChild(span);
    return newDiv;
}

function addFishToTank(fd) {

    // plop it in at a random location?
    
    var fishTankElem = document.getElementById("fishTank");
    var fishDiv = makeFishDiv(fd);

    fishTankElem.appendChild(fishDiv);
    fishDiv.className="fish";
}

function buyFish() {

    // get type of fish to add:
    var newFishId = liveFishList.length;

    addLogItem("Adding fish #"+newFishId);
    var newFishData = { ...fishTypeList[0] };

    // random color
    newFishData.color=fishColors[getRandInt(0,fishColors.length)];
    
    liveFishList.push(newFishData);
    
    addFishToTank(newFishData);
    fishInit(newFishData);

    numFish = document.getElementById("numFish");
    numFish.innerHTML=liveFishList.length;

    startOneFish(newFishData);
    
}

function fishInit(fd) {

    fishElem = document.getElementById(fd.elemId);
    fishElem.style.height = fd.height+"px";
    fishElem.style.width = fd.width+"px";
    // fishElem.style.background = fd.color;
    fishElem.style.color=fd.color;
    
    fishText = document.getElementById(fd.textId);
    fishText.innerHTML = fishData.rightText;
}

// function startFish() {

//     // foreach fishData, liveFishData

//     addLogItem("Starting fish ...");
    
//     liveFishList.forEach(function(fd) {
// 	startOneFish(fd);
//     });

// }

function startOneFish(fd) {
    
    if(fd.state == 0)
    {
	fd.state = 1;
	var elem = document.getElementById(fd.elemId);
	fd.intervalId = setInterval(frame, 10);
	function frame() {
	    var rx = 1*fd.speed;
	    var ry = 1*fd.speed;

	    var ymax = fishTankData.height - fd.height;
	    var xmax = fishTankData.width - fd.width;

	    if (fd.yPos > ymax) {
	    	fd.yDir = "up";
	    	fd.yPos = ymax;
	    }
	    else if(fd.yPos < 0) {
	    	fd.yDir = "down";
	    	fd.yPos = 0;
	    }
	    else {

		if(getChance(fd.yChangeChance))
		{
		    if(fd.yDir == "down") {
			fd.yDir = "up";
		    }
		    else {
			fd.yDir = "down";
		    }
		}
		if(getChance(fd.xChangeChance))
		{
		    if(fd.xDir == "left") {
			fd.xDir = "right";
		    }
		    else {
			fd.xDir = "left";
		    }
		}
		    
	    	if(fd.yDir == "down") {
	    	    fd.yPos += ry;
	    	}
	    	else {
	    	    fd.yPos -= ry;
	    	}
	    }
	    elem.style.top = fd.yPos + 'px'; 
	    
	    if (fd.xPos > xmax) {
		fd.xDir = "left";
		fd.xPos = xmax;
	    }
	    else if(fd.xPos < 0) {
		fd.xDir = "right";
		fd.xPos = 0;
	    }
	    else {
		if(fd.xDir == "right") {
		    fd.xPos += rx;
		}
		else {
		    fd.xPos -= rx;
		}
	    }
	    elem.style.left = fd.xPos + 'px'; 

	    fishText = document.getElementById(fd.textId);
	    if(fd.xDir=="left") {
		fishText.innerHTML = fd.leftText;
	    }
	    else {
		fishText.innerHTML = fd.rightText;
	    }
	}
    }
}

// function stopFish() {
//     addLogItem("Stopping Fish ...");
//     liveFishList.forEach(function(fd) {
// 	fd.state=0;
// 	clearInterval(fd.intervalId);
//     });
// }

window.setInterval(function(){
    foodClick(bugData.num);
    
}, 1000);

// // autosave?
// window.setInterval(function(){
//     save();
// }, 10000);

init();
