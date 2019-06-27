create table user_table (
    id serial PRIMARY KEY not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(100) not null,
    username varchar(100) not null,
    password varchar(100) not null
);