const BUCKET_NAME = "sathishmybucketh";
var AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "AKIATXONLUNN5EJG477O",
  secretAccessKey: "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",
  Bucket: BUCKET_NAME,
});

var params = {
  Bucket: BUCKET_NAME,
  Delimiter: "",
  MaxKeys: "3",
};

var listfun = s3.listObjects(params, function (err, data) {
  if (err) console.log(err, err.stack);

  var Name = data;

  var i;
  for (i = 0; i < Name.Contents.length; i++) {
    //    console.log(Name.Contents[i].Key);
    console.log(
      "URL for the content: " +
        "https://sathishmybucketh.s3.ap-south-1.amazonaws.com/" +
        Name.Contents[i].Key
    );
  }
});

// s3.listObjects();
module.exports = { listfun };
