const { text } = require('express');
const express = require('express');
var app = express();
const port = 3000;

let arms = [];

app.use('/public', express.static(process.cwd() + '/public'));

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
        // if (targetArm.status == "idle") {
        //     targetArm.status = "move";
        //     res.send(`called arm with id ${req.params.id}`);
        // } else {
        //     res.send(`arm with id ${req.params.id} is busy`);
        // }
        switch (targetArm.status) {
            case "idling": {
                targetArm.status = "move";
                res.send({"msg": `called arm to move`});
            };
                break;
            case "move": {
                res.send({"msg": `waiting arm to be moving`});
            };
                break;
            case "moving": {
                res.send({"msg": `arm is still moving`});
            };
                break;
            default: {
                res.send({"msg": `error call`});
            }
        }
    } else {
        let newArm = { "id": req.params.id, "status": "move" };
        arms.push(newArm);
        res.send(`pushed and called new arm with id ${req.params.id}`);
    }
})

app.get('/check/:id', (req, res) => {
    let isArmExists = false;
    let targetArm;

    arms.forEach(arm => {
        if (arm.id == req.params.id) {
            isArmExists = true;
            targetArm = arm
        }
    });

    if (isArmExists) {
        // if(targetArm.status == "move"){
        //     targetArm.status = "moving";
        //     res.send("move");
        // }
        // if(targetArm.status == "moving"){
        //     targetArm.status = "moving";
        //     res.send("move");
        // }
        // if(targetArm.status == "idle") {
        //     res.send("idle");
        // }
        // if (true) {
        //     res.send("error");
        // }
        switch (targetArm.status) {
            case "idling": {
                res.send({"msg": "idle"});
            };
                break;
            case "move": {
                targetArm.status = "moving";
                res.send({"msg": "move"});
            };
                break;
            case "moving": {
                targetArm.status = "idling";
                res.send({"msg": "idle"});
            };
                break;
            default: {
                res.send(`error check`);
            }
        }
    } else {
        res.send("no such arm");
    }
})

app.get('/debug', (req, res) => {
    // let text = "";

    // arms.forEach(arm => {
    //     text += arm.id + " : " + arm.status + "\n";
    // });

    // res.send(text + "\n end");

    res.send(arms);
})

app.get('/' , (req , res)=>{
    res.sendFile(process.cwd() + '/views/index.html');
})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})