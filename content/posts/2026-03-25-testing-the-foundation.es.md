---
date: 2026-03-25
slug: testing-the-foundation
title: "Probando los cimientos: Lo que realmente significa 'funciona'"
description: "Agregando un conjunto de pruebas ligero a un sitio Hugo estático — paridad de traducciones, verificaciones de accesibilidad, renderizado de componentes y modo oscuro — porque lo que más importa es lo más fácil de romper."
image: /assets/images/og-testing-the-foundation.png
---

*Después de reconstruir mi sitio personal, traducirlo a dos idiomas, agregar funciones de accesibilidad y lanzar un reproductor de texto a voz, me di cuenta de que no tenía forma de saber si algo de eso seguía funcionando. Esto trata sobre agregar pruebas — y sobre una forma de pensar que empieza por el final.*

***

Siempre he sido perezosa para escribir pruebas. No filosóficamente opuesta — simplemente perezosa. El sitio funcionaba. Podía ver que funcionaba. Hacía un cambio, recargaba el navegador y seguía adelante. Eso está bien cuando un sitio es simple. Está menos bien cuando un sitio tiene dos idiomas, sesenta claves de traducción, atributos ARIA en cada elemento interactivo, un reproductor de texto a voz con semántica para lectores de pantalla, un modo oscuro que cambia todo un sistema de colores y un menú móvil con captura de foco. En algún momento la superficie se vuelve lo suficientemente amplia como para que tus ojos ya no sean un conjunto de pruebas confiable.

Lo que me empujó a finalmente hacerlo fue un miedo específico: que cambiaría una plantilla, haría push a main y rompería algo silenciosamente que me importa. Un `aria-label` faltante. Una clave de traducción que existe en inglés pero no en español. Una barra de progreso que perdió su `role="progressbar"`. Estas no son el tipo de cosas que se muestran como una página en blanco. Se manifiestan como una experiencia que se degrada silenciosamente para las personas que más lo necesitan.

***

Disfruto del desarrollo guiado por pruebas. No el ciclo estricto de rojo-verde-refactorizar que algunos equipos practican — aunque respeto esa disciplina — sino el modo de pensamiento subyacente. El [TDD](https://es.wikipedia.org/wiki/Desarrollo_guiado_por_pruebas) te pide que empieces con lo que debería ser verdad y trabajes hacia atrás para hacerlo verdad. Escribes la aserción antes de escribir el código. Defines el resultado antes de construir el mecanismo.

Esa inversión es poderosa incluso cuando no estás escribiendo pruebas primero. Te obliga a articular qué significa realmente "funciona." No "la página carga" sino "el enlace de salto apunta a `#content` y dice 'Skip to main content' en inglés e 'Ir al contenido principal' en español." No "el modo oscuro funciona" sino "cuando `data-theme` se establece en `dark`, la propiedad personalizada CSS `--color-bg` cambia de `#f0ede2` a `#1c1b1a`." La precisión en tus expectativas lleva a precisión en tu implementación.

Cuando me senté a agregar pruebas a este sitio, no estaba retrofiteando. Finalmente estaba escribiendo lo que ya creía que debería ser verdad — y dándome una forma de verificarlo automáticamente.

***

El conjunto de pruebas tiene dos capas, ordenadas de rápida a lenta.

La primera es un script de Node.js que verifica la paridad de traducciones. Lee `en.toml` y `es.toml`, compara cada clave y falla si una clave existe en un archivo pero no en el otro, o si alguna clave tiene un valor vacío. Se ejecuta en aproximadamente cien milisegundos. Sin navegador, sin compilación, sin dependencias más allá de un pequeño parser de TOML. Este es el canario — si agrego una nueva cadena de texto en inglés y olvido traducirla, lo sé inmediatamente.

La segunda capa es [Playwright](https://playwright.dev/). Compila el sitio con Hugo, sirve la salida estática y ejecuta un navegador sin interfaz gráfica contra él. Diecinueve pruebas en cinco áreas:

**Accesibilidad en la página principal en inglés** — el enlace de salto existe y apunta a `#content`, el atributo `lang` es `en`, el landmark principal existe, la navegación tiene un `aria-label`, el botón de tema tiene `aria-pressed`, y cada enlace externo tiene `rel="noopener"`.

**Accesibilidad en la página principal en español** — el atributo `lang` es `es`, el enlace de salto dice "Ir al contenido principal," las etiquetas de navegación están en español, y las etiquetas `hreflang` existen para ambos idiomas.

**Renderizado de componentes** — la barra lateral tiene cinco enlaces de navegación con el texto correcto, el pie de página se renderiza, el selector de idioma muestra "ES" en la página en inglés, y el botón del menú móvil tiene `aria-expanded` y `aria-controls`.

**El reproductor de TTS** — en una publicación del blog, el reproductor tiene `role="region"` con un `aria-label`, el botón de reproducción tiene un `aria-label`, la barra de progreso tiene `role="progressbar"` con los atributos de valor correctos, y la región de estado para lectores de pantalla tiene `aria-live="polite"`.

**Modo oscuro** — las propiedades personalizadas CSS para el color de fondo y texto coinciden con los valores del tema claro, y luego coinciden con los valores del tema oscuro después de cambiar `data-theme`.

Todo el conjunto se ejecuta en aproximadamente catorce segundos. La mayor parte de eso es el inicio del navegador. Las pruebas individuales toman medio segundo cada una.

***

Las pruebas se ejecutan en dos lugares. Localmente, `npm test` encadena la verificación de traducciones, la compilación de Hugo y el conjunto de Playwright. En CI, un flujo de trabajo dedicado de GitHub Actions se ejecuta en cada push a main y en cada pull request. Está desacoplado del flujo de trabajo de despliegue a propósito — quiero la libertad de evolucionar cada uno independientemente. Las pruebas fallando no deberían bloquearme para investigar un problema de despliegue, y un problema de despliegue no debería enmascarar una falla en las pruebas.

Elegí mantener la infraestructura de pruebas mínima. Tres dependencias de desarrollo: Playwright, un servidor de archivos estáticos y un parser de TOML. Sin wrapper de test runner. Sin biblioteca de aserciones más allá de lo que Playwright proporciona. Sin snapshots de regresión visual. Sin auditoría completa de WCAG — aunque eso está a un import de distancia con [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright) si lo quiero después. El objetivo era el conjunto más pequeño que atrape las cosas más probables de romperse.

***

Hay una satisfacción en ejecutar un conjunto de pruebas y ver marcas verdes. Pero el valor real no está en el verde. Está en el rojo futuro — la falla que me dice que rompí algo antes de que alguien más tenga que descubrirlo. Cada prueba es una pequeña promesa: esto importa, y sabré si deja de funcionar.

Construí este sitio para que sea accesible, bilingüe y cuidadosamente diseñado. Ahora tengo una forma de asegurarme de que siga siendo así.
