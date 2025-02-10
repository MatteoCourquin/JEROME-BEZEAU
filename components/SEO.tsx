import Head from 'next/head';

const SEO = ({
  title = 'Jérôme BEZEAU',
  description = 'Art Director & Digital designer',
  image = '/open-graph-image.png',
  url = 'https://jeromebezeau.com',
}) => {
  return (
    <Head>
      <title>{title}</title>

      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content={description} name="description" />
      <meta content="telephone=no" name="format-detection" />
      <meta content="default" name="referrer" />
      <meta content="index, follow" name="robots" />

      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={url} property="og:url" />
      <meta content={image} property="og:image" />
      <meta content="website" property="og:type" />
      <meta content="Matteo Courquin" property="og:site_name" />

      <meta content="summary_large_image" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={image} name="twitter:image" />

      <meta content="8ruSCHfaoov8L5KZxcFqoSWmkdh17EutE0FaNb2Fxq0" name="google-site-verification" />

      <meta
        content="Art Director, Digital designer, Web designer, Graphic designer, UI/UX designer, Front-end developer, Creative developer, Motion designer, Paris, France, Portfolio, Freelance, Jérôme BEZEAU"
        name="keywords"
      />

      <link href={url} rel="canonical" />
      <link href="/favicon.svg" rel="icon" />
      <link href="/fonts" rel="preconnect" />
      <link
        as="font"
        crossOrigin="anonymous"
        href="/fonts/NeueMachina.woff2"
        rel="preload"
        type="font/woff2"
      />
    </Head>
  );
};

export default SEO;
