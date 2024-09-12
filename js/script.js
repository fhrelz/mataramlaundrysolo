// toogle classs active hamburger menu
const navbarnav = document.querySelector(".navbar-nav");
// ketika humberger menu diklik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarnav.classList.toggle("active");
  e.preventDefault();
};

// toogle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// toogle class active untuk shopping-card
const shoppingCard = document.querySelector(".shopping-card");
document.querySelector("#shopping-card-button").onclick = (e) => {
  shoppingCard.classList.toggle("active");
  e.preventDefault();
};

// klik diluar element
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-card-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarnav.contains(e.target)) {
    navbarnav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCard.contains(e.target)) {
    shoppingCard.classList.remove("active");
  }
});

// modal box
const itemDetailmModal = document.querySelector("#item-detail-modal");
const itemDetailmButtons = document.querySelectorAll(".item-detail-button");

itemDetailmButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailmModal.style.display = "flex";
    e.preventDefault();
  };
});

// tombol close modal
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailmModal.style.display = "none";
  e.preventDefault();
};

// klik diluar modal
window.onclick = (e) => {
  if (e.target === itemDetailmModal) {
    itemDetailmModal.style.display = "none";
  }
};
