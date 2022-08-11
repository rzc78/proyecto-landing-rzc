//SIMULADOR PARA PEDIDO DE PRESUPUESTOS RÁPIDOS

//Todo lo que devuelve aparece por consola

//Aquí hay que eliminar variables que no se van a utilizar.

let servicio;
let nombre;
let apellido;
let telefono;
let email;
let servElegido;
let servBuscado;
let mostrarRta;
let mensaje;


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
        características:"Desarrollo web básico + gestión y construcción de una tienda web completa con funcionalidades de carro de compra. Desarrollo Web con servicio de diseño gráfico de todo el contenido",
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
        características: "Diseño gráfico para sitios web: construcción de piezas a medida para vestir sitios web y gestión de imagen de marca",
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

//Funcionalidad de los botones de acceso

const boton = document.getElementById("boton1")
boton.addEventListener("click", onclick)
boton.onclick = () => {seleccionarServicioPrueba()}
const boton2=document.getElementById("boton2")
boton2.addEventListener("click",onclick)
boton2.onclick=()=>{buscarServ()}

//Para seleccionar servicios y presupuestar

function seleccionarServicioPrueba(){

    servicio=parseInt(prompt("Elegí el servicio que deseas contratar:\n1)Desarrollo Web\n2)Diseño gráfico para RRSS"));
    if(servicio==1){
        const selectDW=document.createElement("select");
        selectDW.className="form-select ordenCard";
        selectDW.setAttribute("id", "eleccion")
        for(const item of servDesarrolloWeb){
        selectDW.innerHTML+=`
        <option value="${item.codigo}">${item.servicio}</option>
        `
        const contenedor=document.getElementById("presupuestar");
        contenedor.append(selectDW);
        }
        selectDW.onchange=function(){
            // const itemSeleccionado=selectDW.value;
            formulario()
        }
        
    }else if(servicio==2){
        const selectDG=document.createElement("select");
        selectDG.className="form-select";
        for(const item of servDisenioGrafico){
        selectDG.innerHTML+=`
        <option value="${item.codigo}">${item.servicio}</option>
        `
        const contenedor=document.getElementById("presupuestar");
        contenedor.append(selectDG);
        }
        selectDG.onchange=function(){
            // seleccionado=selectDG.value;
            formulario();
        }
    }else{
        for (let i=1; i<2; i++){
            alert("El valor ingresado es inexistente.")
            seleccionarServicio();
    }
    }
}

function buscarServ(){
    servBuscado=prompt("Buscá alguno de los servicios que tenemos para ofrecerte. Ingresá el servicio que querés buscar").toUpperCase();
    const resultado=servDesarrolloWeb.filter((item) => item.servicio.includes(servBuscado));
    const resultado2=servDisenioGrafico.filter((item) => item.servicio.includes(servBuscado));
    const resultado3=servFotografia.filter((item) => item.servicio.includes(servBuscado));
    console.log (resultado, resultado2, resultado3);
    const servBusc=document.createElement("cards");
    servBusc.className="card text-center"
    for(const item of resultado){
        servBusc.innerHTML+=`
        <div>
            <div class="card-header">
                ${item.servicio}
            </div>
            <div class="card-body">
                <h5 class="card-title">$${item.precio}</h5>
                <p class="card-text">${item.características}</p>
                <p class="card-text">${item.observaciones}</p>
                <a href="#" class="btn btn-primary">Continuar</a>
            </div>
            <div class="card-footer">
            </div>
        </div>`
    }
    for(const item of resultado2){
        servBusc.innerHTML+=`
        <div class="flexCard">
            <div class="card-header">
                ${item.servicio}
            </div>
            <div class="card-body">
                <h5 class="card-title">$${item.precio}</h5>
                <p class="card-text">${item.características}</p>
                <p class="card-text">${item.observaciones}</p>
                <a href="#" class="btn btn-primary">Continuar</a>
            </div>
            <div class="card-footer">
            </div>
        </div>`
    }
    for(const item of resultado3){
        servBusc.innerHTML+=`
        <div>
            <div class="card-header">
                ${item.servicio}
            </div>
            <div class="card-body">
                <h5 class="card-title">$${item.precio}</h5>
                <p class="card-text">${item.características}</p>
                <p class="card-text">${item.observaciones}</p>
                <a href="#" class="btn btn-primary">Continuar</a>
            </div>
            <div class="card-footer">
            </div>
        </div>`
    }
    const contenedor=document.getElementById("mostrarServ");
    contenedor.append(servBusc);

}

//FALTA traer el evento consultado e integrarlo a la función. 

function formulario(precio){
    
    const formularioDatos=document.getElementById("formulario").innerHTML=`
    <form class="col-xl-6 col-lg-6 col-xs formCentrado">
        <h2 class="subtitulo">Perfecto. Ahora dejanos tus datos de contacto y listo. Ya tenés tu presupuesto</h2>
        <input id="nombre" type="text" placeholder="Ingresa tu nombre" name="name">
        <input id="apellido" type="text" placeholder="Ingresa tu apellido" name="surname">
        <input id="email" type="email" placeholder="Ingresa tu e-mail" name="email">
        <input id="telefono" type="tel" placeholder="Ingresa tu teléfono" name="tel">
        <div>
            <input type="submit" class="btn btnModificado" value="ENVIAR">
        </div>
    </form>`
}

const datosForm=document.getElementById("formulario");
datosForm.addEventListener("submit", validarForm);

function validarForm(e){
    e.preventDefault();
    nombre=document.getElementById("nombre").value;
    apellido=document.getElementById("apellido").value;
    email=document.getElementById("email").value;
    telefono=document.getElementById("telefono").value;
    const cliente=new Persona(nombre, apellido, telefono, email, servElegido);
    console.log(cliente)
}



function Persona(nombre, apellido, telefono, mail, servicioConsultado){
    this.nombre=nombre
    this.apellido=apellido
    this.telefono=telefono
    this.mail=mail
    this.servicioConsultado=servicioConsultado
}



