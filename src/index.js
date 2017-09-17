module.exports = function multiply(first, second) {

  // упорядочиваем так чтобы при умножении столбиком верхнее число всегда было большей или равно разрядности 
  let x = "";
  let y = "";
  if (first.lenght >= second.lenght) {
    x = first;
    y = second;
  } else {
    x = second;
    y = first;
  }

  x="999";
  y="888";

  // получаем массив со строками 1-го этапа поциферного перемножения столбиком - результаты в строках и перевернуты, т.е. 123*11= ["321", "321"]
  let arr=[];
  for (let iY = y.length-1; iY >=0; iY--) {
    let str="";
    console.log("iY= ",iY, " y[iY]= ",y[iY]);
    let overflowDec=0;
    for (let iX = x.length-1; iX >=0; iX--) {
      console.log("iX= ",iX," x[iX]= ",x[iX]);
      let multi=x[iX]*y[iY]+overflowDec;
      console.log   ("DO IF  x[iX]*y[iY]= ",x[iX]*y[iY]," overflowDec= ",overflowDec);
      if (multi >9) {
        overflowDec=Math.floor(multi/10);   
        str=str+String(multi%10);
        if (iX==0) str=str+overflowDec;
        console.log (">9 IF  overflowDec= ",overflowDec," str= ", str," multi%10= ",multi%10);    
      }
      else{
        str=str+String(multi);
        console.log ("<=9 IF  overflowDec= ",overflowDec," str= ", str," multi= ",multi);   
        overflowDec=0;
      }
    }
    arr.push(str);
  }
  console.log ("arrReverse=   ",arr);

  // делаем новый реверт массив полученных результатов (можно и без этого, но с этим будет нагляднее)
  function reverseStr(str) {
    return str.split("").reverse().join("");
  }
  for (var i = 0; i < arr.length; i++) {
    let strNumber= arr[i];
    arr[i]=reverseStr(strNumber);
  }
  console.log ("arr=   ",arr);


}