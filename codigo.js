//SIMULADOR PARA PEDIDO DE PRESUPUESTOS RÁPIDOS

//Todo lo que devuelve aparece por consola

let derivador;
let servicio;
let desarrolloWeb;
let disenioGrafico;
let confirma;
let nombreApellido;
let telefono;
let email;
let precio;
let servElegido;
let servBuscado;

const PreciosDesWeb=[85000, 50000, 105000, 145000, ];
const PreciosDisenio=[30000];
const PreciosFoto=[3000, 100, 1500];

const servDesarrolloWeb=[
    {
        codigo: 001,
        servicio:"DISEÑO WEB BÁSICO",
        características:"Incluye un sitio web con 5 páginas y subida al servidor con el producto final terminado. No incluye servicios de tiendas y/o interacciones complejas",
        precio: 85000,
        observaciones: "No incluye diseño gráfico de piezas puntuales como logos, manipulación de imágenes, etc"
    },
    {
        codigo: 002,
        servicio:"DISEÑO WEB Y TIENDA",
        características:"Desarrollo web básico + gestión y construcción de una tienda web completa con funcionalidades de carro de compra\n\n3)Desarrollo Web con servicio de diseño gráfico de todo el contenido",
        precio: 150000,
        observaciones: "No incluye diseño gráfico de piezas puntuales como logos, manipulación de imágenes, etc"
    },
    {
        codigo: 003,
        servicio:"DISEÑO WEB INTEGRAL",
        características:"Desarrollo Web con funcionalidades completas y diseño gráfico de todo el contenido. Construcción completa de la identidad visual del sitio (recomendado)",
        precio: 105000,
        observaciones: "No incluye tienda"
    },
    {
        codigo: 004,
        servicio:"PAGINA WEB DESARROLLADA EN WORDPRESS",
        características:"Desarrollo Web con funcionalidades completas bajo los parámetros de este sistema. Automatización de servicios alojados en el sistema y 10 hs de entrenamiento para subida y mantenimiento de la web",
        precio: 145000,
        observaciones: "Incluye 10 hs de capacitación virtual al RRHH mediante plataforma de ZOOM"
    }
];

const servDisenioGrafico=[
    {
        codigo:101,
        servicio: "DISEÑO GRÁFICO EDITORIAL" ,
        características: "Enfocado en el diseño de piezas para impresión, revistas, folletos y gran formato\n2)Diseño gráfico para sitios web: construcción de piezas a medida para vestir sitios web y gestión de imagen de marca.",
        precio: "A convenir, dependiendo del tamaño y características del proyecto",
        observaciones: "Enfocado en diseño de revistas y dossiers intitucionaes y de prensa."
    },
    {
        codigo:102,
        servicio: "DISEÑO GRÁFICO WEB",
        caracteristicas: "Diseño gráfico para sitios web: construcción de piezas a medida para vestir sitios web y gestión de imagen de marca",
        precio: 30000,
        observaciones: "No incluye la creación de una identidad de marca, sino de adaptaciones de lo existente y la creación de piezas a medida."
    }
];

const servFotografia=[
    {
        codigo: 201,
        servicio:"COBERTURA DE EVENTOS DEPORTIVOS",
        características:"",
        precio: 3000,
        observaciones: "El precio es por jornada de trabajo de hasta 3 hs. Precio sujeto a eventos de duración mayor y continuidad del mismo. Viáticos no incluídos."
    },
    {
        codigo: 202,
        servicio:"FOTOGRAFIA DE ESTUDIO",
        características:"Fotografía publicitaria de personas para uso editorial, tiendas, publicidades de todo tipo.",
        precio: "A convenir",
        observaciones: "Sujeto al tamaño de producción, personas involucradas y requerimientos técnicos y de recursos humanos para desarrollar el trabajo."
    },
    {
        codigo: 203,
        servicio:"FOTOGRAFIA DE PRODUCTOS",
        características:"Fotografía de bodegones en estudio. Utilización de flashes y fondos especiales para productos alimenticios, opticas, fotografía para e-commerce, entre otras.",
        precio: 100,
        observaciones: "El valor expresado es por unidad fotografiada. A convenir paquetes de productos en cantidades superiores a 50 unidades."
    },
    {
        codigo: 204,
        servicio:"RETOQUE DIGITAL",
        características:"Retoque digital en Photoshop. Sobre imágenes NEFF o RAW, retoque de fotografía con quitado de detalles (poro, suciedad, imperfecciones), corrección de color. Reacondicionamiento general de detalles. Apto impresión de gran formato, digital, editorial.",
        precio: 1500,
        observaciones: "El precio expresado es por hora de trabajom sujeto a cantidad de originales a restaurar."
    }
];


seleccionarAccion();

