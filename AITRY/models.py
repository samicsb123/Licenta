from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)

    # Metodele necesare pentru Flask-Login
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

def init_app_and_db(app):
    # Configurăm baza de date
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movie_app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inițializăm baza de date cu aplicația
    db.init_app(app)

    # Creăm tabelele în baza de date (nu e necesar dacă folosim migrări SQLAlchemy)
    with app.app_context():
        db.create_all()
