const imageFiles = [
  "454739486.jpg",
  "456360492.jpg",
  "456361586.jpg",
  "456361731.jpg",
  "456365704.jpg",
  "456366013.jpg",
  "456372434.jpg",
  "740713574.jpg",
  "740713575.jpg",
  "740713578.jpg",
  "740713581.jpg",
  "740713596.jpg",
  "740713597.jpg",
  "740713602.jpg",
  "740713604.jpg",
  "740713605.jpg",
  "740713607.jpg",
  "740713608.jpg",
  "740713609.jpg",
  "740713616.jpg",
  "740713620.jpg",
  "740713628.jpg",
  "740713631.jpg",
  "740713637.jpg",
  "740713639.jpg",
  "740713641.jpg",
  "740713643.jpg",
  "740713646.jpg",
  "740713653.jpg",
  "740713654.jpg",
  "740713655.jpg",
  "740713657.jpg",
  "740713659.jpg",
  "740713661.jpg",
  "740713663.jpg",
  "740713667.jpg",
  "740713671.jpg",
  "740713672.jpg",
  "740713673.jpg",
  "740713677.jpg",
  "740713682.jpg",
  "740713686.jpg",
  "740713687.jpg",
  "740713689.jpg",
  "740713693.jpg",
  "740713696.jpg",
  "740713701.jpg",
  "740713704.jpg",
  "740713706.jpg",
  "740713707.jpg",
  "740713709.jpg",
  "740713712.jpg",
  "740713713.jpg",
  "740713714.jpg",
  "740713715.jpg",
  "740713722.jpg",
  "740713726.jpg"
];

const fullGallery = document.getElementById("fullGallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const showMoreBtn = document.getElementById("showMoreBtn");
const initialVisibleCount = 15;

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

imageFiles.forEach((file, index) => {
  const figure = document.createElement("figure");
  figure.className = "gallery-item";
  if (index >= initialVisibleCount) {
    figure.classList.add("is-collapsed");
  }

  const img = document.createElement("img");
  img.src = file;
  img.alt = `Bild av boendet ${index + 1}`;
  img.loading = "lazy";
  img.decoding = "async";

  img.addEventListener("click", () => openLightbox(file, img.alt));

  figure.appendChild(img);
  fullGallery.appendChild(figure);
});

showMoreBtn?.addEventListener("click", () => {
  document.querySelectorAll(".gallery-item.is-collapsed").forEach((item) => {
    item.classList.remove("is-collapsed");
  });
  showMoreBtn.style.display = "none";
});

if (imageFiles.length <= initialVisibleCount && showMoreBtn) {
  showMoreBtn.style.display = "none";
}

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

const revealItems = document.querySelectorAll(".story-grid article, .amenities-grid article, .gallery-item, .travel-cards article");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item, index) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(14px)";
  item.style.transition = `opacity 0.45s ease ${index * 0.01}s, transform 0.45s ease ${index * 0.01}s`;
  observer.observe(item);
});

const style = document.createElement("style");
style.textContent = ".is-visible { opacity: 1 !important; transform: translateY(0) !important; }";
document.head.appendChild(style);
