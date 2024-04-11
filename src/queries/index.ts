const queries = {
    getAllUsers: `
        SELECT * 
        FROM users;
    `,
    getUserByEmail: `
        SELECT id 
        FROM users 
        WHERE email = $1;
    `,
    createUser: `
        INSERT INTO users (email, first_name, last_name)
        VALUES ($1, $2, $3) 
        RETURNING email, first_name AS "firstName", last_name AS "lastName";
    `,
    getUserBoards: `
        SELECT id, name, user_id AS "userId" 
        FROM boards 
        WHERE user_id = $1;
    `,
    createBoard: `
        INSERT INTO boards (name, user_id)
        VALUES ($1, $2)
        RETURNING name
    `,
    getBoardById: `
        SELECT id 
        FROM board_columns 
        WHERE board_id = $1;
    `,
    getBoardColumns: `
        SELECT id, name, color_tag AS "colorTag", board_id AS "boardId" 
        FROM board_columns 
        WHERE board_id = $1;
    `,
    getColumnTasks: `
        SELECT id, title, current_status AS "currentStatus" 
        FROM tasks 
        WHERE board_column_id = $1;
    `,
    getSubTasksById: `
        SELECT id, title, is_completed AS "isCompleted" 
        FROM sub_tasks 
        WHERE task_id = $1;
    `,
    getTaskById: `
        SELECT id, title, description, current_status AS "CurrentStatus", board_column_id AS "boardColumnId"
        FROM tasks
        WHERE id = $1;
    `,
}

export default queries;