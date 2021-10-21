-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');

--users
INSERT INTO users (email, user_password) VALUES ('one@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (email, user_password) VALUES ('two@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (email, user_password) VALUES ('three@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (email, user_password) VALUES ('four@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (email, user_password) VALUES ('five@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (email, user_password) VALUES ('six@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (email, user_password) VALUES ('seven@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (email, user_password) VALUES ('eight@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


-- organizations
INSERT INTO organizations (name) VALUES ('cool');
INSERT INTO organizations (name) VALUES ('verycool');

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



INSERT INTO websites(name, category)
VALUES ('facebook', 'social');

INSERT INTO websites(name, category)
VALUES ('twitter','social');

INSERT INTO websites(name, category)
VALUES ('instagram','social');

INSERT INTO websites(name, category)
VALUES ('linkedin','job');

INSERT INTO websites(name, category)
VALUES ('bamboo','job');

INSERT INTO websites(name, category)
VALUES ('netflix', 'entertainment');

INSERT INTO websites(name, category)
VALUES ('crave','entertainment');

INSERT INTO websites(name, category)
VALUES ('lighthouse','educational');

INSERT INTO websites(name, category)
VALUES ('alsolighthouse','educational');

INSERT INTO websites(name, category)
VALUES ('eventbrite','hobby');



-- passwords

INSERT INTO passwords (organization_id, user_id, website_id, website_username, website_password)
VALUES (1,1,1, 'fb', 'U2FsdGVkX1/ipuRR1jjBuF2MJy7F+8R+6Neg+41dM7U=');

INSERT INTO passwords (organization_id, user_id, website_id, website_username, website_password)
VALUES (1,1,2, 'tw', 'U2FsdGVkX1/ipuRR1jjBuF2MJy7F+8R+6Neg+41dM7U=');

INSERT INTO passwords (organization_id, user_id, website_id, website_username, website_password)
VALUES (1,1,3, 'ins', 'U2FsdGVkX1/ipuRR1jjBuF2MJy7F+8R+6Neg+41dM7U=');

INSERT INTO passwords (organization_id, user_id, website_id, website_username, website_password)
VALUES (1,2,4, 'li', 'U2FsdGVkX1/ipuRR1jjBuF2MJy7F+8R+6Neg+41dM7U=');

INSERT INTO passwords (organization_id, user_id, website_id, website_username, website_password)
VALUES (1,2,5, 'bb', 'U2FsdGVkX1/ipuRR1jjBuF2MJy7F+8R+6Neg+41dM7U=');


INSERT INTO passwords (organization_id, user_id, website_id, website_username, website_password)
VALUES (2,5,6, 'nf', 'U2FsdGVkX1/ipuRR1jjBuF2MJy7F+8R+6Neg+41dM7U=');

INSERT INTO passwords (organization_id, user_id, website_id, website_username, website_password)
VALUES (2,5,7, 'cr', 'U2FsdGVkX1/ipuRR1jjBuF2MJy7F+8R+6Neg+41dM7U=');

INSERT INTO passwords (organization_id, user_id, website_id, website_username, website_password)
VALUES (2,6,8, 'lh', 'U2FsdGVkX1/ipuRR1jjBuF2MJy7F+8R+6Neg+41dM7U=');

INSERT INTO passwords (organization_id, user_id, website_id, website_username, website_password)
VALUES (2,6,9, 'slh', 'U2FsdGVkX1/ipuRR1jjBuF2MJy7F+8R+6Neg+41dM7U=');

INSERT INTO passwords (organization_id, user_id, website_id, website_username, website_password)
VALUES (2,6,10, 'eb', 'U2FsdGVkX1/ipuRR1jjBuF2MJy7F+8R+6Neg+41dM7U=');

