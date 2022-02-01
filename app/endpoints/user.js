
module.exports = (app) => {

    const db = app.get('db');
    const user = new db.Schema({
      'email': String,
      'password': String,
      });
    const userModel = db.model('User', user );
  
    app.post('/user', async(req, res) => {
      try {
        const newAssociate = req.body;
        await new userModel(newAssociate).save();
        res.send({message:'CREATED'});
      } catch (error) {
        console.log(error);
        throw err;
      }
      
    });
  
    app.get('/user/email/:email', async (req, res) => {
      // const find = schema.find({name: 'hola'})
      try {
        const { email } = req.params;
        const find = await userModel.find({email: email});
        res.send(find);
      } catch(err) {
        console.log(err);
        throw err;
      }
    });
  
    app.post('/user/login', async (req, res) => {
      // const find = schema.find({name: 'hola'})
      try {
        const { email, password } = req.body;
        const find = await userModel.find({email: email, password: password});
        if(find.length > 0) {
          res.send('SUCCESS');
        } else {
          res.send('USER_FOUDNT');
        }
       
      } catch(err) {
        console.log(err);
        throw err;
      }
    });

    app.get('/user/all', async(req, res) => {
      try{
        const find = await userModel.find({});
        res.send(find);
      }
      catch(err){
        console.log(err);
        throw err;
      }
    })
    app.patch('/user/:id', async (req, res) => {
      try {
        const toupdate = req.body;
        const { id } = req.params;
        const updated = await userModel.findByIdAndUpdate(id, toupdate);
        res.send({message: 'UPDATED'});
      }catch(err) {
        console.log(err);
        throw err;
      }
    });
    app.delete("/user/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const deleted = await userModel.findByIdAndDelete(id);
        res.send({message: 'DELETED'});
      }catch(err) {
        console.log(err);
        throw err;
      }
    })
  };