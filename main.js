
// Transparent navbar

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
    if (navbarHeight < window.scrollY) {
        navbar.classList.add("navbar-dark");
    } else {
        navbar.classList.remove("navbar-dark");
    }
});

// Navbar Toggle Btn

const toggleBtn = document.querySelector(".navbar__toggle-btn");
toggleBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("open");
});

// Scroll to section

const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    navbarMenu.classList.remove("open");
    scrollTo(link);
    selectNavItem(target);
});

// Handle contact me button

const contactMeBtn = document.querySelector(".home__contact");
contactMeBtn.addEventListener("click", () => {
    scrollTo("#contact");
});

const Home = document.querySelector("#home");
document.addEventListener("scroll", () => {
    if (window.scrollY > navbarHeight) {
        Home.classList.add("home-trans");
    } else {
        Home.classList.remove("home-trans");
    }
});

// Arrow-up Btn

const ArrowUp = document.querySelector(".arrow-up");
ArrowUp.addEventListener("click", () => {
    scrollTo("#home");
});

// Projects

const workBtnContainer = document.querySelector(`.work__categories`);
const projectContainer = document.querySelector(`.work__projects`);
const projects = document.querySelectorAll(`.project`);
workBtnContainer.addEventListener(`click`, (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // Remove selection from the previous item and select the new one
    const active = document.querySelector(".category__btn.selected");
    active.classList.remove("selected");
    const target =
        e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
    target.classList.add("selected");

    projectContainer.classList.add(`anim-out`);
    setTimeout(() => {
        projects.forEach((project) => {
            if (filter === `*` || filter === project.dataset.type) {
                project.classList.remove(`invisible`);
            } else {
                project.classList.add(`invisible`);
            }
        });

        projectContainer.classList.remove(`anim-out`);
    }, 300);
});

// Active menu items when scrolling window

const sectionIds = [
    "#home",
    "#about",
    "#skills",
    "#work",
    "#testimonials",
    "#contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
    document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    selectedNavItem.classList.remove("active");
    selectedNavItem = selected;
    selectedNavItem.classList.add("active");
}

function scrollTo(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);

            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (
        window.scrollY + window.innerHeight ===
        document.body.clientHeight
    ) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});