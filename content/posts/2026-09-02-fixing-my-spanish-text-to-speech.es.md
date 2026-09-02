---
date: 2026-09-02
slug: fixing-my-spanish-text-to-speech
title: "Mis escritos en español tenían acento sudafricano"
description: "Durante cinco meses, cada escrito en español de este sitio fue leído en voz alta por una voz en inglés que pronunciaba la ortografía española fonéticamente. Este es el error de una sola línea detrás de todo, por qué la Web Speech API hace tan fácil cometerlo, y qué se necesita realmente para manejar bien los dialectos."
image: /assets/images/og-fixing-my-spanish-text-to-speech.png
---

*En marzo [agregué un reproductor de texto a voz](/es/blog/2026/03/19/adding-text-to-speech/) a este sitio para que cualquiera pudiera escuchar mis escritos en lugar de leerlos. La semana pasada le di play a una de las versiones en español y escuché algo que me hizo torcer la boca. Esto es sobre el error, la solución, y lo incómodo que me enseñó sobre probar un sitio bilingüe.*

***

El reproductor llevaba cinco meses en vivo. Estaba contenta con él. Funcionaba, era accesible, había pasado una auditoría de verdad — semántica para lectores de pantalla, tamaño de los objetivos táctiles, contraste de color, todo.

Luego abrí la versión en español de uno de mis propios escritos y le di play.

Lo que salió no era español. Eran *palabras* en español, reconocibles, pero pronunciadas como si alguien le hubiera dado el texto a una persona que nunca ha visto el idioma y le hubiera pedido que lo leyera en voz alta con las reglas del inglés. La doble L de *llegar* salió como una L inglesa. La J de *trabajo* era una J inglesa, no la jota áspera que debería ser. Todas las vocales estaban mal — las vocales del español son puras y cortas, y estas eran los diptongos largos y resbalosos del inglés. Sonaba como un turista leyendo un menú.

Supe de inmediato que era mi culpa. Nada más no sabía todavía cómo.

***

Aquí está el error, y es una sola línea.

Cuando construí el reproductor en marzo, probé unas cuantas docenas de voces y me quedé con una llamada Tessa. Era cálida, de ritmo parejo, y no sonaba como un GPS. Así que la puse como la voz preferida:

```js
var PREFERRED_VOICE = 'Tessa';
```

Tessa es una voz **en-ZA**. Inglés sudafricano.

Esa línea aplicaba en cada página del sitio. Cada página, en ambos idiomas. Los escritos en español estaban siendo leídos por una voz de inglés sudafricano, pronunciando fonéticamente la ortografía del español.

Lo que hace que este sea un error genuinamente fácil de cometer es lo que pasa después. Más abajo, el código hacía esto:

```js
utterance.lang = document.documentElement.lang || 'en';  // 'es' en páginas en español
utterance.voice = selectedVoice;                          // Tessa, en-ZA
```

Eso se ve defensivo. Parece que la línea del `lang` está haciendo algo. No lo está haciendo.

**En la Web Speech API, `utterance.voice` anula por completo a `utterance.lang`.** Una vez que asignas una voz, la pista del idioma está muerta. No es un respaldo, no es una sugerencia, no se consulta para la pronunciación. Una voz *es* un idioma — el conjunto de fonemas y las reglas de pronunciación vienen horneados dentro de ella. No puedes pedirle a una voz en inglés que hable español, igual que no puedes pedirle a un violín que suene como trompeta con solo ponerle otra etiqueta.

Así que la línea `lang = 'es'` era pura decoración. La escribí en marzo, la vi ahí, y desde entonces la leí como "esto se encarga del caso del español". No se encargaba de nada.

***

Había un segundo problema, más callado, por debajo.

Mi atributo `<html lang>` emite `es` — nada más el idioma, sin región. Incluso con el error de Tessa arreglado, un `es` pelón normalmente se resuelve como español castellano. En macOS eso significa Mónica: una voz encantadora, y la equivocada para mí. El castellano tiene la *zeta* — *gracias* sale como *grathias* — y una prosodia que es inconfundiblemente de España.

Yo escribo en español mexicano. Mi mamá es de Guadalajara. Que me lean mis escritos de vuelta en un español que no es el que realmente hablo es una herida más chica que el error del acento inglés, pero es la misma herida.

La solución es usar etiquetas **BCP-47** completas, con la región pegada. No `es` sino `es-MX`. No `en` sino `en-US`. Ya las tenía en mi configuración de Hugo y simplemente nunca las había conectado:

```toml
[languages.es]
  languageCode = "es-MX"
```

El partial del reproductor ahora lleva ese valor al marcado, y el JavaScript lo lee de ahí.

***

La selección de voz reescrita sigue una regla por encima de todas las demás: **una voz solo se elige del idioma de la página misma.** Si nada coincide, no asigna ninguna voz y deja que el navegador la resuelva desde `lang` — una voz elegida por el navegador en el idioma correcto le gana a una voz elegida a mano en el idioma equivocado, siempre.

Más allá de eso, ordena a los candidatos: primero una preferencia por nombre, luego una coincidencia regional exacta (`es-MX` por encima de `es-ES`), luego cualquier voz en el idioma correcto.

