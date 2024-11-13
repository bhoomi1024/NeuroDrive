import React, { useState } from "react";
import { generatingResult } from "../../../../backend/api/testing";
import "./App.css";

const videoLinks = {
  "tire puncture": "https://www.youtube.com/embed/DV9YulDcokw",
  "flat tire": "https://www.youtube.com/embed/0w6engc2A-I",
  "low tire pressure": "https://www.youtube.com/embed/kX3z20bSexo",
  "battery jump-start issues": "https://www.youtube.com/embed/H1qNZADptm0",
  "minor scratches and scuffs": "https://www.youtube.com/embed/MGTIGs4Kfmc",
  "engine oil leak": "https://www.youtube.com/embed/fCpA3B_nZ2I",
  "other": "https://www.youtube.com/embed/ANISrchb1ZI"
};

const DIYInstructionsDisplay = ({ response }) => {
  const lines = response?.split('/').filter(line => line.trim() !== '') || [];
  const category = lines[1]?.toLowerCase() || ""; // Get category from response

  // Find which category key contains our category text
  const videoKey = Object.keys(videoLinks).find(key => 
    category.includes(key.toLowerCase())
  );
  
  const videoUrl = videoLinks[videoKey] || videoLinks["other"];

  return (
    <div className="diy-container">
      <div className="diy-card">
        <div className="diy-header">
          <h2>UnPlanned Breakdowns of Car DIY solution </h2>
        </div>
        <div className="diy-content">
          {lines.map((line, index) => {
            const trimmedLine = line.trim();
            const isHeader = trimmedLine.includes(':') && !trimmedLine.startsWith('1.') && !trimmedLine.startsWith('2.') && !trimmedLine.startsWith('3.');
            const isStep = /^\d+\./.test(trimmedLine);
            
            return (
              <div 
                key={index} 
                className={`diy-line ${isHeader ? 'header-line' : ''} ${isStep ? 'step-line' : ''}`}
              >
                {trimmedLine}
              </div>
            );
          })}
        </div>
      </div>

      <div className="video-container">
        <h3>Watch Related BreakDown Solution Video</h3>
        <div className="video-wrapper">
          <iframe
            src={videoUrl}
            title="DIY Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedImage) {
      setLoading(true);
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const image = {
            inlineData: {
              data: reader.result.split(",")[1],
              mimeType: selectedImage.type,
            },
          };

          const prompt = `I'm going to show you an image of an unplanned car breakdown. Please analyze it and categorize it into one of these categories: Tire Puncture or Flat Tire, Low Tire Pressure, Battery Jump-Start Issues, Minor Scratches and Scuffs, Foggy Headlights, Loose or Noisy Belts, Oil Top-Up or Change, Engine Oil Leak, Battery Corrosion, Loose or Broken Headlight/Taillight, Dirty or Clogged Air Filter, Windshield Wiper Wear, Loose Side Mirror, Rusty or Loose Exhaust Pipe. 

Then, provide a detailed and easy-to-follow repair guide using '/' as delimiters, following this exact format:

I see this is [breakdown]. /

Category: [Select from: Tire Puncture/Flat Tire, Low Tire Pressure, Battery Jump-Start Issues, etc. as applicable] /

Best idea to solve breakdown with minimum available accessories: [Name of the creative, practical solution] /

Time needed: [Realistic duration, e.g., 10-30 minutes] /

Materials needed: /
- [Primary repair material, like a sealant or toolkit component] /
- [List 2-3 additional materials or tools, such as tape, cleaner, cloths, gloves, etc.] /

Detailed Instructions: /
1. [Step 1: Comprehensive instructions, such as removing parts, handling tools, cleaning, etc., with measurements if needed] /
2. [Step 2: Specific steps for repair or installation, including any necessary safety tips] /
3. [Step 3: Detailed finishing touches and reassembly, ensuring alignment, checking tightness, etc.] /

Pro Tips: /
- [Suggestions for avoiding similar issues in the future or specific techniques for better results] /
- [Tips on maintaining the fixed item for longevity] /

Final Result: Your [item, e.g., tire, headlight, or other part] is now functional and safe to use. Here’s how to best utilize it: [Usage instructions and testing tips] 
/`;




          const response = await generatingResult(prompt, image);
          setResult(response);
        };
        reader.readAsDataURL(selectedImage);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="upload-card">
        <div className="card-header">
          <h2>Upload BreakDown Image</h2>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="file-input"
              />
              
              {imagePreview && (
                <div className="image-preview">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                  />
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={!selectedImage || loading}
                className={`submit-button ${loading ? 'loading' : ''}`}
              >
                {loading ? "Processing..." : "Get Solution of UnPlanned BreakDowns"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {result && <DIYInstructionsDisplay response={result} />}
    </div>
  );
};

export default ImageUploadForm;