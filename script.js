const signIn = document.getElementById("sign-in");
const signUp = document.getElementById("sign-up");
const innerBg = document.getElementById("inner-bg");

const signUpForm = document.getElementById("signUpForm");
const signUpName = document.getElementById("inputSignUpName");
const signUpEmail = document.getElementById("inputSignUpEmail");
const signUpPhone = document.getElementById("inputSignUpPhone");
const signUpPassword = document.getElementById("inputSignUpPassword");
const signUpRetypePassword = document.getElementById("inputRetypePassword");

const cashIn = document.getElementById("inputCashIn");
const cashOut = document.getElementById("inputCashOut");
const balanceDetail = document.getElementById("balanceDetail");
console.log(cashIn, cashOut, balanceDetail);

// show sign up page
function showSignUp() {
  signIn.classList.add("hide");
  signUp.classList.remove("hide");
  innerBg.style.height = "600px";
}

// show sign in page

function showSignIn() {
  signIn.classList.remove("hide");
  signUp.classList.add("hide");
}

//to save user sign up sign in data in local storage

function saveDataToLocalStorage(key, value) {
  const existingData = JSON.parse(localStorage.getItem(key)) || [];
  existingData.push(value);
  localStorage.setItem(key, JSON.stringify(existingData));
}

// check user exists

function isUSerExists(userList, email, phoneNumber) {
  return userList.some(
    (user) => user.signUpEmail === email || user.signUpPhone === phoneNumber
  );
}

//user registration from sign up form

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  let userData = {
    signUpName: signUpName.value,
    signUpEmail: signUpEmail.value,
    signUpPassword: signUpPassword.value,
    signUpPhone: signUpPhone.value,
  };

  const storedUSers = JSON.parse(localStorage.getItem("userList")) || [];
  if (isUSerExists(storedUSers, userData.signUpEmail, userData.signUpPhone)) {
    alert("User with this email or phone number already exists!");
  } else {
    if (signUpPassword.value === signUpRetypePassword.value) {
      saveDataToLocalStorage("userList", userData);
      alert("User registered successfully!");
    } else {
      alert("Password did not match");
    }
  }
});

const signInForm = document.getElementById("signInForm");
const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
const welcomeText = document.getElementById("welcome-text");
const mainBody = document.getElementById("mainBody");
const bankPortal = document.getElementById("bankPortal");
console.log(bankPortal);

// user signing in the account

signInForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const storedUsers = JSON.parse(localStorage.getItem("userList")) || [];

  const foundUser = storedUsers.find(
    (user) =>
      user.signUpEmail === signInEmail.value &&
      user.signUpPassword === signInPassword.value
  );

  if (foundUser) {
    updateUserUI(foundUser);
    showWelcomeNote();
    setTimeout(() => {
      showBankPortal();
    }, 3000);
  } else {
    alert("Please Enter Correct Information");
  }
});

// welcome note

function showWelcomeNote() {
  welcomeText.classList.remove("hide");
  mainBody.classList.add("hide");
}

// bank Portal

function showBankPortal() {
  welcomeText.classList.add("hide");
  bankPortal.classList.remove("hide");
  updateUserUI();
}

// transaction video

function userTransactionImage(videoSrc){
  let video = document.getElementById("transactionVideo");
  const videoSource = document.querySelector("#transactionVideo source");

  video.src = videoSrc;
  video.load()
  video.classList.remove("hide")

  setTimeout(() => {
    video.classList.add("hide");
    video.pause();
    video.src = "";
  }, 3000)
}

// update UI Balance and name and email
function updateUserUI(user) {
  const activeUserName = document.getElementById("activeUserName");
  const activeUserEmail = document.getElementById("activeUserEmail");
  const balanceDetail = document.getElementById("balanceDetail");

  activeUserName.innerText = user.signUpName;
  activeUserEmail.innerText = user.signUpEmail;

  // Get and update the balance from local storage
  const storedBalance = parseFloat(localStorage.getItem(user.signUpEmail)) || 0;
  balanceDetail.innerText = storedBalance.toFixed(2);
}

// cashDeposited

function cashDeposited() {
  const activeUserEmail = document.getElementById("activeUserEmail").innerText;

  const value = parseFloat(cashIn.value);

  if (value <= 0) {
    alert("Please enter a valid amount to deposit.");
    return;
  }

  const storedBalance = parseFloat(localStorage.getItem(activeUserEmail)) || 0;
  const newBalance = storedBalance + value;

  localStorage.setItem(activeUserEmail, newBalance.toFixed(2));
 
  const balanceDetail = document.getElementById("balanceDetail");
  balanceDetail.innerText = newBalance.toFixed(2);

  cashIn.value = "";
  
  userTransactionImage("Assets/Cash Deposited.mp4");
}

//  withdraw

function cashWithdraw() {
  const activeUserEmail = document.getElementById("activeUserEmail").innerText;
  const value = parseFloat(cashOut.value);
  if (value <= 0) {
    alert("Please enter a valid amount to withdraw.");
    return;
  }
  const currentBalance = parseFloat(localStorage.getItem(activeUserEmail)) || 0;

  if (value > currentBalance) {
    alert("Insufficient balance for withdrawal.");
    return;
  }
  const updatedBalance = currentBalance - value;
  localStorage.setItem(activeUserEmail, updatedBalance.toFixed(2));

  const balanceDetail = document.getElementById("balanceDetail");
  balanceDetail.innerText = updatedBalance.toFixed(2);

  cashOut.value = "";

  userTransactionImage("Assets/Cash Withdraw.mp4");
}

// chart data
const chartData = {
  labels: ["May", "June", "July"],
  data: [0, 0, 11000],
};
console.log(chartData);

const myChart = document.querySelector(".myChart");

new Chart(myChart, {
  type: "bar",
  data: {
    labels: chartData.labels,
    datasets: [
      {
        label: "Cash Flow",
        data: chartData.data,
      },
    ],
  },
  options: {
    borderWidth: 10,
    borderRadius: 2,
    hoverBorderWidth: 0,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});


// logOut

const logOut = document.getElementById("logOut");
logOut.addEventListener("click", function () {
  bankPortal.classList.add("hide");
  mainBody.classList.remove("hide");
});

// toogling
const accountDetails = document.getElementById("accountDetails");
const faqPage = document.getElementById("faqPage");
const FAQ = document.getElementById("faq");
const dashboard = document.getElementById("dashboard");
const newsPage = document.getElementById("newsPage");
const newsletter = document.getElementById("newsletter")
console.log(dashboard);
// move dashbaord to faq
FAQ.addEventListener("click", function(){
  // accountDetails.innerHTML = faqPage.innerHTML
  faqPage.classList.remove("hide");
  accountDetails.classList.add("hide")
  newsPage.classList.add("hide"); 
})
// move faq to dashboard
dashboard.addEventListener("click", function(){
  // faqPage.innerHTML = accountDetails.innerHTML;
  newsPage.classList.add("hide"); 
  faqPage.classList.add("hide");
  accountDetails.classList.remove("hide")
})
// move dashboard to newsletter
newsletter.addEventListener("click", function(){
  newsPage.classList.remove("hide");
  accountDetails.classList.add("hide")
  faqPage.classList.add("hide");
})