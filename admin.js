import { validation } from "./valdation/validation.js"; // достаём ф-Ю из другого модуля
import { cleanAddForm } from "./valdation/validation.js";
import { renderDate } from "./date/renderDate.js";
import { renderTime } from "./date/renderTime.js";
import { fullFlightTime } from "./date/fullFlightTime.js";
// let data = localStorage.getItem('flightKey') // достаем данные из локалсторидж по ключу объекты
//ТОЧКА ПЕРЕВОДА НА СЕРВЕР

// создаю статичный массив расписания
let sceduleAirpotArr = []
sceduleAirpotArr = getArrayFromLocalStorage();
// if (data !== '' && data !== null) { // если пришли данные не пустые, тогда записываем их в наш общий массив, иначе будет ошибка
//   sceduleAirpotArr = JSON.parse(data)
// }

function getArrayFromLocalStorage() { // ф-я получения данных с локалсториджа
  let mainArray = []
  let data = localStorage.getItem('flightKey') // достаем данные из локалсторидж по ключу объекты
  if (data !== '' && data !== null) { // если пришли данные не пустые, тогда записываем их в наш общий массив, иначе будет ошибка
    mainArray = JSON.parse(data)
  }
  return mainArray
}

//=====================================================================================================================================
//Создайтю функцию одного рейса в таблицу. Функция должна вернуть html элемент с информацией и рейсе.У функции должен быть один аргумент - объект студента.

