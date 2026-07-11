/* ==========================================================
   NAVBAR.JS
   Portfolio V2
========================================================== */

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

/* ==========================================
   Navbar Scroll Effect
========================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

/* ==========================================
   Mobile Menu Toggle
========================================== */

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open");

});

/* ==========================================
   Close Menu on Link Click
========================================== */

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

});

/* ==========================================
   Close Menu with Escape Key
========================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        mobileMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        document.body.classList.remove("menu-open");

    }

});

/* ==========================================
   Prevent Background Scroll
========================================== */

const observer = new MutationObserver(() => {

    if (mobileMenu.classList.contains("active")) {

        document.body.style.overflow = "hidden";

    } else {

        document.body.style.overflow = "";

    }

});

observer.observe(mobileMenu, {
    attributes: true,
    attributeFilter: ["class"]
});