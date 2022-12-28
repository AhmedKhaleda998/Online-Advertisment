const Advertisement = require('../model/advertisementModel');

const addAdvertisement = async (req, res) => {
    const { title, desc } = req.body;
    try {
        let advertisement = await Advertisement.findOne({ title });
        if (advertisement) {
            res.status(400).json({ message: "This title is already taken" });
        } else {
            let newAdvertisement = new Advertisement({ title, desc });
            await newAdvertisement.save();
            res.status(200).json({ message: "Success" });
        }
    } catch (error) {
        res.status(500).json({ message: "Somthing went wrong" + error });
    }
}

const updateAdvertisement = async (req, res) => {
    const { title, desc } = req.body;
    const { id } = req.params;
    const advertisement = await Advertisement.findById({ _id: id }).catch(error => { return });
    if (!advertisement) {
        res.status(400).json({ message: "Please enter a valid id" })
    }
    else {
        await Advertisement.findByIdAndUpdate({ _id: id }, { title, desc })
            .then(re => res.status(200).send({ message: "Success" }))
            .catch((error) => {
                res.status(500).json({ message: "Something went wrong" })
            })
    }
}

const deleteAdvertisement = async (req, res) => {
    const { id } = req.params;
    const advertisement = await Advertisement.findById({ _id: id }).catch(error => { return });
    if (!advertisement) {
        res.status(400).json({ message: "Please enter a valid id" })
    }
    else {
        await Advertisement.findByIdAndDelete({ _id: id })
            .then(re => res.status(200).send({ message: "Success" }))
            .catch(error => {
                if (error.name == "CastError") {
                    res.status(400).json({ message: "Please enter a valid id" })
                }
                else {
                    res.status(500).json({ message: "Something went wrong" })
                }
            })
    }
}

const getAdvertisement = async (req, res) => {
    await Advertisement.find({})
        .then(data => res.status(200).send({ message: data }))
        .catch(error => {
            res.status(500).json({ message: "Something went wrong" })
        })
}

module.exports = {
    addAdvertisement,
    getAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
}