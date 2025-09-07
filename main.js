let place = document.getElementById("place")
let diologue = document.getElementById("diologue")
let backpack = document.getElementById("backpack")
let backpack_img = document.getElementById("backpack_img")
let inv_slots = document.getElementsByClassName("inv_slot")

let backpack_open = false
let backpack_slots = [0,0,0,0,0,0]
let held_slot = 0

//init
slotsInit()
setTimeout(openPlace, 1000)
openDiologue()
backpack.addEventListener('click', processBackpack)


//Place
function closePlace() {
    place.classList.remove("place--open")
    place.classList.add("place--closed")
}
function openPlace() {
    place.classList.add("place--open")
    place.classList.remove("place--closed")
    setTimeout(closePlace, 1000 + 10000); //1000 is for opening anim ;;))
}
//Diologue
function closeDiologue() {
    diologue.classList.remove("diologue--open")
    diologue.classList.add("diologue--closed")
    diologue.removeEventListener('click', closeDiologue);
    setTimeout(openDiologue, 1500);
}
function processDiologue() {
    closeDiologue()
}
function openDiologue() {
    diologue.classList.add("diologue--open")
    diologue.classList.remove("diologue--closed")
    diologue.addEventListener('click', processDiologue);
}
//Inventory
function slotsInit() {
    let id = 0
    for (const element of inv_slots) {
        element.classList.add("cl" + id)
        id += 1
    }
}
function processBackpack() {
    backpack_open = !backpack_open
    if (backpack_open){
        backpack.classList.add("backpack--open")
        backpack.classList.remove("backpack--closed")
        backpack.addEventListener("transitionend", backpackOpen)
    } else {
        backpack.classList.remove("backpack--open")
        backpack.classList.add("backpack--closed")
        backpack.removeEventListener("transitionend", backpackOpen)
        backpackClose()
    }
}
function backpackOpen() {
    for (const element of inv_slots) {
        element.hidden = false
        element.addEventListener("click", slotClicked)
    }
    backpack.removeEventListener("transitionend", backpackOpen)
    backpack_img.src = "../xcf/prototype1_backpack_open.png"  
}
function backpackClose () {
    for (const element of inv_slots) {
        element.hidden = true
        element.removeEventListener("click", slotClicked)
    }
    backpack_img.src = "../xcf/prototype1_backpack_closed.png"  
}
function slotClicked () {
    held_slot = this.classList[1].slice(2);
}
//Snowstorm