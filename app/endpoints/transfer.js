
module.exports = (app) => {

  const db = app.get('db');
  const transferSchema = new db.Schema({
    'owner': String,
    'amount': String,
    'rut': String,
    'bank_name': String,
    'type_name': String,
    'name': String,
    });
  const transferModel = db.model('Transfer', transferSchema );

  app.post('/transfer', async(req, res) => {
    try {
      const newTransfer = req.body;
      console.log(newTransfer);
      await new transferModel(newTransfer).save();
      res.send({message:'CREATED'});
    } catch (error) {
      console.log(error);
      throw err;
    }
    
  });

  app.get('/transfer/:email', async (req, res) => {
    // const find = schema.find({name: 'hola'})
    try {
      const find = await transferModel.find({owner: req.params.email});
      res.send(find);
    } catch(err) {
      console.log(err);
      throw err;
    }
  });

  app.patch('/transfer/:id', async (req, res) => {
    try {
      const toupdate = req.body;
      const { id } = req.params;
      const updated = await transferModel.findByIdAndUpdate(id, toupdate);
      res.send({message: 'UPDATED'});
    }catch(err) {
      console.log(err);
      throw err;
    }
  });
  app.delete("/transfer/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await transferModel.findByIdAndDelete(id);
      res.send({message: 'DELETED'});
    }catch(err) {
      console.log(err);
      throw err;
    }
  })
};