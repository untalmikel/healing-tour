document.addEventListener("DOMContentLoaded", () => {
  // --- Menú Hamburguesa para Navegación Responsiva (Activo en todas las páginas) ---
  const hamburger = document.getElementById("hamburger")
  const navList = document.getElementById("navList")

  if (hamburger && navList) {
    // Asegurarse de que los elementos existan
    hamburger.addEventListener("click", () => {
      navList.classList.toggle("active")
      hamburger.classList.toggle("is-active")
    })

    document.addEventListener("click", (event) => {
      if (!navList.contains(event.target) && !hamburger.contains(event.target)) {
        navList.classList.remove("active")
        hamburger.classList.remove("is-active")
      }
    })

    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        // Solo cierra el menú si el enlace apunta a una sección dentro de la misma página
        if (link.getAttribute("href").startsWith("#")) {
          navList.classList.remove("active")
          hamburger.classList.remove("is-active")
        }
      })
    })
  }

  // --- VALIDACIÓN COMPLETA DE FORMULARIO DE CONTACTO ---
  const contactForm = document.querySelector(".contact-form")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const phoneInput = document.getElementById("phone")
  const subjectInput = document.getElementById("subject")
  const messageInput = document.getElementById("message")
  const submitBtn = document.getElementById("submitContactform")

  // Elementos de error
  const nameError = document.getElementById("nameError")
  const emailError = document.getElementById("emailError")
  const phoneError = document.getElementById("phoneError")
  const subjectError = document.getElementById("subjectError")
  const messageError = document.getElementById("messageError")

  // Funciones de validación
  function validateName(name) {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/
    if (!name.trim()) {
      return "El nombre es obligatorio"
    }
    if (name.trim().length < 2) {
      return "El nombre debe tener al menos 2 caracteres"
    }
    if (name.trim().length > 50) {
      return "El nombre no puede exceder 50 caracteres"
    }
    if (!nameRegex.test(name.trim())) {
      return "El nombre solo puede contener letras y espacios"
    }
    return ""
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      return "El email es obligatorio"
    }
    if (!emailRegex.test(email.trim())) {
      return "Por favor ingresa un email válido"
    }
    if (email.length > 100) {
      return "El email no puede exceder 100 caracteres"
    }
    return ""
  }

  function validatePhone(phone) {
    const phoneRegex = /^[+]?[0-9\s\-$$$$]{10,20}$/
    if (phone.trim() && !phoneRegex.test(phone.trim())) {
      return "Por favor ingresa un número de teléfono válido"
    }
    return ""
  }

  function validateSubject(subject) {
    if (!subject.trim()) {
      return "El asunto es obligatorio"
    }
    if (subject.trim().length < 5) {
      return "El asunto debe tener al menos 5 caracteres"
    }
    if (subject.trim().length > 100) {
      return "El asunto no puede exceder 100 caracteres"
    }
    return ""
  }

  function validateMessage(message) {
    if (!message.trim()) {
      return "El mensaje es obligatorio"
    }
    if (message.trim().length < 10) {
      return "El mensaje debe tener al menos 10 caracteres"
    }
    if (message.trim().length > 1000) {
      return "El mensaje no puede exceder 1000 caracteres"
    }
    return ""
  }

  // Función para mostrar errores
  function showError(errorElement, message) {
    if (errorElement) {
      errorElement.textContent = message
      errorElement.style.display = message ? "block" : "none"
    }
  }

  // Función para validar campo individual
  function validateField(input, validator, errorElement) {
    const error = validator(input.value)
    showError(errorElement, error)

    // Cambiar estilo del input según validación
    if (error) {
      input.style.borderColor = "#dc3545"
      input.style.boxShadow = "0 0 0 2px rgba(220, 53, 69, 0.25)"
    } else {
      input.style.borderColor = "#28a745"
      input.style.boxShadow = "0 0 0 2px rgba(40, 167, 69, 0.25)"
    }

    return !error
  }

  // Validación en tiempo real
  if (nameInput && nameError) {
    nameInput.addEventListener("blur", () => {
      validateField(nameInput, validateName, nameError)
    })

    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim()) {
        validateField(nameInput, validateName, nameError)
      } else {
        nameInput.style.borderColor = ""
        nameInput.style.boxShadow = ""
        showError(nameError, "")
      }
    })
  }

  if (emailInput && emailError) {
    emailInput.addEventListener("blur", () => {
      validateField(emailInput, validateEmail, emailError)
    })

    emailInput.addEventListener("input", () => {
      if (emailInput.value.trim()) {
        validateField(emailInput, validateEmail, emailError)
      } else {
        emailInput.style.borderColor = ""
        emailInput.style.boxShadow = ""
        showError(emailError, "")
      }
    })
  }

  if (phoneInput && phoneError) {
    phoneInput.addEventListener("blur", () => {
      validateField(phoneInput, validatePhone, phoneError)
    })

    phoneInput.addEventListener("input", () => {
      if (phoneInput.value.trim()) {
        validateField(phoneInput, validatePhone, phoneError)
      } else {
        phoneInput.style.borderColor = ""
        phoneInput.style.boxShadow = ""
        showError(phoneError, "")
      }
    })
  }

  if (subjectInput && subjectError) {
    subjectInput.addEventListener("blur", () => {
      validateField(subjectInput, validateSubject, subjectError)
    })

    subjectInput.addEventListener("input", () => {
      if (subjectInput.value.trim()) {
        validateField(subjectInput, validateSubject, subjectError)
      } else {
        subjectInput.style.borderColor = ""
        subjectInput.style.boxShadow = ""
        showError(subjectError, "")
      }
    })
  }

  if (messageInput && messageError) {
    messageInput.addEventListener("blur", () => {
      validateField(messageInput, validateMessage, messageError)
    })

    messageInput.addEventListener("input", () => {
      if (messageInput.value.trim()) {
        validateField(messageInput, validateMessage, messageError)
      } else {
        messageInput.style.borderColor = ""
        messageInput.style.boxShadow = ""
        showError(messageError, "")
      }
    })
  }

  // Validación al enviar el formulario
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validar todos los campos
      const isNameValid = validateField(nameInput, validateName, nameError)
      const isEmailValid = validateField(emailInput, validateEmail, emailError)
      const isPhoneValid = validateField(phoneInput, validatePhone, phoneError)
      const isSubjectValid = validateField(subjectInput, validateSubject, subjectError)
      const isMessageValid = validateField(messageInput, validateMessage, messageError)

      // Verificar si todos los campos son válidos
      const isFormValid = isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid

      if (isFormValid) {
        // Deshabilitar botón durante el envío
        submitBtn.disabled = true
        submitBtn.textContent = "Enviando..."

        // Simular envío (aquí iría la lógica real de envío)
        setTimeout(() => {
          // Mostrar mensaje de éxito
          alert("¡Mensaje enviado exitosamente! Te contactaremos pronto.")

          // Limpiar formulario
          contactForm.reset()

          // Limpiar estilos de validación
          ;[nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach((input) => {
            if (input) {
              input.style.borderColor = ""
              input.style.boxShadow = ""
            }
          })

          // Limpiar mensajes de error
          ;[nameError, emailError, phoneError, subjectError, messageError].forEach((error) => {
            showError(error, "")
          })

          // Restaurar botón
          submitBtn.disabled = false
          submitBtn.textContent = "Enviar Mensaje"
        }, 2000)
      } else {
        // Hacer scroll al primer campo con error
        const firstErrorField = [nameInput, emailInput, phoneInput, subjectInput, messageInput].find(
          (input) => input && input.style.borderColor === "rgb(220, 53, 69)",
        )

        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" })
          firstErrorField.focus()
        }

        // Mostrar mensaje general de error
        alert("Por favor corrige los errores en el formulario antes de enviarlo.")
      }
    })
  }

  // --- Carrusel de Imágenes en la Sección Hero (Solo en index.html) ---
  const carouselContainer = document.querySelector(".carousel-container")
  if (carouselContainer) {
    // Solo ejecuta si la página tiene el carrusel
    let slideIndex = 0
    const slides = document.querySelectorAll(".carousel-slide")
    const dotsContainer = document.querySelector(".carousel-dots")

    function createDots() {
      dotsContainer.innerHTML = ""
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("span")
        dot.classList.add("dot")
        dot.addEventListener("click", () => currentSlide(i))
        dotsContainer.appendChild(dot)
      }
    }

    let autoSlideTimer
    function showSlides(n) {
      slides.forEach((slide) => slide.classList.remove("fade"))

      if (n >= slides.length) {
        slideIndex = 0
      } else if (n < 0) {
        slideIndex = slides.length - 1
      } else {
        slideIndex = n
      }

      slides.forEach((slide) => (slide.style.display = "none"))
      document.querySelectorAll(".dot").forEach((dot) => dot.classList.remove("active"))

      slides[slideIndex].style.display = "block"
      slides[slideIndex].classList.add("fade")
      document.querySelectorAll(".dot")[slideIndex].classList.add("active")
    }

    function startAutoSlide() {
      autoSlideTimer = setInterval(() => {
        showSlides(slideIndex + 1)
      }, 5000)
    }

    function currentSlide(n) {
      clearInterval(autoSlideTimer)
      showSlides(n)
      startAutoSlide()
    }

    if (slides.length > 0) {
      createDots()
      showSlides(0)
      startAutoSlide()
    }
  }

  // --- Desplazamiento Suave (Smooth Scrolling) ---
  // Funciona para enlaces internos dentro de cualquier página
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Asegurarse de que el elemento exista en la página actual
      const targetElement = document.querySelector(this.getAttribute("href"))
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      } else {
        // Si el elemento no existe en la página actual (ej. un enlace a una sección de otra página)
        // Se podría añadir una lógica para redirigir, pero con target="_blank" ya se abre la página.
        // Para enlaces a secciones en otras páginas, se debe usar directamente el path completo
        // Ej: <a href="index.html#acerca-de">Acerca de</a>
        window.location.href = this.getAttribute("href")
      }
    })
  })

  // --- Acordeón para Preguntas Frecuentes (FAQ) (Solo en servicios.html) ---
  const faqItems = document.querySelectorAll(".faq-item")
  if (faqItems.length > 0) {
    // Solo ejecuta si la página tiene elementos FAQ
    faqItems.forEach((item) => {
      const header = item.querySelector("h4")
      if (header) {
        header.addEventListener("click", () => {
          item.classList.toggle("active")
        })
      }
    })
  }

  // --- Animación de Revelación de Secciones al Hacer Scroll ---
  // Activa esta animación en todas las secciones que tengan la clase 'animated'
  const sections = document.querySelectorAll("section")

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated", "visible")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    section.classList.add("animated")
    sectionObserver.observe(section)
  })

  // -------------------- Lógica del Modal de Zoom de Imagen (Para galeria.html) --------------------
  const modal = document.getElementById("imageModal")
  const modalImg = document.getElementById("img01")
  const captionText = document.getElementById("caption")
  const closeButton = document.querySelector(".close-button")

  // Obtener todas las imágenes de la galería
  const galleryImages = document.querySelectorAll(".gallery-grid img")

  if (modal && modalImg && closeButton && galleryImages.length > 0) {
    galleryImages.forEach((img) => {
      img.addEventListener("click", function () {
        modal.classList.add("active") // Usar flex para centrar
        modalImg.src = this.getAttribute("data-full-src") || this.src // Usa data-full-src si existe, si no, usa src
      })
    })

    // Evento para cerrar el modal al hacer clic en el botón de cerrar
    closeButton.addEventListener("click", () => {
      modal.classList.remove("active")
    })

    // Evento para cerrar el modal al hacer clic fuera de la imagen (en el fondo oscuro)
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        // Asegura que solo se cierre al hacer clic en el fondo
        modal.classList.remove("active")
      }
    })

    // Evento para cerrar el modal al presionar la tecla ESC
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active")
      }
    })
  }
  // -------------------- FIN Lógica del Modal de Zoom de Imagen ---//
})

