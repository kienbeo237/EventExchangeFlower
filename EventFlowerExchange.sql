-- Drop and recreate the database
DROP DATABASE IF EXISTS EventFlowerManagement;

CREATE DATABASE EventFlowerManagement;

-- Use the created database
USE EventFlowerManagement;

-- User Table (created first as it is referenced by other tables)
CREATE TABLE [User] (
  [userID] integer PRIMARY KEY,
  [username] nvarchar(255) NOT NULL,
  [password] nvarchar(255) NOT NULL,
  [address] nvarchar(255),
  [phoneNumber] nvarchar(255),
  [email] nvarchar(255) UNIQUE NOT NULL,
  [role] nvarchar(255) NOT NULL,
  [createdAt] datetime2 DEFAULT GETDATE()
);

-- Category Table
CREATE TABLE [Category] (
  [categoryID] integer PRIMARY KEY,
  [flowerType] nvarchar(255) NOT NULL,
  [description] nvarchar(255) DEFAULT 'available',
  [imageUrl] nvarchar(255)
);

-- EventFlowerPosting Table
CREATE TABLE [EventFlowerPosting] (
  [postID] integer PRIMARY KEY,
  [title] nvarchar(255),
  [description] text,
  [price] decimal(10, 2),
  [imageUrl] nvarchar(255),
  [status] nvarchar(255),
  [createdAt] datetime2 DEFAULT GETDATE(),
  [updatedAt] datetime2 DEFAULT GETDATE(),
  [flowerID] integer,
  [userID] integer,
  FOREIGN KEY ([userID]) REFERENCES [User] ([userID])
);

-- FlowerBatch Table
CREATE TABLE [FlowerBatch] (
  [flowerID] integer PRIMARY KEY,
  [flowerName] nvarchar(255),
  [quantity] integer CHECK (quantity >= 0),
  [status] nvarchar(255),
  [description] text,
  [price] decimal(10, 2),
  [imageUrl] nvarchar(255),
  [postID] integer,
  [categoryID] integer,
  FOREIGN KEY ([postID]) REFERENCES [EventFlowerPosting] ([postID]) ON DELETE CASCADE,
  FOREIGN KEY ([categoryID]) REFERENCES [Category] ([categoryID]) ON DELETE CASCADE
);

-- Order Table
CREATE TABLE [Order] (
  [orderID] integer PRIMARY KEY,
  [orderDate] datetime2 DEFAULT GETDATE(),
  [updatedAt] datetime2 DEFAULT GETDATE(),
  [createdAt] datetime2 DEFAULT GETDATE(),
  [totalPrice] decimal(10, 2) NOT NULL,
  [shippingAddress] nvarchar(255) NOT NULL,
  [status] nvarchar(255) DEFAULT 'pending',
  [userID] integer NOT NULL,
  [flowerID] integer,
  FOREIGN KEY ([userID]) REFERENCES [User] ([userID]) ON DELETE CASCADE
);

-- OrderDetail Table
CREATE TABLE [OrderDetail] (
  [orderID] integer NOT NULL,
  [flowerID] integer NOT NULL,
  [quantity] integer CHECK (quantity >= 0),
  [price] decimal(10, 2),
  PRIMARY KEY ([orderID], [flowerID]),
  FOREIGN KEY ([orderID]) REFERENCES [Order] ([orderID]) ON DELETE CASCADE,
  FOREIGN KEY ([flowerID]) REFERENCES [FlowerBatch] ([flowerID]) ON DELETE CASCADE
);

-- Feedback Table
CREATE TABLE [Feedback] (
  [userID] integer NOT NULL,
  [sellerID] integer NOT NULL,
  [comment] text,
  [rating] integer CHECK (rating >= 1 AND rating <= 5),
  [createdAt] datetime2 DEFAULT GETDATE(),
  PRIMARY KEY ([userID], [sellerID]),
  FOREIGN KEY ([userID]) REFERENCES [User] ([userID]) ON DELETE NO ACTION,
  FOREIGN KEY ([sellerID]) REFERENCES [User] ([userID]) ON DELETE NO ACTION
);

-- Notifications Table
CREATE TABLE [Notifications] (
  [notificationID] integer PRIMARY KEY,
  [content] text NOT NULL,
  [notificationType] nvarchar(255) NOT NULL,
  [createdAt] datetime2 DEFAULT GETDATE(),
  [userID] integer NOT NULL,
  FOREIGN KEY ([userID]) REFERENCES [User] ([userID]) ON DELETE CASCADE
);

