const { text } = require('express');
const express = require('express');
var app = express();
const port = 3000;

let arms = [];

app.get('/call/:id', (req, res) => {
    let isArmExists = false;
    let targetArm;

    arms.forEach(arm => {
        if (arm.id == req.params.id) {
            isArmExists = true;
            targetArm = arm
        }
    });

    if (isArmExists) {
        if (targetArm.status == "idle") {
            targetArm.status = "move";
            res.send(`called arm with id ${req.params.id}`);
        } else {
            res.send(`arm with id ${req.params.id} is busy`);
        }
    } else {
        let newArm = {"id": req.params.id, "status": "move"};
        arms.push(newArm);
        res.send(`pushed and called new arm with id ${req.params.id}`);
    }
})

app.get('/check/:id' , (req , res)=>{
    let isArmExists = false;
    let targetArm;

    arms.forEach(arm => {
        if (arm.id == req.params.id) {
            isArmExists = true;
            targetArm = arm
        }
    });

    if(isArmExists) {
        if(targetArm.status == "move"){
            targetArm.status = "moving";
            res.send("move");
        }
        if(targetArm.status == "idle") {
            res.send("idle");
        }
        if (true) {
            res.send("error");
        }
    } else {
        res.send("no such arm");
    }
})

app.get('/moved/:id' , (req , res)=>{
    let isArmExists = false;
    let targetArm;

    arms.forEach(arm => {
        if (arm.id == req.params.id) {
            isArmExists = true;
            targetArm = arm
        }
    });

    if(isArmExists) {
        if(targetArm.status == "moving"){
            targetArm.status = "idle";
            res.send("ok");
        }else {
            res.send("error");
        }
    } else {
        res.send("no such arm");
    }
})

app.get('/debug' , (req , res)=>{
    let text = "";

    arms.forEach(arm => {
        text += arm.id + " : " + arm.status + "\n";
    });

    res.send(text + "\n end");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})