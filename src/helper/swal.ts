import Swal from "sweetalert2";

export const handleSwalFire = (
  titleData: string,
  confirmText: string,
  denyText: string,
  handleFunction: () => void,
  successText: string,
) => {
  Swal.fire({
    title: titleData,
    showDenyButton: true,
    confirmButtonText: confirmText,
    denyButtonText: denyText,
    customClass: {
      confirmButton: "confirm-button-class",
      denyButton: "confirm-button-class",
      title: "title-class",
      icon: "icon-class",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      handleFunction();
      Swal.fire({
        title: successText,
        customClass: {
          confirmButton: "confirm-button-class",
        },
      });
    }
  });
};

export const successSwalFire = (message: string) => {
  Swal.fire({
    title: message,
    customClass: {
      confirmButton: "confirm-button-class",
    },
  });
};
