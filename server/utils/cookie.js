const setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",//only https
    sameSite: "strict" //CSRF protection
  })
}

const clearRefreshTokenCookie  = (res) => {
  res.clearCookie("refreshToken", {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     sameSite:"strict"
  })
}

module.exports = {setRefreshTokenCookie, clearRefreshTokenCookie }