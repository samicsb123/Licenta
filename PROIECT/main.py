from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import init_app_and_db, User, Movie, db
from flask_bcrypt import Bcrypt

app = Flask(__name__)

app.secret_key = 'Drivqsy12'

bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

init_app_and_db(app)


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, user_id)


def check_login(email, password):
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return user


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
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(email=email, name=name, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        flash('Contul a fost creat cu succes! Vă puteți autentifica acum.', 'success')
        return redirect(url_for('index'))

    return render_template('signup.html')


@app.route('/home')
@login_required
def home():
    return render_template('home.html', name=current_user.name)


@app.route('/logout', methods=['GET','POST'])
@login_required
def logout():
    session.pop('logged_in', None)
    logout_user()
    flash('You were successfully logged out!', 'success')
    return redirect(url_for('index'))


@app.route('/series', methods=['GET','POST'])
@login_required
def series():
    session.pop('logged_in', None)
    return render_template('series.html')


@app.route('/movies', methods=['GET','POST'])
@login_required
def movies():
    session.pop('logged_in', None)
    return render_template('movies.html')


@app.route('/watchlist', methods=['GET'])
@login_required
def watchlist():
    watchlist_movies = Movie.query.filter_by(user_id=current_user.id).all()
    return render_template('watchlist.html', movies=watchlist_movies)


@app.route('/toggle_watchlist', methods=['POST'])
@login_required
def toggle_watchlist():
    data = request.get_json()
    print(data)  # Pentru debug, vezi ce date primești
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    movie_id = data.get('movieId')
    movie_title = data.get('title')
    movie_poster = data.get('poster_path')

    if not movie_id or not movie_title:
        return jsonify({'error': 'Invalid movie data'}), 400

    movie = Movie.query.filter_by(id=movie_id, user_id=current_user.id).first()

    if movie:
        db.session.delete(movie)
        db.session.commit()
        return jsonify({'message': 'Removed from watchlist'}), 200
    else:
        new_movie = Movie(
            id=movie_id,
            title=movie_title,
            poster_path=movie_poster,
            user_id=current_user.id
        )
        db.session.add(new_movie)
        db.session.commit()
        return jsonify({'message': 'Added to watchlist'}), 200
    

@app.route('/get_watchlist', methods=['GET'])
@login_required
def get_watchlist():
    watchlist_movies = Movie.query.filter_by(user_id=current_user.id).all()
    watchlist_ids = [movie.id for movie in watchlist_movies]
    return jsonify(watchlist_ids)
if __name__ == '__main__':
    app.run(debug=True)