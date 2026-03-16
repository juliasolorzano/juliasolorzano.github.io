---
date: 2026-03-16
slug: answer-engine-optimization
title: "Optimización para motores de respuesta"
description: "Por qué importa optimizar para motores de respuesta como ChatGPT, Perplexity y Google AI Overviews — y los cambios prácticos que hice en mi sitio para prepararme para el cambio desde el SEO tradicional."
image: /assets/images/og-answer-engine-optimization.png
---

Durante veinte años, la pregunta fue: *¿cómo posiciono en Google?*

Esa pregunta está cambiando. No ha desaparecido — los motores de búsqueda siguen importando. Pero una nueva capa ha aparecido encima de ellos. Las personas están preguntándole a [ChatGPT](https://chatgpt.com/), [Perplexity](https://www.perplexity.ai/), [Google AI Overviews](https://blog.google/products/search/generative-ai-google-search-may-2024/) y [Claude](https://claude.ai/) en vez de escribir palabras clave en una barra de búsqueda. [Gartner estima](https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026) que el volumen de motores de búsqueda tradicionales caerá un 25 por ciento para 2026 a medida que los usuarios migren a alternativas impulsadas por IA. Y la forma en que esas herramientas encuentran, evalúan y citan tu contenido es fundamentalmente diferente a cómo lo hace un motor de búsqueda.

Esto es lo que la gente está llamando Optimización para Motores de Respuesta — AEO por sus siglas en inglés ([Answer Engine Optimization](https://www.searchenginejournal.com/answer-engine-optimization/523842/)). También lo verás como [Generative Engine Optimization](https://writer.com/blog/geo-aeo-optimization/) (GEO), AI SEO o AIO. Los términos se superponen más de lo que difieren. AEO tiende a enfocarse en lograr que tu contenido sea extraído como respuestas directas — fragmentos destacados, AI Overviews, resultados de búsqueda por voz. GEO es más amplio, orientado a ganar citaciones dentro de narrativas generadas por IA desde herramientas como ChatGPT, Perplexity y Claude. En la práctica, las técnicas se alimentan mutuamente: datos estructurados, escritura clara y contenido autoritativo importan para ambos.

Quiero ser transparente — no soy experta en SEO, y no soy experta en AEO. Pero el SEO ha sido parte de mi flujo de trabajo desde que se convirtió en una consideración en el desarrollo web. Es una de esas cosas que, si construyes sitios web, aprendes a tener en cuenta sin importar si está en tu título de trabajo. Con el cambio hacia personas usando herramientas de IA en vez de — o junto con — motores de búsqueda, sentí que era el momento adecuado para empezar a incorporar AEO en ese mismo flujo de trabajo. No como una especialidad, sino como otra capa del trabajo que ya hago cuando construyo y mantengo sitios.

Pasé un tiempo pensando en lo que eso significa para mi sitio, y luego hice cambios. Aquí está lo que hice, por qué lo hice, y lo que creo que otros deberían estar observando.

***

Un motor de búsqueda devuelve una lista de enlaces. Escribes una consulta, obtienes diez resultados azules, haces clic en uno. El trabajo del motor de búsqueda es posicionar páginas. Tu trabajo, como dueño de un sitio, era ser la página mejor posicionada.

Un motor de respuesta hace algo diferente. Lee tu contenido, lo sintetiza con otras fuentes y genera una respuesta. A veces te cita. A veces te parafrasea. A veces toma una oración de tu página y la entrelaza en una respuesta junto con otros cinco sitios. No estás compitiendo por una posición en un ranking. Estás compitiendo para ser una fuente en la que el modelo confíe lo suficiente como para referenciar.

Eso cambia lo que importa.

***

Lo primero que hice fue revisar mis [datos estructurados](https://schema.org/). Los datos estructurados son metadatos incrustados en tu HTML — específicamente [JSON-LD](https://json-ld.org/) — que le dicen a las máquinas quién eres, de qué trata tu página y cómo está organizado tu contenido. Los motores de búsqueda los han usado durante años para generar fragmentos enriquecidos. Los motores de respuesta los usan para construir un grafo de conocimiento sobre ti.

Mi sitio ya tenía un schema de [Person](https://schema.org/Person) identificándome — mi nombre, título de trabajo, empleador, educación y áreas de experiencia. Lo expandí para incluir todos mis perfiles sociales: [LinkedIn](https://www.linkedin.com/in/juliasolorzano), [GitHub](https://github.com/juliasolorzano) y [Bluesky](https://bsky.app/profile/juliasolorzano.com). Mientras más conexiones pueda verificar un motor de respuesta entre tu identidad y tu presencia en la web, con más confianza puede atribuirte información.

También agregué un schema de [BlogPosting](https://schema.org/BlogPosting) a cada publicación del blog con un campo `description`, y un [CollectionPage](https://schema.org/CollectionPage) con elementos [CreativeWork](https://schema.org/CreativeWork) para mi página de trabajo. Cada proyecto ahora es una entidad estructurada con nombre, descripción y URL. Cuando un motor de respuesta encuentra mi página de trabajo, no solo ve párrafos de texto. Ve una lista de proyectos discretos sobre los que puede razonar individualmente.

***

Las meta descripciones suenan aburridas. También son una de las cosas más importantes que puedes controlar.

Cuando un motor de respuesta decide si citar tu página, a menudo mira primero la meta descripción. Es el resumen más corto y autoritativo de lo que contiene tu página. Si no escribes una, el motor adivina — y puede adivinar mal.

Audité cada página de mi sitio y encontré que varias no tenían descripciones. Mi página de trabajo, mi página de ahora, mi índice de escritos y las seis publicaciones recientes de mi blog no tenían campo `description` en su front matter. La plantilla `<head>` del sitio tenía un respaldo a la descripción general del sitio, pero eso significaba que cada página sin su propia descripción le estaba diciendo a los motores de respuesta lo mismo de forma genérica. Escribí descripciones únicas para todas.

***

Luego está la pregunta de si dejar entrar a los rastreadores de IA o no.

Tu archivo `robots.txt` es donde les dices a los rastreadores qué pueden y qué no pueden acceder. Muchos editores han estado bloqueando rastreadores de IA — [GPTBot](https://platform.openai.com/docs/bots/overview), [ClaudeBot](https://docs.anthropic.com/en/docs/build-with-claude/web-crawling) y otros — porque no quieren que su contenido se use para entrenar modelos sin compensación. [Cientos de editores](https://originality.ai/blog/list-of-ai-crawlers) han agregado bloqueos a su `robots.txt`.

Yo fui en la dirección opuesta. Mi `robots.txt` da la bienvenida explícitamente a todos los principales rastreadores de IA: GPTBot, ClaudeBot, PerplexityBot, GoogleOther, Amazonbot y varios más. Este es un sitio personal. Mi objetivo es ser encontrada, citada y referenciada. Si un motor de respuesta quiere leer mis páginas y contarle a alguien sobre mi trabajo, eso es exactamente lo que quiero. Bloquear esos rastreadores sería como cerrar con llave la puerta de una tienda y preguntarse por qué nadie entra.

Pero esta es una decisión que cada dueño de sitio necesita tomar por sí mismo. Si publicas investigación propietaria, reportajes originales o contenido premium, bloquear rastreadores de IA podría proteger tu modelo de negocio. Si estás tratando de construir una presencia pública, bloquearlos trabaja en tu contra. No hay una respuesta universal correcta — solo tu respuesta.

***

El último cambio técnico fue pequeño pero fácil de pasar por alto. Agregué una etiqueta `<link rel="sitemap">` al `<head>` de mi sitio. Hugo genera un sitemap automáticamente, y ya estaba referenciado en mi `robots.txt`, pero tenerlo enlazado en el head del HTML lo hace descubrible por cualquier rastreador que lea la página — no solo los que revisan `robots.txt` primero. Lo mismo para el feed RSS, que ya estaba enlazado vía `<link rel="alternate">`.

***

Si estás pensando en AEO para tu propio sitio, esto es en lo que me enfocaría:

**Empieza con datos estructurados.** Agrega [JSON-LD](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) a tus páginas. Como mínimo, identifícate con un schema de Person u Organization. Si publicas artículos, agrega schemas de Article o BlogPosting. Si tienes un portafolio, agrega schemas de CreativeWork. [Schema.org](https://schema.org/) es el vocabulario. [La documentación de datos estructurados de Google](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) es la mejor guía práctica.

**Escribe meta descripciones para todo.** Cada página. Cada publicación. Mantenlas bajo 160 caracteres, hazlas específicas y hazlas precisas. Esta es la oración que un motor de respuesta usará para decidir si tu página vale la pena citar.

**Define tu política de robots.txt.** Mira quién te está rastreando y decide si quieres que lo hagan. [Originality.ai mantiene una lista](https://originality.ai/blog/list-of-ai-crawlers) de rastreadores de IA conocidos y sus cadenas de User-Agent. Puedes darles la bienvenida a todos, bloquearlos a todos, o elegir selectivamente.

**Haz tu contenido claro y bien estructurado.** Los motores de respuesta analizan tu contenido de la misma forma que un lector cuidadoso. Usa encabezados. Usa párrafos cortos. Declara tu punto principal temprano. Si tu contenido está bien organizado para humanos, está bien organizado para máquinas.

**Piensa en el reconocimiento de entidades.** Los motores de respuesta están construyendo grafos de conocimiento. Quieren saber: quién escribió esto, dónde trabaja, en qué es experto y cómo se conecta esto con otras cosas en la web. Tus datos estructurados, tu página de acerca de y tus perfiles sociales alimentan esto. Mientras más consistente e interconectada sea tu identidad en la web, más probable es que un motor de respuesta te reconozca como una fuente creíble.

***

[La investigación de SparkToro](https://sparktoro.com/blog/new-research-how-much-search-traffic-is-really-from-google/) ha mostrado que las búsquedas sin clic — donde Google responde la pregunta directamente sin enviarte tráfico — ahora representan una proporción significativa de todas las búsquedas. [Los datos de Similarweb](https://www.similarweb.com/) sitúan el número en casi el 60 por ciento en Estados Unidos. Los motores de respuesta impulsados por IA aceleran esa tendencia. El clic está desapareciendo. Lo que queda es la citación.

Eso no significa que el SEO esté muerto. Significa que el juego se está expandiendo. El SEO tradicional te posiciona. El AEO te hace citar. Ambos importan, pero si solo estás optimizando para uno, estás dejando el otro sobre la mesa.

***

No sé exactamente hacia dónde va esto. Nadie lo sabe. Pero sí sé que las personas y sitios que aparecen en respuestas generadas por IA son los que hicieron fácil para esos sistemas entender quiénes son y qué saben. Eso no es manipular un algoritmo. Es simplemente buena comunicación — del tipo que funciona sin importar si tu audiencia es un humano o una máquina.