// -------------------- Lógica del Modal de Video (Para galeria.html) --------------------
const videoModal = document.getElementById("videoModal")
const modalVideo = document.getElementById("video01")
const videoCaptionText = document.getElementById("videoCaption")
// Selector más específico para evitar conflictos con el modal de imagen
const closeVideoButton = document.querySelector("#videoModal .close-button")

const galleryVideos = document.querySelectorAll(".video-grid-gallery video")

if (videoModal && modalVideo && closeVideoButton && galleryVideos.length > 0) {
  galleryVideos.forEach((videoElement) => {
    videoElement.addEventListener("click", function () {
      // Pausar cualquier video que pueda estar reproduciéndose en la cuadrícula
      galleryVideos.forEach((v) => {
        if (v !== this) {
          v.pause()
          v.currentTime = 0 // Opcional: reiniciar para la próxima vez
        }
      })

      videoModal.classList.add("active") // Mostrar el modal de video

      // Cargar los archivos de video correctos en el modal
      // Limpiar source elements antiguos si los hay
      modalVideo.innerHTML = ""
      // Añadir source elements usando los atributos data-src
      const sourceMp4 = document.createElement("source")
      sourceMp4.src = this.getAttribute("data-video-src-mp4")
      sourceMp4.type = "video/mp4"
      modalVideo.appendChild(sourceMp4)

      const sourceWebm = document.createElement("source")
      sourceWebm.src = this.getAttribute("data-video-src-webm")
      sourceWebm.type = "video/webm"
      modalVideo.appendChild(sourceWebm)

      modalVideo.load() // Cargar el video para reproducirlo
      modalVideo.play() // Iniciar la reproducción del video
      videoCaptionText.innerHTML = this.alt || "" // Usar alt como descripción, o dejar vacío
    })
  })

  // Evento para cerrar el modal de video al hacer clic en el botón de cerrar
  closeVideoButton.addEventListener("click", () => {
    modalVideo.pause() // Pausar el video al cerrar
    modalVideo.currentTime = 0 // Reiniciar el video al principio
    videoModal.classList.remove("active") // Ocultar el modal
  })

  // Evento para cerrar el modal de video al hacer clic fuera del video (en el fondo oscuro)
  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      modalVideo.pause() // Pausar el video al cerrar
      modalVideo.currentTime = 0 // Reiniciar el video al principio
      videoModal.classList.remove("active") // Ocultar el modal
    }
  })

  // Evento para cerrar el modal de video al presionar la tecla ESC
  document.addEventListener("keydown", (event) => {
    // Asegúrate de que solo se active si el modal de video está abierto
    if (event.key === "Escape" && videoModal.classList.contains("active")) {
      modalVideo.pause() // Pausar el video al cerrar
      modalVideo.currentTime = 0 // Reiniciar el video al principio
      videoModal.classList.remove("active") // Ocultar el modal
    }
  })
}
// -------------------- FIN Lógica del Modal de Video --------------------

