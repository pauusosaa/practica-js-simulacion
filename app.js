let btn = document.querySelector("button");
btn.addEventListener("click" , function(){
    let intervalos = document.getElementById("intervalos").value;
    let frecAbs = document.getElementById("frecAbs").value;
    let cantN =  document.getElementById("cantidadN").value;
    
    intervalos = intervalos.split(',')
    frecAbs = frecAbs.split(',')
    frecuenciasAbs = frecAbs.map(frecuencia => parseInt(frecuencia))
    cantN = parseInt(cantN)

    let nroMax= Math.max.apply(null, frecuenciasAbs);
    let divisor = nroMax>100? 1000 : nroMax <10? 10 : 100
    function dosDecimales(n) {
        let t=n.toString();
        let regex=/(\d*.\d{0,2})/;
        let rtado= t.match(regex)[0];
        return parseFloat(rtado)
    }

    let distribucionProb = frecuenciasAbs.map(frecuencia => frecuencia/divisor)
    let distribucionAcc = []
    for (let i = 0; i< intervalos.length; i++){
        if (i==0){
            distribucionAcc[i] = distribucionProb[i]
        }else{
            distribucionAcc[i] = distribucionProb[i]+distribucionAcc[i-1]
        }
    }

    let nrosAleatorios = []
    for(let n=0; n<cantN; n++){
        nrosAleatorios.push(dosDecimales(Math.random()))
    }

    let indices = nrosAleatorios.map(nro => distribucionAcc.findIndex(dist => nro<=dist))
    let vax = []
    indices.forEach(indice=> vax.push(intervalos[indice]))
    console.log(vax);
    console.log(nrosAleatorios);
    
   if(vax !== []){
    let respuesta = document.querySelector('.respuesta')
    respuesta.innerHTML = '<table><tr><td align="center">Número aleatorio y </td><td align="center">V.A.X correspondiente</td></tr></table>'
    let contenedor = document.querySelector('main')
    contenedor.style.flexDirection = "column"
    let tabla = document.querySelector('table');
    for ( let i =0; i<nrosAleatorios.length;i++){
        tabla.innerHTML += `<tr><td  align="center">${nrosAleatorios[i]}</td><td  align="center">${vax[i]}</td></tr>`
     }  
    
   }

    let elMain = document.querySelector('main');
    if(cantN<=5 && cantN>0){
        elMain.style.paddingBottom = '4%' 
    }else{
        elMain.style.paddingBottom = '3%' 
    }
   
})
