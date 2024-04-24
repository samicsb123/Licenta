from flask import Flask, render_template, request, redirect, url_for, flash, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'Drivqsy12'

# Funcție pentru verificarea credențialelor de logare
def check_login(email, password):
    conn = sqlite3.connect('movie_app.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM accounts WHERE email=? AND password=?', (email, password))
    account = cursor.fetchone()
    conn.close()
    return account

# Funcție pentru adăugarea unui nou cont în baza de date
def create_account(email, name, password):
    conn = sqlite3.connect('movie_app.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO accounts (email, name, password) VALUES (?, ?, ?)', (email, name, password))
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    account = check_login(email, password)
    if account:
        # Setăm o sesiune pentru a ține minte că utilizatorul este autentificat
        session['logged_in'] = True
        return redirect(url_for('home'))
    else:
        flash('Logare eșuată! Verificați email-ul și parola și încercați din nou.', 'error')
        return redirect(url_for('login'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        name = request.form['name']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        if password == confirm_password:
            # Verificăm dacă email-ul este deja înregistrat
            conn = sqlite3.connect('movie_app.db')
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM accounts WHERE email=?', (email,))
            existing_account = cursor.fetchone()
            conn.close()
            if existing_account:
                flash('Acest email este deja înregistrat! Utilizați un alt email.', 'error')
                return redirect(url_for('signup'))
            else:
                # Adăugăm contul în baza de date
                create_account(email, name, password)
                flash('Contul a fost creat cu succes! Vă puteți autentifica acum.', 'success')
                return redirect(url_for('login'))
        else:
            flash('Parolele nu se potrivesc! Încercați din nou.', 'error')
            return redirect(url_for('signup'))
    return render_template('signup.html')

@app.route('/home')
def home():
    if 'logged_in' in session:
        return render_template('home.html')
    else:
        flash('Trebuie să fiți autentificat pentru a accesa această pagină.', 'error')
        return redirect(url_for('login.html'))

if __name__ == '__main__':
    app.run(debug=True)
