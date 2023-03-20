// close open sideNav

$("#openTap").click(() => {
  slideupNav();
  // new WOW({}).init();
  $("#closeTap").removeClass("d-none");
  $("#openTap").addClass("d-none");
  $("nav").animate({ left: `0px` });
});
$("#closeTap").click(() => {
  slideDown();
  let tabs = Array.from($("nav ul li"));
  tabs.forEach((item) => {
    item.animate({ top: "300px" });
  });
  let leftWidth = $("nav .nav-link").width();
  $("#openTap").removeClass("d-none");
  $("#closeTap").addClass("d-none");
  $("nav").animate({ left: `-${leftWidth}` });
});
// /data main home refresh
async function getData() {
  $(".loaderParent").removeClass("d-none");
  $("body").css("overflow", "hidden");
  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let respons = await api.json();
  $("body").css("overflow", "auto");

  $(".loaderParent").addClass("d-none");

  displayLoad(respons.meals);
}
getData();
// funccition display meals
function displayLoad(data) {
  let cartona = ``;
  if (data.length < 20) {
    for (let i = 0; i < data.length; i++) {
      cartona += `
    <div class="col-md-3 col-sm-6 mb-3" data-bs-target="${data[i].idMeal}">
    <div class="card position-relative rounded-2 overflow-hidden text-center">
      <img src="${data[i].strMealThumb}" alt="" width="100%" />
      <div
        class="card-layer position-absolute rounded-2 overflow-hidden"
      >
        <h4>${data[i].strMeal}</h4>
      </div>
    </div>
  </div>
    `;
    }
  } else {
    for (let i = 0; i < 20; i++) {
      cartona += `
    <div class="col-md-3 col-sm-6 mb-3" data-bs-target="${data[i].idMeal}">
    <div class="card position-relative rounded-2 overflow-hidden text-center">
      <img src="${data[i].strMealThumb}" alt="" width="100%" />
      <div
        class="card-layer position-absolute rounded-2 overflow-hidden"
      >
        <h4>${data[i].strMeal}</h4>
      </div>
    </div>
  </div>
    `;
    }
  }
  document.getElementById("cartona").innerHTML = cartona;
  let cards = Array.from($(".card").parent());
  getidCard(cards);
}
// get id to display det by id
function getidCard(cards) {
  cards.forEach((item) => {
    item.addEventListener("click", () => {
      displayDet($(item).attr("data-bs-target"));
      $("#cartona").addClass("d-none");

      $("#detCartona").removeClass("d-none");
    });
  });
}
// display Detials
async function displayDet(id) {
  $(".loaderParent").removeClass("d-none");
  $("body").css("overflow", "hidden");

  $("#srachMeals").html("");
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let respons = await api.json();
  $("body").css("overflow", "auto");

  $(".loaderParent").addClass("d-none");

  console.log(respons);
  displayDetialis(respons.meals[0]);
}
function displayDetialis(data) {
  let tagsArr = data.strTags?.split(",");
  if (!tagsArr) tagsArr = [];
  let tags = ``;
  for (let i = 0; i < tagsArr.length; i++) {
    tags += `
    <span class="tagsDet">${tagsArr[i]}</span>
    `;
  }

  let ingred = ``;
  for (let i = 1; i <= 20; i++) {
    // let numstrMeasure = `strMeasure + ${i}`;
    // let numstrIngredient = `strIngredient${i}`;
    if (data[`strIngredient${i}`] != "") {
      ingred += `
      <span class="recDet">${data[`strMeasure${i}`]} ${
        data[`strIngredient${i}`]
      }</span>
      `;
    }
  }
  console.log(ingred);
  let detCartona = `
  <i class="fa-solid fa-xmark" id='closeDet'></i>
  <div class="col-md-4">
  <img
    src="${data.strMealThumb}"
    width="100%"
    class="mb-2 rounded-3"
    alt=""
  />
  <h2 class="text-white">${data.strMeal}</h2>
</div>
<div class="col-md-8">
  <div class="des-detaialis text-white text-start">
    <h1>Instructions</h1>
    <p>
    ${data.strInstructions}
    </p>
    <h2>Area : Turkish</h2>
    <h3>Category : Side</h3>
  </div>
  <div class="Recipes">
    <h3 class="text-white mb-4">Recipes :</h3>
    ${ingred}
  </div>
  <div class="Tags mb-3">
    <h3 class="text-white mt-3 mb-4">Tags :</h3>
    ${tags}
  </div>
  <div class="buttonsLinks mb-5 ms-2">
    <a href="${data.strSource}" class="btn btn-success me-2" target='_blankl'>Source</a>
    <a href="${data.strYoutube}" class="btn btn-danger" target='_blankl'>Youtube</a>
  </div>
</div>
  
  `;

  document.getElementById("detCartona").innerHTML = detCartona;

  $("#closeDet").click(() => {
    $("#detCartona").addClass("d-none");
    $("#cartona").removeClass("d-none");
  });
}
// show seaerssh Inpnuts
function showsearchInp() {
  $("#detCartona").html("");

  $("#cartona").html(``);
  $("#srachMeals").html(`
    <input
    type="search"
    placeholder="Ssearch By Name"
    class="form-control mb-3"
    id="ssearchbyName"
    onkeyup="searchbyName(this.value)"
  />
  <input
    type="search"
    placeholder="Ssearch By First Letter"
    class="form-control mb-3"
    id="ssearchbyfirstLetter"
    maxlength = '1'
    onkeyup="ssearchbyfirstLetter(this.value)"
  />
    `);
}
// get data Searssh By name
async function searchbyName(val) {
  $(".loaderParent").removeClass("d-none");
  $("body").css("overflow", "hidden");

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
  );
  let respons = await api.json();
  $("body").css("overflow", "auto");

  $(".loaderParent").addClass("d-none");

  displayLoad(respons.meals);
}
// get data Searssh By First Letter
async function ssearchbyfirstLetter(val) {
  $(".loaderParent").removeClass("d-none");
  $("body").css("overflow", "hidden");

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
  );
  let respons = await api.json();
  $("body").css("overflow", "auto");

  $(".loaderParent").addClass("d-none");

  displayLoad(respons.meals);
}
// function checkinputlen(val) {}/
// close sideNav Into click in any tap
$("nav .nav-link .links ul li ").click(function () {
  slideDown();
  checkHiegth();
  $("#detCartona").html("");
  let leftWidth = $("nav .nav-link").width();
  $("#openTap").removeClass("d-none");
  $("#closeTap").addClass("d-none");
  $("nav").animate({ left: `-${leftWidth}` });
});
function checkHiegth() {
  let tabs = Array.from($("nav .nav-link .links ul li "));
  tabs.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.innerText != "Contact Us") {
        $("#cartona").removeClass("h-100");
        $("#cartona").addClass("h-auto");
        $("body").css("overflow", "auto");
      }
    });
  });
}
// show Caategorys
async function showCategory() {
  $("#srachMeals").html("");

  $(".loaderParent").removeClass("d-none");
  $("body").css("overflow", "hidden");

  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let respons = await api.json();
  $("body").css("overflow", "auto");

  $(".loaderParent").addClass("d-none");

  let data = respons.categories;
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    cartona += `
    <div class="col-md-3 mb-3" data-bs-target="${data[i].strCategory}">
    <div class="card position-relative rounded-2 overflow-hidden bg-transparent">
      <img src="${data[i].strCategoryThumb}" alt="" width="100%" />
      <div
        class="card-layer categ position-absolute rounded-2 overflow-hidden"
      >
        <h4>${data[i].strCategory}</h4>
        <p>${data[i].strCategoryDescription}</p>
      </div>
    </div>
  </div>
    `;
  }

  document.getElementById("cartona").innerHTML = cartona;
  let cards = Array.from($(".card").parent());
  categoryFilter(cards);
}
function categoryFilter(cards) {
  cards.forEach((item) => {
    item.addEventListener("click", () => {
      getcatFilt($(item).attr("data-bs-target"));
    });
  });
}
// data Category Filter
async function getcatFilt(id) {
  $(".loaderParent").removeClass("d-none");
  $("body").css("overflow", "hidden");

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
  );
  let respons = await api.json();
  $("body").css("overflow", "auto");

  $(".loaderParent").addClass("d-none");

  console.log(respons);
  displayLoad(respons.meals);
}
// show area
async function displayArea() {
  $("#srachMeals").html("");

  $(".loaderParent").removeClass("d-none");
  $("body").css("overflow", "hidden");

  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let respons = await api.json();
  $("body").css("overflow", "auto");

  $(".loaderParent").addClass("d-none");

  let data = respons.meals;
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    cartona += `
    <div class="col-md-3 mb-3" data-bs-target="${data[i].strArea}">
    <div class="card area position-relative rounded-2 overflow-hidden bg-transparent">
    <i class="fa-solid fa-house-laptop"></i>
    <h3>${data[i].strArea}</h3>
    </div>
  </div>
    `;
  }

  document.getElementById("cartona").innerHTML = cartona;
  let cards = Array.from($(".card").parent());
  areaFilter(cards);
}
function areaFilter(cards) {
  cards.forEach((item) => {
    item.addEventListener("click", () => {
      getareaFilt($(item).attr("data-bs-target"));
    });
  });
}
// area Filter data
async function getareaFilt(id) {
  $(".loaderParent").removeClass("d-none");
  $("body").css("overflow", "hidden");

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`
  );
  let respons = await api.json();
  $("body").css("overflow", "auto");

  $(".loaderParent").addClass("d-none");

  console.log(respons);
  displayLoad(respons.meals);
}
// show ingred
async function displayIngred() {
  $("#srachMeals").html("");

  $(".loaderParent").removeClass("d-none");
  $("body").css("overflow", "hidden");

  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let respons = await api.json();
  $("body").css("overflow", "auto");

  $(".loaderParent").addClass("d-none");

  let data = respons.meals;
  let cartona = ``;
  for (let i = 0; i < 20; i++) {
    cartona += `
    <div class="col-md-3 mb-3" data-bs-target="${data[i].strIngredient}">
    <div class="card ingred position-relative rounded-2 overflow-hidden bg-transparent ">
    <i class="fa-solid fa-drumstick-bite"></i>
    <h3>${data[i].strIngredient}</h3>
    <p>${data[i].strDescription}</p>
    </div>
  </div>
    `;
  }

  document.getElementById("cartona").innerHTML = cartona;
  let cards = Array.from($(".card").parent());
  ingredFilter(cards);
}
function ingredFilter(cards) {
  cards.forEach((item) => {
    item.addEventListener("click", () => {
      getingredFilt($(item).attr("data-bs-target"));
      // console.log($(item).attr("data-bs-target"));
    });
  });
}
// ingred Filter
async function getingredFilt(id) {
  $(".loaderParent").removeClass("d-none");
  $("body").css("overflow", "hidden");

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`
  );
  let respons = await api.json();
  $("body").css("overflow", "auto");

  $(".loaderParent").addClass("d-none");

  console.log(respons);
  displayLoad(respons.meals);
}
// show contact Inputs
function showContact() {
  $("#srachMeals").html("");
  $("#cartona").removeClass("h-auto");
  $("#cartona").addClass("h-100");
  $("body").css("overflow", "hidden");

  let cartona = ``;
  $("#cartona").html("");
  cartona += `
  <div
  class="conta-contact d-flex align-items-center h-100 justify-content-center"
  id="contactCart"
>
  <div
    class="row contact d-flex text-center flex-wrap align-items-center justify-content-between"
  >
    <div class="col-md-6">
      <input
        type="text"
        name=""
        id="userName"
        onkeyup="nameValid()"
        placeholder="Enter Your Name"
        class="form-control"
      />
      <span class="alert alert-danger w-100 mt-2 d-none" id="valName">
        Special characters and numbers not allowed
      </span>
    </div>
    <div class="col-md-6">
      <input
        type="email"
        name=""
        onkeyup="emailValid()"
        id="userEmail"
        placeholder="Enter Your Email"
        class="form-control"
      />

      <span class="alert alert-danger w-100 mt-2 d-none" id="valEmail">
        Email not valid *exemple@yyy.zzz
      </span>
    </div>
    <div class="col-md-6">
      <input
        type="text"
        onkeyup="phoneValid()"
        name=""
        id="userPhone"
        placeholder="Enter Your Phone"
        class="form-control"
      />

      <span class="alert alert-danger w-100 mt-2 d-none" id="valNumber">
        Enter valid Phone Number
      </span>
    </div>
    <div class="col-md-6">
      <input
        type="number"
        name=""
        onkeyup="ageValid()"
        id="userAge"
        placeholder="Enter Your Age"
        class="form-control"
      />

      <span class="alert alert-danger w-100 mt-2 d-none" id="valAge"
        >Enter valid age</span
      >
    </div>
    <div class="col-md-6">
      <input
        type="password"
        name=""
        onkeyup="passwordValid()"
        id="userPass"
        placeholder="Enter Your Password"
        class="form-control"
      />
      <span class="alert alert-danger w-100 mt-2 d-none" id="valPass">
        Enter valid password *Minimum eight characters, at least one
        letter and one number:*
      </span>
    </div>
    <div class="col-md-6">
      <input
        type="password"
        name=""
        onkeyup="repasswordValid()"
        id="userRepass"
        placeholder="Repassword"
        class="form-control"
      />

      <span class="alert alert-danger w-100 mt-2 d-none" id="valRepass">
        It's Diffrent Repassword
      </span>
    </div>

    <button
      id="submitBtn"
      disabled=""
      class="btn btn-outline-danger px-2 mt-3 m-auto w-auto"
    >
      Submit
    </button>
  </div>
</div>
  `;
  $("#cartona").html(cartona);
}
// validition inputs
var name = "";
var email = "";
var phone = "";
var age = "";
var pass = "";
var repass = "";
function inputsValid() {
  if (name && email && phone && age && pass && repass) {
    $("#submitBtn").removeAttr("disabled");
  } else {
    $("#submitBtn").attr("disabled", true);
  }
}

