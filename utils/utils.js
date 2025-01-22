
const jwt = require('jsonwebtoken')

const tokenGenerate = (payload, isRefreshToken) => {
    if (isRefreshToken) {
        return jwt.sign(payload, process.env.secretRefresh, { 
            expiresIn: '60min',
        })

    }
    return jwt.sign(payload, process.env.secretword, { 
        expiresIn: '10min',
    })
}

module.exports = { tokenGenerate}