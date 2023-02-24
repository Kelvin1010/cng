import { Button, Modal } from 'antd';
import React, { useState } from 'react';

const ZModal = ({ closable, bodyStyle, footer, ...props }) => {
  const visible = props.visible;
  const closeModal = props.closeModal;
  const renderContent = props.renderContent;
  const title = props.title;
  const _onOk = props.onOk;
  const modalWidth = props.modalWidth || '60%'
  const onOkClicked = async () => {
    if (_onOk) {
      const res = await _onOk();
      if (res)
        closeModal(false);
    }
  }
  return (
    <>
      <Modal
        title={title}
        centered
        visible={visible}
        closable={closable}
        bodyStyle={bodyStyle}
        footer={footer}
        onOk={onOkClicked}
        onCancel={() => closeModal(false)}
        width={modalWidth}
        zIndex={10000}
        transitionName={''}
      // maskTransitionName={''}
      >
        {renderContent ? renderContent() : ''}
      </Modal>
    </>
  );
};

export default ZModal;