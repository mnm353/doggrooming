create table [user] {
    id serial PRIMARY KEY,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(100) not null,
    username varchar(100) not null,
};