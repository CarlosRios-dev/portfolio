const iconToggle = document.querySelector('.toggle_icon');
const navbarMenu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu_link');
const iconClose = document.querySelector('.close_icon');

iconToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

iconClose.addEventListener('click', () => {
    navbarMenu.classList.remove('active');
});

menuLinks.forEach((menuLinks) => {
    menuLinks.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
    })
})

// Change background header
function scrollHeader() {
    const header = document.getElementById('header');
    this.scrollY >= 20 ? header.classList.add('active') : header.classList.remove('active');
}

window.addEventListener('scroll', scrollHeader);

//Languages
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for(const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }
};

flagsElement.addEventListener('click', (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
});

//Hero type effect
let typedInstance;
const typedElement = document.querySelector('.typed');

const translations = {
    en: "Test Automation, Designer, Full Stack Developer ",
    es: "Automatizador, Diseñador, Full Stack"
};

function initializeTyped() {
    if (typedInstance) typedInstance.destroy(); 
    const typedStrings = typedElement.getAttribute('data-typed-items').split(',');
    typedInstance = new Typed('.typed', {
        strings: typedStrings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
    });
}
document.querySelectorAll('.flags_item').forEach(item => {
    item.addEventListener('click', () => {
        const lang = item.getAttribute('data-language');
        typedElement.setAttribute('data-typed-items', translations[lang]); 
        initializeTyped(); 
    });
});

initializeTyped();

//Scroll sections active link
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;

        let sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.menu a[href *=' + sectionId + ']').classList.add('active-link');
        }else {
            document.querySelector('.menu a[href *=' + sectionId + ']').classList.remove('active-link');
        }
    })
}

window.addEventListener('scroll', scrollActive);

//Parallax Effect
let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains_behind = document.getElementById('mountains_behind');
let mountains_front = document.getElementById('mountains_front');
let aboutSection = document.getElementById('about');
let starsA = document.getElementById('starsA');

window.addEventListener('scroll' , function() {
    
    let value = this.window.scrollY;

    if(isInViewport(aboutSection)){
        stars.style.left = value * 0.20 + 'px';
        moon.style.top = value * 0.4 + 'px';
        mountains_front.style.top = value * 0 + 'px';
    }
});

function isInViewport(aboutSection) {
    var distance = aboutSection.getBoundingClientRect();
    return (
        distance.top < (window.innerHeight || document.documentElement.clientHeight) && distance.bottom > 0
    );
}

//Resume Scroll
const pages = document.querySelectorAll('.page');
const resume = document.querySelector('.resume');

function resumeActive() {
    const scrollY = window.pageYOffset;

    pages.forEach(page => {
        const sectionHeight = page.offsetHeight;
        const sectionTop = page.offsetTop - 120;

        let sectionId = page.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.resume_tabs a[href *=' + sectionId + ']').classList.add('current');
        }else {
            document.querySelector('.resume_tabs a[href *=' + sectionId + ']').classList.remove('current');
        }
    })
}

window.addEventListener('scroll', resumeActive);

//Portfolio
let filterItems = document.querySelectorAll('.portfolio_filters li');

function activePortfolio() {
    filterItems.forEach(el => {
        el.classList.remove('filter-active');
        this.classList.add('filter-active');
    })
}

filterItems.forEach(el => {
    el.addEventListener('click', activePortfolio);
})

//Mixitup filter portfolio
let mixerPortfolio = mixitup('.portfolio_wrap-container', {
    selectors: {
        target: '.portfolio_item'
    },
    animation: {
        duration: 300
    }
})

//video controller
document.addEventListener("DOMContentLoaded", function () {
    const videoContainers = document.querySelectorAll('.video-container');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target.querySelector('video');
                if (video.paused) {
                    video.play();
                }
            } else {
                const video = entry.target.querySelector('video');
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    videoContainers.forEach(container => {
        observer.observe(container);
    });
});
