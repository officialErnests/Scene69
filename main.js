let place = document.getElementById("popup_place")
let diologue = document.getElementById("popup_diologue")

function closePlace() {
    place.classList.remove("popup__place--open")
    place.classList.add("popup__place--closed")
}
function openPlace() {
    place.classList.add("popup__place--open")
    place.classList.remove("popup__place--closed")
    setTimeout(closePlace, 1000 + 10000); //1000 is for opening anim ;;))
}
function closeDiologue() {
    diologue.classList.remove("popup__diologue--open")
    diologue.classList.add("popup__diologue--closed")
    diologue.removeEventListener('click', closeDiologue);
    setTimeout(openDiologue, 1500);
}
function processDiologue() {
    closeDiologue()
}
function openDiologue() {
    diologue.classList.add("popup__diologue--open")
    diologue.classList.remove("popup__diologue--closed")
    diologue.addEventListener('click', processDiologue);
}

setTimeout(openDiologue, 1000);
setTimeout(openPlace, 1000);