const root=document.getElementById("root");
let page=1;
let totalPages;
function displayInUI(users){
    
    users.data.forEach((person)=>{
        const div=document.createElement("div");
        div.className="person-list";

        const img=document.createElement("img");
        img.src=person.avatar;

        const name=document.createElement("h1");
        name.innerText=`Name:${person.first_name} ${person.last_name}`;

        const id=document.createElement("h2");
        id.innerText=`Id:${person.id}`;

        const email=document.createElement("h2");
        email.innerText=`Email:${person.email}`;

        div.append(img,id,name,email);
        root.append(div);
    })

    //if there are multiple pages then only add loadMore button
    if(page<totalPages){
    const loadMore=document.createElement("button");
    loadMore.innerText="Load More";

    //on clicking load more
    loadMore.addEventListener('click',()=>{
     page=page+1;
     loadDataFromAPI();
     loadMore.remove();
    })
    document.body.append(loadMore);
}
  
}



//for loading data from API
async function loadDataFromAPI(){
   let data= await fetch(`https://reqres.in/api/users?page=${page}`);
   let users=await data.json();
   totalPages=users.total_pages;
   displayInUI(users);
}
loadDataFromAPI();