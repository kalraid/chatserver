# compute에 뛰울때 방화벽 설정 + run 방법
gcloud compute firewall-rules create default-allow-websockets \
    --allow tcp:3000 \
    --target-tags websocket \
    --description "Allow websocket traffic on port 3000"

# oracle vm에 뛰울때 주의사항
subnet 쪽에 보안그룹 개념 있으므로 3000포트 추가 필요

-- pm2 시작
pm2 start npm -- start



-- 종료 
pm2 delete npm


# gcp app-engine에 뛰울때 방화벽 설정 + deploy 방법 

gcloud app firewall-rules create 1000 --action allow --source-range 0.0.0.0/24 --description Chat_Server
gcloud app firewall-rules test-ip 3.21.114.151
gcloud app firewall-rules test-ip 1.225.192.132

gcloud app deploy