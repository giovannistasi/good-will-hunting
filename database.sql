create table users (
	user_id uuid primary key,
	firstname varchar(100),
	lastname varchar(100),
	credits bigint,
	picture text,
	salt varchar(500),
	passhash varchar(500),
	address varchar(500),
	email varchar(100)
)


create table listings (
	listing_id uuid primary key,
	description text,
	completed bool,
	pending bool,
	posting_time time with time zone,
	event_time time with time zone,
	address text,
	credit_value varchar(30),
	max_participants int
)

create table skills (
	skill_id uuid primary key,
	name varchar(500)
)




select first_name, name from users join users_skills on users_skills.user_id = users.user_id join skills on skills.skill_id = users_skills.skill_id

