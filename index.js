const express = require('express')

const app = express()

app.get('/api/test', (req, res) => {
    res.send('hello')
})

if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/dist'))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(5000, () => {
    console.log('server running')
})