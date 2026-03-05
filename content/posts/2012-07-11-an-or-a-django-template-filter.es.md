---
date: 2012-07-11
slug: an-or-a-django-template-filter
title: Un filtro de plantilla Django para "an" o "a"
---

Encuentro que la mayoría de los proyectos nacen de una necesidad. O buscas algo que haga lo que necesitas, se te ocurre una idea, encuentras algo que casi hace lo que quieres, o ambas. Así fue como creé un nuevo filtro: anora.

Empecé buscando un template tag o filtro que determinara si usar "an" o "a" basándose en el valor contextual de una palabra dada. Django snippets me devolvió un tag que Chris Beaven (también conocido como SmileyChris) creó que hace esto basado en dos expresiones regulares: [https://djangosnippets.org/snippets/1519/](http://djangosnippets.org/snippets/1519/)

¿Genial, verdad? Sí. Es genial. Pero para usar esto tendrías que duplicar el contexto de tu plantilla así:

```django

{{ word | tag }} {{ word }}

```

Lo que resultaría en algo como: 'an owl' o 'a raccoon'.

Parece verboso y no muy DRY (Don't Repeat Yourself). Así que, una necesidad fue encontrada y creada con anora: [https://github.com/juliasolorzano/anora/](https://github.com/juliasolorzano/anora/)

Ahora, simplemente puedes hacer `{{ word|anora }}` y 'a' o 'an' (y un espacio) se agregará antes de tu palabra basado en su valor fonético.

Bastante simple, pero puede ser muy útil. ¡Disfrútenlo!
