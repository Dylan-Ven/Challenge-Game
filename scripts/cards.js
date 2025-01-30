class FoodDisplay {
    constructor(containerId) {
        this.food = ["Cherry", "Pineapple", "Strawberry", "Watermelon", "Avocado", "Banana"];
        this.display = document.getElementById(containerId);
        this.firstSelection = null;
        this.secondSelection = null;
        this.lockBoard = false;
        this.matchesFound = 0; // Track matched pairs
        this.totalPairs = this.food.length; // Number of pairs to match
    }

    createFood(buttonId, number) {
        const button = document.createElement("button");
        button.className = "Cards-btn";
        button.id = buttonId;
        button.dataset.foodIndex = number;

        const img = document.createElement("img");
        img.className = "Cards";
        img.src = "img/Questionmark.svg"; 
        img.alt = "Hidden Food";

        button.appendChild(img);
        this.display.appendChild(button);

        button.addEventListener("click", () => this.selectFood(button));
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    cardsCreating() {
        let foodfulling = Array(this.food.length).fill(0);
        let totalItems = this.food.length * 2;
        let addedItems = 0;

        while (addedItems < totalItems) {
            let number = this.getRandomInt(this.food.length);
            let attempts = 0;
            
            while (foodfulling[number] >= 2 && attempts < this.food.length) {
                number = (number + 1) % this.food.length;
                attempts++;
            }
            
            if (foodfulling[number] < 2) {
                const buttonId = `foodIcon${addedItems}`;
                this.createFood(buttonId, number);
                foodfulling[number]++;
                addedItems++;
            }
        }
    }

    selectFood(button) {
        if (this.lockBoard) {
            Swal.fire({
                icon: "warning",
                title: "Slow down!",
                text: "Wait before selecting a new card!",
            });
            return;
        }
        
        if (button === this.firstSelection) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You already selected this card!",
            });
            return;
        }

        const number = button.dataset.foodIndex;
        const img = button.querySelector("img");
        img.src = `img/${this.food[number]}.svg`;
        img.alt = this.food[number];

        if (!this.firstSelection) {
            this.firstSelection = button;
        } else {
            this.secondSelection = button;
            this.checkMatch();
        }
    }

    checkMatch() {
        const firstFood = this.firstSelection.dataset.foodIndex;
        const secondFood = this.secondSelection.dataset.foodIndex;

        if (firstFood === secondFood) {
            this.matchesFound++;
            Swal.fire({
                icon: "success",
                title: "Great!",
                text: "You found a match!",
            });
            this.resetSelections();

            if (this.matchesFound === this.totalPairs) {
                Swal.fire({
                    icon: "success",
                    title: "Congratulations!",
                    text: "You matched all the cards!",
                });
            }
        } else {
            this.lockBoard = true;
            setTimeout(() => {
                this.firstSelection.querySelector("img").src = "img/Questionmark.svg";
                this.secondSelection.querySelector("img").src = "img/Questionmark.svg";
                Swal.fire({
                    icon: "error",
                    title: "Try Again!",
                    text: "The cards didn't match.",
                });
                this.resetSelections();
            }, 1000);
        }
    }

    resetSelections() {
        this.firstSelection = null;
        this.secondSelection = null;
        this.lockBoard = false;
    }
}

// Create an instance of FoodDisplay
const foodDisplay = new FoodDisplay("food-container");
foodDisplay.cardsCreating();
