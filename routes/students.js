const express = require('express');
const router = express.Router();
const students = [{id:1, name:"Sheetal"}, {id:2, name:"Nil"}];
const Joi = require('joi');
                
router.get('/', (req,res) => {
    res.send(students);
});

router.get('/:id', (req,res) => {
    const id = Number(req.params.id);
    const student = students.find(student => student.id === id);
    
    if(!student) {
        return res.status(404).send('Not found');
    }
    res.send(student);
});

router.post('/', (req,res) =>  {
    const student = {
        id:students.length + 1,
        name: req.body.name
    };
    students.push(student);
    res.send(student);
});

router.put('/:id', (req,res) => {
    const id = Number(req.params.id);
    const student = students.find(student => student.id === id);
    if(!student) {
        return res.status(404).send(`Record with id ${id} does  not exist`);
    }

    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required()
    });
    //const obj = schema.validate(req.body);
    const { error } = schema.validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const index = students.findIndex(students => student.id === id);
    students[index].name = req.body.name;
    res.send({id: student.id});
});

router.delete('/:id', (req,res) =>  {
    const id = Number(req.params.id);
    const index = students.findIndex(student => student.id === id) ?? null;
    if(index === -1) {
        return res.status(404).send('Not found');
    }
    students.splice(index,1);
    res.send({id});
});

module.exports = router;