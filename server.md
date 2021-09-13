# compute에 뛰울때 방화벽 설정 + run 방법
gcloud compute firewall-rules create default-allow-websockets \
    --allow tcp:3000 \
    --target-tags websocket \
    --description "Allow websocket traffic on port 3000"


-- pm2 시작
pm2 start npm -- start

-- 종료 
pm2 delete npm


# gcp app-engine에 뛰울때 방화벽 설정 + deploy 방법 

gcloud app firewall-rules create 1000 --action allow --source-range 3.21.114.0/16 --description ETF_HOLDINGS
gcloud app firewall-rules test-ip 3.21.114.151

gcloud app firewall-rules create 1001 --action allow --source-range 1.225.192.0/16 --description ETF_HOLDINGS
gcloud app firewall-rules test-ip 1.225.192.132The action `ALLOW` will apply to the IP address.


gcloud app deploy