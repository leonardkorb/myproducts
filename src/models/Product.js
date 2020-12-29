const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    urlContact: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: {
        name: String,
        size: Number,
        key: String,
        url: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
});

ProductSchema.pre('save', function() {
    if (!this.image.url) {
        this.image.url = `${process.env.APP_URL}/files/${this.image.key}`;
    }
});

ProductSchema.pre('remove', function() {
    if (process.env.STORAGE_TYPE === "s3") {
        return s3.deleteObject({
            Bucket: process.env.AWS_BUCKET,
            Key: this.image.key,
        }).promise();
    } else {
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.image.key))
    }
});

ProductSchema.plugin(mongoosePaginate);

module.exports =  mongoose.model('Product', ProductSchema);