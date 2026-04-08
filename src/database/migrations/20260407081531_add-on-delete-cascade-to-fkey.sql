-- migrate:up

ALTER TABLE sub_tasks
DROP CONSTRAINT IF EXISTS sub_tasks_task_id_fkey;

ALTER TABLE sub_tasks
ADD CONSTRAINT sub_tasks_task_id_fkey
FOREIGN KEY (task_id) REFERENCES tasks(id)
ON DELETE CASCADE;


ALTER TABLE tasks
DROP CONSTRAINT IF EXISTS tasks_board_column_id_fkey;

ALTER TABLE tasks
ADD CONSTRAINT tasks_board_column_id_fkey
FOREIGN KEY (board_column_id) REFERENCES board_columns(id)
ON DELETE CASCADE;


ALTER TABLE board_columns
DROP CONSTRAINT IF EXISTS board_columns_board_id_fkey;

ALTER TABLE board_columns
ADD CONSTRAINT board_columns_board_id_fkey
FOREIGN KEY (board_id) REFERENCES boards(id)
ON DELETE CASCADE;


ALTER TABLE boards
DROP CONSTRAINT IF EXISTS boards_user_id_fkey;

ALTER TABLE boards
ADD CONSTRAINT boards_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE;


-- migrate:down

ALTER TABLE boards
DROP CONSTRAINT boards_user_id_fkey;

ALTER TABLE boards
ADD CONSTRAINT boards_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(id);


ALTER TABLE board_columns
DROP CONSTRAINT board_columns_board_id_fkey;

ALTER TABLE board_columns
ADD CONSTRAINT board_columns_board_id_fkey
FOREIGN KEY (board_id) REFERENCES boards(id);


ALTER TABLE tasks
DROP CONSTRAINT tasks_board_column_id_fkey;

ALTER TABLE tasks
ADD CONSTRAINT tasks_board_column_id_fkey
FOREIGN KEY (board_column_id) REFERENCES board_columns(id);


ALTER TABLE sub_tasks
DROP CONSTRAINT sub_tasks_task_id_fkey;

ALTER TABLE sub_tasks
ADD CONSTRAINT sub_tasks_task_id_fkey
FOREIGN KEY (task_id) REFERENCES tasks(id);