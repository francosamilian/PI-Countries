const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.ENUM('Africa', 'Asia', 'Americas', 'Europe', 'Oceania', 'Antarctic'),
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subRegion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING,
      get() {
        let internationalNumberFormat = new Intl.NumberFormat('en-US');
        let number = internationalNumberFormat.format(this.getDataValue('area'));
        return number + ' km2';
      }
    },
    population: {
      type: DataTypes.STRING,
      // get() {                                                                
      //   let internationalNumberFormat = new Intl.NumberFormat('en-US');
      //   return internationalNumberFormat.format(this.getDataValue('population'));
      // }
    },
  });
};
