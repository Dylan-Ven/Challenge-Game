/// <reference path="cards.js" />

const Cards = new FoodDisplay("container");
Cards.cardsCreating();



// Het food raden
let countFoodRaad = Array(Cards.food.length).fill(0); // [0,0,0,0,0,0]

let previousFood = null; 

function selectFood(nubmer){

    if(previousFood===null || nubmer === previousFood){
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
}



