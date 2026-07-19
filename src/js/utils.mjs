// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product');
  return product
}


export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  };
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));

}


export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template
  if (callback) {
    callback(data);
  };

}

async function loadTemplate(path) {
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const template = await response.text();
    return template
    // return stringify(HTMLContent)
    console.log(HTMLContent);
  } catch (error) {
    console.log("There was a problem with the fetch operation:", error)
  }
}

//                  ** Own solutio **n
// export async function loadHeaderFooter() {
//   const mainHeader = document.querySelector("#main-header");
//   const mainFooter = document.querySelector("#main-footer");
//   const productPageFootwer = document.querySelector("#product-page-footer");

//   const headerTemplate = await loadTemplate("../partials/header.html");

//   if (mainFooter) {
//     const footerTemplate = await loadTemplate("../partials/footer.html");
//     renderWithTemplate(footerTemplate, mainFooter);
//   }

//   if (productPageFootwer) {
//     const footerProductPageTemplate = await loadTemplate("../partials/product-page-footer.html");
//     renderWithTemplate(footerProductPageTemplate, productPageFootwer);

//   }

//   renderWithTemplate(headerTemplate, mainHeader);
// }



//              ** instructor's solution **
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}




// this function for now only check the validity of
// a form that submits an email. It could expanded to
// check the validity of any other kind of forms in the 
// project, by passing it more broader parameters
export function formValidation(form, emailInput) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    emailInput.setCustomValidity("");

    if (emailInput.validity.valueMissing) {
      emailInput.setCustomValidity("Please enter your email address.");
    } else if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity("Please enter a valid email address.");
    }

    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    alert("Congratulations, your registration was completed. Thank you!");
    emailInput.value = "";
  });
}