function getflightItem(flightObj) { // аргумент индекс в массиве , массив рейсов

  let tableRow = document.createElement('tr') // создаем строку в таблицу
  let zeroColumn = document.createElement('td') // создаем колонку в строке
  let firstColumn = document.createElement('td') // создаем колонку в строке
  let secondColumn = document.createElement('td')
  let threedColumn = document.createElement('td')
  let fourthColumn = document.createElement('td')
  let fivesColumn = document.createElement('td')
  let extraColumn = document.createElement('td') //extraColumn - нужна для адаптива в 320
  let sixtColumn = document.createElement('td')
  let seventhColumn = document.createElement('td')
  let eightColumn = document.createElement('td')

  // собираем таблицу
  tableRow.classList.add('table__row', 'row')

  zeroColumn.textContent = flightObj.id;
  zeroColumn.classList.add('row__item', 'row__item-0', 'inviseble');

  firstColumn.textContent = renderDate(flightObj.data.date); // рендерю дату из формата 2023-08-01T00:00:00.000Z да, можно рендерить из fullFlightTimeInfo, но оставлю так
  firstColumn.classList.add('row__item', 'row__item-1');

  secondColumn.textContent = renderTime(flightObj.data.time); //рендерю время из формата секунд с timeStamp да, можно рендерить из fullFlightTimeInfo, но оставлю так
  secondColumn.classList.add('row__item', 'row__item-2');

  threedColumn.textContent = flightObj.data.direction;
  threedColumn.classList.add('row__item', 'row__item-3');

  fourthColumn.textContent = flightObj.data.flight;
  fourthColumn.classList.add('row__item', 'row__item-4');

  let iconAviacompany = document.createElement('img') // создаем ИМГ и прокидывем к нему путь из нашего объекта
  iconAviacompany.src = flightObj.data.aviacompany.image

  fivesColumn.append(iconAviacompany)
  fivesColumn.classList.add('row__item', 'row__item-5');

  extraColumn.textContent = 'Статус';
  extraColumn.classList.add('row__item', 'row__item-extra');

  let selectArray = ['Статус', 'Отменён', 'Регистрация', 'В полёте', 'Посадка', 'Задерживается', 'Прибыл']

  let tableSelect = document.createElement('select') // создаем в каждой строке по  селекту
  tableSelect.classList.add('table__status-select', 'hidden')

  for (let item of selectArray) {
    let option = document.createElement('option')
    option.classList.add('table__option')
    option.value = item
    option.textContent = item
    tableSelect.appendChild(option) // закидываем в каждый селект данные из массива
  }

  for (let i = 0; i < tableSelect.length; i++) { // Важно! Вравниваем значение из приходящего объекта и ставим его как выбранное
    if (tableSelect[i].value === flightObj.data.status) tableSelect[i].selected = true;
  }

  tableSelect.addEventListener('change', () => { // по изменению вызываем ф-ю меняющую статус в массиве
    changeFlightStatusArray(flightObj.id, tableSelect.value)
  })

  function changeFlightStatusArray(id, status) { // Важно! ф-я ищет в большом Массиве наш объект по id и в нём меняет поле status
    let item = sceduleAirpotArr.find(x => x.id === id);
    item.data.status = status;
  };

  let flightStatus = document.createElement('span') // то же статус но НЕ в режиме редактирования
  flightStatus.classList.add('table__status')
  flightStatus.textContent = flightObj.data.status

  // задаю цвета спанам в зависимости от значения
  if (flightObj.data.status === 'Отменён') {
    flightStatus.style.cssText = `
    color: var(--color-red);
    `
  } else if (flightObj.data.status ==='Задерживается') {
    flightStatus.style.cssText = `
    color: var(--color-red);
    `
  } 
  else if (flightObj.data.status === 'В полёте' ) {
    flightStatus.style.cssText = `
    color: var(--color-blue);
    `
  } else if (flightObj.data.status === 'Посадка' )  {
    flightStatus.style.cssText = `
    color: var(--color-blue);
    `
  }
  else if (flightObj.data.status === 'Прибыл') {
    flightStatus.style.cssText = `
    color: var(--color-green-middle);
    `
  };

  sixtColumn.append(flightStatus);
  sixtColumn.append(tableSelect);//  по умолчанию - этот hidden
  sixtColumn.classList.add('row__item', 'row__item-6');

  let deleteButton = document.createElement('button'); // кнопка удатить в таблице
  deleteButton.classList.add('row__button-delete', 'button-reset');
  deleteButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.54545" stroke="#DB2525" stroke-width="0.909091"/>
    <path d="M6.65283 14.1528L14.1528 6.65283" stroke="#DB2525" stroke-width="0.981955" stroke-linecap="round"/>
    <path d="M13.8472 14.1528L6.34717 6.65283" stroke="#DB2525" stroke-width="0.981955" stroke-linecap="round"/>
    </svg>` // здесь сразу вставил SVGшку, что бы при наведении можно было с ней взаимодействовать

  deleteButton.addEventListener('click', function (elem) {
    elem.preventDefault()
    // вызов всплывающего окна
    if (confirm(`Удалить рейс ${flightObj.data.flight}, ${flightObj.fromTo.toLowerCase()}ающий в ${flightObj.data.direction} из расписания?`)) {
      //удаляем клиента с localStorage // todo ф-ю удаления с массива
      tableRow.remove()

      for (let i = 0; i < sceduleAirpotArr.length; i++) { // пробегаемся по массиву
        if (sceduleAirpotArr[i].id == flightObj.id) { // если АйДи удаляемого объекта совпадает с АйДи в массиве, то
          sceduleAirpotArr.splice(i, 1) // удаляем ОБЪЕКТ методом splice
        }
      }

      // для показа сообщения ВМЕСТО таблицы "Пока нет ни одного рейса"
      let mainTable = document.getElementById('table')
      let emptyMsg = document.getElementById('empty-message')
      if (document.getElementById('table-body').children.length < 1) { // если дочерних элементов у ТБОДИ меньше одного, то показывай сообщение
        mainTable.classList.add('inviseble')
        emptyMsg.classList.remove('hidden')
      } // данное сообщение убирается вызове ф-ии рендеринга, т.к. здесь проверка происходит при клике на кнопку.
    } else {
      return // если при вызове всплывающего окна нажали отмена
    }

  })

  seventhColumn.append(deleteButton)
  seventhColumn.classList.add('row__item', 'row__item-7', 'hidden');

  eightColumn.textContent = flightObj.fromTo;
  eightColumn.classList.add('row__item', 'row__item-8', 'inviseble');

  tableRow.appendChild(zeroColumn)
  tableRow.appendChild(firstColumn)
  tableRow.appendChild(secondColumn)
  tableRow.appendChild(threedColumn)
  tableRow.appendChild(fourthColumn)
  tableRow.appendChild(fivesColumn)
  tableRow.appendChild(extraColumn)
  tableRow.appendChild(sixtColumn)
  tableRow.appendChild(seventhColumn)
  tableRow.appendChild(eightColumn)

  return tableRow // итогом работы данной функции является строка в таблице
}

//====================================================================================================================================
// перменная тип(вылет/ прилёт) что бы можно было рендерить таблицу в зависимости от типа

let selectedType = '';

//====================================================================================================================================
// отсортированный в зависимости от типа массив
let sortedTypeArray = []

//====================================================================================================================================
// ф-я реддера всей таблицы

let tableBody = document.querySelector('.table__body')
let mainTable = document.getElementById('table')
let mainContainer = document.querySelector('.main-container')
let emptyMsg = document.getElementById('empty-message')

function renderFlightsTable(array) {
  mainTable.classList.remove('inviseble')
  emptyMsg.classList.add('hidden')
  if (array.length < 1) {
    mainTable.classList.add('inviseble') // если длинна входящего массива < 1, скрываем таблицу
    emptyMsg.classList.remove('hidden') // если длинна входящего массива < 1, то показываем из html сообщение
    document.getElementById('filter-input').disabled = true // если длинна входящего массива < 1, то и искать пользователю нечего
    document.getElementById('change-button').disabled = true // если длинна входящего массива < 1, то и изменять пользователю нечего



  } else {
    emptyMsg.classList.add('hidden')
    document.getElementById('change-button').disabled = false
    document.getElementById('filter-input').disabled = false
    mainTable.classList.remove('inviseble')
    tableBody.innerHTML = '' // очистка таблицы перед новым рендерингом и никакой ф-ии для очистки не нужно, tablebody ранее объявлен
    for (let item of array) {
      tableBody.append(getflightItem(item)) // каждый элемента во входящем массиве рендерим в таблицу
    }
  }

}

// renderFlightsTable(sceduleAirpotArr)
// я не рендерю весь изначальный массив приходящий с localStorage т.к. после запуска я кликаю по кнопке прилёт и 
// уже там запускается рендеринг в зависимости от глобальной selectedType = '';



//=============================================================================================================================================
// работа с формой добавить рейс

let addFormInput = document.querySelectorAll('.add-form__input')
let addform = document.getElementById('add-form');
let dateInput = document.getElementById('date-input');
let timeInput = document.getElementById('time-input');
let flightDerectionSelect = document.getElementById('flight-direction-select');
let flightInput = document.getElementById('flight-input');
let aviacompanySelect = document.getElementById('aviacompany-select');
let statusSelect = document.getElementById('status-select');
let typeSelect = document.getElementById('type-select');

for (const item of addFormInput) { // этот цикл нужен для очистки сёрчбара при изменении любго инпута в форме
  item.addEventListener('change', () => {
    cleanSearchBar()
  })
}

dateInput.addEventListener ('focus', () => {
  dateInput.setAttribute('type', 'date')
})

dateInput.addEventListener ('blur', () => {
  dateInput.setAttribute('type', 'text')
})

timeInput.addEventListener ('focus', () => {
  timeInput.setAttribute('type', 'time')
})

timeInput.addEventListener ('blur', () => {
  timeInput.setAttribute('type', 'text')
})

addform.addEventListener('submit', function (element) {
  element.preventDefault();




  let newFlightObj = {} // при сабмите создаётся новый объект
  // в него добавляются все данные из введённых инпутов в нужной структуре
  newFlightObj.data = {}
  newFlightObj.data.date = new Date(dateInput.value);
  newFlightObj.data.time = fullFlightTime (dateInput.value, timeInput.value) // получаю полную дату сутки + часы, а рендерить в строку таблицы я буду только часы и минуты
  newFlightObj.data.direction = flightDerectionSelect.value;
  newFlightObj.data.flight = flightInput.value.toUpperCase();
  newFlightObj.data.aviacompany = {}
  newFlightObj.data.aviacompany.name = aviacompanySelect.value

  //вставляем путь до картинки в зваисимости от селекта
  let aviacompanyImg = '';

  // НАСТРОЙКА - Синхронизировать данные с select id='aviacompany-select' в html и прописать пути к картинкам

  if (aviacompanySelect.value === 'Аэрофлот') {
    aviacompanyImg = 'img/icon__aeroflot.png'
  } else if (aviacompanySelect.value === 'Россия') {
    aviacompanyImg = "img/icon__rossya.png"
  } else if (aviacompanySelect.value === 'Уральские Авиалинии') {
    aviacompanyImg = "img/icon__ural-airlines.png"
  } else if (aviacompanySelect.value === 's7') {
    aviacompanyImg = "img/icon__s7.png"
  } else if (aviacompanySelect.value === 'Nordwind') {
    aviacompanyImg = "img/icon__nordwind.png"
  };



  newFlightObj.data.aviacompany.image = aviacompanyImg;
  newFlightObj.data.status = statusSelect.value;
  newFlightObj.fromTo = typeSelect.value;
  newFlightObj.id = self.crypto.randomUUID();
  newFlightObj.fullTime = fullFlightTime (dateInput.value ,timeInput.value) // выношу отдельно, из data, что бы можно было фильтровать экспортная ф-я



  // валидация , если поля в форме не пустые и не содержат стандартных значений, то пропускай, иначе АЛЕРТ что поля не заполнены и ретёрн


  

  if (validation(this) == true) {

    // после того как пропустил
    sceduleAirpotArr.push(newFlightObj) // каждый раз при отправке формы обновляем массив с новыми объектами
    saveFlightToLocalHost(sceduleAirpotArr) // сохраняем новый массив в локалСторидже  //ТОЧКА ПЕРЕВОДА НА СЕРВЕР
  
    if (typeSelect.value === 'Вылет') { // если валидация пройдена, то в зависимости от типа присваеваем глобальной переменной нужный тип
      selectedType === 'Вылет'
      departureButton.click() // и кликаем по нужной кнопке ниже данной формы, что бы сразу отобразить показать пользователю где и что он добавил
    } else if (typeSelect.value === 'Прилёт') {
      selectedType === 'Прилёт'
      arrivalButton.click()
    }
  
    // это даже наверное излишне т.к. по клику на arrivalButton.click() / departureButton.click() рендерятся таблица
    // sortedTypeArray = sortArrivalDepartureFlightArray(sceduleAirpotArr, selectedType)
    // renderFlightsTable(sortedTypeArray)
  
    // очищаем форму
    cleanAddForm(document.getElementById('add-form')) // чистим форму добавления элементов, если ушли с нее



  }



})


//============================================================================================================================================
// ф-я сохранения отредактированного после удаления объекта массива

function saveFlightToLocalHost(sceduleAirpotArr) {
  localStorage.setItem('flightKey', JSON.stringify(sceduleAirpotArr)) // перезаписываем по ключу в строчном виде обновленный массив с объектами
}



//=============================================================================================================================================
// работ с кнопкой изменить
// ф-я пакетно меняющая disabled в разных формах
function formDisability(state) {
  //change-accept-form components
  document.getElementById('save-button').disabled = !state
  // searchBar components
  document.getElementById('filter-input').disabled = state
  // add-form components
  document.getElementById('date-input').disabled = state
  document.getElementById('time-input').disabled = state
  document.getElementById('flight-direction-select').disabled = state
  document.getElementById('flight-input').disabled = state
  document.getElementById('aviacompany-select').disabled = state
  document.getElementById('status-select').disabled = state
  document.getElementById('type-select').disabled = state
  document.getElementById('add-button').disabled = state
  // form-type components
  document.getElementById('departure-button').disabled = state
  document.getElementById('arrival-button').disabled = state
}

let saveButton = document.getElementById('save-button')
let changeButton = document.getElementById('change-button')

changeButton.addEventListener('click', (element) => {// по нажатию на кнопку "редактировать"
  //мы НЕ чистим сёрч бар, что бы пользователь мог отредактировать найденную строку(люъект)
  // cleanSearchBar ()
  let tableRemoveFlightField = document.querySelectorAll('.row__item-7')
  let tableStatusSpan = document.querySelectorAll('.table__status')
  let tableStatusSelect = document.querySelectorAll('.table__status-select')

  let tableExtraField = document.querySelectorAll('.row__item-extra')
  let tableColumnSix = document.querySelectorAll('.row__item-6')


  element.preventDefault();

  formDisability(true) // дисаблим нужные инпуты\ кнопки

  cleanAddForm(document.getElementById('add-form')) // чистим форму добавления элементов, если ушли с нее

  changeButton.classList.add('hidden'); // за место кнопки изменить, ПОКАЗЫВАЕМ показывем кнопку Сохранить изменения
  cancelButton.classList.remove('hidden')// а изменить прячем


  // здесь в циклах прячем/ показываем серекты/ спаны, т.к. .querySelectorAll выдаёт массив
  for (const item of tableRemoveFlightField) {
    item.classList.remove('hidden')
    item.classList.add('row__item-7--adoptation')
  }

  for (const item of tableStatusSpan) {
    item.classList.add('hidden');
  }

  for (const item of tableStatusSelect) { // нужно для адаптива на 320px
    item.classList.remove('hidden')
    item.classList.add('table__status-select--adoptation')
  }

  for (const item of tableExtraField) { // нужно для адаптива на 320px
    item.classList.add('row__item-extra--adoptation')
  }

  for (const item of tableColumnSix) { // нужно для адаптива на 320px
    item.classList.add('row__item-6--adoptation')
  }

})


let cancelButton = document.getElementById('cancel-button')

cancelButton.addEventListener('click', (element) => { // по нажатию на кнопку "отменить редактирование"
  cleanSearchBar()// здесь чистим сёрчбар т.к. пользователь отменяет редактирование

  let tableRemoveFlightField = document.querySelectorAll('.row__item-7')
  let tableStatusSpan = document.querySelectorAll('.table__status')
  let tableStatusSelect = document.querySelectorAll('.table__status-select')

  let tableExtraField = document.querySelectorAll('.row__item-extra')
  let tableColumnSix = document.querySelectorAll('.row__item-6')

  element.preventDefault();

  formDisability(false) // отменяем то, что задизаблии выше

  cancelButton.classList.add('hidden'); // кнопки меняем местами
  changeButton.classList.remove('hidden')

  // возвращаем всё назад

  for (const item of tableRemoveFlightField) {
    item.classList.add('hidden')
    item.classList.remove('row__item-7--adoptation')
  }

  for (const item of tableStatusSpan) {
    item.classList.remove('hidden');
  }

  for (const item of tableStatusSelect) {
    item.classList.add('hidden')
    item.classList.remove('table__status-select--adoptation')
  }

  for (const item of tableExtraField) {
    item.classList.remove('row__item-extra--adoptation')
  }

  for (const item of tableColumnSix) {
    item.classList.remove('row__item-6--adoptation')
  }


  // ТОЧКА ПЕРЕВОДА НА СЕРВЕР
  // загрузить данные с localStorage


  sceduleAirpotArr = getArrayFromLocalStorage(); // заново получаю данные с локалсториджа, потому что там они еще не изменённые

  sortedTypeArray = sortArrivalDepartureFlightArray(sceduleAirpotArr, selectedType) // заново сортирую массив по типу
  renderFlightsTable(sortedTypeArray) //рендерю


})

let accceptForm = document.getElementById('change-accept-form') 
accceptForm.addEventListener('submit', (element) => { // по нажатию кнопки сохранить изменения

  cleanSearchBar() // чистим серчбар

  let tableRemoveFlightField = document.querySelectorAll('.row__item-7')
  let tableStatusSpan = document.querySelectorAll('.table__status')
  let tableStatusSelect = document.querySelectorAll('.table__status-select')

  let tableExtraField = document.querySelectorAll('.row__item-extra')
  let tableColumnSix = document.querySelectorAll('.row__item-6')

  element.preventDefault();

  formDisability(false) // отменяем то, что задизаблии выше

  if (confirm('Сохранить внесённые изменения ?')) {

    // ТОЧКА ПЕРЕВОДА НА СЕРВЕР
    saveFlightToLocalHost(sceduleAirpotArr) // сохраняем в ЛОКАЛСТОРИДЖ то что изменили в основном массиве
    sceduleAirpotArr = getArrayFromLocalStorage() // получили обратно массив обновлённый!!!
    sortedTypeArray = sortArrivalDepartureFlightArray(sceduleAirpotArr, selectedType) // сортируем главный уже изменёный массив
    renderFlightsTable(sortedTypeArray) // рендерим отсортированный по типу главный массив

    // отжимаю кнопку сохранить изменения

    cancelButton.classList.add('hidden');
    changeButton.classList.remove('hidden')

    for (const item of tableRemoveFlightField) {
      item.classList.add('hidden')
      item.classList.remove('row__item-7--adoptation')
    }

    for (const item of tableStatusSpan) {
      item.classList.remove('hidden');
    }

    for (const item of tableStatusSelect) {
      item.classList.add('hidden')
      item.classList.remove('table__status-select--adoptation')
    }

    for (const item of tableExtraField) {
      item.classList.remove('row__item-extra--adoptation')
    }

    for (const item of tableColumnSix) {
      item.classList.remove('row__item-6--adoptation')
    }
  } else {
    cancelButton.click()
  }
})


//=============================================================================================================================================
// работа с кнопками прилёт/вылет

// правильно будет переделать их под радибаттоны !!!

// let selectedType = ''; // вынес эту переменную выше, что бы она была видна другим функциям
// начало этапа selectedType

let departureButton = document.getElementById('departure-button');

let arrivalButton = document.getElementById('arrival-button');



departureButton.addEventListener('click', (element) => {
  element.preventDefault();
  departureButton.classList.add('button-type--activated') // стилизация что бы постоянно горело активным
  arrivalButton.classList.remove('button-type--activated')
  selectedType = 'Вылет' // переменной типа задаём тип в зависимости от нажатой кнопки
  cleanSearchBar() //чистим сёрчбар
  cleanAddForm(document.getElementById('add-form')) // чистим форму добавления элементов, если ушли с нее

  let sortedTypeArray = sortArrivalDepartureFlightArray(sceduleAirpotArr, selectedType) // по нажатию на кнопку заново рендерим основной массив и фильтруем его по типу
  renderFlightsTable(sortedTypeArray)
})

departureButton.click() // инициализируем изначальное положение кнопки при активации страницы

arrivalButton.addEventListener('click', (element) => {
  // процесс описан выше
  element.preventDefault();
  departureButton.classList.remove('button-type--activated')
  arrivalButton.classList.add('button-type--activated')
  selectedType = 'Прилёт'
  cleanSearchBar()
  cleanAddForm(document.getElementById('add-form')) // чистим форму добавления элементов, если ушди с нее
 
  let sortedTypeArray = sortArrivalDepartureFlightArray(sceduleAirpotArr, selectedType)
  renderFlightsTable(sortedTypeArray)
})

function sortArrivalDepartureFlightArray(incomeArray, type) { // ф-я для сортировки Главного массива по выбранному ранее типу
  let filtredArray = incomeArray.filter(item => item.fromTo === `${type}`)
  let SortedArray = sortArray(filtredArray, 'fullTime', true) // дополнительно сортирую по времени от конца к началу, т.к. это Расписание!
  return SortedArray
}


function sortArray(incomArray, property, direction = false) { // ф-я сортировки массив по условию
  let result = incomArray.sort(function (a, b) {
    let directionOfSorting = a[property] < b[property];
    if (direction == true) directionOfSorting = a[property] > b[property];
    if (directionOfSorting) return -1
  })

  return result;
}

//=============================================================================================================================================s
//Функционал SearchBar который Работает с МАССИВОМ уже отрендериндом на странице

let searchBar = document.getElementById('filter-input')
let searchMsg = document.getElementById('search-message')


searchBar.addEventListener('keyup', function () { // по изменеию символов вызываем ф-ю поиска
  lifeTableSearch()
  cleanAddForm(document.getElementById('add-form')) // чистим форму добавления элементов, если ушди с нее



  // если колличество скрытых строк === количеству строк в отрисованной таблице, выводи сообщени о неудачном поиске, иначе пряч его
  if (document.querySelectorAll('.row--hidden').length === document.getElementById('table-body').children.length) {
    mainTable.classList.add('inviseble')
    searchMsg.classList.remove('hidden')
  } else {
    mainTable.classList.remove('inviseble')
    searchMsg.classList.add('hidden')
  }
})


function lifeTableSearch() { // ф-я которая сортируе НЕ массив, а данные из ОТРИСОВАННОЙ на странице ТАБЛИЦЫ по определённому столбцу
  let filter = document.getElementById('filter-input').value.toUpperCase(); //апперкуйс что бы регистр у всех искомых значений был одинаковый
  let table = document.querySelector('.table__body') // выбираем в какой таблице
  let tr = table.getElementsByTagName('tr')

  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName('td')[3]; // выбираем номер столбца

    if (td) {
      let textvlaue = td.textContent || td.innerHTML;

      if (textvlaue.toUpperCase().indexOf(filter) > -1) {
        tr[i].classList.remove('row--hidden'); // в оригинале display:none классы добавил для удобства
      } else {
        tr[i].classList.add('row--hidden');
      }
    }
  }
}

function cleanSearchBar() { // ф-я очистки серч бара вставляю ее в нужных местах
  let searchMsg = document.getElementById('search-message')
  let searchBar = document.getElementById('filter-input')

  searchBar.value = ''
  searchMsg.classList.add('hidden')
  let sortedTypeArray = sortArrivalDepartureFlightArray(sceduleAirpotArr, selectedType)
  renderFlightsTable(sortedTypeArray);
}

