const fetch = require("node-fetch");

exports.handler = async function () {
  try {
    const response = await fetch("https://bible-api.com/?random=verse");

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Bible API failed" }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message }),
    };
  }
};