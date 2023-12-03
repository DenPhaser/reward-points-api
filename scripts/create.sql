-- Creating table `Customer`
CREATE TABLE IF NOT EXISTS Customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Creating table `CustomerPointHistory`
CREATE TABLE IF NOT EXISTS CustomerPointHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_guid CHAR(36) UNIQUE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount INT NOT NULL,
    
    FOREIGN KEY (customer_id) REFERENCES Customer(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Fill with data

-- Inserting customers
INSERT INTO Customer (email, phone)
VALUES 
    ('user1@example.com', '123-456-7890'),
    ('user2@example.com', '234-567-8901'),
    ('user3@example.com', '345-678-9012'),
    ('user4@example.com', '456-789-0123'),
    ('user5@example.com', '567-890-1234');

-- Inserting customer point history records
INSERT INTO CustomerPointHistory (customer_id, order_guid, amount)
VALUES 
    (1, UUID(), 10),
    (1, UUID(), 15),
    (1, NULL, 100),
    (1, NULL, -20),
    (1, UUID(), 15),
    (2, UUID(), 15),
    (4, UUID(), 15),
    (5, UUID(), 15);
