//Подтягиваю свои репозитории с GitHub
const username = 'stasokulov';
let linkToMyGit = `https://api.github.com/users/${username}`;
let numRepos = '';
let perPage = 10; //Репозиториев на странице
let page = 1; //Какая страница подгрузится

getRepos(page);
goPagination(); //Включаю слушатель кликов по меню пагинации

//Запрашиваю данные репозиториев
function getRepos(page) {
    //Сначала запускаем прелоадер
    let preloader = document.querySelector('.preloader__wrap_git');
    preloader.classList.remove('invis');

    let linkToMyRepos = `${linkToMyGit}/repos?per_page=${perPage}&page=${page}`;
    fetch(linkToMyRepos) 
    .then(response => {
        if (response.status == 200) {
            return response.json() //Передаю дальше JSON с данными
        } else {
            alert('Запрос на github.com не удался. Ошибка: ' + response.status)
        }
    })
    .then(arr => {
        //Обрабатываю каждый элемент массива
        arr.forEach( (element) => {
            gitItemCreator(element); //Создаю элемент в списке репозиториев
        });
    })
    .then( () => {
        //Убираем прелоадер
        preloader.classList.add('invis');
    })
};

//Запашиваю количество репозиториев
fetch(linkToMyGit)
    .then(response => {
        if (response.status == 200) {
            return response.json() //Передаю дальше JSON с данными
        } else {
            alert('Запрос на github.com не удался. Ошибка: ' + response.status)
        }
    })
    .then(json => {
        numRepos = json.public_repos;
        return numRepos;           
    })
    .then(numRepos => {
        //Вычисляю количество страниц пагинации
        let numPages = Math.ceil(numRepos/perPage);
        for(let i = 1; i <= numPages; i++) {
            createPagination(i);
        };
    });

    //Генерация блоков с данными репозиториев
    function gitItemCreator(element) {
        let template = document.querySelector('.git__main__item_template');
        let item = template.cloneNode(true); //Клонирую шаблон блока
        item.classList.remove('git__main__item_template');
        item.classList.remove('invis');
        item.classList.add('git__main__item');

        let link = item.querySelector('.git__main__item__innerWrap');
        let title = item.querySelector('.git__main__item__title');
        let marker = item.querySelector('.git__main__item__text-element__marker');
        let progLang = item.querySelector('.git__main__item__text-element__progLang');
        let star = item.querySelector('.git__main__item__text-element__star').parentNode;
        let fork = item.querySelector('.git__main__item__text-element__fork').parentNode;
        let dateUpdate = item.querySelector('.git__main__item__text-element__update');

        link.href = element.html_url;
        title.innerHTML = element.name;
        progLang.innerHTML = element.language;

        switch(element.language) {
            case 'HTML':
                marker.classList.add('git__main__item__text-element__marker_HTML');
                break;
            case 'CSS':
                marker.classList.add('git__main__item__text-element__marker_CSS');
                break;
            case 'JS':
                marker.classList.add('git__main__item__text-element__marker_JS');
                break;
        };

        if(element.stargazers_count) {
            star.appendChild( document.createTextNode(element.stargazers_count) );
        } else {
            star.remove();
        };

        if(element.forks_count) {
            fork.appendChild( document.createTextNode(element.forks_count) );
        } else {
            fork.remove();
        };
        
        dateUpdate.innerHTML = 'Обновлено ' + new Date(element.updated_at).toLocaleDateString('ru') + 'г.';
        template.parentNode.appendChild(item);
    };

    //Наполнение меню пагинации
    function createPagination(pageCount) {
        let paginator = document.querySelector('.git__main__paginator');
        let paginationItem = document.querySelector('.paginator__item').cloneNode(true);
        paginationItem.classList.remove('invis');
        //Подсвечиваем цифру 1
        if(pageCount === 1) {
            paginationItem.classList.add('paginator__item_active');
        };
        paginationItem.appendChild( document.createTextNode(pageCount) );
        paginator.appendChild( paginationItem );
    };

    //Обработчик кликов по меню пагинации
    function goPagination() {
        let paginator = document.querySelector('.git__main__paginator');
        paginator.addEventListener('click', (e) => {
            if(e.target.className === 'paginator__item') {

                //Удаляем репозитории, загруженные ранее
                let allRepos = document.querySelectorAll('.git__main__item');
                allRepos = Array.from(allRepos);//Превращаем массивоподобный объект в массив для старых браузеров.
                allRepos.forEach(element => {
                    element.remove();
                });

                //Показываем репозитории, чья дата-метка совпадает с числом по которому кликнули
                let page = e.target.innerText;
                getRepos(page);

                //Снимаем подсветку с чисел в меню пагинации
                let paginationItems = document.querySelectorAll('.paginator__item');
                paginationItems = Array.from(paginationItems);//Превращаем массивоподобный объект в массив для старых браузеров.
                paginationItems.forEach(element => {
                    element.classList.remove('paginator__item_active');                    
                });

                //Подсвечиваем кликнутое число
                e.target.classList.add('paginator__item_active');
            };
        });
    };