let place = document.getElementById("place")
let diologue = document.getElementById("diologue")
let diologue_img = document.getElementById("diologue_img")
let diologue_name = document.getElementById("diologue_name")
let diologue_text = document.getElementById("diologue_text")
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
var dialogue_button_1 = document.getElementById("dialogue_button_1")
var dialogue_button_2 = document.getElementById("dialogue_button_2")
var dialogue_button_3 = document.getElementById("dialogue_button_3")
var holdup = document.getElementById("holdup")
var holdup_h2 = document.getElementById("holdup_h2")
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
    "shopkeep" : document.getElementsByClassName("mainScene__center__center--shopkeep")[0],
}
class snowpile {
    constructor(stage = 0, pos = [0,0], snowpile) {
        
        this.maxStage = stage
        this.stage = stage
        this.debounce = false
        this.pos = pos
        this.snowpile = snowpile
    }
    place() {
        switch (this.stage) {
            case 0:
                this.snowpile.style.transform = "translateX("+(this.pos[0])+"%) translateY("+this.pos[1]+"%)"
                this.snowpile.style.clipPath = "rect(0% 35% 50% 0%)";
                break
            case 1:
                this.snowpile.style.transform = "translateX("+(this.pos[0] - 33)+"%) translateY("+this.pos[1]+"%)"
                this.snowpile.style.clipPath = "rect(0% 70% 50% 35%)";
                break
            case 2:
                this.snowpile.style.transform = "translateX("+(this.pos[0] - 33 * 2)+"%) translateY("+this.pos[1]+"%)"
                this.snowpile.style.clipPath = "rect(0% 100% 50% 70%)";
                break
            case 3:
                this.snowpile.style.transform = "translateX("+(this.pos[0])+"%) translateY("+(this.pos[1] - 50)+"%)"
                this.snowpile.style.clipPath = "rect(50% 35% 100% 0%)";
                break
            case 4:
                this.snowpile.hidden = true
                setTimeout(
                    async () => {
                        this.snowpile.hidden = false
                        await timer(1000)
                        this.snowpile.style.transform = "translateX("+(this.pos[0] - 33 * 2)+"%) translateY("+this.pos[1]+"%)"
                        this.snowpile.style.clipPath = "rect(0% 100% 50% 70%)";
                        await timer(1000)
                        this.snowpile.style.transform = "translateX("+(this.pos[0] - 33)+"%) translateY("+this.pos[1]+"%)"
                        this.snowpile.style.clipPath = "rect(0% 70% 50% 35%)";
                        await timer(1000)
                        this.stage = this.maxStage
                        this.snowpile.style.transform = "translateX("+(this.pos[0])+"%) translateY("+this.pos[1]+"%)"
                        this.snowpile.style.clipPath = "rect(0% 35% 50% 0%)";
                    },
                    1000
                )
                break;
            default:
                break;
        }
    }
    snowstage() {
        if (this.debounce) {return}
        switch (this.stage) {
            case 0:
                this.stage += 1
                this.snowpile.style.transform = "translateX("+(this.pos[0] - 33)+"%) translateY("+this.pos[1]+"%)"
                this.snowpile.style.clipPath = "rect(0% 70% 50% 35%)";
                this.debounce = true
                setTimeout(()=>{this.debounce = false}, 10)
                break;
            case 1:
                this.stage += 1
                this.snowpile.style.transform = "translateX("+(this.pos[0] - 33 * 2)+"%) translateY("+this.pos[1]+"%)"
                this.snowpile.style.clipPath = "rect(0% 100% 50% 70%)";
                this.debounce = true
                setTimeout(()=>{this.debounce = false}, 10)
                break
            case 2:
                this.snowpile.style.transform = "translateX("+(this.pos[0])+"%) translateY("+(this.pos[1] - 50)+"%)"
                this.snowpile.style.clipPath = "rect(50% 35% 100% 0%)";
                this.debounce = true
                setTimeout(()=>{this.debounce = false}, 10)
                this.stage += 1
                break;
            case 3:
                this.stage += 1
                this.snowpile.hidden = true
                setTimeout(
                    async () => {
                        this.snowpile.hidden = false
                        await timer(1000)
                        this.snowpile.style.transform = "translateX("+(this.pos[0] - 33 * 2)+"%) translateY("+this.pos[1]+"%)"
                        this.snowpile.style.clipPath = "rect(0% 100% 50% 70%)";
                        await timer(1000)
                        this.snowpile.style.transform = "translateX("+(this.pos[0] - 33)+"%) translateY("+this.pos[1]+"%)"
                        this.snowpile.style.clipPath = "rect(0% 70% 50% 35%)";
                        await timer(1000)
                        this.stage = this.maxStage
                        this.snowpile.style.transform = "translateX("+(this.pos[0])+"%) translateY("+this.pos[1]+"%)"
                        this.snowpile.style.clipPath = "rect(0% 35% 50% 0%)";
                    },
                    2000
                )
                break;
            default:
                break;
        }
    }
}
class snowpile_holder{
    constructor(snowpiles) {
        this.snowpiles = []
        for (let index = 0; index < snowpiles.length; index++) {
            const element = snowpiles[index];
            const snowpile_1_pos = [Math.random() * 80 + 120, Math.random() * 10 + 240]
            this.snowpiles.push(new snowpile(Math.floor(Math.random()*3), snowpile_1_pos, element))
        }
        this.order()
    }
    activate() {
        this.snowpiles.forEach(element => { 
            element.snowpile.addEventListener("click", element.snowstage.bind(element))
        });
    }
    deactivate() {
        this.snowpiles.forEach(element => { 
            element.snowpile.removeEventListener("click", element.snowstage.bind(element))
        });
    }
    show() {
        this.snowpiles.forEach(element => { 
            element.snowpile.hidden = false
            const snowpile_1_pos = [Math.random() * 80 + 120, Math.random() * 10 + 240]
            element.pos = snowpile_1_pos
            element.place()
        });
    }
    hide() {
        this.snowpiles.forEach(element => { 
            element.snowpile.hidden = true
        });
    }
    order() {
        this.snowpiles.forEach(element => { 
            element.snowpile.style.zindex = 235 - element.pos[1]/10
        });
    }
    //Make whatever
}
var snowpiles
var coins = document.getElementsByClassName("mainScene__center__center--coin")
var coin_spin_stage = 0
var added_functions = {
}
var audio = new Audio('music/C0ZYE5TC0LD.ogg');
var dialogue_open = false
var SN_Checked = 0
var KV_Name = 0
var HU_Name = 0
var KV_Shoplist = 0
var HU_Left = 0
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
initGame()
// startGame()
//starts main functional manager
// window.addEventListener("click", startGame);
function initGame() {
    interactables["outside_door"].hidden = false
    interactables["ladder_outside"].hidden = false
    interactables["snow_mobile"].hidden = false
    interactables["guid_outside"].hidden = false
    interactables["shop_front"].hidden = true
    interactables["shopkeep"].hidden = true
    coinSpin()
    snowpiles = new snowpile_holder(document.getElementsByClassName("mainScene__center__center--snowpile_1"))
}
function startGame() {
    for (const [key, value] of Object.entries(interactables)) {
        value.hidden = true
    }
    body.style.overflow = "hidden"
    backpack.addEventListener('click', processBackpack)
    backtrack.addEventListener('click', backtrack_func)
    lookaround.addEventListener('click', lookarounb_func)
    window.removeEventListener("click", startGame)
    try {
        audio.play()
    } catch (error) {
        console.log(error);
        
    }
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
            added_functions["outside_door"] = interactionLisener_switch.bind(null, "shop_shopkeep")
            added_functions["ladder_outside"] = interactionLisener_switch.bind(null, "tower")
            added_functions["guid_outside"] = openDiologue.bind(null, "1")
            added_functions["snow_mobile"] = openDiologue.bind(null, "0")
            interactables["outside_door"].addEventListener("click", added_functions["outside_door"])
            interactables["ladder_outside"].addEventListener("click", added_functions["ladder_outside"])
            interactables["guid_outside"].addEventListener("click", added_functions["guid_outside"])
            interactables["snow_mobile"].addEventListener("click", added_functions["snow_mobile"])
            snowpiles.activate()
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
            //interactables
            added_functions["shopkeep"] = openDiologue.bind(null, "2")
            interactables["shopkeep"].addEventListener("click", added_functions["shopkeep"])
            break;
        case "tower":
            //sets scene
            mainScene_img.src = "xcf/v1_tower_view.png"
            body.style.backgroundImage = "url('xcf/v1_tower_view.png')"
            scene_name = "The great view"
            scene_description = "Whow, from up here you can see till The Great Frozen Wall (scene 73) :OO"
            setTimeout(openPlace, 1000, scene_name, scene_description)
            //sets snowoe :DD
            snowing = true
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
            if (added_functions["outside_door"]) {
                interactables["outside_door"].removeEventListener('click', added_functions["outside_door"])
                delete added_functions["outside_door"]
            }
            if (added_functions["ladder_outside"]) {
                interactables["ladder_outside"].removeEventListener('click', added_functions["ladder_outside"])
                delete added_functions["ladder_outside"]
            }
            if (added_functions["guid_outside"]) {
                interactables["guid_outside"].removeEventListener('click', added_functions["guid_outside"])
                delete added_functions["guid_outside"]
            }
            if (added_functions["snow_mobile"]) {
                interactables["snow_mobile"].removeEventListener('click', added_functions["snow_mobile"])
                delete added_functions["snow_mobile"]
            }
            snowpiles.deactivate()
            break;
            case "shop_shopkeep":
            if (added_functions["shopkeep"]) {
                interactables["shopkeep"].removeEventListener('click', added_functions["shopkeep"])
                delete added_functions["shopkeep"]
            }
            break
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
            snowpiles.show()
            //disables intractables
            break;
        case "shop_shopkeep":
            interactables["shop_front"].hidden = false
            interactables["shopkeep"].hidden = false
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
            snowpiles.hide()
            //disables intractables
            break;
        case "shop_shopkeep":
            interactables["shop_front"].hidden = true
            interactables["shopkeep"].hidden = true
            break;
        default:
            break;
    }
}
//Backtrack
function backtrack_func() {
    if (seitchingscenes || dialogue_open) {
        return
    }
    
    switch (scene) {
        case "opening":
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
    if (seitchingscenes || dialogue_open) {
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
    if (seitchingscenes || dialogue_open) {return}
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
    dialogue_open = false
}
async function processDiologue(id) {
    // console.log("Start");
    // console.log(Object.keys(added_functions).length);
    if (added_functions["diologue"]) {
        diologue.removeEventListener('click', added_functions["diologue"])
        delete added_functions["diologue"]
    }
    if (added_functions["dialogue_button_1"]) {
        dialogue_button_1.removeEventListener('click', added_functions["dialogue_button_1"])
        delete added_functions["dialogue_button_1"]
    }
    if (added_functions["dialogue_button_2"]) {
        dialogue_button_2.removeEventListener('click', added_functions["dialogue_button_2"])
        delete added_functions["dialogue_button_2"]
    }
    if (added_functions["dialogue_button_3"]) {
        dialogue_button_3.removeEventListener('click', added_functions["dialogue_button_3"])
        delete added_functions["dialogue_button_3"]
    }
    // console.log(Object.keys(added_functions).length);
    
    if (id == "") {
        closeDiologue()
        return
    }
    switch (id) {
        //snow mobile
        case "0":
            if (SN_Checked == 0) {
                processDiologue("00")
            } else {
                processDiologue("01")
            }
            break;
        case "01":
            setPrompt("Kvaras",
                "So, up for the ride?",
                [
                    "Hell yeah!",
                    "010",
                    "No, not in particular...",
                    "011",
                ]
            )
            break;
        case "010":
            setPrompt("Kvaras",
                "Sure, if you keep in that direction you can reach Spankey's (scene 74), I've heard it has something to do with rolling the dice.",
                [
                    "Oh, you have no idea how good I am with that!",
                    "exit_74",
                    "Oh, so you know something about it?",
                    "0101",
                    "Not the biggest gambler here...",
                    "0102",
                ]
            )
            break;
        case "0101":
            setPrompt("Kvaras",
                "Yeah, I come from that side, but i of course love the mountains more than the desert!",
                [
                    "Yeah, can see them being cool!",
                    "",
                    "You come from there? That's sick!",
                    "",
                    "Oh, i see...",
                    "",
                ]
            )
            break;
        case "0102":
            setPrompt("Kvaras",
                "Oh, yeah sure, although it has something more than gambling, it's just the main attraction.",
                [
                    "If you say it like that, the sure let us move!",
                    "exit_74",
                    "Riiight.... either way i like freezing rather than melting.",
                    "",
                    "I just arrived, why not take time exploring this place!",
                    "01021",
                ]
            )
            break;
        case "01021":
            setPrompt("Kvaras",
                "Yeah sure!",
                [
                    "",
                ]
            )
            break;
        case "00":
            setPrompt("Narrator",
                "As you walked towards snow mobile you hear a hey",
                [
                    "000",
                ]
            )
            break;
        case "000":
            SN_Checked = 1
            setPrompt("Kvaras",
                "Hey what's up, interested in my ride, ey?",
                [
                    "It's looking hell a sick, can i give it a go?",
                    "010",
                    "Oh, hi. Who are you?",
                    "100",
                    "No, not in particular...",
                    "011",
                ]
            )
            break;
        case "100":
            KV_Name = 1
            setPrompt("Kvaras",
                "I'm Kvaras, the local guide and if you want i can take you to Abandoned Polar Bear Breeding Operation, kinda weird place name, but it's fun",
                [
                    "That name alone got me curious, let's move!",
                    "exit_28",
                    "Yeah, that sounds too weird for me..",
                    "1001",
                ]
            )
            break;
        case "1001":
            setPrompt("Kvaras",
                "Fair enough, still the offer stands if you change your mind.",
                [
                    "",
                ]
            )
            break;
        case "1":
            if (KV_Name == 0){
                processDiologue("10")
            } else {
                processDiologue("11")
            }
            break;
        case "10":
            setPrompt("Kvaras",
                "As you approach this person, it notices you",
                [
                    "Hi, who are you?",
                    "100",
                    "Say, where are we?",
                    "101",
                    "*Walk away pretending you weren't going towards him*",
                    "",
                ]
            )
            break;
        case "101":
            setPrompt("Kvaras",
                "Basically in winter wonder land, snow each and every day for decades.",
                [
                    "Oh, that sound horrifying, wait who are you? ",
                    "100",
                    "Wait, for real, you're not exaggerating that it has been snowing for decades??",
                    "1011",
                ]
            )
            break;
        case "1011":
            setPrompt("Kvaras",
                "Ha ha, yeah but no it has been snowing for such a long time as the layers have build on to each other for decades. Also there are some rumors",
                [
                    "Yeah, that's sick and all, but who are you?",
                    "100",
                    "Rumors? What do you mean?",
                    "10111",
                    "That's cool, i guess... I will look around now.",
                    "",
                ]
            )
            break;
        case "10111":
            setPrompt("Kvaras",
                "Yeah, that there is buried kingdom under this very spot, but hey it's a legend..",
                [
                    "That's interesting to say the least, by the way I didn't catch your name.",
                    "100",
                    "*run off trying to find the rumored kingdom*",
                    "",
                ]
            )
            break;
        case "011":
            setPrompt("Kvaras",
                "Oh ok...",
                [
                    "",
                ]
            )
            break;
        case "11":
            setPrompt("Kvaras",
                "So what's on your mind?",
                [
                    "Wanted to go hiking!",
                    "110",
                    "You live around here?",
                    "111",
                    "Where are we?",
                    "112",
                ]
            )
            break;
        case "110":
            setPrompt("Kvaras",
                "Oh that is cool, you want to go to Wanted to go to Abandoned Polar Bear Breeding Operation,",
                [
                    "Yeah could go for little trip",
                    "exit_28",
                    "Anywhere, but there hahaha",
                    "",
                    "I'll pass ",
                    "",
                ]
            )
            break;
        case "111":
            setPrompt("Kvaras",
                "Yeah, i come from Spankey's, if you want you can take the snow mobile to go there",
                [
                    "Sure!",
                    "exit_74",
                    "I'm good",
                    "",
                ]
            )
            break;
        case "112":
            setPrompt("Kvaras",
                "Basically in winter wonder land, snow each and every day for decades.",
                [
                    "Oh, that sound horrifying, can we take a trip?",
                    "110",
                    "Wait, for real, you're not exaggerating that it has been snowing for decades??",
                    "1121",
                ]
            )
            break;
        case "1121":
            setPrompt("Kvaras",
                "Ha ha, yeah but no it has been snowing for such a long time as the layers have build on to each other for decades. Also there are some rumors",
                [
                    "Rumors? What do you mean?",
                    "11210",
                    "That's cool, i guess... I will look around now.",
                    "",
                ]
            )
            break;
        case "11210":
            setPrompt("Kvaras",
                "Yeah, that there is buried kingdom under this very spot, but hey it's a legend..",
                [
                    "Ohh cool, can we go on expedition?",
                    "112100",
                    "Yeah probably a legend",
                    "",
                ]
            )
            break;
        case "112100":
            setPrompt("Kvaras",
                "We need equipment and currently the shop is on short supply. Can you go ask him?",
                [
                    "That's sad.. I'm going to go ask him about equipment",
                    "1121000",
                    "Welp, maybe next time",
                    "",
                ]
            )
            break;
        case "1121000":
            KV_Shoplist = 1
            closeDiologue()
            return
        //shop or Hubert lines
        case "2":
            if (HU_Left == 1) {
                processDiologue("21")
            } else {
                processDiologue("20")
            }
            break;
        case "21":
            HU_Left = 0
            setPrompt("Hubert",
                "You know, it is rude to leave in the middle of story.. anyways",
                [
                    "Ye, ye it was too long",
                    "20",
                ]
            )
            break;
        case "20":
            if (HU_Name == 1) {
                processDiologue("201")
            } else {
                processDiologue("200")
            }
            break;
        case "200":
            if (KV_Shoplist == 1) {
                setPrompt("Hubert",
                    "Oh, another ventures spirit.. what would you like?",
                    [
                        "Hi, who are you?",
                        "2000",
                        "Can i ask about the supplies?",
                        "2010",
                        "No, nothing..",
                        "2002",
                    ]
                )
            } else {
                setPrompt("Hubert",
                    "Oh, another ventures spirit.. what would you like?",
                    [
                        "Hi, who are you?",
                        "2000",
                        "... (go talk to Kvaras)",
                        "200",
                        "No, nothing..",
                        "2002",
                    ]
                )
            }
            break;
        case "201":
            if (KV_Shoplist == 1) {
                setPrompt("Hubert",
                    "Hi again... i guess",
                    [
                        "Can i ask about the supplies?",
                        "2010",
                        "Didn't mean to bother you",
                        "2002",
                    ]
                )
            } else {
                setPrompt("Hubert",
                    "Hi again... i guess",
                    [
                        "... (go talk to Kvaras)",
                        "201",
                        "Didn't mean to bother you",
                        "2002",
                    ]
                )
            }
            break;
        case "2000":
            HU_Name = 1
            setPrompt("Hubert",
                "So came here just to chat?\n\
                Fair I'm Hubert, the shop keep.",
                [
                    "Cool, i guess..",
                    "2002",
                ]
            )
            break;
        case "2010":
            setPrompt("Hubert",
                "Ugh, did Kvaras sent you here?\n\
                I already told him that they aren't coming anytime soon",
                [
                    "Yup, wanted to go explore the cave outside the shop view",
                    "20100",
                    "WHAT NOOOO, I was just curious that's all hahaha....",
                    "20101",
                ]
            )
            break;
        case "2002":
            setPrompt("Hubert",
                "Tought so",
                [
                    "",
                ]
            )
            break;
        case "20100":
            setPrompt("Hubert",
                "Oh that cave... if you wish i can tell you the cave connects to the ancient kingdom under this very village",
                [
                    "Wait, under this village???",
                    "201000",
                    "Like I'd believe in you",
                    "20101",
                ]
            )
            break;
        case "20101":
            setPrompt("Hubert",
                "Riiigght.. whatever ",
                [
                    "",
                ]
            )
            break;
        case "201000":
            setPrompt("Hubert",
                "Well it's a bit of a long story.. but if you're up for it i guess i could spare some time",
                [
                    "Oh I'm down",
                    "201000_0",
                    "No, not interested ",
                    "2002",
                ]
            )
            break;
        case "201000_0":
            setPrompt("Hubert",
                "So, long ago this was a green land where one magical king ruled the land",
                [
                    "Oh, that's nice.",
                    "201000_1",
                    "*quietly sneak out*",
                    "2010001",
                ]
            )
            break;
        case "201000_1":
            setPrompt("Hubert",
                "Until one day, a lich came and fought the kingdom, it was ruthless war, but the king was winning in this war until one day...",
                [
                    "Oh god, what happened next?",
                    "201000_2",
                    "*quietly sneak out*",
                    "2010001",
                ]
            )
            break;
        case "201000_2":
            setPrompt("Hubert",
                "Until one day the lich sneaked past the guards and entered kings room and stabbed him with a cursed blade of eternal frost",
                [
                    "NOOOOOOOOOO",
                    "201000_3",
                    "*quietly sneak out*",
                    "2010001",
                ]
            )
            break;
        case "201000_3":
            setPrompt("Hubert",
                "Then there was silence as coldness started spreading from frozen kings corpse..",
                [
                    "Wait how?",
                    "201000_4",
                    "*quietly sneak out*",
                    "2010001",
                ]
            )
            break;
        case "201000_4":
            setPrompt("Hubert",
                "You see the whole land was under kings magic and it was being run by it and if now the kings magic got frozen",
                [
                    "Wait so what happened to citizens?",
                    "201000_5",
                    "*quietly sneak out*",
                    "2010001",
                ]
            )
            break;
        case "201000_5":
            setPrompt("Hubert",
                "The whole land froze over turning anyone in it in enteral slumber and calling endless winter...",
                [
                    "Well that is a sad story..",
                    "2010000",
                    "*quietly sneak out*",
                    "2010001",
                ]
            )
            break;
        case "2010000":
            setPrompt("Hubert",
                "Whow you actual listened trough the story",
                [
                    "Yeah, I liked the story",
                    "20100000",
                    "Mid story, in my opinion",
                    "20100001",
                ]
            )
            break;
        case "20100000":
            setPrompt("Hubert",
                "Welp what can i say if you ever find the ancient city remove the cursed dagger and this world will become green once more",
                [
                    "Can you supply this, as i am more than ready to explore the cave",
                    "201000000",
                    "Yeah, I'll just hang out",
                    "201000001",
                ]
            )
            break;
        case "20100001":
            setPrompt("Hubert",
                "Ohh..",
                [
                    "20100000",
                ]
            )
            break;
        case "201000000":
            setPrompt("Hubert",
                "Fair enough",
                [
                    "",
                ]
            )
            break;
        case "201000001":
            setPrompt("Hubert",
                "I would be down, but as i said i got no resources, so in meanwhile you can go around.. i guess",
                [
                    "",
                ]
            )
            break;
        case "2010001":
            setPrompt("Narrator",
                "He didn't notice you as you sneaked out",
                [
                    "",
                ]
            )
            break;

        //example
        case "":
            setPrompt("Kvaras",
                "",
                [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                ]
            )
            break;


        //exits
        case "exit_28":
            exitPrompt(28)
            break
        case "exit_74":
            exitPrompt(74)
            break
        default:
            console.warn("Errr" + id);
            break;
    }
    diologue.classList.remove("diologue--closed")
    diologue.classList.add("diologue--open")
}
async function setPrompt(name, text, button_texts) {
    //totaly won't regret this ;ater :3
    switch (name) {
        case "Kvaras":
            diologue_img.src = "xcf/v1_guid_picture.png"
            if (KV_Name == 0) {
                diologue_name.innerHTML = "???"
            } else {
                diologue_name.innerHTML = name
            }
            break;
        case "Hubert":
            diologue_img.src = "xcf/v1_shopkeep_picture.png"
            if (HU_Name == 0) {
                diologue_name.innerHTML = "???"
            } else {
                diologue_name.innerHTML = name
            }
            break;
        default:
            diologue_img.src = "xcf/prototype1_backtrack.png"
            diologue_name.innerHTML = "Narrator"
            break;
    }
    diologue_text.innerHTML = text
    let timeout = 100
    if (button_texts.length == 1) {
        dialogue_button_1.style.display = "none"
        dialogue_button_2.style.display = "none"
        dialogue_button_3.style.display = "none"
        setTimeout(() => {
            added_functions["diologue"] = processDiologue.bind(null, button_texts[0])
            diologue.addEventListener('click', added_functions["diologue"])
            // console.log(Object.keys(added_functions).length);
        }, timeout)
    }
    if (button_texts.length >= 2) {
        dialogue_button_1.style.display = "block"
        dialogue_button_1.innerHTML = button_texts[0]
        setTimeout(() => {
            added_functions["dialogue_button_1"] = processDiologue.bind(null, button_texts[1])
            dialogue_button_1.addEventListener('click', added_functions["dialogue_button_1"])
            // console.log(Object.keys(added_functions).length);
        }, timeout)
    } else {
        dialogue_button_1.style.display = "none"
    }
    if (button_texts.length >= 4) {
        dialogue_button_2.style.display = "block"
        dialogue_button_2.innerHTML = button_texts[2]
        setTimeout(() => {
            added_functions["dialogue_button_2"] = processDiologue.bind(null, button_texts[3])
            dialogue_button_2.addEventListener('click', added_functions["dialogue_button_2"])
            // console.log(Object.keys(added_functions).length);
        }, timeout)
    } else {
        dialogue_button_2.style.display = "none"
    }
    if (button_texts.length >= 6) {
        dialogue_button_3.style.display = "block"
        dialogue_button_3.innerHTML = button_texts[4]
        setTimeout(() => {
            added_functions["dialogue_button_3"] = processDiologue.bind(null, button_texts[5])
            dialogue_button_3.addEventListener('click', added_functions["dialogue_button_3"])
            // console.log(Object.keys(added_functions).length);
        }, timeout)
    } else {
        dialogue_button_3.style.display = "none"
    }
}
function openDiologue(id) {
    if (dialogue_open) {return}
    dialogue_open = true
    processDiologue(id)
}
//Exit prompt
function exitPrompt(scene) {
 switch (scene) {
    case 28:
        holdup.classList.remove("holdup--hidden")
        holdup_h2.innerHTML = "And go to [Abandoned Polar Bear Breeding Operation] (aka 28)"
        break;
    case 74:
        holdup.classList.remove("holdup--hidden")
        holdup_h2.innerHTML = "And go to [Spanky's] (aka 74)"
        break;
    default:
        break;
 }
}
function noThanks() {
    holdup.classList.add("holdup--hidden")
    closeDiologue()
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
    let snowPiles = []
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
//coins
async function coinSpin() {
    while(true){
        await timer(50)
        
        coinSpin_spin()
    }
}
function coinSpin_spin() {
    coin_spin_stage += 1
    if (coin_spin_stage > 7) {
        coin_spin_stage = 0
    }
    var cliperpath = ""
    var transformer = ""
    switch (coin_spin_stage) {
        case 0:
            cliperpath = "rect(0% 16.666666667% 20% 0%)"
            transformer = "translateX(0%) translateY(0%)"
            break;
        case 1:
            cliperpath = "rect(0% 33.333333334% 20% 16.666666667%)"
            transformer = "translateX(-16.666666667%) translateY(0%)"
            break
        case 2:
            cliperpath = "rect(0% 50% 20% 33.333333334%)"
            transformer = "translateX(-33.333333334%) translateY(0%)"
            break
        case 3:
            cliperpath = "rect(20% 50% 40% 33.333333334%)"
            transformer = "translateX(-33.333333334%) translateY(-20%)"
            break
        case 4:
            cliperpath = "rect(20% 33.333333334% 40% 16.666666667%)"
            transformer = "translateX(-16.666666667%) translateY(-20%)"
            break
        case 5:
            cliperpath = "rect(20% 16.666666667% 40% 0%)"
            transformer = "translateX(0%) translateY(-20%)"
            break;
        case 6:
            cliperpath = "rect(40% 16.666666667% 60% 0%)"
            transformer = "translateX(0%) translateY(-40%)"
            break;
        case 7:
            cliperpath = "rect(40% 33.333333334% 60% 16.666666667%)"
            transformer = "translateX(-16.666666667%) translateY(-40%)"
            break
        default:
            break;
    }
    for (let index = 0; index < coins.length; index++) {
        const element = coins[index];
        element.style.clipPath = cliperpath
        element.style.transform = transformer
    }
}
