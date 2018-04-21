insert into atoms (name, symbol, atomic_number, atomic_mass) values
('Hydrogen', 'H', 1, 1.008), -- 1
('Oxygen', 'O', 8, 15.999), -- 2
('Carbon', 'C', 6, 12.011);

insert into elements (name) values ('water'); -- 1

insert into compositions (element_id, atom_id, count) values
(1, 1, 2),
(1, 2, 1);
