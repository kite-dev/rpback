
module.exports = (app) => {

    const db = app.get('db');
    const associate = new db.Schema({
      'asociate_of': String,
      'rut': String,
      'email': String,
      'cellphone': Number,
      'type': String,
      'number': Number,
      'bank_id': Number,
      'account_type_name': String,
      });
    const associateModel = db.model('Associate', associate );
  
    app.post('/associate', async(req, res) => {
      try {
        const newAssociate = req.body;
        await new associateModel(newAssociate).save();
        res.send({message:'CREATED'});
      } catch (error) {
        console.log(error);
        throw err;
      }
      
    });
  
    app.get('/associate/:userId', async (req, res) => {
      // const find = schema.find({name: 'hola'})
      try {
        const find = await associateModel.find({user_id: req.params.userId});
        res.send(find);
      } catch(err) {
        console.log(err);
        throw err;
      }
    });
  
    app.patch('/associate/:id', async (req, res) => {
      try {
        const toupdate = req.body;
        const { id } = req.params;
        const updated = await associateModel.findByIdAndUpdate(id, toupdate);
        res.send({message: 'UPDATED'});
      }catch(err) {
        console.log(err);
        throw err;
      }
    });
    app.delete("/associate/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const deleted = await associateModel.findByIdAndDelete(id);
        res.send({message: 'DELETED'});
      }catch(err) {
        console.log(err);
        throw err;
      }
    })
  };