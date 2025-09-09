-- Clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  is_blocked BOOLEAN DEFAULT FALSE
);

-- Cars table
CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  price_per_day DECIMAL(10, 2) NOT NULL,
  is_available BOOLEAN DEFAULT TRUE
);

-- Bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  car_id INTEGER REFERENCES cars(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
);

-- Payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id),
  amount DECIMAL(10, 2) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'paid'
);

-- Reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  car_id INTEGER REFERENCES cars(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);