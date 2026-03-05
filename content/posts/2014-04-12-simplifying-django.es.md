---
date: 2014-04-12
slug: simplifying-django
title: Simplificando Django
---

**La publicación original está en el blog de O'Reilly Radar: [http://radar.oreilly.com/2014/04/simplifying-django.html](http://radar.oreilly.com/2014/04/simplifying-django.html)**

A pesar de la popularidad y madurez de Django, algunos desarrolladores creen que es un framework web anticuado hecho principalmente para aplicaciones "ricas en contenido". Ya que la mayoría de las aplicaciones web y servicios modernos tienden a no ser ricos en contenido, esta reputación hace que Django parezca una opción menos que óptima como framework web.

Tomemos un momento para ver Django desde la base y entender mejor dónde se encuentra el framework en las prácticas actuales de desarrollo web.

### Django simple y sencillo

El propósito principal de un framework web es ayudar a generar la arquitectura central de una aplicación y reutilizarla en otros proyectos. Django fue construido sobre esta base para crear rápidamente aplicaciones web. En su núcleo, Django es principalmente un framework de aplicaciones Web Server Gateway Interface (WSGI) que proporciona utilidades de solicitud HTTP para extraer y devolver respuestas HTTP significativas.

También, cuando se trata de construir esas respuestas, Django proporciona un motor de plantillas dinámico. De fábrica, te ofrece una larga lista de filtros y tags para crear plantillas dinámicas y extensibles.

### Incorporando nuevos usuarios de Django

Un problema más grande que la comunidad de Django continúa enfrentando es el proceso de incorporación de nuevos usuarios. Actualmente, hay un total de seis partes para completar el tutorial de la app de encuestas. No es hasta la [parte tres](https://docs.djangoproject.com/en/dev/intro/tutorial03/) que finalmente escribes tu primera vista pública. Esto está lejos del tutorial más simple de "Hello World" que verás en las portadas de micro-frameworks populares de Python (por ejemplo, Flask o Bottle).

Para mostrar lo que queremos decir, construyamos un ejemplo de cómo podría verse un tutorial de Django más simplificado:

```python
import sys

from django.conf import settings
from django.conf.urls import patterns
from django.http import HttpResponse
from django.core.management import execute_from_command_line

settings.configure(
    DEBUG=True,
    SECRET_KEY='placerandomsecretkeyhere',
    ROOT_URLCONF=sys.modules[__name__],
)

def index(request):
    return HttpResponse('Powered by Django')

urlpatterns = patterns('',
    (r'^$', index),
)

if __name__ == "__main__":
    execute_from_command_line(sys.argv)
```

¿Simple, verdad? Este pequeño fragmento de código es todo lo que necesitas para ejecutar un proyecto Django. Desglosemos cada componente.

Primero, necesitaremos incluir la utilidad de respuesta HTTP de Django y devolver los valores que queremos en esa respuesta:

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse('Powered by Django')
```

La siguiente porción es la estructura de urls:

```python
from django.conf.urls import patterns
from django.http import HttpResponse

def index(request):
    return HttpResponse('Powered by Django')

urlpatterns = patterns('',
    (r'^$', index),
)
```

¡Con solo siete líneas de código ya hemos creado lo básico para ejecutar una aplicación en Django! Ahora implementaremos los ajustes básicos:

```python
import sys

from django.conf import settings
from django.conf.urls import patterns
from django.http import HttpResponse

settings.configure(
    DEBUG=True,
    SECRET_KEY='placerandomsecretkeyhere',
    ROOT_URLCONF=sys.modules[__name__],
)

def index(request):
    return HttpResponse('Powered by Django')

urlpatterns = patterns('',
    (r'^$', index),
)
```

Notarás que hemos simplificado los ajustes y excluido específicamente la configuración de base de datos. Ya que no estamos generando esta estructura usando el comando <code>startproject</code>, necesitamos agregar las partes relevantes de <code>manage.py</code>:

```python
import sys

from django.conf import settings
from django.conf.urls import patterns
from django.http import HttpResponse
from django.core.management import execute_from_command_line

settings.configure(
    DEBUG=True,
    SECRET_KEY='placerandomsecretkeyhere',
    ROOT_URLCONF=sys.modules[__name__],
)

def index(request):
    return HttpResponse('Powered by Django')

urlpatterns = patterns('',
    (r'^$', index),
)

if __name__ == "__main__":
    execute_from_command_line(sys.argv)
```

Ahora deberías poder ir a tu línea de comandos para iniciar tu aplicación:

```bash
python project_name.py runserver
```

¡Cuando navegues a tu localhost en 127.0.0.1:8000, obtendrás "Powered by Django" en la ventana!

![Ventana del navegador mostrando Powered by Django](/assets/images/simplifying_django_fig_1.png)

Como puedes ver, al descomponer los básicos de crear una aplicación Django en partes más pequeñas, podemos crear una forma más fácil de incorporar nuevos usuarios. Necesitamos reaprender cómo enseñar Django construyendo aplicaciones Django sin el ORM y sin el admin de Django. Estas partes de Django necesitan ser vistas por lo que realmente son: funciones integradas. No son necesarias para usar el framework. Empecemos con las piezas de Django, como aprenderías la biblioteca estándar de Python, por las partes buenas y sin sentir el peso.

Entonces, ¿qué aplicaciones estás considerando construir de esta manera ligera?
