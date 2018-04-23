create database universe;

-- we connect to the universe ;D
\connect universe;

create table atoms (
  atom_id serial primary key,
  name text not null,
  symbol varchar(1) not null,
  atomic_number smallint not null,
  atomic_mass decimal not null
);

create table elements (
  id serial primary key,
  name text not null
);

create table compositions (
  composition_id serial primary key,
  element_id integer references elements on update cascade on delete cascade,
  atom_id integer references atoms on update cascade on delete cascade,
  count smallint not null
);
