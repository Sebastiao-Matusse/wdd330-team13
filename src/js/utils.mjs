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