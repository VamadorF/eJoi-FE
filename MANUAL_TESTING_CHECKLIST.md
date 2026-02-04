# Checklist de Pruebas Manuales

## Objetivo
Verificar que la aplicación funciona correctamente en diferentes escenarios y dispositivos.

## 1. Web Ancho (>=1400px)

- [ ] ContentContainer centra todo el contenido
- [ ] CTA queda en el centro de la pantalla
- [ ] Nada se estira más allá de 1920px
- [ ] Los chips hacen wrap correctamente y quedan centrados
- [ ] Las cards tienen max-width apropiado

## 2. Móvil Bajo (altura chica, <600px)

- [ ] ReadyHero sigue legible sin solapamientos
- [ ] Scroll funciona correctamente en todas las pantallas
- [ ] Avatar, título y subtítulo no se superponen
- [ ] El contenido no se corta en la parte inferior
- [ ] PrimaryCTA es accesible sin tapar contenido

## 3. Teclado Abierto

- [ ] PrimaryCTA no tapa el TextField cuando el teclado está abierto
- [ ] La vista sube correctamente usando KeyboardAvoidingView
- [ ] El usuario puede ver el campo de entrada mientras escribe
- [ ] El botón "Siguiente" sigue accesible

## 4. iOS Notch (iPhone X y posteriores)

- [ ] WizardHeader no se mete bajo la barra de estado
- [ ] SafeArea aplicado correctamente en todas las pantallas
- [ ] El contenido no se corta en la parte superior
- [ ] Los botones inferiores respetan el área segura inferior

## 5. Paso de Chips con Muchos Intereses

- [ ] Los chips hacen wrap correctamente
- [ ] No se salen fuera de la pantalla
- [ ] El espaciado entre chips es consistente (gapSm)
- [ ] Los chips seleccionados tienen glow visible
- [ ] El scroll funciona si hay muchos chips

## 6. Accesibilidad

- [ ] Todos los botones tienen mínimo 44px de altura (tap target)
- [ ] Los OptionButton con subtitle mantienen 44px mínimo
- [ ] Los labels están asociados correctamente con los inputs
- [ ] El contraste de texto es suficiente (texto blanco sobre fondo degradado)
- [ ] Los elementos interactivos tienen feedback visual (pressed state)

## 7. Transiciones entre Pantallas

- [ ] Fade suave en CreandoCompanion y CompanionReady
- [ ] Slide suave en Onboarding y CreateCompanion
- [ ] No hay "saltos" visuales al cambiar de pantalla
- [ ] Las animaciones son fluidas (60fps)

## 8. Estados y Loading

- [ ] PrimaryCTA muestra loading state correctamente
- [ ] Los botones de login muestran loading cuando corresponda
- [ ] No hay estados "colgados" o indefinidos

## 9. Assets y Overlays

- [ ] Login muestra eJoi_INTERFAZ-11.png con opacidad 0.12
- [ ] Onboarding muestra eJoi_INTERFAZ-12.png con opacidad 0.12
- [ ] CreateCompanion muestra eJoi_INTERFAZ-14.png con opacidad 0.12
- [ ] CreandoCompanion muestra eJoi_INTERFAZ-13.png (imagen animada)
- [ ] CompanionReady muestra eJoi_INTERFAZ-16.png con opacidad 0.12
- [ ] Los overlays no bloquean la interacción
- [ ] Los overlays son sutiles y no compiten con el texto

## 10. Navegación y Flujo

- [ ] El botón "Editar" en CreateCompanion navega al paso correcto
- [ ] El flujo Onboarding → CreateCompanion → CreandoCompanion → CompanionReady funciona
- [ ] El botón "Atrás" funciona correctamente en el wizard
- [ ] El progreso se muestra correctamente en WizardHeader

## 11. Responsive Design

- [ ] En móvil: padding lateral consistente (20px)
- [ ] En web: max-width aplicado correctamente
- [ ] Los componentes se adaptan a diferentes tamaños de pantalla
- [ ] No hay elementos que se salgan de la pantalla

## 12. Tipografía y Espaciado

- [ ] Jerarquía tipográfica consistente (H1/H2/body/caption)
- [ ] No hay fontSize hardcodeado en pantallas
- [ ] El espaciado usa gapSm, gapMd, gapLg consistentemente
- [ ] Entre título y subtítulo: gapSm
- [ ] Entre secciones: gapLg
- [ ] Entre chips/botones: gapSm

