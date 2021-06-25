// Simple & Complex arrays
const sp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const cx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '_', '@', '^']

// select elements
const btnSp = document.getElementById('simple')
const btnCx = document.getElementById('complex')
const addSp = document.getElementById('add-simple')
const addCx = document.getElementById('add-complex')
const clearBtn = document.getElementById('clearList')
const spInput = document.getElementById('sp_input')
const cxInput = document.getElementById('cx_input')
const passwordList = document.querySelector('.password_list')
const passSp = document.querySelector('.sp_password')
const passCx = document.querySelector('.cx_password')
const pwName = document.querySelector('.pw_name')
const pwPass = document.querySelector('.pw_password')
const display = document.querySelector('.localstorage-display')
let ls = window.localStorage

window.addEventListener('DOMContentLoaded', contentLoaded)

// !!!! button events
// generates simple password
btnSp.addEventListener('click', () => {
    let passContent = ''
    for (let i = 0; i < 18; i++) {
        passContent += sp[randomSp()]

        passSp.textContent = passContent
    }
})

// generates complex password
btnCx.addEventListener('click', () => {
    let passContent = ''
    for (let i = 0; i < 18; i++) {
        passContent += cx[randomCx()]

        passCx.textContent = passContent
    }
})

// button states disabled/enabled
clearBtn.disabled = true
clearBtn.style.backgroundColor = '#464f5d'

if (localStorage.length >= 1) {
    clearBtn.disabled = false
    clearBtn.style.backgroundColor = '#495bab'
}

// clears local storage
clearBtn.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})

// !!!! functions
// create random generation functions for each array
function randomSp() {
    return Math.floor(Math.random() * sp.length)
}

function randomCx() {
    return Math.floor(Math.random() * cx.length)
}

function contentLoaded() {
    // add name & simple password to list
    addSp.addEventListener('click', addSpPassword)

    // add name & complex password to list
    addCx.addEventListener('click', addCxPassword)

    // get localStorage items
    for(let i = 0; i < localStorage.length; i++) {
        const key = ls.key(i)
        const value = ls.getItem(key)

        createAppend(key, value)
    }
}

// adds simple password
function addSpPassword() {
    // select input values
    const simpleInput = spInput.value
    const pwValue = passSp.textContent

    // check if name is less than 12 characters
    const warning = document.querySelector('.warning_simple')
    const warning_empty = document.querySelector('.warning_sp_empty')
    if (simpleInput.length > 12) {
        warning.style.display = 'block'
        return
    } else if (simpleInput.length == 0 || pwValue === 'not generated') {
        warning_empty.style.display = 'block'
        return
    } else {
        // hide warnings
        warning.style.display = 'none'
        warning_empty.style.display = 'none'
        pushToStorage(simpleInput, pwValue)

        createAppend(simpleInput, pwValue)
        refresh(spInput)
    }
}

// adds complex password
function addCxPassword() {
    // select input values
    const complexInput = cxInput.value
    const pwValue = passCx.textContent

    // check if name is less than 12 characters
    const warning = document.querySelector('.warning_complex')
    const warning_empty = document.querySelector('.warning_cx_empty')
    if (complexInput.length > 12) {
        warning.style.display = 'block'
        return
    } else if (complexInput.length == 0 || pwValue === 'not generated') {
        warning_empty.style.display = 'block'
        return
    } else {
        // hide warnings and push to storage
        warning.style.display = 'none'
        warning_empty.style.display = 'none'
        localStorage.setItem(complexInput, pwValue)

        createAppend(complexInput, pwValue)
        refresh(cxInput)
    }
}

function checkMax(listItem) {
    // Max number of passwords allowed to be stored
    if(localStorage.length && passwordList.childNodes.length < 6 || localStorage.length && passwordList.childNodes.length == 0) {
        passwordList.appendChild(listItem)
    } else {
        const displayedWarning = document.querySelector('.displayed-warning')
        displayedWarning.style.display = 'block'
        return
    }
}

function createAppend(status, value) {    
    // create child & append
    const wrapper = document.createElement('div')
    const listItem = document.createElement('li')
    const removeBtn = document.createElement('button')
    wrapper.className = 'listedPassword'
    listItem.className = 'password_list-item'
    wrapper.innerHTML = `Name:<span class="pw_name">${status}</span>Password:<span class="pw_password">${value}</span>`
    removeBtn.className = 'remove_pw'
    removeBtn.innerHTML = `<i class="fas fa-minus-square"></i>remove`

    listItem.appendChild(wrapper)
    listItem.appendChild(removeBtn)

    // Max number of passwords allowed to be stored
    checkMax(listItem)
    getButton(removeBtn)
}

function pushToStorage(key, value) {
    if (localStorage.length < 6) {
        localStorage.setItem(key, value) 
    } else {
        return
    }
}

function getButton(btn) {
    btn.addEventListener('click', () => {
        for (let i = 0; i < localStorage.length; i++) {
            let key = ls.key(i)
            
            localStorage.removeItem(key)
            location.reload()
        }
    })
}

function refresh(input) {
    // clear input 
    input.value = ''
    location.reload()
}