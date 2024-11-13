import streamlit as st
import pandas as pd
import joblib
import plotly.express as px
from datetime import datetime

st.set_page_config(layout="wide")

FUEL_PRICE_PER_LITER = 105

model = joblib.load('fuel_efficiency_gb_model.joblib')
model_features = joblib.load('feature_names.joblib')
data = pd.read_csv("/home/bhoomi/Downloads/Fuel efficiency/Fuel_Consumption_2000-2022.csv")

# Vehicle options
makes = ['ACURA', 'ALFA ROMEO', 'ASTON MARTIN', 'AUDI', 'BENTLEY', 'BMW', 'BUGATTI', 'BUICK', 'CADILLAC', 'CHEVROLET',
         'CHRYSLER', 'DAEWOO', 'DODGE', 'FERRARI', 'FIAT', 'FORD', 'GENESIS', 'GMC', 'HONDA', 'HUMMER', 'HYUNDAI',
         'INFINITI', 'ISUZU', 'JAGUAR', 'JEEP', 'KIA', 'LAMBORGHINI', 'LAND ROVER', 'LEXUS', 'LINCOLN', 'MASERATI',
         'MAZDA', 'MERCEDES-BENZ', 'MINI', 'MITSUBISHI', 'NISSAN', 'OLDSMOBILE', 'PLYMOUTH', 'PONTIAC', 'PORSCHE',
         'RAM', 'ROLLS-ROYCE', 'SAAB', 'SATURN', 'SCION', 'SMART', 'SRT', 'SUBARU', 'SUZUKI', 'TOYOTA', 'VOLKSWAGEN',
         'VOLVO']

vehicle_classes = ['COMPACT', 'FULL-SIZE', 'MID-SIZE', 'MINICOMPACT', 'MINIVAN', 'PICKUP TRUCK - SMALL',
                   'PICKUP TRUCK - STANDARD', 'SPECIAL PURPOSE VEHICLE', 'STATION WAGON - MID-SIZE',
                   'STATION WAGON - SMALL', 'SUBCOMPACT', 'SUV', 'SUV - SMALL', 'SUV - STANDARD', 'TWO-SEATER',
                   'VAN - CARGO', 'VAN - PASSENGER']

transmissions = ['A10', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'AM5', 'AM6', 'AM7', 'AM8', 'AM9', 'AS10', 'AS4',
                 'AS5', 'AS6', 'AS7', 'AS8', 'AS9', 'AV', 'AV1', 'AV10', 'AV6', 'AV7', 'AV8', 'M4', 'M5', 'M6', 'M7']

fuel_types = {
    'X': 'Regular gasoline',
    'Z': 'Premium gasoline',
    'D': 'Diesel',
    'E': 'Ethanol (E85)',
    'N': 'Natural Gas'
}

# Sidebar navigation
page = st.sidebar.radio("Navigation", ["Prediction", "Dashboard"])
# Parameter Description
st.sidebar.markdown("## Parameter Descriptions")
st.sidebar.write("""
- **Engine Size (L):** The size of the vehicle's engine in liters.
- **Cylinders:** Number of cylinders in the engine.
- **Fuel Consumption (Comb) (L/100 km):** Combined fuel consumption.
- **Highway Fuel Consumption (L/100 km):** Fuel consumption on highways.
- **Make:** Vehicle manufacturer.
- **Vehicle Class:** Category or class of the vehicle.
- **Transmission:** Type of transmission.
- **Fuel Type:** Type of fuel used by the vehicle.
""")



