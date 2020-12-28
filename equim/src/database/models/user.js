module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        id:{
            type:dataTypes.INTEGER(11),
            allowNull:false, //permite nulo?
            autoIncrement: true,
            primaryKey:true
        },
        nombre:{
            type:dataTypes.STRING(45),
            allowNull:false,
           
        },
        apellido:{
            type:dataTypes.STRING(45),
            allowNull:false,
            
        },
        email:{
            type:dataTypes.STRING(45),
            allowNull:false,
            unique:true,
        },
        password:{
            type:dataTypes.STRING(100),
            allowNull:false
        },
        
        rol:{
            type:dataTypes.STRING(45),
            allowNull:true
        },
        direccion:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        ciudad:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        provincia:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        
    }
    let config = {
        tableName: "users",
        timestamps: false,
        underscored:true
    }
    
    const User = sequelize.define(alias,cols,config);
    User.associate = function (models){
        User.hasOne(models.Cart,{
        as:"cart",
        foreignKey:"id_usuario"
        })
    }
    
    return User;
}