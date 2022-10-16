const app=require('express')()
const httpProxy=require('http-proxy-middleware')
const cors=require('cors')
const csvtojson = require("csvtojson");
const formidable = require('formidable');
const itemModel=require('./items/items.entity')
const mongoose = require('mongoose');
swaggerUi=require('swagger-ui-express')
YAML=require('yamljs')
swaggerDocument=YAML.load('./bulk.yml')
app.use(cors({
   
    origin: '*',
    methods: ['GET', 'POST','PUT','DELETE']
  
}))

mongoose
  .connect("mongodb://127.0.0.1:27017/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
const userProxy=httpProxy.createProxyMiddleware({target:'http://localhost:8010',pathRewrite:{'^/appData':'/'}})
app.use('/appData',userProxy)
const discountProxy=httpProxy.createProxyMiddleware({target:'http://localhost:8030',pathRewrite:{'^/discountData':'/'}})
app.use('/discountData',discountProxy)

app.post('/bulkUpload',(req,res)=>{
    
    const formidable = require('formidable');
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
          if (err) {
            return res.status(400).json({
              error: 'file could not be uploaded',
            });
          }
          //console.log('------------------------------',files.file)
          csvtojson()
            .fromFile(files.file.filepath)
            .then(csvData => {//console.log(csvData)
              itemModel.insertMany(csvData, (err, rest) => {
                if (err) { console.log(err);return res.send({ error:    err }) }
                //console.log(err,rest)
                res.send({message:"Items uploaded Successfully"})
              });
            }
            );
        })
    }
    )
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




module.exports=app