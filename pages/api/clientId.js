export default (req, res) => {
  res.status(200).send(process.env.CLIENT_ID);
};
