create table product (
    id serial PRIMARY KEY,
    name varchar (100) not null,
    description varchar(500) not null,
    price decimal not null
);