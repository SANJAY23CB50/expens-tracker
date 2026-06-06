const express =require('express');
const app = express();
const PORT = 3000;


app.use(express.json());
app.get('/',(req,res)=>{
    res.send('expense tracker api is running ');

});
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});