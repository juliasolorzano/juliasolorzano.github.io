---
date: 2026-03-17
slug: rebuilding-my-site
title: "Turn and Face the Strange"
description: "Una reconstrucción completa de mi sitio web personal — nuevo framework, nuevo diseño, contenido bilingüe, diseño nativo para móvil, arquitectura centrada en accesibilidad y optimización para motores de respuesta."
image: /assets/images/og-rebuilding-my-site.png
---

En 1999, David Bowie se sentó frente a Jeremy Paxman en [BBC Newsnight](https://www.youtube.com/watch?v=FiK7s_0tGsg) y le dijo que el internet iba a cambiarlo todo. Paxman resistió — era solo una herramienta, dijo. Bowie negó con la cabeza. "No. Es una forma de vida alienígena." Habló sobre cómo se estaba rompiendo el muro entre el artista y la audiencia, sobre cómo la interacción entre el usuario y el proveedor iba a destruir nuestra idea de lo que son los medios. Paxman era escéptico. Bowie tenía razón.

Bowie pasó su carrera negándose a quedarse en un solo lugar. Reinventó su sonido, su imagen y su proceso — no porque lo que tenía estuviera roto, sino porque entendía que quedarse quieto significaba quedarse atrás. [Confrontó a MTV en 1983](https://www.youtube.com/watch?v=XZGiVzIr8Qg) por no incluir artistas negros. Lanzó *Blackstar* dos días antes de morir — una reinvención final, en sus propios términos. No esperó a que la industria lo alcanzara. Se movió primero y dejó que la cultura lo siguiera.

La forma en que construimos para la web está en ese tipo de momento ahora mismo. Las herramientas están cambiando, la forma en que las personas encuentran información está cambiando, y el rol de la persona que escribe el código está cambiando. Reconstruí mi sitio personal desde cero este año — no solo la apariencia, sino la base debajo de ella — y nombré la serie con sus canciones porque su filosofía se sentía como el marco adecuado para un proyecto sobre derribar algo y reconstruirlo para lo que viene después.

Mi sitio no había cambiado en 13 años. Mismo framework. Mismo diseño. Mismo todo. Escribí sobre la reconstrucción mientras avanzaba — una serie de cinco partes más dos publicaciones independientes sobre accesibilidad y optimización para motores de respuesta. Esta es la vista general — lo que hice, por qué lo hice, y dónde ir si quieres los detalles.

***

**Migré de Jekyll a Hugo.** Mi sitio había estado funcionando con Jekyll desde 2013. Funcionaba, pero los tiempos de compilación eran lentos, las dependencias eran pesadas, y el soporte multilingüe que necesitaba no existía sin plugins. Hugo me dio compilaciones más rápidas, i18n nativo, y una estructura de contenido más limpia. Reescribí cada plantilla, limpié enlaces rotos de la última década, y preservé cada URL para que nada se rompiera. [Lee más sobre la migración.](/es/blog/2026/03/10/part-1-changing-the-frameworks/)

***

**Rediseñé el layout.** El diseño anterior era una plantilla de blog estándar. El nuevo tiene una barra lateral fija en escritorio con tonos tierra cálidos, encabezados en Lora, texto en Inter, y un modo oscuro que respeta la preferencia de tu sistema operativo. Intencionalmente no es el sitio tech minimalista que ves en todas partes. Se ve como si perteneciera a una persona, no a una plantilla. [Lee más sobre el diseño.](/es/blog/2026/03/11/part-2-designing-the-layout/)

***

**Traduje todo el sitio al español.** Cada página. Las 54 publicaciones del blog. Cada etiqueta de navegación, botón y cadena de interfaz. No a través de una API de traducción — a mano. El acceso lingüístico ha sido parte de mi trabajo profesional en [Login.gov](https://login.gov) y [18F](https://18f.org), y escribí sobre [cómo abordar traducciones en servicios gubernamentales](https://digital.gov/2024/12/17/approaching-language-translations-to-provide-a-better-user-experience/) para Digital.gov. El mismo principio aplica aquí — el idioma no debería ser una barrera para acceder al trabajo de alguien. [Lee más sobre la traducción.](/es/blog/2026/03/12/part-3-translating-into-spanish/)

***

**Construí la experiencia móvil desde cero.** No una versión responsiva del sitio de escritorio — algo propio. Una barra de pestañas inferior con cinco íconos siempre al alcance del pulgar. Objetivos táctiles de 44 puntos en todas partes. Fuentes del sistema en vez de fuentes web. Efectos de vidrio esmerilado en el encabezado y la barra de pestañas. El sitio detecta si estás en un dispositivo móvil real y sirve un diseño diseñado para el tacto. [Lee más sobre la versión móvil.](/es/blog/2026/03/13/part-4-building-for-mobile/)

***

**Hice de la accesibilidad la base.** Indicadores de enfoque visibles en cada elemento interactivo. Un enlace para saltar la navegación traducido a ambos idiomas. Una trampa de enfoque en el menú móvil. Atributos `aria-current`, `aria-expanded` y `aria-live` actualizándose dinámicamente. `prefers-reduced-motion` respetado en todo el sitio. Modo oscuro con relaciones de contraste que se mantienen tanto en modo claro como oscuro. Estos no son extras agregados al final — son decisiones tomadas desde el inicio. La accesibilidad es su propia publicación independiente, separada de la serie de cinco partes, porque merece ser tratada como la base que es — no una subsección enterrada dentro de otra cosa. [Lee más sobre accesibilidad.](/es/blog/2026/03/15/accessibility-is-the-foundation/)

***

**Optimicé para motores de respuesta, no solo motores de búsqueda.** [Gartner estima](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents) que el volumen de búsqueda tradicional caerá un 25 por ciento para 2026. Las personas le están preguntando a ChatGPT, Perplexity y Claude en vez de escribir palabras clave en Google. Agregué schemas de datos estructurados — Person, BlogPosting, CreativeWork — escribí meta descripciones para cada página, y abrí mi `robots.txt` a los rastreadores de IA. El SEO tradicional te posiciona. La optimización para motores de respuesta te hace citar. [Lee más sobre AEO.](/es/blog/2026/03/16/answer-engine-optimization/)

***

**Lo construí junto con IA.** [Simon Willison](https://simonwillison.net/) describe cómo funcionan los agentes de programación en su [guía de patrones de ingeniería agéntica](https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/) — un LLM en el centro, un prompt de sistema con instrucciones, y un conjunto de herramientas que puede invocar en un ciclo. El agente lee archivos, busca código, escribe ediciones, ejecuta comandos, y alimenta los resultados de vuelta a su propio contexto para decidir qué hacer después. No un chatbot al que le pegas preguntas — un ciclo de herramientas que puede leer un código, generar una imagen, verificar una fuente, y escribir código en múltiples archivos en una sola sesión.

Eso es con lo que trabajé. Colaboré con Claude (Opus 4.6) a lo largo de este proyecto — para investigación, redacción, generación de código, creación de imágenes y verificación de fuentes. Cada decisión de diseño, cada elección arquitectónica, cada palabra en cada traducción fue mía. Lo que cambió fue la velocidad y el alcance de lo que pude abordar en un periodo corto.

Entender esa arquitectura cambió cómo trabajé con él. Aprendí a darle contexto (lee este archivo primero), limitar su alcance (solo toca esta sección), y verificar su trabajo (muéstrame la captura de pantalla). Entre más entendí el ciclo, mejor se volvió la colaboración. Planeo escribir más sobre cómo se ve esa colaboración.

***

Este no fue un proyecto de fin de semana. Fue una reconstrucción deliberada, desde la base, de algo que he mantenido por más de una década. El sitio es más rápido, más accesible, completamente bilingüe, y construido para cómo las personas encuentran información en 2026 — no en 2013.

Si algo de esto te es útil, las publicaciones detalladas están todas en mi página de [Escritos](/es/writing/). Si quieres hablar sobre accesibilidad, acceso lingüístico, AEO, o trabajar con IA, siempre estoy feliz de conectar.
