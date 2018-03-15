let fs = require('fs');

fs.readFile('Wildlife.wmv' , function(err, data){
    if(err){
        throw err;
    }
    fs.readFile('copie.wmv', data, function(err){
        if (err){
            throw err;
        }
        console.log('fichier est bien copié');
    })
});