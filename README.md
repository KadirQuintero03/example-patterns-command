🎯 Editor de Texto Educativo - Implementación con Patrón Command
📋 Tabla de Contenidos
Descripción del Proyecto

Problema Identificado

Solución Implementada

Arquitectura del Sistema

Funcionalidades

Instalación y Uso

Estructura del Proyecto

Beneficios Obtenidos

Extensión del Sistema


Contexto General -> 
Una empresa de software educativo está desarrollando una herramienta de escritura ligera para estudiantes y docentes. El objetivo es crear un editor de texto simple, basado en web, que permita realizar operaciones comunes de edición sin acoplar la interfaz gráfica a la lógica de manipulación del texto. El equipo desea que la aplicación sea fácilmente extensible, que permita agregar nuevas operaciones sin modificar la interfaz existente, y que soporte funcionalidades como deshacer y rehacer.


Durante la fase inicial del proyecto, los desarrolladores descubrieron que la interfaz estaba directamente llamando métodos que modificaban el texto del editor. Esto producía un fuerte acoplamiento entre la UI y la lógica interna, dificultando agregar nuevas operaciones o extender las existentes. Además, no existía una forma clara de implementar un historial de acciones para soportar deshacer y rehacer.


Para resolverlo, se solicita implementar la funcionalidad siguiendo el patrón de comportamiento Command, encapsulando cada operación de edición en un comando independiente.


Problema a Resolver -> 
El editor debe permitir al usuario realizar las siguientes acciones:
Insertar texto en la posición actual o reemplazando la selección.
Borrar el texto seleccionado.
Convertir la selección a mayúsculas o minúsculas.
Rodear la selección con caracteres (por ejemplo, ** para negrita o * para itálica).
Reemplazar todas las coincidencias de un patrón en el documento.
Deshacer y rehacer acciones ilimitadamente.


El problema actual -> la UI y la lógica de edición están fuertemente acopladas. Cada botón ejecuta directamente una operación del editor, lo que dificulta:
Extender el sistema.
Agregar nuevas operaciones.
Reutilizar acciones.
Implementar correctamente deshacer y rehacer.
Solución Esperada


Aplicar el patrón Command, donde:
Las operaciones del editor se representen como objetos comando independientes.
El editor de texto actúe como Receiver, con métodos que realizan las modificaciones reales sobre el documento.
La UI actúe como Client, creando comandos cuando se presionan botones.
Un Invoker (CommandManager) se encargue de ejecutar comandos y manejar las pilas de deshacer/rehacer.
El resultado debe ser un sistema desacoplado, donde agregar una nueva acción solo requiera crear un nuevo comando, sin modificar UI ni el Invoker.
