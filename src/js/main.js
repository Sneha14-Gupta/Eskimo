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
async function getDogsList() {
    let breeds = JSON.parse(localStorage.getItem("breeds"));
  
    if (!breeds) {
      try {
        const res = await fetch(`${BASE_URL}breeds/list/all`);
        const data = await res.json();
        localStorage.setItem("breeds", JSON.stringify(data.message));
        breeds = data.message;
      } catch (err) {
        console.error("Error occured", err);
      }
    }
  
    return breeds;
  }
// async function getDogsList() {

//   try {
//     const res = await fetch(`${BASE_URL}breeds/list/all`);
//     const data = await res.json();
//     return data.message;
//   } catch (err) {
//     console.error("Error Occured");
//   }
//   //    return fetch(`${BASE_URL}breeds/list/all`)
//   //     .then((res) => res.json())
//   //     .then((data) =>data.message)
//   //     .catch((err) => console.error("error", err))
//   //     ;
// }
//
async function getDogsImg(breed) {
  try {
    const res = await fetch(`${BASE_URL}breed/${breed}/images/random`);
    const data = await res.json();
    return data.message;
  } catch (err) {
    console.error("Error Occured");
  }

  //   return fetch(`${BASE_URL}breed/${breed}/images/random`)
  //     .then((res) => res.json())
  //     .then((data) => data.message);
}

async function renderSelect() {
  const dogList = await getDogsList();
  const fragment=document.createDocumentFragment()
  Object.keys(dogList).forEach((dogName) => {
    fragment.appendChild(Option(dogName));
  });
  dataBreedList.append(fragment);
  //   getDogsList().then((breedList) => {
  //     for (let breed in breedList) {
  //       dataBreedList.appendChild(Option(breed));
  //     }
}

// const option=document.createElement("option")
// option.textContent="some data"
// option.value="some value"
// dataBreedList.appendChild(option);
renderSelect();

async function renderImage(breed) {
  imgEl.src = `loading_img.gif`;
  const dogImg = await getDogsImg(breed);
  imgEl.src = dogImg;
  imgEl.alt = breed;
  //   getDogsImg(breed).then((data) => {
  //     imgEl.src = data;
  //   });
}

dataBreedList.addEventListener("change", async (e) => {
  const currentValue = e.target.value;
  renderImage(currentValue);
});

document.addEventListener("DOMContentLoaded", () => {
  renderSelect();
});
