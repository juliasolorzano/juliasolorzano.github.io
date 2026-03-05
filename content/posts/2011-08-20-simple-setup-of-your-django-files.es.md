---
date: 2011-08-20
slug: simple-setup-of-your-django-files
title: Una configuración sencilla de los archivos de tu proyecto Django
---

Me gusta la organización. Mantener las cosas limpias, simples y fáciles de encontrar hace que el flujo de trabajo sea fluido y ayuda a mantener a todos sincronizados cuando trabajas en equipo.

Constantemente estoy trabajando en mejorar la forma en que configuro la estructura de archivos de mis proyectos. Así es como trato de mantener las cosas limpias:

```text
myproject/
  apps/
    django-showcase/
  dev/
    __init__.py
    admin.py
    manage.py
    settings.py
  assets/
   images/
   stylesheets/
   scripts/
  templates/
  urls.py
```

Primero, está la carpeta de nivel superior con el nombre de tu proyecto Django. A esta la estoy llamando `myproject`.

Luego está tu carpeta de apps. Aquí es donde guardarás tus diversas aplicaciones de Django que ayudan a que tu sitio funcione. Por ejemplo, incluí mi aplicación `django-showcase` dentro de esta carpeta, ya que la uso en mi sitio. Además, no olvides agregar tus aplicaciones en tu archivo `settings.py` bajo la lista `INSTALLED_APPLICATIONS`.

Ahora, pasando a la parte más importante de mi organización: la carpeta dev. Aquí es donde se encuentran todos mis archivos de desarrollo, de ahí el nombre dev. Dentro verás el mágicamente importante `__init__.py` y otros archivos que ayudan a que las otras partes mágicas de Django funcionen. Hago esto para no tener archivos sueltos flotando por mi proyecto. Para que esto funcione correctamente, necesitarás asegurarte de configurar tu `DJANGO_SETTINGS_MODULE` apuntando a esta carpeta.

`assets` es la carpeta donde se almacenan todos mis archivos multimedia. Así que todas mis hojas de estilo del front-end, imágenes y scripts van aquí. Necesitarás configurar la ruta a esta carpeta en tu archivo `settings.py` bajo `assets_ROOT`.

La carpeta `templates` es donde vivirán todas las plantillas personalizadas de tu sitio. También necesitarás definir dónde está esto en tu `settings.py` bajo `TEMPLATES_DIRS`.

Y finalmente, mi archivo de configuración `urls.py`. Lo coloco fuera de la carpeta dev principalmente porque podría causar problemas si hay urls específicas vinculadas a varias aplicaciones en mi carpeta de apps. Muchas aplicaciones reutilizables tienen sus propios archivos de configuración de urls dentro de ellas. Al hacer de `urls.py` un archivo de nivel superior, puede acceder a esas otras urls y convertirse en el "centro" principal para la estructura de urls de tu sitio. Necesitarás configurar la ruta de tu `ROOT_URLCONF` para que apunte aquí.

Esta es una forma súper sencilla de organizar tus archivos usando Django. En general, lo más importante es que uses un método que sea más fácil para ti y/o tu equipo para ser lo más eficientes posible en tu producción.

Para aprender más sobre las diversas opciones del `settings.py` de Django, revisa la documentación en:
[https://docs.djangoproject.com/en/dev/topics/settings/](https://docs.djangoproject.com/en/dev/topics/settings/)
