import sqlite3

# Conectează-te la baza de date sau creează-o dacă nu există
conn = sqlite3.connect('movie_app.db')
cursor = conn.cursor()

# Definește schema (sablonul) bazei de date
create_table_query = """
CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL
);
"""

# Execută instrucțiunea SQL pentru a crea tabela
cursor.execute(create_table_query)

# Salvează schimbările și închide conexiunea cu baza de date
conn.commit()
conn.close()

print("Baza de date și tabela au fost create cu succes!")
