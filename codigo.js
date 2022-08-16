//SIMULADOR PARA PEDIDO DE PRESUPUESTOS RÁPIDOS

//Todo lo que devuelve aparece por consola

//Aquí hay que eliminar variables que no se van a utilizar.

let servicio;
let servElegido;
let servBuscado;
let mostrarRta;
let mensaje;
const servConsultado=JSON.parse(sessionStorage.getItem(`codigoProducto`));
const usuario=JSON.parse(sessionStorage.getItem(`usuario`));

const registroConsultas=[];

const servDesarrolloWeb=[
    {
        codigo: 10,
        servicio:"DISEÑO WEB BÁSICO",
        características:"Incluye un sitio web con 5 páginas y subida al servidor con el producto final terminado. No incluye servicios de tiendas y/o interacciones complejas",
        precio: 85000,
        observaciones: "No incluye diseño gráfico de piezas puntuales como logos, manipulación de imágenes, etc"
    },
    {
        codigo: 20,
        servicio:"DISEÑO WEB Y TIENDA",
        características:"Desarrollo web básico + gestión y construcción de una tienda web completa con funcionalidades de carro de compra. Desarrollo Web con servicio de diseño gráfico de todo el contenido",
        precio: 150000,
        observaciones: "No incluye diseño gráfico de piezas puntuales como logos, manipulación de imágenes, etc"
    },
    {
        codigo: 30,
        servicio:"DISEÑO WEB INTEGRAL",
        características:"Desarrollo Web con funcionalidades completas y diseño gráfico de todo el contenido. Construcción completa de la identidad visual del sitio (recomendado)",
        precio: 105000,
        observaciones: "No incluye tienda"
    },
    {
        codigo: 40,
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

//HTML oculto

const selectSrv=document.getElementById("selectSrv").hidden=true;
const form=document.getElementById("contenedorFormulario").hidden=true;
// const contenedorRender=document.getElementById("impresionResultados").hidden=true;
// const contenedorBuscador=document.getElementById("mostrarServ").hidden=true;


//FUNCIONALIDAD DE LOS BOTONES DE ACCESO

const boton = document.getElementById("boton1")
boton.addEventListener("click", onclick)
boton.onclick = () => {seleccionarServicioPrueba()}
const boton2=document.getElementById("boton2")
boton2.addEventListener("click",onclick)
boton2.onclick=()=>{buscarServ()}


//FUNCIONES DE SELECCION DE SERVICIOS A PRESUPUESTAR

function seleccionarServicioPrueba(){
    const selectSrv=document.getElementById("selectSrv").hidden=false;
    const botonContinuar=document.getElementById("btnContinuar");
    botonContinuar.addEventListener("click", onclick)
    botonContinuar.onclick=()=>{
        eleccionServicio()
        botonContinuar.hidden=true}
}

function eleccionServicio(){
    const opcionesPresu=document.getElementById("presupuestar");
    const desarrolloWeb=document.createElement("p")
    desarrolloWeb.innerHTML=`
    <p>Elegí que servicio de los disponibles deseas presupuestar. Actualmente tenemos dos opciones para que puedas tener un presupuesto rápido: los servicios de DESARROLLO WEB, que incluyen distintas variantes a la hora de construir una web acorde a tus necesidades y el servicio de DISEÑO GRÁFICO con opciones tanto de diseño editorial, gráfico y para web.</p>`

    opcionesPresu.append(desarrolloWeb)
    const eligeServicio=document.createElement("select");
    eligeServicio.className="form-select ordenCard";
    eligeServicio.setAttribute("id", "eleccionCategoria")
    eligeServicio.innerHTML+=`
    <option selected>Elige una categoría</option>
    <option value="1">Desarrollo Web</option>
    <option value="2">Diseño Gráfico</option>
    `
    desarrolloWeb.append(eligeServicio);
    eligeServicio.onchange=function(){
        const valor=document.getElementById("eleccionCategoria").value;
        if(valor==1){
            categoriaDesarrolloWeb();
        }else if(valor==2){
            categoriaDisenioGrafico();
        }
    }
}

function categoriaDesarrolloWeb(){
    const nuevo=document.getElementById("selectSrv");
    const selectDW=document.createElement("select");
    selectDW.className="form-select ordenCard";
    selectDW.setAttribute("id", "eleccion")
    selectDW.innerHTML=`
        <option selected>Elige un servicio</option>`
    for(const item of servDesarrolloWeb){
        selectDW.innerHTML+=`
        <option value="${item.codigo}">${item.servicio}</option>`
        nuevo.append(selectDW);
    }
    selectDW.onchange=function(){
        const eleccion=document.getElementById("eleccion").value;
        sessionStorage.setItem(`codigoProducto`, eleccion);
        formulario()
    }
}

function categoriaDisenioGrafico(){
    const nuevo=document.getElementById("selectSrv");
    const selectDG=document.createElement("select");
    selectDG.className="form-select ordenCard";
    selectDG.setAttribute("id", "eleccion")
    for(const item of servDisenioGrafico){
        selectDG.innerHTML+=`
        <option value="${item.codigo}">${item.servicio}</option>`
        nuevo.append(selectDG);
        }
    selectDG.onchange=function(){
        const eleccion=document.getElementById("eleccion").value;
        sessionStorage.setItem(`codigoProducto`, eleccion);
        formulario()
    }
}

//FALTA traer el evento consultado e integrarlo a la función. 

function formulario(){
    const form=document.getElementById("contenedorFormulario").hidden=false;
    const formDatos=document.getElementById("formulario");
    formDatos.addEventListener("submit", validarForm);
}

function validarForm(e){
    e.preventDefault();
    nombre=document.getElementById("nombre").value;
    apellido=document.getElementById("apellido").value;
    email=document.getElementById("email").value;
    telefono=document.getElementById("telefono").value;
    const cliente=new Persona(nombre, apellido, telefono, email, servConsultado);
    registroConsultas.push(cliente);
    sessionStorage.setItem(`usuario`, JSON.stringify(registroConsultas))
    if(servConsultado<100){
        renderizarPresupuestoWeb()
    }else if(servConsultado>100){
        renderizarPresupuestoDG();
    }

}

function Persona(nombre, apellido, telefono, mail, servicioConsultado){
    this.nombre=nombre
    this.apellido=apellido
    this.telefono=telefono
    this.mail=mail
    this.servicioConsultado=servicioConsultado
}

//Find que busca el código y trae todo el objeto

const resumenServConsultado1=servDesarrolloWeb.find((elemento)=>elemento.codigo==servConsultado);
const resumenServConsultado2=servDisenioGrafico.find((elemento)=>elemento.codigo==servConsultado);

function renderizarPresupuestoWeb(){
    const impresion=document.getElementById("impresionResultados");
    impresion.innerHTML=`
    <h3>Presupuesto de servicios en línea</h3>
    <p>A continuación obtendrás un extracto del presupuesto por el servicio que has solicitado:</p>
    <p>Nombre: ${nombre}</p>
    <p>Apellido: ${apellido}</p>
    <p>Teléfono: ${telefono}</p>
    <p>Correo electrónico: ${email}</p>
    <table class="table table-striped">
    <tr>
        <th>Código Servicio</th>
        <th>Servicio</th>
        <th>Caractertísticas</th>
        <th>Precio</th>
        <th>Observaciones</th>
    </tr>
    <tr>
        <td>${resumenServConsultado1.codigo}</td>
        <td>${resumenServConsultado1.servicio}</td>
        <td>${resumenServConsultado1.características}</td>
        <td>${resumenServConsultado1.precio}</td>
        <td>${resumenServConsultado1.observaciones}</td>
    </tr>
    </table>
    `
}

function renderizarPresupuestoDG(){
    const impresion=document.getElementById("impresionResultados");
    impresion.innerHTML=`
    <h3>Presupuesto de servicios en línea</h3>
    <p>A continuación obtendrás un extracto del presupuesto por el servicio que has solicitado:</p>
    <p>Nombre: ${nombre}</p>
    <p>Apellido: ${apellido}</p>
    <p>Teléfono: ${telefono}</p>
    <p>Correo electrónico: ${email}</p>
    <table class="table table-striped">
    <tr>
        <th>Código Servicio</th>
        <th>Servicio</th>
        <th>Caractertísticas</th>
        <th>Precio</th>
        <th>Observaciones</th>
    </tr>
    <tr>
        <td>${resumenServConsultado2.codigo}</td>
        <td>${resumenServConsultado2.servicio}</td>
        <td>${resumenServConsultado2.características}</td>
        <td>${resumenServConsultado2.precio}</td>
        <td>${resumenServConsultado2.observaciones}</td>
    </tr>
    </table>`
}

//FUNCION PARA BUSCADOR DE SERVICIOS UNICAMENTE

function buscarServ(){
    servBuscado=prompt("Buscá alguno de los servicios que tenemos para ofrecerte. Ingresá el servicio que querés buscar").toUpperCase();
    const resultado=servDesarrolloWeb.filter((item) => item.servicio.includes(servBuscado));
    const resultado2=servDisenioGrafico.filter((item) => item.servicio.includes(servBuscado));
    const resultado3=servFotografia.filter((item) => item.servicio.includes(servBuscado));
    // console.log (resultado, resultado2, resultado3);
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
