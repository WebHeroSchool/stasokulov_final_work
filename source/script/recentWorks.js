let viewAll = document.querySelectorAll('.recentWorks__title-side');
let hiddenWorks = document.querySelector('.recentWorks__example').querySelectorAll('.invis');

//На кнопку закрытия и открытия вешаем слушатель клика.
viewAll = Array.from(viewAll);//Превращаем массивоподобный объект в массив для старых браузеров.
viewAll.forEach(button => {
    button.addEventListener('click', () => {
        //Клик отображает скрытые работы и скрывает их при новом клике
        hiddenWorks.forEach(element => {
            element.classList.toggle('invis');
        });
        //Клик по любой из кнопок скрывает одну и показывает другую
        viewAll.forEach(button => {
            button.classList.toggle('invis');
        });
    });
});