function updateButton(key) {
    buttons[key].innerHTML = '<span style="background-image: conic-gradient(from 45deg, ' + (colors[key].includes(",") ? colors[key] : colors[key]+","+colors[key]) + '); color: transparent; background-clip: text;">' + symbols[key] + "</span> " + key.toUpperCase() + " " + elements[key].amount + (elements[key].max ? "/"+elements[key].max : "") + ' <span style="background-image: conic-gradient(from 45deg, ' + (colors[key].includes(",") ? colors[key] : colors[key]+","+colors[key]) + '); color: transparent; background-clip: text;">' + symbols[key] + "</span>"
    buttons[key].innerHTML += '<br>' + costWrapper(elements[key].cost) + " " + (elements[key].costCurrency == "quintessence" ? '<span style="background-image: conic-gradient(from 45deg, limeGreen, darkOrange, lightBlue, cadetBlue, limeGreen); color: transparent; background-clip: text;">␅</span>' : symbols[elements[key].costCurrency])
    buttons[key].innerHTML += '<br>' + '<br>' + desc[key]
    const percentage = Math.min(((elements[key].costCurrency == "energy" ? energy : elements[elements[key].costCurrency]?.amount) / elements[key].cost) * 100, 100); // Cap at 100%
    buttons[key].style.background = `linear-gradient(to right, #333 ${percentage}%, #000 ${percentage}%)`;
    if (buttons[key].matches(':hover')) buttons[key].style.background = `linear-gradient(to right, #666 ${percentage}%, #333 ${percentage}%)`;
}

const challengeData = {
    C1: {
        title: "Aries",
        challenge: "<span style='color:limeGreen'>␄</span> doesn't work, but <span style='color:darkOrange;'>␁</span> is x3 stronger",
        reward: "<span style='color:darkOrange;'>␁</span> is x1.33 stronger"
    },
    C2: {
        title: "Taurus",
        challenge: "Energy generation is x0.25",
        reward: "<span style='color:limeGreen'>␄</span> is x1.33 stronger"
    },
    C3: {
        title: "Gemini",
        challenge: "Salt cost scaling goes by x2√2 instead of x2",
        reward: "<span style='color:lightBlue'>␃</span> is x1.33 stronger"
    },
    C4: {
        title: "Cancer",
        challenge: "<span style='color:lightBlue'>␃</span> and <span style='color:darkOrange;'>␁</span> don't work",
        reward: "<span style='color:cadetBlue'>␂</span> is x1.33 stronger"
    },
    C5: {
        title: "Leo",
        challenge: "<span style='color:darkOrange;'>␁</span> is x4 weaker",
        reward: "<span style='color:darkOrange;'>␁</span> is x1.5 stronger"
    },
    C6: {
        title: "Virgo",
        challenge: "<span style='color:lightGray'>␀</span> can only be purchased 10 times",
        reward: "<span style='color:limeGreen'>␄</span> is x1.5 stronger"
    },
    C7: {
        title: "Libra",
        challenge: "Normal cost scaling for cardinals is removed; buying any cardinal scales all cardinals x2",
        reward: "<span style='color:lightBlue'>␃</span> is x1.5 stronger"
    },
    C8: {
        title: "Scorpio",
        challenge: "Energy generation is raised to the power of 0.75",
        reward: "<span style='color:cadetBlue'>␂</span> is x1.5 stronger"
    },
    C9: {
        title: "Sagittarius",
        challenge: "On every <span style='color:lightGray'>␀</span> purchase, tick speed drops to 0%, recovering linearly over 1 minute",
        reward: "<span style='color:darkOrange;'>␁</span> effect from <span style='color:white;'>␊</span> is stronger depending on ticks since last "+'<span style="background-image: conic-gradient(from 45deg, limeGreen, darkOrange, lightBlue, cadetBlue, limeGreen); color: transparent; background-clip: text;">␅</span>'
    },
    C10: {
        title: "Capricorn",
        challenge: "<span style='color:limeGreen'>␄</span> is x4 weaker",
        reward: "<span style='color:limeGreen'>␄</span> effect from <span style='color:white;'>␊</span> is stronger depending on ticks since last "+'<span style="background-image: conic-gradient(from 45deg, limeGreen, darkOrange, lightBlue, cadetBlue, limeGreen); color: transparent; background-clip: text;">␅</span>'
    },
    C11: {
        title: "Aquarius",
        challenge: "<span style='color:lightGray'>␀</span> cost scaling gets harsher depending on <span style='color:lightBlue'>␃</span>",
        reward: "<span style='color:lightBlue'>␃</span> effect from <span style='color:white;'>␊</span> is stronger depending on ticks since last "+'<span style="background-image: conic-gradient(from 45deg, limeGreen, darkOrange, lightBlue, cadetBlue, limeGreen); color: transparent; background-clip: text;">␅</span>'
    },
    C12: {
        title: "Pisces",
        challenge: "Energy generation decreases over time",
        reward: "<span style='color:cadetBlue'>␂</span> effect from <span style='color:white;'>␊</span> is stronger depending on ticks since last "+'<span style="background-image: conic-gradient(from 45deg, limeGreen, darkOrange, lightBlue, cadetBlue, limeGreen); color: transparent; background-clip: text;">␅</span>'
    }
}

