# eXeLearning Hacker

Estilo para eXeLearning inspirado en terminales hacker: *Matrix* (lluvia digital en un `<canvas>` de fondo), *Tron* (bordes neón que se dibujan de lado a lado en cada caja) y *Fallout PipBoy* (barra lateral con logo `EXE//`, barras de estado, pestañas DATA/MAP/INV/STAT y reloj con `● REC` parpadeante). Fondo negro, tipografía monoespaciada, acento neón verde / ámbar / cian intercambiable y overlay CRT opcional.

<a href="https://static.exelearning.dev/?url=https://github-proxy.exelearning.dev/?repo=ateeducacion/exelearning-style-hacker&amp;branch=main" target="_blank" rel="noopener">▶ Abrir el ejemplo en eXeLearning</a> · <a href="https://github.com/ateeducacion/exelearning-style-hacker/releases/latest/download/hacker.zip" target="_blank" rel="noopener">↓ Descargar estilo (última release)</a>

Creado por el **Área de Tecnología Educativa** de la Consejería de Educación, Formación Profesional, Actividad Física y Deportes del Gobierno de Canarias.

Licencia del contenido propio del repositorio: [Creative Commons CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/). Esto incluye el estilo Hacker, el ejemplo didáctico y las ilustraciones generadas. Los componentes de terceros mantienen sus licencias propias.

## Estructura

- **`theme/`** — el estilo Hacker (lo que se empaqueta como `hacker.zip` en cada release).
- **Raíz** — ELPX descomprimido con el ejemplo *el ciclo del agua*, previsualizable con cualquier servidor estático (`python3 -m http.server`) y servido en directo por `github-proxy.exelearning.dev` al abrir el enlace de arriba.

## Panel de tweaks

El estilo expone un panel (botón de engranaje de la barra superior, tecla `T`, cierre con `Esc`) con siete ajustes persistentes en `localStorage`:

- **acento** — `verde` (por defecto) · `ámbar` · `cian`.
- **lluvia Matrix** — on/off (canvas detrás del contenido).
- **scanlines CRT** — on/off.
- **flicker** — on/off (parpadeo sutil del brillo).
- **marco curvo** — off/on (viñeta + ligera curvatura CRT).
- **fuente pixel** — VT323 solo en el *chrome*, en todo el cuerpo, o desactivada.
- **typewriter** — on/off (revelado carácter a carácter en el texto; respeta `prefers-reduced-motion`).

Más un botón **"reproducir intro"** que vuelve a mostrar la pantalla de arranque tipo ROBCO TERMLINK.

## Créditos

Tipografías [JetBrains Mono](https://www.jetbrains.com/lp/mono/) y [VT323](https://fonts.google.com/specimen/VT323), ambas bajo SIL Open Font License 1.1. Comunidad de [eXeLearning](https://exelearning.net/), mantenida por el [CEDEC](https://cedec.intef.es/) y las distintas administraciones educativas del Estado.
