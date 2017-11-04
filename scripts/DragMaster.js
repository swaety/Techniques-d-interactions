

map_categories = {"voitures": ["Renault", "Wolkswagen","Peugeot","Citroen"], "alimentaire": ["nutella", "nestle"],
 "vetements": ["zara", "celio"], "smartphone": ["iphone", "galaxy"]}
 var dictionary = [
    
    { key: '2', value: 'Wolkswagen' },
    { key: '18', value: 'ALTICE' },
    { key: '19', value: 'APPLE' },
    { key: '3', value: 'Peugeot' },
    { key: '14', value: 'Tom & Pilou ' },
    { key: '15', value: 'Poulain' },
    { key: '4', value: 'Citroen' },
    { key: '8', value: 'Nina Ricci' },
    { key: '11', value: 'Ovomaltine' },
    { key: '5', value: 'Ford' },
    { key: '6', value: 'Zara' },
    { key: '13', value: 'Suchard' },
    { key: '1', value: 'Renault' },
    { key: '16', value: 'ACER' },
    { key: '17', value: 'ALCATEL' },
    { key: '7', value: 'Celio' },
    { key: '12', value: 'Rik & Rok' },
    { key: '20', value: 'ARCHOS' },
    { key: '9', value: 'Channel' },
    { key: '10', value: 'Nutella' }
    
]
var left = false ;
var right = false ;
var up = false ;
var down = false ;
var counter = 0 ; 
var score = 0 ;
function Mykeypress(code)
{
    var e = jQuery.Event( "keydown", { keyCode: code } );
    // trigger an artificial keydown event with keyCode 64
    jQuery( "body" ).trigger( e );
   

}

 window.addEventListener("DOMContentLoaded",function(){
    
    
 
    var olCenter = document.getElementById("ol-center");
    var olRight = document.getElementById("ol-right");
    var olLeft = document.getElementById("ol-left");
    var olUp = document.getElementById("ol-up");
    var olDown = document.getElementById("ol-down");
    var divScore = document.getElementById("score");
    


    var listItemCenter = document.createElement("li");
    listItemCenter.innerHTML = "<a>"+ dictionary[counter].value + "</a>" ;
    listItemCenter.setAttribute("id",dictionary[counter].key);
    olCenter.appendChild(listItemCenter);

    window.onkeydown = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;
        console.log(e.which);
        console.log(e.keyCode);
        if (key == 39) {
            left = true ;
            counter ++ ;
            var listItemLeft = document.createElement("li");
            listItemLeft.innerHTML = listItemCenter.innerHTML  ;
            listItemLeft.setAttribute("id",listItemCenter.getAttribute("id"));
            olCenter.removeChild(listItemCenter);
            olLeft.appendChild(listItemLeft);
            if((listItemLeft.getAttribute("id")>14)&&(listItemLeft.getAttribute("id")<21))
            {
                score ++ ;
                console.log(score);
                divScore.innerHTML = "<h3> votre score est : "+score+"</h3>"
            }

        }else if (key == 37) {
            right= true;
            counter ++ ;
            var listItemRight = document.createElement("li");
            listItemRight.innerHTML = listItemCenter.innerHTML  ;
            listItemRight.setAttribute("id",listItemCenter.getAttribute("id"));
            olCenter.removeChild(listItemCenter);
            olRight.appendChild(listItemRight);
            if((listItemRight.getAttribute("id")>0)&&(listItemRight.getAttribute("id")<6))
            {
                score ++ ;
                console.log(score);
                divScore.innerHTML = "<h3> votre score est :"+score+"</h3>"
            }
        }
        else if (key == 38) {
            up= true;
            counter ++ ;
            var listItemUp = document.createElement("li");
            listItemUp.innerHTML = listItemCenter.innerHTML  ;
            listItemUp.setAttribute("id",listItemCenter.getAttribute("id"));
            olCenter.removeChild(listItemCenter);
            olUp.appendChild(listItemUp);
            if((listItemUp.getAttribute("id")>5)&&(listItemUp.getAttribute("id")<10))
            {
                score ++ ;
                console.log(score);
                divScore.innerHTML = "<h3> votre score est :"+score+"</h3>"
            }
        }
        else if (key == 40) {
            down = true;
            counter ++ ;
            var listItemDown = document.createElement("li");
            listItemDown.innerHTML = listItemCenter.innerHTML  ;
            listItemDown.setAttribute("id",listItemCenter.getAttribute("id"));
            olCenter.removeChild(listItemCenter);
            olDown.appendChild(listItemDown);
            if((listItemDown.getAttribute("id")>9)&&(listItemDown.getAttribute("id")<16))
            {
                score ++ ;
                console.log(score);
                divScore.innerHTML = "<h3> votre score est :"+score+"</h3>"
            }
        }
        else if ((key == 13)&&((down == true )||(up == true )||(right == true )||(left == true )))
        {
            listItemCenter.innerHTML = "<a>"+ dictionary[counter].value + "</a>" ;
            listItemCenter.setAttribute("id",dictionary[counter].key);
            olCenter.appendChild(listItemCenter);

        }
    }
    
    
      
    

    


 })