-- migrate:up

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    email varchar(255) NOT NULL,
    first_name varchar(255),
    last_name varchar(255),
    password varchar(255) NOT NULL
);

CREATE TABLE boards (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar(255) NOT NULL,
    user_id uuid NOT NULL
);

CREATE TABLE board_columns (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar(255) NOT NULL,
    color_tag varchar(7) NOT NULL,
    board_id uuid NOT NULL,
    UNIQUE (name, board_id),
    UNIQUE (color_tag, board_id)
);

CREATE TABLE tasks (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title varchar(255) NOT NULL,
    description text,
    current_status varchar(255) NOT NULL,
    board_column_id uuid NOT NULL
);

CREATE TABLE sub_tasks (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title varchar(255) NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    task_id uuid NOT NULL
);

-- Foreign Keys
ALTER TABLE boards
ADD CONSTRAINT boards_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE board_columns
ADD CONSTRAINT board_columns_board_id_fkey
FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE tasks
ADD CONSTRAINT tasks_board_column_id_fkey
FOREIGN KEY (board_column_id) REFERENCES board_columns(id);

ALTER TABLE sub_tasks
ADD CONSTRAINT sub_tasks_task_id_fkey
FOREIGN KEY (task_id) REFERENCES tasks(id);

-- migrate:down

DROP TABLE sub_tasks;
DROP TABLE tasks;
DROP TABLE board_columns;
DROP TABLE boards;
DROP TABLE users;