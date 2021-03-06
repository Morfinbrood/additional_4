module.exports = function multiply(first, second) {
  "use strict"
  //функция реверса строки
  function reverseStr(str) {
    return str.split("").reverse().join("");
  }
  // упорядочиваем так чтобы при умножении столбиком верхнее число 'x' всегда было большей или равной разрядности 
  let x = first;
  let y = second;
  if (y.length > x.length) {
    let subVal = x;
    x = y;
    y = subVal;
  }
  //поциферно перемножаем 2-а стринг числа - как результат массив перевернутых чисел в string, т.е. 123*11= ["321", "321"]
  let arrMulti = [];
  let offseDecs = "none"; //величина смещения на десятки при умножении на цифру след десятка числа y
  for (let iY = y.length - 1; iY >= 0; iY--) {
    let str = "";
    let overflowDec = 0;  //величина переполнения разряда т.е. 9*9=81 -> 8
    for (let iX = x.length - 1; iX >= 0; iX--) {
      let multi = x[iX] * y[iY] + overflowDec;
      if (multi > 9) {
        overflowDec = Math.floor(multi / 10);
        str = str + String(multi % 10);
        if (iX == 0) str = str + overflowDec; //чтобы не терять переполнение на послед цифре добавляем переполнение
      } else {
        str = str + String(multi);
        overflowDec = 0;
      }
    }
    if (offseDecs == "none") //1 раз не смещаем.
      offseDecs = "";
    else
      offseDecs = offseDecs + "0";
    arrMulti.push(offseDecs + str);
  }
  // делаем новый реверт массив полученных результатов
  for (let i = 0; i < arrMulti.length; i++) {
    let strNumber = arrMulti[i];
    arrMulti[i] = reverseStr(strNumber);
  }
  // если бы была возможность было бы неплохо вынести это в отдельный модуль.
  //Возможно это можно сделать даже в этом файле, но пока не умею.
  x = 0;
  y = 0;
  function sumColumn(arrNumbStr) {
    let resultSumStr = arrNumbStr[0];
    //i От 1 потому что [0-ое] число мы уже всандалил в 'x'
    for (let iArr = 1; iArr < arrNumbStr.length; iArr++) { 
      let x = resultSumStr;
      let y = arrNumbStr[iArr];
      if (y.length > x.length) { // снова упорядочиваем
        let subVal = x;
        x = y;
        y = subVal;
      }
      let str = "";
      let overflowDec = 0;
      for (let i = 1; i <= x.length; i++) { //i - посимвольное смещение от конца  i=1 потому что при смещении 0 у нас будут траблы с x[length]
        let numbX = Number(x[x.length - i]);
        let numbY = 0;
        if (i <= y.length)
          numbY = Number(y[y.length - i]);  //  как только заканчиваются разряды меньшего числа подсовываем нули для сложения
        let sum = numbX + numbY + overflowDec;
        if (sum > 9) {
          overflowDec = Math.floor(sum / 10);
          str = str + String(sum % 10);
          if (i == x.length) str = str + overflowDec;
        } else {
          str = str + String(sum);
          overflowDec = 0;
        }
      }
      str = reverseStr(str);
      resultSumStr = str;
    }
    return resultSumStr;
  }
  return sumColumn(arrMulti);
}