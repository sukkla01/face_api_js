const upload = document.getElementById('upload')
const profileSubmit = document.getElementById('profileSubmit')

var img = document.getElementById('img')

upload.addEventListener('change', (e) => {
    console.log(e)
    readUrl(upload)
})
profileSubmit.addEventListener('click', (e) => {
    saveProfile()
})


// loadModels();

const readUrl = (input) => {
    if (input.files && input.files[0]) {
        let reader = new FileReader()
        reader.onload = async (e) => {
            console.log(e.target.result)
            img.src = e.target.result
        }
        reader.readAsDataURL(input.files[0])

    }
}

const saveProfile = async () => {

    const options = new faceapi.SsdMobilenetv1Options({ minConfidence })

    var detection = await faceapi.detectSingleFace(img, options)
        .withFaceLandmarks()
        .withFaceDescriptor()
    if (detection) {
        // console.log(detection.descriptor)
        let doc = {}
        doc._id = document.getElementById('_id').value
        doc.title = document.getElementById('title').value
        doc.firstName = document.getElementById('firstName').value
        doc.lastName = document.getElementById('lastName').value
        doc.position = document.getElementById('position').value
        doc.department = document.getElementById('department').value
        doc.type = document.getElementById('type').value
        doc.descriptor = new Float32Array(Object.values(detection.descriptor))

        db.put(doc).then(function (response) {
            console.log(response)
            alert('บันทึกข้อมูลเรียบร้อยแล้ว')
        }).catch(function (err) {
            console.log(err);
            alert('error')

        });
    }

}