//grab DOM elements
const charGrid = document.getElementById('character-grid')

//array of character objects which will be pushed to
const allCharacters = {
    cloud: {
        name: "Cloud Strife",
        bio: "cloud's bio - click to hide",
        status: "alive and confused - click to hide"
    },
    barret: {
        name: "Barret Wallace",
        bio: "Barret's bio - click to hide",
        status: "alive - click to hide"
    },
    tifa: {
        name: "Tifa Lockhart",
        bio: "Tifa's bio - click to hide",
        status: "alive - click to hide"
    },
    aerith: {
        name: "Aerith Gainsborough",
        bio: "Aerith's bio - click to hide",
        status: " :( - click to hide"
    },
    nanaki: {
        name: "Nanaki (Red XIII)",
        bio: "Nanaki's bio - click to hide",
        status: "alive - click to hide"
    },
    sephiroth: {
        name: "Sephiroth",
        bio: "Sephiroth's bio - click to hide",
        status: "Dead? Alive? Cloned? Merged with an alien destroyer of worlds? - click to hide"
    }
}



class Character {
    constructor(tag, name,bio,status) {
        this.tag = tag
        this.name = name
        this.bio = bio
        this.status = status
        this.node = this.makeNode()
        this.textNode = this.node.querySelector('.container-text')
        this.buttons = this.node.querySelector('.container-buttons')
        allCharacters[this.tag].object = this
    }
    makeNode() {
        const charDiv = document.createElement('div')
        charDiv.classList.add('container', 'container-character')
        const nameDiv = document.createElement('div')
        nameDiv.classList.add('container', 'container-name')
        nameDiv.textContent = this.name
        const imgDiv = document.createElement('div')
        imgDiv.classList.add('container', 'container-image')
        charDiv.id = this.tag
        const charImage = `../images/${this.tag}.webp`
        const img = document.createElement('img')
        img.src = charImage
        const textNode = document.createElement('div')
        textNode.classList.add('container', 'container-text')
        textNode.dataset.character = this.tag
        const buttonsDiv = document.createElement('div')
        buttonsDiv.classList.add('container', 'container-buttons')
        const bioBtnDiv = document.createElement('div')
        const statusBtnDiv = document.createElement('div')
        bioBtnDiv.classList.add('button')
        statusBtnDiv.classList.add('button')
        const bioButton = document.createElement('button')
        bioButton.dataset.character = this.tag
        bioButton.dataset.type = 'bio'
        bioBtnDiv.appendChild(bioButton)
        bioButton.innerText = 'Character bio'
        const statusButton = document.createElement('button')
        statusButton.dataset.character=this.tag
        statusButton.innerText = 'Status'
        statusButton.dataset.type = 'status'
        statusBtnDiv.appendChild(statusButton)
        buttonsDiv.appendChild(bioBtnDiv)
        buttonsDiv.appendChild(statusBtnDiv)
        bioButton.addEventListener('click', toggleText)
        statusButton.addEventListener('click', toggleText)
        textNode.addEventListener('click', toggleText)
        imgDiv.appendChild(img)
        charDiv.appendChild(nameDiv)
        charDiv.appendChild(imgDiv)
        charDiv.appendChild(buttonsDiv)
        charDiv.appendChild(textNode)
        charGrid.appendChild(charDiv)
        return charDiv
    }
}

const toggleText = (event) => {
    console.log(event.target)
    const character = allCharacters[event.target.dataset.character].object
    const textNode = character.textNode
    const buttons = character.buttons
    console.log(event.target == textNode)
    if (event.target == textNode) {
        event.target.style.display = 'none'
        buttons.style.display = 'flex'
    } else {
        toDisplay = event.target.dataset.type == 'bio' ? character.bio : character.status
        textNode.textContent = toDisplay
        buttons.style.display = 'none'
        console.log(buttons)
        textNode.style.display = 'flex'
    }

}


const makeCharacters = () => {
    Object.keys(allCharacters).forEach(characterTag => {
        const { name, bio, status } = allCharacters[characterTag]
        const character = new Character(characterTag, name, bio, status)
    })
}



//when dom is loaded, begin making characters and grid
document.addEventListener('DOMContentLoaded', () => {
   makeCharacters()
})