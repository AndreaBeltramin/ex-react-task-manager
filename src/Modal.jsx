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
					<h5 className="modal-title">{title}</h5>
				</div>
				<div className="modal-body">
					<div>{content}</div>
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-secondary me-2"
						onClick={onClose}
					>
						Chiudi
					</button>
					<button type="button" className="btn btn-primary" onClick={onConfirm}>
						{confirmText}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
}
