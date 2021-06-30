const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');    
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname , 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// //middleware1
// app.use(function(req,res,next){
//     req.name = "Deepam";
//     // console.log("middleware1 called");
//     next();
// });

// //middleware2
// app.use(function(req,res,next){
//     console.log(req.name);
//     next();
// });

var contactList = [
    {
        name: "Deepam",
        phone: "8979261311"
    },
    {
        name: "Darshita",
        phone: "8279891973"
    },
    {
        name: "Joey Tribianni",
        phone: "1100220035"
    }
]

app.get('/',function(req,res){
    console.log(req.name);
    return res.render('home',{
        title: "My Contacts list",
        contacts_list: contactList
    });
});


app.post('/create-contact',function(req,res){
   contactList.push({
       name: req.body.name,
       phone: req.body.phone
   });

   return res.redirect('/');
});

//using string param
// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params);
//     let phone=req.params.phone;
// })




//using query
app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let phone = req.query.phone;

    let contactsIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactsIndex!= -1){
        contactList.splice(contactsIndex,1);
    }

    return res.redirect('back');
    })



app.listen(port,function(err){
    if(err){
        console.log("Error in ",err);
    }
    else{
        console.log("Running on port",port);
    }
});