function seleccionarAccion(){
   derivador=parseInt(prompt("Bievenido y gracias por tu interés. Indicanos que querés hacer:\n1)Solicitar un presupuesto rápido de los servicios disponibles\n2)Conocer todos los servicios que tenemos para ofrecerte"));
   if(derivador==1){
        seleccionarServicio();
        }else if(derivador==2){
        buscarServ()
        formulario()
        }else{
        for (let i=1; i<2; i++){
            alert("El valor ingresado es inexistente.")
            seleccionarAccion();
    }
}
}

function seleccionarServicio(){
    servicio=parseInt(prompt("Elegí el servicio que deseas contratar:\n1)Desarrollo Web\n2)Diseño gráfico para RRSS"));
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
}

function mostrarDesarrolloWeb(){
    desarrolloWeb=prompt("Dentro del servicio de Desarrollo web, contamos con tres variantes de productos. Elegí el que más te convenga, según tus necesidades:\n\n1)Desarrollo Web Básico: incluye un sitio web con 5 páginas y subida al servidor con el producto final terminado. No incluye servicios de tiendas y/o interacciones complejas. \n\n2)Desarrollo Web + Tienda: Al servicio desarrollo web, se le suma la gestión y construcción de una tienda web completa\n\n3)Desarrollo Web con servicio de diseño gráfico de todo el contenido");
    if(desarrolloWeb==1){
        confirma=prompt("El costo del servicio es de $"+PreciosDesWeb[0]+" .Presioná S o N para confirmar y registrar tus datos").toUpperCase();
        if ((confirma=="S")){
            precio=PreciosDesWeb[0];
            formulario(servDesarrolloWeb[0]);
            alert("Gracias! (constructor en consola con datos del usuario");
        }else if ((confirma=="N")){
            alert("Gracias, hasta la próxima");
        }else{
            alert("El valor ingresado es incorrecto")
            mostrarDesarrolloWeb()
        }
    }else if(desarrolloWeb==2){
        confirma=prompt("El costo del servicio es de $ "+PreciosDesWeb[1]+" .Presioná S o N para confirmar y registrar tus datos").toUpperCase();
        if ((confirma=="S")){
            precio=PreciosDesWeb[1];
            formulario(servDesarrolloWeb[1]);
            alert("Gracias! (constructor en consola con datos del usuario");
        }else if ((confirma=="N")){
            alert("Gracias, hasta la próxima");
        }else{
            alert("El valor ingresado es incorrecto")
            mostrarDesarrolloWeb()
            
        }
    }else if(desarrolloWeb==3){
        confirma=prompt("El costo del servicio es de $ "+PreciosDesWeb[2]+" .Presioná S o N para confirmar y registrar tus datos").toUpperCase();
        if ((confirma=="S")){
            precio=PreciosDesWeb[2];
            formulario(servDesarrolloWeb[2]);
            alert("Gracias! (constructor en consola con datos del usuario");
        }else if ((confirma=="N")){
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
        confirma=prompt("Este servicio, por ser complejo y sujeto a una gran variedad de proyectos, debe ser presupuestado cumpliendo otros requisitos. Presioná S si te interesa y nos contactamos, sino N para cancelar").toUpperCase();
        if ((confirma=="S")){
            formulario(servDisenioGrafico[0]);
        }else if ((confirma=="N")){
            alert("Gracias, hasta la próxima");
        }else{
            alert("El valor ingresado es incorrecto");
            mostrarDisenio()
        }
    }else if(disenioGrafico==2){
        confirma=prompt("El costo estimado del servicio para un sitio web de hasta 6 páginas es de $ "+PreciosDisenio+" .Presioná S o N para confirmar si estás interesado y registrar tus datos").toUpperCase();
        if ((confirma=="S")){
            precio=PreciosDisenio;
            formulario(servDisenioGrafico[1])
            alert("Gracias! (constructor en consola con datos del usuario");
        }else if ((confirma=="N")){
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

function buscarServ(){
    servBuscado=prompt("Buscá alguno de los servicios que tenemos para ofrecerte. Ingresá el servicio que querés buscar").toUpperCase();
    const resultado=servDesarrolloWeb.filter((item) => item.servicio.includes(servBuscado));
    const resultado2=servDisenioGrafico.filter((item) => item.servicio.includes(servBuscado));
    const resultado3=servFotografia.filter((item) => item.servicio.includes(servBuscado));
    console.log (resultado, resultado2, resultado3);

}

function formulario(precio){
    nombreApellido=prompt("Ingresá tu nombre y apellido");
    telefono=prompt("Ingresá tu teléfono");
    email=prompt("Ingresá tu email");
    servElegido=precio;
    console.log("Pronto te estaremos llamando para informarte más sobre el servicio que elegiste");
    
}

function Persona(nombre, telefono, mail, servicioConsultado){
    this.nombre=nombre
    this.telefono=telefono
    this.mail=mail
    this.servicioConsultado=servicioConsultado
}
const cliente=new Persona(nombreApellido, telefono, email, servElegido);
console.log(cliente)