const challenges = {
    C1: false,
    C2: false,
    C3: false,
    C4: false,
    C5: false,
    C6: false,
    C7: false,
    C8: false,
    C9: false,
    C10: false,
    C11: false,
    C12: false
}

let challenge = localStorage.getItem("challengeID") || 0;

for (let i=1; i <= Object.keys(challenges).length; i++) {
    document.getElementById("C"+i).innerHTML = challengeData["C"+i].title
    document.getElementById("C"+i).innerHTML += "<br><br>"+challengeData["C"+i].challenge
    document.getElementById("C"+i).innerHTML += "<br><br>Reward: "+challengeData["C"+i].reward    

    document.getElementById("C"+i).addEventListener("click", (e)=>{
        energy = 1;
        for (let key of ["earth", "water", "fire", "air"]) {
            elements[key] = {
                amount: 0,
                cost: 1024,
                costCurrency: "energy",
                max: 10
            }
        }
        elements.salt = {
            amount: 0,
            cost: 1/2**(getMult('air')*elements.air.amount+getMult('aether')*elements.aether.amount),
            costCurrency: "energy",
            max: 0
        }
        challenge = i
        localStorage.setItem("challengeID", challenge)
    })
}

const visibility = {
    earth: false,
    water: false,
    air: false,
    fire: false,
    quintessence: false,
    aether: false
}

const visibilityChecks = {
    earth: ()=>elements.salt.amount>5,
    water: ()=>elements.earth.amount,
    air: ()=>elements.water.amount,
    fire: ()=>elements.air.amount,
    quintessence: ()=>elements.cardinal.amount>2,
    aether: ()=>elements.quintessence.amount
}

mergeObjects(visibility, JSON.parse(localStorage.getItem("visibility")))

function queryVisibility() {
    for (let key in visibility) {
        if (visibility[key] === false && visibilityChecks[key]()) {
            visibility[key] = true
            localStorage.setItem("visibility", JSON.stringify(visibility))
        }
    }
}

function setVisibility() {
    document.getElementById("earth").style.display = visibility.earth ? "block" : "none"
    document.getElementById("water").style.display = visibility.water ? "block" : "none"
    document.getElementById("air").style.display = visibility.air ? "block" : "none"
    document.getElementById("fire").style.display = visibility.fire ? "block" : "none"
    document.getElementById("quintessence").style.display = visibility.quintessence ? "block" : "none"
    document.getElementById("aether").style.display = visibility.aether ? "block" : "none"
    document.getElementById("quintessenceTabButton").style.display = visibility.aether ? "block" : "none"
    document.getElementById("challengesTabButton").style.display = visibility.aether ? "block" : "none"
}

function mergeObjects(destination, source) {
    for (let key in source) {
        if (typeof destination[key] == 'object' && typeof source[key] == 'object') {
            mergeObjects(destination[key], source[key])
        } else {
            destination[key] = source[key]
        }
    }
}

const upgradeRep = {
    Q9: (cost) => {cost.amount *= 10; localStorage.setItem("upgradeCost", JSON.stringify(upgradeCost))}
}

const upgradeBought = JSON.parse(localStorage.getItem("upgradeBought")) || {}

