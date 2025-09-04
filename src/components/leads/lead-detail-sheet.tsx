"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Check, MessageSquare, ChevronDown } from "lucide-react";

interface LeadDetailSheetProps {
  lead: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadDetailSheet({ lead, open, onOpenChange }: LeadDetailSheetProps) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle>Lead Profile</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 space-y-6">
          {/* Rest of your component stays the same */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={lead.avatar} />
              <AvatarFallback className="bg-gray-500 text-white text-lg">
                {lead.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{lead.name}</h3>
              <p className="text-gray-600">{lead.jobTitle}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{lead.campaign}</Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Pending Approval
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Activity Timeline */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-blue-600">Invitation Request</div>
                <div className="text-sm text-gray-600 mt-1">
                  Message: Hi Om, I'm building consultative AI...{" "}
                  <button className="text-blue-600 hover:underline">See More</button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-blue-600">Replied</div>
                <button className="text-sm text-blue-600 hover:underline">
                  View Reply
                </button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3 pb-6">
            <Button className="w-full">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="w-full">
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}