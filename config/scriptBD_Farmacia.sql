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

insert into productos (nombre, descripcion,precio,stock,fecha_creacion)
					values  ('Alcohol','Alcohol de alta pureza',460.50,50,'14/07/2024'),
							('Paracetamol','500 mg',150,300,'13/07/2024'),
                            ('Toallitas','humedas pack por 50u',1200,70,'11/07/2024'),
                            ('Protector Solar','Protector solar de bajo PH factor XXX',60000,20,'12/07/2024');

select * from usuarios;
select * from productos;

