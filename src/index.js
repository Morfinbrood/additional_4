module.exports = function multiply(first, second) {
  "use strict"

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

 // x="999";
 // y="888";

  // получаем массив со строками 1-го этапа поциферного перемножения столбиком - результаты в строках и перевернуты, т.е. 123*11= ["321", "321"]
  let arr=[];
  let offseDecs="none";
  for (let iY = y.length-1; iY >=0; iY--) {
    let str="";
    //console.log("iY= ",iY, " y[iY]= ",y[iY]);
    let overflowDec=0;
    for (let iX = x.length-1; iX >=0; iX--) {
      //console.log("iX= ",iX," x[iX]= ",x[iX]);
      let multi=x[iX]*y[iY]+overflowDec;
      //console.log   ("DO IF  x[iX]*y[iY]= ",x[iX]*y[iY]," overflowDec= ",overflowDec);
      if (multi >9) {
        overflowDec=Math.floor(multi/10);   
        str=str+String(multi%10);
        if (iX==0) str=str+overflowDec;
        //console.log (">9 IF  overflowDec= ",overflowDec," str= ", str," multi%10= ",multi%10);    
      }
      else{
        str=str+String(multi);
        //console.log ("<=9 IF  overflowDec= ",overflowDec," str= ", str," multi= ",multi);   
        overflowDec=0;
      }
    }
    if (offseDecs=="none") offseDecs="";
    else offseDecs=offseDecs+"0";
    //console.log(" str+offseDecs=",offseDecs+ str);
    arr.push(offseDecs+str);
  }
  //console.log ("arrReverse=   ",arr);

  // делаем новый реверт массив полученных результатов (можно и без этого, но с этим будет нагляднее)
  function reverseStr(str) {
    return str.split("").reverse().join("");
  }
  for (let i = 0; i < arr.length; i++) {
    let strNumber= arr[i];
    arr[i]=reverseStr(strNumber);
  }
  //console.log ("arr=   ",arr);

  
  function sumColumn (arrNumbStr){
    let resultSumStr=arrNumbStr[0];
    for (let iArr = 1; iArr < arrNumbStr.length; iArr++) { //i От 1 потому что  x=arrNumbStr[0]; 2 потому что мы текущее число складываем со след.
      x=resultSumStr;
      y=arrNumbStr[iArr];
      //console.log("x.length= ",x.length," y.length= ",y.length);
      if (y.length>x.length){  // делаем так чтобы у нас сверху было число больше разрядности.
        let subVal=x;
        x=y;
        y=subVal;
      }
      //console.log ("iArr=", iArr," x= ",x," y= ",y);
      let str="";
      let overflowDec=0;
      for (let i = 1; i <= x.length; i++) {  //i - посимвольное смещение от конца  i=1 потому что при смещении 0 у нас будут траблы с x[length]
        let numbX=Number(x[x.length-i]);
        let numbY=0;
        if (i>y.length) numbY=0;     //  как только заканчиваются разряды меньшего числа подсовываем нули для сложения
        else numbY=Number(y[y.length-i]);
        let sum = numbX + numbY+overflowDec;
        //console.log("numbX= ", numbX," numbY= ",numbY," sum= ",sum);
        if (sum >9) {
          overflowDec=Math.floor(sum/10);   
          str=str+String(sum%10);
          if (i==x.length) str=str+overflowDec;  
        }
        else{
          str=str+String(sum);
          overflowDec=0;
        }   
      }
      str=reverseStr(str);
      //console.log ("resultSumStr= ",str);
      resultSumStr=str;
    }
    return resultSumStr;
  }
  //arr=["123","456","789"];
  //console.log ("arr=   ",arr);
  // console.log("sumColumn(arr)=  ",sumColumn(arr));
  return sumColumn(arr);

}