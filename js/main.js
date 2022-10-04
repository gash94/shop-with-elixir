// tablica z obiektami wszytskich mikstur (nazwa,cena)



let potions = JSON.parse(window.localStorage.getItem('list-potions'));
if (potions === null) {
    potions = [
        { name: "Speed potion", price: 460 },
        { name: "Dragon breath", price: 780 },
        { name: "Stone skin", price: 520 },
    ];
}
const atTheOldToad = {
    
    getPotions() {
        //Pokazuje wszytskie mikstury
        const listShop = document.querySelector(".shop")
        listShop.innerHTML = "";
        const createItem = potions.map((potion) => {
            const listItem = document.createElement("li");
            listItem.classList.add("item");
            listItem.innerHTML = `Nazwa: "${potion.name}" Cena: ${potion.price}`;
            
            return listItem;
            
        });
        listShop.append(...createItem);
        window.localStorage.setItem('list-potions', JSON.stringify(potions))   
    },

    addPotion(addNameInData, addPriceInData) {
        //Dodaje miksture do tablicy jesli nie ma, jesli jest zwraca komunikat

        for (const item of potions) {
            if (item.name === addNameInData) {
                return alert(
                    `Błąd! Eliksir ${addNameInData} jest już w Twoim inwentarzu!`
                );
            }
        }
        potions.push({ name: addNameInData, price: addPriceInData });
        this.getPotions();
        return alert(
            `Eliksir "${addNameInData}" z ceną: ${addPriceInData} został dodany do Twojego inwentarza!`
        );
    },
    removePotion(potionName) {
        //usuwa miksture jesli jest w tablicy, jesli nie zwraca komunikat
        const potionIndex = potions.findIndex(
            (object) => object.name === potionName
        );
       
        if (potionIndex === -1) {
            return alert(`Eliksiru "${potionName}" nie ma w Twoim inwentarzu!`);
        } else {
            potions.splice(potionIndex, 1);
            this.getPotions();
            return alert(
                `Eliksir "${potionName}" został usunięty z Twojego inwentarza!`
            );
        }
    },
    updatePotionName(oldName, newName) {
        //zmienia nazwe mixtury jesli jest w tablicy jesli nie zwraca komunikat
        const potionIndex = potions.findIndex(
            (object) => object.name === oldName
        );

        if (potionIndex === -1) {
            return alert(`Eliksiru "${oldName}" nie ma w Twoim inwentarzu!`);
        }
        potions[potionIndex].name = newName;
        this.getPotions();
        return alert(`Eliksir "${oldName}" zmienił nazwę na "${newName}"`);
    },
};

const control = document.querySelector(".controls");

const btnGet = document.getElementById("getpotions");
const btnAdd = document.getElementById("addpotions");
const btnRemove = document.getElementById("removepotions");
const btnUpdate = document.getElementById("updatepotions");

btnGet.addEventListener("click", atTheOldToad.getPotions);

btnAdd.addEventListener("click", () => {
    const addNameIn = document.getElementById("addname-input");
    const addPriceIn = document.getElementById("addprice-input");
    
    console.log(addPriceIn.value)
    if (addNameIn.value === "" || addPriceIn.value === "") {
        return alert("Błąd! Uzupełnij wszytskie pola!");
    }

    atTheOldToad.addPotion(addNameIn.value, addPriceIn.value);

    addNameIn.value = "";
    addPriceIn.value = "";
});

btnRemove.addEventListener("click", () => {
    const addRemoveIn = document.getElementById("removename-input");
    if (addRemoveIn.value === "") {
        return alert("Błąd! Uzupełnij pole!");
    }
    atTheOldToad.removePotion(addRemoveIn.value);
    addRemoveIn.value = "";
});

btnUpdate.addEventListener("click", () => {
    const oldNameIn = document.getElementById("oldname-input");
    const newNameIn = document.getElementById("newname-input");
    if (oldNameIn.value === "" || newNameIn.value === "") {
        return alert("Błąd! Uzupełnij wszytskie pola!");
    }
    atTheOldToad.updatePotionName(oldNameIn.value, newNameIn.value);
    oldNameIn.value = "";
    newNameIn.value = "";
});
