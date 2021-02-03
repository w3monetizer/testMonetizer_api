const advancedResults = (model, populate) => async (req, res, next) => {  // A function in a function definition
  let query;

  // Make a copy of req.query //
  const reqQuery = { ...req.query };

  // Fields to exclude from query //
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery //
  removeFields.forEach(param => delete reqQuery[param]);

  // Add $ in front of lt, gt, etc as mongo operators //
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); // g - global - not just the first find; \b = word boundary

  // Finding resource // Mongo find using the manipulated queryStr from code block above //
  query = model.find(JSON.parse(queryStr));

  // Select Fields //
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort By //
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {  // default sort by date //
    query = query.sort('-createdAt');
  }

  // Pagination //
  const page = parseInt(req.query.page, 10) || 1; // base/radix 10; default page = 1 //
  const limit = parseInt(req.query.limit, 10) || 25; // base/radix 10; + default per page //
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) { // adding populate, if present, to the query  //
    query = query.populate(populate);
  }

  // Execute query //
  const results = await query;

  // Pagination result //
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  }

  next(); // calling next() since this is a middleware //
};

module.exports = advancedResults;