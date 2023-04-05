const imageToSlices = require('image-to-slices');
const sizeof = require("image-size")

imageToSlices.configure(
    {
        clipperOptions: {
            canvas: require('canvas')
        }
    }
)

const SliceImage = (image_dir="./src/public/image/puzzle.jpg", save_dir ="./src/public/pieces") => {
    let lineXArray = [];
    let lineYArray = [];

    sizeof(image_dir, (err, dim) => {
        let xLine = dim.height / 4
        let yLine = dim.width / 4

        lineXArray.push(
            xLine, xLine * 2, xLine * 3
        )
        lineYArray.push(
            yLine, yLine * 2, yLine * 3
        )

        if (lineXArray.length > 0 && lineYArray.length > 0) {
            imageToSlices(image_dir, lineXArray, lineYArray, {
                saveToDir: save_dir
            });
        }
    })
}

module.exports= { SliceImage };