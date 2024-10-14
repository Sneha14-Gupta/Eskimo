 const imgEl=document.querySelector('img')
 
 async function getData(){
    const res=await fetch(`https://dog.ceo/api/breed/affenpinscher/images/random`);
    const data=await res.json();
    console.log(data.message);
    imgEl.src=data.message;



}
getData();
