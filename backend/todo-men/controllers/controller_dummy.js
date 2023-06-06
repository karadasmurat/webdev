// get all items
// GET /items
const getAllItems = async (req, res) => {
  res.json({ msg: "Get all items" });
};

// get a single Item
// GET /items/:id
const getItem = async (req, res) => {
  // parse URL path  - req.params object contains the route parameter
  const { id } = req.params;

  res.json({ msg: "GET the Item: " + id });
};

// create an Item
// POST /items/
const createItem = async (req, res) => {
  res.json({ msg: "POST a new Item" });
  // Get properties from the request.body object. (object destructuring)
  // const { title, reps, load } = req.body;
};

// update an Item
// PUT PATCH /items/:id
const updateItem = async (req, res) => {
  // Get id from path  - req.params object contains the route parameter
  const { id } = req.params;

  res.json({ msg: "Update an Item: " + id });

  // Get properties from the request.body object. (object destructuring)
  // const { title, reps, load } = req.body;
};

// delete an Item
// DELETE /items/:id
const deleteItem = async (req, res) => {
  // URL path  - req.params object contains the route parameter
  const { id } = req.params;

  res.json({ msg: "Delete an Item: " + id });
};

// export functions
module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
