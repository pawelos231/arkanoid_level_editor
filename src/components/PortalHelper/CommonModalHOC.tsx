import "./CommonModal.css";

type Props = {
  onClose: (modal: false) => void;
};

const withCommonModal = (WrappedComponent: React.ComponentType<any>) => {
  return function CommonModalWrapper(props: any) {
    const { onClose } = props as Props;
    return (
      <div className="modal">
        <div className="close" onClick={() => onClose(false)}>
          X
        </div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withCommonModal;
