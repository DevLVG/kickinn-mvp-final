import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileHeroSection from "@/components/executor/reputation/ProfileHeroSection";
import PerformanceMetrics from "@/components/executor/reputation/PerformanceMetrics";
import PerformanceChart from "@/components/executor/reputation/PerformanceChart";
import CompletedVentures from "@/components/executor/reputation/CompletedVentures";
import SkillsBreakdown from "@/components/executor/reputation/SkillsBreakdown";
import AchievementsBadges from "@/components/executor/reputation/AchievementsBadges";
import ReviewsSection from "@/components/executor/reputation/ReviewsSection";

const ExecutorReputation = () => {
  const [activeRole] = useState<'ideator' | 'executor' | 'investor' | 'buyer'>('executor');

  // Mock user data - replace with actual auth
  const user = {
    name: "Mehul Sharma",
    email: "mehul@example.com",
    initials: "MS"
  };

  // Mock reputation data
  const reputationData = {
    user_id: "uuid",
    name: "Mehul Sharma",
    avatar_url: "",
    member_since: "March 2024",
    reputation_score: 92,
    reputation_badge: "Elite Executor",
    stats: {
      completed_ventures: 12,
      success_rate: 94,
      avg_rating: 4.8
    },
    scores: {
      overall: 92,
      quality: 95,
      timeliness: 88,
      communication: 94
    },
    skills: [
      { name: "React", level: "Expert", proficiency: 95, ventures_count: 10, icon: "⭐" },
      { name: "Node.js", level: "Advanced", proficiency: 88, ventures_count: 8, icon: "🔷" },
      { name: "PostgreSQL", level: "Advanced", proficiency: 82, ventures_count: 7, icon: "🔷" },
      { name: "TypeScript", level: "Expert", proficiency: 90, ventures_count: 9, icon: "⭐" },
      { name: "AWS", level: "Advanced", proficiency: 75, ventures_count: 6, icon: "🔷" },
      { name: "Python", level: "Advanced", proficiency: 85, ventures_count: 7, icon: "🔷" },
      { name: "Smart Contracts", level: "Expert", proficiency: 92, ventures_count: 5, icon: "⭐" },
      { name: "Mobile Dev", level: "Intermediate", proficiency: 70, ventures_count: 4, icon: "🔶" }
    ],
    domains: [
      { name: "SaaS Applications", proficiency: 92, ventures_count: 7 },
      { name: "E-commerce", proficiency: 85, ventures_count: 5 },
      { name: "Fintech", proficiency: 78, ventures_count: 4 },
      { name: "Healthcare Tech", proficiency: 70, ventures_count: 3 },
      { name: "EdTech", proficiency: 68, ventures_count: 3 }
    ],
    reputation_history: [
      { month: "Jun", score: 75 },
      { month: "Jul", score: 78 },
      { month: "Aug", score: 82 },
      { month: "Sep", score: 84 },
      { month: "Oct", score: 87 },
      { month: "Nov", score: 89 },
      { month: "Dec", score: 92 }
    ]
  };

  return (
    <DashboardLayout
      activeRole={activeRole}
      userRoles={['executor']}
      onRoleChange={() => {}}
      user={user}
    >
      <div className="w-full">
        {/* Profile Hero Section */}
        <ProfileHeroSection data={reputationData} />

        {/* Performance Metrics */}
        <PerformanceMetrics scores={reputationData.scores} />

        {/* Performance Chart */}
        <PerformanceChart history={reputationData.reputation_history} />

        {/* Completed Ventures */}
        <CompletedVentures />

        {/* Skills Breakdown */}
        <SkillsBreakdown 
          technicalSkills={reputationData.skills}
          domains={reputationData.domains}
        />

        {/* Achievements & Badges */}
        <AchievementsBadges />

        {/* Reviews Section */}
        <ReviewsSection />
      </div>
    </DashboardLayout>
  );
};

export default ExecutorReputation;
