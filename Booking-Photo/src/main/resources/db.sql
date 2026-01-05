-- create database bookingphoto;
-- use bookingphoto.dbo;

-- select * from dbo.users;
use booking_photo;
select * from form_bookings;
insert into users (password, email) values ('$2a$12$jdoY/0vD2sALet2L8bhaTeRHHL8lGftDE0Xez38QHHI3AwaInln2i', 'admin@gmail.com');
select fb.user_id, u.email, fb.id, p.id from form_bookings as fb left join packages as p on fb.package_id = p.id left join users as u on fb.user_id = u.id;