import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
import joblib

data = pd.read_csv("/home/bhoomi/Downloads/Fuel efficiency/Fuel_Consumption_2000-2022.csv")

data = data[['ENGINE SIZE', 'CYLINDERS', 'FUEL CONSUMPTION', 'MAKE', 'VEHICLE CLASS', 'TRANSMISSION', 'FUEL']]
data = pd.get_dummies(data, columns=['MAKE', 'VEHICLE CLASS', 'TRANSMISSION', 'FUEL'], drop_first=True)

X = data.drop('FUEL CONSUMPTION', axis=1)
y = data['FUEL CONSUMPTION']

feature_names = X.columns
joblib.dump(feature_names, 'feature_names.joblib')

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, 'fuel_efficiency_gb_model.joblib')

