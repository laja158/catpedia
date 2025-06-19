# 🐱 Catpedia App – Prueba Técnica Ionic Angular

Aplicación móvil desarrollada en **Ionic + Angular** como parte de una prueba técnica. La app consume datos de la API pública [TheCatAPI](https://thecatapi.com/) para mostrar información detallada sobre distintas razas de gatos.

---

## 📲 Características principales

- ✅ Listado de razas de gatos con imágenes, origen e inteligencia
- 🔍 Búsqueda por nombre en tiempo real
- 🧩 Componentes reutilizables (`CatCardComponent`)
- 🧭 Navegación con Lazy Loading (`/breeds`, `/breed-detail/:id`)
- 📦 Consumo de API externa con autenticación (`x-api-key`)
- 🔐 Separación por módulos (`core`, `shared`, `pages`)
- 🎯 Aplicación de principios **SOLID**, especialmente SRP e inyección de dependencias
- 🧪 Preparada para extensiones como favoritos, filtros avanzados o cache

## ✅ Test Coverage Report

Se implementaron pruebas unitarias en los servicios y componentes principales, utilizando buenas prácticas con `TestBed`, `HttpClientTestingModule`, y cobertura de flujos condicionales y navegación. La cobertura alcanzada es:

| Métrica       | Cobertura |
|---------------|-----------|
| Statements    | 94.87 %   |
| Branches      | 85.71 %   |
| Functions     | 90.9 %    |
| Lines         | 94.73 %   |

### 🧪 Componentes y servicios cubiertos

- `CatService`: 100 %
- `BreedDetailPage`: 83.33 %
- `CatCardComponent`: 100 %
- `SplashScreenComponent`: 100 %
- `AppComponent`: 100 %

Se validaron:
- Flujo de carga de razas e imágenes desde la API.
- Visualización de datos con y sin imagen.
- Navegación hacia detalle desde tarjetas.
- Comportamiento del componente de splash screen.
- Estados condicionales y suscriptores en el ciclo de vida.

# CatPedia

[![Angular](https://img.shields.io/badge/Angular-17+-red?logo=angular)](https://angular.io/)
[![Ionic](https://img.shields.io/badge/Ionic-7-blue?logo=ionic)](https://ionicframework.com/)
[![Coverage](https://img.shields.io/badge/Test%20Coverage-94%25-brightgreen)]()

Aplicación móvil desarrollada en Ionic + Angular que permite explorar y conocer razas de gatos a través de la API pública de [TheCatAPI](https://thecatapi.com).

## 🛠 Tecnologías utilizadas

| Herramienta            | Versión  |
|------------------------|----------|
| Angular                | 17+      |
| Ionic                  | 7+       |
| Jasmine + Karma        | Default  |
| HttpClientTestingModule| ✓        |
| Capacitor              | 5+       |
| TheCatAPI              | REST     |