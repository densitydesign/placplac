import { ReactNode } from "react";
interface FullScreenModalProps {
    onClose: () => void;
    isOpen: boolean;
    children: ReactNode;
}
export declare const FullScreenModal: (props: FullScreenModalProps) => JSX.Element;
export {};
