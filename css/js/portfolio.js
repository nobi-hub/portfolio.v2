document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {

        const video = card.querySelector(".project-video");

        if (!video) return;


        card.addEventListener("mouseenter", () => {

            video.muted = true;

            video.play().catch(error => {
                console.log("Video play error:", error);
            });

        });


        card.addEventListener("mouseleave", () => {

            video.pause();

            video.currentTime = 0;

        });

    });

});