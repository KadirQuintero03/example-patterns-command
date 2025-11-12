# Implementación del Patrón de Comportamiento Command en un Sistema Web de Procesamiento de Pagos

Aplicación web que simula un flujo básico de pagos con tarjeta, transferencia bancaria y criptomonedas, diseñada para demostrar un uso óptimo del patrón de comportamiento Command.

## Contexto de la problematica 

Una empresa financiera desea desarrollar una plataforma educativa interactiva que permita a nuevos programadores comprender cómo funcionan los flujos de pago dentro de un entorno web. El objetivo es construir una **miniaplicación que pueda procesar diferentes métodos de pago**, mostrar visualmente el flujo interno de ejecución y permitir al usuario experimentar con escenarios simulados en tiempo real.


**Durante el desarrollo inicial se identificó un problema fundamental:**
la lógica encargada de procesar cada tipo de pago estaba **fuertemente acoplada a los componentes de la interfaz**. 


### Esto provocaba que:
- Cada método de pago exigiera condicionales repetidos.
- Cualquier cambio en la lógica obligara a modificar la UI. 
- Agregar un nuevo método de pago fuera complejo y arriesgado.
- No existiera una estructura clara para representar el flujo de ejecución interno.

### Funcionalidades esperadas del sistema
La aplicación debe permitir al usuario:

- Seleccionar un método de pago: tarjeta, transferencia o criptomonedas.
- Ejecutar un pago por un monto definido.
- Visualizar la animación correspondiente al método.
- Ver el flujo interno del patrón Command:
- Registrar un historial de pagos

Manteniendo que todo el flujo sea modular, extensible y sin acoplamiento innecesario.
