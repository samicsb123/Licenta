from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_login import LoginManager, login_user, logout_user, login_required
from models import init_app_and_db, User, db

app = Flask(__name__)
app.secret_key = 'Drivqsy12'

# Inițializăm Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

# Inițializăm aplicația și baza de date
init_app_and_db(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

def check_login(email, password):
    user = User.query.filter_by(email=email, password=password).first()
    return user


# Rutele
@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = check_login(email, password)
        if user:
            login_user(user)
            session['logged_in'] = True
            return redirect(url_for('home'))
        else:
            flash('Logare eșuată! Verificați email-ul și parola și încercați din nou.', 'error')
            return render_template('login.html', error_message='Logare eșuată! Verificați email-ul și parola și încercați din nou.')
    else:
        if 'logged_in' in session:
            return redirect(url_for('home'))
        else:
            return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        name = request.form.get('name')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        if password != confirm_password:
            flash('Parolele nu se potrivesc! Încercați din nou.', 'error')
            return render_template('signup.html', error_message='Parolele nu se potrivesc! Încercați din nou.')

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Acest email este deja înregistrat! Utilizați un alt email.', 'error')
            return render_template('signup.html', error_message='Acest email este deja înregistrat! Utilizați un alt email.')

        new_user = User(email=email, name=name, password=password)
        db.session.add(new_user)
        db.session.commit()
        flash('Contul a fost creat cu succes! Vă puteți autentifica acum.', 'success')
        return redirect(url_for('index'))

    return render_template('signup.html')

@app.route('/home')
@login_required
# FA AICI POST METHOD ( cred ca asta e problema ca ma lasa sa accesez pag fara cont)
def home():
    return render_template('home.html')

@app.route('/logout', methods=['GET','POST'])
@login_required
def logout():
    session.pop('logged_in', None)
    logout_user()
    flash('You were successfully logged out!', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
