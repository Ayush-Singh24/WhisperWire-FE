import useOtherUser from "@/hooks/use-other-user";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Button } from "./ui/button";
import { SidebarClose, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & { sender: User; receiver: User };
}
export default function ProfileDrawer({
  data,
  isOpen,
  onClose,
}: ProfileDrawerProps) {
  const otherUser = useOtherUser(data);

  const chattingSince = useMemo(() => {
    return format(new Date(data.createdAt), "pp");
  }, [data.createdAt]);

  const title = useMemo(() => {
    return otherUser?.name;
  }, [otherUser?.name]);

  const statusText = useMemo(() => {
    return "Online";
  }, []);
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md h-full">
                  <div className="flex h-full flex-col bg-primary-color-med py-6 shadow-xl">
                    <div className="px-4 sm:px-6 w-full">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <Button
                            className="text-primary-text"
                            variant={"ghost"}
                            onClick={onClose}
                          >
                            <SidebarClose />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center mt-10 gap-5">
                      <Avatar className="h-40 w-40">
                        <AvatarImage src={otherUser?.image || ""} />
                        <AvatarFallback className="text-8xl text-primary-text">
                          {otherUser?.name ? otherUser?.name[0] : "X"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-center">
                        <span className="text-primary-text">
                          {otherUser?.name}
                        </span>
                        <span className="text-secondary-text text-sm">
                          {otherUser?.email}
                        </span>
                        <span className="text-secondary-text">
                          {statusText}
                        </span>
                      </div>
                      <Button
                        variant={"ghost"}
                        className="flex flex-col gap-2 items-center justify-center p-8 hover:bg-slate-400 rounded-full"
                      >
                        <div className="flex flex-col items-center justify-center text-primary-text ">
                          <Trash />
                        </div>
                        <span className="text-xs text-primary-text">
                          Remove Friend
                        </span>
                      </Button>
                    </div>
                    <div className="text-primary-text text-center mt-auto">
                      Chatting since{" "}
                      {format(new Date(data.createdAt), "dd-mm-yy")}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
