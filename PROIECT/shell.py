from flask import Flask
from models import init_app_and_db, User, Movie, db

app = Flask(__name__)

# Configurăm baza de date
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movie_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

init_app_and_db(app)

def print_users():
    users = User.query.all()
    for user in users:
        print(f"ID: {user.id}, Email: {user.email}, Name: {user.name} ")
#adauga " Password Hash: {user.password} "  Pentru a vedea parolele criptate.

def print_movies():
    movies = Movie.query.all()
    for movie in movies:
        print(f"ID: {movie.id}, Title: {movie.title}, Description: {movie.description}, User ID: {movie.user_id}, Type: {movie.type}")

if __name__ == '__main__':
    with app.app_context():
        print("Users:")
        print_users()
        print("\nMovies:")
        print_movies()
