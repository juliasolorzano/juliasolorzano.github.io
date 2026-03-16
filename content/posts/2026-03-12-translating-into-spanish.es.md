---
date: 2026-03-12
slug: part-3-translating-into-spanish
title: "Part 3: \"Heroes\""
description: "Traduciendo cada página y las 54 publicaciones del blog al español usando el framework multilingüe de Hugo, archivos i18n y etiquetas hreflang."
image: /assets/images/og-part-3-translating-into-spanish.png
---

*Este es el tercero de una serie de cinco escritos sobre las actualizaciones que estoy haciendo en mi sitio web personal. La [Parte 1](/es/blog/2026/03/10/part-1-changing-the-frameworks/) cubrió la migración de Jekyll a Hugo. La [Parte 2](/es/blog/2026/03/11/part-2-designing-the-layout/) cubrió el rediseño visual. La Parte 3 trata sobre la traducción de todo el sitio al español.*

***

*We can be heroes, just for one day.*

Cuando Bowie grabó "Heroes" en 1977, no se detuvo en la versión en inglés. La grabó de nuevo en alemán como "Helden" y otra vez en francés como "Héros." La misma canción, el mismo sentimiento, diferentes palabras. Eso es lo que quería para este sitio — no una versión traducida que se sintiera como algo secundario, sino una versión en español que se sintiera como si hubiera pertenecido ahí desde el principio.

Más de 27 millones de personas en Estados Unidos hablan inglés menos que "muy bien." El español es el idioma no inglés más hablado en el país por un amplio margen. He dedicado parte de mi carrera a trabajar en [accesibilidad lingüística en servicios gubernamentales](https://digital.gov/2024/12/17/approaching-language-translations-to-provide-a-better-user-experience/), y creo que si puedes ofrecer tu trabajo en más de un idioma, deberías hacerlo. Mi sitio fue solo en inglés por más de una década. Así que cuando lo reconstruí en Hugo, decidí que finalmente era hora de hacerlo bilingüe.

***

*I, I will be king. And you, you will be queen.*

Hugo hace que los sitios multilingües sean sorprendentemente sencillos. Cada archivo de contenido recibe un sufijo de idioma — `about.md` para inglés, `about.es.md` para español. El framework se encarga del resto. Las páginas en inglés viven en sus URLs originales. Las páginas en español viven bajo `/es/`. Sin subdominio. Sin repositorio separado. Solo un conjunto paralelo de contenido sentado justo al lado del original.

La configuración es limpia. Dos bloques de idioma en `hugo.toml` — uno para `en` con `en-US` como código de idioma, otro para `es` con `es-MX`. Los valores de peso controlan cuál idioma es el predeterminado. El inglés se mantiene como principal. El español está a un clic de distancia.

***

*Though nothing will drive them away, we can beat them, just for one day.*

La parte más difícil no fue el framework. Fue el idioma en sí.

Traduje cada página del sitio. La página de acerca de mí. La página de trabajo. La página de ahora. El currículum. Cada entrada de blog de la última década — las 54. Cada una recibió un archivo `.es.md` con su propio front matter, su propia URL bajo `/es/`, y su propia traducción.

Esto no fue un copiar y pegar a través de una API de traducción. Estas son mis palabras, mis historias, mi carrera. Las traducciones necesitaban sonar como yo en español, no como yo pasada por un filtro. Algunas entradas fueron directas. Otras requirieron repensar párrafos enteros porque la estructura de la idea funcionaba diferente en español que en inglés. Los modismos no se traducen. El humor cambia. Hasta el ritmo de una oración cambia cuando te mueves entre idiomas.

***

*We can be heroes. We can be heroes. We can be heroes. Just for one day.*

Para la interfaz, construí dos archivos i18n — `en.toml` y `es.toml` — con cada cadena de texto que el sitio muestra. Etiquetas de navegación. Texto de botones. Metadatos como "min read" convirtiéndose en "min de lectura." La página 404. El enlace de saltar al contenido para lectores de pantalla. Incluso las palabras clave de SEO son diferentes por idioma, porque los términos que la gente busca en inglés no son los mismos que buscan en español.

Un selector de idioma se encuentra en la barra lateral en escritorio y en el encabezado en móvil. Solo aparece cuando la página actual tiene una traducción disponible — lo cual, ahora, son todas las páginas. Haz clic en "ES" y llegas al mismo contenido en español. Haz clic en "EN" y regresas. `.IsTranslated` y `.Translations` de Hugo hacen esto casi trivialmente simple en la plantilla. El filtro `relLangURL` maneja todo el prefijo de URLs automáticamente. Lo que tomó más reflexión no fue el código — fue asegurarme de que la experiencia se sintiera fluida, como si el sitio siempre hubiera sido bilingüe.

***

*I, I can remember standing by the wall.*

El lado de SEO también importaba. Cada página ahora lleva etiquetas `hreflang` en el head — una apuntando a la versión en inglés, una apuntando a la versión en español, y un respaldo `x-default`. Los motores de búsqueda usan estas para servir la versión correcta a la audiencia correcta. Un hispanohablante en la Ciudad de México buscando mi nombre debería llegar a la página en español. Un angloparlante en Denver debería llegar a la versión en inglés. Las etiquetas hacen eso posible.

***

*We're nothing, and nothing will help us.*

Hay cosas en las que todavía pienso. Si algunas de las entradas más antiguas siquiera necesitaban traducción. Si alguien leerá las versiones en español. Pero esa última pregunta no viene al caso. Esto no fue por tráfico. Fue por accesibilidad. Si mi trabajo profesional me ha enseñado algo, es que el idioma no debería ser una barrera — ni en servicios gubernamentales, ni en un sitio personal.

***

*We can be heroes, just for one day.*

Cincuenta y cuatro entradas de blog. Seis páginas independientes. Más de cien cadenas i18n. Cada URL reflejada. Cada pieza de metadatos traducida. El sitio es completamente bilingüe ahora, y se siente como si siempre debió haber sido así.

Lo que sigue: hacer que el sitio funcione en móvil — no solo responsivo, sino verdaderamente diseñado para el dispositivo en tu mano.
