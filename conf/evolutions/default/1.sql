# Users schema

# --- !Ups

CREATE TABLE players (
    id int(5) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    avatar varchar(255),
    email varchar(255) UNIQUE,
    isAdmin boolean NOT NULL DEFAULT FALSE,
    weiquan int(5) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) DEFAULT CHARSET = UTF8;

# --- !Downs

DROP TABLE players;