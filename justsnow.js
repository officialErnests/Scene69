const popup = document.getElementById("popup")
const popup_img = document.getElementById("popup-img")
const clickable_images = document.getElementsByClassName("click_img")
console.log(clickable_images.length);

for (let index = 0; index < clickable_images.length; index++) {
    console.log("A");
    const element = clickable_images[index];
    element.addEventListener("click", imageClicked)
    
}
function imageClicked() {
    popup.classList.remove("popup--hidden")
    popup_img.src = this.src
}
snowing = true
const timer = ms => new Promise(res => setTimeout(res, ms))
const img_assets_1 = new Image(192, 128)
img_assets_1.src = "xcf/V1_SnowAssets_1.png"
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

snow()
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