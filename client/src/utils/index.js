export const isMyTask = (task)=>{
  const userId = JSON.parse(localStorage.getItem("userInfo")).id;
  return userId === task.posterId;
};