const upgradeDesc = {
    Q1: "Unlock <span style='color:lightGray'>␀</span> autobuyer",
    Q2: "<span style='color:limeGreen'>␄</span> is 25% stronger",
    Q3: "<span style='color:cadetBlue'>␂</span> is 25% stronger",
    Q4: "<span style='color:lightBlue'>␃</span> is 25% stronger",
    Q5: "<span style='color:darkOrange;'>␁</span> is 25% stronger",
    Q6: "<span style='color:white;'>␊</span> is 50% stronger",
    Q7: "<span style='color:darkOrange;'>␁</span>,<span style='color:cadetBlue'>␂</span>,<span style='color:lightBlue'>␃</span>,<span style='color:limeGreen'>␄</span> are 25% stronger",
    Q8: "Start with 1 <span style='color:darkOrange;'>␁</span>,<span style='color:cadetBlue'>␂</span>,<span style='color:lightBlue'>␃</span>,<span style='color:limeGreen'>␄</span>",
    Q9: "Gain x2 more " + '<span style="background-image: conic-gradient(from 45deg, limeGreen, darkOrange, lightBlue, cadetBlue, limeGreen); color: transparent; background-clip: text;">␅</span>',
}

const upgradeCost = {
    Q1: {
        amount: 1,
        currency: "quintessence"
    },
    Q2: {
        amount: 1,
        currency: "quintessence"
    },
    Q3: {
        amount: 1,
        currency: "quintessence"
    },
    Q4: {
        amount: 1,
        currency: "quintessence"
    },
    Q5: {
        amount: 1,
        currency: "quintessence"
    },
    Q6: {
        amount: 2,
        currency: "quintessence"
    },
    Q7: {
        amount: 3,
        currency: "quintessence"
    },
    Q8: {
        amount: 5,
        currency: "quintessence"
    },
    Q9: {
        amount: 10,
        currency: "quintessence"
    }
}

mergeObjects(upgradeCost, JSON.parse(localStorage.getItem("upgradeCost")))

function setUpgrade(id) {
    const element = document.getElementById(id)
    element.innerHTML = id
    element.innerHTML += '<br>' + upgradeCost[id].amount + '<span style="background-image: conic-gradient(from 45deg, ' + (colors[upgradeCost[id].currency].includes(",") ? colors[upgradeCost[id].currency] : colors[upgradeCost[id].currency]+","+colors[upgradeCost[id].currency]) + '); color: transparent; background-clip: text;">␅</span>'
    element.innerHTML += '<br><br>' + upgradeDesc[id]

    element.style.background = upgradeBought[id] && !upgradeRep[id] ? '#333' : '#000'

    element.addEventListener("click", (e)=>{
        if (elements[upgradeCost[id].currency].amount >= upgradeCost[id].amount && (!upgradeBought[id] || upgradeRep[id])) {
            elements[upgradeCost[id].currency].amount -= upgradeCost[id].amount
            upgradeBought[id] ??= 0
            upgradeBought[id]++
            element.style.background = upgradeRep[id] ? '#000' : '#333'
        }
        localStorage.setItem("upgradeCost", JSON.stringify(upgradeCost))
        localStorage.setItem("elements", JSON.stringify(elements))
        localStorage.setItem("upgradeBought", JSON.stringify(upgradeBought))
    })
}

function upgradeHover(id) {
    document.getElementById(id).style.background = document.getElementById(id).matches(":hover") && (!upgradeBought[id] || upgradeRep[id]) ? '#666' : upgradeBought[id] && !upgradeRep[id] ? '#333' : '#000'
}

function getMult(elem) {
    switch (elem) {
        case 'earth':
            return 1+(~~upgradeBought.Q2 + ~~upgradeBought.Q7)/4
            break
        case 'water':
            return 1+(~~upgradeBought.Q3 + ~~upgradeBought.Q7)/4
            break
        case 'air':
            return 1+(~~upgradeBought.Q4 + ~~upgradeBought.Q7)/4
            break
        case 'fire':
            return 1+(~~upgradeBought.Q5 + ~~upgradeBought.Q7)/4
            break
        case 'aether':
            return 1+(~~upgradeBought.Q6)/2
            break
        default:
            return 1
            break
    }
}