# Prediction Page
if page == "Prediction":
    st.title("⛽Fuel Efficiency Prediction Dashboard")
    
    # Input Form
    st.subheader("Enter Vehicle Specifications")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        engine_size = st.slider("Engine Size (L)", min_value=0.8, max_value=8.4, value=3.0, step=0.1)
        cylinders = st.slider("Cylinders", min_value=2, max_value=16, value=6, step=1)
    
    with col2:
        fuel_consumption = st.slider("Fuel Consumption (Comb) (L/100 km)", min_value=3.6, max_value=26.1, value=12.0)
        highway_fuel_consumption = st.slider("Highway Fuel Consumption (L/100 km)", min_value=3.2, max_value=20.9, value=8.5)
    
    with col3:
        make = st.selectbox("Make", options=makes)
        vehicle_class = st.selectbox("Vehicle Class", options=vehicle_classes)
        transmission = st.selectbox("Transmission", options=transmissions)
    
    fuel_type_display = st.selectbox("Fuel Type", options=fuel_types.values())
    fuel_type = [k for k, v in fuel_types.items() if v == fuel_type_display][0]
    
    # Prepare input data
    input_data = {
        'ENGINE SIZE': [engine_size],
        'CYLINDERS': [cylinders],
        f'MAKE_{make}': 1,
        f'VEHICLE CLASS_{vehicle_class}': 1,
        f'TRANSMISSION_{transmission}': 1,
        f'FUEL_{fuel_type}': 1
    }
    
    input_df = pd.DataFrame(input_data).reindex(columns=model_features, fill_value=0)
    
    if st.button("Predict Fuel Consumption"):
        prediction = model.predict(input_df)[0]
        estimated_cost = prediction * FUEL_PRICE_PER_LITER
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        new_prediction = {'Timestamp': timestamp, 'Fuel Consumption': prediction, 'Estimated Cost': estimated_cost}
        if 'predictions' not in st.session_state:
            st.session_state.predictions = []
        st.session_state.predictions.append(new_prediction)
        
        st.success(f"Predicted Combined Fuel Consumption: {prediction:.2f} L/100 km")
        st.info(f"Estimated Fuel Cost for 100 km: ₹{estimated_cost:.2f}")
        
        # Visualization of similar vehicles
        filtered_data = data[(data['MAKE'] == make) & (data['VEHICLE CLASS'] == vehicle_class) &
                             (data['CYLINDERS'] == cylinders) & (data['TRANSMISSION'] == transmission) &
                             (data['FUEL'] == fuel_type)]
        if not filtered_data.empty:
            fig = px.histogram(
                filtered_data,
                x='COMB (L/100 km)',
                title='Fuel Consumption of Similar Vehicles',
                labels={'COMB (L/100 km)': 'Combined Fuel Consumption (L/100 km)'}
            )
            st.plotly_chart(fig)
        else:
            st.warning("We currently don’t have similar vehicles for comparison. As we gather more data, this feature will become more useful. Stay tuned!")
        
        # Display tips if consumption is high
        model_data = data[(data['MAKE'] == make) & (data['VEHICLE CLASS'] == vehicle_class)]
        if not model_data.empty:
            max_fuel_consumption = model_data['COMB (L/100 km)'].max()
            st.session_state['max_fuel_consumption'] = max_fuel_consumption
            if prediction > max_fuel_consumption:
                st.error("⚠️ WARNING: Your car is consuming more fuel than similar vehicles.")
                
                
