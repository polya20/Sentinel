#!/bin/bash
# initiate-fault.sh
# Demonstrates triggering a simulated broker failure

echo "🚨 INITIATING SRE FAULT SIMULATION 🚨"
echo "----------------------------------------"
echo "Targeting Broker 1 for hard shutdown..."

# Force kill one of the Kafka brokers to simulate a sudden kernel panic or hardware failure
docker stop demo-setup-broker-1-1

echo "🔥 Broker 1 has been terminated."
echo "Wait ~30 seconds for Zookeeper session timeouts."
echo ""
echo "Next steps in Dashboard:"
echo "1. Ask Claude: 'Give me a summary of the current cluster health right now.'"
echo "2. Ask Claude: 'Are there under-replicated partitions right now?'"
echo "3. Ask Claude: 'What is the safest sequence to rebalance the remaining brokers?'"
