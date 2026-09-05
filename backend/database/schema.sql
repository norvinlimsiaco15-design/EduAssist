-- EduAssist Database Schema
-- Run this script to create the database and all tables

CREATE DATABASE IF NOT EXISTS eduassist
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE eduassist;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') NOT NULL DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    currency VARCHAR(10) NOT NULL,
    exchange_rate DECIMAL(12, 4) NOT NULL DEFAULT 1.0000,
    living_cost DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    processing_fee DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schools table
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country_id INT NOT NULL,
    school_name VARCHAR(200) NOT NULL,
    tuition DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_id INT NOT NULL,
    program_name VARCHAR(200) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    intake VARCHAR(100) NOT NULL,
    tuition DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    school_id INT NOT NULL,
    program_id INT NOT NULL,
    status ENUM(
        'Contract Signed',
        'COE Processing',
        'Lodgment',
        'Waiting for Result'
    ) NOT NULL DEFAULT 'Contract Signed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

-- Default admin is created by database/init_db.py with a bcrypt-hashed password

-- Seed: Countries with exchange rates (approximate)
INSERT INTO countries (name, currency, exchange_rate, living_cost, processing_fee, description) VALUES
('Australia', 'AUD', 38.50, 18000.00, 2500.00, 'Popular destination for Filipino students with world-class universities and a high quality of life.'),
('Canada', 'CAD', 42.00, 16000.00, 2200.00, 'Known for affordable education, multicultural cities, and post-study work opportunities.'),
('Germany', 'EUR', 62.00, 12000.00, 1800.00, 'Offers tuition-free or low-cost education at public universities with strong engineering programs.'),
('Spain', 'EUR', 62.00, 11000.00, 1500.00, 'Affordable living costs and rich cultural experience with growing English-taught programs.'),
('Malta', 'EUR', 62.00, 10000.00, 1200.00, 'Small island nation in the Mediterranean with English as an official language.'),
('South Korea', 'KRW', 0.042, 9000.00, 1500.00, 'Leading in technology and innovation with government scholarships for international students.'),
('New Zealand', 'NZD', 34.00, 15000.00, 2000.00, 'Safe, scenic country with practical education and pathways to residency.'),
('United Kingdom', 'GBP', 72.00, 17000.00, 3000.00, 'Home to prestigious universities with one-year master\'s programs available.'),
('Singapore', 'SGD', 42.50, 14000.00, 2500.00, 'Global hub for business and technology with top-ranked Asian universities.'),
('United States', 'USD', 57.00, 20000.00, 3500.00, 'Largest international student destination with diverse programs and research opportunities.')
ON DUPLICATE KEY UPDATE name = name;

-- Seed: Sample schools
INSERT INTO schools (country_id, school_name, tuition, description) VALUES
(1, 'University of Melbourne', 35000.00, 'One of Australia\'s leading research universities located in Melbourne.'),
(1, 'Monash University', 32000.00, 'Large public research university with campuses across Australia and internationally.'),
(2, 'University of Toronto', 38000.00, 'Canada\'s top-ranked university located in downtown Toronto.'),
(2, 'University of British Columbia', 36000.00, 'Globally recognized research university on Canada\'s west coast.'),
(3, 'Technical University of Munich', 500.00, 'Top German university specializing in engineering and technology.'),
(8, 'University of Oxford', 45000.00, 'One of the oldest and most prestigious universities in the world.'),
(10, 'Massachusetts Institute of Technology', 55000.00, 'World-leading institution for science, engineering, and technology.')
ON DUPLICATE KEY UPDATE school_name = school_name;

-- Seed: Sample programs
INSERT INTO programs (school_id, program_name, duration, intake, tuition, description) VALUES
(1, 'Bachelor of Commerce', '3 years', 'February, July', 35000.00, 'Comprehensive business degree covering finance, marketing, and management.'),
(1, 'Master of Information Technology', '2 years', 'February, July', 42000.00, 'Advanced IT program with specializations in AI and cybersecurity.'),
(2, 'Bachelor of Engineering', '4 years', 'February, July', 32000.00, 'Accredited engineering program with industry placements.'),
(3, 'Bachelor of Computer Science', '4 years', 'September', 38000.00, 'Rigorous CS program in the heart of Toronto.'),
(5, 'Master of Engineering', '2 years', 'October, April', 500.00, 'English-taught engineering master\'s at minimal tuition cost.'),
(6, 'Master of Business Administration', '1 year', 'October', 45000.00, 'Intensive MBA program at one of the world\'s most prestigious institutions.'),
(7, 'Master of Science in Computer Science', '2 years', 'September', 55000.00, 'Elite CS program with cutting-edge research opportunities.')
ON DUPLICATE KEY UPDATE program_name = program_name;
