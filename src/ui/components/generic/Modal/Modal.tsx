import React from "react";
import styles from "./Modal.module.scss";

export enum ModalState {
    OPEN,
    CLOSED
}

export interface ModalProps {
    children: React.ReactNode;
    modalState?: ModalState;
}

export default function Modal(props: ModalProps) {
    return props.modalState == ModalState.OPEN 
    ? (
        <section className={styles.container}>
            {props.children}
        </section>
    ) : (<></>)
}