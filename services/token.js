import jwt from 'jsonwebtoken';
// GENERATE TOKEN
const generateToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return accessToken;
}
// GET USER ID FROM TOKEN
const getUserId = (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data.userId;
}
// CHECK IF TOKEN IS EXPIRED
const checkTokenIsEx = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return false
    } catch (error) {
        return true
    }
}

export { generateToken,getUserId ,checkTokenIsEx}