-- Payment Table
CREATE TABLE [Payment] (
  [paymentID] integer PRIMARY KEY,
  [method] nvarchar(255) NOT NULL,
  [status] nvarchar(255) DEFAULT 'pending',
  [date] datetime2 DEFAULT GETDATE(),
  [orderID] integer NOT NULL,
  FOREIGN KEY ([orderID]) REFERENCES [Order] ([orderID]) ON DELETE CASCADE
);

-- Delivery Table
CREATE TABLE [Delivery] (
  [deliveryID] integer PRIMARY KEY,
  [deliveryDate] datetime2 NOT NULL,
  [rating] integer CHECK (rating >= 1 AND rating <= 5),
  [availableStatus] nvarchar(255) DEFAULT 'available',
  [orderID] integer NOT NULL,
  FOREIGN KEY ([orderID]) REFERENCES [Order] ([orderID]) ON DELETE CASCADE
);

-- Insert into User table
INSERT INTO [User] ([userID], [username], [password], [address], [phoneNumber], [email], [role], [createdAt]) 
VALUES (1, 'admin', '123', '123 Flower St', '555-1234', 'john@example.com', 'manager', GETDATE()), 
       (2, 'customer', '123', '456 Garden Ave', '555-5678', 'jane@example.com', 'customer', GETDATE());

INSERT INTO [Category] ([categoryID], [flowerType], [description], [imageUrl])
VALUES
(1, 'Rose', 'Classic red roses', 'https://example.com/images/rose.jpg'),
(2, 'Tulip', 'Elegant tulips', 'https://example.com/images/tulip.jpg'),
(3, 'Lily', 'Beautiful white lilies', 'https://example.com/images/lily.jpg');

INSERT INTO [EventFlowerPosting] ([postID], [title], [description], [price], [imageUrl], [status], [createdAt], [updatedAt], [flowerID], [userID])
VALUES
(1, 'Romantic Roses', 'A bouquet of red roses, perfect for special occasions.', 50.00, 'https://example.com/images/romantic-roses.jpg', 'available', GETDATE(), GETDATE(), 1, 1),
(2, 'Spring Tulips', 'A vibrant collection of tulips, ideal for springtime celebrations.', 35.00, 'https://example.com/images/spring-tulips.jpg', 'available', GETDATE(), GETDATE(), 2, 2);

INSERT INTO [FlowerBatch] ([flowerID], [flowerName], [quantity], [status], [description], [price], [imageUrl], [postID], [categoryID])
VALUES
(1, 'Red Roses', 100, 'available', 'Fresh red roses', 50.00, 'https://example.com/images/red-roses.jpg', 1, 1),
(2, 'Yellow Tulips', 200, 'available', 'Bright yellow tulips', 35.00, 'https://example.com/images/yellow-tulips.jpg', 2, 2);

INSERT INTO [Order] ([orderID], [orderDate], [updatedAt], [createdAt], [totalPrice], [shippingAddress], [status], [userID], [flowerID])
VALUES
(1, GETDATE(), GETDATE(), GETDATE(), 85.00, '789 Blossom Ln', 'pending', 2, 1),
(2, GETDATE(), GETDATE(), GETDATE(), 35.00, '123 Rose Blvd', 'shipped', 2, 2);

INSERT INTO [OrderDetail] ([orderID], [flowerID], [quantity], [price])
VALUES
(1, 1, 2, 50.00),
(2, 2, 1, 35.00);

INSERT INTO [Feedback] ([userID], [sellerID], [comment], [rating], [createdAt])
VALUES
(2, 1, 'Beautiful flowers and fast delivery!', 5, GETDATE()),
(2, 1, 'Tulips were fresh and vibrant!', 4, GETDATE());

INSERT INTO [Notifications] ([notificationID], [content], [notificationType], [createdAt], [userID])
VALUES
(1, 'Your order has been shipped!', 'Order Update', GETDATE(), 2),
(2, 'New flower collection available!', 'Promotion', GETDATE(), 2);

INSERT INTO [Payment] ([paymentID], [method], [status], [date], [orderID])
VALUES
(1, 'Credit Card', 'completed', GETDATE(), 1),
(2, 'PayPal', 'completed', GETDATE(), 2);

INSERT INTO [Delivery] ([deliveryID], [deliveryDate], [rating], [availableStatus], [orderID])
VALUES
(1, GETDATE(), 5, 'delivered', 1),
(2, GETDATE(), 4, 'delivered', 2);
