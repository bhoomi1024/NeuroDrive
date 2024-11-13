import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoShieldCheckmarkOutline, IoTimerOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import AOS from 'aos';
import 'aos/dist/aos.css';
import vehicleMonitoringImage from "../../assets/dashboard.jpg";
import digitalTwinImage from "../../assets/Digital Twin.jpeg";
import coolantMonitoringImage from "../../assets/mobile.jpg";
import batteryMonitoringImage from "../../assets/batteryimage.png";
import airIntakeMonitoringImage from "../../assets/FuleMonitoring.jpg";
import dpfMonitoringImage from "../../assets/carAIDIY.jpg";
import dfMonitoringImage from "../../assets/mobilebased.png";
import proprietaryHardwareImage from "../../assets/hard.jpg";
import vehicleMonitoringImag from "../../assets/integrated.jpg";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
       
    <section className="bg-slate-600 text-white pt-24 pb-12 mt-5">
  <div className="text-center mb-0">
    <h1 className="text-5xl font-bold mb-1">Welcome to NeuroDrive</h1>
    <p className="text-2xl mb-1">The future of predictive maintenance</p>
    <p className="text-xl mb-1">Predict vehicle breakdowns days before they happen, optimize your fleet’s </p>
    <p className="text-xl mb-1">performance and reduce fuel costs with NeuroDrive’s AI-powered platform.</p>
    <Link to="/ContactUS" className="bg-yellow-600 text-white py-2 px-6 mt-5 rounded-lg font-bold transition duration-300 hover:bg-yellow-700">
      Book a Demo
    </Link>
  </div>
