let place = document.getElementById("place")
let diologue = document.getElementById("diologue")
let backpack = document.getElementById("backpack")
let backpack_img = document.getElementById("backpack_img")
let inv_slots = document.getElementsByClassName("inv_slot")
const timer = ms => new Promise(res => setTimeout(res, ms))


class snowparticle {
    constructor (ctx, spawn, velocity, radius) {
        this.ctx = ctx
        this.position = spawn
        this.velocity = velocity
        this.radius = radius
    }
    tick() {
        if (this.position[0] > window.screen.width + this.radius) {
            return false
        }
        if (this.position[1] > window.screen.height + this.radius) {
            return false
        }
        drawCirle(this.ctx, this.position, this.radius)
        this.position[0] += this.velocity[0]
        this.position[1] += this.velocity[1]
        this.velocity[0] += Math.random() * 2 -1
        return true
    }
}


let backpack_open = false
let backpack_slots = [0,0,0,0,0,0]
let held_slot = 0


//init
slotsInit()
setTimeout(openPlace, 1000)
snow()
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
async function snow() {
    const canvas = document.getElementById("snowstorm");
    const ctx = canvas.getContext("2d");
    canvas.width = window.screen.width
    canvas.height = window.screen.height
    let snow = []
    const context = canvas.getContext('2d');
    while (true) {
        await timer(10)
        let random_x = Math.random() * window.screen.width - window.screen.width
        let random_Y = Math.random() * window.screen.height - window.screen.height
        let random_speed_x = Math.random() * 10 + 1
        let random_speed_y = Math.random() * 10 + 1
        context.clearRect(0, 0, canvas.width, canvas.height);
        snow.push(new snowparticle(ctx, [random_x,random_Y], [random_speed_x,random_speed_y], Math.random()*20+10))  
        for (let index = 0; index < snow.length; index++) {
            const element = snow[index];
            if (!element.tick() && index == 0) {
                snow.shift()
                index -= 1
            }
        }
    }
}
function drawCirle(ctx, pos, radius) {
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";
    ctx.stroke();
}