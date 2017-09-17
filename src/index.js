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

  //console.log ("x= ",x, " y= ",y);
  x="999";
  y="111";

  let arr=[];
  for (var iY = y.length-1; iY >=0; iY--) {
    let str="";
    console.log("iY= ",iY, " y[iY]= ",y[iY]);
    let overflowDec=0;
    for (var iX = x.length-1; iX >=0; iX--) {
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

  console.log ("arr=   ",arr);

}