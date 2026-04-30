---
date: 2026-04-30
slug: care-is-not-a-feature-flag
title: "El Cuidado No Es un Feature Flag"
description: "Una respuesta al ensayo de Nilay Patel sobre el 'software brain' — por qué el chatbot que publiqué la semana pasada no usa un LLM, y qué creo que la gente realmente anhela cuando dice estar harta de la IA."
image: /assets/images/og-care-is-not-a-feature-flag.png
---

*Esta semana leí un ensayo que le puso lenguaje a algo que llevaba un rato dándome vueltas. [The People Do Not Yearn for Automation](https://www.theverge.com/podcast/917029/software-brain-ai-backlash-databases-automation) de Nilay Patel argumenta que la industria tecnológica tiene lo que él llama* software brain *— una manera de ver el mundo como una serie de bases de datos que se pueden controlar con código estructurado. Su tesis es que la IA no se ha ganado la confianza del público porque la gente está reaccionando a su experiencia real con ella, no al marketing. No he dejado de pensar en eso y en cómo me relaciono con esta noción del software brain.*

***

El argumento de Patel es directo. El software brain funciona para los negocios — recolectar datos, analizarlos, actuar sobre ellos en un loop — pero falla en el momento en que intentas aplicarlo a las personas. Los gobiernos no son software. Las cortes no son computadoras. La mayor parte de la vida no es una base de datos, y mientras más la industria de la IA le pide a la gente que se aplane para caber en una, más se aleja la gente. "Las computadoras deberían adaptarse a las personas," escribe. "Pedirle a la gente que se vuelva más legible para el software — que se convierta en una base de datos — es una idea condenada al fracaso."

Tiene razón. Y las encuestas lo respaldan: cada estudio reciente sobre la actitud de la Generación Z hacia la IA muestra lo mismo — uso alto, rechazo creciente. No te puedes ahorrar con marketing cómo se *siente* algo al usarlo.

***

Me encontré leyendo el ensayo a través del lente del trabajo que acababa de publicar. Hace unas semanas [agregué un chatbot a este sitio](/es/blog/2026/04/17/portfolio-chatbot/). En la superficie, el planteamiento suena exactamente como lo que Patel critica: tomar un portafolio — veinte años de diseño, ingeniería y trabajo en gobierno — y convertirlo en algo que puedes consultar. Aplanar la carrera en algo que el visitante puede preguntar. El portafolio como conversación.

Salvo que el chatbot no tiene un modelo de lenguaje. No hay API, no hay inferencia, no hay machine learning, no hay datos de entrenamiento, no hay telemetría. Toda la conversación es un árbol de decisiones guiado que escribí, viviendo en un archivo YAML que Hugo serializa en la página al momento de construir el sitio. El modelo de interacción toma prestado del momento en el que estamos. La sustancia lo rechaza.

No lo pensé de esa forma cuando lo construí. Lo construí porque una conversación guiada me parecía una forma más clara de presentar mi trabajo que una barra lateral con menús. Pero el ensayo de Patel me hizo pensar. La forma de una interacción puede existir sin el sustrato debajo. Puedes tomar prestada la *sensación* de una conversación sin pedirle al visitante que alimente un modelo a cambio de una respuesta.

***

Esa distinción no es una pose. Es justamente la razón por la que estas herramientas se sienten distintas desde adentro.

Cuando hablas con un chatbot real construido sobre un LLM hospedado, algo está pasando del otro lado. Tus palabras van a algún lugar. Se registran, se analizan, posiblemente se conservan, posiblemente se usan para entrenar la siguiente versión del modelo. Estás haciendo dos cosas a la vez: hacer una pregunta y alimentar un sistema. Incluso cuando las respuestas son útiles, la transacción es asimétrica.

El árbol de decisiones de mi sitio no hace nada de eso. Nada del visitante se recolecta. No hay otro lado. Los "datos" son veinte años de mi propia carrera, organizados por mí, en el lenguaje que yo elegí, en los dos idiomas que hablo. El visitante no se está volviendo legible para nada. Está leyendo algo que yo escribí, en el orden en el que quiere leerlo. Eso se parece más a un libro con tabla de contenidos que a un agente de IA. Solo que tiene la apariencia de una ventana de chat.

Creo que a esto se refiere Patel cuando dice que la gente no anhela la automatización. No le molesta la conversación. Le molesta ser leída.

***

Puedes seguir el mismo hilo por el resto del sitio. La [accesibilidad](/es/blog/2026/03/15/accessibility-is-the-foundation/) es un rechazo a obligar al usuario a adaptarse a la interfaz — manejo del foco, HTML semántico, movimiento reducido, soporte para lectores de pantalla, modo oscuro. El sitio se adapta al humano. No al revés.

Ahora sobre las traducciones. Cada publicación de este sitio tiene un archivo en inglés y otro en español, y el español no pasa por una API de traducción. La [suite de pruebas](/es/blog/2026/03/25/testing-the-foundation/) revisa que se mantenga la paridad de traducciones — cada post tiene que existir en ambos idiomas — pero la *calidad* y el *dialecto* (México) del español son cosas que solo un humano puede garantizar.

Estas decisiones cuestan más que las alternativas automatizadas. Ese costo es el cuidado. La gente nota la diferencia, incluso cuando no sabe nombrarla. Cuando una lectora aterriza en una traducción y nota que suena como si la hubiera escrito una persona — eso no es un logro de UX. Es la ausencia de una extracción.

***

La frase que se me quedó pegada del texto de Ezra Klein, citado en el ensayo de Patel, es *making themselves legible to the A.I.* — volverse legibles para la IA. Esa es la petición debajo de cada "conecta tus cuentas," cada demo de un agente que pide leerte el correo, cada función de memoria persistente que se está lanzando en este momento. No es exactamente vigilancia y no es exactamente comodidad. Es una petición de que te reformatees para que un modelo pueda actuar sobre ti.

Yo no quiero hacer eso. Tampoco quiero pedírtelo a ti (querida lectora). Hay versiones de la IA que me parecen genuinamente útiles — usé herramientas de IA mientras [reconstruía este sitio](/es/blog/2026/03/17/rebuilding-my-site/), y he sido [pragmática sobre cómo el descubrimiento](/es/blog/2026/03/16/answer-engine-optimization/) se está moviendo hacia los motores de respuestas. No soy la persona que escribe el ataque frontal. Pero hay una diferencia entre una herramienta a la que recurro y un sistema al que se me pide alimentar, y lo segundo es a lo que la gente está reaccionando.

***

Patel dice que la gente no anhela la automatización. Creo que es cierto, y lo extendería. Lo que la gente sí anhela es evidencia de que alguien tomó una decisión por ella. Un camino curado. Una traducción pensada. Una interfaz que respeta su atención. Una respuesta que vino de una persona.

El cuidado no es un feature flag. No lo puedes lanzar en un roadmap. No llegas a él haciendo pruebas A/B. Aparece en lo pequeño — en lo que decidiste no automatizar, en los idiomas que elegiste escribir tú, en el árbol de decisiones que escribiste a mano porque querías que la visitante fuera recibida por ti y no por un modelo entrenado con las voces de un millón de personas más.

Esa es la versión de este trabajo que quiero seguir haciendo.

***

Si no has leído [el ensayo de Patel](https://www.theverge.com/podcast/917029/software-brain-ai-backlash-databases-automation), vale la pena tu tiempo. Y si quieres ver a qué me refiero con el chatbot, sigue ahí en [/es/chat/](/es/chat/), preescrito, sin modelo, sin registros, solo yo.
