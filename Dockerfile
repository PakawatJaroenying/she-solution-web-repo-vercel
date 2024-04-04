FROM 482840924630.dkr.ecr.ap-southeast-1.amazonaws.com/master_node:latest

WORKDIR /she-solution-frontend
COPY . .

RUN npm install
RUN npm run build