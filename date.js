//Export getDate Function
exports.getDate = (params) => 
{
  const today = new Date();
  let options = 
  {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  //let day = today.toLocaleDateString("en-US"); // 9/17/2016
  return day = today.toLocaleDateString("en-US", options);
}


//Export getDay Function
exports.getDay = (params) =>
{
  const today = new Date();
  let options = 
  {
    weekday: "long",
    day: "numeric",
  };
  return day = today.toLocaleDateString("en-US", options);
}
