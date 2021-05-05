DROP TABLE IF EXISTS passwords;
DROP EXTENSION IF EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE passwords (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  site TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT not null,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL
);