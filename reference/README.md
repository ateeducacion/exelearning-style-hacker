# Reference

Material de referencia / handoff de diseño.

- El handoff original se recibió como un **bundle de Claude Design** con
  `demo.html`, CSS y JS dejados temporalmente en `/tmp/hacker-design/`.
  De ahí salieron los tres pilares estéticos del tema: la lluvia digital
  estilo **Matrix** (canvas a pantalla completa detrás del contenido),
  los bordes neón tipo **Tron** que se dibujan en secuencia en cada
  `.box` y la barra lateral tipo **Fallout PipBoy** (logo `EXE//`, barras
  de estado HP/XP/PRG, pestañas DATA/MAP/INV/STAT y reloj con `● REC`
  parpadeante).
- Paleta principal mapeada a variables CSS del tema:
  - `--hk-bg` negro terminal.
  - `--hk-accent` neón intercambiable — verde (por defecto), ámbar o
    cian — controlado por las clases `body.hk-accent-green`,
    `body.hk-accent-amber` y `body.hk-accent-cyan`.
  - `--hk-accent-dim` versión apagada para rejillas y bordes inactivos.
  - `--hk-ink` texto principal y `--hk-danger` rojo-naranja para el
    indicador `● REC` y avisos de error.
- Tipografía: **JetBrains Mono** para el cuerpo y **VT323** para los
  titulares en modo pixel. Ambas vienen empaquetadas en
  `theme/fonts/` bajo licencia SIL OFL 1.1.
- Efectos opcionales gestionados desde el panel de tweaks (tecla `T`):
  scanlines CRT, flicker, marco curvo (viñeta), intro de arranque tipo
  ROBCO TERMLINK y typewriter por carácter en los iDevice de texto.

Este directorio no se distribuye en el ZIP del estilo.
