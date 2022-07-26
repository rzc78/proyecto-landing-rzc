//SIMULADOR DE PRESUPUESTO RÁPIDO

function formulario(){
    nombreApellido=prompt("Ingresá tu nombre y apellido");
    telefono=prompt("Ingresá tu teléfono");
    email=prompt("Ingresá tu email");
    alert("Gracias por elegirnos. Si tus datos son correctos, nos estaremos contactando por el servicio solicitado:\n"+nombreApellido+"\n"+telefono+"\n"+email+"\n\nEl costo del servicio presupuestado es de "+precio+" sin IVA.\nCon IVA es de "+(precio*IVA));
}

let servicio;
let desarrolloWeb;
let disenioGrafico;
let confirma;
let nombreApellido;
let telefono;
let email;
let precio;
const IVA=1.21;
const DWEBBASICO=85000;
const DWEBTIENDA=150000;
const DWEBDISENIO=105000;
const DISENIOGRAFICOWEB=30000;

seleccionarServicio()

if(servicio==1){
    mostrarDesarrolloWeb();
}else if(servicio==2){
    mostrarDisenio();
}else{
    for (let i=1; i<2; i++){
    alert("El valor ingresado es inexistente.")
    seleccionarServicio();
}
}

function seleccionarServicio(){
    servicio=parseInt(prompt("Elegí el servicio que deseas contratar:\n1)Desarrollo Web\n2)Diseño gráfico para RRSS"));
}

function mostrarDesarrolloWeb(){
    desarrolloWeb=prompt("Dentro del servicio de Desarrollo web, contamos con tres variantes de productos. Elegí el que más te convenga, según tus necesidades:\n\n1)Desarrollo Web Básico: incluye un sitio web con 5 páginas y subida al servidor con el producto final terminado. No incluye servicios de tiendas y/o interacciones complejas. \n\n2)Desarrollo Web + Tienda: Al servicio desarrollo web, se le suma la gestión y construcción de una tienda web completa\n\n3)Desarrollo Web con servicio de diseño gráfico de todo el contenido");
    if(desarrolloWeb==1){
        confirma=prompt("El costo del servicio es de $"+DWEBBASICO+" .Presioná S o N para confirmar y registrar tus datos");
        if ((confirma=="S")||(confirma=="s")){
            precio=DWEBBASICO;
            formulario();
            alert("Gracias!");
        }else if ((confirma=="N")||(confirma=="n")){
            alert("Gracias, hasta la próxima");
        }else{
            alert("El valor ingresado es incorrecto")
            mostrarDesarrolloWeb()
        }
    }else if(desarrolloWeb==2){
        confirma=prompt("El costo del servicio es de $ "+DWEBTIENDA+" .Presioná S o N para confirmar y registrar tus datos");
        if ((confirma=="S")||(confirma=="s")){
            precio=DWEBTIENDA;
            formulario()
            alert("Gracias!");
        }else if ((confirma=="N")||(confirma=="n")){
            alert("Gracias, hasta la próxima");
        }else{
            alert("El valor ingresado es incorrecto")
            mostrarDesarrolloWeb()
            
        }
    }else if(desarrolloWeb==3){
        confirma=prompt("El costo del servicio es de $ "+DWEBDISENIO+" .Presioná S o N para confirmar y registrar tus datos");
        if ((confirma=="S")||(confirma=="s")){
            precio=DWEBDISENIO;
            formulario()
            alert("Gracias!");
        }else if ((confirma=="N")||(confirma=="n")){
            alert("Gracias, hasta la próxima");
        }else{
            alert("El valor ingresado es incorrecto")
            mostrarDesarrolloWeb()
        }
    }else{
        alert("El valor ingresado es incorrecto");
        mostrarDesarrolloWeb();
    }
}

function mostrarDisenio(){
    disenioGrafico=prompt("Disponemos de dos servicios de diseño gráfico. Elegí la opción que más te convenga:\n1)Diseño editorial: enfocado en el diseño de piezas para impresión, revistas, folletos y gran formato\n2)Diseño gráfico para sitios web: construcción de piezas a medida para vestir sitios web y gestión de imagen de marca");
    if(disenioGrafico==1){
        confirma=prompt("Este servicio, por ser complejo y sujeto a una gran variedad de proyectos, debe ser presupuestado cumpliendo otros requisitos. Presioná S si te interesa y nos contactamos, sino N para cancelar");
        if ((confirma=="S")||(confirma=="s")){
            formulario();
        }else if ((confirma=="N")||(confirma=="n")){
            alert("Gracias, hasta la próxima");
        }else{
            alert("El valor ingresado es incorrecto");
            mostrarDisenio()
        }
    }else if(disenioGrafico==2){
        confirma=prompt("El costo estimado del servicio para un sitio web de hasta 6 páginas es de $ "+DISENIOGRAFICOWEB+" .Presioná S o N para confirmar si estás interesado y registrar tus datos");
        if ((confirma=="S")||(confirma=="s")){
            precio=DISENIOGRAFICOWEB;
            formulario();
        }else if ((confirma=="N")||(confirma=="n")){
            alert("Gracias, hasta la próxima");
        }else{
            alert("El valor ingresado es incorrecto"); 
            mostrarDisenio()
        }
    }else{
        alert("El valor ingresado es incorrecto");
        mostrarDisenio();
    }
}