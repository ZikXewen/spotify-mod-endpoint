export default ({ query }, res) => {
  var options = {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  var body = query.code
    ? {
        redirect_uri: "http://localhost:5000/callback",
        grant_type: "authorization_code",
        code: query.code,
      }
    : {
        grant_type: "refresh_token",
        refresh_token: query.refreshToken,
      };
  console.log(body);
  fetch("https://accounts.spotify.com/api/token", {
    ...options,
    body: new URLSearchParams(body),
  })
    .then((response) => response.json())
    .then(({ access_token, refresh_token }) =>
      res.status(200).json({
        refreshToken: refresh_token ? refresh_token : query.refreshToken,
        accessToken: access_token,
      })
    )
    .catch(console.error);
};
