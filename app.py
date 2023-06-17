from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def ExpertRange(datasetLine):
    ERange = np.array([], int)
    for i in datasetLine:
        for j in datasetLine:
            if i > j:
                ERange = np.append(ERange, -1)
            elif i < j:
                ERange = np.append(ERange, 1)
            else:
                ERange = np.append(ERange, 0)
    ERange = ERange.reshape(np.size(datasetLine), np.size(datasetLine))
    return ERange

def RangeDistance(dataset):
    tempArray = np.array([], int)
    for i in dataset:
        for j in dataset:
            tempArray = np.append(tempArray, np.count_nonzero(
                ExpertRange(i)-ExpertRange(j)))
    tempArray = tempArray.reshape(dataset.shape[0], dataset.shape[0])
    return tempArray

def dmax(dataset):
    return dataset.shape[1]*(dataset.shape[1]-1)

def distanceMatrixRelationVeiw(matrix, dmax):
    return np.round(matrix/dmax, 2)


@app.route('/puro', methods=['POST', 'OPTIONS'])
@cross_origin()
def puro():
    pandas_dataset = pd.DataFrame(request.get_json()['data'])
    dataset = pandas_dataset.to_numpy()

    rangeDistance = RangeDistance(dataset)

    rangeDistancePercent = distanceMatrixRelationVeiw(
            RangeDistance(dataset), dmax(dataset))
    
    return jsonify({"rangeDistance": rangeDistance.tolist(), "rangeDistancePercent": rangeDistancePercent.tolist()})

if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True)