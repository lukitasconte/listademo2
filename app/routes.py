from flask import Blueprint, render_template, request, redirect, url_for

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        # Lógica de autenticación aquí
        # Si la autenticación es exitosa, redirigir a una nueva página en blanco
        return redirect(url_for('main.blank_page'))  
    return render_template('login.html')


@main.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm-password')
        # Lógica para manejar el registro de usuario aquí
        return redirect(url_for('main.index'))  # Redirige a la página principal después del registro
    return render_template('register.html')


@main.route('/blank_page')
def blank_page():
    return render_template('blank.html')

