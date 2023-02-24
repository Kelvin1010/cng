import openNotification from "../components/toastMessage/toastMessage";

export const processMessage = (data) => {
  if (typeof data === "string") {
    openNotification(data);
  }
  else if (data.error) {
    openNotification(
      data.error.msg ? 
      data.error.msg : 
      JSON.stringify(
        data.error.errors ? 
        data.error.errors.map(e => e.message): 
        data.error
        ), null, null, 'error');
  }
}