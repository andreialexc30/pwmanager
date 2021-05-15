// Simple & Complex arrays
const sp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const cx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '_', '@', '^']

// select elements
const btnSp = document.getElementById('simple')
const btnCx = document.getElementById('complex')
const addSp = document.getElementById('add-simple')
const addCx = document.getElementById('add-complex')
const spInput = document.getElementById('sp_input')
const cxInput = document.getElementById('cx_input')
const passwordList = document.querySelector('.password_list')
const passSp = document.querySelector('.sp_password')
const passCx = document.querySelector('.cx_password')
const pwName = document.querySelector('.pw_name')
const pwPass = document.querySelector('.pw_password')
const display = document.querySelector('.localstorage-display')

window.addEventListener('DOMContentLoaded', contentLoaded)

// create distinct random generation functions for each array
function randomSp() {
    return Math.floor(Math.random() * sp.length)
}

function randomCx() {
    return Math.floor(Math.random() * cx.length)
}

// password events
btnSp.addEventListener('click', () => {
    let passContent = ''
    for (let i = 0; i < 18; i++) {
        passContent += sp[randomSp()]

        passSp.textContent = passContent
    }
})

btnCx.addEventListener('click', () => {
    let passContent = ''
    for (let i = 0; i < 18; i++) {
        passContent += cx[randomCx()]

        passCx.textContent = passContent
    }
})

// functions
function contentLoaded() {
    // add name & simple password to list
    addSp.addEventListener('click', addSpPassword)

    // add name & complex password to list
    addCx.addEventListener('click', addCxPassword)
}

function addSpPassword() {
    // select input values
    const simpleInput = spInput.value
    const pwValue = passSp.textContent

    // check if name is less than 12 characters
    const warning = document.querySelector('.warning_simple')
    const warning_empty = document.querySelector('.warning_sp_empty')
    if(simpleInput.length > 12) {
        warning.style.display = 'block'
        return
    } else if(simpleInput.length == 0) {
        warning_empty.style.display = 'block'
        return
    } else {
        // hide warning
        warning.style.display = 'none'
        warning_empty.style.display = 'none'

        // create child & append
        const listItem = document.createElement('li')
        const wrapper = document.createElement('div')
        const removeBtn = document.createElement('button')
        wrapper.className = 'listedPassword'
        listItem.className = 'password_list-item'
        wrapper.innerHTML = `<span class="spanTest">Name:</span><span class="pw_name">${simpleInput}</span><span class="spanTests">Password:</span><spanc class="pw_password">${pwValue}</span>`
        removeBtn.className = 'remove_pw'
        removeBtn.innerHTML = `<i class="fas fa-minus-square"></i>`

        listItem.appendChild(wrapper)
        listItem.appendChild(removeBtn)

        // Max number of passwords allowed to be stored
        checkMax(listItem)
    }

    removePw()
}

function addCxPassword() {
    // select input values
    const complexInput = cxInput.value
    const pwValue = passCx.textContent

    // check if name is less than 12 characters
    const warning = document.querySelector('.warning_complex')
    const warning_empty = document.querySelector('.warning_cx_empty')
    if(complexInput.length > 12) {
        warning.style.display = 'block'
        return
    } else if(complexInput.length == 0) {
        warning_empty.style.display = 'block'
        return
    } else {
        // hide warning
        warning.style.display = 'none'
        warning_empty.style.display = 'none'

        // create child & append
        const wrapper = document.createElement('div')
        const listItem = document.createElement('li')
        const removeBtn = document.createElement('button')
        wrapper.className = 'listedPassword'
        listItem.className = 'password_list-item'
        wrapper.innerHTML = `<span class="spanTest">Name:</span><span class="pw_name">${complexInput}</span><span class="spanTests">Password:</span><spanc class="pw_password">${pwValue}</span>`
        removeBtn.className = 'remove_pw'
        removeBtn.innerHTML = `<i class="fas fa-minus-square"></i>`

        listItem.appendChild(wrapper)
        listItem.appendChild(removeBtn)

        // Max number of passwords allowed to be stored
        checkMax(listItem)
    }

    removePw()
}

function checkMax(listItem) {
    // Max number of passwords allowed to be stored
    if(passwordList.childNodes.length < 6) {
        passwordList.appendChild(listItem)
    } else {
        const displayedWarning = document.querySelector('.displayed-warning')
        displayedWarning.style.display = 'block';
        return
    }
}

function removePw() {
    // Remove pw 
    const removePw = document.querySelector('.remove_pw')
    const listItem = document.querySelector('.password_list-item')
    const wrapper = document.querySelector('.listedPassword')

    removePw.addEventListener('click', () => {
        console.log(wrapper.parentElement.parentElement.removeChild(listItem))
        // console.log('working')
    })
}