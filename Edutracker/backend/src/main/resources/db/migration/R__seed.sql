INSERT INTO roles(name) VALUES
                            ('SUPER_ADMIN'),('SUB_ADMIN'),('FACULTY'),('VALIDATOR'),('COMPANY'),('STUDENT')
    ON CONFLICT DO NOTHING;

INSERT INTO organizations(name, code) VALUES ('Global University','GU'), ('Tech Institute','TI')
    ON CONFLICT DO NOTHING;

-- Passwords will be set by application initialization if not present.

