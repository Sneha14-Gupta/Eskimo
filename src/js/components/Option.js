import { captilize } from "./utils"; 

export default function (breed) {
  const option = document.createElement("option");
  option.textContent = captilize(breed);
  option.value = breed;
  return option;
}
