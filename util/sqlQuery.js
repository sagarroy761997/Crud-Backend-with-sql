
const pool= require('./sqlConnection');

const createTable = (request, response) => {
  pool.query(`CREATE TABLE if not exists users (
    id uuid DEFAULT uuid_generate_v4 (),
   email varchar unique NOT NULL,
   password varchar unique NOT NULL,
   PRIMARY KEY (id, email, password));`, (error, results) => {
    if(error) {
      throw error;
    }
    response.json('user table created');
   })
  
}
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      response.send(error.message);
    }
    users = results.rows;
    response.status(200).send(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = (request.params.id)
  console.log(typeof(id));
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.send(error.message)
    }
    response.json(results.rows)
  })
}

const createUser = (request, response) => {
  const { email, password } = request.body

  pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password], (error, results) => {
    if (error) {
      response.send(error.message);
    }
    console.log(results.rows)
    response.send(`User added`)
  })
}

const updateUser = (request, response) => {
  const id = (request.params.id)
  const { email, password } = request.body

  pool.query(
    'UPDATE users SET email = $1, password = $2 WHERE id = $3',
    [email, password, id],
    (error) => {
      if (error) {
        response.send(error.message);
      }
      response.send(`User modified`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = (request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error) => {
    if (error) {
      response.send(error.message);
    }
    response.send(`User deleted`);
  })
}

module.exports = {
  createTable,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}