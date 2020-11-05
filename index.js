const express = require('express')

const app = express()

app.get('/api/test', (req, res) => {
    res.send('hello', process.env.NODE_ENV)
})

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(5000, () => {
    console.log('server running')
})