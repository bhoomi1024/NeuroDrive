import React, { useState } from 'react';
import Nav from '../../components/HomePageCompo/Nav';
import Footer from '../../components/HomePageCompo/Footer';
import Chatbot from '../../components/HomePageCompo/ChatBot';
function ContactUS() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending data to the server
    console.log('Form Data Submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Nav />
      <div className="bg-gray-200 py-16 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-6">We'd love to hear from you. Fill out the form below to get in touch with us.</p>
<Chatbot/>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl max-w-lg mx-auto space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-left font-semibold text-gray-700">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-left font-semibold text-gray-700">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-left font-semibold text-gray-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Send Message
            </button>
          </form>
        
        </div>
        
      </div>
      <Footer/>
    </>
  );
}

export default ContactUS;
