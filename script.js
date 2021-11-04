let card_bases=[
    {
        name:"Razor",
        img:"/images/razor.jpg",
        rarity:3,
        card_txt:"Pick an enemy it loose 1hp. ",
        flavor:"The tall, lean, razorblade killing machine.",
        card_base:"card_base_2",
        x:"100px",
        y:"100px"    
    },
    {
        name:"Trooper",
        img:"/images/trooper.jpg",
        rarity:1,
        card_txt:"Survive 1 death. ",
        flavor:"Captain Palmer of the 2nd division.",
        card_base:"card_base_1",
        x:"100px",
        y:"100px"    
    },
    {
        name:"Researcher",
        img:"/images/researcher.jpg",
        rarity:1,
        card_txt:"Search for any tech card. ",
        flavor:"Edward Straus. Phd",
        card_base:"card_base_1",
        x:"100px",
        y:"100px"    
    },
    {
        name:"CannonZ ☆☆",
        img:"/images/cannonz.jpg",
        rarity:2,
        card_txt:"All Kaijus -1hp ",
        flavor:"Marvel of modern science",
        card_base:"card_base_3",
        x:"100px",
        y:"100px"    
    }
]
let cards=document.getElementById("deck_2");
let deck=create_deck(card_bases);
let card=deck.length;
cards.innerHTML=card;
cards.onclick=function(){draw_card(deck);};
//Function to form a random deck from a list of cards
function create_deck(cards){
    let deck=[];
    for(let i=0;i<8;i++){
        let num=Math.floor(Math.random()*(cards.length));
        deck.push(cards[num]);
    }
    return deck;
}


function establish_life_points(suffix){
    
}


//add a card to the hand from the deck
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
            console.log(card);
            cards.innerHTML=card;
            let card_border = document.createElement("div")
            let card_base = document.createElement("div")
            let card_image = document.createElement("div")
            let card_txt_bkg = document.createElement("div")
            let classaddon=" "+obj.name;
            card_border.className="card_border"+classaddon;
            card_border.style.top="15%";
            card_border.id=obj.name;
            card_base.className=obj.card_base;	
            card_image.className="card_image"+classaddon;
            card_txt_bkg.className="card_txt_bkg"+classaddon;
            card_txt_bkg.innerHTML=obj.card_txt+obj.flavor;
            card_base.innerHTML=obj.name;
            card_base.appendChild(card_image);
            card_base.appendChild(card_txt_bkg);
            card_border.appendChild(card_base);

            field.appendChild(card_border);
        }
    }
}
