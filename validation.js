// =================================================================================================================================================
//валидация
export function validation(form) {

    function removeError(input) { // ф-я для очистки ошибок
        const parent = input.parentNode;// parentNode получаем родителя элемента, в данном случае обёртку, что бы потом из него удалить поле ошибки
        if (parent.classList.contains('error')) { // classList.contains - содержит класс, в данном случае 'error'
            parent.querySelector('.add-form__alert').remove() // в родителе ищем по querySelector (не All т.к. в кажном input-box будем проверять) !!! remove() удаляем дом элемент
            parent.classList.remove('error')
        }
    }



    function createError(input, text) {
        const parent = input.parentNode;  // parentNode получаем родителя элемента, в данном случае обёртку, что бы потом вставить текст ошибки
        parent.classList.add('error') // добавляем класс к обёртке а потом вот так .error .input-field стилизуем поле 
        const errorLabel = document.createElement('label') // создаём элемент (под инпутом подпись)

        errorLabel.classList.add('add-form__alert')// стилизуем
        errorLabel.textContent = text // пишем текст приходящий "сверху"

        parent.append(errorLabel) // добавляем этот элемент в перент в конец

    }


    // вылидация возвращае true или false
    let result = true;

    // form.querySelectorAll('input').forEach(input => {
    //     // то же самое опишу ниже по другому
    // });

    const allInputs = form.querySelectorAll('.add-form__input'); // в родителе ищем по querySelectorAll !!!


    for (const input of allInputs) {

        removeError(input)// очищаем ошибки, перед повторной валидацией (лейбл с ошибкой и обводку инпута красным)
        // можно придумать Любые правила валидации !!!

        if (input.dataset.forbiddenValue) { // если инпут содержит forbiddenValue для селектов, т.к. они всегда содержат значение ибо первое значение - плейсхолдер
            // проверяем минимальное кол-во символов
            if (input.value == input.dataset.forbiddenValue) {
                console.log('Заполните поле !')
                removeError(input)// очищаем ошибки, что бы они друг под другом не скапливались ЕСЛИ сработало условие
                result = false
                createError(input, 'Заполните поле !') // если поле не заполнено, то создавай поле с ошибкой
            }
        }

        if (input.dataset.required == "true") { // если инпут содержит data-required="true" то запускаем проверку ниже
            // проверяем на заполненность
            if (input.value == '') {
                removeError(input)// очищаем ошибки, что бы они друг под другом не скапливались ЕСЛИ сработало условие
                result = false
                createError(input, 'Заполните поле !') // если поле не заполнено, то создавай поле с ошибкой
            }
        }
    }

    return result
}


export function cleanAddForm(form) { // ф-я для очистки ошибок
    const allInputs = form.querySelectorAll('.add-form__input'); // в родителе ищем по querySelectorAll !!!
    for (const input of allInputs) {
        const parent = input.parentNode;// parentNode получаем родителя элемента, в данном случае обёртку, что бы потом из него удалить поле ошибки
        if (parent.classList.contains('error')) { // classList.contains - содержит класс, в данном случае 'error'
            parent.querySelector('.add-form__alert').remove() // в родителе ищем по querySelector (не All т.к. в кажном input-box будем проверять) !!! remove() удаляем дом элемент
            parent.classList.remove('error')
        }
        input.value = ''
        document.getElementById('flight-direction-select').value = 'Направление'
        document.getElementById('aviacompany-select').value = 'Авиакомпания'
        document.getElementById('status-select').value = 'Статус'
        document.getElementById('type-select').value = 'Тип'
    }
}