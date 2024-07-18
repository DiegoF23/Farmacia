drop database if exists Farmacia;
create database Farmacia ;
use Farmacia;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password varchar(255) not null
);
CREATE table productos (
	id int auto_increment primary key,
    nombre varchar(255) not null,
    descripcion text,
    precio decimal(10,2) not null,
    stock int not null,
    fecha_creacion varchar(255)    

);

create TABLE clientes (
		id int auto_increment primary key,
        nombre varchar(255) not null,
        direccion text,
        telefono varchar(20),
        email varchar(255),
        fecha_creacion timestamp default current_timestamp
);

create table ventas(
	id int auto_increment primary key,
    cliente_id int,
    fecha timestamp default current_timestamp,
    total decimal(10,2) not null,
    foreign key (cliente_id) references clientes(id)
);

create table detalle_ventas(
	id int auto_increment primary key,
    venta_id int,
    producto_id int,
    cantidad int not null,
    precio decimal(10,2) not null,
    foreign key (venta_id) references ventas(id),
    foreign key (producto_id) references productos(id)
);


INSERT INTO productos (nombre, descripcion, precio, stock, fecha_creacion) VALUES
('Paracetamol', 'Analgésico y antipirético para el alivio del dolor y la fiebre', 250.00, 100, '2023-06-01'),
('Ibuprofeno', 'Antiinflamatorio no esteroideo para el alivio del dolor y la inflamación', 300.00, 150, '2023-06-05'),
('Amoxicilina', 'Antibiótico para el tratamiento de infecciones bacterianas', 1200.00, 50, '2023-06-10'),
('Loratadina', 'Antihistamínico para el alivio de los síntomas de la alergia', 500.00, 80, '2023-06-15'),
('Omeprazol', 'Inhibidor de la bomba de protones para el tratamiento de la acidez estomacal', 700.00, 70, '2023-06-20'),
('Salbutamol', 'Broncodilatador para el alivio del asma y otros problemas respiratorios', 800.00, 40, '2023-06-25'),
('Metformina', 'Medicamento para el tratamiento de la diabetes tipo 2', 400.00, 60, '2023-06-30'),
('Captopril', 'Antihipertensivo para el tratamiento de la hipertensión', 600.00, 90, '2023-07-05'),
('Vitamina C', 'Suplemento vitamínico para reforzar el sistema inmunológico', 200.00, 200, '2023-07-10'),
('Acetaminofén', 'Analgésico y antipirético para el alivio del dolor y la fiebre', 250.00, 100, '2023-07-15');

select * from usuarios;
select * from clientes;
select * from productos;
select * from detalle_ventas;

select A.id, A.venta_id, B.nombre as 'Producto', A.cantidad,A.precio  from detalle_ventas as A
join productos as B on A.producto_id = B.id;


create table pedidos (
	id int auto_increment primary key,
    cliente_id int,
    fecha timestamp default current_timestamp,
    total decimal(10,2),
    foreign key (cliente_id) references clientes(id)
);

create table detalles_pedidos(
	id int auto_increment primary key,
    pedido_id int,
    producto_id int,
    cantidad int,
    precio decimal(10,2),
    foreign key (pedido_id) references pedidos(id),
    foreign key (producto_id) references productos(id)
);
    
    


