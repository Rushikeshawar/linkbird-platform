 

// src/components/dashboard/linkedin-accounts.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const accounts = [
  {
    id: "1",
    name: "Pulkit Garg",
    email: "1999pulkitgarg@gmail.com",
    status: "Connected",
    requests: "17/30",
    progress: 57,
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "2",
    name: "Jivesh Lakhani", 
    email: "jivesh@gmail.com",
    status: "Connected",
    requests: "19/30",
    progress: 63,
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "3",
    name: "Indrajit Sahani",
    email: "indrajit.38mg@gmail.com",
    status: "Connected", 
    requests: "18/30",
    progress: 60,
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "4",
    name: "Bhavya Arora",
    email: "bhavyaarora199.ba@gmail.c...",
    status: "Connected",
    requests: "18/100",
    progress: 18,
    avatar: "/placeholder-avatar.jpg",
  },
];

export function LinkedInAccounts() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-6">LinkedIn Accounts</h2>
      
      <div className="space-y-1">
        <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 pb-2">
          <div>Account</div>
          <div>Status</div>
          <div>Requests</div>
          <div></div>
        </div>

        {accounts.map((account) => (
          <div key={account.id} className="grid grid-cols-4 gap-4 py-4 hover:bg-gray-50 rounded-md">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={account.avatar} />
                <AvatarFallback className="bg-gray-500 text-white">
                  {account.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{account.name}</div>
                <div className="text-sm text-gray-500">{account.email}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Badge className="bg-blue-100 text-blue-800">
                {account.status}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{account.requests}</span>
                </div>
                <Progress value={account.progress} className="h-2" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">{account.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}