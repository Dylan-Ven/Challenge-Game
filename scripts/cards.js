class FoodDisplay {
    constructor(containerId) {
        this.food = ["Cherry", "Pineapple", "Strawberry", "Watermelon", "Avocado", "Banana"];
        this.foodTips = [
            "Kersen? Tof voor een siroop of een heerlijke smoothie – zoet en fris!",
            "Ananas is heerlijk in een tropische smoothie, een frisse salsa, of je maakt er een zoete ananascompote van. En natuurlijk mag je het ook gewoon lekker vers eten!",
            "Aardbeien zijn perfect voor een zoete smoothie, een frisse salsa, of een aardbeienjam. Je kunt ze ook in een lekker toetje verwerken!",
            "Met een watermeloen maak je verfrissend sap, een zomerse salade, of bevries het in lekkere ijsblokjes!",
            "Een zachte avocado is ideaal voor guacamole, een romige smoothie, of je smeert het lekker op een toast.",
            "Bananen? Maak er bananenbrood, muffins, pannenkoeken, of een lekkere smoothie van – zo veelzijdig!"
        ];
        this.display = document.getElementById(containerId);
        this.firstSelection = null;
        this.secondSelection = null;
        this.matchesFound = 0; // Track matched pairs
        this.totalPairs = this.food.length; // Number of pairs to match

        document.cookie = "points=0";
    }

     getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    updatePoints(amount) {

        document.cookie = "points="+(parseInt(this.getCookie("points"))+amount);
        document.getElementById("pointsDisplay").textContent = this.getCookie("points");

    }
    
    // Create food buttons and add event listeners
    createFood(buttonId, number) {
        const button = document.createElement("button");
        button.className = "Cards-btn";
        button.id = buttonId;
        button.dataset.foodIndex = number;
        // Create image element
        const img = document.createElement("img");
        img.className = "Cards";
        img.src = "img/Questionmark.svg";
        img.alt = "Hidden Food";
        // Add image to button
        button.appendChild(img);
        this.display.appendChild(button);
        // Add event listener to button
        button.addEventListener("click", () => this.selectFood(button));
    }

    // Random number generator
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    unlockBoard(string = "auto") {
        this.display.querySelectorAll(".Cards-btn").forEach((button) => {
            button.style.pointerEvents = string;
        });
    }

    // Create cards
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

    // Select food if you click on it
    selectFood(button) {
        //----------------------------------------
        if (button === this.firstSelection) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You already selected this card!",
            });
            return;
        }
        if (!this.firstSelection) {
            this.firstSelection = button;
        } else {
            this.unlockBoard("none");

            this.secondSelection = button;
            this.checkMatch();
        }
        //----------------------------------------

        // Image of the food
        //----------------------------------------
        const number = button.dataset.foodIndex;
        const img = button.querySelector("img");
        // Animate the cards (open)
        img.classList.add("flip-animation");
        setTimeout(() => {
            img.classList.remove("flip-animation");
            img.src = `img/${this.food[number]}.svg`;
            img.alt = this.food[number];
        }, 250);
        //----------------------------------------

    }

    checkMatch() {
        const firstFood = this.firstSelection.dataset.foodIndex;
        const secondFood = this.secondSelection.dataset.foodIndex;

        if (firstFood === secondFood) {
            this.firstSelection.disabled = true;
            this.secondSelection.disabled = true;
            this.matchesFound++;

            Swal.fire({
                icon: "info",
                title: "Tip",
                text: this.foodTips[firstFood],
            });

            this.updatePoints(1);

            this.resetSelections();

            if (this.matchesFound === this.totalPairs) {
                Swal.fire({
                    icon: "success",
                    title: "Goed gedaan!",
                    text: `Laatste tip: ${this.foodTips[firstFood]}`,
                    willClose: () => {
                        document.cookie = "points=0";
                        location.reload();
                    },
                });
                this.updatePoints(5);
            }
            this.unlockBoard("auto");
        } else {
            setTimeout(() => {
                // Animate the cards (close)
                const firstSelectAnimate = this.firstSelection.querySelector("img");
                const secondSelectAnimate = this.secondSelection.querySelector("img");
                firstSelectAnimate.classList.add("flip-animation");
                secondSelectAnimate.classList.add("flip-animation");

                setTimeout(() => {
                    firstSelectAnimate.classList.remove("flip-animation");
                    secondSelectAnimate.classList.remove("flip-animation");
                    firstSelectAnimate.src = "img/Questionmark.svg";
                    secondSelectAnimate.src = "img/Questionmark.svg";
                    this.resetSelections();
                    this.unlockBoard("auto");
                }, 250);

            }, 500);
        }
    }

    resetSelections() {
        this.firstSelection = null;
        this.secondSelection = null;
    }
}
