// Obtención del canvas y su contexto
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// El canvas tendrá las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

// Color de fondo del canvas
canvas.style.background = 'rgb(220,150,80)';

// Función para generar colores RGB aleatorios
function generarColorRGB() {
    // Se genera un valor aleatorio para cada componente de color (rojo, verde, azul)
    var r = Math.floor(Math.random() * 256); // Valor de rojo entre 0 y 255
    var g = Math.floor(Math.random() * 256); // Valor de verde entre 0 y 255
    var b = Math.floor(Math.random() * 256); // Valor de azul entre 0 y 255
    // Se crea y retorna el color en formato RGB
    var color_rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    return color_rgb;
}

// Definición de la clase Circle
class Circle {
    constructor(x, y, radius, color, text, speed) {
        // Inicialización de las propiedades del círculo
        this.x = x; // Posición x del círculo
        this.y = y; // Posición y del círculo
        this.radius = radius; // Radio del círculo
        this.color = color; // Color del círculo
        this.text = text; // Texto dentro del círculo
        this.speed = speed; // Velocidad del círculo
        // Velocidades de desplazamiento horizontal y vertical del círculo
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    // Método para dibujar el círculo en el canvas
    draw(context) {
        // Comienza un nuevo trazado
        context.beginPath();
        // Dibuja el círculo con las propiedades especificadas
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // Establece el ancho de la línea del borde del círculo
        context.lineWidth = 6;
        // Establece el color del borde del círculo
        context.strokeStyle = this.color;
        // Dibuja el borde del círculo
        context.stroke();
        // Establece el color y la alineación del texto dentro del círculo
        context.fillStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        // Establece la fuente y el tamaño del texto dentro del círculo
        context.font = "18px Arial";
        // Dibuja el texto dentro del círculo
        context.fillText(this.text, this.x, this.y);
        // Finaliza el trazado
        context.closePath();
    }

    // Método para actualizar la posición y el color del círculo
    update(context) {
        // Dibuja el círculo en su nueva posición
        this.draw(context);

        // Si el círculo supera el margen derecho, se mueve a la izquierda y cambia de color
        if ((this.x + this.radius) > window_width) {
            this.dx = -this.dx; // Invierte la dirección horizontal
            this.color = generarColorRGB(); // Cambia el color
        }

        // Si el círculo supera el margen izquierdo, se mueve a la derecha y cambia de color
        if ((this.x - this.radius) < 0) {
            this.dx = -this.dx; // Invierte la dirección horizontal
            this.color = generarColorRGB(); // Cambia el color
        }

        // Si el círculo supera el margen inferior, se mueve hacia arriba y cambia de color
        if ((this.y + this.radius) > window_height) {
            this.dy = -this.dy; // Invierte la dirección vertical
            this.color = generarColorRGB(); // Cambia el color
        }

        // Si el círculo supera el margen superior, se mueve hacia abajo y cambia de color
        if ((this.y - this.radius) < 0) {
            this.dy = -this.dy; // Invierte la dirección vertical
            this.color = generarColorRGB(); // Cambia el color
        }

        // Actualiza la posición del círculo en función de su velocidad
        this.x += this.dx;
        this.y += this.dy;
    }
}

// Arreglo para almacenar los círculos
let arrayCircle = [];

// Creación de 10 círculos aleatorios y almacenamiento en el arreglo
for (let i = 0; i < 10; i++) {
    // Genera valores aleatorios para la posición, radio y velocidad de cada círculo
    let randomX = Math.random() * window_width; // Posición x aleatoria del círculo
    let randomY = Math.random() * window_height; // Posición y aleatoria del círculo
    let randomR = Math.floor(Math.random() * 100 + 20); // Radio aleatorio del círculo
    let randomS = Math.floor(Math.random() * 10 + 1); // Velocidad aleatoria del círculo

    // Crea un nuevo círculo con los valores aleatorios generados
    let miCirculo = new Circle(randomX, randomY, randomR, 'black', (i + 1), randomS);
    // Agrega el círculo al arreglo
    arrayCircle.push(miCirculo);
    // Dibuja el círculo en el canvas
    arrayCircle[i].draw(ctx);
}

// Función para actualizar y dibujar los círculos en el canvas
function updateCircles() {
    // Limpia el canvas antes de dibujar los círculos
    ctx.clearRect(0, 0, window_width, window_height);
    // Para cada círculo en el arreglo, actualiza su posición y color y lo dibuja
    arrayCircle.forEach(circle => {
        circle.update(ctx);
    });
    // Solicita una nueva animación al navegador
    requestAnimationFrame(updateCircles);
}

// Inicia la animación llamando a la función updateCircles
updateCircles();


/*
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomR = Math.floor(Math.random() * 100 + 30);

let miCirculo = new Circle(randomX, randomY, randomR, 'black', 'DVD1', 12);
miCirculo.draw(ctx);

let miCirculo2 = new Circle(100, 100, 100, 'white', 'DVD2', 2);
miCirculo2.draw(ctx);

let updateCircle = function () {

    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height) // Limpia el rectandulo de esas dimensiones
    miCirculo.update(ctx)
    miCirculo2.update(ctx)
};

updateCircle();
*/