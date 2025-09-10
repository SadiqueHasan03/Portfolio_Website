/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle && navMenu){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
    
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose && navMenu){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    if (navMenu) {
        navMenu.classList.remove('show-menu')
    }
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close'
    }
    if (itemClass=== 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open'    
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
        tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
    

    tabContents.forEach(tabContent => {
        tabContent.classList.remove('qualification__active')
    })
    target.classList.add('qualification__active')

    tabs.forEach(tab =>{
        tab.classList.remove('qualification__active')
    })
    tab.classList.add('qualification__active')

    })
})

/*==================== SERVICES MODAL ====================*/



/*==================== PORTFOLIO SWIPER  ====================*/


/*==================== TESTIMONIAL ====================*/


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            const activeLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
            if (activeLink) {
                activeLink.classList.add('active-link')
            }
        }else{
            const activeLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
            if (activeLink) {
                activeLink.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(scrollUp) {
        if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
    }
}
window.addEventListener('scroll', scrollUp)

/*==================== CHANGE BACKGROUND HEADER ====================*/  


/*==================== DARK LIGHT THEME ====================*/ 

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme && themeButton) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}


//  Email sending from the form

document.querySelector(".contact__form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Initialize EmailJS only if not already initialized
    if (typeof emailjs !== 'undefined' && !emailjs._initialized) {
        emailjs.init("505hKYguhDbLkUNQi"); // Initialize EmailJS
        emailjs._initialized = true;
    }

    const serviceID = "service_fxrmbq9";
    const templateID = "template_knt001v";

    const formData = {
        name: document.querySelector(".contact__form .contact__inputs .contact__input[type='text']").value,
        email: document.querySelector(".contact__form input[type='email']").value,
        project: document.querySelector(".contact__form .contact__content:not(.contact__inputs) .contact__input[type='text']").value,
        message: document.querySelector(".contact__form textarea").value,
    };

    emailjs
        .send(serviceID, templateID, formData)
        .then(
            () => alert("Message sent successfully!"),
            (error) => {
                const errorMessage = error?.text || error?.message || 'Unknown error occurred'
                alert("Failed to send message: " + errorMessage)
                console.error('EmailJS Error:', error)
            }
        );
});
