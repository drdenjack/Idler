
var hands=111;
var arms=1;
var armCost=0;
var feet=0;
var footCost=0;

function setElemData(id,val){
    document.getElementById(id).innerHTML = val;
}

function calcArmCost(){
    armCost = Math.floor(10 * Math.pow(1.1,arms));
    setElemData("armCost",armCost);
}

function calcFootCost(){
    footCost = Math.floor(100 * Math.pow(1.1,feet));
    setElemData("footCost",footCost);
}

function handClick(num){
    hands = hands + num;
    setElemData("hands",hands);
}

function buyArm(){
    if(hands >= armCost){                                   //checks that the player can afford the cursor
        arms = arms + 1;                                   //increases number of cursors
    	hands = hands - armCost;                          //removes the cookies spent
	setElemData("arms",arms);
	setElemData("hands",hands);
	calcArmCost();
    };
};

function buyFoot(){
    if(hands >= footCost){                                   //checks that the player can afford the cursor
        feet = feet + 1;                                   //increases number of cursors
    	hands = hands - footCost;                          //removes the cookies spent
	setElemData("feet",feet);
	setElemData("hands",hands);
	calcFootCost();
    };
};

function makeTableRow(type,typeId,costId,costVal,clickFunc,clickArg){
    var colWidth=100;
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var name = document.createTextNode(type+": ");
    td.appendChild(name);
    td.width=colWidth;
    tr.appendChild(td);
    var span = document.createElement("span");
    span.id=typeId;
    span.innerHTML=type;
    td.appendChild(span);
    td.width=colWidth;
    tr.appendChild(td);
    var td = document.createElement("td");
    if(costVal != null)
    {
    	var costText = document.createTextNode("Cost: ");
    	td.appendChild(costText);
    	var span = document.createElement("span");
    	span.id=costId;
    	span.innerHTML=costVal;
    	td.appendChild(span);
    }
    td.width=colWidth;
    tr.appendChild(td);
    var td = document.createElement("td");
    var button = document.createElement("Button");
    button.innerHTML = "Buy "+type;
    button.onclick = function(){clickFunc(clickArg)};
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

    tr = makeTableRow("Hands","hands",null,null,handClick,1);
    tableBody.appendChild(tr);
    tr = makeTableRow("Arms","arms","armCost",armCost,buyArm,1);
    tableBody.appendChild(tr);
    tr = makeTableRow("Feet","feet","footCost",footCost,buyFoot,1);
    tableBody.appendChild(tr);
	
    table.appendChild(tableBody);
    itemTableDiv.appendChild(table);
    
}

function init(){
    makeItemTable();
    setElemData("hands",hands);
    setElemData("arms",arms);
    setElemData("feet",feet);
    calcArmCost();
    calcFootCost();
}

function saveStuff(){
    
    var save = {
	hands: hands,
	arms: arms,
	feet: feet,
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
    handClick(arms+10*feet);
    
}, 1000);

// // autosave?
// window.setInterval(function(){
//     save();
// }, 10000);

init();
