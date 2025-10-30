import Database from "better-sqlite3"
import path from "path"
import crypto from "crypto"

const dbPath = path.join(process.cwd(), "data", "plumbing.db")

// Create database connection
const db = new Database(dbPath)

// Enable foreign keys
db.pragma("foreign_keys = ON")

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id)
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

// Insert sample services
const services = [
  {
    name: "Quvur ta'mirlash",
    description: "Buzilgan quvurlarni tez va sifatli ta'mirlash",
    price: 50000,
    image_url: "/pipe-repair-plumbing.jpg",
    category: "ta'mirlash",
  },
  {
    name: "Quvur o'rnatish",
    description: "Yangi quvur tizimini professional o'rnatish",
    price: 150000,
    image_url: "/pipe-installation.png",
    category: "o'rnatish",
  },
  {
    name: "Suv tozalash",
    description: "Suv tizimini tozalash va dezinfeksiya",
    price: 75000,
    image_url: "/water-cleaning.jpg",
    category: "tozalash",
  },
  {
    name: "Kanalizatsiya ta'mirlash",
    description: "Kanalizatsiya tizimini ta'mirlash va tozalash",
    price: 100000,
    image_url: "/sewage-system-repair.jpg",
    category: "ta'mirlash",
  },
  {
    name: "Radiator o'rnatish",
    description: "Isitish radiatorini o'rnatish va ulanish",
    price: 120000,
    image_url: "/radiator-installation.jpg",
    category: "o'rnatish",
  },
  {
    name: "Suv boylari ta'mirlash",
    description: "Suv boylari va tanklarni ta'mirlash",
    price: 80000,
    image_url: "/water-tank-repair.jpg",
    category: "ta'mirlash",
  },
  {
    name: "Drenaj tizimi",
    description: "Drenaj tizimini o'rnatish va ta'mirlash",
    price: 130000,
    image_url: "/drainage-system.jpg",
    category: "o'rnatish",
  },
  {
    name: "Suv filtri o'rnatish",
    description: "Suv filtri tizimini o'rnatish va ta'mirlash",
    price: 90000,
    image_url: "/water-filter-installation.jpg",
    category: "o'rnatish",
  },
]

// Check if services already exist
const existingServices = db.prepare("SELECT COUNT(*) as count FROM services").get() as { count: number }

if (existingServices.count === 0) {
  const insertService = db.prepare(`
    INSERT INTO services (name, description, price, image_url, category)
    VALUES (?, ?, ?, ?, ?)
  `)

  services.forEach((service) => {
    insertService.run(service.name, service.description, service.price, service.image_url, service.category)
  })

  console.log("Database initialized with sample services")
} else {
  console.log("Database already initialized")
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

// Insert default admin user (username: admin, password: admin123)
const existingAdmin = db.prepare("SELECT COUNT(*) as count FROM admin_users").get() as { count: number }

if (existingAdmin.count === 0) {
  const insertAdmin = db.prepare(`
    INSERT INTO admin_users (username, password)
    VALUES (?, ?)
  `)

  const hashedPassword = hashPassword("admin123")
  insertAdmin.run("admin", hashedPassword)
  console.log("Default admin user created (username: admin, password: admin123)")
}

db.close()
console.log("Database setup complete!")
