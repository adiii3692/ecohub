pipeline {
    agent any

    environment {
        CLIENT_IMAGE = "ecohub_frontend:latest"
        SERVER_IMAGE = "ecohub_backend:latest"
        COMPOSE_FILE = "docker-compose.yml"
        DB_URL = credentials('DB_URL')
        PORT = credentials('PORT')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/adiii3692/ecohub.git'
            }
        }

        stage('Build And Run Docker Images') {
            steps {
                sh 'docker compose up --build -d -e DB_URL=${DB_URL} PORT=${PORT}'
                sh 'docker compose ps'
            }
        }

        stage('Check Backend Container') {
            steps {
                sh 'docker logs $(docker ps -qf "name=ecohub-backend")'
            }
        }

        stage('Check Frontend Container') {
            steps {
                sh 'docker logs $(docker ps -qf "name=ecohub-frontend")'
            }
        } 
    }

    post {
        always {
            sh 'docker compose down -v'
        }
        failure {
            echo "Build failed!"
        }
    }
}
