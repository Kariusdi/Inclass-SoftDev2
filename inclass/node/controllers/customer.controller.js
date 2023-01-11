const customer = require('../models/customer.js')

exports.index = (req, res) => {
    res.send('<h1>Customer Application</h1><hr><a href = "/api/customer">Customer list</a></hr>')
}

exports.findAll = (req, res) => {
    customer.find().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        })
    })
}

exports.findById = (req, res) => {
    customer.findById(req.params.customerId).then(data => {
        if(!data){
            return res.status(404).json({
                msg: "Not found Record : " + req.params.customerId
            })
        }
        res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "Something went wrong cause by : " + err.message
        })
    })
}

exports.create = (req, res) => {
    const c = new customer(req.body)

    c.save().then(data => {
        res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "Can't create new data cause by : " + err.message
        })
    })
}

exports.update = (req, res) => {
    customer.findByIdAndUpdate(req.params.customerId, {$set: req.body}, {new: true}).then(data => {
        if(!data){
            return res.status(404).json({
                msg: "Not found Record : " + req.params.customerId
            })
        }
        res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "Can't update data cause by : " + err.message
        })
    })
}

exports.delete = (req, res) => {
    customer.findByIdAndDelete(req.params.customerId).then(data => {
        if(!data){
            return res.status(404).json({
                msg: "Not found Record : " + req.params.customerId
            })
        }
        res.json({msg: "Delete data successfully!"})
    }).catch(err => {
        return res.status(500).json({
            msg: "Can't delete data cause by : " + err.message
        })
    })
}