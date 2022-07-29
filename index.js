const express = require('express');
const mongooose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');


const mongoURI = process.env.MONGO_URI;

mongooose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log(err);
    }
);


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// the form schema
const formSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

// new model usinng the form schema
Form = mongooose.model('Form', formSchema);


app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const form = new Form({
        name: name,
        email: email,
        message: message
    });

    form.save((err, form) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                message: 'Form submitted successfully'
            });
        }
    });
});

app.get('/', (req, res) => {
    Form.find({}, (err, forms) => {
        if (err) {
            console.log(err);
        } else {
            res.json(forms);
        }
    });
});





const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('server is running on port 3000');
});