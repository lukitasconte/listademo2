BUGS:

1. Al momento de registrarnos, y guardar nuestro nuevo usuario, con contraseña, no se almacena, y cuando intentamos loguear, podemos poner cualquier usuario y contraseña que va a entrar, debe ser por algún error de db.

2. Al poner el título y descripción a una nueva tarea, y querer guardarla con la tecla “Enter” se redirecciona a la pantalla de inicio y borra todas las tareas previamente guardadas, pareciera iniciar de cero.

3. Los nombres de los integrantes se superponen en el cuadro de agregar tarea, lo solucionamos sacando los nombres en esa pantalla y los dejamos solo en las pantallas de logueo, que pensamos quedaba bien también…

4. Cuando se guardan 8 Tareas o mas se superponen por encima del reloj.

5. Estando en el idioma “Inglés”: Al tocar el lápiz para editar una tarea, el botón de “Save Task” se pone escrito en español: “Guardar Tarea”, solo ese botón, los demás quedan bien traducidos.

6. Cuando cambiamos a idioma “Inglés” se cambia todo menos la fecha.

7. ERROR de VENV, Entorno Virtual (que le pasaba a la compañera Luana):
   
  * Borrar carpeta del entorno virtual (venv), y crearla de 0
  * En cmd escribir cd ruta/al/directorio/de/tu/proyecto
    python -m venv venv
  * Activarlo: .\venv\Scripts\activate
  * Por ultimo, instalar Flask y Flask SQLAlchemy:
    pip install flask
    pip install flask-sqlalchemy
  * Y ejecutar: app.py o python app.py
  * Desactivar: deactivate

