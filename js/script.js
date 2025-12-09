// Основной JavaScript файл

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initNotification();
    initAnimations();
    initStickyHeader();
});

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const isActive = nav.classList.contains('active');
            this.innerHTML = isActive 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            this.setAttribute('aria-expanded', isActive);
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Кнопка "Наверх"
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Пропускаем пустые ссылки и внешние ссылки
            if (targetId === '#' || targetId.includes('http')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Вычисляем высоту хедера
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 70;
                
                // Добавляем небольшой дополнительный отступ
                const extraPadding = 20;
                const targetPosition = targetElement.offsetTop - headerHeight - extraPadding;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Для мобильных - закрываем меню
                const nav = document.querySelector('.nav');
                const menuToggle = document.getElementById('menuToggle');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
}

// Липкий хедер
function initStickyHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.padding = '1rem 0';
        }
        
        lastScroll = currentScroll;
    });
}

// Уведомление
function initNotification() {
    const notification = document.getElementById('notification');
    const notificationClose = document.getElementById('notificationClose');
    
    if (notification && notificationClose) {
        // Показываем уведомление через 1 секунду после загрузки
        setTimeout(() => {
            notification.classList.add('show');
        }, 1000);
        
        // Закрытие уведомления
        notificationClose.addEventListener('click', function() {
            notification.classList.remove('show');
        });
        
        // Автоматическое закрытие через 5 секунд
        setTimeout(() => {
            if (notification.classList.contains('show')) {
                notification.classList.remove('show');
            }
        }, 5000);
    }
}

// Анимации при скролле
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.advantage-card, .feature-card, .stat-item, .store-item, .product-category, .price-list-card'
    );
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Вспомогательные функции
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Плавное появление элементов при загрузке
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Удаляем прелоадер если он есть
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

// Обработка внешних ссылок
document.querySelectorAll('a[href*="matveyzz.github.io"]').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Переход к прайс-листу');
    });
});

// Обработка ошибок изображений
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f5f5f5"/><text x="200" y="150" font-family="Arial" font-size="16" text-anchor="middle" fill="%23999">Изображение</text></svg>';
        this.alt = 'Изображение не загружено';
    });
});

// Адаптивность изображений
function initResponsiveImages() {
    const images = document.querySelectorAll('img[data-srcset]');
    images.forEach(img => {
        const srcset = img.getAttribute('data-srcset');
        img.setAttribute('srcset', srcset);
    });
}

// Инициализация при загрузке
initResponsiveImages();

// Обработка изменения размера окна
window.addEventListener('resize', debounce(function() {
    // Закрываем мобильное меню при изменении размера
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    
    if (window.innerWidth > 768 && nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
}, 250));