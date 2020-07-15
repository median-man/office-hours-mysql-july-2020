INSERT INTO departments (title) VALUES ("math"), ("programming");
INSERT INTO classes (title, deptId) VALUES ("Algebra", 1), ("Geometry", 1), ("CSS", 2), ("JavaScript", 2);
INSERT INTO students (firstName, lastName, classId)
    VALUES
    ("Tim", "Lam", 1),
    ("Jessica", "Blankemeier", 1),
    ("Lisbeth", "Machado", 3),
    ("David", "Naimi", 3),
    ("Shelby", "Rothman", 4); 