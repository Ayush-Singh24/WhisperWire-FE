import Image from "next/image";
import Modal from "./ui/modal";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}
export default function ImageModal({ isOpen, onClose, src }: ImageModalProps) {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-80 w-80">
        <Image src={src} fill alt="Image" className="object-cover" />
      </div>
    </Modal>
  );
}
