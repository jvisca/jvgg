const { PrismaClient } = require('@prisma/client')
const { body, validationResult, param} = require('express-validator');

const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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

    await prisma.turn.deleteMany({
      where: { userDni: parseInt(dni) }
    });

    await prisma.users.delete({
      where: { dni: parseInt(dni) },
    });

    res.status(200).json({ message: 'User successfully deleted.' });
  } 
  catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.status(400).json({ error: 'Error deleting user.' });
    }
  }
});

//----------------------------------------------

app.get("/api/v1/trainers", async (req, res) => {
  try{
    const trainers = await prisma.trainer.findMany()
    if (trainers.length === 0){
      res.sendStatus(204)
      
      return
    }

    res.json(trainers)
  } 
  catch (error) {
    res.status(500).send({ error: "Internal server error"})
    }
})

app.get("/api/v1/trainer/:dni", param('dni').isLength({min:7}), async (req,res) => {
  try{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.sendStatus(400)
    }

    const trainer = await prisma.trainer.findUnique({
      where:{
        dni: parseInt(req.params.dni)
      }
    })
    
    if (trainer === null){
      return res.sendStatus(404)
    }
    res.json(trainer)
  }
  
  catch (error){
    res.status(500).send({ error: "Internal server error"})
  }
})


app.post("/api/v1/trainer", [body('dni').isLength({min:7}).isNumeric().notEmpty(), body('name').notEmpty(), body('activity').notEmpty(),body('timeSlot').notEmpty(), body('age').notEmpty(), body('gender').notEmpty()], async (req, res) => {
  try{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.sendStatus(400)
    }
    
    const trainer_dni = await prisma.trainer.findUnique({
      where: {
        dni: req.body.dni
      }
    })

    if (trainer_dni) {
      return res.sendStatus(409)
    }

    const trainer = await prisma.trainer.create({
      data: {
        dni: req.body.dni,
        name: req.body.name,
        activity: req.body.activity,
        timeSlot: req.body.timeSlot,
        age: req.body.age,
        gender: req.body.gender
      }
    })
    res.status(201).send(trainer)
  }
  catch (error) {
    res.sendStatus(500)
  }
})

app.delete("/api/v1/trainer/:dni",[param('dni').notEmpty()], async (req, res) => {
  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.sendStatus(400)
    }
    
    const trainer = await prisma.trainer.findUnique({
      where: {
        dni: parseInt(req.params.dni)
      }
    });

    if (trainer === null){
      res.sendStatus(404)
      return
    }

    await prisma.turn.deleteMany({
      where: { trainerDni:parseInt(req.params.dni) }
    });

    await prisma.trainer.delete({
      where:{
        dni: parseInt(req.params.dni)
      }
    });

    res.send(trainer)
  }
  catch (error) {
    res.status(500).send({ error: "Internal Server Error" })
  }
})

app.put("/api/v1/trainer/:dni", [param('dni').isLength({min:7}).isNumeric().notEmpty(), body('name').notEmpty(), body('activity').notEmpty(), body('timeSlot').notEmpty(), body('age').notEmpty(), body('gender').notEmpty()], async (req,res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.sendStatus(400)
    }

    const turno = await prisma.turn.findMany({
      where: {
        trainerDni: parseInt(req.params.dni)
      }
    })

    if (turno.length > 0){
      await prisma.turn.deleteMany({
        where: {
          trainerDni: parseInt(req.params.dni)
        }
      })
    }

    let trainer = await prisma.trainer.findUnique({
      where: {
        dni: parseInt(req.params.dni)
      }
    })
    if (trainer === null){
      res.sendStatus(404)
      return
    }

    trainer = await prisma.trainer.update({
      where: {
        dni: trainer.dni
      },
      data: {
        name: req.body.name,
        activity: req.body.activity,
        timeSlot: req.body.timeSlot,
        age: req.body.age,
        gender: req.body.gender
      }
    })
    res.send(trainer)
  }
  catch (error) {
    res.status(500).send({ error: "Internal Server Error" })
  }
})

//-----------------------------------------------------------------------------------

app.post("/api/v1/turn", [body('userDni').isLength({min:7}).isNumeric().notEmpty(), body('activity').notEmpty(),body('trainerDni').notEmpty(), body('timeSlot').notEmpty(), body('timesPerWeek').notEmpty().isNumeric()], async (req, res) => {
  try{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.sendStatus(400)
    }

    const turn = await prisma.turn.create({
      data: {
        userDni: req.body.userDni,
        activity: req.body.activity,
        trainerDni: req.body.trainerDni,
        timeSlot: req.body.timeSlot,
        timesPerWeek: req.body.timesPerWeek 
      }
    })
    res.status(201).send(turn)
  }
  catch (error) {
    console.error(error)
    res.status(500).send({ error: "Internal Server Error", details: error.message })
  }  
})

app.put("/api/v1/turns/:id", [body('userDni').isLength({min:7}).isNumeric().notEmpty(), body('activity').notEmpty(), body('trainerDni').isLength({min:7}).isNumeric().notEmpty(), body('timeSlot').notEmpty(), body('timesPerWeek').notEmpty().isNumeric()], async (req,res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.sendStatus(400)
    }

    let turn = await prisma.turn.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    
    if (turn === null){
      return res.sendStatus(404)
    }
    
    turn = await prisma.turn.update({
      where: {
        id: turn.id
      },
      data: {
        userDni: req.body.userDni,
        activity: req.body.activity,
        trainerDni: req.body.trainerDni,
        timeSlot: req.body.timeSlot,
        timesPerWeek: req.body.timesPerWeek
      }
    })
    res.send(turn)
  }
  catch (error) {
    console.error(error)
    res.status(500).send({ error: "Internal Server Error", details: error.message })
  }
})

app.get('/turns', async (req, res) => {
  try {
    const turns = await prisma.turn.findMany(); 
    res.status(200).json(turns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los turnos' });
  }
});

app.get('/users/:dni/turns', async (req, res) => {
  const { dni } = req.params; 
  try {
    const turns = await prisma.turn.findMany({
      where: { userDni: parseInt(dni) },
    });

    if (turns.length === 0) {
      return res.status(404).json({ error: 'No se encontraron turnos para este usuario' });
    }

    res.status(200).json(turns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los turnos del usuario' });
  }
});

app.delete('/turns/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTurn = await prisma.turn.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Turno eliminado correctamente', deletedTurn });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }

    res.status(500).json({ error: 'Error al eliminar el turno' });
  }
});