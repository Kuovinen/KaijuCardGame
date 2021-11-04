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
let cards=document.getElementById("deck_2");
let deck=create_deck(card_bases);
let card=deck.length;
cards.innerHTML=card;
cards.onclick=function(){draw_card(deck);};

//DECK
function create_deck(cards){
    let deck=[];
    for(let i=0;i<8;i++){
        let num=Math.floor(Math.random()*(cards.length));
        deck.push(cards[num]);
    }
    return deck;
}

//LIFE
function establish_life_points(suffix){
   // 
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
function unzoom(card){
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
            cards.innerHTML=card;  //cards is global (deck)
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
