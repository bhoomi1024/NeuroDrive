import React, { useState, useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function CameraCapture() {
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize AOS when the component is mounted
    AOS.init({
      duration: 1000, // Adjust the duration for the animation if needed
    });

    // Optionally, you can update AOS on window resize or other events
    window.addEventListener('resize', AOS.refresh);

    return () => {
      // Clean up AOS on component unmount
      window.removeEventListener('resize', AOS.refresh);
    };
  }, []);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL('image/png'));

    // Stop the camera after capturing the photo
    video.srcObject.getTracks().forEach(track => track.stop());
  };

  const downloadPhoto = () => {
    const link = document.createElement('a');
    link.href = photo;
    link.download = 'captured_photo.png';
    link.click();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Fleet Statistics Section */}
      <section className="bg-lime-50 px-4 w-full" data-aos="fade-up">
        <div className="py-16">
          <h2 className="text-4xl font-bold text-center mb-3">How to Use DriveShield AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { title: "Capture the Breakdown", detail: "Take a clear photo of the vehicle breakdown." },
              { title: "Upload the Photo", detail: "Upload the image to Drive Shield." },
              { title: "Click Get Solution", detail: "Click the Get Solution button to analyze the photo." },
              { title: "Receive the Solution", detail: "Get repair time, materials, pro tips, and video guides." },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6" data-aos="zoom-in" data-aos-delay={index * 100}>
                <h3 className="text-3xl font-bold text-green-700 mb-1">{stat.title}</h3>
                <p className="text-gray-700">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camera Section */}
      <div className="flex flex-col items-center justify-center w-full py-8">
        <h1 className="font-bold text-2xl mb-4">Camera Capture</h1>
        {!photo ? (
          <video ref={videoRef} autoPlay className="mb-4 border border-gray-400 rounded w-1/2 md:w-1/3 lg:w-1/4" />
        ) : (
          <img src={photo} alt="Captured" className="mb-4 border border-gray-400 rounded w-1/2 md:w-1/3 lg:w-1/4" />
        )}
        <canvas ref={canvasRef} className="hidden"></canvas>
        {!photo ? (
          <div className="flex gap-4">
            <button
              onClick={startCamera}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2 hover:bg-blue-600 transition"
            >
              Start Camera
            </button>
            <button
              onClick={takePhoto}
              className="bg-green-500 text-white font-bold py-2 px-4 mb-2 rounded hover:bg-green-600 transition"
            >
              Capture Photo
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={downloadPhoto}
              className="bg-green-800 text-white font-bold py-2 px-4 rounded mb-2 hover:bg-green-700 transition"
            >
              Download Photo
            </button>
            <button
              onClick={() => setPhoto(null)}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Retake Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CameraCapture;
