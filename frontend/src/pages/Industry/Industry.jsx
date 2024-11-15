import React from 'react';
import Nav from '../../components/HomePageCompo/Nav';
import Footer from '../../components/HomePageCompo/Footer';
import RegularCarUsers from '../../assets/Volkswagen .jpg';
import Trucking from '../../assets/Trucking.jpg';
import Construction from '../../assets/Constrution.jpeg';
import Mining from '../../assets/Mining.jpg';
import Farming from '../../assets/Farming.jpg';
import OilGas from '../../assets/Oil&Gas.jpg';
import TransitandCoach from '../../assets/Transit and Coach.jpeg';
import MarineEngines from '../../assets/MarineEngines.jpg';
import Gensets from '../../assets/Gensets.jpeg';
import WasteManagement from '../../assets/Waste.jpg';


const industries = [
  {
    name: "Regular Car Users",
    description: "Drive with confidence every day. NeuroDrive offers peace of mind by providing real-time insights into vehicle health, helping drivers stay ahead of maintenance needs.",
    image: RegularCarUsers,
  },
  {
    name: "Trucking",
    description: "Keep your fleet on the road, not in the shop. NeuroDrive ensures trucking fleets stay operational, maximizing uptime and reducing unscheduled repairs.",
    image: Trucking,
  },
  {
    name: "Construction",
    description: "Supporting your project timelines, no matter how tight. NeuroDrive helps keep machinery in peak condition with proactive monitoring.",
    image: Construction,
  },
  {
    name: "Mining",
    description: "Designed for rugged environments. NeuroDrive's monitoring solutions detect early signs of wear and tear in heavy-duty mining equipment.",
    image: Mining,
  },
  {
    name: "Farming",
    description: "Empowering farmers to maximize productivity. NeuroDrive provides insights into farming equipment health, helping prevent costly delays.",
    image: Farming,
  },
  {
    name: "Oil & Gas",
    description: "Ensuring equipment is always ready and reliable. NeuroDrive continuously monitors essential oil and gas equipment, reducing the risk of malfunctions.",
    image: OilGas,
  },
  {
    name: "Transit and Coach",
    description: "Delivering riders safely from point A to point B. NeuroDrive provides transit operators with real-time health insights, ensuring safe, reliable travel.",
    image: TransitandCoach,
  },
  {
    name: "Marine Engines",
    description: "Optimizing engine efficiency at sea. NeuroDrive helps marine operators maximize fuel efficiency and engine reliability, reducing maintenance costs.",
    image: MarineEngines,
  },
  {
    name: "Gensets",
    description: "Reliable power whenever it’s needed. NeuroDrive’s analytics keep a close watch on genset performance, ensuring dependable power.",
    image: Gensets,
  },
  {
    name: "Waste Management",
    description: "Improving fleet efficiency for a cleaner tomorrow. NeuroDrive reduces fleet downtime and improves operational efficiency for waste management vehicles.",
    image: WasteManagement,
  },
];

const Industry = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-7xl mx-auto pt-24 pb-12 px-6">
        <h1 className="text-5xl font-bold text-center text-blue-600 mb-8">Industries</h1>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
          NeuroDrive’s predictive maintenance solutions are designed to support a wide range of users, from individual car owners to large-scale industrial fleets. Our technology empowers everyone to keep their vehicles or equipment in top condition, minimizing downtime and ensuring safety on the road, at the site, or at sea.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <img 
                src={industry.image} 
                alt={industry.name} 
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-blue-700 mb-3">{industry.name}</h2>
                <p className="text-gray-600">{industry.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Why Choose NeuroDrive?</h2>
          <p className="text-lg text-gray-700">
            NeuroDrive’s predictive maintenance solutions help individuals and industries alike enhance reliability, minimize downtime, and reduce costs through smarter, proactive vehicle and equipment management. Whether you’re a regular car user or a fleet manager, NeuroDrive keeps you in control and prepared for whatever comes next.
          </p>
        </div>

        <div className="text-center text-xl font-semibold text-gray-800">
          NeuroDrive: Powering Reliable Operations Across Industries.
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Industry;
