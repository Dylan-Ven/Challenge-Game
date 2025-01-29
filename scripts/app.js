/// <reference path="cards.js" />

const Cards = new FoodDisplay("container");
Cards.cardsCreating();



// Het food raden
let countFoodRaad = Array(Cards.food.length).fill(0); // [0,0,0,0,0,0]

let previousFood = null;
let previousDisabled = null;

function selectFood(nubmer,id){

    if(previousFood===null || nubmer === previousFood){
        document.getElementById(id).disabled = true;
        previousDisabled = id;
        previousFood = nubmer;
        countFoodRaad[nubmer]++;
        if(countFoodRaad[nubmer]==2){
            previousDisabled = null;
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
          countFoodRaad[previousFood] = 0;
          previousFood = null;
          document.getElementById(previousDisabled).disabled = false;
          previousDisabled = null;

        
    }
    console.log(countFoodRaad);
}



