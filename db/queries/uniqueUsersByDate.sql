SELECT DATE(created_at) as "Date", count(DISTINCT ("ipAddress")) as "Unique Users"
FROM activity
GROUP BY DATE(created_at)