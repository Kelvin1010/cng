import { Button, Divider, notification, Space } from 'antd';
import React from 'react';

import "./toastMessage.style.scss";

const openNotification = (message, description, placement, type) => {
  if(!type)
    type = 'info';
  if(!placement)
    placement = 'bottomRight';

  const mess = {
    message: message,
    description:
      description,
    placement,
  }

  notification.config({
    className: 'toast-message',
    // bottom: 100
  })

  if (type === 'info')
    notification.info(mess);
  else if (type === 'error')
    notification.error(mess);
  else if (type === 'warning')
    notification.warning(mess);
};

export default openNotification;