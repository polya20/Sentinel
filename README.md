# 🚨 KCC Sentinel: The "Grand Slam" Dashboard for Kafka SREs

> *"Make an offer so good people feel stupid saying no." — Alex Hormozi*

If you manage Kafka at scale, you already know the pain. 
A broker goes down. Consumer lag spikes to 4 million on the `payments` topic. The `#incidents` Slack channel is blowing up. Your executives are asking for ETAs.

What do you do? You start digging.
You query JMX metrics. You parse cryptic Kafka Cruise Control (KCC) anomaly logs. You guess if a rebalance proposal will fix the issue or cause a catastrophic replication storm. You spend **hours** connecting the dots while data loss looms.

**KCC Sentinel changes the math.**

We didn't just build another dashboard to show you more graphs you don't understand at 3 AM. We built an intelligence bridge.

---

## 📈 The Value Equation (Why You Need This)

According to the $100M Offers framework, value is determined by four variables. Here is how KCC Sentinel maximizes your SRE value:

### 1. Dream Outcome (⬆️ Increased)
**Sleep through the night and achieve 99.999% uptime.** You never want to blindly guess during a Kafka outage again. KCC Sentinel gives you absolute clarity on cluster health, translating raw metrics into actionable English.

### 2. Perceived Likelihood of Achievement (⬆️ Increased)
**Don't trust black boxes; trust proven data.** Sentinel uses your existing, battle-tested Kafka Cruise Control API but layers an LLM on top. It’s not guessing—it’s synthesizing the exact anomalies, metrics, and proposals Cruise Control is already generating. 

### 3. Time Delay (⬇️ Decreased to Seconds)
**Zero to Root Cause in 5 seconds.** Instead of spending 45 minutes correlating disk latency with partition skew, you literally click a button that asks: *"Consumer lag spiked 10 minutes ago — what changed in the cluster?"* and get the exact answer immediately. MTTR (Mean Time To Resolution) approaches zero.

### 4. Effort & Sacrifice (⬇️ Decreased to Zero)
**Stop writing curl commands in a panic.** No more digging through documentation to figure out how to safely decommission a broker. Sentinel's AI Assistant gives you the **exact impact analysis** and the **exact commands** to run, customized to your current real-time cluster state.

---

## 🔥 Features: Managing the Complete Incident Lifecycle

KCC Sentinel splits your SRE workflow into four critical phases, prioritizing actionable insights over raw data vomit.

### 🟢 Pre-Incident (Smell the smoke before the fire)
Stop putting out fires and start preventing them.
*   *At current write throughput, which brokers hit disk capacity first?*
*   *If I add 50k msg/sec to this topic, who gets impacted?*
*   *Is the current Cruise Control rebalance proposal actually safe to run right now?*

### 🔴 Active Incident (Shit is on fire)
When the pager goes off, you need immediate situational awareness and blast radius assessment.
*   *Broker 6 just went down — which consumer groups are affected right now?*
*   *Should I pause the current KCC rebalance, or let it continue?*
*   *Give me the exact sequence of actions to bring Broker 3 back gracefully.*

### 🟡 Post-Incident (Stop it from happening again)
Automate your post-mortems with synthesizing logic.
*   *Was this incident a KCC misconfiguration, a topic design smell, or a load spike?*
*   *What single broker failure would cause the most disruption right now? (Find your SPOFs)*

### 🔵 Meta & Capabilities (Know your limits)
Understand exactly what Cruise Control can and cannot save you from.
*   *Will KCC fix our hot partitions if they are caused by poor application key selection? (Hint: No).*
*   *Can KCC prevent disk exhaustion caused by infinite retention policies?*

---

## 🚀 Quick Start / Demo

Want to see it in action? We've included a local Docker-Compose setup to let you break things and watch Sentinel shine.

1. **Start the Cluster & UI:**
   ```bash
   npm run build && npm run start
   ```
2. **Boot the Demo Kafka + KCC Cluster:**
   ```bash
   cd demo-setup
   docker-compose up -d
   ```
3. **Trigger an Outage:**
   Run the SRE fault simulation scripts to watch Sentinel's AI bridge react.
   ```bash
   ./demo-setup/initiate-fault.sh
   # or
   ./demo-setup/spike-traffic.sh
   ```

---

### Stop babysitting Kafka. Start engineering reliability. 
**[ Deploy KCC Sentinel Today ]**
