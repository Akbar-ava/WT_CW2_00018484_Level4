const fs = require('fs');
const path = require('path');

if (!global.cw_db) {
  global.cw_db = path.join(__dirname, '../data', 'cw_db.json');
}

const users = require(global.cw_db);

const userService = {
  // get all students
  get(req, res) {
    return users;
  },

  // get a student by ID
  getById(req, res) {
    const id = req.params.id;
    return users.find(item => item.id === id);
  },

  // insert a new student
  insert(req, res) {
    let new_id = genRandId(4);
    const body = req.body;  
  
    const user = {
      id: new_id,
      weight: body.weight,
      goal: body.goal,
      description: body.description
    };
  
    users.push(user);     
    writeToFile(users);
  
    return user;
  },

  // update an existing student
  update(req, res) {
    const id = req.params.id;
    const index = users.findIndex(item => item.id === id);
    if (index === -1) {
      return null; // eroor if user is not found
    }
  
    users[index].weight = req.body.weight;
    users[index].goal = req.body.goal;
    users[index].description = req.body.description;
  
    writeToFile(users);
  
    return users[index];
  },

  // deleting a user
  delete(req, res) {
    const id = req.params.id;
    const index = users.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }
    users.splice(index, 1);
    writeToFile(users);
    return true;
  }
};

// function for overwriting the json file with updated student data
let writeToFile = async (users) => {
  await fs.writeFileSync(
    global.cw_db,
    JSON.stringify(users, null, 4),
    'utf8'
  );
};

// generate a random id (similar to a simplified UUID)
let genRandId = (count) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < count; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = userService;
