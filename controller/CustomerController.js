const CustomersSchema = require('../model/CustomerSchema')

const create = (req, res) => {
    try {
        let customerSchema = new CustomersSchema({
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary
        });
        customerSchema.save()
            .then(result => res.status(201).json({'message': 'Customer Saved'}))
            .catch(error => res.status(500).json({'message': 'Something went wrong', error: error}))
    } catch (e) {
        res.status(500).json({'message': 'Something went wrong', error: e});
    }
}
const findOneById = (req, res) => {
    try {
        const customerId = req.params.id;
        CustomersSchema.findById(customerId)
            .then(result => {
                if (result) {
                    res.status(200).json({'data': result})
                } else {
                    res.status(404).json({'message': "Customer not found"})
                }
            })
            .catch(error => res.status(500).json({'message': 'Something went wrong', error: error}))
    } catch (e) {
        res.status(500).json({'message': 'Something went wrong', error: e})
    }
}
const deleteOneById = (req, res) => {
    try {
        const customerId = req.params.id;
        CustomersSchema.findByIdAndDelete(customerId)
            .then(result => res.status(200).json({'message': 'Customer Deleted'}))
            .catch(error => res.status(500).json({'message': 'Something went wrong', error: error}))
    } catch (e) {
        res.status(500).json({'message': 'Something went wrong', error: e})
    }
}
const updateById = (req, res) => {
    try {
        const customerId = req.params.id;
        CustomersSchema.findByIdAndUpdate(customerId,{
            name:req.body.name,
            address:req.body.address,
            salary:req.body.salary
        })
            .then(result => res.status(201).json({'message': 'Customer Updated'}))
            .catch(error => res.status(500).json({'message': 'Something went wrong', error: error}))
    } catch (e) {
        res.status(500).json({'message': 'Something went wrong', error: e})
    }
}
const search = (req, res) => {
    try {
        const searchText = req.query.searchText || '';
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const query={
            $or:[
                {name:new RegExp(searchText,'i')},
                {address:new RegExp(searchText,'i')}
            ]
        };

        CustomersSchema.find(query)
            .skip((page-1)*size)
            .limit(size)
            .then(result => res.status(200).json({'data': result}))
            .catch(error => res.status(500).json({'message': 'something went wrong', error: error}))
    } catch (e) {
        res.status(500).json({'message': 'something went wrong', error: e});
    }
}

module.exports = {create, findOneById, deleteOneById, updateById, search}
