const Person = require('../model/personModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const addPerson = async (req, res) => {
    const { userName, email, password, phone, location } = req.body;
    try {
        let person = await Person.findOne({ userName });
        if (person) {
            res.status(400).json({ message: "This user already exists" });
        } else {
            let newPerson = new Person({ userName, email, password, phone, location });
            await newPerson.save();
            res.status(200).json({ message: "Added" });
        }
    } catch (error) {
        res.status(500).json({ message: "Sonthing went wrong" });
    }
}


const signIn = async (req, res) => {
    const { userName, password } = req.body;
    try {
        let user = await Person.findOne({ userName });
        console.log(user.password)
        console.log(password)
        if (!user) {
            res.status(400).json({ message: "This user does mot exist" });
        } else {
            let match = await bcrypt.compare(password, user.password);
            if (match) {
                let token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY);
                res.status(200).json({ message: "Success", token });
            }
            else {
                res.status(422).json({ message: "Password invalid" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Somthing went wrong" });
    }
}

const updatePerson = async (req, res) => {
    const { userName, email, password, phone, location, role } = req.body;
    const { id } = req.params;
    const hashedpassword = await bcrypt.hash(password, process.env.SALTROUNDS);
    const userNameTaken = await Person.findOne({ userName });
    const user = await Person.findById({ _id: id }).catch(error => { return });
    if (!user) {
        res.status(400).json({ message: "Please enter a valid ID" })
    }
    else if (userNameTaken) {
        res.status(400).json({ message: "This username is already taken" })
    }
    else if (!user && userNameTaken) {
        res.status(400).json({ message: "Please enter a valid ID" })
    }
    else {
        await Person.findByIdAndUpdate({ _id: id }, { userName, email, password: hashedpassword, phone, location, role })
            .then(re => res.status(200).send({ message: "Updated successfully" }))
            .catch((error) => {
                res.status(500).json({ message: "Something went wrong" })
            })
    }
}

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;
    const hashedpassword = await bcrypt.hash(newPassword, process.env.SALTROUNDS);
    const user = await Person.findById({ _id: id }).catch(error => { return });
    if (!user) {
        res.status(400).json({ message: "Please enter a valid ID" })
    }
    else {
        let match = await bcrypt.compare(oldPassword, user.password);
        if (match) {
            await Person.findByIdAndUpdate({ _id: id }, { password: hashedpassword })
                .then(re => res.status(200).send({ message: "Updated successfully" }))
                .catch((error) => {
                    res.status(500).json({ message: "Something went wrong" })
                })
        }
        else {
            res.status(422).json({ message: "Password invalid" })
        }

    }
}


const updateDeactivated = async (req, res) => {
    const { id } = req.params;
    const user = await Person.findById({ _id: id }).catch(error => { return });
    if (!user) {
        res.status(400).json({ message: "Please enter a valid ID" })
    }
    else {
        await Person.findByIdAndUpdate({ _id: id }, { deactivated: !user.deactivated })
            .then(re => res.status(200).send({ message: "Updated successfully" }))
            .catch((error) => {
                res.status(500).json({ message: "Something went wrong" })
            })
    }
}

const addAdmin = async (req, res) => {
    const { userName, email, password, phone, location } = req.body;
    try {
        let person = await Person.findOne({ userName });
        if (person) {
            res.status(400).json({ message: "This username is already taken" });
        } else {
            let newPerson = new Person({ userName, email, password, phone, location, role: 'admin' });
            await newPerson.save();
            res.status(200).json({ message: "Added successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Somthing went wrong" });
    }
}

const getAllUser = async (req, res) => {
    await Person.find({ role: 'user' })
        .then(data => res.status(200).send({ message: data }))
        .catch(error => {
            res.status(500).json({ message: "Something went wrong" })
        })
}

const getAllAdmin = async (req, res) => {
    await Person.find({ role: 'admin' })
        .then(data => res.status(200).send({ message: data }))
        .catch(error => {
            res.status(500).json({ message: "Something went wrong" })
        })
}



module.exports = {
    addPerson,
    signIn,
    updatePerson,
    updatePassword,
    updateDeactivated,
    addAdmin,
    getAllUser,
    getAllAdmin,
};