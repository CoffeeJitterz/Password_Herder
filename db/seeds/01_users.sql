-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');

--users
INSERT INTO users (id, email, user_password) VALUES (1, 'one@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, email, user_password) VALUES (2, 'two@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, email, user_password) VALUES (3, 'three@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, email, user_password) VALUES (4, 'four@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- organizations
INSERT INTO organizations (id, name) VALUES (1,'cool');

-- users_organizations:
INSERT INTO users_organizations (user_id, organization_id) VALUES (1,1);
INSERT INTO users_organizations (user_id, organization_id) VALUES (2,1);
INSERT INTO users_organizations (user_id, organization_id) VALUES (3,1);
INSERT INTO users_organizations (user_id, organization_id) VALUES (4,1);


-- websites
INSERT INTO websites(id, name, category, organization_id)
VALUES (1, 'facebook', 'social', 1);

INSERT INTO websites(id, name, category, organization_id)
VALUES (2, 'twitter','social', 1);

INSERT INTO websites(id, name, category, organization_id)
VALUES (3, 'instagram','social', 1);

INSERT INTO websites(id, name, category, organization_id)
VALUES (4, 'linkedin','job', 1);

INSERT INTO websites(id, name, category, organization_id)
VALUES (5, 'bamboo','job', 1);

-- passwords

INSERT INTO passwords (id, organization_id, user_id, website_id, website_username, website_password)
VALUES (1,1,1,1, 'fb', 'fbp');

INSERT INTO passwords (id, organization_id, user_id, website_id, website_username, website_password)
VALUES (2,1,1,2, 'tw', 'twp');

INSERT INTO passwords (id, organization_id, user_id, website_id, website_username, website_password)
VALUES (3,1,1,3, 'ins', 'ins');

INSERT INTO passwords (id, organization_id, user_id, website_id, website_username, website_password)
VALUES (4,1,2,4, 'li', 'lip');

INSERT INTO passwords (id, organization_id, user_id, website_id, website_username, website_password)
VALUES (5,1,2,5, 'bb', 'bbp');





-- ERD:
-- users: PK: id;
--        email;
--        user_password;
-- organizations: PK: id;
--                name
-- users_organizations: PK/FK: user_id ;
--                      PK/FK: organization_id
-- passwords: PK: id ;
--            FK: organization_id;
--            FK: user_id;
--            FK: website_id;
--            website_username;
--            website_password
-- websites: PK: id;
--            category;
--            FK: organization_id
