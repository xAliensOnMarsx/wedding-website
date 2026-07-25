// ========================================
// WEDDING COUNTDOWN
// ========================================

const countdownElement = document.getElementById("countdown");
const weddingDate = new Date("May 22, 2027 16:00:00");

function formatNumber(value) {
    return String(value).padStart(2, "0");
}

function updateCountdown() {
    if (!countdownElement) return;

    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-value">00</div>
                <div class="countdown-label">Days</div>
            </div>

            <div class="countdown-item">
                <div class="countdown-value">00</div>
                <div class="countdown-label">Hours</div>
            </div>

            <div class="countdown-item">
                <div class="countdown-value">00</div>
                <div class="countdown-label">Minutes</div>
            </div>

            <div class="countdown-item">
                <div class="countdown-value">00</div>
                <div class="countdown-label">Seconds</div>
            </div>
        `;

        return;
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    countdownElement.innerHTML = `
        <div class="countdown-item">
            <div class="countdown-value">
                ${formatNumber(days)}
            </div>
            <div class="countdown-label">Days</div>
        </div>

        <div class="countdown-item">
            <div class="countdown-value">
                ${formatNumber(hours)}
            </div>
            <div class="countdown-label">Hours</div>
        </div>

        <div class="countdown-item">
            <div class="countdown-value">
                ${formatNumber(minutes)}
            </div>
            <div class="countdown-label">Minutes</div>
        </div>

        <div class="countdown-item">
            <div class="countdown-value">
                ${formatNumber(seconds)}
            </div>
            <div class="countdown-label">Seconds</div>
        </div>
    `;
}

if (countdownElement) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}


// ========================================
// MOBILE NAVIGATION MENU
// ========================================

const navToggle = document.querySelector(".nav-toggle, .menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const menuIsOpen = navLinks.classList.toggle("open");

        navToggle.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// ========================================
// FAQ ACCORDION
// ========================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", () => {
        const isAlreadyOpen = item.classList.contains("active");

        faqItems.forEach((otherItem) => {
            const otherQuestion =
                otherItem.querySelector(".faq-question");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherItem.classList.remove("active");

            if (otherQuestion) {
                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            if (otherAnswer) {
                otherAnswer.style.maxHeight = "0px";
            }
        });

        if (!isAlreadyOpen) {
            item.classList.add("active");
            question.setAttribute("aria-expanded", "true");
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
    });
});
// ========================================
// GALLERY LIGHTBOX
// ========================================

const galleryCards = document.querySelectorAll(".gallery-card");
const lightbox = document.getElementById("galleryLightbox");

if (galleryCards.length > 0 && lightbox) {
    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");

    const galleryImages = Array.from(galleryCards).map((card) =>
        card.querySelector("img")
    );

    let currentImageIndex = 0;

    function showImage(index) {
        currentImageIndex =
            (index + galleryImages.length) % galleryImages.length;

        const selectedImage = galleryImages[currentImageIndex];

        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
    }

    galleryCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    previousButton.addEventListener("click", () => {
        showImage(currentImageIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showImage(currentImageIndex + 1);
    });

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("open")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showImage(currentImageIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showImage(currentImageIndex + 1);
        }
    });
}
// ========================================
// GUESTBOOK
// ========================================

const guestbookForm = document.getElementById("guestbookForm");
const guestMessage = document.getElementById("guestMessage");
const characterCount = document.getElementById("characterCount");
const guestbookSuccess = document.getElementById("guestbookSuccess");

if (guestMessage && characterCount) {
    guestMessage.addEventListener("input", () => {
        characterCount.textContent = guestMessage.value.length;
    });
}

if (guestbookForm && guestbookSuccess) {

    const modalClose =
        guestbookSuccess.querySelector(".guestbook-modal-close");

    function openGuestbookModal() {
        guestbookSuccess.classList.add("show");
        guestbookSuccess.setAttribute("aria-hidden", "false");
        document.body.classList.add("guestbook-modal-open");
    }

    function closeGuestbookModal() {
        guestbookSuccess.classList.remove("show");
        guestbookSuccess.setAttribute("aria-hidden", "true");
        document.body.classList.remove("guestbook-modal-open");
    }

    guestbookForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton =
            guestbookForm.querySelector(".guestbook-submit");

        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Signing...";

        const formData = new FormData(guestbookForm);

        try {

            const response = await fetch(guestbookForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                guestbookForm.reset();

                if (characterCount) {
                    characterCount.textContent = "0";
                }

                openGuestbookModal();

                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;

            } else {

                alert(
                    "We couldn't save your message. Please try again."
                );

                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }

        } catch (error) {

            alert(
                "We couldn't save your message. Please check your connection and try again."
            );

            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }

    });

    modalClose.addEventListener("click", closeGuestbookModal);

    guestbookSuccess.addEventListener("click", (event) => {
        if (event.target === guestbookSuccess) {
            closeGuestbookModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            guestbookSuccess.classList.contains("show")
        ) {
            closeGuestbookModal();
        }
    });
}
