# Ejecutar html-consulta
## 
start "./src/view/html/consulta.html"
presionando "Go Live" en la barra inferior de Visual Studio Code

# Abrir Panel del Desarrollador Web
Ctrl + Shift + I
- Consola

# Abrir Nodemon para ejecutar Servidor de Node-Express
npm run dev

# Cargar y Guardar en Repositorios Git y GitHub
## 1. Cargar modificaciones de otros colaboradores:
git fetch
git pull
## 2. Guardar todo los archivos modificados:
Ctrl K S
## 3. Guardar en GitHub al escribir en Consola:
git add .
git commit -m "escribir un comentario de lo desarrollado en tu labor"
git push

# Guardar en la Aplicación de GitHub
## 1.- Abrir la Aplicación de GitHub
## 2.- Buscar el repositorio a trabajar: Botón Grande de la parte superior izquierda con una flechita
## 3.- Escribir el Commit en el panel de la parte inferior izquierda.
## 4.- Presionar el botón de "Push" que aparecerá en la parte superior central.

# Instalaciones
## Node
### Comenzar con node para crear un package.json
npm init -y

### Instalar Dependencias del Proyecto:
npm install mysql express morgan
npm install ejs express express-session mysql express-mysql-session morgan bcryptjs passport passport-local express-validator

### Instalar Dependencias de Desarrollo: Para evitar el tener que reiniciar el servidor por cada modificación.
npm install nodemon -D