El paso de la preferencia por nombre es lo que me dejó conservar a Tessa. Sigue siendo la voz predeterminada en inglés, porque me sigue gustando — nada más que ahora la preferencia está limitada al inglés en lugar de aplicar a todo el sitio. El español recibe a Paulina, que es `es-MX`.

Los nombres de voces que vale la pena conocer, si vas a hacer esto tú:

- **macOS e iOS** — Paulina (es-MX), Mónica (es-ES), Jorge (es-ES), Diego (es-AR)
- **Chrome** — "Google español de Estados Unidos" es es-US y es tu mejor opción latinoamericana. Chrome no incluye ninguna voz de Google en es-MX.
- **Windows y Edge** — Sabina y Raúl son es-MX, Dalia aparece en el conjunto más nuevo de voces Natural, Helena y Laura son es-ES

Los busco como subcadenas sin distinguir mayúsculas, y quitando los acentos, para que *Mónica* y *Monica* funcionen igual.

***

Hay una palanca más, y resultó ser la más grande para la calidad.

En macOS, la Paulina que viene por defecto es la voz **compacta**. Ese es el sonido delgado, zumbón, de GPS del 2012. Existen variantes Enhanced y Premium de la misma voz que son muchísimo mejores, y no se instalan a menos que vayas por ellas, en *Configuración del Sistema → Accesibilidad → Contenido hablado → Voz del sistema → Administrar voces*.

La selección ahora pone Premium por encima de Enhanced y de la compacta dentro de un mismo nombre, así que si quien escucha tiene los archivos buenos instalados, se usan automáticamente sin que nadie configure nada.

Dos límites que vale la pena decir con honestidad. Las voces de Siri — las verdaderamente buenas — no están expuestas a la Web Speech API en absoluto, así que simplemente están fuera de la mesa. Y cada persona que escucha solo obtiene lo que está instalado en su propia máquina. No puedo enviar una voz junto con un sitio estático. Si algún día decido que la calidad del audio en español debe estar *garantizada* y no solo *esperada*, la respuesta es pre-generar archivos de audio con un proveedor de TTS neuronal en tiempo de compilación, que es un proyecto distinto y mucho más pesado.

También hay una limitación que no arreglé. El reproductor aplana cada escrito en una sola cadena de texto, así que un escrito en español que cite algo en inglés se lee completo con una sola voz. Hacerlo bien significa segmentar el texto por idioma y encadenar varias utterances por separado. Es trabajo de verdad, no un ajuste, y lo dejé en paz por ahora.

***

Verifiqué ambos idiomas en un navegador antes de darlo por terminado, interceptando la utterance real en el momento de la reproducción en lugar de confiar en que el código se veía bien:

| Página | Idioma | Voz |
|---|---|---|
| Escrito en inglés | `en-US` | Tessa (en-ZA) |
| Escrito en español | `es-MX` | **Paulina (es-MX)** |

Las diecinueve [pruebas de Playwright que escribí en marzo](/es/blog/2026/03/25/testing-the-foundation/) siguen pasando. Ninguna de ellas detectó esto, y vale la pena quedarse un rato con eso — revisan que el reproductor *exista*, que sus atributos ARIA sean correctos, que la barra de progreso reporte los valores correctos. Ni una sola revisa qué voz sale. Las pruebas estaban observando la forma de la cosa, no su sonido.

***

La parte que sigo dándole vueltas no es el error. Los errores de una línea son cosa de todos los días. Es que lancé una función de accesibilidad que estaba rota para la mitad de mis lectores y no me di cuenta en cinco meses.

No me di cuenta porque nunca escuché en español. Construí la función en inglés, la probé en inglés, y escribí sobre ella en inglés. La versión en español recibió el mismo código y nada de la misma atención. Cada vez que le enseñé el reproductor a alguien, le enseñé el de inglés.

Esa es la forma específica de fallar de un sitio bilingüe hecho por una sola persona: el segundo idioma hereda el código pero no el escrutinio. El error no fue que haya hecho el sitio bilingüe con descuido — traduje cada escrito yo misma, a mano, porque no quería que una máquina hablara por mí. El error fue que traté al lado en español como una *traducción* del lado en inglés, en lugar de como algo propio que puede romperse por su cuenta.

Una función de accesibilidad que solo funciona en uno de tus dos idiomas no es una función de accesibilidad. Es una función de accesibilidad para los lectores en los que ya estabas pensando.

Lo arreglé en una tarde, trabajando junto a Claude — describí el síntoma, encontramos la línea, y el paso de verificación de capturar en vivo la utterance real fue lo que convirtió el "esto se ve bien" en "esto está bien". Esa última parte importó más que el arreglo. Llevaba cinco meses leyendo esa línea del `lang` y viendo lo que esperaba ver.

***

Puedes probarlo. Abre cualquier escrito de este sitio en español y dale play. Si tienes a Paulina, la vas a escuchar, y va a sonar como que de verdad está leyendo español.

Y si todavía suena a GPS, ve y descarga la voz Enhanced. Valen la pena esos cuatro minutos.
