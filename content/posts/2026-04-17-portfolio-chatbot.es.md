---
date: 2026-04-17
slug: portfolio-chatbot
title: "El Portafolio como Conversación"
description: "Un experimento que reemplaza la navegación tradicional de un portafolio con un chatbot guiado — preescrito, estático, bilingüe y accesible."
image: /assets/images/og-portfolio-chatbot.png
---

*Hace poco escribí sobre [reconstruir mi sitio web personal desde cero](/es/blog/2026/03/17/rebuilding-my-site/) — nuevo framework, nuevo diseño, contenido bilingüe, arquitectura enfocada en accesibilidad. Desde entonces he seguido construyendo. Esto es sobre un experimento: un chatbot que permite a los visitantes explorar mi trabajo a través de conversación en lugar de navegación.*

***

Los sitios de portafolio siempre han sido problemas de arquitectura de información. Organizas tu trabajo en secciones — experiencia, proyectos, escritos, sobre mí — y diseñas la navegación para ayudar a las personas a encontrar lo que necesitan. Piensas en jerarquía, etiquetas, señalización. Pruebas si lo que llamaste "Trabajo" debería llamarse "Proyectos." Optimizas para la persona que llega a tu sitio y ya sabe lo que busca.

Esa suposición ha comenzado a cambiar.

***

Estamos en un momento en el que la forma en que las personas encuentran información está cambiando. La IA ha hecho más fácil que nunca que alguien obtenga lo que necesita — o descubra lo que no sabía que quería — a través de conversación en lugar de navegación. Las personas están cada vez más cómodas haciendo una pregunta y recibiendo una respuesta en lugar de escanear un menú y hacer clic entre páginas. El modelo de interacción está cambiando de "navegar y descubrir" a "preguntar y recibir."

He pasado años pensando en arquitectura de información — en gobierno, en design systems, en software empresarial. Es un trabajo que me importa profundamente. Pero también he empezado a preguntarme qué pasa con el sitio de portafolio cuando las personas que lo visitan esperan un tipo diferente de interacción. Cuando están acostumbradas a escribir una pregunta y que algo les responda, ¿qué significa darles una barra lateral y decirles que se las arreglen?

***

Así que construí un chatbot. Lo puedes encontrar en [/es/chat/](/es/chat/).

No está impulsado por un modelo de lenguaje. No hay llamada a una API, no hay texto generado, no hay machine learning. Es un árbol de decisiones guiado — un conjunto de nodos de conversación preescritos con botones de respuesta. Llegas a la página, el bot te saluda y te ofrece algunos caminos: mi experiencia laboral, proyectos que he construido, mis escritos, un poco sobre mí, o cómo ponerte en contacto. Eliges uno, responde con más detalle, y sigues avanzando. Cada camino lleva a algo útil — una página en este sitio, un enlace externo, o una forma de regresar y explorar otra cosa.

El contenido de la conversación cubre toda mi carrera. Más de veinte años en tecnología. Todo está ahí, organizado no por jerarquía de páginas sino por flujo conversacional. El bot te da unas cuantas oraciones y luego pregunta qué quieres saber. Nunca tienes que averiguar dónde vive algo en un menú.

***

La implementación técnica es intencionalmente simple. Todo el árbol de conversación vive en un archivo de datos YAML — un conjunto de nodos para inglés, otro para español. Hugo lo serializa en JSON en línea al momento de construir el sitio, así que no hay solicitudes de red ni dependencias externas. El motor de JavaScript es un solo archivo JS vanilla en un IIFE que lee los datos de una etiqueta `<script>`, renderiza mensajes uno por uno con un indicador de escritura para darle ritmo conversacional, y presenta las opciones como elementos `<button>` reales.

La accesibilidad también fue una prioridad. El contenedor del chat tiene `role="log"` y `aria-live="polite"` para que los lectores de pantalla anuncien los mensajes nuevos conforme aparecen. Cada burbuja de mensaje incluye una etiqueta de hablante visualmente oculta — "Julia:" o "Tú:" — para que los usuarios de lectores de pantalla sepan quién dijo qué. El manejo del foco se mueve al primer botón de opción después de que el bot termina de responder, y todo respeta `prefers-reduced-motion` — si tienes esa configuración habilitada, las animaciones de escritura y los retrasos desaparecen por completo. Los botones de opciones que abren enlaces externos lo anuncian: "se abre en una nueva pestaña."

***

Lo que me gusta de este experimento es que replantea el portafolio: de algo que navegas a algo con lo que conversas. Es una modalidad diferente. Algunos visitantes preferirán la barra lateral y las páginas tradicionales — y esas siguen ahí, exactamente donde siempre han estado. Pero algunos visitantes podrían preferir ser guiados. Decir "me interesa tu trabajo en gobierno" y que el sitio responda con los detalles relevantes y un enlace para profundizar.

Cambia la sensación de la interacción. En lugar de llegar y averiguar dónde hacer clic, llegas y alguien te pregunta qué te interesa. Esa es una experiencia significativamente diferente — incluso cuando las respuestas están preescritas.

***

Esto es un experimento. No voy a agregar el chatbot a mi navegación principal todavía. Tengo otras ideas sobre hacia dónde podría ir esto — formas de hacer que el sitio de portafolio se sienta más receptivo a la persona que lo visita. Este es el primer paso.

Si quieres probarlo, ve a [/es/chat/](/es/chat/) y déjame saber qué piensas. Tengo genuina curiosidad por saber si este concepto resuena — si el portafolio-como-conversación se siente útil, solo novedoso, o algo intermedio.

Más por venir.
