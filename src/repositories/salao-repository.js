const mongoose = require('mongoose');

const Salao = mongoose.model("Salao");

exports.create = async (data) => {
   var salao = new Salao(data);
   await salao.save();
 };

 exports.search = async () => {
   const res = await Salao.find();
   return res;
 };

 exports.update = async (id, data) => {
   await Salao.findByIdAndUpdate(id, {
     $set: {
       nome: data.nome,
       detalhes: data.detalhes
     },
   });
 };