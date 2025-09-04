 
// src/components/dashboard/recent-activity.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const activities = [
  {
    id: "1",
    lead: "Om Satyarthy",
    title: "Regional Head",
    campaign: "Gynoveda",
    status: "Pending Approval",
    time: "7 mins ago",
    avatar: "/placeholder-avatar.jpg",
    statusType: "pending",
  },
  {
    id: "2", 
    lead: "Dr. Bhuvaneshwari",
    title: "Fertility & Women's Health & A...",
    campaign: "Gynoveda",
    status: "Sent 7 mins ago",
    time: "7 mins ago",
    avatar: "/placeholder-avatar.jpg",
    statusType: "sent",
  },
  {
    id: "3",
    lead: "Surdeep Singh",
    title: "Building Product-led SEO Growt...",
    campaign: "Gynoveda", 
    status: "Sent 7 mins ago",
    time: "7 mins ago",
    avatar: "/placeholder-avatar.jpg",
    statusType: "sent",
  },
  {
    id: "4",
    lead: "Dilbag Singh",
    title: "Manager Marketing & Communicat...",
    campaign: "Gynoveda",
    status: "Sent 7 mins ago", 
    time: "7 mins ago",
    avatar: "/placeholder-avatar.jpg",
    statusType: "sent",
  },
  {
    id: "5",
    lead: "Vanshy Jain",
    title: "Ayurveda|primary infertility|...",
    campaign: "Gynoveda",
    status: "Sent 7 mins ago",
    time: "7 mins ago", 
    avatar: "/placeholder-avatar.jpg",
    statusType: "sent",
  },
  {
    id: "6",
    lead: "Sunil Pal",
    title: "Helping Fashion & Lifestyle Br...",
    campaign: "Digi Sidekick",
    status: "Pending Approval",
    time: "",
    avatar: "/placeholder-avatar.jpg", 
    statusType: "pending",
  },
  {
    id: "7",
    lead: "Utkarsh K.",
    title: "Airbnb Host | Ex-The Skin Stor...",
    campaign: "The skin story",
    status: "Do Not Contact",
    time: "",
    avatar: "/placeholder-avatar.jpg",
    statusType: "do_not_contact", 
  },
  {
    id: "8",
    lead: "Shreya Ramakrishna",
    title: "Deputy Manager - Founder's Off...",
    campaign: "Pokonut",
    status: "Followup 10 mins ago",
    time: "10 mins ago",
    avatar: "/placeholder-avatar.jpg",
    statusType: "followup",
  },
  {
    id: "9",
    lead: "Deepak Kumar", 
    title: "Deputy manager",
    campaign: "Pokonut",
    status: "Sent 1 hr ago",
    time: "1 hr ago",
    avatar: "/placeholder-avatar.jpg",
    statusType: "sent",
  },
];

export function RecentActivity() {
  const getStatusBadge = (status: string, type: string) => {
    const variants = {
      pending: "bg-purple-100 text-purple-800",
      sent: "bg-orange-100 text-orange-800", 
      followup: "bg-blue-100 text-blue-800",
      do_not_contact: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={variants[type as keyof typeof variants] || variants.sent}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <Select defaultValue="most-recent">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="most-recent">Most Recent</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="by-status">By Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 pb-2">
          <div>Lead</div>
          <div>Campaign</div>
          <div>Status</div>
          <div></div>
        </div>

        {activities.map((activity) => (
          <div key={activity.id} className="grid grid-cols-4 gap-4 py-3 hover:bg-gray-50 rounded-md">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback className="bg-gray-500 text-white text-xs">
                  {activity.lead.split(" ").map(n => n[0]).join("").substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{activity.lead}</div>
                <div className="text-xs text-gray-500 truncate max-w-32">
                  {activity.title}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm">{activity.campaign}</span>
            </div>
            <div className="flex items-center">
              {getStatusBadge(activity.status, activity.statusType)}
            </div>
            <div className="flex items-center justify-end">
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
