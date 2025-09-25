CREATE TABLE organizations(
                              id BIGSERIAL PRIMARY KEY,
                              name VARCHAR(255) NOT NULL UNIQUE,
                              code VARCHAR(64)
);

CREATE TABLE roles(
                      id BIGSERIAL PRIMARY KEY,
                      name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE users(
                      id BIGSERIAL PRIMARY KEY,
                      email VARCHAR(255) NOT NULL UNIQUE,
                      password_hash VARCHAR(255) NOT NULL,
                      full_name VARCHAR(255),
                      enabled BOOLEAN DEFAULT TRUE,
                      organization_id BIGINT REFERENCES organizations(id)
);

CREATE TABLE user_roles(
                           user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
                           role_id BIGINT REFERENCES roles(id) ON DELETE CASCADE,
                           PRIMARY KEY(user_id, role_id)
);

CREATE TABLE student_profiles(
                                 id BIGSERIAL PRIMARY KEY,
                                 user_id BIGINT REFERENCES users(id) UNIQUE,
                                 program VARCHAR(255),
                                 department VARCHAR(255),
                                 cgpa NUMERIC(3,2),
                                 attendance_percent NUMERIC(5,2),
                                 credit_points INT
);

CREATE TYPE activity_type AS ENUM ('CONFERENCE','WORKSHOP','CERTIFICATION','CLUB','VOLUNTEERING','COMPETITION','LEADERSHIP','INTERNSHIP','COMMUNITY_SERVICE');
CREATE TYPE activity_status AS ENUM ('PENDING','CHANGES_REQUESTED','APPROVED','REJECTED');

CREATE TABLE activities(
                           id BIGSERIAL PRIMARY KEY,
                           student_id BIGINT REFERENCES student_profiles(id) ON DELETE CASCADE,
                           type activity_type NOT NULL,
                           status activity_status NOT NULL,
                           title VARCHAR(1000),
                           description TEXT,
                           start_date TIMESTAMPTZ,
                           end_date TIMESTAMPTZ,
                           evidence_path VARCHAR(2048),
                           external_link VARCHAR(2048),
                           credit_value INT,
                           submitted_at TIMESTAMPTZ,
                           approved_at TIMESTAMPTZ
);

CREATE TABLE approvals(
                          id BIGSERIAL PRIMARY KEY,
                          activity_id BIGINT REFERENCES activities(id) ON DELETE CASCADE,
                          approver_user_id BIGINT REFERENCES users(id),
                          comment VARCHAR(1000),
                          approved BOOLEAN,
                          created_at TIMESTAMPTZ DEFAULT NOW()
);
