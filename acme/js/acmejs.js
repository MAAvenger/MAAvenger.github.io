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
console.log(productName);



document.getElementById('product_name').innerHTML = productName;
document.getElementById('product_image').setAttribute('src',productPath);
})
.catch(function(error){
    console.log('There was a fetch problem: ', error.message);
})
})

