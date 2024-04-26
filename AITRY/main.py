from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import sqlite3

app = Flask(__name__)
app.secret_key = 'Drivqsy12'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"



class User(UserMixin):
    def __init__(self, id):
        self.id = id

    @staticmethod
    def get(user_id):
        # Implementarea acestei funcții depinde de cum sunt gestionați utilizatorii în baza de date sau în sistemul tău
        pass

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

# Funcție pentru verificarea credențialelor de logare
def check_login(email, password):
    conn = sqlite3.connect('movie_app.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM accounts WHERE email=? AND password=?', (email, password))
    account = cursor.fetchall()
    conn.close()
    return account


# Funcție pentru adăugarea unui nou cont în baza de date

def create_account(email, name, password):
    conn = sqlite3.connect('movie_app.db')  # Conectează-te la baza de date
    cursor = conn.cursor()

    # Definește instrucțiunea SQL pentru inserarea unui nou cont în tabelul 'accounts'
    insert_query = "INSERT INTO accounts (email, name, password) VALUES (?, ?, ?)"
    user_data = (email, name, password)

    try:
        # Execută instrucțiunea SQL pentru a insera datele noului cont în tabel
        cursor.execute(insert_query, user_data)
        conn.commit()  # Salvează modificările în baza de date
        print("Contul a fost creat cu succes!")
    except sqlite3.Error as e:
        print("Eroare la crearea contului:", e)
    finally:
        conn.close()  # Închide conexiunea cu baza de date

# Exemplu de utilizare a funcției create_account
create_account('example@example.com', 'John Doe', 'password123')


@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user_id = check_login(email, password)
        if user_id:
            # Marchează utilizatorul ca autentificat
            login_user(User(user_id))
            # Setează o sesiune pentru a ține minte că utilizatorul este autentificat
            session['logged_in'] = True
            return redirect(url_for('home'))  # Redirecționează utilizatorul către pagina de home
        else:
            flash('Logare eșuată! Verificați email-ul și parola și încercați din nou.', 'error')
            return render_template('login.html', error_message='Logare eșuată! Verificați email-ul și parola și încercați din nou.')
    else:
        if 'logged_in' in session:  # Verifică dacă utilizatorul este deja autentificat
            return redirect(url_for('home'))  # Dacă da, îl redirecționează către pagina home
        else:
            return render_template('login.html')  # Altfel, afișează pagina de login

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        name = request.form.get('name')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        # Verificăm dacă parolele se potrivesc
        if password != confirm_password:
            flash('Parolele nu se potrivesc! Încercați din nou.', 'error')
            return render_template('signup.html', error_message='Parolele nu se potrivesc! Încercați din nou.')

        # Verificăm dacă email-ul este deja înregistrat
        conn = sqlite3.connect('movie_app.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM accounts WHERE email=?', (email,))
        existing_account = cursor.fetchone()
        conn.close()
        if existing_account:
            flash('Acest email este deja înregistrat! Utilizați un alt email.', 'error')
            return render_template('signup.html', error_message='Acest email este deja înregistrat! Utilizați un alt email.')

        # Adăugăm contul în baza de date
        create_account(email, name, password)
        flash('Contul a fost creat cu succes! Vă puteți autentifica acum.', 'success')
        return redirect(url_for('index'))

    return render_template('signup.html')

@app.route('/home')
# @login_required
def home():
    return render_template('home.html')

@app.route('/logout')
@login_required
def logout():
    session.pop('logged_in', None)
    logout_user()  # Deconectează utilizatorul din Flask-Login
    flash('You were successfully logged out!', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
