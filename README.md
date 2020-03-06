# CarServiceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Car Service

Para mostrar la lista de carros disponibles se consumen dos APIs: https://thawing-chamber-47973.herokuapp.com/cars y https://thawing-chamber-47973.herokuapp.com/cool-cars. 

Para realizar el CRUD de los carros se tienen los siguientes métodos en este servicio:

- getAll(): Llama a la API cars y trae todos los registros.
- get(id: string): Llama a la API cool-cars y trae el registro que corresponda al id buscado.
- dissasociateCars(cars: any[]): Guarda un arreglo de carros que se asocian a un Dni específico.
- save(car: any): Guarda el objeto car en el servicio cars.
- remove(href: string): Busca el car con el href indicado y lo borra del servicio cars.

## Owner Service

Este servicio consume la API https://thawing-chamber-47973.herokuapp.com/owners que trae un método de búsqueda por Dni para consumir. Los métodos del servicio:

- getAll(): Llama a la API owners y trae todos los registros.
- get(dni: string): Llama al método findByDni de la API y trae el registro que corresponda al Dni buscado.
- save(owner: any): Guarda el objeto owner en el servicio owners.
- remove(href: string): Busca el owner con el href indicado y lo borra del servicio owners.

## Car Component

Se compone por:

- car-edit: Componente encargado de editar, crear o eliminar carros.
- car-list:Componente encargado de listar todos los carros registrados en el servicio car, permite dirigirse a la pantalla para editar o crear carros.

## Owner Component

Se compone por:

- owner-edit: Componente encargado de editar, crear o eliminar owners.
- owner-list:Componente encargado de listar todos los owners registrados en el servicio car, permite dirigirse a la pantalla para editar o crear owners.
- owner-delete: Componente encargado de listar los owners existentes y un checklist para eliminar uno o más owners y sus ownerDni de los carros.

## Material Component

Componente que importa angular materials al proyecto.
