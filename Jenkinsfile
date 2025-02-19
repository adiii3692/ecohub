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
                git 'https://github.com/your-repo/your-project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Start Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Stop and Cleanup') {
            steps {
                sh 'docker-compose down'
            }
        }
    }

    post {
        always {
            sh 'docker-compose down -v'
        }
        failure {
            echo "Build or Cypress tests failed!"
        }
    }
}
