DROP TABLE user_events;
DROP TABLE sub_events;
DROP TABLE events;
DROP TABLE users;

CREATE TABLE users(
	id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(13) NOT NULL,
    password VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    branches VARCHAR(100) NOT NULL,
    transportation VARCHAR(100) NOT NULL,
    level int(1) NOT NULL,
    family_list TEXT NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP,
    is_attend boolean NOT NULL DEFAULT FALSE,
    qr_code_url TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE events (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR (100),
    PRIMARY KEY (id)
);

CREATE TABLE sub_events (
    id int NOT NULL AUTO_INCREMENT,
    event_id int NOT NULL,
    start_time datetime NOT NULL,
    end_time datetime NOT NULL,
    slots int(2),
    PRIMARY KEY (id)
);
ALTER TABLE sub_events ADD FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE;

CREATE TABLE user_events (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    sub_event_id int NOT NULL,
    child_name VARCHAR(100),
    PRIMARY KEY (id)
);
ALTER TABLE user_events ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE user_events ADD FOREIGN KEY (sub_event_id) REFERENCES sub_events(id) ON DELETE CASCADE;