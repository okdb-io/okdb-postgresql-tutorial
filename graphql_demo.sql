create table person (
  id serial primary key,
  name varchar not null,
  about text,
  email varchar not null unique,
  created_at timestamp default current_timestamp
);

create table post (
  id serial primary key,
  headline text not null,
  body text,
  published boolean,  
  author_id int4 references person(id)
);
create index on post (author_id);