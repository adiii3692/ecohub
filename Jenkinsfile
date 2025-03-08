pipeline {
    agent any

    environment {
        DB_URL = env.DB_URL
        PORT = env.PORT
        VERCEL_TOKEN = env.VERCEL_TOKEN
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

        stage('Build Vercel Image') {
            steps{
                sh 'docker build -t vercel .'
                sh 'docker image ls'
            }
        }
        
        stage('Build and Test Backend'){
            agent{
                docker{
                    image 'node:23-alpine'
                    reuseNode true
                }
            }
            steps{
                dir('server/'){
                    sh 'npm i'
                    sh 'npm test'
                }
            }
        }

        stage('Deploy to Vercel') {
            agent{
                docker{
                    image 'vercel'
                    reuseNode true
                }
            }
            steps {
                dir('client/'){
                    sh 'vercel --version'
                    sh 'vercel pull --token $VERCEL_TOKEN --yes'
                    sh 'vercel deploy --token ${VERCEL_TOKEN} --prod --confirm --cwd ./'
                }
            }
        }
    }
}