# Dashboard Page
elif page == "Dashboard":
    st.title("📊Prediction History Dashboard")
    # Check if predictions exist in session state
    if 'predictions' in st.session_state and st.session_state.predictions:
        predictions_df = pd.DataFrame(st.session_state.predictions)
        max_fuel_consumption = st.session_state.get('max_fuel_consumption', predictions_df['Fuel Consumption'].max())

        # Get the latest prediction and check against max fuel consumption
        latest_prediction = predictions_df.iloc[-1]
        if latest_prediction['Fuel Consumption'] > max_fuel_consumption:
            st.error("⚠️ WARNING: Your car is consuming more fuel than similar vehicles.")
        else:
            st.success("✅ Your car's fuel consumption is within the normal range. Keep up the good maintenance!")

        # Display fuel consumption and cost in separate columns
        col1, col2 = st.columns(2)
        with col1:
            st.markdown("#### 🚗 Fuel Consumption")
            st.metric(label="Fuel Consumption (L/100 km)", value=f"{latest_prediction['Fuel Consumption']:.2f}")
        with col2:
            st.markdown("#### 💰 Estimated Cost")
            st.metric(label="Estimated Cost (₹ per 100 km)", value=f"{latest_prediction['Estimated Cost']:.2f}")
        
        st.markdown("### Summary Statistics")
        total_predictions = len(predictions_df)
        normal_conditions = sum(predictions_df['Fuel Consumption'] <= max_fuel_consumption)
        warning_conditions = total_predictions - normal_conditions
        col1, col2, col3 = st.columns(3)
        col1.metric("Total Predictions", total_predictions)
        col2.metric("Normal", normal_conditions)
        col3.metric("Warning", warning_conditions)

        st.markdown("### Recent Predictions")
        st.write(predictions_df)
        
        # Fuel Consumption Over Time - Keeping previous style with black border and centering the graph
        fig2 = px.line(
            predictions_df, 
            x="Timestamp", 
            y="Fuel Consumption", 
            title="Fuel Consumption Over Time",
            labels={"Fuel Consumption": "Fuel Consumption (L/100 km)", "Timestamp": "Timestamp"},
            line_shape="linear", 
            markers=True
        )
        fig2.update_layout(
            plot_bgcolor="white",
            title_x=0.5,  # Center the title
            title_font=dict(size=18),
            xaxis_title="Time",
            yaxis_title="Fuel Consumption (L/100 km)",
            xaxis=dict(showgrid=False),
            yaxis=dict(showgrid=True, gridwidth=0.5, gridcolor='gray'),
            margin=dict(l=50, r=50, t=50, b=50),
            shapes=[dict(
                type="rect", 
                x0=0, x1=1, y0=0, y1=1,
                xref="paper", yref="paper",
                line=dict(color="black", width=2)
            )]
        )
        st.plotly_chart(fig2, use_container_width=True)

        st.markdown("""
        **Fuel Consumption Over Time**: 
        This graph visualizes how your vehicle's fuel consumption changes over time. Monitoring this trend allows you to detect any unusual spikes in fuel usage, which could indicate issues with vehicle performance or maintenance. A consistent upward trend may signal the need for repairs or maintenance, such as tire inflation, spark plug replacement, or air filter changes.
        """)
        
        # Pie chart - Removing the border and adjusting the title spacing
        fig4 = px.pie(
            names=["Normal", "Warning"], 
            values=[normal_conditions, warning_conditions], 
            title="Condition Distribution",
            color=["Normal", "Warning"],
            color_discrete_map={"Normal": "green", "Warning": "red"},
            hole=0.3
        )
        fig4.update_traces(
            textinfo='percent+label', 
            pull=[0.1, 0.1],
            textfont=dict(size=14, color='black')  # Set the percentage font color to black and increase size
        )
        fig4.update_layout(
            title=dict(
                text="Condition Distribution",  # Title text
                x=0.5,  # Center the title horizontally
                xanchor="center",  # Align title to the center horizontally
                y=0.95,  # Add some vertical spacing above the chart
                yanchor="top",  # Align title to the top
                font=dict(size=18)  # Title font size
            ),
            plot_bgcolor="white",  # Background color of the plot
            margin=dict(l=50, r=50, t=80, b=50),  # Adjust margins to give space around the chart
            width=400,  # Adjust pie chart width
            height=400  # Adjust pie chart height
        )
        st.plotly_chart(fig4, use_container_width=True)

        st.markdown("""
        **Condition Distribution**: 
        The pie chart shows the proportion of predictions that are within the normal fuel consumption range versus those that fall under the "warning" category. A higher percentage of "Normal" predictions suggests your vehicle is performing well, while a higher percentage of "Warning" predictions may require further investigation to avoid excessive fuel consumption.
        """)

        # Display the latest prediction result below the pie chart
        latest_prediction = predictions_df.iloc[-1]
    
        # Additional styling for better readability
        st.markdown("### 📋 Tips to Improve Fuel Efficiency:")
        st.write("""
        - **Under-inflated Tires**: Increases rolling resistance.
        - **Dirty Air Filter**: Reduces air intake efficiency, causing the engine to burn more fuel.
        - **Worn Spark Plugs**: Inefficient combustion leads to more fuel usage.
        - **Bad Oxygen Sensor**: Misreading fuel-air mixture data can lead to excess fuel usage.
        - **Aggressive Driving Habits**: Rapid acceleration and heavy braking consume more fuel.
        - **Excessive Idling**: Prolonged idling burns fuel without moving the vehicle.
        """)

        st.markdown("### 🔍 Symptoms of High Fuel Consumption:")
        st.write("""
        - Decreased miles per gallon (mpg).
        - Frequent refueling required.
        - Poor engine performance.
        """)

        st.markdown("### 🔧 Suggested Repairs and Maintenance:")
        st.write("""
        - **Inflate Tires**: Check and maintain optimal tire pressure.
        - **Replace Air Filter**: Install a new air filter if it's clogged or dirty.
        - **Change Spark Plugs**: Replace worn spark plugs for efficient combustion.
        - **Check Oxygen Sensors**: Replace faulty sensors to improve fuel-air ratio.
        - **Drive Smoothly**: Avoid rapid acceleration and braking.
        - **Reduce Idling**: Turn off the engine when parked.
        """)

        # Provide download button for CSV
        csv = predictions_df.to_csv(index=False)
        st.download_button("Download Complete History", data=csv, file_name="fuel_predictions_history.csv", mime="text/csv")
    else:
        st.write("We currently don’t have similar vehicles for comparison. As we gather more data, this feature will become more useful. Stay tuned!")