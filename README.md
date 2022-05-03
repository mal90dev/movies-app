# MoviesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Development server

Para levantar el servidor lanzar el comando `ng serve` o `npm run start`, esto levantará la aplicación en `http://localhost:4200/`.

También hay que ejecutar el servidor mock que se ha utilizado (json-server), esto se hace mediante el comando `npm run json-server`.


## Build

Para compilar el proyecto hay dos comandos:

* `npm run build` , que compilará la aplicación con la configuración de development.
* `npm run build:prod`, que compilará la aplicación con la configuración de production.

Ambos generan los ficheros dentro del directorio `dist/`

## Running unit tests

Para ejecutar los test unitarios, hay dos comandos:

* `npm run test` que ejecutará los comandos además de abrir una ventana del navegador.

* `npm run test:coverage` que ejecutará los test generando un reporte de cobertura dentro del directorio `coverage`.

## Running end-to-end tests

Los test unitarios también tienen dos comandos:

* `npm run cypress:run` que ejecuta los test y muestra por consola el resultado.

* `npm run cypress:open`, abre una ventana en el navegador, desde la cuál puedes seleccionar el fichero de test que se quiere ejecutar.

Si hay algún problema, dentro del directorio `cypress` se generarán reportes donde ver los errores que se han producido.
