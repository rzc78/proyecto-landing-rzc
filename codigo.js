//SIMULADOR PARA PEDIDO DE PRESUPUESTOS RÁPIDOS

//Declaración de variables y arrays contenedores

let servBuscado;
const registroConsultas=[];
let servDesarrolloWeb=[];
let servDisenioGrafico=[];
let servFotografia=[];

//Pedidos de datos para funcionamiento: a JSON con arrays de servicios

obtenerServicios();

// sessionStorage.clear(`codigoProducto`) 

//HTML a desplegarse

const selectSrv=document.getElementById("selectSrv").hidden=true;
const form=document.getElementById("contenedorFormulario").hidden=true;


//FUNCIONALIDAD DE LOS BOTONES DE ACCESO

//Presupuestar---
const boton = document.getElementById("boton1")
boton.addEventListener("click", onclick)
boton.onclick = () => {seleccionarServicioPrueba()}

//Consultar Servicio---
const boton2=document.getElementById("boton2")
boton2.addEventListener("click",onclick)
boton2.onclick=()=>{buscarServ()}

//Función para traer datos de JSON

function obtenerServicios(){
    const URL_LOCAL="servicios.json";
    fetch(URL_LOCAL)
        .then( respuesta => respuesta.json())
        .then( datos => {
            servDesarrolloWeb=(datos[0]);
            servDisenioGrafico=(datos[1]);
            servFotografia=(datos[2]);
        })
}

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
        //Ternario
        valor==1? categoriaDesarrolloWeb():categoriaDisenioGrafico();
    }
}

function categoriaDesarrolloWeb(){
    const nuevo=document.getElementById("selectSrv");
    const selectDW=document.createElement("select");
    selectDW.className="form-select ordenCard";
    selectDW.setAttribute("id", "eleccion");
    selectDW.innerHTML=`
    <option selected>Elige el tipo de servicio</option>`
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
    selectDG.setAttribute("id", "eleccion");
    selectDG.innerHTML=`
    <option selected>Elige el tipo de servicio</option>`
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

function formulario(){
    const form=document.getElementById("contenedorFormulario").hidden=false;
    const formDatos=document.getElementById("formulario");
    formDatos.addEventListener("submit", validarForm);
}


function validarForm(e){
    e.preventDefault();
    const servElegido=JSON.parse(sessionStorage.getItem(`codigoProducto`));
    nombre=document.getElementById("nombre").value;
    apellido=document.getElementById("apellido").value;
    email=document.getElementById("email").value;
    telefono=document.getElementById("telefono").value;
    //Esto de las expresiones regulares lo leí en una documentación, pero no me estpa saliendo para el Tel. Copie una validación de mail y cuando tenga mas tiempo lo investigo bien. Funciona, aunque no se si está bien implementada
    let mensajeError= "";
    let entrar = false;
    let validarEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if(nombre.length <3){
        mensajeError+=`El nombre debe tener más de 3 caracteres `
        entrar = true
    }
    if(!validarEmail.test(email)){
        mensajeError+=`El email no es valido `
        entrar = true
    }
    if(entrar){Swal.fire({
            icon: 'error',
            title: 'Revisá los datos ingresados',
            text: 'Hay campos con datos incorrectos',
            text: `${mensajeError}`,
          })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Perfecto!',
            text: `Debajo ya está generado tu presupuesto`,
            showConfirmButton: false,
            timer: 1500
          })
        const cliente=new Persona(nombre, apellido, telefono, email, servElegido);
        registroConsultas.push(cliente);
        sessionStorage.setItem(`usuario`, JSON.stringify(registroConsultas));
        //Ternario 
        servElegido<100? renderizarPresupuestoWeb():renderizarPresupuestoDG();
    }
    
}

function Persona(nombre, apellido, telefono, mail, servicioConsultado){
    this.nombre=nombre
    this.apellido=apellido
    this.telefono=telefono
    this.mail=mail
    this.servicioConsultado=servicioConsultado
}

function renderizarPresupuestoWeb(){
    const servConsultado=JSON.parse(sessionStorage.getItem(`codigoProducto`));
    const resumenServConsultado1=servDesarrolloWeb.find((elemento)=>elemento.codigo===servConsultado);
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
    const container=document.getElementById("opcionesOperacion")
    container.className="d-grid gap-2"
    const btnDescargarPresu=document.createElement("button")
    btnDescargarPresu.className="btn btn-secundary btnInt";
    btnDescargarPresu.innerText=`Guardar como PDF`;
    container.append(btnDescargarPresu)
    btnDescargarPresu.addEventListener("click",onclick)
    btnDescargarPresu.onclick=()=>{generarPDF()}


}

function renderizarPresupuestoDG(){
    const servConsultado=JSON.parse(sessionStorage.getItem(`codigoProducto`));
    const resumenServConsultado1=servDisenioGrafico.find((elemento)=>elemento.codigo===servConsultado);
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
    </table>`

    const container=document.getElementById("opcionesOperacion")
    container.className="d-grid gap-2"
    const btnDescargarPresu=document.createElement("button")
    btnDescargarPresu.className="btn btn-secundary btnInt";
    btnDescargarPresu.innerText=`Guardar como PDF`;
    container.append(btnDescargarPresu)
    btnDescargarPresu.addEventListener("click",onclick)
    btnDescargarPresu.onclick=()=>{generarPDF()}
}

//Recupero datos de usuario el sessionStorage para acción futura (probablemente solo para recordarle que ya había solicitado presupuesto. AUN SIN DEFINIR)

const usuario=JSON.parse(sessionStorage.getItem(`usuario`));
// ------------------------------------------------------------------------------------

//FUNCION PARA BUSCADOR DE SERVICIOS UNICAMENTE
//Refiere a "Consultar Servicios". Solo busca y renderiza resultados

function buscarServ(){
    servBuscado=prompt("Buscá alguno de los servicios que tenemos para ofrecerte. Ingresá el servicio que querés buscar").toUpperCase();
    const resultado=servDesarrolloWeb.filter((item) => item.servicio.includes(servBuscado));
    const resultado2=servDisenioGrafico.filter((item) => item.servicio.includes(servBuscado));
    const resultado3=servFotografia.filter((item) => item.servicio.includes(servBuscado));
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

function generarPDF(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Listo!',
        text: `Tu presupuesto se descargó correctamente`,
        showConfirmButton: false,
        timer: 1500
    })
    const pdf = new jsPDF('l', 'px', 'letter', true, false, 2);
    pdf.fromHTML(impresion=document.getElementById("impresionResultados"));
    pdf.save('presupuesto.pdf');
}



// function validarForm(e){
//     e.preventDefault();
//     const servElegido=JSON.parse(sessionStorage.getItem(`codigoProducto`));
//     nombre=document.getElementById("nombre").value;
//     //Prueba de validacion con &&: solo para probar, la validación la tengo que estudiar y pensaba hacerla con switch
//     nombre.length<3 && Swal.fire({icon: 'error',title: 'Nombre inválido',text: 'Debe contener al menos 3 caracteres'});
//     apellido=document.getElementById("apellido").value;
//     email=document.getElementById("email").value;
//     telefono=document.getElementById("telefono").value;
//     Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'El registro se realizó con éxito',
//         showConfirmButton: false,
//         timer: 1500
//       })
//     const cliente=new Persona(nombre, apellido, telefono, email, servElegido);
//     registroConsultas.push(cliente);
//     sessionStorage.setItem(`usuario`, JSON.stringify(registroConsultas));
//     //Ternario 
//     servElegido<100? renderizarPresupuestoWeb():renderizarPresupuestoDG();
// }


