import streamlit as st
import pickle
import numpy as np
import pandas as pd
import datetime
from pathlib import Path
import altair as alt

# Initialize session state for storing predictions
if 'predictions' not in st.session_state:
    st.session_state.predictions = []

# Load the trained model
with open('hhmodel.pkl', 'rb') as file:
    model = pickle.load(file)

# Define the customized ranges for each feature based on dataset statistics
custom_ranges = {
    'Engine rpm': (61.0, 2239.0),
    'Lub oil pressure': (0.003384, 7.265566),
    'Fuel pressure': (0.003187, 21.138326),
    'Coolant pressure': (0.002483, 7.478505),
    'lub oil temp': (71.321974, 89.580796),
    'Coolant temp': (61.673325, 195.527912),
    'Temperature_difference': (-22.669427, 119.008526)
}

# Feature Descriptions
feature_descriptions = {
    'Engine rpm': 'Revolution per minute of the engine.',
    'Lub oil pressure': 'Pressure of the lubricating oil.',
    'Fuel pressure': 'Pressure of the fuel.',
    'Coolant pressure': 'Pressure of the coolant.',
    'lub oil temp': 'Temperature of the lubricating oil.',
    'Coolant temp': 'Temperature of the coolant.',
    'Temperature_difference': 'Temperature difference between components.'
}

def predict_condition(engine_rpm, lub_oil_pressure, fuel_pressure, coolant_pressure, lub_oil_temp, coolant_temp, temp_difference):
    """Predict engine condition using the loaded model"""
    input_data = np.array([engine_rpm, lub_oil_pressure, fuel_pressure, coolant_pressure, 
                          lub_oil_temp, coolant_temp, temp_difference]).reshape(1, -1)
    prediction = model.predict(input_data)
    confidence = model.predict_proba(input_data)[:, 1]
    return prediction[0], confidence[0]

def prediction_page():
    """Page for making new predictions"""
    st.title("🏎️💨Engine Condition Prediction")
    st.write("Enter Vehicle Specifications")

    # Display feature descriptions in sidebar
    st.sidebar.title("Feature Descriptions")
    for feature, description in feature_descriptions.items():
        st.sidebar.markdown(f"**{feature}:** {description}")

    # Input widgets with customized ranges
    input_values = {}
    
    col1, col2 = st.columns(2)
    
    with col1:
        input_values['engine_rpm'] = st.slider(
            "Engine RPM", 
            min_value=float(custom_ranges['Engine rpm'][0]),
            max_value=float(custom_ranges['Engine rpm'][1]),
            value=float(custom_ranges['Engine rpm'][1] / 2)
        )
        
        input_values['lub_oil_pressure'] = st.slider(
            "Lub Oil Pressure",
            min_value=custom_ranges['Lub oil pressure'][0],
            max_value=custom_ranges['Lub oil pressure'][1],
            value=(custom_ranges['Lub oil pressure'][0] + custom_ranges['Lub oil pressure'][1]) / 2
        )
        
        input_values['fuel_pressure'] = st.slider(
            "Fuel Pressure",
            min_value=custom_ranges['Fuel pressure'][0],
            max_value=custom_ranges['Fuel pressure'][1],
            value=(custom_ranges['Fuel pressure'][0] + custom_ranges['Fuel pressure'][1]) / 2
        )
        
        input_values['coolant_pressure'] = st.slider(
            "Coolant Pressure",
            min_value=custom_ranges['Coolant pressure'][0],
            max_value=custom_ranges['Coolant pressure'][1],
            value=(custom_ranges['Coolant pressure'][0] + custom_ranges['Coolant pressure'][1]) / 2
        )
    
    with col2:
        input_values['lub_oil_temp'] = st.slider(
            "Lub Oil Temperature",
            min_value=custom_ranges['lub oil temp'][0],
            max_value=custom_ranges['lub oil temp'][1],
            value=(custom_ranges['lub oil temp'][0] + custom_ranges['lub oil temp'][1]) / 2
        )
        
        input_values['coolant_temp'] = st.slider(
            "Coolant Temperature",
            min_value=custom_ranges['Coolant temp'][0],
            max_value=custom_ranges['Coolant temp'][1],
            value=(custom_ranges['Coolant temp'][0] + custom_ranges['Coolant temp'][1]) / 2
        )
        
        input_values['temp_difference'] = st.slider(
            "Temperature Difference",
            min_value=custom_ranges['Temperature_difference'][0],
            max_value=custom_ranges['Temperature_difference'][1],
            value=(custom_ranges['Temperature_difference'][0] + custom_ranges['Temperature_difference'][1]) / 2
        )

    col1, col2 = st.columns(2)
    
    with col1:
        # Predict button
        if st.button("Predict Engine Condition", use_container_width=True):
            values = list(input_values.values())
            result, confidence = predict_condition(*values)
            
            # Save prediction
            save_prediction(values, result, confidence)

            # Display result
            if result == 0:
                st.info(f"The engine is predicted to be in a normal condition. Confidence level: {1.0 - confidence:.2%}")
            else:
                st.warning(f"⚠️Warning! Please investigate further. Confidence level: {1.0 - confidence:.2%}")

    