</section>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold">Predictive Health Monitoring</h1>
            <p className="mt-4 text-lg font-semibold text-gray-600">
            Protect your fleet’s health with NeuroDrive’ all-in-one predictive analytics platform
            </p>
            <p className="mt-4 text-lg font-semibold text-gray-600">
            Get real-time, in-depth data on every vehicle in your fleet, including causes, symptoms, and repair strategies, all in one intuitive, easy-to-use dashboard.</p>
          </div>

          {/* Intro Section */}
          <section className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-16">
            <img src={vehicleMonitoringImage} alt="Vehicle Monitoring" className="w-full lg:w-1/2 rounded-lg shadow-lg" />
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Vehicle Health Monitoring</h2>
              <p className="text-gray-700">
                NeuroDrive’ proprietary vehicle health monitoring system transforms fleet maintenance into predictive maintenance using Digital Twin Technology to create a virtual copy of a vehicle. Analyze historical and real-time data to receive early warnings of maintenance issues, significantly reducing breakdowns and lowering maintenance costs.
              </p>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="bg-lime-100 p-12 rounded-lg mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-center mb-12">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Predictive Maintenance",
                  description: "Identify issues long before your vehicle’s diagnostic trouble codes are triggered.",
                  icon: <IoShieldCheckmarkOutline size={30} className="text-yellow-600" />,
                },
                {
                  title: "Enhanced Decision-Making",
                  description: "Provides insight into the severity of problems and suggests repair strategies.",
                  icon: <IoTimerOutline size={30} className="text-yellow-600" />,
                },
                {
                  title: "Comprehensive Fleet Monitoring",
                  description: "Get a full 360-degree view of your fleet’s health for optimal performance.",
                  icon: <BiSolidOffer size={30} className="text-yellow-600" />,
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-yellow-600">{item.title}</h3>
                  <p className="text-gray-700 text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </section>


         {/* Predictive Solutions Section */}
<section className="bg-gray-100 py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">Predictive Vehicle Health Solutions</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Advance Engine Diagnostics",
          description: "Engine related issues based alarms on phone and email and predicting its failure.",
          img: coolantMonitoringImage,
        },
        {
          title: "Battery & Alternator",
          description: "Identify alternator charging failures, battery rundown, and belt wear.",
          img: batteryMonitoringImage,
        },
        {
          title: "Fuel Efficiency Tracking and Report",
          description: "Tracking the fuel efficiency by trip and providing recommendations for improvements.",
          img: airIntakeMonitoringImage,
        },
        {
          title: "Real time solution of unplanned BreakDown",
          description: "AI provide Real-time suggestions , DIY videos and instructions and minimal downTime",
          img: dpfMonitoringImage,
        },
        {
          title: "Mobile and Web based Solutions",
          description: "Real time monitoring, alarms, and trending for your vehicles.",
          img: dfMonitoringImage,
        },
      ].map((solution, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center" data-aos="fade-up" data-aos-delay={index * 100}>
          <img src={solution.img} alt={solution.title} className="w-full h-96 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-bold mb-3 text-yellow-600">{solution.title}</h3>
          <p className="text-gray-700">{solution.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


          {/* Performance Metrics Section */}
<section className="bg-lime-50 px-4" data-aos="fade-up">
  <div className="  py-16">
    <h2 className="text-4xl font-bold text-center mb-3">Reduce the cost of operating your fleet</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      {[
        { title: "75%", detail: "reduction in vehicle breakdown events" },
        { title: "10%", detail: "decrease fuel costs by 2%-10%" },
        { title: "30%", detail: "10%–30% increase in asset availability" },
        { title: "10%", detail: "5%–10% reduction in maintenance costs" },
      ].map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6" data-aos="zoom-in" data-aos-delay={index * 100}>
          <h3 className="text-3xl font-bold text-green-700 mb-1">{stat.title}</h3>
          <p className="text-gray-700">{stat.detail}</p>
        </div>
      ))}
    </div>
  </div>
</section>




          {/* Technologies Section */}
<section className="my-2">
  <h2 className="text-3xl font-bold text-center mb-2">Technology</h2>
  <h1 className="text-xl text-gray-600 font-semibold text-center mb-2">Learn how we leverage AI to predict the health of your fleet</h1>
<p className="text-xs text-center text-gray-600 mb-2">NeuroDrive’ state-of-the-art hardware and software solution takes AI to a new level.</p>

  {/* Digital Twin Technology */}
  
  <div className="flex flex-col lg:flex-row-reverse items-center gap-5 mb-10">
    <img src={digitalTwinImage} alt="Digital Twin Technology" className="w-full lg:w-1/2 rounded-lg shadow-lg" />
    <div className="lg:w-1/2">
      <h3 className="text-2xl font-bold mb-4">Digital Twin Technology</h3>
      <p className="text-gray-700">
        Neurodrive uses Digital Twin Technology to continuously monitor and predict vehicle health in real time. This AI-driven platform generates a virtual copy of each vehicle, enabling detailed data analysis to provide early maintenance warnings and turn fleet management into a proactive solution.
      </p>
    </div>
  </div>

  {/* Integrated Solution */}
  <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
    <img src={vehicleMonitoringImag} alt="Vehicle Monitoring" className="w-full lg:w-1/2 rounded-lg shadow-lg" />
    <div className="lg:w-1/2">
      <h3 className="text-2xl font-bold mb-4">Integrated Solution</h3>
      <p className="text-gray-700">
        NeuroDrive’s proprietary vehicle health monitoring system transforms fleet maintenance by predicting and preventing breakdowns. Using a unique blend of hardware and software, this solution captures real-time and historical data to alert operators to potential issues, reducing downtime and costs.
      </p>
    </div>
  </div>

  {/* Proprietary Hardware */}
  <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-16">
    <img src={proprietaryHardwareImage} alt="Proprietary Hardware" className="w-full lg:w-1/2 rounded-lg shadow-lg" />
    <div className="lg:w-1/2">
      <h3 className="text-2xl font-bold mb-4">Proprietary Hardware</h3>
      <p className="text-gray-700">
        Our InGenious™ hardware device captures a vast array of real-time data signals, providing up-to-the-minute insights into vehicle performance. Installed in every monitored vehicle, InGenious™ supports predictive maintenance with seamless integration across various engine configurations, from diesel to electric.
      </p>
    </div>
  </div>
</section>


{/* Action Call Section */}
<section className="bg-yellow-200 p-12 rounded-lg text-center mb-16" data-aos="fade-up">
  <h2 className="text-3xl font-bold mb-6 text-green-700">Transform Your Fleet Operations</h2>
  <p className="text-gray-700 mb-8">
    NeuroDrive' predictive maintenance platform empowers you to monitor and optimize your fleet’s health in real-time. With our proactive solution, you can prevent issues before they escalate, ensuring your fleet stays operational at all times.
  </p>
  
  <h3 className="text-xl font-semibold mb-6 text-green-700">How to Get Started</h3>
  
  {/* Steps Section */}
  <div className="text-left mb-8">
    <ol className="list-decimal list-inside space-y-4 text-gray-700">
      <li>
        <strong className="text-green-700">Step 1:</strong> Sign up or log in to your NeuroDrive account.
      </li>
      <li>
        <strong className="text-green-700">Step 2:</strong> Go to the 'Vehicle Management' section of your dashboard.
      </li>
      <li>
        <strong className="text-green-700">Step 3:</strong> Connect your vehicle by following the easy step-by-step process to link it to the platform.
      </li>
      <li>
        <strong className="text-green-700">Step 4:</strong> Once connected, you'll be able to see your vehicle's live health data and get predictive maintenance alerts.
      </li>
    </ol>
  </div>
  
  <p className="text-lg font-semibold mt-6 text-gray-700">
    Ready to get started? <span className="text-green-700">Log in now</span> and take control of your fleet’s health.
  </p>
</section>


          

          {/* Unique Features Section */}
          <section className="bg-white py-16">
            <div className=" px-4 text-center">
              <h2 className="text-4xl font-bold mb-8">Unique Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "Customizable Dashboards", description: "Tailor the monitoring system to meet your specific needs." },
                  { title: "Real-Time Data", description: "Monitor fleet health in real-time for immediate action." },
                  { title: "AI-Driven Insights", description: "Receive predictive insights based on AI-powered algorithms." },
                  { title: "Comprehensive Reports", description: "Generate detailed reports to enhance decision-making." },
                ].map((feature, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6" data-aos="zoom-in" data-aos-delay={index * 100}>
                    <h3 className="text-xl font-bold text-yellow-600 mb-3">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Case Studies Section */}
          <section className="bg-gray-200 py-16">
  <div className="px-4 text-center">
    <h2 className="text-4xl font-bold mb-8">Case Studies</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Private Logistics Company",
          problem: "Loss due to improper dispatching, routing, and unofficial vehicle use. Low vehicle utilization with unexpected breakdowns.",
          solution: "Dispatching and routing optimization with real-time updates. Predictive maintenance calendar and alert system.",
          impact: "Vehicle utilization improved by 65%, saving $275k per year. Maintenance savings of $120k annually. Staff productivity improved by 25%.",
        },
        {
          title: "State Public Transport Company",
          problem: "Losing $90m per year due to low vehicle productivity and high fuel burn rate. High staff-to-bus ratio and low staff productivity.",
          solution: "Data comparison, OBD devices for real-time data collection, AI and machine learning applied for predictive maintenance.",
          impact: "$6m savings in operating costs over two years. Improved vehicle productivity (10.9%), staff utilization (12%), and fleet utilization (15.3%). Significant improvement in driving behavior.",
        },
        {
          title: "Reducing Accidents and Breakdowns for Drivers",
          problem: "Regular drivers face unexpected breakdowns and accidents due to unnoticed vehicle issues like engine failure, tire blowouts, or brake malfunctions. These problems often lead to road accidents or cars being stranded, causing delays and costly repairs.",
          solution: "Implement predictive maintenance systems that monitor key vehicle components and send alerts for potential issues, such as low tire pressure or engine health. This helps drivers take preventive action before breakdowns or accidents occur.",
          impact: "Fewer unexpected breakdowns and accidents. Reduced repair costs through early problem detection. Improved safety and peace of mind for drivers.",
        },
      ].map((caseStudy, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-yellow-600 mb-3">{caseStudy.title}</h3>
          <p className="font-semibold mb-2">Problem:</p>
          <p className="text-gray-700">{caseStudy.problem}</p>
          <p className="font-semibold mb-2 mt-4">Solution:</p>
          <p className="text-gray-700">{caseStudy.solution}</p>
          <p className="font-semibold mb-2 mt-4">Impact:</p>
          <p className="text-gray-700">{caseStudy.impact}</p>
        </div>
      ))}
    </div>
  </div>
</section>


        </div>
      </div>
    </>
  );
};

export default Home;