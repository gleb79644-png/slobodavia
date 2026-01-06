export function fullFlightTime (dateInput, timeInput) {
    // принимать значения dateInput.value , timeInput.value

      // работаем с датой и временем

  let today = new Date() // дата сегодня
  let timezoneOffset = today.getTimezoneOffset() // получаем сдвиг по часовому поясу, для коректной записи ВРЕМЕНИ вылета

  let flightDate = new Date(dateInput); // получаю дату в формате "2023-08-01T00:00:00.000Z" только сутки без часов
  let flightDateMiliseconds = flightDate.getTime() // перевожу в милисекунды от 01.01.1970

  let flightTime = new Date(`1970-01-01T${timeInput}:00.000Z`) // полученное время в формате "23:30" вставляю в 1970-01-01T00:00:00.000Z т.е. получаю часов и минут от 0, от timeStamp
  let flightTimeMiliseconds = flightTime.getTime()// перевожу в милисекунды от 01.01.1970 т.е. получаю часы и минуты без суток

  let  fullFlightTimeInfo = flightDateMiliseconds + flightTimeMiliseconds + (timezoneOffset * 60 * 1000)// складываю type:number сутки с часами и минутами + (сдвиг по часовому поясу в минутах * 60 * 1000)
  // все манипуляции со временем нужны для последующей сортировки по времени , т.к. мы делаем электронное табло
  // заканчиваем работу с датой и временем

  return fullFlightTimeInfo
}