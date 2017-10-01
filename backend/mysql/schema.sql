CREATE DATABASE IF NOT EXISTS stockmarket;

USE stockmarket;

CREATE TABLE IF NOT EXISTS stocks (
  id int NOT NUll AUTO_INCREMENT,
  stockSymbol varchar(20) NOT NULL,
  UNIQUE KEY (stockSymbol),
  PRIMARY KEY (id)
)ENGINE = INNODB;


CREATE TABLE IF NOT EXISTS watches (
  id int NOT NULL AUTO_INCREMENT,
  stockSymbol varchar(10) NOT NULL,
  UNIQUE KEY (stockSymbol),
  PRIMARY KEY (id)
)ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS watch_stock (
  watchId int,
  stockId int,
  FOREIGN KEY (watchId) REFERENCES watches(id),
  FOREIGN KEY (stockId) REFERENCES stocks(id)
)ENGINE = INNODB;



--  -- Getting all students for a class:

--     SELECT s.student_id, last_name
--       FROM student_classes sc 
-- INNER JOIN students s ON s.student_id = sc.student_id
--      WHERE sc.class_id = X

--  -- Getting all classes for a student: 

--     SELECT c.class_id, name
--       FROM student_classes sc 
-- INNER JOIN classes c ON c.class_id = sc.class_id
--      WHERE sc.student_id = Y
