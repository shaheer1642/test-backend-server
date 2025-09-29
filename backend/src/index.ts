import express from 'express'
const app = express()
const port = 3000

var users = [
    { name: 'jack', height: 180, type: 'customer' },
    { name: 'mark', height: 175, type: 'customer' },
    { name: 'spark', height: 160, type: 'admin' },
]

app.use(express.json())

// fetch users
app.get('/api/users', (req, res) => {
    const requestedType = req.query.type;
    console.log('client requested for type', requestedType)

    if (requestedType) {
        res.json(users.filter(user => user.type === requestedType))
    } else {
        res.json(users)
    }
})

// create user
app.post('/api/users', (req, res) => {
    console.log(req.body)

    users.push(req.body)

    res.json({ message: 'User has been created' })
})

// update user
app.patch('/api/users/:name', (req, res) => {
    const name = req.params.name;
    const data = req.body;

    users = users.map(user => {
        if (user.name === name) {
            const newUser = {
                name: data.name || user.name,
                height: data.height || user.height,
                type: data.type || user.type
            }
            return newUser;
        } else {
            return user;
        }
    })

    res.json({ message: `User ${name} has been updated` })
})

// delete user
app.delete('/api/users/:name', (req, res) => {
    console.log(req.params)

    const name = req.params.name

    users = users.filter(user => user.name !== name)

    res.json({ message: `User ${name} has been deleted` })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})