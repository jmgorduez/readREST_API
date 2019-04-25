const API_URL = 'https://api.github.com/users/jmgorduez/repos'
const GET = 'GET'
let request = new XMLHttpRequest()
const root = document.getElementById('root')

request.open(GET, API_URL, true)

request.onload =  () => {
    let data = JSON.parse(request.response)
    if (isReceivedRequest) {
        data.forEach(repo => {
            const row = createRowComponent()  
            const img = createUserIconComponent(repo)
            const h1 = createRepoNameComponent(repo)      
            const p = createRepoURLComponent(repo)
      
            root.appendChild(row)
            row.appendChild(img)
            row.appendChild(h1)
            row.appendChild(p)
        })
      } 
}

request.send()

function isReceivedRequest(){
    return request.status >= 200 && request.status < 400
}

function createRowComponent(repo){
    return document.createElement('div');
}

function createUserIconComponent(repo){
    const div = document.createElement('div')
    div.setAttribute('class', 'repo-icon')
    const img = document.createElement('img')
    img.src = repo.owner.avatar_url
    div.appendChild(img)
    return div;
}

function createRepoNameComponent(repo){
    const div = document.createElement('div')
    div.setAttribute('class', 'repo-title')
    const h1 = document.createElement('h1')
    h1.textContent = repo.full_name
    div.appendChild(h1)
    return div;
}

function createRepoURLComponent(repo){
    const div = document.createElement('div')
    div.setAttribute('class', 'repo-url')
    const p = document.createElement('p')
    p.textContent = `${repo.url.substring(0,50)}...`
    div.appendChild(p)
    return div;
}