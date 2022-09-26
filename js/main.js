// tablica z obiektami wszytskich mikstur (nazwa,cena)
const potions = [
    { name: "Speed potion", price: 460 },
    { name: "Dragon breath", price: 780 },
    { name: "Stone skin", price: 520 },
];
const atTheOldToad = {
    getPotions() {
        //Pokazuje wszytskie mikstury
        const listShop = document.querySelector(".shop");
        listShop.innerHTML = "";
        const createItem = potions.map((potion) => {
            const listItem = document.createElement("li");
            listItem.classList.add("item");
            listItem.innerHTML = `Nazwa: ${potion.name} Cena: ${potion.price}`;
            return listItem;
        });
        listShop.append(...createItem);
    },

    addPotion(newPotion) {
        //Dodaje miksture do tablicy jesli nie ma, jesli jest zwraca komunikat
        for (const item of potions) {
            if (item.name === newPotion.name) {
                return alert (`Błąd! Eliksir ${newPotion.name} jest już w Twoim inwentarzu!`);
            }
        }
        potions.push(newPotion);
            return alert (`Eliksir ${newPotion.name} został dodany do Twojego inwentarza!`)
    },
    removePotion(potionName) {
        //usuwa miksture jesli jest w tablicy, jesli nie zwraca komunikat
        const potionIndex = potions.findIndex(
            (object) => object.name === potionName
        );
        if (potionIndex === -1) {
            return `Potion ${potionName.name} is not in inventory!`;
        } else {
            potions.splice(potionIndex, 1);
        }
    },
    updatePotionName(oldName, newName) {
        //zmienia nazwe mixtury jesli jest w tablicy jesli nie zwraca komunikat
        const potionIndex = potions.findIndex(
            (object) => object.name === oldName
        );
        if (potionIndex === -1) {
            return `Potion ${oldName} is not in inventory!`;
        }
        potions[potionIndex].name = newName;
        return `Potion ${oldName} has been change name to ${newName}`;
    },
};
// atTheOldToad.addPotion({ name: "Invisibility", price: 620 })
// atTheOldToad.updatePotionName("Stone skin", "Invulnerability potion")
// atTheOldToad.removePotion("Dragon breath")
// atTheOldToad.getPotions()

const control = document.querySelector(".controls");
// const btnGet = document.getElementById("getpotions");
// const btnAdd = document.getElementById("addpotions");
// const btnRemove = document.getElementById("removepotions");
// const btnUpdate = document.getElementById("updatepotions");

control.addEventListener("click", selectButton);

function selectButton(event) {
    if (event.target.nodeName !== "BUTTON") {
        return;
    }
    const selectedBtn = event.target.id;   
    console.log(selectedBtn) 
     if (selectedBtn === "getpotions"){
        atTheOldToad.getPotions()
        return;
     }
     if (selectedBtn === "addpotions"){
        atTheOldToad.addPotion({ name: "Invisibility", price: 620 })
        return;
     }
     if (selectedBtn === "removepotions"){
        atTheOldToad.removePotion("Dragon breath")
        return;
     }

}
