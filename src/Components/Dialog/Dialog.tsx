import { DialogProps } from "../../types/DialogProps";

function Dialog({ onClose, onSuccess, children, visible }: DialogProps) {
    return (
        <>
            {visible && (
                <dialog className="nes-dialog" id="dialog-default" open>
                    <form method="dialog">
                        {children}
                        <menu className="dialog-menu">
                            <button onClick={onClose} className="nes-btn nes-btn-close">
                                Cerrar
                            </button>
                            <button onClick={onSuccess} className="nes-btn is-primary reset-game-dialog">
                                Volver a Jugar
                            </button>
                        </menu>
                    </form>
                </dialog>
            )}
        </>
    )
}

export default Dialog;