DROP TABLE user_events;
DROP TABLE sub_events;
DROP TABLE events;
DROP TABLE family;
DROP TABLE users;
DROP TABLE confirm_invitation;
DROP TABLE master_departments;
DROP TABLE master_branches;
DROP TABLE master_transportations;
DROP TABLE schedules;


CREATE TABLE users(
	id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(13) NOT NULL,
    password VARCHAR(100) NOT NULL,
    department int NOT NULL,
    branches int NOT NULL,
    transportation int DEFAULT NULL,
    level int(1) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP,
    is_attend boolean NOT NULL DEFAULT FALSE,
    qr_code_url TEXT NOT NULL,
    invitation_url TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE family(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    name VARCHAR(200) NOT NULL,
    age int NOT NULL,
    status int NOT NULL,
    PRIMARY KEY (id)
)
ALTER TABLE family ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

CREATE TABLE events (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR (100),
    category_age VARCHAR(10),
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
    family_id int NOT NULL,
    sub_event_id int NOT NULL,
    PRIMARY KEY (id)
);
ALTER TABLE user_events ADD FOREIGN KEY (family_id) REFERENCES family(id) ON DELETE CASCADE;
ALTER TABLE user_events ADD FOREIGN KEY (sub_event_id) REFERENCES sub_events(id) ON DELETE CASCADE;

CREATE TABLE confirm_invitation (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL UNIQUE,
    counter int NOT NULL DEFAULT 0,
    time datetime,
    PRIMARY KEY (id) 
);

CREATE TABLE master_departments (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO master_departments
(name)
VALUES
('Decorative Project'),
('Decorative Retail'),
('Factory Operations'),
('Finance & IT'),
('HR & GA'),
('Marine'),
('Marketing'),
('Powder Sales'),
('Protective'),
('Supply Chain & Warehouse'),
('TSS');

CREATE TABLE master_branches (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO master_branches
(name)
VALUES
('Jakarta & Tangerang'),
('Pekanbaru'),
('Palembang'),
('Makassar'),
('Medan'),
('Surabaya'),
('Batam'),
('Balikpapan');

CREATE TABLE master_transportations (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO master_transportations
(name)
VALUES
('Kendaraan Pribadi (Mobil)'),
('Kendaraan Pribadi (Motor)'),
('Bus Powder Factory'),
('Bus Jotun Plant 2 - JDC');


-- OTHER SECTION
CREATE TABLE schedules (
    id int NOT NULL AUTO_INCREMENT,
    description TEXT NOT NULL,
    date date NOT NULL,
    time_start time NOT NULL,
    time_end time NOT NULL,
    zoom_link text NOT NULL,
    status boolean DEFAULT false,
    PRIMARY KEY (id)
);

CREATE TABLE rewards (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    item VARCHAR(100),
    PRIMARY KEY (id)
);
ALTER TABLE rewards ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

CREATE TABLE user_scan_info (    
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    code varchar(20) NOT NULL,
    name varchar(100),
    scan_time datetime,
    status boolean DEFAULT false,
    PRIMARY KEY (id)
);
ALTER TABLE user_scan_info ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;