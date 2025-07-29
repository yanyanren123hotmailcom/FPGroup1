import connection from '../config/db.js';

const initializeDB = async () => {
    try {
        // First check if the database exists
        await connection.query('CREATE DATABASE IF NOT EXISTS finance');

        // Use the database
        await connection.query('USE finance');

        // Create the users table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(255) NOT NULL,
                current_funds decimal NOT NULL,
                current_earnings decimal NOT NULL
            )
        `;
        await connection.query(createTableQuery);

        // Create the Invest table
        const createInvestTableQuery = `
            CREATE TABLE IF NOT EXISTS invest_projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                project_name VARCHAR(255) NOT NULL,
                type  VARCHAR(255) NOT NULL,
                price decimal NOT NULL comment 'price of the project',
                rate decimal NOT NULL comment 'rate of the project',
                description TEXT NOT NULL,
                start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.query(createInvestTableQuery);

        // Create the InvestHold table
        const createInvestHoldTableQuery = `
            CREATE TABLE IF NOT EXISTS invest_holds (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                user_name VARCHAR(255) NOT NULL,
                project_name VARCHAR(255) NOT NULL,
                project_type  VARCHAR(255) NOT NULL,
                project_id INT NOT NULL,
                amount INT NOT NULL,
                hold_price decimal NOT NULL comment 'price of the project when user hold it',
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (project_id) REFERENCES invest_projects(id)
            )
        `;
        await connection.query(createInvestHoldTableQuery);
        

        // //create invest_type_enum table
        // const createInvestTypeEnumQuery = `
        //     CREATE TABLE IF NOT EXISTS invest_type_enum (
        //         id INT AUTO_INCREMENT PRIMARY KEY,
        //         type_name VARCHAR(255) NOT NULL
        //     )
        // `;
        // await connection.query(createInvestTypeEnumQuery);

        //create user_logs table
        const createUserLogsTableQuery = `
            CREATE TABLE IF NOT EXISTS user_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                action INT NOT NULL comment '1: pay, 2: sell',
                project_id INT NOT NULL,
                amount INT NOT NULL,
                price decimal NOT NULL comment 'price of the project when user pay or sell it',
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (project_id) REFERENCES invest_projects(id)
            )
        `;
        await connection.query(createUserLogsTableQuery);

        const createProjectLogsTableQuery = `
            CREATE TABLE IF NOT EXISTS project_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                project_id INT NOT NULL,
                action INT NOT NULL comment '1: create, 2: update, 3: delete',
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                rate decimal NOT NULL comment 'rate of the project when log created',
                price decimal NOT NULL comment 'price of the project when log created',
                FOREIGN KEY (project_id) REFERENCES invest_projects(id)
            )
        `;
        await connection.query(createProjectLogsTableQuery);

        return { message: 'Database initialized and table created successfully' };
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

const seedData = async () => {
    try {
        
    } catch (error) {
        console.error('Error seeding cars:', error);
        throw error;
    }
};

export { initializeDB, seedData };

