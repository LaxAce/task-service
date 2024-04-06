const queries = {
    getAllUsers: "SELECT * FROM users",
    getUserBoards: "SELECT * FROM boards WHERE user_id = $1",
    // getUserById: 'SELECT * FROM users WHERE id = ?',
    // createUser: 'INSERT INTO users (name, email) VALUES (?, ?) RETURNING *',
}

export default queries;