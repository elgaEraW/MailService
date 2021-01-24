export default async () => {
  let loginFlag = false;

  await fetch("/api/get-login/").then((res) => {
    if (res.status === 202) loginFlag = true;
  });

  return loginFlag;
};
