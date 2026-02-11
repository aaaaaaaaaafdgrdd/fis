from flask import Flask, render_template
import datetime

app = Flask(__name__)

# Dummy Data
speakers = [
    {"id": 1, "first_name": "Alice", "last_name": "Johnson", "linkedin": "https://linkedin.com/in/alicejohnson"},
    {"id": 2, "first_name": "Bob", "last_name": "Smith", "linkedin": "https://linkedin.com/in/bobsmith"},
    {"id": 3, "first_name": "Charlie", "last_name": "Brown", "linkedin": "https://linkedin.com/in/charliebrown"},
    {"id": 4, "first_name": "Diana", "last_name": "Prince", "linkedin": "https://linkedin.com/in/dianaprince"},
    {"id": 5, "first_name": "Evan", "last_name": "Wright", "linkedin": "https://linkedin.com/in/evanwright"},
    {"id": 6, "first_name": "Fiona", "last_name": "Gallagher", "linkedin": "https://linkedin.com/in/fionagallagher"},
    {"id": 7, "first_name": "George", "last_name": "Miller", "linkedin": "https://linkedin.com/in/georgemiller"},
    {"id": 8, "first_name": "Hannah", "last_name": "Montana", "linkedin": "https://linkedin.com/in/hannahmontana"},
    {"id": 9, "first_name": "Ian", "last_name": "Somerhalder", "linkedin": "https://linkedin.com/in/iansomerhalder"},
    {"id": 10, "first_name": "Julia", "last_name": "Roberts", "linkedin": "https://linkedin.com/in/juliaroberts"},
    {"id": 11, "first_name": "Kevin", "last_name": "Bacon", "linkedin": "https://linkedin.com/in/kevinbacon"},
    {"id": 12, "first_name": "Liam", "last_name": "Neeson", "linkedin": "https://linkedin.com/in/liamneeson"},
    {"id": 13, "first_name": "Mila", "last_name": "Kunis", "linkedin": "https://linkedin.com/in/milakunis"},
]

talks = [
    {
        "id": 1,
        "title": "Keynote: The Future of Cloud Computing",
        "speakers": [speakers[0], speakers[1]],
        "category": "Keynote",
        "description": "An overview of where cloud technology is heading in the next decade.",
        "time": "09:00 - 09:45"
    },
    {
        "id": 2,
        "title": "Serverless Architecture on Google Cloud",
        "speakers": [speakers[2]],
        "category": "Serverless",
        "description": "Deep dive into Cloud Functions and Cloud Run.",
        "time": "09:45 - 10:30"
    },
    {
        "id": 3,
        "title": "BigQuery for Data Analysts",
        "speakers": [speakers[3]],
        "category": "Data Analytics",
        "description": "How to leverage BigQuery for massive datasets.",
        "time": "10:30 - 11:15"
    },
    {
        "id": "lunch",
        "title": "Lunch Break",
        "speakers": [],
        "category": "Break",
        "description": "Enjoy a healthy lunch and networking.",
        "time": "11:15 - 12:15"
    },
    {
        "id": 4,
        "title": "Machine Learning with Vertex AI",
        "speakers": [speakers[4], speakers[5]],
        "category": "AI/ML",
        "description": "Building and deploying models with Vertex AI.",
        "time": "12:15 - 13:00"
    },
    {
        "id": 5,
        "title": "Kubernetes Best Practices",
        "speakers": [speakers[6]],
        "category": "Containers",
        "description": "Optimizing your GKE clusters for performance and cost.",
        "time": "13:00 - 13:45"
    },
    {
        "id": 6,
        "title": "Security in the Cloud",
        "speakers": [speakers[7]],
        "category": "Security",
        "description": "Securing your Google Cloud infrastructure.",
        "time": "13:45 - 14:30"
    },
    {
        "id": 7,
        "title": "Networking Deep Dive",
        "speakers": [speakers[8], speakers[9]],
        "category": "Networking",
        "description": "Understanding VPCs, Load Balancers, and Hybrid Connectivity.",
        "time": "14:30 - 15:15"
    },
    {
        "id": 8,
        "title": "DevOps with Cloud Build",
        "speakers": [speakers[11]],
        "category": "DevOps",
        "description": "Automating your CI/CD pipelines.",
        "time": "15:15 - 16:00"
    },
    {
        "id": 9,
        "title": "Cost Management in the Cloud",
        "speakers": [speakers[12]],
        "category": "Management",
        "description": "Strategies to monitor and reduce your cloud bill.",
        "time": "16:00 - 16:45"
    },
    {
        "id": 10,
        "title": "Closing Remarks & QA",
        "speakers": [speakers[10]],
        "category": "Keynote",
        "description": "Wrap up of the day and open floor for questions.",
        "time": "16:45 - 17:30"
    }
]

@app.context_processor
def inject_now():
    return {'now': datetime.datetime.now()}

@app.route('/')
def index():
    return render_template('index.html', talks=talks)

if __name__ == '__main__':
    app.run(debug=True)
