from flask import Flask, request, jsonify
from utils import preprocess_data
import numpy as np
import pickle

app = Flask(__name__)

# Load saved model pipeline
clf_pipeline = pickle.load(open('./ph_fake_news_pipeline.pkl', 'rb'))

# Target Classes
mapped_dict = {'real': 0, 'fake': 1}
mapped_list = list(mapped_dict.keys())

@app.route('/', methods=['GET','POST'])
def index():
  if request.method == 'POST':
    data = request.json['news']
    processed_data = preprocess_data(data)

    data_arr = np.array([processed_data])

    prediction = clf_pipeline.predict(data_arr)
    probability = clf_pipeline.predict_proba(data_arr)[0] * 100
    predict_output = mapped_list[list(prediction)[0]]

    return jsonify(data=data,
                  processed_data=processed_data,
                  is_fake=int(prediction[0]),
                  real_probability=float(probability[0]),
                  fake_probability=float(probability[1]),
                  prediction_output=predict_output
                  )
  else:
    data = preprocess_data("I've tested all suggested methods plus np.array(list(map(f, x))) with ... Most of the functions you'd want to apply to a NumPy array")
    return data

if __name__ == '__main__':
   app.run()