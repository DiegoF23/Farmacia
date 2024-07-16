const db = require('../config/db');

//Obtener todos los clientes

exports.getAllClients = async (req,res)=>{
    const query = 'select * from clientes';

    try {
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

//Obtener un cliente por ID

exports.getClientById = async (req, res) =>{
    const {id} = req.params;
    const query = 'select * from clientes WHERE id = ?';
    try {
        const [rows] = await db.query(query, [id]);
        if (rows.length === 0){
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//Crear un nuevo cliente

exports.createClient = async (req,res)=>{
    const {nombre,direccion,telefono, email} = req.body;
    const query = 'insert into clientes (nombre,direccion,telefono, email) values (?,?,?,?)';
    const values = [nombre,direccion,telefono, email];
    try {
        const [result] = await db.query(query,values);
        res.status(201).json({id:result.insertId,nombre,direccion,telefono, email});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}


//Actualizar un cliente por ID

exports.updateClient = async (req,res)=>{
    const {id} = req.params;
    const {nombre,direccion,telefono, email} = req.body;
    const query = 'UPDATE clientes SET nombre = ?,direccion = ?,telefono = ?, email= ? WHERE id = ?';
    const values = [nombre,direccion,telefono, email, id];

    try {
        const [result] = await db.query (query,values);
        if (result.affectedRows === 0){
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({id,nombre,direccion,telefono, email});
    } catch (err) {
        res.status(500).json({error: err.message});
    }

}

//Eliminar un cliente por ID 

exports.deleteClient = async (req,res)=>{
    const {id} = req.params;
    const query = 'DELETE FROM clientes WHERE id = ?'
    try {
        const [result] = await db.query(query,[id]);
        if (result.affectedRows === 0){
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({message:'Cliente Eliminado Exitosamente'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
} 
  