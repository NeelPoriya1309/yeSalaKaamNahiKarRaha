const dbConnect = require("../../../lib/mongoose");

export default handler = async (req, res) => {
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
