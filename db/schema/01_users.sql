-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS users_organizations CASCADE;
DROP TABLE IF EXISTS passwords CASCADE;
DROP TABLE IF EXISTS websites CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255)  NOT NULL
);

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255)  NOT NULL
);

CREATE TABLE users_organizations (
 user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE
);

CREATE TABLE websites (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR (255) NOT NULL,
  category VARCHAR(255) NOT NULL
);

CREATE TABLE passwords (
  id SERIAL PRIMARY KEY NOT NULL,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  website_id INTEGER REFERENCES websites(id) ON DELETE CASCADE,
  website_username VARCHAR(255) NOT NULL,
  website_password VARCHAR(255) NOT NULL
);

