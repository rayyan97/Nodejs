const https = require('https')
const hbs = require('hbs')
const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000
const view_path = path.join(__dirname,'../template/views')
const partials_path = path.join(__dirname,'../template/partials')

const public_path = path.join(__dirname,'../public')

app.use(express.static(public_path))

app.set('view engine','hbs')

app.set('views',view_path)
hbs.registerPartials(partials_path)

app.get('',(req,res)=>{
  res.render('index',{title:'Home page'})
})
app.get('/about',(req,res)=>{
  res.render('about',{title:'About page'})
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
   return res.send({error:'You must provide a address '})
  }

  const city = req.query.address
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=fa05299de82c47d7eb727c56204e281c&units=metric';
  
     //axios.get(url)
    //.then(response => res.send//({success : true , response: //response.data}))
   // .catch(error => res.send//({success : false , message: //error.message}))
   
   const request = https.request(url, (response) => {
 let data = ''
 response.on('data', (chunk) => {
 data = data + chunk.toString()
 })
 response.on('end', () => {
 const body = JSON.parse(data)
 res.send(body)
 })
})
request.on('error', (error) => {
 res.send('An error', error)
})
request.end()


  
})








app.get('*',(req,res)=>{
  res.render('404-page',{title:'404 page '})
})

app.listen(port,()=>{
  console.log('Server is up and listening on port 3000')
})