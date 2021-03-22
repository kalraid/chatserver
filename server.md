gcloud compute firewall-rules create default-allow-websockets \
    --allow tcp:3000 \
    --target-tags websocket \
    --description "Allow websocket traffic on port 3000"