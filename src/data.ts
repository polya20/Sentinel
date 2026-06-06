import { QuestionDef } from "./types";

export const mockQuestions: QuestionDef[] = [
  // --- Pre-Incident ---
  // Capacity & Growth
  { id: "pre-1", text: "At current write throughput growth rate, which brokers will hit disk capacity first and when?", status: "green", category: "Pre-Incident", subCategory: "Capacity & Growth" },
  { id: "pre-2", text: "Which topics have no retention policy set and are growing unboundedly?", status: "yellow", category: "Pre-Incident", subCategory: "Capacity & Growth" },
  { id: "pre-3", text: "If I add 50k msg/sec to the payments topic, which brokers get impacted and by how much?", status: "green", category: "Pre-Incident", subCategory: "Capacity & Growth" },
  { id: "pre-4", text: "Which brokers are within 20% of their network bandwidth ceiling right now?", status: "red", category: "Pre-Incident", subCategory: "Capacity & Growth" },
  { id: "pre-5", text: "How has partition skew changed over the last 30 days — is it getting worse?", status: "green", category: "Pre-Incident", subCategory: "Capacity & Growth" },
  { id: "pre-6", text: "Which consumer groups are consistently running at >80% lag headroom?", status: "yellow", category: "Pre-Incident", subCategory: "Capacity & Growth" },

  // Rebalance Safety
  { id: "pre-7", text: "Is the current rebalance proposal safe to execute right now?", status: "green", category: "Pre-Incident", subCategory: "Rebalance Safety" },
  { id: "pre-8", text: "How many partition leadership movements will this proposal trigger and what's the estimated interruption window?", status: "yellow", category: "Pre-Incident", subCategory: "Rebalance Safety" },
  { id: "pre-9", text: "What's the worst-case replication traffic this proposal will generate across broker network interfaces?", status: "green", category: "Pre-Incident", subCategory: "Rebalance Safety" },
  { id: "pre-10", text: "Are any of the partitions being moved currently under elevated producer pressure?", status: "red", category: "Pre-Incident", subCategory: "Rebalance Safety" },
  { id: "pre-11", text: "Has KCC generated a rebalance proposal in the last 24 hours that it then self-cancelled — and why?", status: "yellow", category: "Pre-Incident", subCategory: "Rebalance Safety" },
  { id: "pre-12", text: "What's the historical success rate of rebalance proposals on Friday afternoons for this cluster?", status: "green", category: "Pre-Incident", subCategory: "Rebalance Safety" },

  // Broker Health
  { id: "pre-13", text: "Which brokers have been leader for disproportionately many high-throughput partitions for more than 7 days without rebalancing?", status: "yellow", category: "Pre-Incident", subCategory: "Broker Health" },
  { id: "pre-14", text: "Are there any brokers where disk write latency has been trending up over the last 6 hours?", status: "red", category: "Pre-Incident", subCategory: "Broker Health" },
  { id: "pre-15", text: "Which brokers have the highest ratio of under-replicated partitions relative to their total partition count?", status: "green", category: "Pre-Incident", subCategory: "Broker Health" },
  { id: "pre-16", text: "Is broker 4 recovering from its last restart at a normal rate or is replication lagging?", status: "green", category: "Pre-Incident", subCategory: "Broker Health" },
  { id: "pre-17", text: "Are there brokers that KCC consistently avoids as rebalance targets — and why?", status: "yellow", category: "Pre-Incident", subCategory: "Broker Health" },

  // Topic & Partition Design Smells
  { id: "pre-18", text: "Which topics have a partition count that's become a bottleneck given current consumer group parallelism?", status: "red", category: "Pre-Incident", subCategory: "Topic & Partition Design Smells" },
  { id: "pre-19", text: "Are there topics where all partitions are on the same rack, violating rack-awareness goals?", status: "green", category: "Pre-Incident", subCategory: "Topic & Partition Design Smells" },
  { id: "pre-20", text: "Which topics have replication factor below cluster policy and how long have they been that way?", status: "yellow", category: "Pre-Incident", subCategory: "Topic & Partition Design Smells" },
  { id: "pre-21", text: "Are there any topics with a single hot partition consuming >40% of that partition's broker's CPU?", status: "red", category: "Pre-Incident", subCategory: "Topic & Partition Design Smells" },
  { id: "pre-22", text: "Which topics have stale consumer groups attached that haven't consumed in 72+ hours?", status: "green", category: "Pre-Incident", subCategory: "Topic & Partition Design Smells" },

  // Configuration Drift
  { id: "pre-23", text: "Which KCC goals are currently being violated and for how long?", status: "yellow", category: "Pre-Incident", subCategory: "Configuration Drift" },
  { id: "pre-24", text: "Has KCC's anomaly detection been firing but self-healing — masking a deeper problem?", status: "green", category: "Pre-Incident", subCategory: "Configuration Drift" },
  { id: "pre-25", text: "Are there brokers that were added to the cluster but never received partition assignments from KCC?", status: "red", category: "Pre-Incident", subCategory: "Configuration Drift" },
  { id: "pre-26", text: "What's the current goal optimization order and does it match what we configured 90 days ago?", status: "yellow", category: "Pre-Incident", subCategory: "Configuration Drift" },
  { id: "pre-27", text: "Are there any KCC configuration parameters that are at default values but probably shouldn't be given our cluster size?", status: "green", category: "Pre-Incident", subCategory: "Configuration Drift" },


  // --- Active Incident ---
  // Immediate Situational Awareness
  { id: "act-1", text: "Give me a one-paragraph summary of the current cluster health right now.", status: "yellow", category: "Active Incident", subCategory: "Immediate Situational Awareness" },
  { id: "act-2", text: "What changed in the last 30 minutes — any rebalances, broker restarts, topic config changes, or anomalies detected?", status: "red", category: "Active Incident", subCategory: "Immediate Situational Awareness" },
  { id: "act-3", text: "Which brokers are currently degraded and what is KCC doing about it, if anything?", status: "red", category: "Active Incident", subCategory: "Immediate Situational Awareness" },
  { id: "act-4", text: "Are there under-replicated partitions right now? Which topics and brokers are involved?", status: "green", category: "Active Incident", subCategory: "Immediate Situational Awareness" },
  { id: "act-5", text: "Is KCC currently executing a rebalance? Should I stop it given what's happening?", status: "yellow", category: "Active Incident", subCategory: "Immediate Situational Awareness" },

  // Blast Radius Assessment
  { id: "act-6", text: "Broker 6 just went down — which consumer groups are affected and how badly?", status: "red", category: "Active Incident", subCategory: "Blast Radius Assessment" },
  { id: "act-7", text: "If broker 3 goes down in the next 10 minutes, which topics lose a replica and which lose quorum?", status: "yellow", category: "Active Incident", subCategory: "Blast Radius Assessment" },
  { id: "act-8", text: "How many partitions currently have broker 7 as their only in-sync replica?", status: "green", category: "Active Incident", subCategory: "Blast Radius Assessment" },
  { id: "act-9", text: "Which downstream services are likely impacted by the current lag spike on the transactions topic?", status: "red", category: "Active Incident", subCategory: "Blast Radius Assessment" },
  { id: "act-10", text: "Is the current under-replication isolated to one broker or is it spreading?", status: "yellow", category: "Active Incident", subCategory: "Blast Radius Assessment" },

  // Causation & Correlation
  { id: "act-11", text: "Consumer lag on group checkout-processor spiked 10 minutes ago — what changed in the cluster at that time?", status: "red", category: "Active Incident", subCategory: "Causation & Correlation" },
  { id: "act-12", text: "Is the current broker 4 network saturation correlated with the rebalance KCC triggered at 14:32?", status: "green", category: "Active Incident", subCategory: "Causation & Correlation" },
  { id: "act-13", text: "Did any partition leadership change in the 5 minutes before the producer timeout errors started?", status: "yellow", category: "Active Incident", subCategory: "Causation & Correlation" },
  { id: "act-14", text: "Is the disk I/O spike on broker 2 coming from log compaction, replication traffic, or producer writes?", status: "red", category: "Active Incident", subCategory: "Causation & Correlation" },
  { id: "act-15", text: "Was the KCC anomaly that fired at 14:45 related to what's happening now or is it a separate issue?", status: "green", category: "Active Incident", subCategory: "Causation & Correlation" },

  // Decision Support Under Pressure
  { id: "act-16", text: "Should I pause KCC rebalancing right now or let it continue?", status: "red", category: "Active Incident", subCategory: "Decision Support Under Pressure" },
  { id: "act-17", text: "Is it safe to restart broker 5 right now or will that cause partition loss?", status: "yellow", category: "Active Incident", subCategory: "Decision Support Under Pressure" },
  { id: "act-18", text: "What's the minimum number of brokers I need online to maintain quorum for the payments topic?", status: "green", category: "Active Incident", subCategory: "Decision Support Under Pressure" },
  { id: "act-19", text: "If I throttle replication bandwidth to 50MB/s right now, how long will it take for ISR to recover?", status: "yellow", category: "Active Incident", subCategory: "Decision Support Under Pressure" },
  { id: "act-20", text: "What's the safest sequence of actions to bring broker 3 back without making things worse?", status: "red", category: "Active Incident", subCategory: "Decision Support Under Pressure" },

  // Runbook on the Fly
  { id: "act-21", text: "Walk me through how to safely decommission broker 7 right now given current cluster state.", status: "green", category: "Active Incident", subCategory: "Runbook on the Fly" },
  { id: "act-22", text: "What KCC API calls do I need to make to stop the current rebalance and roll it back?", status: "yellow", category: "Active Incident", subCategory: "Runbook on the Fly" },
  { id: "act-23", text: "Give me the exact curl commands to check which partitions are out of sync on broker 4.", status: "green", category: "Active Incident", subCategory: "Runbook on the Fly" },
  { id: "act-24", text: "How do I manually reassign the leadership of partition 12 on the orders topic away from broker 6?", status: "red", category: "Active Incident", subCategory: "Runbook on the Fly" },


  // --- Post-Incident ---
  // Root Cause Synthesis
  { id: "post-1", text: "Summarize what happened between 14:30 and 16:00 based on KCC state, anomaly logs, and partition movement history.", status: "yellow", category: "Post-Incident", subCategory: "Root Cause Synthesis" },
  { id: "post-2", text: "Was this incident caused by a KCC misconfiguration, a topic design problem, or an unexpected load spike?", status: "green", category: "Post-Incident", subCategory: "Root Cause Synthesis" },
  { id: "post-3", text: "Did KCC detect the problem before humans did, and if so, why didn't its self-healing work?", status: "yellow", category: "Post-Incident", subCategory: "Root Cause Synthesis" },
  { id: "post-4", text: "Was there a leading indicator visible 30+ minutes before the incident that we missed?", status: "red", category: "Post-Incident", subCategory: "Root Cause Synthesis" },
  { id: "post-5", text: "Has this exact failure pattern happened before on this cluster?", status: "green", category: "Post-Incident", subCategory: "Root Cause Synthesis" },

  // Structural Weaknesses Exposed
  { id: "post-6", text: "Which single broker failure would cause the most consumer disruption right now — our current SPOF?", status: "red", category: "Post-Incident", subCategory: "Structural Weaknesses Exposed" },
  { id: "post-7", text: "Are there topics where a single partition going offline would block a critical consumer group entirely?", status: "yellow", category: "Post-Incident", subCategory: "Structural Weaknesses Exposed" },
  { id: "post-8", text: "What would a 2-broker simultaneous failure look like for our highest-priority topics?", status: "green", category: "Post-Incident", subCategory: "Structural Weaknesses Exposed" },
  { id: "post-9", text: "Which KCC goals are we routinely violating without realizing it?", status: "red", category: "Post-Incident", subCategory: "Structural Weaknesses Exposed" },
  { id: "post-10", text: "If today's incident happened at peak load instead of off-peak, how much worse would it have been?", status: "yellow", category: "Post-Incident", subCategory: "Structural Weaknesses Exposed" },

  // Hardening Recommendations
  { id: "post-11", text: "Based on today's incident, what KCC configuration changes would reduce the probability of recurrence?", status: "green", category: "Post-Incident", subCategory: "Hardening Recommendations" },
  { id: "post-12", text: "Should we change the partition count or replication factor on the payments topic given what we learned?", status: "yellow", category: "Post-Incident", subCategory: "Hardening Recommendations" },
  { id: "post-13", text: "Are there any topics we should add to KCC's hard goal list to prevent them from being touched during rebalances?", status: "green", category: "Post-Incident", subCategory: "Hardening Recommendations" },
  { id: "post-14", text: "What alerting thresholds should we set to catch this earlier next time?", status: "yellow", category: "Post-Incident", subCategory: "Hardening Recommendations" },
  { id: "post-15", text: "Which KCC anomaly detectors were disabled or not configured that would have caught this?", status: "red", category: "Post-Incident", subCategory: "Hardening Recommendations" },


  // --- Meta-Questions ---
  { id: "meta-1", text: "What is the single most likely cause of our next incident on this cluster?", status: "red", category: "Meta", subCategory: "The Meta-Questions" },
  { id: "meta-2", text: "What does KCC think the cluster health is vs. what the metrics actually show — is there a gap?", status: "yellow", category: "Meta", subCategory: "The Meta-Questions" },
  { id: "meta-3", text: "Are we running any KCC goals that conflict with each other given our current workload pattern?", status: "yellow", category: "Meta", subCategory: "The Meta-Questions" },
  { id: "meta-4", text: "Which parts of this cluster have never been stress-tested by a rebalance?", status: "green", category: "Meta", subCategory: "The Meta-Questions" },
  { id: "meta-5", text: "Is KCC actually improving cluster health over time or just reacting to problems after they appear?", status: "yellow", category: "Meta", subCategory: "The Meta-Questions" },

  // --- Capabilities ---
  { id: "cap-1", text: "Which cluster reliability issues (like rack-awareness) can KCC automatically enforce?", status: "green", category: "Capabilities", subCategory: "KCC Capabilities" },
  { id: "cap-2", text: "Can KCC prevent disk exhaustion caused by infinite retention policies?", status: "yellow", category: "Capabilities", subCategory: "KCC Capabilities" },
  { id: "cap-3", text: "Will KCC fix our hot partitions if they are caused by poor application key selection?", status: "red", category: "Capabilities", subCategory: "KCC Limitations" },
  { id: "cap-4", text: "Can Cruise Control detect or heal frequent consumer rebalance storms?", status: "red", category: "Capabilities", subCategory: "KCC Limitations" },
  { id: "cap-5", text: "Does KCC handle horizontal scaling when adding new brokers to the cluster?", status: "green", category: "Capabilities", subCategory: "KCC Capabilities" },
];
