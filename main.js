let place = document.getElementById("place")
let diologue = document.getElementById("diologue")
let backpack = document.getElementById("backpack")
let backpack_img = document.getElementById("backpack_img")
let inv_slots = document.getElementsByClassName("inv_slot")
var snowing = true
var scene = "opening"
var tranisition_screen = document.getElementById("tranistion")
var backtrack = document.getElementById("backtrack")
var lookaround = document.getElementById("lookaround")
var scene_timeout_id = null
var mainScene_img = document.getElementById("mainScene")
var body = document.body
const timer = ms => new Promise(res => setTimeout(res, ms))
const img_assets_1 = new Image(192, 128)
img_assets_1.src = "xcf/V1_SnowAssets_1.png"
var seitchingscenes = false
let interactables = {
    "outside_door" : document.getElementsByClassName("mainScene__center__center--doorOutside")[0],
    "ladder_outside" : document.getElementsByClassName("mainScene__center__center--ladderOutside")[0],
    "snow_mobile" : document.getElementsByClassName("mainScene__center__center--snowMobile")[0],
    "guid_outside" : document.getElementsByClassName("mainScene__center__center--guid_outside")[0],
    "shop_front" : document.getElementsByClassName("mainScene__center__center--shop_shop_front")[0],
}
var audio = new Audio('music/C0ZYE5TC0LD.ogg');

audio.addEventListener("ended", () => {audio.play()})
class snowparticle {
    constructor (ctx, spawn, velocity, radius) {
        this.ctx = ctx
        this.position = spawn
        this.velocity = velocity
        this.radius = radius
        this.stage = 0
        this.progressTimer = Math.random() * 30 + 10
        this.sizeVel = Math.random() * 0.01
        this.acelar = Math.random() * 0.1 - 0.05
    }
    tick() {
        if (this.position[0] > 640 + this.radius) {
            return false
        }
        if (this.position[1] > window.innerHeight / window.innerWidth * 1000 + this.radius) {
            return false
        }
        this.progressTimer -= 1
        if (this.progressTimer <= 0) {
            this.progressTimer = 20
            switch (this.stage) {
                case 0:
                    this.stage = 1
                    break;
                case 1:
                    this.stage = 2
                    break;
                case 2:
                    this.stage = 3
                    break;
                case 3:
                    this.stage = Math.floor(Math.random()*4+3) 
                    break;
                default:
                    this.stage = Math.floor(Math.random()*4+3) 
                    break;
            }
        }
        drawSnowball(this.ctx, this.position, this.radius , this.stage + 5)
        this.position[0] += this.velocity[0]
        this.position[1] += this.velocity[1]
        this.velocity[0] += this.acelar
        this.radius += this.sizeVel
        return true
    }
}


let backpack_open = false
let backpack_slots = [0,0,0,0,0,0]
let held_slot = 0

