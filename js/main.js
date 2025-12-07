// Menu burger mobile
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  function toggleMenu() {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  }

  function closeMenu() {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  // Fermer le menu au clic sur un lien
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Lazy loading des actualités
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const masonryGallery = document.querySelector(".masonry-gallery");
  let currentIndex = 0;

  // Données des articles supplémentaires
  const moreArticles = [
    {
      date: "8 Nov",
      category: "Santé",
      title: "Prévention des troubles musculo-squelettiques",
      excerpt:
        "Guide pratique pour préserver votre santé au travail dans la restauration.",
      imageOnly: false,
      classes: "",
      imageIndex: 1,
    },
    {
      date: "5 Nov",
      category: "Formation",
      title: "Nouvelles formations disponibles",
      excerpt: "",
      imageOnly: true,
      classes: "",
      imageIndex: 2,
    },
    {
      date: "3 Nov",
      category: "Négociations",
      title: "Accord collectif : nouvelles avancées",
      excerpt:
        "Retour sur les dernières négociations et les améliorations obtenues pour les salariés.",
      imageOnly: false,
      classes: "wide",
      imageIndex: 3,
    },
    {
      date: "1 Nov",
      category: "Droits",
      title: "Congés payés : vos droits",
      excerpt:
        "Tout ce que vous devez savoir sur vos droits aux congés payés dans la restauration.",
      imageOnly: false,
      classes: "",
      imageIndex: 4,
    },
    {
      date: "29 Oct",
      category: "Événement",
      title: "Assemblée générale : vos questions",
      excerpt: "",
      imageOnly: true,
      classes: "short",
      imageIndex: 5,
    },
    {
      date: "26 Oct",
      category: "Juridique",
      title: "Rupture de contrat : les nouveautés",
      excerpt:
        "Les dernières évolutions législatives concernant les ruptures de contrat.",
      imageOnly: false,
      classes: "",
      imageIndex: 6,
    },
    {
      date: "24 Oct",
      category: "Action sociale",
      title: "Aide aux salariés en difficulté",
      excerpt: "",
      imageOnly: true,
      classes: "",
      imageIndex: 7,
    },
    {
      date: "22 Oct",
      category: "Emploi",
      title: "CDD et CDI : comprendre vos contrats",
      excerpt:
        "Guide pour mieux comprendre les différents types de contrats dans la restauration.",
      imageOnly: false,
      classes: "",
      imageIndex: 8,
    },
  ];

  // Images Unsplash pour les nouvelles cartes
  const articleImages = [
    "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  ];

  function createArticleCard(article) {
    const card = document.createElement("article");
    card.className = `news-card ${article.classes} ${
      article.imageOnly ? "image-only" : ""
    }`;

    const imageDiv = document.createElement("div");
    imageDiv.className = "news-image";
    imageDiv.style.backgroundImage = `url('${
      articleImages[article.imageIndex]
    }')`;

    const dateSpan = document.createElement("span");
    dateSpan.className = "news-date";
    dateSpan.textContent = article.date;
    imageDiv.appendChild(dateSpan);

    if (article.imageOnly) {
      const contentDiv = document.createElement("div");
      contentDiv.className = "news-content";

      const categorySpan = document.createElement("span");
      categorySpan.className = "news-category";
      categorySpan.textContent = article.category;

      const titleH3 = document.createElement("h3");
      titleH3.className = "news-title";
      titleH3.textContent = article.title;

      contentDiv.appendChild(categorySpan);
      contentDiv.appendChild(titleH3);
      imageDiv.appendChild(contentDiv);
      card.appendChild(imageDiv);
    } else {
      const contentDiv = document.createElement("div");
      contentDiv.className = "news-content";

      const categorySpan = document.createElement("span");
      categorySpan.className = "news-category";
      categorySpan.textContent = article.category;

      const titleH3 = document.createElement("h3");
      titleH3.className = "news-title";
      titleH3.textContent = article.title;

      contentDiv.appendChild(categorySpan);
      contentDiv.appendChild(titleH3);

      if (article.excerpt) {
        const excerptP = document.createElement("p");
        excerptP.className = "news-excerpt";
        excerptP.textContent = article.excerpt;
        contentDiv.appendChild(excerptP);
      }

      card.appendChild(imageDiv);
      card.appendChild(contentDiv);
    }

    return card;
  }

  function loadMoreArticles() {
    const articlesToLoad = 3;
    const endIndex = Math.min(
      currentIndex + articlesToLoad,
      moreArticles.length
    );

    for (let i = currentIndex; i < endIndex; i++) {
      const article = moreArticles[i];
      const card = createArticleCard(article);
      masonryGallery.appendChild(card);
    }

    currentIndex = endIndex;

    // Désactiver le bouton si tous les articles sont chargés
    if (currentIndex >= moreArticles.length) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = "Toutes les actualités ont été chargées";
    }

    // Réinitialiser la grille CSS après l'ajout des nouvelles cartes
    setTimeout(() => {
      // Force le recalcul de la grille
      masonryGallery.style.display = "none";
      masonryGallery.offsetHeight; // Trigger reflow
      masonryGallery.style.display = "grid";
    }, 10);
  }

  if (loadMoreBtn && masonryGallery) {
    loadMoreBtn.addEventListener("click", loadMoreArticles);
  }
});
