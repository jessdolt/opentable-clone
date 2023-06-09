export default function Head({ params }: { params: { slug: string } }) {
  const renderTitle = () => {
    const whole = params.slug
      .split("-")
      .map((x) => x[0].toUpperCase() + x.substring(1))
      .join(" ");

    return whole;
  };
  return (
    <>
      <title>{renderTitle()}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Generated by Open Table Search" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
