
export function renderTime(incomDate) { // ф-я для вычесления времени
    let date = new Date(incomDate)
    let result = ''
    if (date.getHours() < 10) {
      result = result + '0'
    }
    result = result + date.getHours() + ':'
    if (date.getMinutes() < 9) {
  
      result = result + '0'
    }
    result = result + date.getMinutes()
  
  
    return result
  }
  