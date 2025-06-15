const fetch = require("node-fetch");

exports.handler = async function (event) {
const rawVersion = event.queryStringParameters?.version;
const version = (rawVersion || "ESV").toUpperCase();

const allowed = ["ESV", "NIV", "KJV", "NASB", "CSB"];
if (!allowed.includes(version)){
  return {
    statusCode: 400,
    body:JSON.stringify({ error: "Invalid version. Allowed versions are: " + allowed.join(", ")}),
  }
}

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