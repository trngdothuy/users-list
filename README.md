# 🧩 Full Stack Web App – React + FastAPI + AWS

A full-stack web application built with a **React** frontend and a **FastAPI** backend, deployed on **AWS** (S3 for frontend, EC2 for backend).

Result: http://aaatest098.s3-website.eu-north-1.amazonaws.com/

---

## 📁 Project Structure
react-python/ 
    ├── my-app/ # Frontend - React app 
    └── my-backend/ # Backend - FastAPI app

---

## 🚀 Tech Stack

- **Frontend**: React, JavaScript
- **Backend**: FastAPI, Python
- **Database**: DynamoDB 
- **Deployment**:
  - Frontend: AWS S3 (static site)
  - Backend: AWS EC2

---

## Frontend (React)

### Local Development

```bash
npm install
npm start
```

### Deploy to S3

```bash
npm run build
aws s3 sync build/ s3://aaatest098
```


## Backend (FastAPI)

### Setup on Local

```bash
python3 -m venv venv
source venv/bin/activate
pip install boto3 fastapi uvicorn
uvicorn main:app --reload
```

### Deploy to EC2

1. SSH into your EC2 instance:
```bash
ssh -i test1.pem ec2-user@51.21.130.251
```

2. Clone repo:
```bash
git clone https://github.com/trngdothuy/users-list.git
```

3. Navigate to backend directory:

```bash
cd react-python/my-backend
```

4. Set up Python and virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
pip install boto3 fastapi uvicorn
```

5. Run backend:
```bash
nohup uvicorn main:app --host 0.0.0.0 --port 8000 &
```

## API Endpoints

- `GET /items` - Get all items
- `POST /items` - Add item
- `DELETE /items/{id}` - Delete item

## Notes

- Frontend fetches from: `http://51.21.130.251`
- Ensure EC2 security group allows port 8000 (custom TCP, source 0.0.0.0/0)
- If backend updates, re-upload files or `git pull` on EC2
- If port in use: `sudo lsof -i :8000` → kill the process
```