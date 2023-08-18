import modal from './ModelBackdrop.module.css'

const ModalBackdrop = ({handleCloseModal, isModalOpen}) => {
    
    return (
        <div
            className={`${modal['modal-backdrop']} ${isModalOpen ? modal.active : ""}`}
            onClick={handleCloseModal}
        ></div>
    );
};

export default ModalBackdrop;
