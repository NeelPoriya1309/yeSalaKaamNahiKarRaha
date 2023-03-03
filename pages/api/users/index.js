const dbConnect = require("./mongoose");
const User = require("./../../../models/userModel");

const handler = async (req, res) => {
  await dbConnect();
  const users = await User.find({});

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

export default handler;
