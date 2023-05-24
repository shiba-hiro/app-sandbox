DO
$$
BEGIN
    IF current_database() <> 'sample_db' THEN
        RAISE EXCEPTION 'Invalid database name';
    END IF;
END;
$$;


-- DO
-- $$
-- BEGIN
--     IF current_database() <> 'foo_db' THEN
--         RAISE EXCEPTION 'Invalid database name';
--     END IF;
-- END;
-- $$;


CREATE ROLE bar_role WITH LOGIN PASSWORD 'password';
