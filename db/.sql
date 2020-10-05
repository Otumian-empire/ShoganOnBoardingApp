-- create database
create database onboardingdb;

-- create table onboarding
create table onboarding(
    id serial primary key,
    firstname varchar(25) not null,
    lastname varchar(25) not null,
    email varchar(125) not null unique,
    password varchar(125) not null
);

-- create table forgetpassword
create table forgetpassword(
    id serial primary key,
    email varchar(125) not null unique,
    code varchar(6) not null
);
