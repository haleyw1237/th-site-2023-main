const faqCards = document.querySelectorAll(".faq-card");

faqCards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
});
