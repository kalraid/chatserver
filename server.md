gcloud compute firewall-rules create default-allow-websockets \
    --allow tcp:3000 \
    --target-tags websocket \
    --description "Allow websocket traffic on port 3000"



-- pm2 시작
pm2 start npm -- start

-- 종료 
pm2 delete npm