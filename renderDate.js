
//====================================================================================================================================
// ф-я для вычесления даты и её правильного представления в таблице

export function renderDate(incomDate) {
    const MONTH_JAN = 0;
    const MONTH_FEB = 1;
    const MONTH_MAR = 2;
    const MONTH_APR = 3;
    const MONTH_MAY = 4;
    const MONTH_JUN = 5;
    const MONTH_JUL = 6;
    const MONTH_AUG = 7;
    const MONTH_SEP = 8;
    const MONTH_OCT = 9;
    const MONTH_NOV = 10;
    const MONTH_DEC = 11;
  
    let date = new Date(incomDate)
    let result = ''
    if (date.getDate() < 10) {
      result = result + '0'
    }
    result = date.getDate() + ' '
    if (date.getMonth() === MONTH_JAN) {
      result = result + 'янв.'
    } else if (date.getMonth() === MONTH_FEB) {
      result = result + 'фев.'
    } else if (date.getMonth() === MONTH_MAR) {
      result = result + 'мар.'
    } else if (date.getMonth() === MONTH_APR) {
      result = result + 'апр.'
    } else if (date.getMonth() === MONTH_MAY) {
      result = result + 'май.'
    } else if (date.getMonth() === MONTH_JUN) {
      result = result + 'июн.'
    } else if (date.getMonth() === MONTH_JUL) {
      result = result + 'июл.'
    } else if (date.getMonth() === MONTH_AUG) {
      result = result + 'авг.'
    } else if (date.getMonth() === MONTH_SEP) {
      result = result + 'сен.'
    } else if (date.getMonth() === MONTH_OCT) {
      result = result + 'окт.'
    } else if (date.getMonth() === MONTH_NOV) {
      result = result + 'ноя.'
    } else if (date.getMonth() === MONTH_DEC) {
      result = result + 'дек.'
    }
    return result
  }
  
  