var dictionary = [		
	{ key: '24', value: 'Milka' },
    { key: '22', value: 'Suchard' },
	{ key: '17', value: 'Huawei' },
    { key: '14', value: 'Sony' },
    { key: '32', value: 'Renault' },
	{ key: '37', value: 'Mazda' },
    { key: '30', value: 'Kinder' },
    { key: '6', value: 'Prada' },
    { key: '4', value: 'Gucci' },
    { key: '8', value: 'Levis' },
	
	{ key: '29', value: 'M&M\'s' },
	{ key: '25', value: 'Cote d\'or' },
    { key: '19', value: 'Blackberry' },
	{ key: '38', value: 'Citroen' },
	{ key: '27', value: 'Poulain' },
	{ key: '31', value: 'Peugeot' },
	{ key: '12', value: 'HTC' },
	{ key: '5', value: 'H&M' },
	{ key: '2', value: 'Addidas' },
    { key: '36', value: 'Ford' },
	
	{ key: '13', value: 'Motorola' },
	{ key: '33', value: 'Ferrari' },
    { key: '18', value: 'Nokia' },
	{ key: '35', value: 'Bugatti' },
	{ key: '39', value: 'Nissan' },
	{ key: '3', value: 'Puma' },
    { key: '21', value: 'Lindt' },
	{ key: '26', value: 'Toblerone' },
    { key: '20', value: 'Xiaomi' },
	{ key: '9', value: 'Oxbow' },
	
    { key: '10', value: 'Armani' },
    { key: '40', value: 'Bentley' },
	{ key: '7', value: 'Louis Vuitton' },
	{ key: '15', value: 'Samsung' },
	{ key: '34', value: 'Lamborghini' },
	{ key: '1', value: 'Nike' },
    { key: '16', value: 'Wiko' },
	{ key: '11', value: 'Apple' },
    { key: '28', value: 'Ferrero' },
	{ key: '23', value: 'Nestlé' }
]

var partie = 10;
var currentWord = 1;
var left = false ;
var right = false ;
var up = false ;
var down = false ;
var counter = 0 ; 
var score = 0 ;

var olCenter = null;
var olRight = null;
var olLeft = null;
var olUp = null;
var olDown = null;
var divScore = null;
var listItemCenter = null;

var listItemRight = null;
var listItemLeft = null;
var listItemUp = null;
var listItemDown = null;

var incScore = false;


 window.addEventListener("DOMContentLoaded",function(){
olCenter = document.getElementById("ol-center");
olRight = document.getElementById("ol-right");
olLeft = document.getElementById("ol-left");
olUp = document.getElementById("ol-up");
olDown = document.getElementById("ol-down");
divScore = document.getElementById("score");


    
listItemCenter = document.createElement("li");
listItemCenter.innerHTML = "<a id=\"listC\">"+ dictionary[counter].value + "</a>" ;
listItemCenter.setAttribute("id",dictionary[counter].key);
listItemCenter.setAttribute("class","centerList");
olCenter.appendChild(listItemCenter);
})

function getRandomInt() {
  min = Math.ceil(1);
  max = Math.floor(5);
  return Math.floor(Math.random() * (5 - 1)) + 1;
}

var random = getRandomInt();

if(random == 1){
	counter = 0;
}
else if(random == 2){
	counter = 10;
}
else if(random == 3){
	counter = 20;
}
else if(random == 4){
	counter = 30;
}

function Right() {
			
	left = true ;
	right = false;
	up = false;
	down = false;
	listItemLeft = document.createElement("li");
		if(listItemDown != null){
			listItemLeft.innerHTML = listItemDown.innerHTML;
			listItemLeft.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemLeft.setAttribute("class","otherList");
			olDown.removeChild(listItemDown);
			olLeft.appendChild(listItemLeft);
			listItemDown = null;
		}
		else if(listItemUp != null){
			listItemLeft.innerHTML = listItemUp.innerHTML;
			listItemLeft.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemLeft.setAttribute("class","otherList");
			olUp.removeChild(listItemUp);
			olLeft.appendChild(listItemLeft);
			listItemUp = null;
		}
		else if(listItemRight != null){
			listItemLeft.innerHTML = listItemRight.innerHTML;
			listItemLeft.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemLeft.setAttribute("class","otherList");
			olRight.removeChild(listItemRight);
			olLeft.appendChild(listItemLeft);
			listItemRight = null;
		}
		else{
			listItemLeft.innerHTML = listItemCenter.innerHTML;
			listItemLeft.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemLeft.setAttribute("class","otherList");
			olCenter.removeChild(listItemCenter);
			olLeft.appendChild(listItemLeft);
		}
	if((listItemLeft.getAttribute("id")>10)&&(listItemLeft.getAttribute("id")<21))
	{
		incScore = true;
	}
}

