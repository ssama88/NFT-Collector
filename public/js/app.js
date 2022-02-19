
console.log(currentUser);
const users = new httpRequest("http://localhost:5000/users/pics")

//users.getRequest().then(data => console.log(data))
const signUpBtn = document.getElementById('sign-up')
const loginButton = document.getElementById('login-btn');
const profile = document.getElementById('profile');

console.log('running');
const display = document.getElementById('display-info')
const container = document.getElementById('container');

container.addEventListener("click", showProfileSettings)
container.addEventListener('click', signOut);
//container.addEventListener('click', updateProfile);
container.addEventListener('click', buyNFT);
container.addEventListener('click', updateChangeRequest);



const checkLogin = new httpRequest("http://localhost:5000/users")
checkLogin.getRequest()
.then(data =>{
  let copy = data;
  let filtered = copy.filter((user)=>{
    return user.login
  })
  console.log(filtered);
  if(filtered.length === 0){
    getImages();

  }else{
    console.log("get saved images")
    filtered[0].images.map((image)=>{
      populateGallery(image);
    })
  }
})

 function getImages(){

  //const getImages = await fetch('http://localhost:5000/users/pics')
  //.then(data=> data.json())
users.getRequest()
  .then(data=> {
    console.log(data);
    let copyData = data.slice(0,9)
    copyData.map((user)=>{
     populateGallery(user);
     
    })
    
  
  })
  .catch(err=> console.log(err));
  ;
}


function populateGallery(user){
  let parentDiv = document.createElement('div');
  parentDiv.classList.add("gallery-pic")
  let header = document.createElement('h3');
  let description = document.createElement('p');
  header.textContent = user.name;
  description.textContent = user.description;
  let button = document.createElement('button');
  button.textContent = "Buy Now";
  button.classList.add('buy-nft')
  let div = document.createElement('img');
  div.classList.add('showcase')
  parentDiv.appendChild(header);
  parentDiv.appendChild(div);
  parentDiv.appendChild(button);
   parentDiv.appendChild(description);


   let parent = document.querySelector('#gallery');
   div.src = user.src;
   parent.appendChild(parentDiv);

}


function buyNFT(e){
  if(e.target.classList.contains("buy-nft")){
    console.log("buy this particular NFT")
    console.log(accountState.signedIn)
    if(!accountState.signedIn){
      console.log("can't buy item")
    //  console.log(e.target.parentElement.childNodes)
  
    }else{
      console.log(" buy item")
      //console.log(currentUser.images);
      let siblingElements = [...e.target.parentElement.childNodes]
      let img = siblingElements.filter((node)=>{
        return node.classList.contains("showcase")
      })
  
    const url = img[0].src
    console.log(url)
    console.log(img[0].src);
    console.log(currentUser[0].username);
   const nftToOrder = new httpRequest("http://localhost:5000/users/placeorder", currentUser[0].username, url )
    nftToOrder.nftOrderPostRequest();  

 
       window.location.href = "http://localhost:5000/order.html"
    }
 
  }
}





// function updateChangeRequest(e){
// //  console.log(e.target.classList)
//   if(e.target.classList.contains("change-request")){
//   e.preventDefault()

//     console.log('update settings')
//     const sendData = new httpRequest("http://localhost:5000/users/change-request")
//     console.log(e.target.id)
//     if(e.target.id === "change-profile-image" ){
//       sendData.sendProfileSettings(true)
//     }else if(e.target.id === "change-username"){
//       sendData.sendProfileSettings(null, true)

//     }else{
//       sendData.sendProfileSettings(null, null,  true)

//     }

//     console.log("running")
//     window.location.href = 'changeAccountSettings.html';

//   }
// }