//----------------------- Lógica para el botón "Volver Arriba"--------------------
// Este código es para el botón "Volver Arriba" que aparece al hacer scroll hacia abajo
const backToTopBtn = document.getElementById("backToTopBtn")

if (backToTopBtn) {
  // Mostrar/ocultar el botón al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      // Muestra el botón después de 300px de scroll
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  // Desplazamiento suave al hacer clic
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ==================== DATOS DE PRODUCTOS MODIFICADOS CON IMÁGENES ====================
const products = [
  {
    id: 1,
    name: "HOODIE",
    description: "Un abrigador hoodie para las noches frescas en La Toscana.",
    price: 100000,
    image: "images/hoodie.png",
  },
  {
    id: 2,
    name: "T-SHIRTS ITALY VER",
    description: "La suavidad y la frescura de nuestra tela especial para días calurosos frente a la playa.",
    price: 50000,
    image: "images/tshirtitaly.jpg",
  },
  {
    id: 3,
    name: "T-SHIRTS NAME VER",
    description: "Disfruta un refrescante vino mientras recuerdas la serenidad de tu viaje.",
    price: 50000,
    image: "images/namever.jpg",
  },
  {
    id: 4,
    name: "BALL CAP",
    description: "Gorra protectora de rayos UV que no permite que tu cabello se dañe.",
    price: 35000,
    image: "images/cap.jpg",
  },
  {
    id: 5,
    name: "KIT JOURNALIST VIAJERO",
    description: "Un kit perfecto para aquellos que gustan llevar su journal de la forma más creativa.",
    price: 30000,
    image: "images/kit.jpg",
  },
  {
    id: 6,
    name: "WINESOUL GLASS",
    description: "Tu nueva mejor amiga para acompañarte durante los exclusivos tours de las catas locales.",
    price: 80000,
    image: "images/wineglass.png",
  },
]

// Shopping cart
let cart = JSON.parse(localStorage.getItem("cart")) || []

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  displayProducts()
  updateCartUI()
})

