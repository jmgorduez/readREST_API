import moment from 'moment';
import {DATE_TIME_FORMAT, DIV, H1, IMG, P, REPO_CREATED_AT, 
    REPO_ICON_CLASS, REPO_TITLE_STYLE, REPO_URL_STYLE, 
    CREATED_AT_MESSAGE, CLASS_ATTRIBUTE} from './constants'

function createRowElement(repo){
    const userIcon = createUserIconComponent(repo)
    const repoName = createRepoNameComponent(repo)      
    const repoURL = createRepoURLComponent(repo)
    const repoCreationDate = createRepoCreationDateComponent(repo)
    const row = document.createElement(DIV);
    row.appendChild(userIcon)
    row.appendChild(repoName)
    row.appendChild(repoCreationDate)
    row.appendChild(repoURL)
    return row;
}

function createUserIconComponent(repo){
    const div = document.createElement(DIV)
    div.setAttribute(CLASS_ATTRIBUTE, REPO_ICON_CLASS)
    const img = document.createElement(IMG)
    img.src = repo.owner.avatar_url
    div.appendChild(img)
    return div;
}

function createRepoNameComponent(repo){
    const div = document.createElement(DIV)
    div.setAttribute(CLASS_ATTRIBUTE, REPO_TITLE_STYLE)
    const h1 = document.createElement(H1)
    h1.textContent = repo.full_name
    div.appendChild(h1)
    return div;
}

function createRepoURLComponent(repo){
    const div = document.createElement(DIV)
    div.setAttribute(CLASS_ATTRIBUTE, REPO_URL_STYLE)
    const p = document.createElement(P)
    p.textContent = `${repo.url.substring(0,50)}...`
    div.appendChild(p)
    return div;
}

function createRepoCreationDateComponent(repo){
    const div = document.createElement(DIV)
    div.setAttribute(CLASS_ATTRIBUTE, REPO_CREATED_AT)
    const p = document.createElement(P)
    p.textContent = `${CREATED_AT_MESSAGE}
    ${moment(repo.created_at).format(DATE_TIME_FORMAT)}`
    div.appendChild(p)
    return div;
}

export default createRowElement;