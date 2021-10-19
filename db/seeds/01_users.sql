-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');

--users
INSERT INTO users (id, email, user_password) VALUES (1, 'one@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, email, user_password) VALUES (2, 'two@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, email, user_password) VALUES (3, 'three@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, email, user_password) VALUES (4, 'four@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (id, email, user_password) VALUES (5, 'five@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, email, user_password) VALUES (6, 'six@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, email, user_password) VALUES (7, 'seven@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, email, user_password) VALUES (8, 'eight@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


-- organizations
INSERT INTO organizations (id, name) VALUES (1,'cool');
INSERT INTO organizations (id, name) VALUES (2,'verycool');

-- users_organizations:
INSERT INTO users_organizations (user_id, organization_id) VALUES (1,1);
INSERT INTO users_organizations (user_id, organization_id) VALUES (2,1);
INSERT INTO users_organizations (user_id, organization_id) VALUES (3,1);
INSERT INTO users_organizations (user_id, organization_id) VALUES (4,1);

INSERT INTO users_organizations (user_id, organization_id) VALUES (5,2);
INSERT INTO users_organizations (user_id, organization_id) VALUES (6,2);
INSERT INTO users_organizations (user_id, organization_id) VALUES (7,2);
INSERT INTO users_organizations (user_id, organization_id) VALUES (8,2);


-- websites
-- INSERT INTO websites(id, name, category, organization_id)
-- VALUES (1, 'facebook', 'social', 1);

-- INSERT INTO websites(id, name, category, organization_id)
-- VALUES (2, 'twitter','social', 1);

-- INSERT INTO websites(id, name, category, organization_id)
-- VALUES (3, 'instagram','social', 1);

-- INSERT INTO websites(id, name, category, organization_id)
-- VALUES (4, 'linkedin','job', 1);

-- INSERT INTO websites(id, name, category, organization_id)
-- VALUES (5, 'bamboo','job', 1);


INSERT INTO websites(id, name, category)
VALUES (1, 'facebook', 'social');

INSERT INTO websites(id, name, category)
VALUES (2, 'twitter','social');

INSERT INTO websites(id, name, category)
VALUES (3, 'instagram','social');

INSERT INTO websites(id, name, category)
VALUES (4, 'linkedin','job');

INSERT INTO websites(id, name, category)
VALUES (5, 'bamboo','job');


INSERT INTO websites(id, name, category)
VALUES (6, 'netflix', 'entertainment');

INSERT INTO websites(id, name, category)
VALUES (7, 'crave','entertainment');

INSERT INTO websites(id, name, category)
VALUES (8, 'lighthouse','educational');

INSERT INTO websites(id, name, category)
VALUES (9, 'alsolighthouse','educational');

INSERT INTO websites(id, name, category)
VALUES (10, 'eventbrite','hobby');



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




INSERT INTO passwords (id, organization_id, user_id, website_id, website_username, website_password)
VALUES (6,2,5,6, 'nf', 'nfp');

INSERT INTO passwords (id, organization_id, user_id, website_id, website_username, website_password)
VALUES (7,2,5,7, 'cr', 'crp');

INSERT INTO passwords (id, organization_id, user_id, website_id, website_username, website_password)
VALUES (8,2,6,8, 'lh', 'lhp');

INSERT INTO passwords (id, organization_id, user_id, website_id, website_username, website_password)
VALUES (9,2,6,9, 'slh', 'lislhpp');

INSERT INTO passwords (id, organization_id, user_id, website_id, website_username, website_password)
VALUES (10,2,6,10, 'eb', 'ebp');



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
