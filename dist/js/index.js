const mobileMenuButton = document.querySelector(".button.mobile");
const body = document.body;

mobileMenuButton.onclick = function(){
    mobileMenuButton.classList.toggle("checked");
    body.classList.toggle("fixed");
    return null;
};


window.onscroll = () => {
    const header = document.querySelector(".header");
    const Y = window.scrollY;
    if (Y > 120) {
        header.classList.add('fixed');
    } else if  (Y < 20) {
        header.classList.remove('fixed');
    }
}


let icons = [];

const recalculateActiveIcons = () => {
    const windowTop = 0; //window.scrollY; // $window.scrollTop()
    const windowBottom = window.innerHeight; // windowTop + $window.height()

    for (let i = 0; i < icons.length; ++i) {
        const icon = icons[i];
        const elRect = icon.getBoundingClientRect();

        if ((elRect.bottom >= windowTop && elRect.top < windowBottom)) {
            if (!icon.classList.contains('checked')) {
                icon.classList.add('checked');
            }
        }
    }
}

const initPage = () => {
    icons = document.querySelectorAll('.animated');
    recalculateActiveIcons();
}

const init = () => {
    document.addEventListener('scroll', recalculateActiveIcons)
    initPage();
}

init(initPage);


const menuItems = document.querySelectorAll('.menu-item');
const header = document.querySelector('.header');
const background = document.querySelector('.header .background');
const blur = document.querySelector('.blur');
const subMenuWrap = document.querySelector('.desktop-menu .sub-menu-wrap');

window.addEventListener('load', function() {
    // Установка блокировки на 3 секунды после загрузки страницы
    isLocked = true;
    setTimeout(() => {
        isLocked = false; // Снятие блокировки через 3 секунды
    }, 3000);
});

menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const subMenu = item.querySelector('.sub-menu');
        if (item.classList.contains('checked') && isLocked) {
            return; // Прерываем выполнение функции, если класс checked и блокировка активна
        }
        if (subMenu) {
            header.classList.add('menu-active');
        }
        // Очистка предыдущего таймаута для предотвращения наложения
        clearTimeout(item.timeoutId);

        item.timeoutId = setTimeout(() => {
            if (subMenu) {
                subMenuWrap.innerHTML = subMenu.innerHTML;
            } else {
                subMenuWrap.innerHTML = '';
            }
        }, 200); // Задержка в&nbsp;500 миллисекунд
    });
});

// Убедимся, что класс menu-active остается, когда курсор над subMenuWrap
subMenuWrap.addEventListener('mouseenter', function() {
    header.classList.add('menu-active');
});

background.addEventListener('mouseleave', function() {
    header.classList.remove('menu-active');
});

blur.addEventListener('mouseenter', function() {
    header.classList.remove('menu-active');
});

// Добавляем проверку, чтобы предотвратить удаление класса menu-active,
// когда курсор находится над .blur или .sub-menu-wrap
header.addEventListener('mouseleave', function(event) {
    const relatedTarget = event.relatedTarget;
    if (!blur.contains(relatedTarget) && !subMenuWrap.contains(relatedTarget)) {
        header.classList.remove('menu-active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки с классом .widget-button
});
const buttons = document.querySelectorAll('.widget-button');

// Перебираем каждую кнопку и добавляем обработчик события клика
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Находим элемент с классом .woot-widget-holder.woot--hide
        const widgetHolder = document.querySelector('.woot-widget-holder.woot--hide');
        const bubbles = document.querySelectorAll('.woot-widget-bubble');

        // Если элемент найден, убираем класс .woot--hide
        if (widgetHolder) {
            widgetHolder.classList.remove('woot--hide');
        }
        if (bubbles.length > 1) {
            // Добавляем класс woot--hide к первому элементу
            bubbles[0].classList.add('woot--hide');

            // Убираем класс woot--hide у второго элемента
            bubbles[1].classList.remove('woot--hide');
        }
    });
});




// Находим все кнопки в корзине
const cartButtons = document.querySelectorAll('.table-row .cart-button');
const popupWrapper = document.querySelector('.popup-wrapper');


cartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Находим родительский элемент .table-row
        const tableRow = this.closest('.table-row');
    
        // Получаем название продукта
        const productName = tableRow.querySelector('.row-title .name').textContent;
        // Добавляем класс active к .popup-wrapper
       
        console.log('press>>', popupWrapper)
        popupWrapper.classList.add('active');

        // Вставляем название продукта в .popup-wrapper .product
        const popupProduct = document.querySelector('.popup-wrapper .product');
        popupProduct.textContent = productName;
        const textarea = popupWrapper.querySelector('textarea');
   
        textarea.value = 'Здравствуйте, хочу заказать ' + productName 

    });
});

// Находим кнопку закрытия попапа
const popupClose = document.querySelector('.popup-wrapper .popup-close');

popupClose.addEventListener('click', function() {
    // Убираем класс active у .popup-wrapper
    const popupWrapper = document.querySelector('.popup-wrapper');
    popupWrapper.classList.remove('active');
});

// Также убираем класс active при клике вне попапа
popupWrapper.addEventListener('click', function(event) {

    const popupWrapper = document.querySelector('.popup-wrapper');
    const popup = popupWrapper.querySelector('.popup');

    // Проверяем, был ли клик вне попапа
    if (popupWrapper.classList.contains('active') && event.target.classList.contains('popup-wrapper')) {
        popupWrapper.classList.remove('active');
    }
});
document.addEventListener('DOMContentLoaded', function() {
});

const moduleSupport = document.querySelector('.module.support');

// Первоначальное выполнение через 3 секунды
setTimeout(() => {
    // Проверяем, есть ли класс 'night'
    if (moduleSupport.classList.contains('night')) {
        moduleSupport.classList.remove('night'); // Убираем класс 'night'
        moduleSupport.classList.add('day'); // Добавляем класс 'day'
    } else {
        moduleSupport.classList.add('night'); // Добавляем класс 'night'
        moduleSupport.classList.remove('day'); // Убираем класс 'day'
    }

    // Устанавливаем интервал на последующие вызовы через каждые 10 секунд
    setInterval(() => {
        // Проверяем, есть ли класс 'night'
        if (moduleSupport.classList.contains('night')) {
            moduleSupport.classList.remove('night'); // Убираем класс 'night'
            moduleSupport.classList.add('day'); // Добавляем класс 'day'
        } else {
            moduleSupport.classList.add('night'); // Добавляем класс 'night'
            moduleSupport.classList.remove('day'); // Убираем класс 'day'
        }
    }, 10000);
}, 3000);// Изменяем класс каждые 10 секунд




