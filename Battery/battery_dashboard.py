import streamlit as st
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import datetime
import matplotlib.pyplot as plt
from matplotlib.dates import DateFormatter

# Load the dataset to get the feature ranges
file_path = 'Battery_RUL.csv'  # Replace with actual file path
battery_data = pd.read_csv(file_path)

# Feature and target splitting
X = battery_data.drop(columns=['RUL'])
y = battery_data['RUL']

# Load or train the model (training only once on session start)
if 'model' not in st.session_state:
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    st.session_state.model = model

# Function to classify battery health based on RUL and give color
def classify_health(rul):
    if rul > 800:
        return "Excellent", "green"
    elif rul > 500:
        return "Good", "blue"
    elif rul > 200:
        return "Average", "orange"
    else:
        return "Poor", "red"

# Sidebar for page navigation
st.sidebar.title("Navigation")
page = st.sidebar.radio("Go to", ["Predict Battery Health", "Battery Health Dashboard"])

# Description of Parameters below the navigation
st.sidebar.markdown("""
### Description of Parameters:
- **Temperature**: The current temperature of the battery. This can affect the battery's lifespan.
- **Voltage**: The voltage of the battery. High voltage can indicate a fully charged state, while low voltage may suggest the battery is nearly drained.
- **Current**: The current drawn by the battery. A higher current draw means the battery is working harder.
- **Charge**: The current charge level of the battery. Indicates how much energy is left.
- **Discharge**: The rate at which the battery is discharging, which affects how long it will last.
""")

if page == "Predict Battery Health":
    st.title("🔋⚡Battery Health Prediction")
    st.write("To receive a tailored prediction of your battery's remaining useful life, please fill out the form below.")


    # Input data for the prediction form
    input_data = {}
    for column in X.columns:
        min_val = battery_data[column].min()
        max_val = battery_data[column].max()
        mean_val = battery_data[column].mean()
        input_data[column] = st.slider(
            column, min_value=float(min_val), max_value=float(max_val), value=float(mean_val)
        )

    # Display the prediction form only when user clicks "Predict"
    if st.button("Predict"):
        # Convert user input to DataFrame
        user_input = pd.DataFrame([input_data])

        # Predict RUL and classify health
        model = st.session_state.model  # Get the trained model from session state
        predicted_rul = model.predict(user_input)[0]
        health_classification, color = classify_health(predicted_rul)

        # Display results with color-coded health classification
        st.write(f"**Predicted Remaining Useful Life (RUL):** {predicted_rul:.2f}")
        st.markdown(
            f"<p style='color:{color}; font-size: 24px; font-weight:bold;'>"
            f"🔋 Health Classification: {health_classification}</p>",
            unsafe_allow_html=True)

        # Display messages with icons and appreciation based on battery health
        if health_classification == "Excellent":
            st.success("🎉 Your device battery health is excellent! You're doing an amazing job maintaining it! 🌟")
        elif health_classification == "Good":
            st.success("👍 Your battery is in good health. Keep following best practices to extend its life!")
        elif health_classification == "Average":
            st.warning("⚠️ Battery health is average. Keep an eye on its performance for potential replacement.")
        else:
            st.error("🔴 Battery health is poor. Immediate replacement may be necessary to avoid breakdown.")

        # Initialize prediction history DataFrame in session state if not exists
        if 'prediction_history' not in st.session_state:
            st.session_state.prediction_history = pd.DataFrame(
                columns=["timestamp", *X.columns, "predicted_rul", "health_classification"]
            )
        
        # Add the prediction to history
        prediction_data = pd.DataFrame([{
            "timestamp": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            **input_data,
            "predicted_rul": predicted_rul,
            "health_classification": health_classification
        }])
        
        st.session_state.prediction_history = pd.concat(
            [st.session_state.prediction_history, prediction_data], ignore_index=True)

