const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

// Image switcher
document.addEventListener('DOMContentLoaded', function () {
    var MainImg = document.getElementById("MainImg");
    var smallimg = document.getElementsByClassName("small-img");

    for (let i = 0; i < smallimg.length; i++) {
        smallimg[i].addEventListener('click', function () {
            MainImg.src = smallimg[i].src;
        });
    }
});

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// document.getElementById("shopNow").addEventListener("click", function () {
//     document.querySelector(".btnLogin-popup").click();
// });

const shopNowButton = document.getElementById("shopNow");

if (shopNowButton) {
    shopNowButton.addEventListener("click", function () {
        const loginPopupButton = document.querySelector(".btnLogin-popup");
        if (loginPopupButton) {
            loginPopupButton.click();
        } else {
            console.error("Element with class 'btnLogin-popup' not found");
        }
    });
} else {
    console.error("Element with ID 'shopNow' not found");
}


// Scroll to the login section
function scrollToLoginSection() {
    const loginSection = document.getElementById("hero");
    const headerHeight = document.getElementById("header").offsetHeight;
    const scrollPosition = loginSection.offsetTop - headerHeight;

    window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
    });
}

// ... (Your existing code)

// Event listener for the login button
document.getElementById("loginButton").addEventListener("click", loginUser);

function loginUser() {
    console.log('Login button clicked');

    // Collect form data
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple form validation (you can add more validation as needed)
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    // Prepare data for the AJAX request
    const userData = {
        email: email,
        password: password,
    };

    console.log('Sending login request with data:', userData);

    // Your AJAX code using fetch API
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then(response => {
            console.log('Login response received:', response);

            if (!response.ok) {
                if (response.status === 401) {
                    alert('Invalid credentials. Please try again.');
                } else {
                    alert('Network error. Please try again later.');
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Handle success, e.g., show a success message to the user
            alert('Login successful.');

            // Clear the login form
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';

            // Close the login popup
            wrapper.classList.remove('active-popup');
            window.location.href = 'shop.html';
        })
        // .catch(error => {
        //     console.error('Error:', error);

        //     // Handle error, e.g., show an error message to the user
        //     alert('Invalid credentials. Please try again.');
        // });
        .catch(error => {
            console.error('Error:', error);
        
            if (error.response.status === 401) {
                alert('Invalid email or password. Please try again.');
            } else {
                alert('An error occurred. Please try again later.');
            }
        });
        

    console.log('Login request completed');
}

// ... (Your existing code)


document.querySelector(".btnLogin-popup").addEventListener("click", scrollToLoginSection);

// Event listener for the registration button
document.getElementById("registerButton").addEventListener("click", registerUser);

function registerUser() {
    console.log('Register button clicked');

    // Collect form data
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple form validation (you can add more validation as needed)
    if (!fullName || !email || !password) {
        alert('Please fill in all the fields.');
        return;
    }

    // Prepare data for the AJAX request
    const userData = {
        fullName: fullName,
        email: email,
        password: password,
    };

    console.log('Sending registration request with data:', userData);

    // Your AJAX code using fetch API
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then(response => {
            console.log('Registration response received:', response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Handle success, e.g., show a success message to the user
            alert('Welcome, ' + fullName + '! You have successfully registered.');
            // window.location.href = 'login.html';
            wrapper.classList.remove('active');
            wrapper.classList.remove('active-popup');

            // If you have a login link, trigger a click event on it
            if (loginLink) {
                loginLink.click();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error, e.g., show an error message to the user
        });

    console.log('Registration request completed');
}

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // ... (your existing code)

    // Fetch user information from the server and display it
    fetchUserInfo();

    // Handle personal information form submission
    document.getElementById('personalInfoForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        // Assuming you have an API endpoint for updating personal information
        fetch('http://localhost:3000/updatePersonalInfo', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the displayed information
                fetchUserInfo();
                alert('Personal information updated successfully!');
            } else {
                alert('Failed to update personal information. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error updating personal information:', error);
            alert('An error occurred. Please try again.');
        });
    });

    function fetchUserInfo() {
        // Assuming you have an API endpoint for fetching user information
        fetch('http://localhost:3000/getUserInfo')
            .then(response => response.json())
            .then(data => {
                // Check the structure of the data returned from the server
                console.log('User information fetched successfully:', data);
    
                // Assuming the data has the same structure as your userInfo object
                const { firstName, lastName, address, city, zipcode, state } = data;
    
                // Update the displayed information on the page
                document.getElementById('firstName').value = firstName || '';
                document.getElementById('lastName').value = lastName || '';
                document.getElementById('address').value = address || '';
                document.getElementById('city').value = city || '';
                document.getElementById('zipcode').value = zipcode || '';
                document.getElementById('state').value = state || '';
            })
            .catch(error => {
                console.error('Error fetching user information:', error);
            });
    }
    
});





// const wrapper = document.querySelector('.wrapper');
// const loginLink = document.querySelector('.login-link');
// const registerLink =document.querySelector('.register-link');
// const btnPopup =document.querySelector('.btnLogin-popup');
// const iconClose =document.querySelector('.icon-close');
// const bar = document.getElementById('bar');
// const close = document.getElementById('close');
// const nav = document.getElementById('navbar');








// // Image switcher
// document.addEventListener('DOMContentLoaded', function () {
//     var MainImg = document.getElementById("MainImg");
//     var smallimg = document.getElementsByClassName("small-img");

//     for (let i = 0; i < smallimg.length; i++) {
//         smallimg[i].addEventListener('click', function () {
//             MainImg.src = smallimg[i].src;
//         });
//     }
// });




// registerLink.addEventListener('click', ()=> {
//     wrapper.classList.add('active');
// })

// loginLink.addEventListener('click', ()=> {
//     wrapper.classList.remove('active');
// })
// btnPopup.addEventListener('click', ()=> {
//     wrapper.classList.add('active-popup');
// })
// iconClose.addEventListener('click', ()=> {
//     wrapper.classList.remove('active-popup');
// })

// document.getElementById("shopNow").addEventListener("click", function() {
//     document.querySelector(".btnLogin-popup").click(); 
//   });

// //Scroll to the login section
// function scrollToLoginSection() {
//     const loginSection = document.getElementById("hero"); 
//     const headerHeight = document.getElementById("header").offsetHeight; 
//     const scrollPosition = loginSection.offsetTop - headerHeight; 
    
//     window.scrollTo({
//       top: scrollPosition,
//       behavior: "smooth"
//     });
// }
// document.querySelector(".btnLogin-popup").addEventListener("click", scrollToLoginSection);
// //   document.querySelector(".btnLogin-footer").addEventListener("click", scrollToLoginSection);
 
// if (bar){
//     bar.addEventListener('click', () => {
//         nav.classList.add('active');
//     })
// }
// if (close){
//     close.addEventListener('click', () => {
//         nav.classList.remove('active');
//     })
// }