//init
snow()
slotsInit()
// startGame()
//starts main functional manager
// window.addEventListener("click", startGame);
function startGame() {
    for (const [key, value] of Object.entries(interactables)) {
        value.hidden = true
    }
    body.style.overflow = "hidden"
    backpack.addEventListener('click', processBackpack)
    backtrack.addEventListener('click', backtrack_func)
    lookaround.addEventListener('click', lookarounb_func)
    window.removeEventListener("click", startGame)
    audio.play()
    transition()
    switchScene("opening")
    window.scrollTo(0,0)
    setTimeout(() => {
        window.scrollTo(0,0)
        document.getElementsByClassName("startPopup")[0].classList.add("startPopup--hidden")
        for (const element of document.getElementsByClassName("startPopup")[0].children) {
            element.classList.add("startPopup--hidden")
        }
        document.getElementsByClassName("startPopup")[1].classList.add("startPopup--hidden")
        for (const element of document.getElementsByClassName("startLinks")) {
            element.classList.add("startPopup--hidden")
        }
    }, 1000);
}
//Scene manager
function switchScene(scene_to_load) {
    //loads next one riiiiight up ::DD
    scene = scene_to_load
    let scene_name
    let scene_description
    switch (scene) {
        case "opening":
            //sets scene
            mainScene_img.src = "xcf/V1_Town_shop_view.png"
            body.style.backgroundImage = "url('xcf/V1_Town_shop_view.png')"
            scene_name = "The Best of All Possible Snowdrifts"
            scene_description = "it is forever snowing in here so grab some hot choclet and enjoy the view :DD"
            setTimeout(openPlace, 1000, scene_name, scene_description)
            //sets snowoe :DD
            snowing = true
            //shows all assets
            showScene()
            //sets up all events (like interactables)
            interactables["outside_door"].addEventListener("click", interactionLisener_switch.bind(null, "shop_shopkeep"))
            interactables["ladder_outside"].addEventListener("click", interactionLisener_switch.bind(null, "tower"))
            break;
        case "shop_shopkeep":
            //sets scene
            mainScene_img.src = "xcf/v1_shop_shop_back.png"
            body.style.backgroundImage = "url('xcf/v1_shop_shop_back.png')"
            scene_name = "The Shop Keep"
            scene_description = "As you enter, you can notice how warm it is in here :))"
            setTimeout(openPlace, 1000, scene_name, scene_description)
            //sets snowoe :DD
            snowing = false
            //shows all assets
            showScene()
            break;
        case "tower":
            //sets scene
            mainScene_img.src = "xcf/v1_tower_view.png"
            body.style.backgroundImage = "url('xcf/v1_tower_view.png')"
            scene_name = "The great view"
            scene_description = "Whow, from up here you can see till The Great Frozen Wall (scene 73) :OO"
            setTimeout(openPlace, 1000, scene_name, scene_description)
            //sets snowoe :DD
            snowing = false
            //shows all assets
            showScene()
            break;
        case "shop_view":
            //sets scene
            mainScene_img.src = "xcf/v1_shop_view.png"
            body.style.backgroundImage = "url('xcf/v1_shop_view.png')"
            scene_name = "Shop window"
            scene_description = "It's pretty chill in shop :))"
            setTimeout(openPlace, 1000, scene_name, scene_description)
            //sets snowoe :DD
            snowing = false
            //shows all assets
            showScene()
            break;
        default:
            break;
    }
    interactables
}
function disableScene() {
    //deloads previous scene
    switch (scene) {
        case "opening":
            interactables["outside_door"].removeEventListener("click", interactionLisener_switch)
            interactables["ladder_outside"].removeEventListener("click", interactionLisener_switch)
            break;
        default:
            break;
    }
}
function showScene() {
    //shows new assets
    switch (scene) {
        case "opening":
            interactables["outside_door"].hidden = false
            interactables["ladder_outside"].hidden = false
            interactables["snow_mobile"].hidden = false
            interactables["guid_outside"].hidden = false
            //disables intractables
            break;
        case "shop_shopkeep":
            interactables["shop_front"].hidden = false
            break;
        default:
            break;
    }
}
function hideScene() {
    //hides prev assets
    switch (scene) {
        case "opening":
            interactables["outside_door"].hidden = true
            interactables["ladder_outside"].hidden = true
            interactables["snow_mobile"].hidden = true
            interactables["guid_outside"].hidden = true
            //disables intractables
            break;
        case "shop_shopkeep":
            interactables["shop_front"].hidden = true
            break;
        default:
            break;
    }
}
//Backtrack
function backtrack_func() {
    if (seitchingscenes) {
        return
    }
    
    switch (scene) {
        case "opening":
            disableScene()
            transition()
            closePlace()
            setTimeout(() => {
                hideScene()
                switchScene("Cave")
            }, 1000);
            break;
        case "shop_shopkeep":
            disableScene()
            transition()
            closePlace()
            setTimeout(() => {
                hideScene()
                switchScene("opening")
            }, 1000);
            break;
        case "tower":
            disableScene()
            transition()
            closePlace()
            setTimeout(() => {
                hideScene()
                switchScene("opening")
            }, 1000);
            break;
        case "shop_view":
            disableScene()
            transition()
            closePlace()
            setTimeout(() => {
                hideScene()
                switchScene("opening")
            }, 1000);
            break;
        default:
            break;
    }
}
//Look around
function lookarounb_func() {
    if (seitchingscenes) {
        return
    }
    
    switch (scene) {
        case "shop_shopkeep":
            disableScene()
            transition()
            closePlace()
            setTimeout(() => {
                hideScene()
                switchScene("shop_view")
            }, 1000);
            break;
        case "shop_view":
            disableScene()
            transition()
            closePlace()
            setTimeout(() => {
                hideScene()
                switchScene("shop_shopkeep")
            }, 1000);
            break;
        default:
            break;
    }
}
//Transition
async function transition() {
    seitchingscenes = true
    tranisition_screen.classList.remove("tranistion--hidden")
    setTimeout(() => {
        tranisition_screen.classList.add("tranistion--hidden")
        setTimeout(() => {seitchingscenes = false}, 1000);
    }, 1000);
}
//Interaction listeners
function interactionLisener_switch(nextScene) {
    if (seitchingscenes) {return}
    disableScene()
    transition()
    closePlace()
    setTimeout(() => {
        hideScene()
        switchScene(nextScene)
    }, 1000);
} 
//Place
function closePlace() {
    clearTimeout(scene_timeout_id)
    place.classList.remove("place--open")
    place.classList.add("place--closed")
}
function openPlace(placeName, placeDescription) {
    place.classList.remove("place--closed")
    place.classList.add("place--open")
    
    place.getElementsByTagName("h1")[0].textContent = placeName
    place.getElementsByTagName("p")[0].textContent = placeDescription
    scene_timeout_id = setTimeout(closePlace, 1000 + 10000); //1000 is for opening anim ;;))
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
    let snowball = []
    let timer2 = 0
    let inx = 0
    while (true) {
        if (!snowing){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            await timer(100)
            continue
        }
        await timer(30)
        timer2 += 1
        canvas.height = window.innerHeight / window.innerWidth * 1000
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (timer2 % 2 == 0) {
        }
        // canvas.width = window.screen.width / window.screen.height * 1000
        let repeat = 500 - snowball.length
        if (500 - snowball.length > 10) {repeat = 10}
        for (let index = 0; index < repeat; index++) {
            // let random_x = Math.random() * 640
            // let random_Y = Math.random() * window.innerHeight / window.innerWidth * 1000
            let random_speed_x = Math.random() * 20 + 1
            let random_speed_y = Math.random() * 20 + 8
            let random_x = 0
            let random_Y = 0
            let random_rad = Math.random()*0.5+0.5
            if (Math.floor(Math.random()*2) == 0) {
                random_x = -640 - random_rad
                random_Y = Math.random() * (window.innerHeight / window.innerWidth * 1000) - (window.innerHeight / window.innerWidth * 1000)
            } else {
                random_x = Math.random() * 640 - 640
                random_Y = -(window.innerHeight / window.innerWidth * 1000) - random_rad
            }
            snowball.unshift(new snowparticle(ctx, [random_x,random_Y], [random_speed_x,random_speed_y], Math.random()*0.1+0.2))  
        }
        for (let index = snowball.length -1; index >= 0; index--) {
            const element = snowball[index];
            if (!element.tick() && index == snowball.length - 1) {
                snowball.pop()
            }
        }
    }
}
function drawSnowball(ctx, pos, radius, stage) {
    var temp = getAsset(0,stage)
    ctx.imageSmoothingEnabled = false;
    ctx.globalAlpha = 1-((stage - 3) / 10);
    ctx.drawImage(img_assets_1, temp[0], temp[1], temp[2], temp[3], pos[0], pos[1], 64 * radius, 64 * radius)
    // ctx.drawImage(img_assets_1, temp[0], temp[1], temp[2], temp[3], Math.round(pos[0]/5)*5, Math.round(pos[1]/10)*10, 64 * radius, 64 * radius)
    // ctx.beginPath();
    // ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI);
    // ctx.fillStyle = "white";
    // ctx.fill();
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = "gray";
    // ctx.stroke();
}
function getAsset(assetNum, id) {
    switch (assetNum) {
        case 0:
            switch (id) {
                case 0: //snow pile
                    return [0,0,64,64]
                case 1:
                    return [64,0,64,64]
                case 2:
                    return [128,0,64,64]
                case 3:
                    return [192,0,64,64]
                case 4:
                    return [0,64,64,64]
                case 5: // snow ball start
                    return [64,64,32,32]
                case 6:
                    return [96,64,32,32]
                case 7:
                    return [128,64,32,32]
                case 8:
                    return [160,64,32,32]
                case 9: // snow ball variations
                    return [64,96,32,32]
                case 10:
                    return [96,96,32,32]
                case 11:
                    return [128,96,32,32]
                case 12:
                    return [160,96,32,32]
                default:
                    break;
            }
            break;
    
        default:
            break;
    }
}
