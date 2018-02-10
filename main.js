
var handData = {
    idx: 0,
    label: "Hands",
    num: 1110,
    id: "hands",
    cost: null,
    costId: this.id+"Cost",
};

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

window.setInterval(function(){
    // handClick(armData.num);
    handClick(armData.num+10*footData.num);

}, 1000);

// // autosave?
// window.setInterval(function(){
//     save();
// }, 10000);

init();
