
const carritoController={
    carrito : function(req,res){

        res.render('compra',{
        title: "carrito de compra"
        })
    }
}
module.exports = carritoController;