---
date: 2026-03-11
slug: part-2-designing-the-layout
title: "Part 2: Modern Love"
description: "Rediseñando el sitio con una barra lateral fija, paleta de tonos tierra, tipografía Lora e Inter, modo oscuro y un diseño nativo para móvil."
image: /assets/images/og-part-2-designing-the-layout.png
---

*Este es el segundo de una serie de cinco escritos sobre las actualizaciones que estoy haciendo en mi sitio web personal. La [Parte 1](/es/blog/2026/03/10/part-1-changing-the-frameworks/) cubrió la migración de Jekyll a Hugo. La Parte 2 trata sobre el rediseño visual — las decisiones de diseño e interacción que le dieron al sitio su forma actual.*

***

*Modern love walks beside me. Modern love walks on by.*

Una vez que Hugo estaba en su lugar, el código estaba limpio, pero el sitio todavía se veía como su versión anterior. El diseño, los colores, la tipografía — todo se había heredado de un diseño que había construido años atrás. Funcionaba, pero ya no se sentía como yo. Quería algo más cálido. Algo más intencional. Algo que se sintiera menos como un portafolio tecnológico y más como un hogar.

Así que empecé de cero visualmente, y lo primero que cambié fue la navegación.

***

*Modern love gets me to the church on time.*

La mayoría de los sitios personales ponen la navegación en la parte superior. Una barra horizontal, un logo a la izquierda, enlaces a la derecha. Yo fui en la dirección opuesta — una barra lateral fija a la izquierda, siempre visible, siempre presente. Mi nombre arriba, la navegación en el medio, enlaces sociales abajo. En escritorio se queda fija mientras navegas por el contenido. Se sintió correcto para un sitio personal. La navegación no es algo por lo que pasas de camino al contenido. Es algo que se sienta a su lado, en silencio.

***

Los colores vinieron después. No quería el típico minimalismo de negro sobre blanco ni los azules y púrpuras brillantes que saturan el mundo tech. Quería tierra. Fondos beige cálidos. Texto marrón oscuro. Acentos dorados. Enlaces en marrón que cambian a verde azulado al pasar el cursor. La paleta se basa en marrones, dorados y grises cálidos — tonos que se sienten sólidos y humanos, como papel, tinta y cuero viejo.

Para la tipografía, combiné [Lora](https://fonts.google.com/specimen/Lora) para los encabezados con [Inter](https://fonts.google.com/specimen/Inter) para el texto del cuerpo. Lora es una serif con personalidad — le da a los encabezados una calidad editorial. Inter es limpia y altamente legible en tamaños pequeños. La combinación le da al sitio una calidez que una sola familia sans-serif nunca podría lograr.

***

*There's no sign of life. It's just the power to charm.*

El modo oscuro no era opcional. Todo el sistema de colores está construido sobre [propiedades personalizadas de CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), así que alternar entre claro y oscuro es cuestión de intercambiar valores de variables. El sitio verifica tres cosas en orden: tu preferencia guardada en localStorage, el botón que presionaste, y la configuración de tu sistema operativo. En modo oscuro, los beiges cálidos se convierten en carbones profundos y los acentos dorados se iluminan. La calidez se mantiene, incluso en la oscuridad.

***

*I know when to go out. I know when to stay in.*

En teléfonos — teléfonos reales, detectados por User-Agent, no solo viewports estrechos — el sitio se transforma. La barra lateral desaparece por completo. Una barra de pestañas inferior toma su lugar, modelada según las [Guías de Interfaz Humana de Apple](https://developer.apple.com/design/human-interface-guidelines/). Los objetivos táctiles son de mínimo 44 puntos. El encabezado y la barra de pestañas usan desenfoque de fondo para ese look de vidrio esmerilado. Los encabezados crecen a 34 píxeles, igualando los títulos grandes de iOS. Las fuentes del sistema se cargan en lugar de fuentes web. No es un breakpoint responsivo. Es una experiencia diferente, diseñada para el dispositivo que tienes en la mano.

***

La accesibilidad no fue algo que se añadió después. Se integró desde el principio. Un enlace para saltar la navegación está al inicio de cada página para usuarios de teclado. Los indicadores de foco son visibles — 2 píxeles, sólidos, con espacio para que no se amontonen sobre el elemento. Cada componente interactivo lleva etiquetas ARIA apropiadas. La navegación de la barra lateral usa `aria-current` para anunciar la página activa. Y para los usuarios que prefieren movimiento reducido, todas las animaciones y transiciones se desactivan con una sola media query. Estas no son características adicionales. Son la base.

***

*Modern love. It's not really work.*

Todo funciona con JavaScript puro y SCSS compilado a través de Hugo Pipes. Sin React. Sin Tailwind. Sin cadena de herramientas más allá de Hugo mismo. El menú, el interruptor de modo oscuro, la detección de dispositivos móviles — todo es JavaScript simple, y la huella total es mínima. Después de años viendo sitios inflarse con dependencias, se sintió bien construir algo que carga rápido porque simplemente hay menos que cargar.

***

El diseño es lo que hizo que el sitio se sintiera mío otra vez. El cambio de framework me dio una base. El diseño le dio una voz.

*But I try. I try.*

Lo que sigue: traducir todo el sitio al español.
