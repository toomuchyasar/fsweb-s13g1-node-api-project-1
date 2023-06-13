const express = require("express");
const server = express();
const { find,findById,insert,update,remove } = require("./users/model.js")

server.use(express.json());



  server.post("/api/users", async (req,res) => {
    let data = req.body;
    if(data.name && data.bio){
        try{
            let result = await insert(data);
            res.status(201).json(result)
        } catch (e) {
            res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" })
        }
    }else{
        res.status(400).json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" })
    }
  });

  server.get("/api/users", async ( req,res) => {
    try {
        let result = await find();
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" })
    }
  });

  server.get("/api/users/:id" , async (req,res) => {
   let id = req.params.id
    try {
        let result = await findById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Belirtilen ID li kullanıcı bulunamadı" })
        }
    } catch (e) {
        res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" })
    }
  })

  server.delete("/api/users/:id", async (req,res) => {
    let id = req.params.id;
    try {
        let result = await remove(id)
        if(result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: "Belirtilen ID li kullanıcı bulunamadı" })
        }
        
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı silinemedi" })
    }
  })

  server.put("/api/users/:id", async(req,res) => {
    let id = req.params.id;
    let data = req.body;
    try {
        if(data.name && data.bio){
            let result = await update(id,data);
            if (result){
                res.status(200).json(result);
            }else {
                res.status(404).json({ message: "Belirtilen ID li kullanıcı bulunamadı" })
            }
        } else {
            res.status(400).json({ message: "Lütfen kullanıcı için name ve bio sağlayın"  })
        }
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" })
    }
  })



module.exports = server 
