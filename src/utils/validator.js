

exports.isNotRepeated = (req,res,next) =>{
    if (todos.find(data => data.nombre== req.body.nombre)){
        return res.send(409).send("Conflicto");
    }
    return next();
};
exports.isNotEmpty = (req,res,next) =>{
    if(req.body.nombre==="" || req.body.nombre===undefined){
       return res.send(400).send("Mala petición");
    }
    return next();
};

exports.noId = (req,res,next) =>{
    if(req.body.id==="" || req.body.id===undefined || !req.body.id){
       return res.send(400).send("Mala petición");
    }
    return next();
};

exports.noTask= (req,res,next) =>{

    if(req.body.nombre===undefined){
        return res.send(404).send('No se ha encontrado el dato con el id '+req.body.id)
    } 
    return next();
}