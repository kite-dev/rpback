
module.exports = (app) => {

  const db = app.get('db');
  const transferSchema = new db.Schema({
    'name': String,
    'type': String
    });
  const transferModel = db.model('Transfer', transferSchema );

  app.post('/transfer', async(req, res) => {
    try {
      const newTransfer = req.body;
      await new transferModel(newTransfer).save();
      res.send({message:'CREATED'});
    } catch (error) {
      console.log(error);
      throw err;
    }
    
  });

  app.get('/transfer/all', async (req, res) => {
    // const find = schema.find({name: 'hola'})
    try {
      const find = await transferModel.find({});
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