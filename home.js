let home=()=>{
    return `
        <div class="home-container">
            <div>
                    <form>
                        <input class="search-param" placeholder="enter the name of object that you want to see">
                        <button>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
            </div>
            <div class="display-images">
            </div>
        </div>
    `
}


export const bindHome=()=>{
    const inp=document.querySelector(".search-param")
    const form=document.querySelector('form')
    const div=document.querySelector(".display-images")

    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        // console.log(inp.value);
        (async()=>{
          try {
              let res=await fetch(`https://images-api.nasa.gov/search?q=${inp.value}`)
            let data =await res.json()
            // console.log(data);
            // console.log(data.collection.items);
            let modifiedArr=data.collection.items.map((ele,index)=>{
                // console.log(ele.links[0],index);
                
                let obj={}
                    if(ele.links){
                            obj.description=ele?.data[0]?.description
                            obj.image=ele?.links[0]?.href.replaceAll(" ","%20")
                    }
                return obj
            })

            // console.log(modifiedArr);
            
           let elemes= modifiedArr.map((ele)=>{
                return `
                    <div class="card">
                        <img src=${ele.image}>
                        <h3>${ele.description}</h3>
                    </div>
                
                `
            }).join("")

            // console.log(elemes);
            div.innerHTML=`${elemes}`
          } catch (error) {
            console.log(error);
            
          }
            
            
        })()
        
    })

}


export default home