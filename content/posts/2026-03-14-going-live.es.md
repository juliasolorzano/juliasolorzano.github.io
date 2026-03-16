---
date: 2026-03-14
slug: part-5-going-live
title: "Part 5: Starman"
description: "Desplegando el sitio reconstruido con GitHub Actions, compilaciones de Hugo en menos de un segundo, rendimiento probado con Lighthouse y un pipeline que desaparece."
image: /assets/images/og-part-5-going-live.png
---

*Este es el quinto y último de una serie de escritos sobre las actualizaciones que estoy haciendo en mi sitio web personal. La [Parte 1](/es/blog/2026/03/10/part-1-changing-the-frameworks/) cubrió la migración de Jekyll a Hugo. La [Parte 2](/es/blog/2026/03/11/part-2-designing-the-layout/) cubrió el rediseño visual. La [Parte 3](/es/blog/2026/03/12/part-3-translating-into-spanish/) cubrió la traducción del sitio al español. La [Parte 4](/es/blog/2026/03/13/part-4-building-for-mobile/) cubrió la construcción para móvil. La Parte 5 trata sobre el despliegue, el rendimiento, y poner todo en línea.*

***

*There's a starman waiting in the sky.*

En algún momento tienes que dejar de construir y empezar a enviar. El framework estaba migrado. El diseño estaba renovado. El sitio era bilingüe. La experiencia móvil se sentía nativa. Todo funcionaba localmente. Pero localmente no cuenta. Un sitio personal que solo corre en tu laptop es solo una carpeta.

Así que la última pieza fue ponerlo en línea — de manera confiable, automática, y rápida.

***

*He'd like to come and meet us, but he thinks he'd blow our minds.*

El sitio está alojado en [GitHub Pages](https://pages.github.com/). Lo ha estado por años, y no vi razón para cambiar eso. El repositorio es público. El alojamiento es gratuito. El dominio es personalizado. Lo que cambió fue el pipeline de despliegue.

Con Jekyll, GitHub Pages manejaba la compilación internamente. Empujabas tus archivos fuente y GitHub los compilaba de su lado. Era conveniente pero limitante — estabas atada a cualquier versión de Jekyll que GitHub soportara, y no podías usar plugins o herramientas fuera de ese sandbox.

Hugo es diferente. GitHub Pages no compila sitios Hugo nativamente. Así que la compilación sucede a través de [GitHub Actions](https://github.com/features/actions) — un archivo de workflow que se activa en cada push a `main`, instala Hugo, compila el sitio, y despliega la salida a GitHub Pages. Todo el proceso toma unos 30 segundos desde el push hasta estar en línea.

***

*Look out your window, I can see his light.*

El workflow es directo. Un solo archivo YAML en `.github/workflows/` define todo el pipeline. Hace checkout del repo, configura Hugo con soporte extendido para SCSS, ejecuta `hugo --minify` para compilar y comprimir todo, y empuja el resultado a la rama de despliegue. Sin servidor de compilación. Sin contenedor Docker. Sin plataforma de terceros. Solo un GitHub Action que se ejecuta cada vez que empujo código.

Agregué un paso para verificar enlaces rotos durante la compilación. Si una auditoría de enlaces falla, el despliegue se detiene. Aprendí esa lección durante la migración — 31 URLs muertas en 19 archivos — y no quiero aprenderla de nuevo. La compilación atrapa problemas antes de que lleguen al sitio en vivo.

***

*If we can sparkle, he may land tonight.*

El rendimiento no fue una ocurrencia tardía. Hugo compila todo el sitio — cada página, ambos idiomas, cada recurso — en menos de 500 milisegundos. La salida es HTML estático, CSS, y una pequeña cantidad de JavaScript. Sin renderizado del lado del servidor. Sin hidratación del lado del cliente. Sin runtime de framework enviado al navegador. La página carga y ya está.

Paso la salida compilada por [Lighthouse](https://developer.chrome.com/docs/lighthouse/) regularmente. Las puntuaciones se mantienen altas porque simplemente hay menos que medir. Sin scripts de terceros. Sin rastreadores de analíticas. Sin banners de cookies. Sin fuentes web en móvil. La solicitud más rápida es la que nunca haces.

***

*Don't tell your papa or he'll get us locked up in fright.*

El SCSS se compila a través de Hugo Pipes, lo que significa que se procesa en tiempo de compilación, no en tiempo de ejecución. La salida es un solo archivo CSS minificado con hashes de cache-busting en el nombre del archivo. Cuando cambio un estilo, el nombre del archivo cambia, y los navegadores obtienen la nueva versión automáticamente. Cuando no cambio nada, la versión en caché se mantiene.

Las imágenes son el sospechoso habitual de sitios lentos, pero este sitio es mayormente texto. Las imágenes OG para compartir en redes sociales son los recursos más grandes, y solo se cargan cuando una plataforma las obtiene para una vista previa de enlace — no cuando un visitante carga la página. Todo lo demás es liviano por diseño.

***

*There's a starman waiting in the sky. He's told us not to blow it.*

La configuración del dominio es simple. Un registro CNAME apunta `juliasolorzano.com` a GitHub Pages. HTTPS se maneja automáticamente a través de la integración de GitHub con Let's Encrypt. Sin gestión de certificados. Sin recordatorios de renovación. Simplemente funciona, y ha funcionado sin interrupción por años.

***

*Cause he knows it's all worthwhile.*

Hay algo satisfactorio en un pipeline de despliegue que desaparece. Escribo una entrada, empujo a `main`, y 30 segundos después está en línea en dos idiomas en un sitio que carga rápido, se ve intencional, y funciona en cada dispositivo que tengo. Sin fallas de compilación que depurar. Sin dependencias que actualizar. Sin infraestructura que mantener. Solo palabras y código, enviados.

***

*Let the children use it. Let the children lose it. Let all the children boogie.*

Esta serie cubrió cinco partes de un solo proyecto: una migración de framework, un rediseño visual, una traducción completa al español, una experiencia móvil nativa, y un pipeline de despliegue. El sitio pasó de una compilación de Jekyll de trece años con dependencias desactualizadas a un sitio Hugo rápido, bilingüe y accesible que se despliega solo.

Trabajé junto a Opus 4.6 a través de [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) para toda la reconstrucción. Tomé cada decisión. Revisé cada cambio. Pero el ritmo no hubiera sido posible sola. Lo que podría haber tomado meses de noches y fines de semana tomó horas de colaboración enfocada.

El sitio está en línea. El código es público. Y por primera vez en mucho tiempo, estoy emocionada de escribir en él de nuevo.

*There's a starman waiting in the sky.*
