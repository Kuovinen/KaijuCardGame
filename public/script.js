// ☆☆
import card_bases from './cards.mjs'

let player_deck_div,deck,card,reset_button,add_button,remove_button;


//DECK
function create_deck(cards){
    let deck=[];
    for(let i=0;i<8;i++){
        let num=Math.floor(Math.random()*(cards.length));
        deck.push(cards[num]);
    }
    return deck;
}
//SEARCH
function find_card_by_code(code){
    for(let i=0;i<card_bases.length;i++){
        if(card_bases[i].code==code){
            return card_bases[i];
        }
    }
}
//ZOOM
function zoom(card){
    let code=card.target.className.split(" ");  //get array of an Elements ClassNames
    code=code[code.length-1];                   //get last ClassName (the code one)
    let cardData=find_card_by_code(code);       //get card Object in card list through it's code key
    let largeCard=document.getElementById("large_card");
    largeCard.style.backgroundColor="var(--color_" + cardData.card_base+")";
    largeCard.innerHTML=cardData.name;
    let card_image = document.createElement("div")
    let card_txt_bkg = document.createElement("div")
    card_image.className="large_img";
    card_txt_bkg.className="large_txt";
    card_txt_bkg.innerHTML=cardData.card_txt+" "+cardData.flavor;
    largeCard.appendChild(card_image);
    largeCard.appendChild(card_txt_bkg);
    largeCard.style.display="inline-block";

}


function goku(kaka,baka){
    console.log('heeh');
}



//HIDE ZOOM
function unzoom(){
    let largeCard=document.getElementById("large_card");
    largeCard.style.display="none";
}
//DRAW CARD
function draw_card(deck){
    let field=document.getElementById("hand_field_2");
    if(field.childElementCount<8){                  //if  player doesn't have a full hand
        let obj;
        if (card==0){
            let message=document.getElementById("outcome");
            message.style.display="flex";
            message.innerHTML="<div>NO MORE CARDS.</div><div>YOU LOSE</div>"
        }
        else{
            obj=deck[card-1];
            card--;
            player_deck_div.innerHTML=card;  //cards is global (deck)
            let card_base = document.createElement("div")
            let card_image = document.createElement("div")
            let card_txt_bkg = document.createElement("div")
            let classaddon=" "+obj.code;
            card_base.className="card_base_"+obj.card_base+" "+classaddon ;	
            card_image.className="card_image"+classaddon;
            card_txt_bkg.className="card_txt_bkg"+classaddon;
            card_txt_bkg.innerHTML=obj.card_txt+obj.flavor;
            card_base.innerHTML=obj.name;
            card_base.appendChild(card_image);
            card_base.appendChild(card_txt_bkg);
            card_base.onmouseover=zoom;
            card_base.onmouseout=unzoom;
            field.appendChild(card_base);
        }
    }
}
//RESET
function reset_game(){
    deck=create_deck(card_bases);                               //make new random deck
    card=deck.length;                                           //variable for number of cards left
    player_deck_div.innerHTML=card;                             //display num of cards on deck image
    player_deck_div.onclick=function(){draw_card(deck);};       //handle player draw
    let field=document.getElementById("hand_field_2");
    field.innerHTML="";                                         //empty player hand space div
    document.getElementById("counter1a").innerHTML="";          //empty out life counters
    document.getElementById("counter1b").innerHTML="";
    document.getElementById("counter2a").innerHTML="";
    document.getElementById("counter2b").innerHTML="";
    counter_fill("d");                                          //fill life counters
    counter_fill("l");
}
function assign_counter(suffix){
    let counter1;
    let counter2;
    if(suffix=="d"){
        counter1=document.getElementById("counter2a");
        counter2=document.getElementById("counter2b");
    }
    else if(suffix=="l"){
        counter1=document.getElementById("counter1a");
        counter2=document.getElementById("counter1b");
    }
    let counters=[];
    counters.push(counter1);
    counters.push(counter2);  
    return counters;
}
//LIFE COUNTER FILL              //html id is either b1d-b15d  or b1l-b15l
function counter_fill(suffix){   //sufix = either "d" for player or "l" for opponent;
    let counter1;
    let counter2;
    let counters=assign_counter(suffix);        //decide if player or oponent lifcounter is targeted
    [counter1,counter2]=counters;
    if (suffix!="d"&&suffix!="l"){console.log("got invalid lifecounter div element suffix!");}
    for(let i=0;i<8;i++){    //0-8                   fill back row first
        let div=document.createElement('div');
        div.id=`b`+(i+1)+suffix;
        counter1.appendChild(div);
    }
    for(let i=9;i<16;i++){      //9-16              fill fron row second
        let div=document.createElement('div');
        div.id=`b`+(i)+suffix;
        counter2.appendChild(div);
    }
}
//LIFE COUNTER ADD
function counter_add(suffix){
    let counter1;
    let counter2;  
    let counters=assign_counter(suffix);        //decide if player or oponent lifcounter is targeted
    [counter1,counter2]=counters;
    if (suffix!="d"&&suffix!="l"){console.log("got bad suffix in counter_add function");}
    let life_1= Array.from(counter1.children);	
    let life_2= Array.from(counter2.children);
    if (life_2.length<7){                           //check if front row lifecounter is not full
        let div=document.createElement('div');
        div.id=`b`+(15-life_2.length)+suffix;        //assing div id for CSS styling
        counter2.insertBefore(div,counter2.firstChild);
    }
    else if(life_2.length>=7 && life_1.length<8){   //check if back row lifecounter is not full while front is
        let div=document.createElement('div');      
        div.id=`b`+(life_1.length+1)+suffix;        //assing div id for CSS styling
        counter1.insertBefore(div,counter1.firstChild);
    }
    else{console.log("can't add more lives since they are full!");}
}
//LIFE COUNTER REMOVE
function counter_remove(suffix){
    let counter1;
    let counter2;  
    let counters=assign_counter(suffix);        //decide if player or oponent lifcounter is targeted
    [counter1,counter2]=counters;
    let life_1= Array.from(counter1.children);	//Array of current children DIVs contained in lifecounter DIV a
    let life_2= Array.from(counter2.children);  //Array of current children DIVs contained in lifecounter DIV b
if(life_1.length>0){                           
    counter1.removeChild(counter1.firstChild);
}
else if (life_1.length<=0 && life_2.length>0){
    counter2.removeChild(counter2.firstChild);  
}


}
counter_fill("d");
counter_fill("l");
player_deck_div=document.getElementById("deck_2");

reset_button=document.getElementById("reset");
add_button=document.getElementById("addHP");
remove_button=document.getElementById("removeHP");
reset_button.onclick=reset_game;
add_button.onclick=function(){counter_add("d");counter_add("l");};
remove_button.onclick=function(){counter_remove("d");counter_remove("l");}
deck=create_deck(card_bases);
card=deck.length;
player_deck_div.innerHTML=card;
player_deck_div.onclick=function(){draw_card(deck);};
