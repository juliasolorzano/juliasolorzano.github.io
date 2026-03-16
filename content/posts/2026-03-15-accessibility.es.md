---
date: 2026-03-15
slug: accessibility-is-the-foundation
title: "La accesibilidad es la base"
description: "Cómo la accesibilidad guió cada decisión en esta reconstrucción — indicadores de enfoque, navegación por salto, HTML semántico, patrones ARIA, movimiento reducido y modo oscuro."
image: /assets/images/og-accessibility-is-the-foundation.png
---

*La accesibilidad no es una funcionalidad que se agrega al final. Es la base sobre la que se construye desde el principio. Asi es como lo aborde cuando reconstrui mi sitio personal.*

***

Cada elemento interactivo en este sitio tiene un [indicador de enfoque](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) visible. Un contorno solido de 2 pixeles en el color de acento, con un desplazamiento de 2 pixeles para que no se amontone sobre el elemento. Botones, enlaces, elementos de navegacion, el selector de idioma, el interruptor de modo oscuro — todos. Si navegas este sitio con un teclado, siempre sabes donde estas. El criterio [WCAG 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html) lo llama un requisito de Nivel AA. Yo lo llamo el minimo indispensable.

Esto suena basico. Es basico. Y aun asi innumerables sitios eliminan los estilos de enfoque porque alguien decidio que los contornos se veian feos. Eliminarlos no hace que un sitio sea mas limpio. Lo hace inutilizable para cualquiera que no use un raton.

***