let elemancyTabButton = document.getElementById("elemancyTabButton")
elemancyTabButton.addEventListener("click",(e)=>{
    for (let e of document.getElementsByClassName("tab")) {
        document.getElementById("hidden").appendChild(e)
    }
    document.body.appendChild(document.getElementById("elemancyTab"))
})
elemancyTabButton.click()
let quintessenceTabButton = document.getElementById("quintessenceTabButton")
quintessenceTabButton.addEventListener("click",(e)=>{
    for (let e of document.getElementsByClassName("tab")) {
        document.getElementById("hidden").appendChild(e)
    }
    document.body.appendChild(document.getElementById("quintessenceTab"))
})
let challengesTabButton = document.getElementById("challengesTabButton")
challengesTabButton.addEventListener("click",(e)=>{
    for (let e of document.getElementsByClassName("tab")) {
        document.getElementById("hidden").appendChild(e)
    }
    document.body.appendChild(document.getElementById("challengesTab"))
})

let energy = 1;
let tps = 1;
let ept = 0;

function updateEnergy() {
    document.getElementById("energy").innerHTML = "Energy:<br>" + costWrapper(energy) + '<br>E/t: ' + costWrapper(ept) + '<br>t/s: ' + costWrapper(tps)
    document.getElementById("challengeID").innerHTML = "Challenge: "+(challengeData["C"+challenge]?.title || "none")
}

function costWrapper(amount) {
    const exp = Math.floor(Math.log10(amount));
    return ((exp > 3 || exp < -2) && isFinite(exp)) ? (amount/10**exp).toFixed(2)+"e"+exp : amount.toFixed(2)
}

const colors = {
    salt: "lightGray",
    earth: "limeGreen",
    water: "cadetBlue",
    air: "lightBlue",
    fire: "darkOrange",
    aether: "white",
    quintessence: "limeGreen, darkOrange, lightBlue, cadetBlue, limeGreen"
}

const symbols = {
    cardinal: "(<span style='color:darkOrange;'>␁</span>,<span style='color:cadetBlue'>␂</span>,<span style='color:lightBlue'>␃</span>,<span style='color:limeGreen'>␄</span>)",
    energy: "E",
    salt: "␀",
    fire: "␁",
    water: "␂",
    air: "␃",
    earth: "␄",
    quintessence: "␅",
    // pure_fire: "␆",
    // pure_water: "␇",
    // pure_air: "␈",
    // pure_earth: "␉",
    aether: "␊",
    // void: "␋",
    // sulfur: "␌",
    // mercury: "␍",
    // copper: "␎",
    // silver: "␏",
    // iron: "␐",
    // tin: "␑",
    // lead: "␒",
    // gold: "␓",
    // platinum: "␔",
    // uranium: "␕",
    // neptunium: "␖",
    // plutonium: "␗",
    // vitae: "␘",
    // red_vitae: "␙",
    // true_vitae: "␚",
    // mors: "␛",
    // gray_mors: "␜",
    // true_mors: "␝",
    // gallium: "␞",
    // bronze: "␟",
    // pewter: "␠",
    // electrum: "␡"
}


const desc = {
    energy: "E",
    salt: "Generates 1 E/t",
    fire: "Multiplies t/s by 1.1<sup style='color:darkOrange'>␁</sup>",
    water: "Raises E generation from <span style='color:lightGray'>␀</span> to 1+<sup style='color:cadetBlue'>␂</sup>/<sub>8</sub>",
    air: "Divides <span style='color:lightGray'>␀</span> cost by 2<sup style='color:lightBlue'>␃</sup>",
    earth: "Multiplies E/t by 2<sup style='color:limeGreen'>␄</sup>",
    quintessence: "␅",
    // pure_fire: "␆",
    // pure_water: "␇",
    // pure_air: "␈",
    // pure_earth: "␉",
    aether: "␊",
    // void: "␋",
    // sulfur: "␌",
    // mercury: "␍",
    // copper: "␎",
    // silver: "␏",
    // iron: "␐",
    // tin: "␑",
    // lead: "␒",
    // gold: "␓",
    // platinum: "␔",
    // uranium: "␕",
    // neptunium: "␖",
    // plutonium: "␗",
    // vitae: "␘",
    // red_vitae: "␙",
    // true_vitae: "␚",
    // mors: "␛",
    // gray_mors: "␜",
    // true_mors: "␝",
    // gallium: "␞",
    // bronze: "␟",
    // pewter: "␠",
    // electrum: "␡"
}

