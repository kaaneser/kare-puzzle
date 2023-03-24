// Example usage: SliceImage("src\static\test.jpg")

const imageToSlices = require('image-to-slices');
const sizeof = require("image-size")

imageToSlices.configure(
    {
        clipperOptions: {
            canvas: require('canvas')
        }
    }
)

const SliceImage = (image_dir, save_dir ="./src/static") => {
    let lineXArray = [];
    let lineYArray = [];

    sizeof(image_dir, (err, dim) => {
        console.log("Image read successfully. Resolution:", dim.width, "x", dim.height)
        let xLine = dim.height / 4
        let yLine = dim.width / 4

        lineXArray.push(
            xLine, xLine * 2, xLine * 3
        )
        lineYArray.push(
            yLine, yLine * 2, yLine * 3
        )

        console.log("Drew 3 line for X axis", lineXArray)
        console.log("Drew 3 line for Y axis", lineYArray)

        if (lineXArray.length > 0 && lineYArray.length > 0) {
            imageToSlices(image_dir, lineXArray, lineYArray, {
                saveToDir: save_dir
            }, () => {
                console.log("Slicing has finished")
            });
        }
    })
}

module.exports= {SliceImage};