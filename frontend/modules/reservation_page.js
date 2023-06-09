import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const res= await fetch(config.backendEndpoint+"/reservations/")
   const data= await res.json();
    return data;
  }
 catch(e){
  return null;
 }


  // Place holder for functionality to work in the Stubs
 
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 if(reservations.length<=0){
  document.getElementById("no-reservation-banner").style.display="block";
  document.getElementById("reservation-table-parent").style.display="none";
 }
 else{
  document.getElementById("reservation-table-parent").style.display="block";
  document.getElementById("no-reservation-banner").style.display="none";
  
 }
let tab= document.getElementById("reservation-table");

reservations.forEach(ele => {
 let date = ele.date.split("-").reverse().join("/").replace("/0","/");
 if(date[0]=="0"){
  date=date.slice(1);
 }
 
let row= document.createElement("tr");
    row.innerHTML = `
<th scope="row">${ele.id}</th>
<td>${ele.name}</td>
<td>${ele.adventureName}</td>
<td>${ele.person}</td>
<td>${date}</td>
<td>${ele.price}</td>
<td class="">${new Date(ele.time).toLocaleString("en-IN",{
day:"numeric",
month:"long",
year:"numeric",
hour:"numeric",
minute:"numeric",
second:"numeric",
hour12:true
}).replace(" at",",")}</td> 
<td><button type="button" class="reservation-visit-button" id=${ele.id}><a href="../detail/?adventure=${ele.adventure}">Visit Adventure</a</button></td>



`;
console.log(date);
    tab.appendChild(row);
  });

{ }

}

export { fetchReservations, addReservationToTable };