function nameValid() {
  let result = /^[a-zA-Z ]+$/.test($("#userName").val());
  nameAlert(result);
  name = result;
  inputsValid();
}

function emailValid() {
  let result =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      $("#userEmail").val()
    );
  emailAlert(result);
  email = result;
  inputsValid();
}

function phoneValid() {
  let result = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    $("#userPhone").val()
  );
  phoneAlert(result);
  phone = result;
  inputsValid();
}

function ageValid() {
  let result = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    $("#userAge").val()
  );
  ageAlert(result);
  age = result;
  inputsValid();
}

function passwordValid() {
  let result = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    $("#userPass").val()
  );
  passAlert(result);
  pass = result;
  inputsValid();
}

function repasswordValid() {
  let result = $("#userRepass").val() == $("#userPass").val();
  repassAlert(result);
  repass = result;
  inputsValid();
}
// valAlert//////////////////////////////////////

function nameAlert(vald) {
  if (vald) {
    $("#valName").removeClass("d-block").addClass("d-none");
  } else {
    $("#valName").removeClass("d-none").addClass("d-block");
  }
}
function emailAlert(vald) {
  if (vald) {
    $("#valEmail").removeClass("d-block").addClass("d-none");
  } else {
    $("#valEmail").removeClass("d-none").addClass("d-block");
  }
}
function phoneAlert(vald) {
  if (vald) {
    $("#valNumber").removeClass("d-block").addClass("d-none");
  } else {
    $("#valNumber").removeClass("d-none").addClass("d-block");
  }
}
function ageAlert(vald) {
  if (vald) {
    $("#valAge").removeClass("d-block").addClass("d-none");
  } else {
    $("#valAge").removeClass("d-none").addClass("d-block");
  }
}
function passAlert(vald) {
  if (vald) {
    $("#valPass").removeClass("d-block").addClass("d-none");
  } else {
    $("#valPass").removeClass("d-none").addClass("d-block");
  }
}
function repassAlert(vald) {
  if (vald) {
    $("#valRepass").removeClass("d-block").addClass("d-none");
  } else {
    $("#valRepass").removeClass("d-none").addClass("d-block");
  }
}
function slideupNav() {
  for (let i = 0; i < 5; i++) {
    $("nav .nav-link .links ul li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}
function slideDown() {
  $("nav .nav-link .links ul li").animate({ top: 300 }, 500);
}