const buttons = {}
let elements = {}
Object.keys(symbols).forEach((key)=>{
    if (!document.getElementById(key) || key == "energy") return
    buttons[key] = document.getElementById(key);
    elements[key] = {
        amount: 0,
        cost: 1,
        costCurrency: "energy",
        max: 0
    }
})

for (let key of ["earth", "water", "fire", "air"]) {
    elements[key] = {
        amount: 0,
        cost: 1024,
        costCurrency: "energy",
        max: 10
    }
    buttons[key].addEventListener("click", (e) => {
        if (energy >= elements[key].cost && elements[key].amount < elements[key].max) {
            elements[key].amount++
            elements[key].cost *= 4**Math.ceil((elements[key].amount+1)/10)
            energy = 1;
            elements.salt = {
                amount: 0,
                cost: 1/2**(getMult('air')*elements.air.amount+getMult('aether')*elements.aether.amount),
                costCurrency: "energy",
                max: 0
            }
        }
        localStorage.setItem("elements", JSON.stringify(elements))
    })
}

for (let key of ["aether"]) {
    elements[key] = {
        amount: 0,
        cost: 1,
        costCurrency: "quintessence",
        max: 10
    }
    buttons[key].addEventListener("click", (e) => {
        if (elements.quintessence.amount >= elements[key].cost && elements[key].amount < elements[key].max) {
            elements.quintessence.amount -= elements[key].cost
            elements[key].amount++
            elements[key].cost *= 16**Math.ceil((elements[key].amount+1)/10)
        }
        localStorage.setItem("elements", JSON.stringify(elements))
    })
}

for (let key of ["quintessence"]) {
    elements[key] = {
        amount: 0,
        cost: 10,
        costCurrency: "cardinal",
        max: 0
    }
    buttons[key].addEventListener("click", (e) => {
        if (elements.cardinal.amount >= elements[key].cost) {
            elements[key].amount++
            energy = 1;
            for (let key of ["earth", "water", "fire", "air"]) {
                elements[key] = {
                    amount: 0,
                    cost: 1024,
                    costCurrency: "energy",
                    max: 10
                }
            }
            elements.salt = {
                amount: 0,
                cost: 1/2**(getMult('air')*elements.air.amount+getMult('aether')*elements.aether.amount),
                costCurrency: "energy",
                max: 0
            }
        }
        localStorage.setItem("elements", JSON.stringify(elements))
    })
}

const loaded = JSON.parse(localStorage.getItem("elements"))
mergeObjects(elements, loaded)
elements.salt = {
    amount: 0,
    cost: 1/2**(getMult('air')*elements.air.amount+getMult('aether')*elements.aether.amount),
    costCurrency: "energy",
    max: 0
}

let targetDelta = 1000
let last = Date.now()

let lastfps = Date.now()
function tick() {
    document.getElementById("fps").innerHTML = (1000/(Date.now()-lastfps)).toFixed(2)+" FPS"
    lastfps = Date.now()
    if (Date.now() - last >= targetDelta) {
        last = Date.now()
        let prevEnergy = energy;
        energy += 2**(getMult('earth')*elements.earth.amount+getMult('aether')*elements.aether.amount) * elements.salt.amount**(1+(getMult('water')*elements.water.amount+getMult('aether')*elements.aether.amount)/8)
        ept = energy-prevEnergy;
        tps = 1.1**(getMult('fire')*elements.fire.amount+getMult('aether')*elements.aether.amount)
    }
    targetDelta = 1000 / tps

    if (upgradeBought.Q1) buttons.salt.click()

    elements.cardinal = {amount:(elements.earth.amount + elements.water.amount + elements.air.amount + elements.fire.amount)/4}
    Object.keys(buttons).forEach((button)=>updateButton(button))
    updateEnergy();
    queryVisibility()
    setVisibility()
    for (let i = 1; i < 10; i++) upgradeHover("Q"+i)
    requestAnimationFrame(tick)
    // new Promise((resolve)=>setTimeout(()=>{tick();resolve()},0))
}
tick()

// setInterval(tick, 0)

buttons.salt.addEventListener("click", (e) => {
    if (energy >= elements.salt.cost) {
        energy -= elements.salt.cost
        elements.salt.amount++
        elements.salt.cost*=2
    }
})

for (let i = 1; i < 10; i++) setUpgrade("Q"+i)