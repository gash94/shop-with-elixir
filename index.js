import { Combobox } from "./js/combobox.js";

const save = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
};

const load = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null
            ? undefined
            : JSON.parse(serializedState);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};

export default {
    save,
    load,
};

// tablica z obiektami wszytskich mikstur (nazwa,cena)
let potions = load("list-potions");

console.log(potions);
if (potions === null || potions === undefined) {
    potions = [
        { name: "Speed potion", price: 460, random: 7 },
        { name: "Dragon breath", price: 780, random: 6 },
        { name: "Stone skin", price: 520, random: 8 },
    ];
}



// init combo
const comboEl = document.querySelector(".js-combobox");
let options = potions.map((obj) => obj.name);
const comboComponent = new Combobox(comboEl, options);
comboComponent.init();

export {options}



const listShop = document.querySelector(".shop");

const atTheOldToad = {
    refresh() {
        const comboinit = document.getElementById("listbox2");
        comboinit.style.display = "none";
        comboinit.offsetHeight;
    
        // usuniecie wszytskiego i nowy init dla selecta
        comboinit.innerHTML = "";
        const comboEl = document.querySelector(".js-combobox");
        var old_element = document.getElementById("removename-input");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        options = load("list-potions").map((obj) => obj.name);
        const comboComponent = new Combobox(comboEl, options);
        comboComponent.init();
        comboinit.style.display = "";
    },

    createPotion(name, price, pic, animate) {
        const listItem = document.createElement("li");
        listItem.setAttribute("data-id", `${name}`);
        listItem.classList.add("animate__animated");
        listItem.classList.add(`${animate}`);
        listItem.classList.add("shop__item");
        listItem.innerHTML = `<div class="card text-bg-light mb-3" style="width: 18rem;">
                  <img src="images/potion${pic}.png" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">Nazwa: ${name}</h5>
                    <p class="card-text">Cena: ${price}</p>
                     <a href="#" class="btn btn-primary">Kup</a></br>
                  </div>
                </div>`;

        return listItem;
    },

    getPotions() {
        //Wyświetla wszystkie mikstury
        listShop.innerHTML = "";
        const createItem = potions.map((potion) =>
            this.createPotion(
                potion.name,
                potion.price,
                potion.random,
                "animate__bounceInUp"
            )
        );

        listShop.prepend(...createItem);
        save("list-potions", potions);

    },

    addPotion(addNameInData, addPriceInData) {
        //Dodaje miksture do tablicy jesli nie ma, jesli jest zwraca komunikat
        for (const item of potions) {
            if (item.name === addNameInData) {
                return Notiflix.Notify.failure(
                    `Błąd! Eliksir ${addNameInData} jest już w Twoim inwentarzu!`
                );
            }
        }
        //losowy obrazek
        const randomPic = Math.floor(Math.random() * 10 + 1);
        //dodanie do tablicy
        potions.push({
            name: addNameInData,
            price: addPriceInData,
            random: randomPic,
        });

        listShop.prepend(
            this.createPotion(
                addNameInData,
                addPriceInData,
                randomPic,
                "animate__bounceIn"
            )
        );
        save("list-potions", potions);
        this.refresh()
        return Notiflix.Notify.success(
            `Eliksir "${addNameInData}" z ceną: ${addPriceInData} został dodany do Twojego inwentarza!`
        );
    },

    removePotion(potionName) {
        //usuwa miksture jesli jest w tablicy, jesli nie zwraca komunikat
        const potionIndex = potions.findIndex(
            (object) => object.name === potionName
        );
        if (potionIndex === -1) {
            return Notiflix.Notify.failure(
                `Eliksiru "${potionName}" nie ma w Twoim inwentarzu!`
            );
        } else {
            potions.splice(potionIndex, 1);

            function removePot(potion, animate) {
                const listItem = document.querySelector(
                    `[data-id="${potion}"]`
                );
                listItem.classList.add(`${animate}`);
                setTimeout(() => {
                    listItem.remove();
                }, 810);
            }

            removePot(potionName, "animate__zoomOut");
            save("list-potions", potions);
            this.refresh()
            return Notiflix.Notify.success(
                `Eliksir "${potionName}" został usunięty z Twojego inwentarza!`
            );
        }
    },
    updatePotionName(oldName, newName) {
        //zmienia nazwe mixtury jesli jest w tablicy jesli nie zwraca komunikat
        if (oldName === newName) {
            return Notiflix.Notify.warning(
                `Nazwa eliksiru nie może być taka sama!`
            );
        }
        const potionIndex = potions.findIndex(
            (object) => object.name === oldName
        );

        if (potionIndex === -1) {
            return Notiflix.Notify.failure(
                `Eliksiru "${oldName}" nie ma w Twoim inwentarzu!`
            );
        }
        potions[potionIndex].name = newName;
        function updateNamePot(oldName, newName) {
            const listItem = document.querySelector(
                `[data-id="${oldName}"] h5`
            );
            listItem.classList.add("animate__animated");
            listItem.classList.add("animate__flash");
            listItem.innerText = `Nazwa: ${newName}`;
        }
        updateNamePot(oldName, newName);
        save("list-potions", potions);
        this.refresh()
        return Notiflix.Notify.success(
            `Eliksir "${oldName}" zmienił nazwę na "${newName}"`
        );
    },
};

const btnAdd = document.getElementById("addpotions");
const btnRemove = document.getElementById("removepotions");
const btnUpdate = document.getElementById("updatepotions");

btnAdd.addEventListener("click", () => {
    const addNameIn = document.getElementById("addname-input");
    const addPriceIn = document.getElementById("addprice-input");
    console.log(addPriceIn.value);
    if (addNameIn.value === "" || addPriceIn.value === "") {
        return Notiflix.Notify.failure("Błąd! Uzupełnij wszystkie pola!");
    }

    atTheOldToad.addPotion(addNameIn.value.trim(), Number(addPriceIn.value));
    addNameIn.value = "";
    addPriceIn.value = "";
});

btnRemove.addEventListener("click", () => {
    const addRemoveIn = document.getElementById("removename-input");
    if (addRemoveIn.value === "") {
        return Notiflix.Notify.failure("Błąd! Uzupełnij pole!");
    }
    atTheOldToad.removePotion(addRemoveIn.value.trim());
    addRemoveIn.value = "";
});

btnUpdate.addEventListener("click", () => {
    const oldNameIn = document.getElementById("oldname-input");
    const newNameIn = document.getElementById("newname-input");
    if (oldNameIn.value === "" || newNameIn.value === "") {
        return Notiflix.Notify.failure("Błąd! Uzupełnij wszystkie pola!");
    }
    atTheOldToad.updatePotionName(
        oldNameIn.value.trim(),
        newNameIn.value.trim()
    );
    oldNameIn.value = "";
    newNameIn.value = "";
});

atTheOldToad.getPotions();
