# CursoDOM
Document Object Model Curse


La delegación de eventos es básicamente un contenedor padre que le pasa el evento a todos sus hijos (en realidad no se los está pasando, sino que el contenedor padre sigue estando presente en todos los hijos, es por eso que cuando clicamos a un hijo el evento es dipárado).

Entendiendo esto, cuando obtenemos el target podemos saber cuál elemento hijo del padre fue clicado, por tanto, con una simple condicional puede ver si el elemento clicado es el que yo quiero.

Ojo: Eso no significa que el evento se quite de los demás elementos hijos, si tu clicas cualquier otro elemento hijo el evento se va a disparar sí o sí, pero lo que sucede es que la condición del tarjet no se cumple, por eso no hace nada.

Y sabiendo esto, puedes hacer cosas chulas como crear funciones que escuchen eventos dinámicamente, una característica de los eventos es que solo se le aplican a los elementos que están desde el inicio, pero si tu agregas otro nodo desde JavaScript los eventos no se van a escuchar para ese nuevo nodo. Entonces, una técnica que se suele usar es escuchar al padre (o en ocasiones a todo el document) y cada vez que el evento ocurra buscar a todos sus hijos que coincidan con el selector al que queremos aplicarle el evento, de esta forma no importa si los nodos se añaden posteriormente desde JavaScript, el evento será escuchado pues JavaScript directamente irá a buscar todos los nodos hijos que cumplan con dicho selector, por ejemplo:
HTML:
<div id="divPadre">
    <div class="div">
        Hola
    </div>
</div>

JavaScript:
document.querySelector(".div").addEventListener("click", () => {
    // Hace algo
})
En este caso, si al div padre yo le añadiera desde JavaScript otro elemento con la clase div, el evento NO funcionaría:

const nuevoDiv = document.createElement("div");
nuevoDiv.className = "div";
nuevoDiv.textContent = "Nuevo div"
divPadre.append(nuevoDiv)
Sin emabrgo, al usar la delegación de eventos, puedo escuchar al padre y buscar al hijo que me interesa:

nuevoDiv.addEventListener("click", event => {

    if(event.target.classList.contains("div")) {
        // Código
    }

})
De esta forma, no importa cuantos elementos nuevos agregues al padre desde JavaScript, esto siempre va a funcionar.

Ahora, si quieres hacer algo más pro, puedes crear una función en el cual tu le pases un selector en específico para usar dentro del div, así solo tienes que llamar a esa función y pasarle el selector de tal manera que se quede escuchando por cualquier elemento nuevo que sea agregado, algo así:

eventAll("click", parentElement, elementToListen, () => {
    // Has algo
})
Una función de ese tipo sería muy útil, porque así puedo mantener escuchando cada elemento, no importa que se agregue después con JavaScript, y sí, yo ya la cree, de hecho hice una mini librería para escuchar eventos partiendo de esta base, pueden indagar el código aquí:

events.js // Le coloque estrella en GitHub

Claro, este código está desactualizado porque tiene un pequeño bug y hay ciertos elementos con los que no funciona, pero para eso podemos usar un MutationObserver que mire cuando el padre haya sido modificado (se le haya agregado un hijo nuevo) y a ese hijo aplicarle el evento, yo ya lo hice pero se los dejo de tarea si tienen cursiodidad sobre eso 👀