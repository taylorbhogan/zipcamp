const AWS = require("aws-sdk");
const multer = require("multer");

const NAME_OF_BUCKET = "zipcamp-by-taylorbhogan";
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const singlePublicFileUpload = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  // name of the file in S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
    ACL: "public-read",
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in bucket as the key in your database to retrieve for later
  return result.Location;
};

const singlePublicFileDelete = async (Key) => {
  const params = {
    Bucket: NAME_OF_BUCKET,
    Key
  }

  try {
    await s3.headObject(params).promise()
    console.log("File Found in S3")

  } catch (err) {
    console.log("File not Found ERROR : " + err.code)
  }

  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log("err",err, err.stack)
    } else {
      console.log("data",data);
      // s3.getObject(params, function (err, data) {
      //   if (err) {
      //     console.log("getObject err",err,err.stack);
      //   } else {
      //     console.log("getObject data", data);
      //     return data;
      //   }
      // })
    }
  }).promise()

}

const multiplePublicFileUpload = async (files) => {
  return await Promise.all(
    files.map((file) => {
      return singlePublicFileUpload(file);
    })
  );
};


const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const singleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).single(nameOfKey);
const multipleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).array(nameOfKey);

module.exports = {
  s3,
  singlePublicFileUpload,
  multiplePublicFileUpload,
  singleMulterUpload,
  multipleMulterUpload,
  singlePublicFileDelete
};
