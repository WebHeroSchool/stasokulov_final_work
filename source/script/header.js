//Бургер
let burger = document.querySelector('.burger');
let burgerItem1 = document.querySelector('.burger__item-1');
let burgerItem2 = document.querySelector('.burger__item-2');
let mobileMenu = document.querySelector('.header__mobileMenu');
let language = document.querySelector('.header__mainMenu__language');
burger.addEventListener('click', () => {
    burgerItem1.classList.toggle('burger__item-1_active');
    burgerItem2.classList.toggle('burger__item-2_active');
    mobileMenu.classList.toggle('invis');
    //language.classList.toggle('header__mainMenu__language_active');
    //language.classList.toggle('invisLanguage');
});

//Плавный скролл к блоку
let header = document.querySelector('body');
header.addEventListener('click', (e) => {
    //Ловим клик на пункте меню
    if( e.target.classList.contains('scroll') ) {
        let targetClass = e.target.dataset.target; //Берем название класса целевого элемента из атрибута target
        let aimBlock = document.querySelector('.' + targetClass);
        let finish = aimBlock.offsetTop; //Целевые координаты
        let start = window.pageYOffset; //Стартовые координаты
        let numStep = 50; //Количество шагов
        let lenghtStep = (finish-start)/numStep; //Длинна шага
        let progress = start;
        let countStep = 0;

        scroll();
        
        // Увеличиваем координаты на длинну шага, скроллим к ним, увеличиваем счетчик, сверяем счетчик с целевым 
        //числом шагов, если меньше - все повторяем. 
        function scroll() {
            progress += lenghtStep;
            setTimeout( () => {
                window.scrollTo(0, progress);
                countStep++;
                if(countStep < numStep) {
                    scroll();
                };
            }, 10);
        };
    };
});