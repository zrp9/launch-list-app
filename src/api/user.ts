import axiosInstance, { endpoints } from 'src/lib/axios';

type UserResponse = {
  user: User;
};

type PositionResponse = {
  quePosition: number;
};

type ReferLinkResponse = {
  refLink: string;
  curPosition: number;
};

// TODO: this will only need the user firstname/lastname/email
// will have to update the backend
export async function subscribeUser(usr: Partial<User>) {
  const url = `${endpoints.user.subscribe}`;
  const { data } = await axiosInstance.post<UserResponse>(url, usr);
  return data;
}

export async function getQuePosition(email: string) {
  const url = `${endpoints.user.quePosition}${email}`;
  const { data } = await axiosInstance.get<PositionResponse>(url);
  return data.quePosition;
}

export async function subscribeReferedUser(referalURL: string, usr: User) {
  const url = `${endpoints.user.refered}${referalURL}`;
  const { data } = await axiosInstance.post<UserResponse>(url, usr);
  return data.user;
}

export async function getReferLink(usrname: string) {
  const url = `${endpoints.user.referLink}${usrname}`;
  const { data } = await axiosInstance.get<ReferLinkResponse>(url);
  return data;
}

export async function deleteSubscription(email: string) {
  const url = `${endpoints.user}${email}`;
  const { data } = await axiosInstance.delete(url);
  return data;
}
