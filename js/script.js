// Основной JavaScript файл

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initNotification();
    initAnimations();
});

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.innerHTML = nav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
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
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
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
            notification.classList.remove('show');
        }, 5000);
    }
}

// Анимации при скролле
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.advantage-card, .feature-card, .stat-item, .store-item, .product-category, .price-list-card'
    );
    
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
});

// Обработка внешних ссылок (для прайс-листа)
document.querySelectorAll('a[href*="matveyzz.github.io"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Можно добавить аналитику или подтверждение
        console.log('Переход к прайс-листу');
    });
});

// Обработка ошибок изображений
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f5f5f5"/><text x="200" y="150" font-family="Arial" font-size="16" text-anchor="middle" fill="%23999">Изображение</text></svg>';
    });
});