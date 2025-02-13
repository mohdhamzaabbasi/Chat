pipeline {
    agent any

    environment {
        NODE_PATH = "/usr/bin/node"
        NPM_PATH = "/usr/bin/npm"
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    sh 'rm -rf *'  // Clean workspace before cloning
                    git branch: 'master', url: "https://github.com/anshsehgal13/ChatApp/"
                    sh 'ls -R'  // Debug: List all files in workspace
                }
            }
        }

        stage('Check Node & NPM Versions') {
            steps {
                script {
                    sh '${NODE_PATH} -v'
                    sh '${NPM_PATH} -v'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'if [ -f package.json ]; then ${NPM_PATH} install; else echo "package.json missing"; exit 1; fi'
                }
            }
        }

        stage('Build App') {
            steps {
                script {
                    sh '${NPM_PATH} run build'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
