/* ==========================================================
   HERO.JS
   Portfolio V2
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const heroContent = document.querySelector(".hero__content");
    const heroImage = document.querySelector(".hero__image");
    const stats = document.querySelectorAll(".hero__stat");
    const trustedItems = document.querySelectorAll(".trusted__wrapper span");

    // Initial State
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(40px)";

    heroImage.style.opacity = "0";
    heroImage.style.transform = "translateY(40px)";

    stats.forEach(stat => {
        stat.style.opacity = "0";
        stat.style.transform = "translateY(30px)";
    });

    // Hero Animation
    setTimeout(() => {

        heroContent.style.transition = "all .9s ease";
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";

    }, 200);

    setTimeout(() => {

        heroImage.style.transition = "all .9s ease";
        heroImage.style.opacity = "1";
        heroImage.style.transform = "translateY(0)";

    }, 500);

    stats.forEach((stat, index) => {

        setTimeout(() => {

            stat.style.transition = "all .7s ease";
            stat.style.opacity = "1";
            stat.style.transform = "translateY(0)";

        }, 700 + (index * 150));

    });

    // Trusted Hover Effect
    trustedItems.forEach(item => {

        item.addEventListener("mouseenter", () => {

            item.style.transform = "translateY(-4px) scale(1.05)";

        });

        item.addEventListener("mouseleave", () => {

            item.style.transform = "";

        });

    });

});

/* ==========================================
   Mouse Parallax
========================================== */

const image = document.querySelector(".hero__image-wrapper");

document.addEventListener("mousemove", e => {

    if (!image) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    image.style.transform =
        `translate(${x}px, ${y}px)`;

});