module.exports.home = function(req, res){
    return res.render('home', {
        title: 'Home'
    });
}

module.exports.about = function(req, res){
    console.log('<h1>About Section</h1>');
}