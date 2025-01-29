class FoodDisplay {
    constructor(containerId) {
        this.food = ["banaan", "appel", "tomaat", "Vlees", "Brood", "Kaas"];
        this.display = document.getElementById(containerId);
    }

    createFood(content) {
        this.display.innerHTML += content;
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
                this.createFood("<h1>" + this.food[number] + "</h1>");
                foodfulling[number]++;
                addedItems++;
            }
        }
    }
}
