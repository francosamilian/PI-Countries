//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { default: axios } = require('axios');
const { Country } = require('./src/db.js');



// Syncing all the models at once. 
conn.sync({force: true}).then( async () => { 
    const apiInfo = await axios.get('https://restcountries.com/v3/all');
    const allCountries = apiInfo.data.map(c => {
        return {
            id: c.cca3,
            name: c.name.common[0].toUpperCase() + c.name.common.slice(1),
            image: c.flags[1],
            continent: c.region,
            capital: c.capital, 
            subRegion: c.subregion,
            area: c.area,
            population: c.population 
        }; 
    });
    Country.bulkCreate(allCountries);
    server.listen(3001, () => {
  console.log('%s listening at 3001'); // eslint-disable-line no-console 
});
});
