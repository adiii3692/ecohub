pipeline {
    agent any

    environment {
        DB_URL = credentials('DB_URL')
        PORT = credentials('PORT')
    }

    tools{
        nodejs "nodejs"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/adiii3692/ecohub.git'
            }
        }

        stage('Create an Env File') {
            steps {
                dir('server/'){
                    sh 'touch .env'
                    sh 'echo "DB_URL=${DB_URL}" > .env'
                    sh 'echo "PORT=${PORT}" >> .env'
                    sh 'ls'
                    sh 'cat .env'
                }
            }
        }

        stage('Build And Run Docker Images') {
            steps {
                sh 'docker compose up --build -d'
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

        stage('Install Dependencies and Run Cypress Tests'){
            steps {
                dir('client/'){
                    sh 'npm i'
                    sh 'sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb'
                    sh 'npm run cypress'
                }
            }
        }
    }

    post {
        always {
            sh 'docker compose down -v'
        }
    }
}
