import data from './data.json';

class User {}
class Attorney {}

// Mock data
const viewer = new User();
viewer.id = '1';
viewer.name = 'huy';
const attorney = data.map((obj) => {
    const attorney = new Attorney();
    attorney.id = require('crypto').randomBytes(10).toString('hex');
    attorney.firstName = obj.firstName;
    attorney.lastName = obj.lastName;
    attorney.gender = obj.gender;
    attorney.language = obj.language;
    attorney.email = obj.email;
    attorney.image = obj.image;
    return attorney;
})

module.exports = {
    getUser: (id) => id === viewer.id ? viewer : null, // if id correct, return viewer.id. if not, return null
    getViewer: () => viewer,
    getAttorney: (id) => attorney.find(w => w.id == id), // find w.id then return it
    getAttorneys: () => attorney,
    User,
    Attorney,
}