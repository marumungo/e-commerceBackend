// const form = document.querySelector("#cookieForm");

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const data = new FormData(form);

//     const obj = {};
//     data.forEach((value, key) => obj[key] = value);

//     fetch("/api/sessions/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(obj)
//     })
//     .then (respuesta => respuesta.json())
//     .then (respuesta => { 
//         console.log(respuesta);
//         localStorage.setItem("token", respuesta.access_token);
//     });
// });

// const getCookie = () => {
//     console.log(document.cookie)
// };


// console.log('index.js')

// fetch('http://localhost:8080/api/products', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
//     .then(respuesta => respuesta.json())
//     .then(respuesta =>{ 
//         console.log(respuesta.payload)
//         let html = ``
//         const productList = document.querySelector('#productList')
//         respuesta.payload.map(product => {
//             return html+= 
//             `<div class="card w-25">
//                 <div class="card-header">
//                     ${product.title}
//                 </div>
//                 <div class="card-body">
//                     Precio: ${product.price}
//                 </div>
//                 <div class="card-footer">
//                     <button class="btn btn-outline-primary w-100">Detalle</button>
//                 </div>
//             </div>`
//         })
//         productList.innerHTML = html

//     })
//     .catch(error => console.log(error))
