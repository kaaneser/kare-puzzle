const {SliceImage} = require("../../utils/image_slicer");


exports.index = (req, res) => {
    SliceImage("./src/static/test.jpg") // FIXME: Hey sen, bunu istediğin yere zıbıt

    res.render('index');
}