// ==================== FUNCIÓN MODIFICADA PARA MOSTRAR IMÁGENES ====================
function displayProducts() {
  const productsGrid = document.getElementById("productsGrid")
  if (!productsGrid) return

  productsGrid.innerHTML = ""

  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" onerror="this.src='images/placeholder.jpg'">
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toLocaleString("es-CO")} COP</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Añadir al Carrito
            </button>
        `
    productsGrid.appendChild(productCard)
  })
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  saveCart()
  updateCartUI()
  showSuccessMessage()
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  saveCart()
  updateCartUI()
}

// Update item quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      saveCart()
      updateCartUI()
    }
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Update cart UI
function updateCartUI() {
  updateCartCount()
  displayCartItems()
  updateCartTotal()
}

// Update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cartCount")
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems
}

// ==================== FUNCIÓN MODIFICADA PARA MOSTRAR IMÁGENES EN EL CARRITO ====================
function displayCartItems() {
  const cartContent = document.getElementById("cartContent")

  if (cart.length === 0) {
    cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Tu carrito está vacío</p>
                <p>¡Agrega algunos productos para comenzar!</p>
            </div>
        `
    return
  }

  cartContent.innerHTML = ""
  cart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toLocaleString("es-CO")} COP</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `
    cartContent.appendChild(cartItem)
  })
}

// Update cart total
function updateCartTotal() {
  const cartTotal = document.getElementById("cartTotal")
  const checkoutBtn = document.getElementById("checkoutBtn")
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  cartTotal.textContent = `Total: $${total.toLocaleString("es-CO")} COP`
  checkoutBtn.disabled = cart.length === 0
}

// Toggle cart sidebar
function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar")
  const cartOverlay = document.getElementById("cartOverlay")

  cartSidebar.classList.toggle("open")
  cartOverlay.classList.toggle("active")
}

// Close cart sidebar
function closeCart() {
  const cartSidebar = document.getElementById("cartSidebar")
  const cartOverlay = document.getElementById("cartOverlay")

  cartSidebar.classList.remove("open")
  cartOverlay.classList.remove("active")
}

// Show success message
function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage")
  successMessage.classList.add("show")

  setTimeout(() => {
    successMessage.classList.remove("show")
  }, 2000)
}

// Checkout function
function checkout() {
  if (cart.length === 0) return

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  alert(
    `¡Gracias por tu compra!\n\nProductos: ${itemCount}\nTotal: $${total.toLocaleString("es-CO")} COP\n\n¡Tu pedido ha sido procesado exitosamente!`,
  )

  // Clear cart after checkout
  cart = []
  saveCart()
  updateCartUI()
  closeCart()
}

// Close cart when clicking outside
document.addEventListener("click", (event) => {
  const cartSidebar = document.getElementById("cartSidebar")
  const cartIcon = document.querySelector(".cart-icon")

  if (!cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
    if (cartSidebar.classList.contains("open")) {
      closeCart()
    }
  }
})

// Handle escape key to close cart
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart()
  }
})
