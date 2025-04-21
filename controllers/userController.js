const dataBase = require('../dataBase');
// Criar um usuário
const createUser = (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    dataBase.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error('Erro ao criar usuário:', err);
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso', userId: result.insertId });
    });
};

// Listar todos os usuários
const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
    dataBase.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar usuários:', err);
            return res.status(500).json({ error: 'Erro ao listar usuários' });
        }
        res.status(200).json(results);
    });
};

// Buscar um usuário por ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    dataBase.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(results[0]);
    });

// Atualizar um usuário
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    dataBase.query(
        'UPDATE users SET nome = ?, email = ?, senha = ? WHERE id = ?',
        [nome, email, senha, id],
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar usuário:', err);
                return res.status(500).json({ error: 'Erro ao atualizar usuário' });
            }
            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        }
    );
};

// Deletar um usuário
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    dataBase.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar usuário:', err);
            return res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    });
};
};

