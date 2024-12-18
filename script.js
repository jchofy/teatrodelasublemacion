
document.addEventListener('DOMContentLoaded', () => {
    const btnPlay = document.getElementById('btn-play'); // Botón Play
    const menuInicio = document.getElementById('menu-inicio'); // Menú de inicio
    const pantallaJuego = document.getElementById('pantalla-juego'); // Pantalla del juego
    const areaVestir = document.getElementById('area-vestir'); // Contenedor de figura y prendas
    const mensaje = document.getElementById('mensaje'); // Contenedor del mensaje dinámico
    const audio = document.getElementById('miaudio');


    let mensajeInterval = null; // Variable para almacenar el intervalo del mensaje


    btnPlay.addEventListener('click', () => {
        menuInicio.style.display = 'none'; // Oculta el menú inicial
        pantallaJuego.style.display = 'flex'; // Muestra la pantalla del juego
        audio.currentTime = 132; // Inicia la música en el segundo 132
        audio.muted = false; // Reproduce la música al hacer clic
        audio.play();
    });
    
    // Detectar cuando la música llega al segundo 175 y reiniciarla al segundo 132
    audio.addEventListener('timeupdate', () => {
        if (audio.currentTime >= 175) {
            audio.currentTime = 132; // Reinicia la música al segundo 132
        }
    });

    // Variables para almacenar las prendas seleccionadas por categoría
    let prendaCamisa = null;
    let prendaZapatos = null;
    let prendaGorra = null;
    let prendaMascara = null;
    let prendaRopaSeñora = null;
    let prendaPeluca = null;

    // Seleccionar todas las prendas de ropa
    const prendas = document.querySelectorAll('.ropa');
    const textonombre = document.querySelector('#textonombre');

    prendas.forEach(prenda => {
        prenda.addEventListener('click', () => {
            const categoria = prenda.getAttribute('alt'); // Usamos el atributo alt para determinar la categoría de la prenda

            // Limpiar el mensaje anterior si existe
            if (mensajeInterval) {
                clearInterval(mensajeInterval); // Detener el intervalo del mensaje anterior
                mensaje.textContent = ''; // Limpiar el mensaje
            }

            // Si ya hay ropa de señora puesta y se hace clic en otra prenda que no es de señora
            if (prendaRopaSeñora && !categoria.includes('ropaseñora')) {
                prendaRopaSeñora.remove(); // Eliminar ropa de señora
                prendaRopaSeñora = null; // Reiniciar la variable
            }

            // Control de la máscara: Si ya está puesta, no se puede poner gorra ni peluca
            if (prendaMascara && (categoria.includes('gorrita') || categoria.includes('peluca'))) {
                // Eliminar la máscara si se hace clic en la peluca o gorra
                prendaMascara.remove();
                prendaMascara = null; // Reiniciar la variable
            }

            // Control de la gorra o peluca: Si ya hay una, no se puede poner la máscara
            if ((prendaGorra || prendaPeluca) && categoria.includes('mascara')) {
                // Eliminar la gorra y/o la peluca antes de poner la máscara
                if (prendaGorra) prendaGorra.remove();
                if (prendaPeluca) prendaPeluca.remove();

                prendaGorra = null; // Reiniciar la variable
                prendaPeluca = null; // Reiniciar la variable
            }

            // Si la prenda seleccionada es una camisa
            if (categoria.includes('camisa')) {
                // Si ya existe una camisa colocada, eliminarla antes de añadir una nueva
                if (prendaCamisa) prendaCamisa.remove();
            
                // Crear una nueva imagen de camisa
                const nuevaCamisa = document.createElement('img');
                nuevaCamisa.src = prenda.src;
                nuevaCamisa.classList.add('prenda-colocada', 'camisa-colocada');  // Añadir ambas clases
                nuevaCamisa.setAttribute('data-categoria', categoria);
                
                // Agregar la camisa al principio del contenedor
                areaVestir.prepend(nuevaCamisa);
            
                // Asignar la referencia a prendaCamisa para futuras referencias
                prendaCamisa = nuevaCamisa;
            
                // Mostrar mensaje cuando se seleccione la camisa de hombre
                if (categoria.includes('camisa_hombre')) {
                    mostrarMensaje("¿Ese traje se ve demasiado masculino en ti, por qué no pruebas un vestido?¡Pareces un hombre!");
                }
            
                // Cambiar el mensaje para la camisa de mujer
                if (categoria.includes('camisa_mujer')) {
                    mostrarMensaje("Ese vestido es muy elegante, pero no pareces lo suficientemente femenina para llevarlo.");
                }
            
                // Establecer el nombre de la figura como 'Desconocido'
                textonombre.textContent = 'Desconocido';
            }
            

            // Si la prenda seleccionada son zapatos
            if (categoria.includes('zapatos')) {
                if (prendaZapatos) prendaZapatos.remove();
                const nuevosZapatos = document.createElement('img');
                nuevosZapatos.src = prenda.src;
                nuevosZapatos.classList.add('prenda-colocada');
                nuevosZapatos.setAttribute('data-categoria', categoria);
                areaVestir.appendChild(nuevosZapatos);
                prendaZapatos = nuevosZapatos;

                // Mensaje dependiendo del tipo de zapatos
                if (categoria.includes('zapatos_hombre')) {
                    // Verificar si la camisa de mujer está puesta
                    if (prendaCamisa && prendaCamisa.src.includes('camisa_mujer')) {
                        mostrarMensaje('Cámbiate esos zapatos y ponte unos femeninos');
                    } else if (prendaCamisa && prendaCamisa.src.includes('camisa_hombre')) {
                        mostrarMensaje('Me gustan esos zapatos y como te quedan con el traje, pareces todo un hombre,¿Eres un hombre,no??');
                    } else {
                        mostrarMensaje('Me gustan esos zapatos, combínalos con un traje');
                    }
                } else if (categoria.includes('zapatos_mujer')) {
                    // Verificar si la camisa de hombre está puesta
                    if (prendaCamisa && prendaCamisa.src.includes('camisa_hombre')) {
                        mostrarMensaje('Cámbiate esos zapatos y ponte unos mas masculinos');
                    } else if (prendaCamisa && prendaCamisa.src.includes('camisa_mujer')) {
                        mostrarMensaje('Me gusta como quedan con el vestido te hacen ver mas femenina.');
                    }
                    else {
                        mostrarMensaje('Me gustan esos zapatos, combínalos con un vestido');
                    }
                }
                textonombre.textContent = 'Desconocido';

            }

            // Si la prenda seleccionada es una gorra
            if (categoria.includes('gorrita')) {
                if (prendaGorra) prendaGorra.remove();
                const nuevaGorra = document.createElement('img');
                nuevaGorra.src = prenda.src;
                nuevaGorra.classList.add('prenda-colocada');
                nuevaGorra.setAttribute('data-categoria', categoria);
                nuevaGorra.style.zIndex = '2'; // Gorra encima de la peluca
                areaVestir.appendChild(nuevaGorra);
                prendaGorra = nuevaGorra;

                // Si ya hay peluca, aseguramos que la peluca esté por debajo
                if (prendaPeluca) {
                    prendaPeluca.style.zIndex = '1'; // Peluca siempre por debajo de la gorra
                }

                // Mensaje dependiendo de las prendas ya puestas
                if (prendaPeluca) {
                    mostrarMensaje('Me gusta el sombrero, pero el peinado sigue sin convencerme.');
                } else if (prendaRopaSeñora) {
                    mostrarMensaje('¡Qué femenino te queda ese sombrero!');
                } else if (prendaCamisa && prendaCamisa.src.includes('camisa_hombre')) {
                    mostrarMensaje('Ese lazo en el sombrero te hace el rostro demasiado femenino.');  // Este es el mensaje que aparecerá siempre que se ponga la gorra con la camisa de hombre
                } else {
                    mostrarMensaje('¡Que bonito sombrero!');
                }

                textonombre.textContent = 'Desconocido';

            }

            // Si la prenda seleccionada es una máscara
            // Si la prenda seleccionada es una máscara
if (categoria.includes('mascara')) {
    if (prendaMascara) prendaMascara.remove();
    const nuevaMascara = document.createElement('img');
    nuevaMascara.src = prenda.src;
    nuevaMascara.classList.add('prenda-colocada');
    nuevaMascara.setAttribute('data-categoria', categoria);
    areaVestir.appendChild(nuevaMascara);
    nuevaMascara.style.zIndex = '3'; // Máscara encima de la peluca y la gorra
    prendaMascara = nuevaMascara;

    // Mostrar el mensaje dinámico para la máscara
    const mensajesMascara = [
        '"Masculino, femenino: depende del caso. Neutral es el único género que siempre me conviene."',
        '"La performance no es un disfraz, es una revelación."'
        
    ];
    const mensajeAleatorio = mensajesMascara[Math.floor(Math.random() * mensajesMascara.length)];
    mostrarMensaje(mensajeAleatorio);

    // Cambiar el nombre a 'Claud Cahun' solo cuando se seleccione la máscara
    textonombre.textContent = 'Claud Cahun';
}

// Resto del código para otras prendas

if (categoria.includes('camisa') || categoria.includes('zapatos') || categoria.includes('gorrita') || categoria.includes('peluca')) {
    // Aquí no se cambia el nombre si ya es "Claud Cahun"
    if (textonombre.textContent !== 'Claud Cahun') {
        textonombre.textContent = 'Desconocido';
    }
}


            // Si la prenda seleccionada es una peluca
            if (categoria.includes('peluca')) {
                if (prendaPeluca) prendaPeluca.remove();
                const nuevaPeluca = document.createElement('img');
                nuevaPeluca.src = prenda.src;
                nuevaPeluca.classList.add('prenda-colocada');
                nuevaPeluca.setAttribute('data-categoria', categoria);
                nuevaPeluca.style.zIndex = '1'; // Peluca siempre por debajo de la gorra
                areaVestir.appendChild(nuevaPeluca);
                prendaPeluca = nuevaPeluca;

                if (prendaGorra) {
                    mostrarMensaje("Me gusta el sombrero, pero el peinado sigue sin convencerme.");
                } else if (!prendaCamisa && !prendaZapatos && !prendaMascara && !prendaRopaSeñora) {
                    // Si no hay otras prendas, mostrar mensaje
                    mostrarMensaje("¡Que peinado más extraño, ¿no?");
                } else {
                    // Si hay otras prendas, mostrar mensajes según las prendas que estén puestas
                    if (prendaCamisa && prendaCamisa.src.includes('camisa_hombre')) {
                        mostrarMensaje('¡Qué peinado más femenino para un hombre!');
                    }
            
                    // Mostrar mensaje si la camisa de mujer está puesta
                    if (prendaCamisa && prendaCamisa.src.includes('camisa_mujer')) {
                        mostrarMensaje('Con ese estilo, realmente no pareces una mujer. ¿Por qué no pruebas un peinado con más volumen y elegancia?');
                    }
                }
                textonombre.textContent = 'Desconocido';
            }

            // Agregar la lógica para la ropa señora
            // Al seleccionar ropa de señora
// Mostrar el nombre cuando se seleccione ropa de señora
if (categoria.includes('ropaseñora')) { 
    // Si la ropa de señora ya está puesta, no se evita el clic, se cambia el mensaje
    if (prendaRopaSeñora) {
        const mensajesRopaSenora = [
            '¡Buenos días, señora!¿Tiene el paquete de tabaco de hoy?',
            '¿Que tal está su hermana?',
        ];

        const mensajeAleatorio = mensajesRopaSenora[Math.floor(Math.random() * mensajesRopaSenora.length)];
        // Mostrar el mensaje aleatorio
        mostrarMensaje(mensajeAleatorio);
    } else {
        // Si no está puesta, agregar la ropa de señora y el mensaje inicial
        // Eliminar otras prendas antes de poner ropa de señora
        if (prendaCamisa) prendaCamisa.remove();
        if (prendaZapatos) prendaZapatos.remove();
        if (prendaGorra) prendaGorra.remove();
        if (prendaMascara) prendaMascara.remove();
        if (prendaPeluca) prendaPeluca.remove();

        const nuevaRopaSeñora = document.createElement('img');
        nuevaRopaSeñora.src = prenda.src;
        nuevaRopaSeñora.classList.add('prenda-colocada');
        nuevaRopaSeñora.setAttribute('data-categoria', categoria);

        areaVestir.appendChild(nuevaRopaSeñora);
        prendaRopaSeñora = nuevaRopaSeñora;

        // Mostrar el mensaje inicial para ropa de señora
        mostrarMensaje("Buenos días señora, tiene el paquete de tabaco de hoy?");
    }

    // Mostrar el nombre cuando se seleccione ropa de señora
    textonombre.style.display = 'block'; // Hacer visible el nombre
    textonombre.textContent = 'Militar nazi';
}

// Mostrar el nombre cuando se seleccione cualquier otra prenda
// Mostrar el nombre cuando se seleccione cualquier otra prenda, excepto la máscara
if (categoria.includes('camisa') || categoria.includes('zapatos') || categoria.includes('gorrita') || categoria.includes('peluca')) {
    // Solo cambia a 'Desconocido' si no está ya como 'Claude Cahun'
    if (textonombre.textContent !== 'Claude Cahun') {
        textonombre.style.display = 'block'; // Aseguramos que el nombre se muestre
        textonombre.textContent = 'Desconocido';
    }
}




        });
    });

    // Función para reiniciar las prendas y limpiar el área de vestir
    function borrarRopa() {
        // Verifica y elimina la prenda de camisa si está seleccionada
        if (prendaCamisa) prendaCamisa.remove();

        // Verifica y elimina la prenda de zapatos si está seleccionada
        if (prendaZapatos) prendaZapatos.remove();

        // Verifica y elimina la prenda de gorra si está seleccionada
        if (prendaGorra) prendaGorra.remove();

        // Verifica y elimina la prenda de máscara si está seleccionada
        if (prendaMascara) prendaMascara.remove();

        // Verifica y elimina la prenda de ropa completa para señora si está seleccionada
        if (prendaRopaSeñora) prendaRopaSeñora.remove();

        // Verifica y elimina la peluca si está seleccionada
        if (prendaPeluca) prendaPeluca.remove();

        // Reinicia las variables de todas las prendas a null
        prendaCamisa = null;
        prendaZapatos = null;
        prendaGorra = null;
        prendaMascara = null;
        prendaRopaSeñora = null;
        prendaPeluca = null;
        textonombre.textContent = ''; 
        if (mensajeInterval) {
            clearInterval(mensajeInterval);  // Detener el intervalo del mensaje
            mensaje.textContent = ''; // Limpiar el mensaje
        }
    
        // Muestra un mensaje indicando que se ha reiniciado el juego
   
    }

    // Obtiene el botón con el ID 'borrar' y le asigna un evento de clic
    const btnBorrar = document.getElementById('borrar');
    btnBorrar.addEventListener('click', borrarRopa); // Al hacer clic, ejecuta la función borrarRopa

    // Función para regresar al menú inicial y limpiar las prendas
    function volverAtras() {
        // Muestra el menú inicial
        menuInicio.style.display = 'flex';
        audio.pause();      // Detiene la reproducción
        audio.currentTime = 0; // Reinicia el audio al inicio


        // Oculta la pantalla del juego
        pantallaJuego.style.display = 'none';

        // Verifica y elimina la prenda de camisa si está seleccionada
        if (prendaCamisa) prendaCamisa.remove();

        // Verifica y elimina la prenda de zapatos si está seleccionada
        if (prendaZapatos) prendaZapatos.remove();

        // Verifica y elimina la prenda de gorra si está seleccionada
        if (prendaGorra) prendaGorra.remove();

        // Verifica y elimina la prenda de máscara si está seleccionada
        if (prendaMascara) prendaMascara.remove();

        // Verifica y elimina la prenda de ropa completa para señora si está seleccionada
        if (prendaRopaSeñora) prendaRopaSeñora.remove();

        // Verifica y elimina la peluca si está seleccionada
        if (prendaPeluca) prendaPeluca.remove();

        // Reinicia las variables de todas las prendas a null
        prendaCamisa = null;
        prendaZapatos = null;
        prendaGorra = null;
        prendaMascara = null;
        prendaRopaSeñora = null;
        prendaPeluca = null;

        // Limpia cualquier mensaje mostrado previamente
        mostrarMensaje("");
    }

    // Obtiene el botón con el ID 'borrar' y le asigna un evento de clic
    const btnVolver = document.getElementById('volver');
    btnVolver.addEventListener('click', volverAtras); // Al hacer clic, ejecuta la función borrarRopa


    // Función para mostrar el mensaje dinámico
    function mostrarMensaje(texto) {
        if (mensajeInterval) clearInterval(mensajeInterval)
        mensaje.style.display = 'block';
        mensaje.textContent = ''; // Limpiar el mensaje anterior
        let i = 0;
        mensajeInterval = setInterval(() => {
            if (i < texto.length) {
                mensaje.textContent += texto[i];
                i++;
            } else {
                clearInterval(mensajeInterval); // Detener el intervalo cuando termine
            }
        }, 50); // Velocidad del mensaje
    }

    // Obtener el elemento del contenedor de ayuda
    let divAyuda = document.getElementById('info');

    // Función para mostrar la ayuda
    function mostrarAyuda() {
        divAyuda.style.display = 'block'; // Cambiar el estilo para que sea visible
    }

    // Obtener el botón de mostrar ayuda y asignar el evento click
    const mostrarAyudaBtn = document.getElementById('ayuda');
    mostrarAyudaBtn.addEventListener('click', mostrarAyuda); // Vincular la función mostrarAyuda al botón

    // Función para cerrar la ayuda
    function cerrarAyuda() {
        divAyuda.style.display = 'none'; // Cambiar el estilo para ocultarlo
    }

    // Obtener el botón de cerrar ayuda y asignar el evento click
    const cerrarAyudaBtn = document.getElementById('cerrarAyuda');
    cerrarAyudaBtn.addEventListener('click', cerrarAyuda); // Vincular la función cerrarAyuda al botón



});
