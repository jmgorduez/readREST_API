import createRowElement from './user-interface-manager.js'
import {GET, API_URL, ROOT_ELEMENT} from './constants'

let request = new XMLHttpRequest()
const root = document.getElementById(ROOT_ELEMENT)

request.open(GET, API_URL, true)

request.onload =  () => {
    if (isReceivedRequest) {
        getData(request)
        .map(repo =>  createRowElement(repo))
        .forEach(htmlElement => {
            root.appendChild(htmlElement)
        });
      } 
}

request.send()

function isReceivedRequest(){
    return request.status >= 200 && request.status < 400
}

function getData(request){
    return JSON.parse(request.response)
}