const db = require ('../config/db');

//Obtener todas las ventas 

exports.getAllSales = async (req,res) =>{
    const query = 'select * from ventas';
    try {
        const [rows] = await db.query(query);
        res.json(rows);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.getSaleById = async (req,res)=>{
    const {id} = req.params;
    const query = 'select * from ventas WHERE id = ?'

    try {
        const [rows] = await db.query(query,[id])
        if (rows.length === 0){
            return res.status(404).json({error:'Venta no encontrada'});
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//crear una nueva venta con detalles
exports.createSale = async (req,res)=>{
    const {cliente_id, productos} = req.body;
    const queryVenta='insert into ventas(cliente_id,total) values (?,?)'
    const queryDetalle = 'insert into detalle_ventas (venta_id,producto_id,cantidad,precio) values ?'

    try {
        //calcular el total de la venta
        const total = productos.reduce((acc,producto)=> acc + (producto.cantidad * producto.precio), 0 )
        // Insartar la venta
        const [result] = await db.query(queryVenta,[cliente_id,total]);

        //Insertar los detralles pertenecientes a la venta

        const detalles = productos.map(producto => [result.insertId,producto.producto_id, producto.cantidad, producto.precio]);
        await db.query(queryDetalle,[detalles]);
        res.status(201).json({id:result.insertId, cliente_id,total,productos})
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

