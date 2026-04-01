-- migrate:up
CREATE TABLE user_verification(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL,
    unique_id varchar(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,

    CONSTRAINT user_verification_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

ALTER TABLE users
ADD COLUMN is_verified BOOLEAN NOT NULL DEFAULT false, 
ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT false;

-- migrate:down
ALTER TABLE users
DROP COLUMN is_verified,
DROP COLUMN is_admin;

DROP TABLE user_verification;
