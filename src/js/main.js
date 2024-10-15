import Option from "./components/Option";
// https://dog.ceo/api/breeds/list/all
// https://dog.ceo/api/breed/affenpinscher/images/random

//  dom targeting
const BASE_URL = `https://dog.ceo/api/`;
const imgEl = document.querySelector("img");
const dataBreedList = document.querySelector("#data-breed-list");

//  async function getData(){
//     const res=await fetch(`https://dog.ceo/api/breed/affenpinscher/images/random`);
//     const data=await res.json();
//     console.log(data.message);
//     imgEl.src=data.message;
// }
// getData();

// MARK: fetch
function getDogsList() {
   return fetch(`${BASE_URL}breeds/list/all`)
    .then((res) => res.json())
    .then((data) =>data.message)
    .catch((err) => console.error("error", err))
    ;
}
// 
function getDogsImg(breed) {}

function renderSelect(){
    getDogsList().then((breedList)=>{
        for(let breed in breedList){
            dataBreedList.appendChild(Option(breed))
           
        }
    })

    // const option=document.createElement("option")
    // option.textContent="some data"
    // option.value="some value"
    // dataBreedList.appendChild(option);

}
renderSelect();

function renderImage(){
    

}