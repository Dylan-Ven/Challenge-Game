/// <reference path="cards.js" />

const Cards = new FoodDisplay("container");
Cards.cardsCreating();



// Het food raden
let countFoodRaad = Array(Cards.food.length).fill(0); // [0,0,0,0,0,0]

let previousFood = null;
let previousDisabled = null;

function selectFood(nubmer,id){

    let button = document.getElementById(id);

    if(previousFood===null || nubmer === previousFood){
        button.disabled = true;
        previousFood = nubmer;
        countFoodRaad[nubmer]++;
        if(countFoodRaad[nubmer]==2){
            previousFood = null; 
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Word geraadt!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }else{
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Word niet geraadt!",
            showConfirmButton: false,
            timer: 1500
          });

        previousFood = null;

        countFoodRaad.forEach(element => {
            if(element != 2){
                element = 0;
            }
        });
    }
    // document.querySelectorAll("button").forEach(btn => {
    //     let btnId = btn.id;
    //     let btnNumber = parseInt(btn.getAttribute("data-number")); // Получаем номер еды из data-number
    //     if (countFoodRaad[btnNumber] !== 2) {
    //         btn.disabled = false;
    //     }
    // });
}



