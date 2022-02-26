const fs = require("fs");
const mongoose = require("mongoose");
const sizeOf = require("image-size");

const supertest = require("supertest");
const app = require("../app");
const dropAllCollections = require("./utils/dropAllCollections");

const request = supertest(app);

const testImageName = "TestName";
const expectedFilePath = "/img/TestName.jpeg";

const jpgPath = "test/utils/test.jpg";
const jpegPath = "test/utils/test.jpeg";
const pngPath = "test/utils/test.png";
const gifPath = "test/utils/test.gif";

// Connects to test database
beforeAll(async () => {
  process.env.ENV = "test";
  const url = `mongodb://127.0.0.1/image-app-test-db`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up test database and drop connection
afterAll(async () => {
  await dropAllCollections();
  await mongoose.connection.close();
});

test("Return 404 for invalid endpoint", async (done) => {
  const response = await request.get("/invalid");
  expect(response.status).toBe(404);
  expect(response.body.message).toBe(`Cannot find /invalid on this server!`);
  done();
});

test("POST /images - upload image", async (done) => {
  const response = await postImagePromise(jpegPath);

  const fileExists = checkPublicFileExists(expectedFilePath);

  removePublicFile(expectedFilePath);

  expect(response.status).toBe(201);
  expect(response.body.data.data.name).toBe(testImageName);
  expect(response.body.data.data.path).toBe(expectedFilePath);
  expect(fileExists).toBe(true);

  done();
});

test("GET /images - returns array of metadata for uploaded images", async (done) => {
  const response = await request.get("/images");

  expect(response.status).toBe(200);
  expect(response.body.data.length).toBe(1);
  expect(response.body.data[0].name).toBe(testImageName);
  expect(response.body.data[0].path).toBe(expectedFilePath);

  done();
});

const checkPublicFileExists = (filePath) => {
  return fs.existsSync(`public${filePath}`);
};

const removePublicFile = (filePath) => {
  const fileExists = checkPublicFileExists(filePath);
  if (fileExists) {
    fs.unlink(`public${filePath}`, (err) => {
      if (err) throw err;
    });
  }
};

const postImagePromise = (filePath) => {
  return request
    .post("/images")
    .field("name", testImageName)
    .attach("photo", filePath);
};

test("POST /images - upload different file extensions", async (done) => {
  let response = await postImagePromise(jpgPath);
  expect(response.status).toBe(201);
  removePublicFile(response.body.data.data.path);

  response = await postImagePromise(jpegPath);
  expect(response.status).toBe(201);
  removePublicFile(response.body.data.data.path);

  response = await postImagePromise(pngPath);
  expect(response.status).toBe(201);
  removePublicFile(response.body.data.data.path);

  response = await postImagePromise(gifPath);
  expect(response.status).toBe(400);

  done();
});

test("POST /images - check image was resized", async (done) => {
  const EXPECTED_WIDTH = 400;
  const EXPECTED_HEIGHT = 400;

  const response = await postImagePromise(jpegPath);
  const dimensions = sizeOf(`public${expectedFilePath}`);
  expect(dimensions.width).toBe(EXPECTED_WIDTH);
  expect(dimensions.height).toBe(EXPECTED_HEIGHT);
  removePublicFile(response.body.data.data.path);

  done();
});
