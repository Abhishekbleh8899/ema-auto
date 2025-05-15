pipeline {
    agent any

    stages {
        stage('Build Docker Images') {
            steps {
                sh 'docker build -t ema-frontend ./FrontEnd'
                sh 'docker build -t ema-backend ./backend'
                sh 'docker build -t ema-mysql ./sql'
            }
        }

        stage('Create Network') {
            steps {
                sh 'docker network create ema-network || true'
            }
        }

        stage('Run MySQL') {
            steps {
                sh '''
                docker run -d --rm \
                --name ema-mysql \
                --network ema-network \
                -e MYSQL_ROOT_PASSWORD=shubham@12345 \
                -e MYSQL_DATABASE=employees_db \
                -v $(pwd)/sql/init.sql:/docker-entrypoint-initdb.d/init.sql \
                ema-mysql
                '''
            }
        }

        stage('Wait for MySQL') {
            steps {
                sh 'sleep 20' // or better: use a wait script
            }
        }

        stage('Run Backend') {
            steps {
                sh '''
                docker run -d --rm \
                --name ema-backend \
                --network ema-network \
                -p 8000:8000 \
                -e DB_HOST=ema-mysql \
                -e DB_USER=root \
                -e DB_PASSWORD=shubham@12345 \
                -e DB_NAME=employees_db \
                ema-backend
                '''
            }
        }

        stage('Run Frontend') {
            steps {
                sh '''
                docker run -d --rm \
                --name ema-frontend \
                --network ema-network \
                -p 5000:5000 \
                ema-frontend
                '''
            }
        }
    }
}