function Left() {
	
	right= true;
	left = false ;
	up = false;
	down = false;
	listItemRight = document.createElement("li");
		if(listItemDown != null){
			listItemRight.innerHTML = listItemDown.innerHTML;
			listItemRight.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemRight.setAttribute("class","otherList");
			olDown.removeChild(listItemDown);
			olRight.appendChild(listItemRight);
			listItemDown = null;
		}
		else if(listItemUp != null){
			listItemRight.innerHTML = listItemUp.innerHTML;
			listItemRight.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemRight.setAttribute("class","otherList");
			olUp.removeChild(listItemUp);
			olRight.appendChild(listItemRight);
			listItemUp = null;
		}
		else if(listItemLeft != null){
			listItemRight.innerHTML = listItemLeft.innerHTML;
			listItemRight.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemRight.setAttribute("class","otherList");
			olLeft.removeChild(listItemLeft);
			olRight.appendChild(listItemRight);
			listItemLeft = null;
		}
		else{
			listItemRight.innerHTML = listItemCenter.innerHTML;
			listItemRight.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemRight.setAttribute("class","otherList");
			olCenter.removeChild(listItemCenter);
			olRight.appendChild(listItemRight);
		}
	if((listItemRight.getAttribute("id")>30)&&(listItemRight.getAttribute("id")<41))
	{
		incScore = true;
	}
}
function Up() {
	up= true;
	down = false;
	right= false;
	left = false ;
	listItemUp = document.createElement("li");
		if(listItemDown != null){
			listItemUp.innerHTML = listItemDown.innerHTML;
			listItemUp.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemUp.setAttribute("class","otherList");
			olDown.removeChild(listItemDown);
			olUp.appendChild(listItemUp);
			listItemDown = null;
		}
		else if(listItemLeft != null){
			listItemUp.innerHTML = listItemLeft.innerHTML;
			listItemUp.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemUp.setAttribute("class","otherList");
			olLeft.removeChild(listItemLeft);
			olUp.appendChild(listItemUp);
			listItemLeft = null;
		}
		else if(listItemRight != null){
			listItemUp.innerHTML = listItemRight.innerHTML;
			listItemUp.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemUp.setAttribute("class","otherList");
			olRight.removeChild(listItemRight);
			olUp.appendChild(listItemUp);
			listItemRight = null;
		}
		else{
			listItemUp.innerHTML = listItemCenter.innerHTML;
			listItemUp.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemUp.setAttribute("class","otherList");
			olCenter.removeChild(listItemCenter);
			olUp.appendChild(listItemUp);
		}
	if((listItemUp.getAttribute("id")>0)&&(listItemUp.getAttribute("id")<11))
	{
		incScore = true;
	}

}
function Down() {
	down = true;
	right= false;
	left = false ;
	up = false;
	listItemDown = document.createElement("li");
		if(listItemUp != null){
			listItemDown.innerHTML = listItemUp.innerHTML;
			listItemDown.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemDown.setAttribute("class","otherList");
			olUp.removeChild(listItemUp);
			olDown.appendChild(listItemDown);
			listItemUp = null;
		}
		else if(listItemLeft != null){
			listItemDown.innerHTML = listItemLeft.innerHTML;
			listItemDown.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemDown.setAttribute("class","otherList");
			olLeft.removeChild(listItemLeft);
			olDown.appendChild(listItemDown);
			listItemLeft = null;
		}
		else if(listItemRight != null){
			listItemDown.innerHTML = listItemRight.innerHTML;
			listItemDown.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemDown.setAttribute("class","otherList");
			olRight.removeChild(listItemRight);
			olDown.appendChild(listItemDown);
			listItemRight = null;
		}
		else{
			listItemDown.innerHTML = listItemCenter.innerHTML;
			listItemDown.setAttribute("id",listItemCenter.getAttribute("id"));
			listItemDown.setAttribute("class","otherList");
			olCenter.removeChild(listItemCenter);
			olDown.appendChild(listItemDown);
		}
	if((listItemDown.getAttribute("id")>20)&&(listItemDown.getAttribute("id")<31))
	{
		incScore = true;
	}
}

function Enter() {
	if(incScore){
		score ++;
		counter ++;
		incScore = false;
	}
	if (((down == true )||(up == true )||(right == true )||(left == true ))){
		if(currentWord != partie){
			divScore.innerHTML = "<h3> votre score est :"+score+"</h3>"
			listItemCenter.innerHTML = "<a id=\"listC\">"+ dictionary[counter].value + "</a>" ;
			listItemCenter.setAttribute("id",dictionary[counter].key);
			olCenter.appendChild(listItemCenter);
			currentWord ++
			listItemRight = null;
			listItemLeft = null;
			listItemUp = null;
			listItemDown = null;
		}
		else if(currentWord == partie){
			divScore.innerHTML = "<h3>La partie est terminée, vous avez marqués "+score+" points !</h3><button type=\"submit\" onclick=\"clicNouvellePartie()\">REJOUER</button>"
		}
	}
}

//================== clicNouvellePartie ==================
function clicNouvellePartie() {
	location.reload(); 
}
