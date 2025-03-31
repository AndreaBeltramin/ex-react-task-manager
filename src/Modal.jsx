import { createPortal } from "react-dom";

export default function Modal({
	title,
	content,
	show,
	onClose,
	onConfirm,
	confirmText = "Conferma",
}) {
	if (!show) return null;
	return createPortal(
		<div className="modal-overlay">
			<div className="modal-container">
				<div className="modal-header">
					<h2 className="modal-title">{title}</h2>
				</div>
				<div className="modal-body mb-2">
					<div>{content}</div>
				</div>
				<div className="modal-footer mt-4">
					<button
						type="button"
						className="btn btn-secondary me-2 fs-5"
						onClick={onClose}
					>
						Chiudi
					</button>
					<button
						type="button"
						className="btn btn-primary fs-5"
						onClick={onConfirm}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
}