def save_prediction(values, prediction, confidence):
    """Save prediction data to session state and CSV file"""
    timestamp = datetime.datetime.now()
    prediction_data = {
        'timestamp': timestamp.strftime('%Y-%m-%d %H:%M:%S'),
        'Engine rpm': values[0],
        'Lub oil pressure': values[1],
        'Fuel pressure': values[2],
        'Coolant pressure': values[3],
        'lub oil temp': values[4],
        'Coolant temp': values[5],
        'Temperature_difference': values[6],
        'prediction': int(prediction),
        'confidence': float(confidence)
    }
    
    st.session_state.predictions.append(prediction_data)
    
    # Save to CSV file
    df = pd.DataFrame([prediction_data])
    csv_path = Path('predictions_history.csv')
    
    if csv_path.exists():
        df.to_csv(csv_path, mode='a', header=False, index=False)
    else:
        df.to_csv(csv_path, index=False)

def load_prediction_history():
    """Load prediction history from CSV file"""
    try:
        return pd.read_csv('predictions_history.csv')
    except FileNotFoundError:
        return pd.DataFrame()

def create_altair_chart(data, x_col, y_col, title, width=300, height=200):
    """Create a customized Altair chart"""
    chart = alt.Chart(data).mark_bar().encode(
        x=x_col,
        y=y_col,
        color=alt.value('#1f77b4')
    ).properties(
        width=width,
        height=height,
        title=title
    )
    return chart

