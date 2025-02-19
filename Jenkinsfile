pipeline {
    agent any

    environment {
        DB_URL = credentials('DB_URL')
        PORT = credentials('PORT')
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
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

        stage('Build and Install Frontend'){
            agent{
                docker{
                    image 'node:23-alpine'
                    reuseNode true
                }
            }
            steps{
                dir('client/'){
                    sh 'npm ci'
                    sh 'npm run build'
                    sh 'ls -la'
                }
            }
        }
}
