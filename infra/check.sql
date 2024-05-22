-- No longer used, but kept for reference
SELECT
    COUNT(*) AS table_count
FROM
    information_schema.tables
WHERE
    table_schema = 'public'
    AND table_name IN ('list', 'task', 'users', 'session', 'conversation', 'message');

