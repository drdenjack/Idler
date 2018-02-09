
var hands=111;
var arms=1;

function setElemData(id,val){
    document.getElementById(id).innerHTML = val;
}

function calcArmCost(){
    armCost = Math.floor(10 * Math.pow(1.1,arms));
    setElemData("armCost",armCost);
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

function init(){
    setElemData("arms",arms);
    setElemData("hands",hands);
    calcArmCost();
}

function saveStuff(){
    
    var save = {
	hands: hands,
	arms: arms,
    }

    localStorage.setItem("save",JSON.stringify(save));
}

function loadStuff(){
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.hands !== "undefined")
	hands = savegame.hands;    
    if (typeof savegame.arms !== "undefined")
	arms = savegame.arms;
    init();

    // // if successful ...
    // localStorage.removeItem("save")
}

window.setInterval(function(){
    handClick(arms);
    
}, 1000);

// // autosave?
// window.setInterval(function(){
//     save();
// }, 10000);

init();
