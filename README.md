
## Architecture Overview

This project follows a layered architecture pattern with the following layers:

### 1. Routes Layer
- **Purpose**: Defines API endpoints and routes requests to appropriate controllers
- **Location**: `/main/routes/`
- **Files**: `db.routes.js`, `project.routes.js`, `projectLog.routes.js`, `user.routes.js`

### 2. Controllers Layer
- **Purpose**: Handles HTTP requests/responses, validates input, and calls services
- **Location**: `/main/controllers/`
- **Files**: 
             - **Project Files**: `projectLog.controller.js`, `projectManager.controller.js`
             - **User Files**: `userInfoManager.controller.js`, `userLog.controller.js`, `userProjectManager.controller.js`

### 3. Services Layer
- **Purpose**: Contains business logic and communicates with the database
- **Location**: `/main/services/`
- **Files**:  
             - **Project Files**: `projectLog.service.js`, `projectManager.service.js`
             - **User Files**: `userInfoManager.service.js`, `userLog.service.js`, `userProjectManager.service.js`

### 4. Database Configuration
- **Purpose**: Manages database connection
- **Location**: `/main/config/`
- **Files**: `db.js`

## API Endpoints

### API Routes
- `GET /invest/log/${peoject_id}` - Obtain the fluctuation of the specified project
- `POST /invest/log` - Add investment project log
- `DELETE /invest/log` - Delete investment project log

- `GET /invest/list` - Investment Project Showcase
- `PATCH /invest/${project_id}` - Investment project fluctuations
- `POST /invest` - Add investment project
- `GET /invest/${project_id}` - View the details of the specified project.
- `DELETE /invest/${project_id}` - Delete investment project 
- `GET /getInvestbyProjetName/:name` - Query investment projects by name

- `GET /:user_id/invest/list` - User investment holding display
- `GET /:user_id/invest/:project_id` - View the specified investment project
- `PATCH /:user_id/invest/:project_id` - Modify the user's investment project amount

- `GET /user/${user_id}/in-and-out` - Obtain user income and expenses
- `POST /user/${user_id}/log` - Add user log
- `POST /user/{user_id}/logByDate` - Add custom log date
- `DELETE /user/${user_id}/log` - Delete user log 
- `GET /user/${user_id}/log/list` - View transaction history

- `GET /user/${user_id}` - User information retrieval
- `PATCH /user/${user_id}` - Transfer in and out of funds

### Database Routes
- `GET/db/init` - Initialize the database and create tables

## How to Run

```bash
# Install dependencies
npm install

# Start the application
npm start

# Start with auto-reload during development
npm run dev
```

## Benefits of Layered Architecture

- **Separation of Concerns**: Each layer has a specific responsibility
- **Maintainability**: Easier to maintain and update individual components
- **Testability**: Easier to write unit tests for isolated components
- **Scalability**: Can scale different layers independently
- **Code Reusability**: Services can be reused across different controllers
