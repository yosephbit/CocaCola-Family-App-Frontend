console.log("hello from face detection")
Promise.all([
    fetch('https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/face_detection_short.binarypb'),
    fetch('https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/face_detection_short_range.tflite'),
    fetch('https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/face_detection_solution_simd_wasm_bin.js'),
    fetch('https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/face_detection_solution_simd_wasm_bin.wasm'),
]).then(res => {
    // console.log(res)
}).catch(e => {
    console.log(e)
})