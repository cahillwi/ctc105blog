require('reflect-metadata'); // used to extract static data types at runtime, needed for automatic API docs generation
require('ts-node/register'); // used to transpile typescript code dynamically at runtime
require('dotenv/config'); // if it exists, loads .env file into process.env
require('./src/server.ts'); // entry into the TypeScript realm