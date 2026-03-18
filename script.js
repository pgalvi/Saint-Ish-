document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       1. MENÚ MÓVIL (MÉTODO HAMBURGUESA)
       ========================================= */
    const burgerBtn = document.getElementById("burger-toggle");
    const sidebar = document.getElementById("sidebar");

    if (burgerBtn && sidebar) {
        burgerBtn.addEventListener("click", () => {
            burgerBtn.classList.toggle("active");
            sidebar.classList.toggle("active");
        });
    }

    // Cerrar sidebar al hacer clic en un enlace (en móvil)
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("active");
                burgerBtn.classList.remove("active");
            }
        });
    });

    /* =========================================
       2. LIGHTBOX (VISOR DE IMÁGENES)
       ========================================= */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxCategory = document.getElementById("lightbox-category");
    const closeBtn = document.getElementById("close-btn");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    const galleryItems = Array.from(document.querySelectorAll(".masonry-item"));
    let currentIndex = 0;

    // Función para actualizar el modal con la imagen actual
    function updateLightbox(index) {
        if (index < 0 || index >= galleryItems.length) return;
        currentIndex = index;

        const item = galleryItems[currentIndex];
        const img = item.querySelector("img");
        const title = item.querySelector(".title").textContent;
        const category = item.querySelector(".category").innerHTML;

        lightboxImg.src = img.src;
        lightboxTitle.innerHTML = title;
        lightboxCategory.innerHTML = category;
        
        // Animación suave de cambio de imagen
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.style.opacity = '1';
        }, 50);
    }

    // Abrir Lightbox al hacer clic en una foto
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            updateLightbox(index);
            lightbox.style.display = "flex";
            document.body.style.overflow = "hidden"; // Bloquear scroll
        });
    });

    // Cerrar Lightbox
    function closeLightbox() {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    
    // Cerrar al hacer clic fuera de la foto
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Flechas Siguiente / Anterior
    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = galleryItems.length - 1;
            updateLightbox(prevIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            let nextIndex = currentIndex + 1;
            if (nextIndex >= galleryItems.length) nextIndex = 0;
            updateLightbox(nextIndex);
        });
    }

    // Soporte para teclado (Flechas y ESC)
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") nextBtn.click();
            if (e.key === "ArrowLeft") prevBtn.click();
        }
    });

    /* =========================================
       3. INTERSECTION OBSERVER PARA HIGHLIGHTS
       ========================================= */
    const sections = document.querySelectorAll("section");
    const options = {
        threshold: 0.4, // 40% de la sección visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remover active de todos los links
                navLinks.forEach(link => link.classList.remove("active"));
                
                // Añadir active al link correspondiente
                const activeId = entry.target.getAttribute("id");
                const activeLink = document.querySelector(`.nav-links a[href="#${activeId}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    /* =========================================
       4. ANIMACIONES EXTRA (SCROLL REVEAL)
       ========================================= */
    // Fade-in para items de galería al entrar la página
    const masonryItems = document.querySelectorAll('.masonry-item');
    masonryItems.forEach((item, i) => {
        item.style.animation = `fadeIn 0.6s ease forwards`;
        item.style.animationDelay = `${i * 0.1}s`;
    });

});
