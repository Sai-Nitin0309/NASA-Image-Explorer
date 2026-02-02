import home, { bindHome } from "./home.js"
import index, { bindIndex } from "./index.js"
import login, { bindLogin } from "./login.js"
import register, { bindRegiter } from "./register.js"

const root=document.querySelector('#root')

const body=document.body


export function render(path=window.location.pathname){
    history.pushState(null,"",`${path}`)
    root.innerHTML=obj[path][0]()
    if(obj[path][1]){
        obj[path][1]()
       }
// console.log(path);

}

function createStars(nos){
    for(let i=0;i<nos;i++){
        const div=document.createElement("div")
        div.setAttribute("class","star start-blinking")
        div.style.left=`${Math.ceil(Math.random()*window.innerWidth)}px`
        div.style.top=`${Math.ceil(Math.random()*window.innerHeight)}px`
        div.style.animationDelay=`${Math.ceil(Math.random()*1000)}ms`
        body.append(div)
    }
}



createStars(500)
export let obj={
    "/login":[login,bindLogin],
    "/register":[register,bindRegiter],
    "/home":[home,bindHome],
    "/index.html":[index,bindIndex]
}



// console.log(form);



window.addEventListener('popstate',()=>{
                let path=location.pathname
                // console.log(path);
                

        root.innerHTML=obj[path][0]()
    if(obj[path][1]){
        obj[path][1]()
       }

})




window.addEventListener('DOMContentLoaded',()=>{
    render("/index.html")
})