import connection from '../../config/db.js';

const getAllProjects = async () => {
    const [rows] = await connection.query('SELECT * FROM invest_projects');
    return rows;
};

const getProjectById = async (id) => {
    const [rows] = await connection.query('SELECT * FROM invest_projects WHERE id = ?', [id]);
    return rows[0];
};

const getProjectByName = async (name) => {
    const [rows] = await connection.query('SELECT * FROM invest_projects WHERE project_name = ?', [name]);
    return rows[0];
};

const createProject = async (projectData) => {
    const {  project_name, type, price, rate,description,start_date } = projectData;
    const [result] = await connection.query(
        'INSERT INTO invest_projects (project_name, type,price, rate, description,start_date) VALUES (?, ?, ?, ?, ?, ?)',
        [project_name, type,price, rate, description,start_date]
    );
    return { message: 'Project added successfully', id: result.insertId };
};

const updateProjectPrice = async (id, projectData) => {
    const {  price } = projectData;

    // Get the current project data
    const project = await getProjectById(id);
    if (!project) return null;

    // Use existing values if new ones aren't provided
    const updatedPrice = price !== undefined ? price : project.price;

    const [result] = await connection.query(
        'UPDATE invest_projects SET price = ? WHERE id = ?',
        [updatedPrice, id]
    );

    if (result.affectedRows === 0) return null;

    return { message: 'Car updated successfully', id: parseInt(id) };
};

const deleteProject = async (id) => {
    const [result] = await connection.query('DELETE FROM invest_projects WHERE id = ?', [id]);

    if (result.affectedRows === 0) return null;

    return { message: 'Project deleted successfully', id: parseInt(id) };
};


export { getAllProjects, getProjectById, getProjectByName, createProject, updateProjectPrice, deleteProject };
