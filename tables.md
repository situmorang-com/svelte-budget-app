sqlite> .schema
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE purchased_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER DEFAULT 1,
    date TEXT NOT NULL
);
CREATE TABLE budget (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    amount REAL NOT NULL
);