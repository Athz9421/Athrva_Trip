import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
const ulr=new URLSearchParams(search);
  // Place holder for functionality to work in the Stubs
  return ulr.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const result=await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
      const data= await result.json();
     return data;
  } catch (err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
 
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
 document.getElementById("adventure-name").innerHTML=adventure.name;
 document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;
  document.getElementById("adventure-content").innerHTML=adventure.content;
  adventure.images.forEach(img=>{
    let d= document.createElement("div");
    d.className="activity-card-image"
    d.innerHTML=`<img src="${img}" alt="Girl in a jacket">`
    document.getElementById("photo-gallery").append(d);
  })


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let img=document.getElementById("photo-gallery");
  img.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators" id="carousel-indicators">

  </div>
  <div class="carousel-inner" id="carousel-inner">
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

images.forEach((img , imgIndex) => {
  let carouselElement= document.createElement("div");
  carouselElement.className="activity-card-image";
  let Eleactive= imgIndex===0 ? " active":"";
  carouselElement.className=`carousel-item${Eleactive}`
 carouselElement.innerHTML=` <img src="${img}" class="d-block w-100 " alt="">`
 document.getElementById("carousel-inner").append(carouselElement);

 let indicators=`<button type="button"
  data-bs-target="#carouselExampleIndicators" 
  data-bs-slide-to=${imgIndex}
  ${imgIndex===0 ?`class="active"`:""}
  aria-current="true" 
  aria-label="Slide ${imgIndex+1}">
     </button>`
    
document.getElementById("carousel-indicators").innerHTML+=indicators;

});
console.log()
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML= adventure.costPerHead;
  }
else{
  document.getElementById("reservation-panel-available").style.display = "none";
  document.getElementById("reservation-panel-sold-out").style.display = "block";
}

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

 document.getElementById("reservation-cost").innerHTML= adventure.costPerHead*persons;
 

}

//Implementation of reservation form submission
function  captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fais, just show an alert with "Failed!".
let myform=document.getElementById("myForm");
myform.addEventListener("submit", async function(event){
event.preventDefault();
  let formEle =myform.elements ;
  let bodyaEle= JSON.stringify({
  
    name:formEle["name"].value,
    date:formEle["date"].value,
    person:formEle["person"].value,
    adventure:adventure.id
});
try{
  const newLocal = "http://3.111.211.235:8082/reservations/new";
  let res=await fetch(newLocal,{

method:'post',
body: bodyaEle,
headers:{
  "Content-Type":"application/json",
},

  });
  if(res.ok){
alert("Success!");
window.location.reload();
  }
  else{
    let data= await res.json();
    alert(`The requiest id Failed-${data}`);
  }
} catch(e){
  console.log(e);
  alert("Fetch call is Failed");
}





});
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block"
  }
else{
  document.getElementById("reserved-banner").style.display="none"
}

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
