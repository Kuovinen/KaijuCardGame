// ☆☆
let card_bases=[
    {
        name:"Razor",
        img:"/images/razor.jpg",
        code:"razr",
        rarity:3,
        card_txt:"Pick an enemy it loose 1hp. ",
        flavor:"The tall, lean, razorblade killing machine.",
        card_base:"2",
        x:"100px",
        y:"100px"    
    },
    {
        name:"Trooper",
        img:"/images/trooper.jpg",
        code:"trpr",
        rarity:1,
        card_txt:"Survive 1 death. ",
        flavor:"Captain Palmer of the 2nd division.",
        card_base:"1",
        x:"100px",
        y:"100px"    
    },
    {
        name:"Researcher",
        img:"/images/researcher.jpg",
        code:"rsrc",
        rarity:1,
        card_txt:"Search for any tech card. ",
        flavor:"Edward Straus. Phd",
        card_base:"1",
        x:"100px",
        y:"100px"    
    },
    {
        name:"CannonZ",
        img:"/images/cannonz.jpg",
        code:"cann",
        rarity:2,
        card_txt:"All Kaijus -1hp ",
        flavor:"Marvel of modern science",
        card_base:"3",
        x:"100px",
        y:"100px"    
    }
]
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
//HIDE ZOOM
function unzoom(){
    let largeCard=document.getElementById("large_card");
    largeCard.style.display="none";
}
//DRAW CARD
function draw_card(deck){
    let field=document.getElementById("hand_field_2");
    if(field.childElementCount<8){
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
    deck=create_deck(card_bases);
    card=deck.length;
    player_deck_div.innerHTML=card;
    player_deck_div.onclick=function(){draw_card(deck);};
    let field=document.getElementById("hand_field_2");
    field.innerHTML="";
    document.getElementById("counter1a").innerHTML="";
    document.getElementById("counter1b").innerHTML="";
    document.getElementById("counter2a").innerHTML="";
    document.getElementById("counter2b").innerHTML="";
    counter_fill("d");
    counter_fill("l");
}
//LIFE COUNTER FILL              //html id is either b1d-b15d  or b1l-b15l
function counter_fill(suffix){   //sufix = either "d" for player or "l" for opponent;
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
    else{console.log("got invalid lifecounter div element suffix!");}
    for(i=0;i<8;i++){    //0-8
        let div=document.createElement('div');
        div.id=`b`+(i+1)+suffix;
        counter1.appendChild(div);
    }
    for(i=9;i<16;i++){      //9-16
        let div=document.createElement('div');
        div.id=`b`+(i)+suffix;
        counter2.appendChild(div);
    }
}
//LIFE COUNTER ADD
function counter_add(suffix){
    let counter1;
    let counter2;  
    if(suffix=="d"){            //figure out which of 2 pairs of divs to populate
        counter1="counter2a";
        counter2="counter2b";
    }
    else if(suffix=="l"){
        counter1="counter1a";
        counter2="counter1b";
    }
    else{console.log("got bad suffix in counter_add function");}
    let life_1= Array.from(document.getElementById(counter1).children);	
    let life_2= Array.from(document.getElementById(counter2).children);
    if (life_2.length<7){       //populate the div that has room
        let div=document.createElement('div');
        div.id=`b`+(life_2.length+8)+suffix;
        console.log(`b`+(life_2.length+8)+suffix);
        document.getElementById(counter2).insertBefore(div,document.getElementById(counter2).firstChild);
    }
    else if(life_2.length>=7 && life_1.length<8){
        let div=document.createElement('div');
        div.id=`b`+(life_1.length+1)+suffix;
        console.log(div.id);
        document.getElementById(counter1).insertBefore(div,document.getElementById(counter1).firstChild);
    }
    else{console.log("can't add more lives since they are full!");}
}
//LIFE COUNTER REMOVE
function counter_remove(suffix){
    let counter1;
    let counter2;  
    if(suffix=="d"){            //figure out which of 2 pairs of divs to populate
        counter1="counter2a";
        counter2="counter2b";
    }
    else if(suffix=="l"){
        counter1="counter1a";
        counter2="counter1b";
    }
    let life_1= Array.from(document.getElementById(counter1).children);	
    let life_2= Array.from(document.getElementById(counter2).children);
if(life_2.length>0){
    console.log("LIFE row 2");
    console.log(Array.from(document.getElementById(counter2).children));
    document.getElementById(counter2).removeChild(document.getElementById(counter2).firstChild);
    console.log(Array.from(document.getElementById(counter2).children));
}
else if (life_2.length<=0 && life_1.length>0){
    console.log('life1!');
    document.getElementById(counter1).removeChild(document.getElementById(counter1).firstChild);  
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
