Prisma Control Plus

Sistema web de gestión para el Supermercado Prisma, desarrollado en Angular.

Este proyecto permite administrar productos, controlar stock, visualizar estadísticas y realizar el ingreso al sistema mediante un login simple para empleados.

🚀 Funcionalidades principales
🔐 Login de empleados

Acceso con usuario y contraseña.

Permite bloquear las rutas internas si no se inició sesión.

Botón para cerrar sesión.

📦 Gestión de productos

Lista completa de productos del supermercado.

Alta, baja y modificación (según versión del proyecto).

Filtros por nombre y categoría.

Indicadores visuales para stock bajo.

📊 Control de stock

Aumentar o disminuir existencias por producto.

Marcado automático en rojo cuando el stock ≤ 5.

Interfaz moderna con botones +1 / -1.

📈 Estadísticas

Tablero resumen con:

Total de productos distintos

Stock total disponible

Cantidad de productos en stock bajo

Cantidad de categorías

(Opcional) Mini-gráficos o indicadores

🏠 Página de inicio moderna

Acceso rápido a módulos

Tarjetas visuales con descripción de cada sección

Botones estilizados

🛠️ Tecnologías utilizadas
Tecnología	    Uso
Angular 17+   	Framework principal
TypeScript	    Lógica del proyecto
HTML5 / CSS3	  Estructura y estilos
Angular Routing	Navegación por componentes
Git / GitHub	  Control de versiones
VS Code       	Editor de desarrollo

Estructura del proyecto
src/
 ├── app/
 │   ├── core/
 │   │    ├── services/
 │   │    └── models/
 │   ├── features/
 │   │    ├── login/
 │   │    ├── products/
 │   │    ├── checkout/   (control de stock)
 │   │    └── stats/
 │   └── shared/
 │        └── components/header/
 │
 ├── assets/
 └── index.html
 
▶️ Cómo ejecutar el proyecto localmente
1️⃣ Clonar el repositorio
git clone https://github.com/MartinaVivardo/prisma-control-plus.git

2️⃣ Instalar dependencias
npm install

3️⃣ Ejecutar el servidor de desarrollo
ng serve -o

Se abrirá automáticamente en:

http://localhost:4200/

🔐 Credenciales de prueba
Usuario: empleado
Contraseña: 1234
