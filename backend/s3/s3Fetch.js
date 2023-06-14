const AWS = require("aws-sdk");

// Configure AWS with your access and secret key.
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY, // Replace with your access key
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your secret key
  region: process.env.AWS_REGION, // Replace with your region
});

const getBucketObjects = async () => {
  const params = {
    Bucket: "wav-local-songs",
  };

  try {
    const data = await s3.listObjects(params).promise();

    return data.Contents;
  } catch (error) {
    console.log("Error in getBucketObjects", error);
    return [];
  }
};

const getSongsData = async () => {
  const objects = await getBucketObjects();
  const songsArr = await Promise.all(
    objects.map(async (object) => {
      const params = {
        Bucket: "wav-local-songs",
        Key: object.Key,
      };

      try {
        const metadata = await s3.headObject(params).promise();

        return {
          id: object.Key, // or another way of assigning unique id
          title: metadata.Metadata.title,
          artist: metadata.Metadata.artist,
          album: metadata.Metadata.album,
          cover: metadata.Metadata.cover,
          path: s3.getSignedUrl("getObject", params), // The path is now the URL to the song on S3
        };
      } catch (error) {
        console.log("Error in getSongsData for object: ", object.Key, error);
        return null;
      }
    })
  );

  return songsArr.filter((song) => song !== null); // This will remove failed songs from the array
};

module.exports = { getSongsData };
