'use strict';

/* Success Response */
exports.success = (res, value) => {
  const result = {    
    code: 200,
    message: 'success',
    results: value,
  };
  res.status(200).json(result);
  res.end();
};

exports.upsert = (res, data, message) => {
  const result = {
    code: 201,
    message: `data successfully ${message}`,
    data: data
  };
  res.status(201).json(result);
  res.end();
};

/* Error Response */

exports.notFound = res => {
  const result = {
    code: 404,
    message: 'No entry found'
  };
  res.status(404).json(result);
  res.end();
};

exports.falseRequirement = (res, field, message = undefined) => {
  const result = {
    code: 500,
    message: message ? message : `invalid-${field}`
  };
  res.status(500).json({ ...result });
  res.end();
};

exports.loginFailed = res => {
  res.status(401).send({
    code: 401,
    message: 'Incorrect username or password'
  });
};

exports.loginSuccess = (res, rows, token) => {
  res.status(200).send({
    code: 200,
    data: rows,
    token: token
  });
};

exports.invalid = (res, message) => {
  res.status(400).json({
    status: 400,
    message: 'Invalid ' + message
  });
};

exports.internalError = (res, message) => {
  res.status(500).json({
    status: 500,
    message,
  });
};

exports.error = (res, err) => {
  res.status(422).json({
    status: 422,
    message: err
  });
};

exports.notAllowedInput = res => {
  res.status(401).send({
    status: 401,
    message: 'Not allowed to input this data yet. Please contact Administrator to grant permission'
  });
};

exports.duplicateEntries = (res, msg) => {
  res.status(409).send({
    status: 409,
    message: msg || 'Data conflict'
  });
};

exports.notAllowedView = res => {
  res.status(401).send({
    status: 401,
    message: 'Not allowed to view this data yet. Please contact Administrator to grant permission'
  });
};

exports.notAllowedDelete = (res,msg = '') => {
  res.status(409).send({
    status:409,
    message:"Cannot delete data" + (msg ? `, ${msg}`: '')
  });
}

exports.forbidden = (res, message) => {
  res.status(401).send({
    status:401,
    message,
  });
}

exports.maintenance = (res) => {
  res.status(503).send({
    status:503,
    message:"Server Maintenance",
  });
}