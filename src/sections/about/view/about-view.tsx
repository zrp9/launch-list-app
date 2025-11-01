import { AboutHero } from '../about-hero';
import { AboutWhat } from '../about-what';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as aboutVision from '../about-vision';
import { AboutFeatures } from '../about-features';
import { AboutTestimonials } from '../about-testimonials';

// ----------------------------------------------------------------------

export function AboutView() {
  return (
    <>
      <AboutHero />

      <AboutWhat />

      <aboutVision.AboutVision />

      <AboutFeatures />
      <AboutTestimonials />
    </>
  );
}
