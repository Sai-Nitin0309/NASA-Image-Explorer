  const register=()=>{
     return `
   <div class="form-container">
        <div class="page"></div>
        <form action="">
            <div class="input-conatiner">
                <h1>Register</h1>
            </div>
            <div class="input-conatiner">
                <i class="fa-solid fa-file-signature"></i>
                <input type="text" name="name" placeholder="Enter Name">
            </div>

             <div class="input-conatiner">
               <i class="fa-solid fa-message"></i>
                <input type="email" name="email" placeholder="Enter Email">
            </div>

             <div class="input-conatiner">
              <i class="fa-solid fa-lock"></i>
                <input type="password" name="password" placeholder="Enter Password">
            </div>

             <div class="input-conatiner">
                <i class="fa-solid fa-lock"></i>
                <input type="password" name="confirmPassword" placeholder="enter Confirm Password">
            </div>

            <div class="button-container">
                <button class="register-button">Register</button>
            </div>
        </form>
   </div>
    `
}


export let bindRegiter=()=>{
    const form=document.querySelector('form')
    const btn=document.querySelector(".register-button")
    const payload={}
    const body=document.body

    function createTypingEffect(){
        const div=document.createElement("div")
        div.setAttribute("class","falligEffect")
        div.innerText="❤️"
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
        if(e.target.name=="confirmPassword"){
            if(payload.password!=payload.confirmPassword){
                e.target.parentElement.style.border="2px solid red"
            }else{
                e.target.parentElement.style.border="2px solid #000"
                
            }
        }
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
    if(!payload.name||!payload.email||!payload.password||!payload.confirmPassword){
        alert("All the feilds are mandatory")
        return
    }
    if(payload.password!=payload.confirmPassword){
        alert("paassword and confirm password should be same")
        return
    };

    (async()=>{
        btn.innerText="Registering........."
        try {
            let res =await fetch("http://localhost:3000/users",{
                method:"POST",
                body:JSON.stringify(payload)  ,
                headers:{
                    "Content-Type":"application/json"
                } 
            })
            // console.log(res);
            if(res.status=="201"){
             
        
                btn.innerText="Register"
                alert("Registered Succesfully")
                
            }else{
            btn.innerText="Register"
            
            alert("Something went wrong")
            
        }
        
    } catch (error) {
        btn.innerText="Register"
        console.log(error);
        
           alert("Something went wrong")
        
       }
        
        
    })()
}

form.addEventListener('submit',handelSubmit)
}

export default register