elif page == "Battery Health Dashboard":
    st.title("🔋⚡ Battery Health Dashboard")

    # Check if there's any prediction history
    if 'prediction_history' in st.session_state and not st.session_state.prediction_history.empty:
        # Get the most recent prediction
        latest_prediction = st.session_state.prediction_history.iloc[-1]
        latest_rul = latest_prediction['predicted_rul']
        health_classification = latest_prediction['health_classification']

        # Display the most recent RUL and health classification
        st.subheader("Most Recent Prediction")
        st.write(f"**Predicted Remaining Useful Life (RUL):** {latest_rul:.2f}")
        
        health_message, color = classify_health(latest_rul)
        st.markdown(
            f"<p style='color:{color}; font-size: 24px; font-weight:bold;'>"
            f"🔋 Health Classification: {health_message}</p>",
            unsafe_allow_html=True)

        # Display message based on the health classification
        if health_message == "Excellent":
            st.success("🎉 Your device battery health is excellent! You're doing an amazing job maintaining it! 🌟")
        elif health_message == "Good":
            st.success("👍 Your battery is in good health. Keep following best practices to extend its life!")
        elif health_message == "Average":
            st.warning("⚠️ Battery health is average. Keep an eye on its performance for potential replacement.")
        else:
            st.error("🔴 Battery health is poor. Immediate replacement may be necessary to avoid breakdown.")
        
        # Calculate warning conditions based on RUL threshold (e.g., consider RUL < 200 as warning)
        warning_threshold = 200
        total_predictions = len(st.session_state.prediction_history)
        normal_conditions = sum(1 for p in st.session_state.prediction_history['predicted_rul'] if p > warning_threshold)
        warning_conditions = total_predictions - normal_conditions

        st.markdown("### Summary Statistics")
        col1, col2, col3 = st.columns(3)
        col1.metric("Total Predictions", total_predictions)
        col2.metric("Normal", normal_conditions, delta_color="inverse")
        col3.metric("Warning", warning_conditions, delta_color="normal")

        # Show prediction history table
        st.subheader("Prediction History")
        st.dataframe(st.session_state.prediction_history)

        # Plot time vs RUL with color-coded health classifications
        fig, ax = plt.subplots(figsize=(10, 6))
        colors = st.session_state.prediction_history['health_classification'].map({
            "Excellent": "green", "Good": "blue", "Average": "orange", "Poor": "red"
        })
        timestamps = pd.to_datetime(st.session_state.prediction_history['timestamp'])
        rul_values = st.session_state.prediction_history['predicted_rul']
        
        ax.scatter(timestamps, rul_values, c=colors, s=100, edgecolor='k', alpha=0.7, label='RUL Prediction')  # Color by health classification
        ax.plot(timestamps, rul_values, linestyle='--', color='gray', alpha=0.5, linewidth=1)  # Connect points with a dashed line

        # Formatting for the title and labels
        ax.set_title("Battery Health Over Time", fontsize=16, fontweight='bold')
        ax.set_xlabel("Time", fontsize=12, fontweight='bold')
        ax.set_ylabel("Remaining Useful Life (RUL)", fontsize=12, fontweight='bold')

        # Format x-axis for better readability
        ax.xaxis.set_major_formatter(DateFormatter('%Y-%m-%d %H:%M'))
        plt.xticks(rotation=45, ha="right", fontsize=10)

        # Adding a grid and legend
        ax.grid(True, linestyle='--', alpha=0.6)
        health_labels = {"Excellent": "green", "Good": "blue", "Average": "orange", "Poor": "red"}
        for label, color in health_labels.items():
            ax.scatter([], [], c=color, s=100, label=label)  # Dummy points for legend
        ax.legend(title="Health Classification", title_fontsize="13", fontsize="11")
