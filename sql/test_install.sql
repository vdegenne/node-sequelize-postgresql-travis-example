\i sql/test_uninstall.sql;

-- in this scenario we just create a fake user so we can publicly use a password
create user testdbuser with password 'password';
create database testdb with owner 'testdbuser';

\connect testdb;

\i sql/structure.sql;
\i sql/data.sql;
