export default function catchAsynError(controllerFunction) {
  return function (req, res, next) {
    Promise.resolve(controllerFunction(req, res, next)).catch(next);
  };
}
