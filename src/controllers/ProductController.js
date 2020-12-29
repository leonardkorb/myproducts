const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const product = await Product.paginate({}, { page, limit: 10 });

        return res.json(product);
    },

    async show(req, res) {
        const product = await Product.findById(req.params.id);

        return res.json(product);
    },

    async store(req, res) {
        const { originalname: name, size, key, location: url = '' } = req.file;
        const { title: title, description: description } = req.body;
    
        const post = await Product.create({
            title,
            description,
            image: {
                name,
                size,
                key,
                url
            }
        });
        return res.json({ post })
    },

    async update(req, res) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(product);
    },

    async destroy(req, res) {
        const product = await Product.findById(req.params.id)
        
        await product.remove();

        return res.send();
    }
}
