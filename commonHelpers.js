import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */const o=document.querySelector("button[data-start]"),r=document.querySelector("button[data-stop]");o.addEventListener("click",u);r.addEventListener("click",d);let n=null,a=null;function u(){a=document.body.style.backgroundColor,n=setInterval(c,1e3),e(o,!0),e(r,!1)}function d(){clearInterval(n),document.body.style.backgroundColor=a,e(o,!1),e(r,!0)}function c(t=i()){document.body.style.backgroundColor=t}function i(){return`#${Math.floor(Math.random()*16777215).toString(16)}`}function e(t,l=!0){l?t==null||t.setAttribute("disabled",!0):t==null||t.removeAttribute("disabled"),console.log(`Set button "${t.textContent}" state to ${l?"disabled":"enabled"}`)}
//# sourceMappingURL=commonHelpers.js.map
