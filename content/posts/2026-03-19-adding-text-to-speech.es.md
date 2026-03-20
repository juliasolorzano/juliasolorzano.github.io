---
date: 2026-03-19
slug: adding-text-to-speech
title: "Agregando Texto a Voz (TTS) a mis escritos"
description: "Cómo agregué un reproductor de texto a voz a mi sitio estático de Hugo usando la Web Speech API — diseñado para accesibilidad, probado para lectores de pantalla, baja visión y daltonismo, y útil para escuchar mientras camino o conduzco."
image: /assets/images/og-adding-text-to-speech.png
---

*Recientemente escribí una [serie de cinco partes](/es/blog/2026/03/10/part-1-changing-the-frameworks/) sobre la reconstrucción de mi sitio web personal — migrando de Jekyll a Hugo, rediseñando el layout, traduciendo todo al español, optimizando para móvil y lanzándolo todo. Este escrito trata sobre una función que agregué después: un reproductor de texto a voz que te permite escuchar cualquier escrito en este sitio.*

***

El texto a voz es, ante todo, una función de accesibilidad. Le da a personas ciegas o con baja visión otra forma de consumir contenido escrito. Ayuda a personas con dislexia o dificultades de lectura. Apoya a cualquiera que procese mejor la información escuchando que leyendo. Cuando decidí agregarlo a mi sitio, ese fue el punto de partida — hacer que mi escritura esté disponible para más personas de más formas.

Pero también lo construí para mí misma. Salgo a caminar casi todas las mañanas, y a menudo encuentro artículos que quiero leer pero no tengo tiempo para sentarme con ellos. Lo mismo pasa cuando estoy manejando a algún lugar — veo un escrito que se ve interesante y quiero absorberlo sin mirar una pantalla. Tener un botón de escuchar en la parte superior de un escrito convierte un "guardar para después" en un "escuchar ahora mismo." Esa conveniencia me importa, y pensé que también podría importarle a otras personas.

La pregunta era si podía construirlo sin un backend, sin una API de pago y sin agregar peso a un sitio estático de Hugo que acababa de pasar una semana haciendo liviano.

Resulta que sí se puede.

***

La [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) está integrada en todos los navegadores modernos. Le pasas texto y lo habla. Sin clave de API. Sin servidor. Sin costo. El navegador hace el trabajo usando voces que ya viven en el dispositivo del usuario.

La compensación es la calidad. Estas no son las voces neuronales que escuchas de ElevenLabs u OpenAI. Son las mismas voces que alimentan las funciones de accesibilidad de tu teléfono — funcionales, claras, pero inconfundiblemente sintéticas. Probé docenas de ellas. Algunas suenan como un GPS de 2012. Otras son sorprendentemente naturales. En macOS, una voz llamada Tessa resultó ser la mejor del grupo — cálida, con un ritmo uniforme y fácil de escuchar por más de unos segundos. Así que configuré a Tessa como la voz predeterminada detrás de escena, con la voz predeterminada del sistema como respaldo para dispositivos que no la tienen.

***

El reproductor en sí es simple por diseño. Una barra única en la parte superior de cada escrito con un botón de reproducción y una etiqueta que dice *Escuchar esta publicación*. Presiona play y los controles se expanden: un botón de pausa, un selector de velocidad que alterna entre 1x, 1.25x, 1.5x y 2x, un botón de detener y una barra de progreso que se llena a medida que se lee el escrito en voz alta.

Quería que el reproductor se sintiera como parte del sitio, no como algo agregado encima. Los botones coinciden con la paleta de colores de la página. Tienen bordes visibles para que se vean presionables. La barra de progreso usa el color de acento del sitio contra una pista sutil. En modo oscuro, todo se adapta. En móvil, los controles se reorganizan en múltiples líneas con áreas de toque generosas. Debería sentirse tan natural como un botón de reproducción en una aplicación de podcasts.

La extracción de texto también es deliberada. Antes de hablar, el script clona el contenido del escrito y elimina bloques de código, imágenes, figuras y leyendas. Lo que queda es la prosa — la parte que realmente querrías escuchar en voz alta.

***

Dado que el texto a voz es una función de accesibilidad, el reproductor en sí necesita ser accesible también. Ese es un problema diferente, y en el que más tiempo invertí.

Para usuarios de lectores de pantalla, cada botón tiene un `aria-label` descriptivo que se actualiza con el estado del reproductor. La barra de progreso tiene un `role="progressbar"` con `aria-label` y atributos `aria-valuenow` en vivo. Y agregué una región `aria-live="polite"` que anuncia cambios de estado — *Reproduciendo*, *Pausar*, *Detener* — para que un usuario de lector de pantalla que presiona un botón reciba confirmación de que algo sucedió.

Para usuarios con baja visión, establecí un tamaño mínimo de 44 por 44 píxeles en cada botón. Antes de la corrección, el botón de detener tenía 18 píxeles de ancho y el botón de velocidad apenas 12. Esos están bien para un cursor de ratón pero son terribles para un dedo. Los contornos de focus-visible ya estaban en su lugar — un anillo de 2 píxeles en color de acento con desplazamiento — así que la navegación por teclado estaba cubierta.

Para usuarios daltónicos, me aseguré de que la barra de progreso no dependa solo del color para transmitir información. La barra crece de izquierda a derecha, lo cual es una señal espacial que funciona independientemente de cómo percibas el color. También dupliqué la opacidad de la pista de progreso del 10 al 20 por ciento en los modos claro y oscuro, para que el límite entre lleno y vacío sea más visible.

***

Toda la función — la interfaz del reproductor, la lógica de voz, los controles de velocidad, la barra de progreso, la auditoría de accesibilidad — tomó una sola sesión trabajando junto a Opus 4.6, ejecutando localmente. Describí lo que quería. Claude escribió el código. Lo probé, di retroalimentación e iteré. Las verificaciones de accesibilidad fueron especialmente útiles — nos probómos semántica para lectores de pantalla, tamaños de áreas de toque y problemas de contraste de color de manera sistemática, detectando cosas que no habría pensado en verificar.

No se instalaron paquetes de npm. No se cambió ningún pipeline de construcción. Es un partial HTML, un archivo JavaScript y un puñado de reglas SCSS. El JavaScript es vanilla — sin framework, sin dependencias. Se carga con un atributo `defer` y solo se ejecuta si el navegador soporta la Web Speech API. Si no la soporta, el reproductor simplemente no aparece. Mejora progresiva en su forma más literal.

***

Puedes probarlo ahora mismo. Desplázate de vuelta al inicio de este escrito y presiona play. Si Tessa está disponible en tu dispositivo, la escucharás. Si no, la voz predeterminada de tu sistema tomará su lugar. De cualquier manera, las palabras son las mismas.

Me gusta construir cosas que hagan un sitio más accesible sin hacerlo más complicado. Y si también significa que puedo escuchar mis propios escritos durante una caminata por la mañana, mucho mejor.
