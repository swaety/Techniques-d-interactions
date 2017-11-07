var dictionary = [		
	{ key: '24', value: 'Milka' },
    { key: '22', value: 'Suchard' },
	{ key: '17', value: 'Huawei' },
    { key: '14', value: 'Sony' },
    { key: '2', value: 'Addidas' },
	{ key: '37', value: 'Mazda' },
    { key: '30', value: 'Kinder' },
    { key: '6', value: 'Prada' },
    { key: '4', value: 'Gucci' },
    { key: '8', value: 'Levis' },
	
	{ key: '29', value: 'M&M\'s' },
	{ key: '21', value: 'Lindt' },
    { key: '32', value: 'Renault' },
	{ key: '25', value: 'Cote d\'or' },
    { key: '34', value: 'Lamborghini' },
	{ key: '27', value: 'Poulain' },
	{ key: '31', value: 'Peugeot' },
	{ key: '5', value: 'H&M' },
    { key: '26', value: 'Toblerone' },
    { key: '36', value: 'Ford' },
	
	{ key: '13', value: 'Motorola' },
	{ key: '33', value: 'Ferrari' },
    { key: '18', value: 'Nokia' },
	{ key: '35', value: 'Bugatti' },
	{ key: '39', value: 'Nissan' },
	{ key: '3', value: 'Puma' },
    { key: '12', value: 'HTC' },
    { key: '38', value: 'Citroen' },
    { key: '20', value: 'Xiaomi' },
	{ key: '9', value: 'Oxbow' },
	
	{ key: '19', value: 'Blackberry' },
    { key: '10', value: 'Armani' },
    { key: '40', value: 'Bentley' },
	{ key: '7', value: 'Louis Vuitton' },
	{ key: '15', value: 'Samsung' },
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
	
	counter ++ ;
	var listItemLeft = document.createElement("li");
	listItemLeft.innerHTML = listItemCenter.innerHTML  ;
	listItemLeft.setAttribute("id",listItemCenter.getAttribute("id"));
	olCenter.removeChild(listItemCenter);
	olLeft.appendChild(listItemLeft);
	if((listItemLeft.getAttribute("id")>10)&&(listItemLeft.getAttribute("id")<21))
	{
		score ++ ;
		console.log(score);
	}

}

function Left() {
	
	right= true;
	left = false ;
	up = false;
	down = false;
	counter ++ ;
	
	var listItemRight = document.createElement("li");
	listItemRight.innerHTML = listItemCenter.innerHTML  ;
	listItemRight.setAttribute("id",listItemCenter.getAttribute("id"));
	olCenter.removeChild(listItemCenter);
	olRight.appendChild(listItemRight);
	if((listItemRight.getAttribute("id")>30)&&(listItemRight.getAttribute("id")<41))
	{
		score ++ ;
		console.log(score);
	}
}
function Up() {
	up= true;
	down = false;
	right= false;
	left = false ;
	counter ++ ;
	var listItemUp = document.createElement("li");
	listItemUp.innerHTML = listItemCenter.innerHTML  ;
	listItemUp.setAttribute("id",listItemCenter.getAttribute("id"));
	olCenter.removeChild(listItemCenter);
	olUp.appendChild(listItemUp);
	if((listItemUp.getAttribute("id")>0)&&(listItemUp.getAttribute("id")<11))
	{
		score ++ ;
		console.log(score);
	}
}
function Down() {
	down = true;
	right= false;
	left = false ;
	up = false;
	counter ++ ;
	var listItemDown = document.createElement("li");
	listItemDown.innerHTML = listItemCenter.innerHTML  ;
	listItemDown.setAttribute("id",listItemCenter.getAttribute("id"));
	olCenter.removeChild(listItemCenter);
	olDown.appendChild(listItemDown);
	if((listItemDown.getAttribute("id")>20)&&(listItemDown.getAttribute("id")<31))
	{
		score ++ ;
		console.log(score);
	}
}
function Enter() {
	if (((down == true )||(up == true )||(right == true )||(left == true ))){
		if(currentWord != partie){
			divScore.innerHTML = "<h3> votre score est :"+score+"</h3>"
			listItemCenter.innerHTML = "<a id=\"listC\">"+ dictionary[counter].value + "</a>" ;
			listItemCenter.setAttribute("id",dictionary[counter].key);
			olCenter.appendChild(listItemCenter);
			currentWord ++
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
