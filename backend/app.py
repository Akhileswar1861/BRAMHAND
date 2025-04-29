from flask import Flask, request, Response
from flask_cors import CORS
import pandas as pd
import json

app = Flask(__name__)
CORS(app)  # Allow frontend requests

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return Response(json.dumps({'success': False, 'error': 'No file part in request'}), mimetype='application/json'), 400

    file = request.files['file']

    if file.filename == '':
        return Response(json.dumps({'success': False, 'error': 'No selected file'}), mimetype='application/json'), 400

    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
        else:
            return Response(json.dumps({'success': False, 'error': 'Unsupported file format. Please upload CSV or Excel.'}), mimetype='application/json'), 400

        if df.empty:
            return Response(json.dumps({'success': False, 'error': 'Uploaded file is empty or invalid.'}), mimetype='application/json'), 400

        rows = df.shape[0]
        cols = df.shape[1]
        missing_values = int(df.isnull().sum().sum())

        object_cols = df.select_dtypes(include=['object', 'category']).columns
        task_type = 'classification' if len(object_cols) > 0 else 'regression'

        # ✅ Absolutely reliable NaN-safe cleaning
        df_cleaned = df.head(5).astype(object).where(pd.notnull(df.head(5)), None)
        preview_data = df_cleaned.to_dict(orient='records')

        response = {
            'success': True,
            'preview_data': preview_data,
            'columns': list(df.columns),
            'metrics': {
                'rows': rows,
                'columns': cols,
                'missing_values': missing_values
            },
            'task_type': task_type
        }

        print("✅ Response Ready:", response)
        return Response(json.dumps(response, allow_nan=False), mimetype='application/json'), 200

    except Exception as e:
        print("❌ Exception occurred:", str(e))
        return Response(json.dumps({'success': False, 'error': f'Internal server error: {str(e)}'}), mimetype='application/json'), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
