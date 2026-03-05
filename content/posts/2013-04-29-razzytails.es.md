---
date: 2013-04-29
slug: razzytails
title: Razzytails
---

En los últimos meses, mi colega [Caleb](https://twitter.com/CalebSmithNC) y yo habíamos estado desarrollando un juego usando [pygame](http://www.pygame.org/). Trabajamos en él de vez en cuando, resolviendo las mecánicas del juego, escribiendo código, bocetando ideas y creando los assets del juego.

La semana pasada la empresa donde trabajo, [Caktus Consulting Group](http://caktusgroup.com), organizó nuestro segundo [Ship It Day](http://www.caktusgroup.com/blog/2012/10/01/planning-our-first-shipit-day-caktus/). Es un beneficio genial de trabajar ahí y una gran oportunidad para trabajar en proyectos que hemos estado pensando hacer. Caleb y yo decidimos que el siguiente Ship It Day sería un buen tramo de tiempo para trabajar en el juego que habíamos estado desarrollando. Reclutamos a algunos otros colegas de Caktus, [David](https://twitter.com/david_codes) y [Vinod](https://twitter.com/vkurup), para ayudarnos a crear este juego de código abierto.

![Reunión de equipo para discutir mecánicas del juego, funciones y assets](/assets/images/razzytails1.jpg)

El jueves por la tarde nos reunimos y construimos un plan de ataque para el lanzamiento inicial. Ya teníamos las mecánicas diseñadas para la experiencia general del juego, y bastante código, pero aún necesitábamos completar un poco más antes de hacerlo público. ¡Con la ayuda de nuestros compañeros, pudimos hacer nuestro primer release!

El resultado final se llama [Razzytails](https://github.com/calebsmith/razzytails/). El objetivo del juego es ayudar a Razzy, la mascota de Raspberry IO, a recolectar todos los componentes para su Raspberry Pi (Raspberry Pi, tarjeta SD, cable de corriente, monitor, ratón y teclado). Pero hay un detalle... hay honey badgers zombies merodeando para poner a prueba tu conocimiento de Raspberry Pi + Python y evitar que recolectes los objetos. Responde mal la pregunta y pierdes todos los assets de tu inventario. Si ganas, llegas a la pantalla de victoria que te dirige al sitio de Raspberry IO para aprender más sobre el uso de tu Raspberry Pi. Razzytails también funciona de maravilla en un Raspberry Pi, que ya viene con pygame instalado.

![Razzytails en un Raspberry Pi](/assets/images/razzytails2.jpg)

Otro de los objetivos que teníamos para el juego era crear una posible herramienta educativa para usar Raspberry Pi con pygame. Aquí hay algunas ideas que se nos ocurrieron para usarlo con fines educativos:

- editar los archivos JSON como [questions.json](https://github.com/calebsmith/razzytails/blob/master/assets/config/questions.json) como una forma de poner a prueba el conocimiento de Python/Raspberry Pi
- involucrar a nuevos programadores en las mecánicas de pygame modificando el código y haciendo ediciones

Definitivamente hay más formas en las que vemos a la comunidad utilizando este juego y convirtiéndolo en algo útil para propósitos educativos.

Para cerrar, tengo que decir que desarrollar mi primer juego fue algo que realmente, ¡realmente disfruté! Fue genial inventar los diseños de personajes, colaborar en la historia con mis compañeros de equipo y hacer que Razzytails funcionara en mi Raspberry Pi. Espero tener más oportunidades como esta y crear más juegos divertidos y educativos.

![Julia trabajando en Razzytails](/assets/images/razzytails3.jpg)

*Todas las fotos cortesía de Caktus Consulting Group*
