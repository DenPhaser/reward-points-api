-- Creating table `Customer`
CREATE TABLE Customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    points INT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Creating table `CustomerPointHistory`
CREATE TABLE CustomerPointHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_guid CHAR(36) UNIQUE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount INT NOT NULL,
    
    FOREIGN KEY (customer_id) REFERENCES Customer(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Creating table `Configuration`
CREATE TABLE Configuration (
    name VARCHAR(255) PRIMARY KEY,
    value TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Fill with data

INSERT INTO Configuration (name, value)
VALUES 
    ('ORDER_REWARD_PERCENTAGE', '1');

-- Inserting customers
INSERT INTO Customer (email, phone)
VALUES 
    ('exampple@lunaris.jp', '080-555-6969'),
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


-- Stored procedures

DELIMITER //
CREATE PROCEDURE adjust_points(
    IN customer_id INT,
    IN amount INT,
    IN order_guid CHAR(36),

    OUT result INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback the transaction on error
        ROLLBACK;
    END;

    START TRANSACTION;

    SET result = 0;
		
	-- Lock the customer record for update
    SELECT id FROM Customer WHERE id = customer_id FOR UPDATE; 

    SET @current_balance = (SELECT points FROM Customer WHERE id = customer_id);
    
    -- We don't want to get a negative balance
    IF @current_balance + amount < 0 THEN
        SET result = -1;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Customer does not have enough points.';
	END IF;

    -- Insert a transaction log
    INSERT INTO CustomerPointHistory
        (customer_id, order_guid, amount)
    VALUES 
        (customer_id, order_guid, amount);
		
    -- Updates customer total balance
    UPDATE Customer SET points = GREATEST(0, points + amount) WHERE id = customer_id;

    COMMIT;

    SET result = 1;

END //
DELIMITER ;