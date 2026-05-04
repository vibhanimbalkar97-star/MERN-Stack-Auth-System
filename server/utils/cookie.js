const setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",//only https
    sameSite: "strict" ,//CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000 //7days
  })
}

const clearRefreshTokenCookie  = (res) => {
  res.clearCookie("refreshToken", {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     sameSite:"strict",
     maxAge: 7 * 24 * 60 * 60 * 1000 //7days
  })
}

module.exports = {setRefreshTokenCookie, clearRefreshTokenCookie }