# Add border around the plot
        for spine in ax.spines.values():
         spine.set_edgecolor('black')  # Color of the border
         spine.set_linewidth(2)        # Thickness of the border


        # Show plot
        st.pyplot(fig)
        # Pie chart showing battery health distribution with RUL value
        st.subheader("Battery Health Distribution")
        health_counts = st.session_state.prediction_history['health_classification'].value_counts()

        # Set the size of the pie chart to make it smaller and more compact
        pie_fig, pie_ax = plt.subplots(figsize=(1, 1))  # Slightly larger size for better readability

        # Pie chart plotting
        wedges, texts, autotexts = pie_ax.pie(
            health_counts, labels=health_counts.index, autopct='%1.1f%%', startangle=90, 
            colors=['green', 'blue', 'orange', 'red'], wedgeprops={'edgecolor': 'white', 'linewidth': 0.5}
        )

        # Add a border around each wedge
        for wedge in wedges:
            wedge.set_edgecolor('black')  # Adding black border around each wedge

        # Add Remaining Useful Life (RUL) value inside the pie chart with updated font size
        latest_rul = rul_values.iloc[-1]  # Assuming latest RUL value is the last in the series
        pie_ax.text(0, 0, f"RUL: {latest_rul:.2f}", ha='center', va='center', fontsize=3, fontweight='bold', color='black')

        # Improve pie chart appearance
        pie_ax.set_title("Battery Health Status", fontsize=5, fontweight='bold', pad=15)

        # Set the aspect ratio to make the pie chart perfectly circular
        pie_ax.axis('equal')

        # Reduce the font size for labels and percentages
        for text in texts + autotexts:
            text.set_fontsize(3)  # Smaller font size for the labels and percentages
            text.set_fontweight('bold')
            text.set_color('black')

        # Show the pie chart
        st.pyplot(pie_fig)

    
  # Display message based on the health classification
        if health_message == "Excellent":
            st.success("🎉 Your device battery health is excellent! You're doing an amazing job maintaining it! 🌟")
            st.markdown("""
               ### **Excellent Battery Condition Report**
    
    **Overview**: 
    An "Excellent" battery condition indicates that the battery is in peak performance, offering maximum charge retention and efficiency across various vehicle types. This battery can easily support the electrical needs of the vehicle, providing smooth starts and reliable performance of all connected systems.
    
    **Key Indicators:**
    - **Voltage**: For conventional lead-acid batteries (cars, trucks, buses), the voltage should be 12.6V or higher when the engine is off. For Electric Vehicle (EV) batteries, the state of charge (SOC) should be above 85% of the battery's capacity.
    - **Charge Capacity**: 95% - 100% of original battery capacity.
    - **Charge Retention**: Battery retains charge effectively, supporting longer idle periods without noticeable drainage.
    - **Age**: Less than 2 years old or fewer than 200 charge cycles for cars, 3-4 years or fewer than 400 cycles for trucks and buses, or newer for EVs.
    - **Performance**: Smooth engine starts with no delay, all electrical systems (lights, AC, navigation, infotainment) operate optimally. For EVs, fast charging time and consistent range are observed.

    **Benefits of Excellent Battery Health:**
    - Reliable Starts: The vehicle starts immediately under all conditions, even in cold weather or after prolonged idle times.
    - Optimal Power Supply: All vehicle systems function at peak efficiency, including lighting, HVAC (heating, ventilation, and air conditioning), and infotainment systems.
    - Efficient Power Usage: For electric vehicles (EVs) or hybrid vehicles, the battery provides long-distance driving and optimal charge recovery during regenerative braking.
    - Minimal Maintenance: Requires little maintenance and has a prolonged lifespan.

    **Recommendation:**
    - Continue regular maintenance by cleaning battery terminals and ensuring all connections are tight.
    - Perform periodic checks, including voltage tests and load testing, during regular service visits to ensure long-term efficiency.
    """)


        elif health_message == "Good":
            st.success("👍 Your battery is in good health. Keep following best practices to extend its life!")
            st.markdown("""
            **Overview**: 
    A “Good” battery condition means the battery is still in satisfactory working order but may show minor signs of wear. While it still supports daily use efficiently, it may show slight performance drops as it ages.
    
    **Key Indicators:**
    - **Voltage**: Between 12.4V and 12.6V when the engine is off (for lead-acid batteries). For EVs, the SOC should be between 60% and 85%.
    - **Charge Capacity**: 80% - 90% of original capacity.
    - **Charge Retention**: Retains charge well, but charge drain may occur slightly faster compared to new batteries.
    - **Age**: 2 to 4 years old for cars, 4 to 6 years for trucks and buses, or 3 to 5 years for EVs.
    - **Performance**: The vehicle starts without significant delay. Electrical systems operate normally, although there may be occasional slow starts, especially during colder months or after extended periods of inactivity.

    **Benefits of a Good Battery:**
    - Reliable Starts: The battery provides dependable starts in normal conditions but may require a jump start during extreme cold.
    - Efficient Power Supply: Electrical systems continue to function, though some components may show minor delays or reduced brightness in lights and other electrical systems.
    - Early Signs of Wear: The battery is still functional but may begin to show symptoms of age (slower charging or occasional performance lags).

    **Recommendation:**
    - Monitor performance closely, especially when the weather turns cold.
    - Consider a battery check or load test to assess whether the battery is nearing the end of its life.
    """)

        elif health_message == "Average":
            st.warning("⚠️ Battery health is average. Keep an eye on its performance for potential replacement.")
            st.markdown("""
            **Overview**: 
    An “Average” battery is showing signs of wear. It might still provide power, but performance may be reduced. Depending on the type of vehicle, it may no longer perform optimally and could lead to issues in cold weather.
    
    **Key Indicators:**
    - **Voltage**: Between 12.0V and 12.4V (lead-acid) or between 40% - 60% SOC (EVs).
    - **Charge Capacity**: 60% - 75% of original capacity.
    - **Charge Retention**: The battery loses charge more quickly than it used to, requiring more frequent charging.
    - **Age**: Over 4 years for cars, over 6 years for trucks/buses, over 5 years for EVs.
    - **Performance**: Occasional slow starts, especially under heavy load (e.g., during use of HVAC or other systems). The battery is at risk of failure in cold weather.

    **Recommendation:**
    - Prepare to replace the battery soon, especially if it’s a lead-acid battery or an older EV battery.
    - Use the vehicle in warmer weather or for shorter trips to avoid deep discharge.
    """)


        else:
            st.error("🔴 Battery health is poor. Immediate replacement may be necessary to avoid breakdown.")
            st.markdown("""
             ### **Poor Battery Condition Report**
    
    **Overview**: 
    A “Poor” battery needs immediate attention. It is no longer effective at providing power to the vehicle and may cause reliability issues. This battery is likely unable to function effectively in cold weather and should be replaced soon.
    
    **Key Indicators:**
    - **Voltage**: Below 12.0V (for lead-acid batteries) or below 40% SOC (EVs).
    - **Charge Capacity**: Below 50% of original capacity.
    - **Charge Retention**: The battery loses charge very quickly and may fail to start the vehicle on its own.
    - **Age**: Over 6 years for cars, 8 years for trucks and buses, or over 7 years for EVs.
    - **Performance**: Very slow starts, especially in cold weather. Electrical systems may fail or not work optimally.

    **Recommendation:**
    - Replace the battery as soon as possible to prevent vehicle breakdown or loss of essential systems (lighting, heating, etc.).
    - Consider battery replacement services and consult your vehicle manufacturer for suitable replacement options.
    """)
        # Offer a download button for the prediction history
        csv = st.session_state.prediction_history.to_csv(index=False)
        st.download_button("Download Prediction History", data=csv, file_name="prediction_history.csv", mime="text/csv")
    else:
        st.write("No predictions made yet.")
