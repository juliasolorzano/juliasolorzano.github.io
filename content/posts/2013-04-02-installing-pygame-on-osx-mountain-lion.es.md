---
date: 2013-04-02
slug: installing-pygame-on-osx-mountain-lion
title: Instalando PyGame en OSX Mountain Lion
---

Configurar el entorno de desarrollo local es parte del oficio cuando programas. Todos hemos tenido que hacerlo en algún momento de nuestras carreras y compartido los dolores de cabeza que trae.

¿Mi batalla esta semana? Chan chan chaaan... instalar [pygame](http://www.pygame.org/wiki/about) en OSX Mountain Lion.

Sí sí, ya sé. [Acabo de recibir este increíble Raspberry Pi](/blog/2013/03/20/thoughts-after-attending-my-second-pycon/) que ya tiene la distribución Raspian de pygame instalada. Bueno amigos, tengo otros planes para ese pequeño dispositivo por el momento. Así que está reservado para después. Estén atentos...

Empecé investigando cuál era la mejor forma de instalar pygame. Mi suposición inicial fue empezar creando un virtualenv. Mala idea. Después de investigar un poco, encontré que virtualenv puede causar varios problemas al configurar pygame. Así que descarté esa opción y fui por la instalación global.

Esto es lo que deberías tener instalado como prerrequisito para instalar pygame. Puede que ya los tengas, pero quise asegurarme de listarlos por si acaso. También incluí un enlace a las instrucciones de instalación de cada uno:

- [XCode v4.6.1](https://developer.apple.com/xcode/)
- [XQuartz 2.7.4](http://xquartz.macosforge.org/landing/)
- [pip v1.3.1](https://pip.pypa.io/en/stable/installation/)
- [hg v2.5.2](http://mercurial.berkwood.com/)
- [homebrew v0.9.4](https://github.com/mxcl/homebrew/wiki/Installation)

A continuación, necesitarás todas las piezas que hacen funcionar a pygame. Aquí va una explicación rápida de cada una (¡gracias Wikipedia!).

### Simple directmedia layer (sdl)

[http://www.libsdl.org/](http://www.libsdl.org/)

Simple DirectMedia Layer es una biblioteca multimedia multiplataforma, gratuita y de código abierto escrita en C que presenta una interfaz simple a los dispositivos de gráficos, sonido y entrada de varias plataformas. Es un wrapper que soporta toda la funcionalidad principal para crear tu juego. Hay varios subsistemas que también se instalan para soportar la funcionalidad básica:

- sdl_image: soporte para múltiples formatos de imagen
- sdl_mixer: funciones de audio complejas, principalmente para mezcla de sonido
- sdl_ttf: soporte de renderizado de fuentes [TrueType](http://en.wikipedia.org/wiki/TrueType)

### SQL mpeg library (smpeg)

[http://icculus.org/smpeg/](http://icculus.org/smpeg/)

smpeg es una biblioteca de decodificación mpeg. Se conecta con Simple DirectMedia Layer para proporcionar reproducción MP3 multiplataforma para juegos.

### Portmidi

[http://portmedia.sourceforge.net/portmidi/](http://portmedia.sourceforge.net/portmidi/)

PortMidi es una biblioteca para entrada y salida en tiempo real de datos MIDI para ayudar con cualquier música que quieras crear para tu juego.

### Instalación

Primero, necesitarás instalar todo lo de SDL:

```bash
brew install sdl sdl_image sdl_mixer sdl_ttf portmidi
```

Notarás que `smpeg` falta de esta lista. Esto fue un poco más complicado y tuve que hacer algo de tapping para que se instalara correctamente:

```bash
brew tap homebrew/headonly
brew install smpeg --HEAD
```

Como se explica en este comentario de Github, estas opciones jalan la versión más reciente (y posiblemente inestable) de smpeg. No es ideal, pero esto fue lo que terminó funcionando para mí.

Y ahora, ¡pygame! Realmente no me gusta instalar distribuciones pre-empaquetadas y prefiero trabajar con código activo. Así que instalé vía hg para que funcionara correctamente, y usé `sudo` por la configuración de permisos de mis carpetas (¡juro que algún día lo arreglaré!):

```bash
sudo pip install https://github.com/pygame/pygame
```

Ahora, abre un prompt de Python y escribe `import pygame`. ¿Funcionó? Si es así, ¡felicidades! pygame ahora está instalado en tu máquina.
