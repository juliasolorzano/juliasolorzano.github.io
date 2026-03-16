---
date: 2026-03-13
slug: part-4-building-for-mobile
title: "Part 4: Space Oddity"
description: "Construyendo una experiencia móvil con barra de pestañas inferior, objetivos táctiles de 44pt, fuentes del sistema y detección por dispositivo — no solo puntos de quiebre responsivos."
image: /assets/images/og-part-4-building-for-mobile.png
---

*Este es el cuarto de una serie de cinco escritos sobre las actualizaciones que estoy haciendo en mi sitio web personal. La [Parte 1](/es/blog/2026/03/10/part-1-changing-the-frameworks/) cubrió la migración de Jekyll a Hugo. La [Parte 2](/es/blog/2026/03/11/part-2-designing-the-layout/) cubrió el rediseño visual. La [Parte 3](/es/blog/2026/03/12/part-3-translating-into-spanish/) cubrió la traducción del sitio al español. La Parte 4 trata sobre construir una experiencia móvil que se sienta nativa.*

***

*Ground control to Major Tom.*

La mayoría de los sitios personales tratan el móvil como una concesión. Tomas el diseño de escritorio, lo comprimes en una ventana más angosta, y lo llamas responsivo. Yo quería algo diferente. Quería que la versión móvil de este sitio se sintiera como si hubiera sido construida para el teléfono primero — no adaptada del escritorio después del hecho.

Eso significó más que media queries. Significó repensar todo el modelo de interacción para un dispositivo que sostienes con una mano.

***

*Take your protein pills and put your helmet on.*

Lo primero que tenía que desaparecer era la barra lateral. En escritorio, una barra lateral fija se siente natural — tu navegación se sienta tranquilamente a la izquierda mientras el contenido se desplaza a la derecha. En un teléfono, una barra lateral es peso muerto. O toma un tercio de tu pantalla o se esconde detrás de un menú hamburguesa que nadie quiere abrir.

Así que la reemplacé por completo. En móvil, el sitio usa una barra de pestañas inferior — cinco íconos fijados en la parte inferior de la pantalla, siempre al alcance del pulgar. Inicio, blog, trabajo, acerca de, y un menú para todo lo demás. El patrón viene directamente de las [Directrices de Interfaz Humana de Apple](https://developer.apple.com/design/human-interface-guidelines/tab-bars), y hay una razón por la que cada aplicación importante de iOS lo usa. Es donde tu pulgar ya está.

***

*Commencing countdown, engines on.*

La detección es deliberada. No dependo solo del ancho del viewport. Una ventana de navegador de 768 píxeles en una laptop no es lo mismo que una pantalla de 768 píxeles en una tablet que estás sosteniendo en tus manos. El sitio verifica la cadena User-Agent para determinar si estás en un dispositivo móvil real — iPhone, iPad, Android — y sirve la experiencia móvil solo cuando lo estás. Los usuarios de escritorio con ventanas angostas obtienen el diseño de escritorio, solo más angosto. Los usuarios móviles obtienen un diseño diseñado para el tacto.

***

*Check ignition and may God's love be with you.*

Los objetivos táctiles importan más de lo que la gente piensa. Apple recomienda un mínimo de 44 por 44 puntos para cualquier elemento que se pueda tocar. Seguí eso en todas partes — enlaces de navegación, botones, el selector de idioma, el interruptor de modo oscuro. Nada en el sitio móvil requiere precisión al tocar. Si tu pulgar puede alcanzarlo, tu pulgar puede darle.

El encabezado y la barra de pestañas usan `backdrop-filter: blur` para ese efecto de vidrio esmerilado que ves en las aplicaciones nativas de iOS. Es un detalle pequeño, pero es el tipo de detalle que hace que una página web deje de sentirse como una página web. El contenido se desplaza debajo de las barras y capturas un suave desenfoque de color a través del cristal. Se siente correcto.

***

*This is Ground Control to Major Tom, you've really made the grade.*

La tipografía también cambia. Los encabezados saltan a 34 píxeles en móvil, igualando la convención de títulos grandes de iOS. El texto del cuerpo se mantiene en un tamaño cómodo de lectura, pero la jerarquía cambia — en una pantalla pequeña, el titular necesita anunciarse más claramente. También cambio las fuentes web por fuentes del sistema en móvil. Sin Lora. Sin Inter. Solo la pila de fuentes nativa — San Francisco en iOS, Roboto en Android. El texto se renderiza instantáneamente porque no hay nada que descargar, y se ve como si perteneciera al dispositivo.

***

*And the papers want to know whose shirts you wear.*

La página de listado del blog también se adapta. En escritorio, las entradas se listan con sus títulos completos y fechas en una pila vertical limpia. En móvil, la misma lista obtiene un espaciado más apretado, objetivos táctiles más grandes, y una estimación de tiempo de lectura que te ayuda a decidir si abrir algo durante una espera de dos minutos o guardarlo para después. Cada enlace en la lista es fácil de tocar sin accidentalmente darle al de arriba o al de abajo.

***

*Here am I floating round my tin can, far above the world.*

Hay un momento que sucede cuando visitas un sitio en tu teléfono y algo se siente mal. Quizás el texto es muy pequeño. Quizás un botón es solo un poco difícil de tocar. Quizás el diseño fue claramente pensado para una pantalla tres veces más ancha. Puede que no puedas nombrar el problema, pero lo sientes. Eso es lo que quería eliminar. No solo técnicamente, sino experiencialmente. La versión de teléfono de este sitio debería sentirse como si siempre hubiera sido una aplicación de teléfono. Sin compromisos. Sin "pellizca para hacer zoom." Sin "rota tu dispositivo."

***

*Planet Earth is blue, and there's nothing I can do.*

Construir para móvil de esta manera tomó más tiempo que tratarlo como un diseño responsivo de último momento. Pero el resultado es un sitio que funciona como funciona tu teléfono — con tacto, con alcance del pulgar, con el lenguaje visual que ya conoces de las aplicaciones que usas todos los días. No es una versión más pequeña del sitio de escritorio. Es su propia cosa.

***

*Though I'm past one hundred thousand miles, I'm feeling very still.*

Lo que sigue: la parte final — despliegue, rendimiento, y poner todo en línea.
