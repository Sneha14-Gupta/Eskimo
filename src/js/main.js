import Option from "./components/Option";
import SingleCarousel from "./components/singleCarousel";
// https://dog.ceo/api/breeds/list/all
// https://dog.ceo/api/breed/affenpinscher/images/random
// https://dog.ceo/api/breed/hound/images

//  dom targeting
const BASE_URL = `https://dog.ceo/api/`;
const carouselConatinerEl = document.querySelector(".carousel-inner");
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

//fetch images for a dog breed
async function getDogsImages(breed) {
  try {
    const res = await fetch(`${BASE_URL}breed/${breed}/images`);
    const data = await res.json();
    return data.message.slice(0, 10);
  } catch (err) {
    console.error("Error Occured");
  }

  //   return fetch(`${BASE_URL}breed/${breed}/images/random`)
  //     .then((res) => res.json())
  //     .then((data) => data.message);
}

// MARK:render
// render multiple breed option for select
async function renderSelect() {
  const dogList = await getDogsList();
  const fragment = document.createDocumentFragment();
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

async function renderImageCarousel(breed) {
  const data = await getDogsImages(breed);

  const fragment = document.createDocumentFragment();

  data.forEach((link, index) => {
    fragment.appendChild(SingleCarousel(link, index === 0));
  });
  carouselConatinerEl.appendChild(fragment);

  // const singleCarouselEl=SingleCarousel("https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=")
  // carouselConatinerEl.appendChild(singleCarouselEl)
  // imgEl.src = `loading_img.gif`;
  // const dogImg = await getDogsImages(breed);
  // imgEl.src = dogImg;
  // imgEl.alt = breed;
  //   getDogsImg(breed).then((data) => {
  //     imgEl.src = data;
  //   });
}


dataBreedList.addEventListener("change", async (e) => {
  const currentInput = e.target.value;
  renderImageCarousel(currentInput);
});

// initial rendering
document.addEventListener("DOMContentLoaded", () => {
  renderSelect();
  renderImageCarousel("affenpinscher")
});
