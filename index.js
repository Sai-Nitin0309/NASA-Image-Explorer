import { obj } from "./app.js"

const index=()=>{
return `

    <div class="home-section">
        <nav>        
           <div><img src="https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUyejJiOXcxYXlja2h6MGV1bnYzeXF6MGE3enUyeGlxamVxZTRmdTMzdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PNf2Ke7gn6oDK/source.gif" alt=""></div>
           <div> <a href="/login">Login</a>
            <a href="/register">Regsiter</a></div>
        </nav>
        <div>
            NASA provides a variety of free and public Open APIs that enable developers to access real-world space and Earth research data. These APIs allow users to retrieve information directly from NASA's databases, including space photographs, films, asteroid characteristics, Mars rover shots, and Earth observations. They are mostly utilized for educational and scientific objectives, as well as the development of online or mobile space science applications.NASA provides a variety of free and public Open APIs that enable developers to access real-world space and Earth research data. These APIs allow users to retrieve information directly from NASA's databases, including space photographs, films, asteroid characteristics, Mars rover shots, and Earth observations. They are mostly utilized for educational and scientific objectives, as well as the development of online or mobile space science applications.
        </div>
    </div>
`
}


export const bindIndex=()=>{
const anchors=document.querySelectorAll('a')

document.body.addEventListener("mousemove", (e) => {
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

    
anchors.forEach((a)=>{
    a.addEventListener('click',(e)=>{
        e.preventDefault()
        // console.log(e.target.pathname);
        history.pushState(null,"",`${e.target.pathname}`)
        // console.log(location.pathname);
        let path=location.pathname
        // console.log(path);
       root.innerHTML=obj[path][0]()
       if(obj[path][1]){
        obj[path][1]()
       }
        
        
    })
})
}

export default index