pipeline {
    agent any

    environment {
        DB_URL = credentials('DB_URL')
        PORT = credentials('PORT')
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
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

        stage('Deploy to Vercel') {
            agent{
                docker{
                    image 'vercel'
                    reuseNode true
                }
            }
            steps {
                dir('client/'){
                    // sh 'vercel deploy --prod --token ${VERCEL_TOKEN} --project ecohub --org wanpo'
                    sh 'vercel --version'
                    sh 'vercel --token ${VERCEL_TOKEN} --prod --confirm --project ecohub --org wanpo --cwd ./'
                }
            }
        }
        
    }
}