Lo primero en el DOM, antes de la barra lateral, antes del encabezado, antes de cualquier contenido visible, es un [enlace para saltar la navegacion](https://webaim.org/techniques/skipnav/). Esta oculto fuera de la pantalla hasta que presionas Tab, momento en el que se desliza a la vista con una transicion suave. Haz clic — o presiona Enter — y saltas directamente al area de contenido principal, evitando toda la navegacion. Los usuarios de lectores de pantalla y de teclado no deberian tener que tabular a traves de los mismos seis enlaces en cada pagina.

El enlace de salto tambien esta traducido. En ingles dice "Skip to content." En espanol, "Saltar al contenido." Se alimenta de los mismos archivos i18n que impulsan el resto del sitio bilingue.

***

El HTML semantico tiene mas peso del que la mayoria de los desarrolladores se dan cuenta. La navegacion esta envuelta en elementos [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) con atributos descriptivos [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) — "Main Navigation" para la barra lateral, "Navigation" para la barra de pestanas movil. El area de contenido es un elemento `<main>` con un `id` al que apunta el enlace de salto. Las entradas del blog estan envueltas en etiquetas `<article>`. Las fechas usan el elemento `<time>` con un atributo `datetime` legible por maquinas. El pie de pagina es un `<footer>`.

Nada de esto es visible para los usuarios videntes. Todo es visible para la tecnologia asistiva. Un lector de pantalla puede anunciar "Main Navigation" y el usuario sabe exactamente donde esta. Ese es todo el punto.

***

La navegacion de la barra lateral usa [`aria-current="page"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) para marcar la seccion activa. Cuando estas en la pagina del blog, el enlace del blog se anuncia como la pagina actual. Cuando estas en la pagina de acerca de, el enlace de acerca de hace lo mismo. Es un atributo pequeno que hace una diferencia significativa para los usuarios de lectores de pantalla que necesitan orientarse dentro de un sitio.

En movil, el mismo patron se traslada a la barra de pestanas inferior. Cada enlace de pestana obtiene `aria-current="page"` cuando corresponde a la seccion activa. El modelo de interaccion cambia completamente entre escritorio y movil, pero la semantica de accesibilidad se mantiene consistente.

***

El menu movil implementa una [trampa de enfoque](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Cuando abres el menu, Tab y Shift+Tab ciclan a traves de los elementos del menu y el boton del menu — el enfoque nunca escapa al contenido detras de el. Presiona Escape y el menu se cierra, devolviendo el enfoque al boton del menu. El atributo [`aria-expanded`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded) se actualiza dinamicamente — `false` cuando el menu esta cerrado, `true` cuando esta abierto — para que los lectores de pantalla siempre sepan el estado actual.

Este es el tipo de trabajo que toma una hora construir y que la mayoria de los usuarios nunca notaran. Pero para alguien que navega con un teclado o un dispositivo de conmutacion, un menu sin trampa es un callejon sin salida. El enfoque se va detras de la superposicion. No hay forma de regresar. Una trampa de enfoque previene eso por completo.

***

El reproductor de texto a voz fue construido pensando en los lectores de pantalla desde el principio. El contenedor del reproductor tiene [`role="region"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role) con un `aria-label` descriptivo. La barra de progreso tiene [`role="progressbar"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role) con `aria-valuenow`, `aria-valuemin` y `aria-valuemax` actualizandose en tiempo real mientras se reproduce el audio. Una region oculta [`aria-live="polite"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live) anuncia los cambios de estado de reproduccion — "Playing," "Pause," "Stop" — sin interrumpir lo que el lector de pantalla estaba haciendo antes.

La etiqueta del boton de reproduccion cambia segun el contexto. Antes de la reproduccion dice "Listen." Durante la reproduccion dice "Pause." Despues de pausar dice "Resume." Estos no son cambios de texto visibles. Son actualizaciones de `aria-label` que solo los lectores de pantalla captan. El boton visual mantiene el mismo icono. El nombre accesible cambia para coincidir con la accion que realizara.

***

Cada icono SVG decorativo en el sitio lleva [`aria-hidden="true"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden). Los iconos en la barra lateral, el encabezado movil, los enlaces sociales — ninguno es anunciado por los lectores de pantalla. Son decoracion visual. Los botones y enlaces dentro de los que se encuentran tienen sus propios nombres accesibles. Anunciar tanto el icono como la etiqueta seria redundante y confuso. Ocultar el icono es la eleccion correcta.

***

Todo el sitio respeta [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). Una media query desactiva todas las animaciones y transiciones en cada elemento. El desplazamiento suave se convierte en desplazamiento instantaneo. Las transiciones de hover desaparecen. El deslizamiento del enlace de salto se convierte en una simple aparicion. Si tu sistema operativo dice que prefieres movimiento reducido, este sitio escucha.

Esto importa mas que la estetica. Para personas con trastornos vestibulares, el movimiento inesperado puede causar mareos o nauseas. Una sola media query de CSS elimina ese riesgo por completo. No hay razon para no incluirla.

***

El modo oscuro no es solo una preferencia visual. Para algunos usuarios, el texto claro sobre fondo oscuro es significativamente mas facil de leer. Todo el sistema de colores esta construido sobre [propiedades personalizadas de CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), asi que el cambio entre modo claro y oscuro es cuestion de intercambiar valores. El sitio verifica primero la preferencia de tu sistema operativo, luego respeta cualquier interruptor explicito que hayas establecido. Las relaciones de contraste se mantienen en ambos modos porque la paleta fue disenada para ambos desde el principio.

***

La accesibilidad no es una lista de verificacion que se completa al final de un proyecto. Es un conjunto de decisiones que se toman a lo largo del camino. Cada eleccion de diseno, cada elemento interactivo, cada linea de CSS — cada uno es una oportunidad para incluir o excluir. Yo elegi incluir. No porque fuera requerido, sino porque un sitio que solo funciona para algunas personas realmente no funciona en absoluto.

Esto es algo que me ha importado por mucho tiempo. En 2016, escribi sobre [mejores practicas para construir sitios web accesibles usando los Draft U.S. Web Design Standards](https://18f.gsa.gov/blog/2016/03/29/best-practices-for-building-an-accessible-website-using-the-draft-us-web-design-standards/) mientras trabajaba en 18F. Las herramientas y los frameworks cambian, pero el principio sigue siendo el mismo — construir para todos.
