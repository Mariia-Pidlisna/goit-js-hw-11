
// // У файлі main.js напиши всю логіку роботи додатка. 
// // Виклики нотифікацій iziToast, усі перевірки на довжину масиву 
// // в отриманій відповіді робимо саме в цьому файлі. Імпортуй в 
// // нього функції із файлів pixabay-api.js та render-functions.js 
// // та викликай їх у відповідний момент.

import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconError from "./img/error.svg"

const form = document.querySelector(".form");

form.addEventListener("submit", event => {
  event.preventDefault();

  const query = event.target.elements["search-text"].value.trim().toLowerCase();

  if (query === "") {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query.",
      position: "topRight",
      backgroundColor: "#ef4040",
      titleColor: "#fff",
      messageColor: "#fff",
    });
    return;
  }

  clearGallery();
  showLoader();
  
    getImagesByQuery(query)
      .then(data => {
        if (data.hits.length === 0) {
          iziToast.error({
            title: "Error",
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight",
            backgroundColor: "#ef4040",
            titleColor: "#fff",
            messageColor: "#fff",
            iconUrl: iconError,
          });
          return;
        }
  
    createGallery(data.hits);
    form.reset();
        
      })
      .catch(error => {
        iziToast.error({
          title: "Error",
          message: "Something went wrong. Please try again later!",
          position: "topRight",
          backgroundColor: "#ef4040",
          titleColor: "#fff",
          messageColor: "#fff",
        });
        console.log("Fetch error:", error);
      })
      .finally(() => {
        hideLoader();
      });
  });
  
