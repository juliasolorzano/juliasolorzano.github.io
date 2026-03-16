---
date: 2026-03-10
slug: part-1-changing-the-frameworks
title: "Part 1: Ch-ch-ch-ch-changes"
description: "Migrando un sitio Jekyll de 13 años a Hugo — limpiando enlaces rotos, preservando cada URL y eliminando dependencias para empezar de nuevo."
image: /assets/images/og-part-1-changing-the-frameworks.png
---

*Este es el primero de una serie de cinco escritos sobre las actualizaciones que estoy haciendo en mi sitio web personal — desde migrar el framework, hasta rediseñar el diseño, traducir todo el sitio al español, y más. Estoy trabajando junto a [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview), ejecutando Opus 4.6 de Anthropic localmente, para hacer estos cambios. La parte 1 cubre la migración del framework.*

***

*Ch-ch-ch-ch-changes, turn and face the strange.*

Mi sitio ha funcionado con [Jekyll](https://jekyllrb.com/) desde marzo de 2013. Trece años. A través de cambios de trabajo, rediseños y docenas de escritos, Jekyll fue la constante silenciosa debajo de todo. Funcionaba. Era familiar.

Pero el ecosistema siguió adelante. El desarrollo de Jekyll se desaceleró. La energía en el mundo de los generadores de sitios estáticos se trasladó a herramientas más nuevas y rápidas. Las dependencias de Ruby seguían necesitando atención — fusionando parches de Dependabot para kramdown, rexml, addressable — y el Gemfile se estaba convirtiendo en el archivo más activamente mantenido del repositorio. Era hora de enfrentar lo desconocido.

***

*Ch-ch-changes, just gonna have to be a different man.*

He amado [Hugo](https://gohugo.io/) desde que se lanzó originalmente. Está construido en Go, compila a la velocidad del rayo, y lo he usado para construir múltiples sitios a lo largo de los años — incluyendo el sitio web para la invitación de mi boda. Así que cuando decidí dejar Jekyll, Hugo ni siquiera fue una pregunta. Fue la respuesta.

Sin Gemfile. Sin `bundle install`. Sin gestor de versiones de Ruby. Solo Hugo. Los tiempos de compilación pasaron de segundos a milisegundos, lo cual honestamente todavía me sorprende. Y [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/) maneja la compilación de SCSS de forma nativa, así que pude eliminar la cadena de herramientas separada de Sass que Jekyll requería — incluyendo esa extraña convención de poner delimitadores de front matter YAML al inicio de los archivos `.scss`. Si sabes, sabes.

La curva de aprendizaje tampoco es tan difícil. La [documentación](https://gohugo.io/documentation/) es excelente y los conceptos son lo suficientemente familiares para alguien que lleva más de 20 años programando. Las plantillas de Go son más verbosas que Liquid, claro. Pero la compensación es una herramienta que es rápida, autónoma y activamente mantenida. Simplemente es genial.

***

Antes de migrar un solo archivo, hice una auditoría de enlaces en todo el sitio Jekyll. Trece años de blogging deja un rastro de URLs muertas, y encontré 31 de ellas distribuidas en 19 archivos. Arreglé cada una antes de tocar cualquier otra cosa. Me pareció importante empezar desde una base limpia en lugar de llevar cosas rotas a un nuevo hogar.

Luego hice algo que, en retrospectiva, fue valiente o imprudente. Migré todo en un solo commit.

130 archivos cambiados. 429 inserciones. 403 eliminaciones. El mensaje del commit: *"Lets go Hugo, lets go!"*

Las publicaciones del blog se movieron de sus viejos directorios de Jekyll a la estructura de contenido de Hugo. Los layouts se reorganizaron. Los includes se convirtieron en partials. El front matter se actualizó. Las cosas que necesitaban cambiar, cambiaron. Pero lo que más me importaba preservar — cada una de las URLs — se quedó exactamente donde estaba. Cada escrito en mi sitio había vivido en la misma dirección por más de una década. La gente había enlazado a esas direcciones. Los motores de búsqueda las habían indexado. Hugo hizo que fuera sencillo mantenerlas intactas, y no iba a romper esa confianza.

***

Una migración también es una oportunidad de soltar cosas que has estado cargando. Y eliminé mucho.

[jQuery](https://jquery.com/) y [Velocity.js](http://velocityjs.org/) — eliminados, reemplazados con JavaScript puro. Archivos de fuentes autoalojadas de Raleway y OpenSans — eliminados, intercambiados por [Lora](https://fonts.google.com/specimen/Lora) e [Inter](https://fonts.google.com/specimen/Inter) a través de Google Fonts. El Gemfile — eliminado por completo. La plantilla manual de RSS que Jekyll requería — eliminada, porque Hugo simplemente te genera una. Y los comentarios de Disqus, que habían estado en el sitio desde el primer día — eliminados sin dudar.

El sitio se volvió más ligero. El repositorio se volvió más limpio. *Ch-ch-changes, don't want to be a richer man.* Solo uno más simple. Y por primera vez en mucho tiempo, estaba emocionada de construir sobre esta base.

***

La migración completa — la auditoría de enlaces, la reestructuración de archivos, la preservación de los permalinks, la limpieza — tomó aproximadamente 10 horas de tiempo activo de programación. Trabajé junto a Claude, el modelo de IA de Anthropic, ejecutando [Opus 4.6 localmente a través de Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview). Yo dirigí el trabajo, tomé las decisiones y revisé cada cambio. Claude manejó las partes tediosas a un ritmo que no habría podido igualar sola. Por mi cuenta, esto habría tomado un mes o más de noches y fines de semana.

Pero el cambio de framework resultó ser solo el punto de partida. Una vez que la base estaba en Hugo, el código comenzó a evolucionar de maneras que Jekyll había hecho sentir engorrosas — un rediseño completo, una traducción completa al español, layouts específicos para móviles, trabajo de accesibilidad, y más.

*Time may change me, but I can't trace time.*

Dejaré todo eso para el próximo escrito.
