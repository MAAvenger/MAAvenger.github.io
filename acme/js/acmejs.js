// Event listener
let pageNav = document.getElementById('page-nav');
let homeContainer = document.getElementById('homepage');
let contentContainer = document.getElementById('product_content');
pageNav.addEventListener('click', function(evt){
let sitePage = evt.target.innerHTML;
switch(sitePage) {
  case "Home":
      homeContainer.setAttribute('class', '');
      contentContainer.setAttribute('class','hide');
      break;
   case "Anvils":
     case "Explosives":
         case "Decoys":
             case "Traps":
                    homeContainer.setAttribute('class', 'hide');
                    contentContainer.setAttribute('class','');
       evt.preventDefault();
   break;
}

let URL = "https://maavenger.github.io/acme/js/acme.json";

fetch(URL)
.then(function(response){
if(response.ok){
    return response.json();
}
throw new ERROR('Network response was not OK');
})
.then(function(data){
    let a = data[sitePage];
console.log(data);
let productName = a.name;
let productPath = a.path
let productDesc = a.description;
let manufacturer = a.manufacturer;
let price = a.price;
let reviews = a.reviews;
console.log(productName);



document.getElementById('product_name').innerHTML = productName;
document.getElementById('product_image').setAttribute('src',productPath);
document.getElementById('content_desc').innerHTML = productDesc;
document.getElementById('manufacturer').innerHTML = " " + manufacturer;
document.getElementById('price').innerHTML = " $" + price;
document.getElementById('reviews').innerHTML = " " + reviews + "/5";
})
.catch(function(error){
    console.log('There was a fetch problem: ', error.message);
})
})

