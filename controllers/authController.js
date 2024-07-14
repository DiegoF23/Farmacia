const db = require("../config/db");

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  const query = "INSERT INTO usuarios (nombre, email, password) VALUES (?,?,?)";
  const values = [nombre, email, password];
  try {
    const [result] = await db.query(query, values);
    res.json({ message: "Usuario Registrado Exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) =>{
    const { email,password } = req.body;
    const query = 'select * from usuarios where email = ? AND password = ?'
    const values = [email,password];
    try {
        const [rows] = await db.query(query,values);
        if (rows.length > 0 ){
            res.json({message:'Login Exitoso', userID:rows[0].id})
        } else {
            res.status(400).json({ error:'Email o pass incorrecta'});
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}