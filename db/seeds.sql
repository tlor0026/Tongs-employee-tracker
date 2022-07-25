INSERT INTO departments (department_name)
VALUES
("Advisory"),
("Auditing and Assurance"),
("Tax and Compliance"),
("Operations");

INSERT INTO roles (title, salary, department_id) 
VALUES
("TAS Partner",205000,1),
("ERM Director",185000,1),
("Chief Risk Officer",305000,2),
("IT Audit Director",250000,2),
("Senior Tax Manager",250000,3),
("Tax Manager",150000,3),
("CEO",1750000,4),
("CFO",950000,4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
("Kelly", "Smith",1, NULL),
("Danny", "Lowe",2, 1),
("Paula", "Jones",3, 2),
("Bill", "Stern",4, 3),
("Marley", "Patterson",5, NULL),
("Ashley", "Lawrence",6, NULL);