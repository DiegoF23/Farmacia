const db = require('../config/db');

//Obtener todos los pedidos 

exports.getAllPedidos = async (req,res)=>{
    const query = 'SELECT * FROM pedidos';
    try {
        const [rows] = await db.query(query);
        res.json(rows)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// Obtener un pedido por ID

exports.getPedidosById = async (req,res) =>{
    const {id} = req.params;
    const queryPedido  = 'select * from pedidos where id=?';
    const queryDetalles = 'SELECT * FROM detalles_pedidos where pedido_id=?'
    try {
        const [pedido] = await db.query(queryPedido,[id]);
        if (pedido.length === 0){
            return res.status(404).json({error:'Pedido no encontrado'});
        }
        const [detalles] = await db.query(queryDetalles,[id]);
        res.json({...pedido[0],productos:detalles });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// crear un nuevo pedido con detalles
exports.createPedido = async (req,res) =>{
    const {cliente_id,productos} = req.body;
    const queryPedido = 'INSERT INTO pedidos (cliente_id,total) VALUES (?,?)';
    const queryDetalle = 'INSERT INTO detalles_pedidos (pedido_id, producto_id,cantidad,precio) VALUES ?';
    try {
        // CALCULAR EL TOTAL DEL PEDIDO
        const total = productos.reduce((acc, producto) => acc + (producto.cantidad * producto.precio),0);
        //crear el pedido
        const [result] = await db.query(queryPedido,[cliente_id,total]);

        //Insertar los detaalles pertenecientes a los pedidos

        const detalles = productos.map(producto => [result.insertId,producto.producto_id, producto.cantidad, producto.precio]);
        await db.query(queryDetalle,[detalles]);
        res.status(201).json({id:result.insertId, cliente_id,total,productos});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
//Actualizar un pedido con detalles
exports.updatePedido = async (req,res) =>{
    const {id} = req.params;
    const {cliente_id,productos} = req.body;
    const queryPedido = 'UPDATE pedidos SET cliente_id = ?, total= ? where id = ?';
    const queryDeleteDetalles = 'DELETE FROM detalles_pedidos WHERE pedido_id = ?';
    const queryDetalle = 'INSERT INTO detalles_pedidos (pedido_id, producto_id,cantidad,precio) VALUES ?';
    try {
        // CALCULAR EL TOTAL DEL PEDIDO
    const total = productos.reduce((acc, producto) => acc + (producto.cantidad * producto.precio),0);
    //Actualizar el pedido
    await db.query(queryPedido, [cliente_id,total,id]);

    //Eliminar los detalles existentes 
    await db.query(queryDeleteDetalles,[id]);

    //Insertar los nuevos detalles
    const detalles = productos.map(producto => [id,producto.producto_id, producto.cantidad, producto.precio]);
    await db.query(queryDetalle,[detalles]);
    res.json({id,cliente_id,total,productos});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//Eliminar un pedido
exports.deletePedido = async (req,res) =>{
    const {id} = req.params;
    const queryDeleteDetalles= 'DELETE FROM detalles_pedidos WHERE pedido_id = ?';
    const queryDeletePedido = 'DELETE FROM pedidos WHERE  id = ?';

    try {
        //Eliminar los detalles
        await db.query(queryDeleteDetalles,[id]);
        //Eliminar el pedido
        await db.query(queryDeletePedido,[id]);

        res.status(204).send();
    } catch (err) {
        res.status(500).json({error: err.message});
    }

}