# Dockerized-Expenses-app
The MERN stack Expenses Application Dockerized
# MERN Stack Application

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Dockerized-Expenses-App.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Dockerized-Expenses-App
    ```

4. Navigate to the ansible directory:

 ```bash
    cd ansible
    ```
5. Build and start the Docker containers:
```bash
    ansible-playbook -i ../hosts.yaml deploy.yaml
    ```

5. Open your browser and visit http://20.93.2.157:8080/ to view the application.

