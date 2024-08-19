export default function catchAsyn(controllerFunction) {
  return function (req, res, next) {
    Promise.resolve(controllerFunction(req, res, next)).catch(next);
  };
}
