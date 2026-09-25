import { Modal } from '../../common/modal.components';
import { LeadsForm } from './leads-form.components';

type LeadsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LeadsModal = ({ isOpen, onClose }: LeadsModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <LeadsForm onClose={onClose} />
  </Modal>
);