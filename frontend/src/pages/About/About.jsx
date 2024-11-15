import React from 'react';
import Nav from '../../components/HomePageCompo/Nav';
import Footer from '../../components/HomePageCompo/Footer';
import architectureImage from '../../assets/architecture.jpg';
import aiTechnologyImage from '../../assets/about.jpg';
import Chatbot from '../../components/HomePageCompo/ChatBot';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-8">
      <Nav />

      <div className="flex flex-col items-center px-6 py-16 md:px-12 lg:px-24 mt-8">
        
        {/* About Section with AI Image on the Right */}
        <div className="flex flex-col md:flex-row items-center max-w-5xl mb-16 space-y-8 md:space-y-0 md:space-x-8">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-5xl font-extrabold text-blue-600 mb-4">About NeuroDrive</h1>
            <p className="text-lg text-gray-700">
              NeuroDrive redefines vehicle maintenance with advanced AI and predictive technology. Our goal is to empower drivers and fleet managers by transforming data into real-time, actionable insights for optimal vehicle health. By integrating cutting-edge artificial intelligence with seamless vehicle diagnostics, we ensure a smoother, safer driving experience.
            </p>
          </div>
          <img src={aiTechnologyImage} alt="AI Technology" className="w-full md:w-1/2 h-[400px] object-contain rounded-lg shadow-lg transform transition duration-500 hover:scale-105" />
        </div>

        {/* What Makes Us Unique Section */}
        <div className="max-w-4xl text-left mb-16 space-y-8">
          <h2 className="text-4xl font-semibold text-blue-600 mb-4">What Sets NeuroDrive Apart?</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            NeuroDrive isn't just a maintenance tool—it's an intelligent companion for your vehicle. Using continuous monitoring, AI-powered insights, and predictive analytics, we identify potential issues before they become critical, saving you from unexpected breakdowns and costly repairs.
          </p>
        </div>
<Chatbot/>
        {/* How NeuroDrive Works Section with Architecture Image Below */}
        <div className="max-w-4xl text-left mb-16 space-y-12">
          <h2 className="text-4xl font-semibold text-blue-600 mb-4">How NeuroDrive Works</h2>

          {/* Features with Transitions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div className="p-8 bg-white rounded-xl shadow-lg transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800">Seamless Vehicle Connection</h3>
              <p className="text-gray-700 mt-4">
                Using on-board diagnostics (OBD) or a telematics device, NeuroDrive connects directly with your vehicle, tracking essential data like engine health, brake system, tire pressure, and more.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800">Intelligent Data Analysis</h3>
              <p className="text-gray-700 mt-4">
                NeuroDrive’s AI-driven analytics continuously process your vehicle data, using machine learning to spot early warning signs and enable preventive actions.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800">Real-Time Alerts</h3>
              <p className="text-gray-700 mt-4">
                Receive instant notifications for any detected issues, empowering you to take immediate action to avoid risks and keep your journey smooth.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800">Interactive Dashboard</h3>
              <p className="text-gray-700 mt-4">
                NeuroDrive’s user-friendly dashboard offers comprehensive insights, personalized maintenance reminders, and real-time health updates to keep your vehicle in peak condition.
              </p>
            </div>
          </div>

          {/* Architecture Image */}
          <div className="text-center">
            <img src={architectureImage} alt="Vehicle Architecture" className="w-full max-w-screen-md h-auto object-contain rounded-lg shadow-xl transform transition duration-500 hover:scale-105" />
          </div>
        </div>

        {/* How to Connect Your Vehicle Section with Improved UI */}
        <div className="max-w-4xl text-left mb-16 space-y-8">
          <h2 className="text-4xl font-semibold text-blue-600 mb-4">How to Connect Your Vehicle to NeuroDrive</h2>
          <p className="text-lg text-gray-700 mb-4">
            Connecting your vehicle to NeuroDrive is simple and easy! Follow the steps below to get started:
          </p>

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div className="p-8 bg-blue-100 rounded-lg shadow-lg flex items-center space-x-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex-shrink-0 bg-blue-600 text-white p-4 rounded-full text-xl font-bold">1</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Install the NeuroDrive App</h3>
                <p className="text-gray-700 mt-4">
                  Download the NeuroDrive app on your smartphone from the App Store (for iOS) or Google Play (for Android) or you can vist our website.
                </p>
              </div>
            </div>

            <div className="p-8 bg-blue-100 rounded-lg shadow-lg flex items-center space-x-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex-shrink-0 bg-blue-600 text-white p-4 rounded-full text-xl font-bold">2</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Create an Account</h3>
                <p className="text-gray-700 mt-4">
                  Sign up with your email address or log in if you already have an account. This will allow us to sync your vehicle's data securely.
                </p>
              </div>
            </div>

            <div className="p-8 bg-blue-100 rounded-lg shadow-lg flex items-center space-x-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex-shrink-0 bg-blue-600 text-white p-4 rounded-full text-xl font-bold">3</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Connect Your Vehicle</h3>
                <p className="text-gray-700 mt-4">
                  
      Sync your vehicle’s data using the Digital Twin method. This allows NeuroDrive to securely monitor your vehicle’s performance and health in real-time without the need for physical connections.
                </p>
              </div>
            </div>

            <div className="p-8 bg-blue-100 rounded-lg shadow-lg flex items-center space-x-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex-shrink-0 bg-blue-600 text-white p-4 rounded-full text-xl font-bold">4</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Sync Your Vehicle</h3>
                <p className="text-gray-700 mt-4">
                  Open the app and follow the prompts to sync your vehicle’s data. You'll be asked to select your vehicle's make and model.
                </p>
              </div>
            </div>

            <div className="p-8 bg-blue-100 rounded-lg shadow-lg flex items-center space-x-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex-shrink-0 bg-blue-600 text-white p-4 rounded-full text-xl font-bold">5</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Start Monitoring</h3>
                <p className="text-gray-700 mt-4">
                  Once the connection is established, NeuroDrive will begin collecting real-time data from your vehicle. You'll receive alerts, reminders, and insights through the app.
                </p>
              </div>
            </div>

            <div className="p-8 bg-blue-100 rounded-lg shadow-lg flex items-center space-x-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex-shrink-0 bg-blue-600 text-white p-4 rounded-full text-xl font-bold">6</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Enjoy the Drive</h3>
                <p className="text-gray-700 mt-4">
                  With your vehicle connected to NeuroDrive, drive smarter, safer, and more efficiently while enjoying complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Statement */}
        <div className="text-center max-w-4xl mb-12">
          <p className="text-lg text-gray-700">
            NeuroDrive is redefining vehicle maintenance through predictive technology and real-time insights. Drive smarter and safer with NeuroDrive, where intelligent vehicle care meets the road.
          </p>
          <h3 className="text-2xl font-bold text-blue-600 mt-8">NeuroDrive: Your Companion in Smart Maintenance.</h3>
        </div>

      </div>
      
      <Footer />
    </div>
  );
};

export default About;
