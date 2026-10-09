const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });
});

document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
});
.fade-up{
    opacity:0;
    transform:translateY(40px);
    transition:all .8s ease;
}

.fade-up.show{
    opacity:1;
    transform:translateY(0);
}
