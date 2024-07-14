const db = require ('../config/db')


//Obtener todos los productos

exports.getAllProducts = async (req,res)=>{
    const query = 'select * from productos';
    try {
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// Obtener un producto por ID

exports.getProductByID = async (req,res) =>{
    const {id} = req.params;
    const query = 'select * from productos WHERE id = ?'
    try {
        const [rows] = await db.query(query,[id]);
        if (rows.length === 0){
            return res.status(404).json({error:'Producto no encontrado'});
        }
        res.json(rows[0])

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// crear un nuevo producto

exports.createProduct = async (req,res)=>{
    const {nombre, descripcion,precio,stock,fecha} = req.body;
    const query = 'insert into productos (nombre, descripcion,precio,stock,fecha_creacion) values (?,?,?,?,?)'
    const values = [nombre, descripcion,precio,stock,fecha]
    try {
        const [result] = await db.query(query,values)
        res.status(201).json({
            id: result.insertId,
            nombre,
            descripcion,
            precio,
            stock,
            fecha
        })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
};

// Actualizar un producto por ID

exports.updateProduct = async (req,res) => {
    const {id} = req.params;
    const {nombre, descripcion,precio,stock,fecha} = req.body;
    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio= ?, stock=?, fecha_creacion=? WHERE id = ?';
    const values = [nombre, descripcion,precio,stock,fecha,id];
    try {
        const [result] = await db.query(query,values);
        if (result.affectedRows === 0)
            return res.status(404).json({error:'Producto no encontrado'});
        res.json({id,nombre,descripcion,precio,stock,fecha})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// Eliminar porducto por ID

exports.deleteProduct = async (req,res) =>{
    const {id} = req.params;
    const query = 'DELETE FROM productos WHERE id = ?'
    try {
        const [result] = await db.query(query,[id]);
        if (result.affectedRows === 0){
            return res.status(404).json({error:'Producto no encontrado'});
        }
        res.json({message: 'Producto Eliminado exitosamente'});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

