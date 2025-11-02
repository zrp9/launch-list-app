import axiosInstance, { endpoints } from 'src/lib/axios';

type TestimonialData = {
  testimonials: Testimonial[];
};

export async function getTestimonials() {
  const url = `${endpoints.testimonial.list}`;
  const { data } = await axiosInstance.get<TestimonialData>(url);
  return data?.testimonials;
}
