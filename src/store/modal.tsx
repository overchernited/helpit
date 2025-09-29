import { createSignal } from "solid-js";
import { JSX } from "solid-js";
import { VariantDefinition } from "solid-motionone";

export interface ModalProps {
    isOpen: boolean;
    initial?: VariantDefinition;
    animate?: VariantDefinition;
    exit?: VariantDefinition;
    closeOnForegroundClick?: boolean;
    content?: () => JSX.Element;
}

export const [modal, _setModalState] = createSignal<ModalProps>({
    isOpen: false,
    closeOnForegroundClick: true,
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: [0.5, 1], opacity: [0, 1] },
    exit: { scale: [1, 0.5], opacity: [1, 0] },
    content: () => <></>,
});

export const setModal = (newValues: Partial<ModalProps>) => {
    _setModalState(prev => ({ ...prev, ...newValues }));
};

export const openModal = (newValues: Partial<ModalProps>) => {
    if (!modal().isOpen) window.history.pushState({ modal: true }, "");
    setModal({ ...newValues, isOpen: true });
};

export const closeModal = () => {
    setModal({ isOpen: false, content: () => <></> });
    if (window.history.state?.modal) window.history.replaceState(null, "");
};
