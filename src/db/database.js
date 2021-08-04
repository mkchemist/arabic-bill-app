let db =  window.db('./app.db')

db.exec(`CREATE TABLE IF NOT EXISTS clients(
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    phone INTEGER,
    address TEXT,
    PRIMARY KEY ("id" AUTOINCREMENT)

)`);

db.exec(`CREATE TABLE IF NOT EXISTS products(
  id INTEGER NOT NULL,
  name TEXT,
  PRIMARY KEY ("id" AUTOINCREMENT)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS bills(
    id INTEGER NOT NULL,
    product_id BIGINT NOT NULL,
    client_id BIGINT NOT NULL,
    serial TEXT,
    patch_no TEXT,
    bill_date DATE NOT NULL,
    quantity INTEGER NOT NULL,
    bounce INTEGER ,
    comment TEXT,
    PRIMARY KEY ("id" AUTOINCREMENT),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)`);

export default db;