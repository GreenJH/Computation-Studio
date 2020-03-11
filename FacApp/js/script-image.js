const imageUpload = document.getElementById('videod')

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    //faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(start)





//imageUpload
function start(){
    //create div component
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.getElementById('image-box').append(container)
    document.getElementById('image-box').append('Please select an image')
    //event listener
    imageUpload.addEventListener('change', async () => {
        const image = await faceapi.bufferToImage(imageUpload.files[0])
        container.append(image)
        const canvas = faceapi.createCanvasFromMedia(image)
        container.append(canvas)
        const displaySize = {width: image.width, height: image.height}
        faceapi.matchDimensions(canvas, displaySize)
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        resizedDetections.forEach(detection => {
            const box = detection.detection.box
            const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face'})
            drawBox.draw(canvas)
        })
        
    })
}
