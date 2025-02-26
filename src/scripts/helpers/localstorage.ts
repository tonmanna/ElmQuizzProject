import localforage from "localforage";
export const InitItem = () => {
  return new Promise((resolve, reject) => {
    localforage.getItem("key", function (err, value) {
      if (err) {
        reject("internal error localforage");
      } else {
        resolve(value);
      }
    });
  });
};
