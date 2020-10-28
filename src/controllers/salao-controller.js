const repository = require("../repositories/salao-repository");

exports.post = async (req, res, next) => {
   try {
     await repository.create({
       nome: req.body.nome,
       detalhes: req.body.detalhes,
     });
 
     res.status(201).send({
       message: "Salão de festa cadastrado com sucesso!",
     });
   } catch (error) {
     console.error(error);
 
     res.status(500).send({
       message: "Falha ao processar sua requisição.",
     });
   }
 };

 exports.get = async (req, res, next) => {
   try {
     var data = await repository.search();
     res.status(200).send(data);
   } catch (error) {
     console.error(error);
 
     res.status(500).send({
       message: "Falha ao processar sua requisição.",
     });
   }
 };

 exports.put = async (req, res, next) => {
   try {
     await repository.update(req.params.id, req.body);
     res.status(200).send({
       message: "Salão de festa foi alterado com sucesso!",
     });
   } catch (error) {
     res.status(500).send({
       message: "Falha ao processar sua requisição.",
     });
   }
 };