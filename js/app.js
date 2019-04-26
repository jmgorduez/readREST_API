import { createRowElement, getRepoNameValue, getRepoUserValue, getRepoCreatedDateValue } from './user-interface-manager.js'
import { ROOT_ELEMENT, SEARCH_BTN, RESPONSE_STATUS_MESSAGE, getAPI_URL, EMPTY_STRING, DAY } from './constants'
import moment from 'moment';

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
        response.text().then(readGitRepos)
    } else {
        showError(`${RESPONSE_STATUS_MESSAGE} ${response.status}`)
    }
}

function readGitRepos(responseText) {
    JSON.parse(responseText)
        .filter(filterRepo)
        .sort(sortRepos)
        .map(repo => createRowElement(repo))
        .forEach(htmlElement => {
            root.appendChild(htmlElement);
        });
}

function cleanRootElement() {
    root.innerHTML = EMPTY_STRING;
}

function filterRepo(repo) {
    return (getRepoNameValue().length === 0
        || repo.full_name.search(getRepoNameValue().trim()) !== -1)
        && (getCreatedDateField(repo).isSameOrBefore(getRepoCreatedDateValue(), DAY));
}

function getCreatedDateField(repo) {
    return moment(repo.created_at);
}

function sortRepos(repo1, repo2) {
    return repo1.full_name.localeCompare(repo2.full_name);
}

function showError(error) {
    console.log(error)
}