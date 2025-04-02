const fs = require('fs');

const path = require('path');

if (!global.cw_db) {
  global.cw_db = path.join(__dirname, '../data', 'cw_db.json');
}

const goals = require(global.cw_db);

const goalService = {
  // get all goals list
  get(req, res) {
    return goals;
  },

  // get a goal by id
  getById(req, res) {
    const id = req.params.id;
    return goals.find(item => item.id === id);
  },

  // create a new goal
  insert(req, res) {
    let new_id = genRandId(4);
    const body = req.body;  
  
    const goal = {
      id: new_id,
      weight: body.weight,
      goal: body.goal,
      description: body.description
    };
  
    goals.push(goal);     
    writeToFile(goals);
  
    return goal;
  },

  // update an existing goal
  update(req, res) {
    const id = req.params.id;
    const index = goals.findIndex(item => item.id === id);
    if (index === -1) {
      return null; // eroor if goal is not found
    }
  
    goals[index].weight = req.body.weight;
    goals[index].goal = req.body.goal;
    goals[index].description = req.body.description;
  
    writeToFile(goals);
  
    return goals[index];
  },

  // deleting a goal
  delete(req, res) {
    const id = req.params.id;
    const index = goals.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }
    goals.splice(index, 1);
    writeToFile(goals);
    return true;
  }
};

// function for overwriting the existing json file to update the goal 
let writeToFile = async (goals) => {
  await fs.writeFileSync(
    global.cw_db,
    JSON.stringify(goals, null, 4),
    'utf8'
  );
};

// generate a random id using only digits
let genRandId = (count) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < count; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = goalService;
