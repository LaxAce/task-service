const queries = {
    getAllUsers: `
        SELECT * 
        FROM users;
    `,
    getUserByEmail: `
        SELECT id, email, password, first_name AS "FirstName", last_name AS "lastName", is_verified AS "isVerified"
        FROM users 
        WHERE email = $1;
    `,
    getUserById: `
        SELECT *
        FROM users
        WHERE id = $1;
    `,
    getUserVerificationByUserId: `
        SELECT *
        FROM user_verification
        WHERE user_id = $1;
    `,
    getUserAndVerificationByUserId: `
        SELECT *
        FROM users
        JOIN user_verification 
        ON users.id=user_verification.user_id
        WHERE users.id = $1;
    `,
    getUserAndForgotPasswordByUserId: `
        SELECT *
        FROM users
        JOIN forgot_password
        ON users.id = forgot_password.user_id
        WHERE users.id = $1;
    `,
    createUser: `
        INSERT INTO users (email, password, first_name, last_name)
        VALUES ($1, $2, $3, $4) 
        RETURNING id, email, first_name AS "firstName", last_name AS "lastName";
    `,
    createUserVerification: `
        INSERT INTO user_verification (user_id, unique_id, expires_at)
        VALUES ($1, $2, $3)
        RETURNING *;
    `,
    invalidateUserVerification: `
        UPDATE user_verification
        SET expires_at = NOW() - INTERVAL '100 years'
        WHERE id = $1
        RETURNING *;
    `,
    createForgotPassword: `
        INSERT INTO forgot_password (user_id, unique_id, expires_at)
        VALUES ($1, $2, $3)
        RETURNING *;
    `,
    invalidateForgotPassword: `
        UPDATE forgot_password
        SET expires_at = NOW() - INTERVAL '100 years'
        WHERE id = $1
        RETURNING *;
    `,
    updateUserVerification: `
        UPDATE users
        SET is_verified = $1
        WHERE id = $2
        RETURNING id, email, is_verified as "isVerified";
    `,
    updateUserPasswordAndVerification: `
        UPDATE users
        SET password = $1, is_verified = $2
        WHERE id = $3
        RETURNING id, email, is_verified as "isVerified";
    `,
    deleteUser: `
        DELETE FROM users
        WHERE id = $1;
    `,
    getUserBoards: `
        SELECT id, name, user_id AS "userId" 
        FROM boards 
        WHERE user_id = $1;
    `,
    createBoard: `
        INSERT INTO boards (name, user_id)
        VALUES ($1, $2)
        RETURNING id, name
    `,
    updateBoard: `
        UPDATE boards
        SET name = $1
        WHERE id = $2
        RETURNING id, name;
    `,
    deleteBoard: `
        DELETE FROM boards
        WHERE id = $1
    `,
    getBoardById: `
        SELECT id 
        FROM boards
        WHERE id = $1;
    `,
    getBoardByNameForAUser: `
        SELECT id
        FROM boards
        WHERE LOWER(name) = LOWER($1)
        AND user_id = $2;
    `,
    getBoardColumns: `
        SELECT id, name, color_tag AS "colorTag", board_id AS "boardId" 
        FROM board_columns 
        WHERE board_id = $1;
    `,
    getColumnByNameForABoard: `
        SELECT id, name, color_tag AS "colorTag"
        FROM board_columns
        WHERE LOWER(name) = LOWER($1)
        AND board_id = $2;
    `,
    createColumn: `
        INSERT INTO board_columns (name, color_tag, board_id)
        VALUES ($1, $2, $3)
        RETURNING id, name, color_tag AS "colorTag", board_id AS "boardId";
    `,
    deleteBoardColumns: `
        DELETE FROM board_columns
        WHERE board_id = $1;
    `,
    deleteBoardColumn: `
        DELETE FROM board_columns
        WHERE id = $1;
    `,
    updateBoardColumn: `
        UPDATE board_columns
        SET name = $1
        WHERE id = $2
        RETURNING id, name, color_tag AS "colorTag", board_id AS "boardId";
    `,
    getColumnTasks: `
        SELECT id, title, current_status AS "currentStatus" 
        FROM tasks 
        WHERE board_column_id = $1;
    `,
    getTaskById: `
        SELECT id, title, description, current_status AS "CurrentStatus", board_column_id AS "boardColumnId"
        FROM tasks
        WHERE id = $1;
    `,
    getTaskByNameForABoard: `
        SELECT id, title, description, current_status AS "CurrentStatus", board_column_id AS "boardColumnId"
        FROM tasks
        WHERE LOWER(title) = LOWER($1)
        AND board_column_id = $2;
    `,
    createTask: `
        INSERT INTO tasks (title, description, current_status, board_column_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, description,  board_column_id AS "boardColumnId";
    `,
    updateTask: `
        UPDATE tasks
        SET title = $1, description = $2, board_column_id = $3
        WHERE id = $4
        RETURNING id, title, description, board_column_id AS "boardColumnId";
    `,
    deleteTask: `
        DELETE FROM tasks
        WHERE id = $1;
    `,
    createSubTask: `
        INSERT INTO sub_tasks (title, task_id)
        VALUES ($1, $2)
        RETURNING id, title, is_completed AS "isCompleted";
    `,
    getSubTasksByTaskId: `
        SELECT id, title, is_completed AS "isCompleted" 
        FROM sub_tasks 
        WHERE task_id = $1;
    `,
    getSubTasksById: `
        SELECT id, title, is_completed AS "isCompleted"
        FROM sub_tasks
        WHERE id = $1;
    `,
    deleteSubTask: `
        DELETE FROM sub_tasks
        WHERE id = $1;
    `,
    deleteSubTaskByTaskId: `
        DELETE FROM sub_tasks
        WHERE task_id = $1;
    `,
    updateSubTask: `
        UPDATE sub_tasks
        SET title = $1, is_completed = $2
        WHERE id = $3
        RETURNING id, title, is_completed AS "isCompleted";
    `,
}

export default queries;