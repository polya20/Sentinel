#!/bin/bash
# spike-traffic.sh
# Simulates a massive producer traffic spike

echo "🚀 CREATING TRAFFIC SPIKE..."
echo "Targeting topic: 'payments.v1'"

# Create topic if it doesn't exist
docker exec -it demo-setup-broker-0-1 kafka-topics \
  --create --if-not-exists \
  --topic payments.v1 \
  --bootstrap-server broker-0:29092 \
  --partitions 12 --replication-factor 3

# Inject 1M records rapidly to skew disk usage and replication BW
docker exec -it demo-setup-broker-0-1 kafka-producer-perf-test \
  --topic payments.v1 \
  --num-records 1000000 \
  --record-size 2048 \
  --throughput 100000 \
  --producer-props bootstrap.servers=broker-0:29092,broker-1:29093,broker-2:29094

echo "📈 Traffic spike injected!"
echo "Ask Claude: 'If I add 50k msg/sec to the payments topic, which brokers get impacted?'"
