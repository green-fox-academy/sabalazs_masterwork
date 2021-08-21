/* eslint-disable */
import mongoose from 'mongoose';
import connectDB from './src/db';
import User from './src/models/User';
import Product from './src/models/Product';
import ProductImage from './src/models/ProductImage';
import Order from './src/models/Order';
import ProductLabel from './src/models/ProductLabel';

let customerId;
const products = [
  {
    name: 'Vajas croissant',
    price: 450,
    imageFile: 'example-vajas-croissant.jpg',
    labels: ['új termék'],
  },
  {
    name: 'Sós perec',
    price: 390,
    imageFile: 'example-sos-perec.jpg',
    labels: ['vegán', 'akciós'],
  },
  {
    name: 'Kenyér - 1kg',
    price: 690,
    imageFile: 'example-kenyer-1kg.jpg',
    labels: [],
  },
  {
    name: 'Magos vekni',
    price: 750,
    imageFile: 'example-magos-vekni.jpg',
    labels: [],
  },
  {
    name: 'Kakaós csiga',
    price: 350,
    imageFile: 'example-kakaos-csiga.jpg',
    labels: [],
  },
  {
    name: 'Fánk',
    price: 390,
    imageFile: 'example-fank.jpg',
    labels: ['akciós'],
  },
  {
    name: 'Túrós batyu',
    price: 450,
    imageFile: 'example-turos-batyu.jpg',
    labels: ['új termék', 'akciós'],
  },
  {
    name: 'Meglepetés kosár',
    price: 1990,
    imageFile: 'example-meglepetes-kosar.jpg',
    labels: [],
  },
];

const productLabels = [
  {
    name: 'vegán',
  },
  {
    name: 'akciós',
  },
  {
    name: 'új termék',
  },
];

async function createUsers() {
  const admin = {
    email: 'admin@admin.admin',
    password: 'Password123',
    role: 'admin',
  };
  const customer = {
    email: 'customer@customer.customer',
    password: 'Password123',
  };

  await User.create(admin);
  console.log(`admin test user created. email: ${admin.email} | password: ${admin.password} `);
  customerId = await User.create(customer);
  console.log(`customer test user created. email: ${customer.email} | password: ${customer.password} `);
}

async function createProductLabels() {
  for (const label of productLabels) {
    await ProductLabel.create(label);
    console.log(`${label.name} product label created.`);
  }
}

async function createProducts() {
  for (const product of products) {
    const createdProduct = await Product.create({
      name: product.name,
      price: product.price,
      labels: [...product.labels],
    });
    product.id = createdProduct._id;

    const productImage = await ProductImage.create({
      url: `${process.env.IMG_SERVER_BASE_URL}/${product.imageFile}`,
      path: process.env.IMG_SERVER_STORAGE_PATH + product.imageFile,
      product: mongoose.Types.ObjectId(product.id),
    });

    await Product.findByIdAndUpdate(product.id, { image: productImage._id });
    console.log(`product has been created: ${product.name}`);
  }
}
async function createOrders() {
  const order1 = await Order.create({
    customer: customerId._id,
    items: [
      {
        product: products[0].id,
        quantity: 1,
        name: products[0].name,
        price: products[0].price,
      },
    ],
    sum: products[0].price,
  });
  order1.status = 'fulfilled';
  await order1.save();
  const order2 = await Order.create({
    customer: customerId._id,
    items: [
      {
        product: products[2].id,
        quantity: 3,
        name: products[2].name,
        price: products[2].price,
      },
    ],
    sum: products[2].price * 3,
  });
  order2.status = 'accepted';
  await order2.save();
  await Order.create({
    customer: customerId._id,
    items: [
      {
        product: products[4].id,
        quantity: 2,
        name: products[4].name,
        price: products[4].price,
      },
    ],
    sum: products[4].price * 2,
  });
  console.log('Orders have been created');
}

async function seedDB() {
  await connectDB();
  await mongoose.connection.db.dropDatabase();
  await connectDB();
  await createUsers();
  await createProductLabels();
  await createProducts();
  await createOrders();
  await mongoose.connection.close();
}

try {
  seedDB();
} catch (err) {
  console.error(err);
}
