const { PrismaClient } = require('@prisma/client');

const express = require('express')
const app = express()
const port = 3000

const prisma = new PrismaClient();

app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.post('/register', async (req, res) => {
  const { dni, name, email, gender, age, cellphone } = req.body;

  if (!dni || !name || !email || gender === undefined || !age || !cellphone) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    
    const existingUser = await prisma.users.findUnique({
      where: { dni },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'A user with this DNI is already registered.' });
    }

    const newUser = await prisma.users.create({
      data: {
        dni,
        name,
        email,
        gender,
        age,
        cellphone,
      },
    });

    return res.status(201).json({ message: 'User successfully registered.', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/user/:dni', async (req, res) => {
  const { dni } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: { dni: parseInt(dni) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching user.' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.users.findMany(); 
    res.status(200).json(users); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users.' });
  }
});

app.put('/user/:dni', async (req, res) => {
  const { dni } = req.params;
  const { name, email, gender, age, cellphone } = req.body;

  try {
    const updatedUser = await prisma.users.update({
      where: { dni: parseInt(dni) },
      data: {
        name,
        email,
        gender,
        age,
        cellphone,
      },
    });

    res.status(200).json({ message: 'User successfully updated.', updatedUser });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.status(400).json({ error: 'Error updating user.' });
    }
  }
});

app.delete('/user/:dni', async (req, res) => {
  const { dni } = req.params;
  try {
    await prisma.users.delete({
      where: { dni: parseInt(dni) },
    });
    res.status(200).json({ message: 'User successfully deleted.' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.status(400).json({ error: 'Error deleting user.' });
    }
  }
});
