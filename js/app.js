import { createRowElement, getRepoNameValue, getRepoUserValue, getRepoCreatedDateValue } from './user-interface-manager.js'
import { ROOT_ELEMENT, SEARCH_BTN, RESPONSE_STATUS_MESSAGE, getAPI_URL, EMPTY_STRING, DAY } from './constants'
import processRepos from './logic'

const root = document.getElementById(ROOT_ELEMENT)
const searchBtn = document.getElementById(SEARCH_BTN)

window.onload = () => {
    let user = getRepoUserValue()
    fetch(getAPI_URL(user))
        .then(getRepos)
        .catch(showError)
};

searchBtn.onclick = () => {
    let user = getRepoUserValue()
    if (user.length === 0) {
        alert('User is required')
        return
    }
    fetch(getAPI_URL(user))
        .then(getRepos)
        .catch(showError)
};

function getRepos(response) {
    cleanRootElement()
    if (response.ok) {
        response.text().then(readRepos)
    } else {
        showError(`${RESPONSE_STATUS_MESSAGE} ${response.status}`)
    }
}

function readRepos(responseText){
    processRepos(responseText, getRepoNameValue(), getRepoCreatedDateValue(), createRowElement, appendChild)
}

function appendChild(element){
    root.appendChild(element)
}

function cleanRootElement() {
    root.innerHTML = EMPTY_STRING;
}


function showError(error) {
    console.log(error)
}