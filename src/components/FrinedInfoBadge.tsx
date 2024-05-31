import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function FriendInfoBadge({
  name,
  image,
  email,
  id,
}: {
  id: string;
  image: string | null;
  email: string | null;
  name: string | null;
}) {
  return (
    <div
      key={id}
      className="flex gap-2  p-2 items-center rounded-full bg-primary-color-med border-2 border-primary-color-light hover:bg-primary-color-light cursor-pointer"
    >
      <Avatar>
        <AvatarImage src={image || ""} />
        <AvatarFallback>{name ? name[0] : "X"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <span>{name}</span>
        <span className="text-xs">{email}</span>
      </div>
    </div>
  );
}