def dashboard_page():
    """Page for viewing prediction history and analytics"""
    st.title("📊 Prediction History Dashboard")
    
    
    # Load prediction history
    df = load_prediction_history()
    
    if df.empty:
        st.warning("No prediction history available yet.")
        return
    
     # Display Prediction Result on Dashboard (last prediction)
    st.subheader("Latest Prediction")
    last_prediction = df.iloc[-1]  # Get the most recent prediction row
    result = last_prediction['prediction']
    confidence = last_prediction['confidence']  # Assuming there's a confidence column
    
    if result == 0:
        st.info(f"The engine is predicted to be in a normal condition. Confidence level: {confidence:.2%}")
    else:
        st.warning(f"⚠️Warning! Please investigate further. Confidence level: {confidence:.2%}")

    # Summary Statistics in smaller columns
    st.subheader("Summary Statistics")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        total_predictions = len(df)
        st.metric("Total Predictions", total_predictions)
    
    with col2:
        normal_count = len(df[df['prediction'] == 0])
        st.metric("Normal", normal_count)
    
    with col3:
        warning_count = len(df[df['prediction'] == 1])
        st.metric("Warning", warning_count)

    # Create two columns for the first row of charts
    col1, col2 = st.columns(2)

    with col1:
        # Condition Distribution
        prediction_counts = pd.DataFrame({
            'Condition': ['Normal', 'Warning'],
            'Count': [normal_count, warning_count]
        })
        chart = create_altair_chart(
            prediction_counts,
            'Condition',
            'Count',
            'Engine Conditions Distribution'
        )
        st.altair_chart(chart, use_container_width=True)

    with col2:
        # Temperature Comparison
        df['hour'] = pd.to_datetime(df['timestamp']).dt.hour
        temp_data = df.groupby('hour')[['lub oil temp', 'Coolant temp']].mean().reset_index()
        temp_data_melted = pd.melt(
            temp_data,
            id_vars=['hour'],
            value_vars=['lub oil temp', 'Coolant temp'],
            var_name='Temperature Type',
            value_name='Temperature'
        )
        temp_chart = alt.Chart(temp_data_melted).mark_line().encode(
            x='hour:O',
            y='Temperature:Q',
            color='Temperature Type:N',
            tooltip=['hour', 'Temperature', 'Temperature Type']
        ).properties(
            title='Temperature Trends',
            width=300,
            height=200
        )
        st.altair_chart(temp_chart, use_container_width=True)

   # Create four separate sections for graphs
    st.subheader("Engine Condition Distribution")
    prediction_counts = pd.DataFrame({
        'Condition': ['Normal', 'Warning'],
        'Count': [normal_count, warning_count]
    })
    condition_chart = create_altair_chart(
        prediction_counts,
        'Condition',
        'Count',
        'Engine Conditions Distribution'
    )
    st.altair_chart(condition_chart, use_container_width=True)

    st.subheader("Temperature Trends")
    df['hour'] = pd.to_datetime(df['timestamp']).dt.hour
    temp_data = df.groupby('hour')[['lub oil temp', 'Coolant temp']].mean().reset_index()
    temp_data_melted = pd.melt(
        temp_data,
        id_vars=['hour'],
        value_vars=['lub oil temp', 'Coolant temp'],
        var_name='Temperature Type',
        value_name='Temperature'
    )
    temp_chart = alt.Chart(temp_data_melted).mark_line().encode(
        x='hour:O',
        y='Temperature:Q',
        color='Temperature Type:N',
        tooltip=['hour', 'Temperature', 'Temperature Type']
    ).properties(
        title='Temperature Trends Over Time',
        width=600,
        height=400
    )
    st.altair_chart(temp_chart, use_container_width=True)

    st.subheader("Pressure Trends")
    pressure_data = df.groupby('hour')[['Lub oil pressure', 'Fuel pressure', 'Coolant pressure']].mean().reset_index()
    pressure_data_melted = pd.melt(
        pressure_data,
        id_vars=['hour'],
        value_vars=['Lub oil pressure', 'Fuel pressure', 'Coolant pressure'],
        var_name='Pressure Type',
        value_name='Pressure'
    )
    pressure_chart = alt.Chart(pressure_data_melted).mark_line().encode(
        x='hour:O',
        y='Pressure:Q',
        color='Pressure Type:N',
        tooltip=['hour', 'Pressure', 'Pressure Type']
    ).properties(
        title='Pressure Trends Over Time',
        width=600,
        height=400
    )
    st.altair_chart(pressure_chart, use_container_width=True)

    st.subheader("Engine RPM Trend")
    rpm_data = df.groupby('hour')[['Engine rpm']].mean().reset_index()
    rpm_chart = alt.Chart(rpm_data).mark_line().encode(
        x='hour:O',
        y='Engine rpm:Q',
        tooltip=['hour', 'Engine rpm']
    ).properties(
        title='Engine RPM Over Time',
        width=600,
        height=400
    )
    st.altair_chart(rpm_chart, use_container_width=True)

    # Recent Predictions Table
    st.subheader("Recent Predictions")
    recent_cols = ['timestamp', 'prediction', 'Engine rpm', 'lub oil temp', 'Coolant temp']
    recent_predictions = df[recent_cols].tail(5).sort_values('timestamp', ascending=False)
    st.dataframe(recent_predictions, height=200)

    
     # Display Prediction Result on Dashboard (last prediction)
    st.subheader("Latest Prediction")
    last_prediction = df.iloc[-1]  # Get the most recent prediction row
    result = last_prediction['prediction']
    confidence = last_prediction['confidence']  # Assuming there's a confidence column
    
    if result == 0:
      st.info(f"The engine is predicted to be in **normal condition**. Confidence level: {1.0 - confidence:.2%}")
      st.markdown("""
    ### 🚗 Status Summary
    - **Engine Parameters**: The engine's key parameters such as lubricating oil temperature, coolant temperature, oil pressure, and engine RPM are all within their respective optimal ranges, indicating that the engine is operating normally. ✅
    - **Overall Health**: The absence of any unusual fluctuations or abnormalities in the key metrics suggests that the engine is in a healthy and stable state. 🌱
    - **No Immediate Issues**: There are no signs of performance degradation or potential failures detected at this moment. 🚫

    ### Next Steps 🔧
    - **Continue Normal Operations**: The engine is functioning as expected, so you can proceed with regular use and operations without any immediate concerns.
    - **Periodic Monitoring**: While the engine appears to be in good health, it's advisable to continue monitoring key parameters (such as oil temperature, coolant levels, and engine RPM) at regular intervals to detect any potential changes early. 📊
    - **Review Recent Maintenance Logs**: It is always a good practice to check the engine's maintenance history to ensure that all components are functioning optimally. This could include reviewing the last few inspections, oil changes, or any recent repairs performed. 📝
    - **Schedule Regular Diagnostics**: Even though the engine is functioning well now, setting up regular diagnostic checks and maintenance schedules will help ensure that the engine continues to perform optimally and prevent issues before they occur. 🔄
    - **Keep Records Updated**: Keep your engine's performance records and maintenance logs up to date. Regular documentation helps in identifying trends and potential wear over time. 📅

    ### Additional Recommendations 💡
    - **Fuel Quality**: Ensure that the fuel used is of high quality to prevent any impact on engine performance. Poor fuel quality could result in clogging, overheating, and reduced efficiency over time. ⛽
    - **Lubrication and Coolant Levels**: Regularly check and maintain proper lubrication and coolant levels to avoid overheating and to ensure smooth engine operation. 🌡️
    - **Air Filter Maintenance**: An air filter that is clogged or dirty can lead to inefficient engine operation. Periodically inspect and clean the air filter to maintain optimal air intake. 🧰

    ### Long-Term Maintenance 🛠️
    - **Adhere to Manufacturer's Guidelines**: Follow the manufacturer's recommended service intervals and specifications for maximum engine lifespan and performance. 🏭
    - **Listen to the Engine**: Any strange noises or vibrations during operation should be addressed immediately. If any unusual sounds are detected, it could indicate an underlying problem that may not yet be visible in the parameter readings. 👂

    By following these steps and performing regular maintenance, the engine should continue to perform at its best, reducing the likelihood of unexpected failures or issues in the future. 🔧🔧
    """)
    else:
      st.warning(f"**⚠️ Warning!** Anomalous readings detected. Confidence level: {confidence:.2%}")
      st.markdown("""
    ### 🚨 Diagnostic Summary
    The engine diagnostics have detected irregularities, indicating that certain performance parameters are outside the normal range. These anomalies can be the early signs of potential issues. While not necessarily critical, such conditions should be addressed promptly to prevent further damage or unexpected failures.

    ### Possible Causes of Anomalous Readings 🛑
    Several factors could be contributing to the warning status. Common causes include:
    - **Fuel System Issues**: Clogged fuel injectors, fuel pump failure, or poor fuel quality can disrupt the engine's fuel delivery, leading to irregular performance. 
    - **Cooling System Malfunction**: An overheating engine due to low coolant levels, a malfunctioning radiator, or a faulty thermostat can cause warning signals. This can lead to engine parts getting damaged if not addressed quickly. 
    - **Air Intake Blockages**: A clogged air filter or a malfunctioning mass airflow sensor could lead to insufficient air supply, affecting engine performance. 
    - **Oil and Lubrication Problems**: Low or contaminated engine oil, or malfunctioning oil pumps, can result in poor lubrication and increase friction between engine components. 
    - **Ignition System Failure**: Worn-out spark plugs, bad ignition coils, or issues with the timing system can cause engine misfires or reduced power. 

    ### Symptoms of Engine Anomalies 🔍
    Depending on the underlying cause of the warning, the symptoms could manifest as:
    - **Decreased Engine Power**: A noticeable reduction in engine responsiveness, sluggish acceleration, or inability to reach higher speeds. 
    - **Unusual Engine Noises**: Grinding, knocking, or sputtering sounds can indicate issues with internal components, such as pistons, valves, or the fuel system. 
    - **Increased Exhaust Emissions**: Higher-than-normal exhaust emissions, such as thick smoke or strong fuel smells, suggest incomplete combustion or issues with the fuel system. 
    - **Overheating**: The engine temperature gauge may spike, indicating that the engine is running too hot, which could be due to coolant issues or a failing cooling system. 
    - **Check Engine Light**: A steady or flashing check engine light may indicate misfires, sensor issues, or other significant performance problems. 

    ### Recommended Repair Strategies ⚙️
    If your engine is exhibiting any of the above symptoms, here are the steps you should take to address the underlying cause:

    #### 1. Fuel System 🚗
    - **Cause**: Clogged injectors, fuel filter, or fuel pump issues.
    - **Symptoms**: Poor acceleration, engine stalling, or difficulty starting.
    - **Repair Strategy**: 
      - Clean or replace the fuel injectors.
      - Replace the fuel filter if it's clogged.
      - Inspect the fuel pump for proper operation and replace it if necessary.

    #### 2. Cooling System ❄️
    - **Cause**: Low coolant levels, radiator failure, or malfunctioning thermostat.
    - **Symptoms**: Overheating engine, steam coming from under the hood, or high engine temperature.
    - **Repair Strategy**:
      - Check and refill coolant levels. If coolant is low, inspect hoses and radiator for leaks.
      - Replace a malfunctioning thermostat to ensure proper regulation of engine temperature.
      - Inspect and clean the radiator and cooling fans. Replace the radiator if there is significant damage.

    #### 3. Air Intake System 💨
    - **Cause**: Clogged air filter or malfunctioning mass airflow sensor.
    - **Symptoms**: Reduced engine performance, poor fuel efficiency, rough idle.
    - **Repair Strategy**:
      - Replace the air filter if clogged. This ensures optimal airflow into the engine.
      - Check and clean the mass airflow sensor (MAF) for any dirt or debris. If needed, replace the sensor.

    #### 4. Oil and Lubrication 🛢️
    - **Cause**: Low or dirty oil, failing oil pump.
    - **Symptoms**: Engine knocking, increased friction, overheating.
    - **Repair Strategy**:
      - Check oil levels and top up if low. Ensure you're using the recommended type of oil.
      - Change the oil and oil filter regularly to avoid sludge buildup.
      - If the oil pump is failing, replace it immediately to prevent major engine damage.

    #### 5. Ignition System 🔌
    - **Cause**: Worn spark plugs, malfunctioning ignition coils.
    - **Symptoms**: Misfiring, rough idle, difficulty starting.
    - **Repair Strategy**:
      - Replace faulty spark plugs and ignition coils.
      - Check the ignition timing and adjust it if necessary.
      - Inspect the wiring for any damage or corrosion and replace if needed.

    ### Preventive Measures 🛡️
    - **Routine Maintenance**: Ensure that regular maintenance checks are conducted, including oil changes, air filter replacements, and fuel system inspections.
    - **Diagnostic Tools**: Invest in advanced diagnostic tools that can help you monitor engine performance in real-time and catch early warning signs of problems.
    - **Manufacturer's Guidelines**: Always follow the manufacturer's recommended maintenance schedule for your engine model to avoid unnecessary risks and ensure long-term reliability.

    ### Conclusion 📌
    While the engine warning you are seeing indicates a potential issue, it does not necessarily mean a catastrophic failure is imminent. However, ignoring the warning can lead to more significant problems down the road. It is recommended that you address the issue promptly, either through DIY repairs or by seeking professional help to avoid further damage.
    """)

    # Download button for complete history
    csv = df.to_csv(index=False)
    st.download_button(
        label="Download Complete History",
        data=csv,
        file_name="engine_predictions_history.csv",
        mime="text/csv"
    )

def main():
    """Main function to run the Streamlit app"""
    st.sidebar.title("Navigation")
    page = st.sidebar.radio("Go to", ["Prediction", "Dashboard"])
    
    if page == "Prediction":
        prediction_page()
    else:
        dashboard_page()

if __name__ == "__main__":
    main()