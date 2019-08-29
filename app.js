const mongoose = require('mongoose');
const User = require('./models/User');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

////code to activate body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

///code to activate promises
mongoose.promise = global.Promise;


///for depreciation warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);


///code to connect to database
mongoose.connect('mongodb://localhost:27017/animals');

mongoose.connection
    .once('open', ()=>console.log('Connected to the chief'))
    .on('error', (err)=>{
        console.log(`Could not connect to the chief`, err);
    });

  ///route  
    app.get('/', (req, res)=>{
        res.send(`ROOT`);
    });


    ///////CREATE
    app.post('/user',(req, res)=>{
        const newUser = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: req.body.isActive

        });
        newUser.save().then(savedUser=>{
            res.send(`Saved by the p0stman ${req.body.firstName} and ${req.body.lastName} `);
        }).catch(err=>{
            res.status(404).send(err);
        });

    });


    //////READ
    app.get('/user', (req, res)=>{
        User.find({}).then(users=>{
            res.send(users);
        }).catch(err=>{
            res.status(404).send(err);
        });
    });



    ///////UPDATE
    app.patch('/user/:id', (req, res)=>{
        const id = req.params.id;
        const firstName = req.body.firstName;

        User.findByIdAndUpdate(id, {$set:{
            firstName: firstName,
        }}, {new:true}).then(savedUser=>{
            res.send(savedUser);
        }).catch(err=>{
            res.status(419).send(err);
        });

    });


    //////////DELETE
    app.delete('/user/:id', (req, res)=>{

       User.findById(req.params.id).then(user=>{

           user.remove().then(userRemoved=>{
                res.send(`${userRemoved.firstName} is DELETED!!!!!`);
           }).catch(err=>{res.send(err);});

       }).catch(err=>{res.send(err);});

    });




const port = 2121 || process.env.PORT;

app.listen(port, ()=>{
    console.log(`listening to  port: ${port}`);
});