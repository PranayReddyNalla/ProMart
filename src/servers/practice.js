const { request } = require('express');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const { MongoClient, ObjectId } = require("mongodb");
const uri ="mongodb+srv://user:root@cluster0.7h4sn3h.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db('Promart');

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));


 


//users 
  app.get('/users', async (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const users = database.collection('users');
    const user=await users.find({}).toArray();
    response.send(user);
  });
  app.post('/loginuser', async (req , res) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const users = database.collection('users');
    const user=await users.findOne({username : req.body.username})
    if(user==null){
      res.send({status : "invalidusername"})
    }
    else if(user.password!=req.body.password){
      res.send({status : "invalid password"})
    }
    else{
      res.send({status :"success"})
    }
  })
  app.post('/getuser', async (req , res) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const users = database.collection('users');
  const user=await users.findOne({username : req.body.username})
  res.send(user)
  }
  )

  app.post('/adduser', async (req , res) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const users = database.collection('users');

    const user=await users.findOne({username : req.body.username})
    if(user!=null){
      res.send({status : "alreadyusedusername"})
    }
    else{
      const user=await users.findOne({email : req.body.email})
      if(user!=null){
      res.send({status : "alreadyusedemail"})
      }
      else{
    users.insertOne(req.body)
    res.send({ status : "success"})
      }
  }
})

  app.post('/adduser', (req , res) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const users = database.collection('users');
    users.insertOne(req.body)
    res.send({ status : "success"})
  })

  app.get('/getProductList', async (request, response) => {
    const list= await database.collection("ProductList").find({}).toArray();
    response.send(list);
  }
  )
  
  app.post('/updateProduct', (req , res) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const ProdList= database.collection('ProductList');
    console.log(req.body)

    try
    {
      ProdList.updateOne
      (
        { title :req.body.title},
        {$set:{
          
          id : req.body.id,
          title : req.body.title,
          category : req.body.category,
          stock : req.body.stock,
          brand: req.body.brand,
          is_favourite: req.body.is_favourite,


        }},
        { upsert: true }
      );
    } 
    catch (e) {
   print(e);
    }
    res.send({ status : "success"})
  })

  app.post('/deleteProductList', (req , res) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const users = database.collection('ProductList');
    users.deleteOne({"id" : req.body.id})
    res.send({ status : "success"})
  })


  app.post('/addProduct', (req , res) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const users = database.collection('ProductList');
    users.insertOne(req.body)
    res.send({ status : "success"})
  })
 
  
  
  app.get('/getcategoryList', async (request, response) => {
    const list= await database.collection("Categorylist").find({}).toArray();
    response.send(list);
  }
  )

  app.post('/addcategorytoList', async (req , res) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const categoryList = database.collection('Categorylist');
    const category = await categoryList.findOne({categorycode : req.body.categorycode})
    if(category==null){
    categoryList.insertOne(req.body)
    res.send({ status : "success"})
    }
    else{
      res.send({status : "CodeIsNotUnique"})
    }
  })

  app.post('/updatecategory', (req , res) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const categoryList = database.collection('Category');
    categoryList.updateOne(
      {categorycode: req.body.categorycode},
      { $set: req.body}
      )})
  app.post('/deletecategory', async (req , res) =>{
        res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
        console.log(req.body)
        const categoryList = database.collection('Category');
        await categoryList.deleteOne({})
        res.send({status : "success"})})
  
            // app.get('/accounts/:id', (request, response) => {
            //   const accountId = Number(request.params.id);
            //   const getAccount = accounts.find((account) => account.id === accountId);
            
            //   if (!getAccount) {
            //     response.status(500).send('Account not found.')
            //   } else {
            //     response.json(getAccount);
            //   }
            // });

    //wishlist 
    // app.post('/getfavouriteList', async (request, response) => {
    //   const list= await database.collection("Favourite Products").findOne({user : request.body.username})
    //   console.log(list)
    //   response.send({status : "success"});
    // }
    // )
  
    app.post('/addcategorytoList', async (req , res) =>{
      res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
      const categoryList = database.collection('Categorylist');
      const category = await categoryList.findOne({categorycode : req.body.categorycode})
      if(category==null){
      categoryList.insertOne(req.body)
      res.send({ status : "success"})
      }
      else{
        res.send({status : "CodeIsNotUnique"})
      }
    })

    app.post('/getfavouriteList', async (request, response) => {
    console.log(request.body._id)

    const list= await database.collection("Favourite Products").find({userId : request.body._id}).toArray();
    response.send(list)
  })

  app.post('/addtofavouriteList', async (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:4200');
     database.collection("Favourite Products").insertOne(request.body)
     response.send({status : "success"})

  })

  app.post('/removefromfavouriteList', (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    database.collection("Favourite Products").deleteOne({})
   response.send({status : "success"})
 })
   
  
  // app.post('/getfavList',async(request,response)=>{
  //   favlist=[]
  // request.body.forEach(async element => {
  //  const product = await database.collection("ProductList").findOne({_id : element.productId})
  //  favlist.push(product)
  //    });

  //   response.send(favlist)
  //   })