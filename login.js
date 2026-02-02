import { render } from "./app.js"
import home from "./home.js"

const login=()=>{
    return `
        <div class="form-container">
        <div class="page"></div>
        <form action="">
            <div class="input-conatiner">
                <h1>Login</h1>
            </div>


             <div class="input-conatiner">
               <i class="fa-solid fa-message"></i>
                <input type="email" name="email" placeholder="Enter Email">
            </div>

             <div class="input-conatiner">
              <i class="fa-solid fa-lock"></i>
                <input type="password" name="password" placeholder="Enter Password">
            </div>



            <div class="button-container">
                <button class="login-button">Login</button>
            </div>
        </form>
   </div>
    `
}



export let bindLogin=()=>{
    const form=document.querySelector('form')
    const btn=document.querySelector(".login-button")
    const payload={}
    const body=document.body

    function createTypingEffect(){
        const div=document.createElement("div")
        div.setAttribute("class","falligEffect")
        div.innerText="🫶🫶"
        div.style.left=`${Math.ceil(Math.random()*window.innerWidth)}px`
        div.style.top=`${Math.ceil(Math.random()*window.innerHeight)}px`
           body.append(div)
           setTimeout(()=>{
            div.remove()
           },2000)
}
    const inputs=document.querySelectorAll('input')

inputs.forEach((inp)=>{
    inp.addEventListener("input",(e)=>{
        payload[e.target.name]=e.target.value
        createTypingEffect()
    })
})
body.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const radius = 100;
  const pushDistance = 100;

  document.querySelectorAll(".star").forEach(el => {
    const rect = el.getBoundingClientRect();

    const elX = rect.left + rect.width / 2;
    const elY = rect.top + rect.height / 2;

    const dx = elX - mouseX;
    const dy = elY - mouseY;

    const distance = Math.hypot(dx, dy);

    if (distance < radius) {
     
      const nx = dx / distance;
      const ny = dy / distance;

  
      const moveX = nx * pushDistance;
      const moveY = ny * pushDistance;

      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      el.classList.remove("start-blinking");
    } else {
  
      el.style.transform = "translate(0, 0)";
      el.classList.add("start-blinking");
    }
  });
});



const handelSubmit=(e)=>{
    e.preventDefault()
    // console.log(payload);
    if(!payload.email||!payload.password){
        alert("All the feilds are mandatory")
        return
    }
   
console.log(payload);

(async()=>{
    btn.innerText="Signing in.........."
    try {
        let res=await fetch("http://localhost:3000/users")
    if(res.status==200){
    let data=await res.json()
    // console.log(data);
   let user = data.find((ele)=>ele.email===payload.email)
//    console.log(x);
if(!user){
    alert("Incorect Email")
    return;
}else{
    if(user.password===payload.password){
        alert("Login Success")
        render("/home")
    }else{
        alert("Incorrect Password")
    }
}
   
    }
    } catch (error) {
     console.log(error);
        
    }finally{
    btn.innerText="Login"

    }
})()



    
}

form.addEventListener('submit',handelSubmit)
}

export default login