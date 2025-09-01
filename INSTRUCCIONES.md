# Instrucciones de Prueba - Tienda MiMascota

## ¿Qué se ha corregido?

### ✅ Problemas solucionados:

1. **Página principal**: Ahora `index.html` es una tienda de productos para mascotas, no un formulario de registro
2. **Registro con RUT**: Se creó `registro.html` que permite registrar tanto personas como mascotas con RUT obligatorio
3. **Validación de RUT**: El sistema valida automáticamente que el RUT chileno sea correcto
4. **Sistema simple**: Código fácil de entender para principiantes

### 🌟 Nuevas funcionalidades:

- **Tienda principal**: Muestra productos para mascotas
- **Registro completo**: Incluye datos del propietario (con RUT obligatorio) y su mascota
- **Validación automática**: El RUT se formatea y valida en tiempo real
- **Visualización de registros**: Página para ver todos los registros guardados
- **Persistencia**: Los datos se guardan en el navegador (localStorage)

## 🧪 Cómo probar:

1. **Abrir la tienda**: Ve a `index.html` - verás la tienda con productos
2. **Registrar cliente**: Ve a "Registrarse" para registrar una persona y su mascota
3. **Probar RUT**: Ingresa un RUT válido como `12345678-5` o `11111111-1`
4. **Ver registros**: Ve a "Ver Registros" para ver todos los datos guardados
5. **Login**: El sistema de login sigue funcionando como antes

## 📝 Datos de prueba:

**RUTs válidos para probar:**
- 12345678-5
- 11111111-1  
- 22222222-2
- 33333333-3

**Ejemplo de registro:**
- RUT: 12345678-5
- Nombre: Juan Pérez
- Teléfono: +56912345678
- Mascota: Firulais (Perro)

## 🛠️ Archivos modificados:

- `index.html` - Nueva página principal de la tienda
- `registro.html` - Nuevo formulario de registro con RUT
- `main.js` - Lógica actualizada con validación de RUT
- `login.html` - Header actualizado
- `ver-registros.html` - Nueva página para ver registros

¡Ahora tu proyecto es una verdadera tienda de mascotas con sistema de registro! 🐾
