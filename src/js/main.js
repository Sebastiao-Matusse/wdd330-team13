import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { formValidation } from "./utils.mjs";
// const newsLetterForm = document.querySelector("form")
const formElement = document.querySelector("form");
const emailInput = document.querySelector("#email");

const listElement = document.querySelector(".product-list");
const dataSource = new ProductData("tents");

const productList = new ProductList("tents", dataSource, listElement);
productList.init();

formValidation(formElement, emailInput);
