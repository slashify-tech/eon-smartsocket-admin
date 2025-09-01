import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Mail,
  Phone,
  MapPin,
  IdCard,
  MoreHorizontal,
} from "lucide-react";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminCard = ({ admin, onEdit, onDelete }) => {
  const initials = useMemo(
    () =>
      admin.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [admin.name]
  );

  return (
    <Card className="relative rounded-2xl shadow-sm overflow-hidden">
      {/* Top-right delete + overflow */}
      <div className="absolute right-2 top-2 flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(admin.id)}>
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(admin.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-red-600"
          onClick={() => onDelete(admin.id)}
          aria-label="Delete admin"
        >
          <Trash2 className="h-4 w-4" />
        </Button> */}
      </div>

      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Left: Avatar */}
          <Avatar className="h-16 w-16 ring-2 ring-muted/50">
            <AvatarImage
              src={admin.avatar}
              alt={admin.name}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="font-medium">{initials}</AvatarFallback>
          </Avatar>

          {/* Right: Details */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">{admin.name}</h3>
              <Badge variant="secondary">{admin.region}</Badge>
            </div>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="truncate">{admin.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{admin.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{admin.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4" />
                <span className="text-xs">ID: {admin.id}</span>
              </div>
            </div>

            {/* CTA */}
            {/* <div className="mt-4">
              <Button className="w-full" onClick={() => onEdit(admin.id)}>
                Edit Profile
              </Button>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCard;
