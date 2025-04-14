# Use the official MySQL 5.7 base image
FROM mysql:5.7

# Set environment variables for root access and initial DB creation
ENV MYSQL_ROOT_PASSWORD=shubham@12345
ENV MYSQL_DATABASE=employees_db

# Copy your init SQL script into the container's init directory
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the MySQL default port
EXPOSE 3306
