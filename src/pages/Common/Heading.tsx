interface HeadingProps {
  badge: string;
  title: string;
  highlight: string;
  afterHighlight?: string;
  description?: string;
  breakBeforeHighlight?: boolean;
}

const Heading = ({
  badge,
  title,
  highlight,
  afterHighlight,
  description,
  breakBeforeHighlight = false,
}: HeadingProps) => {
  return (
    <div className="row sorath-section-heading">
      <div className="col-lg-4 col-md-12">
        <div className="sorath-section-badge">
          <span />
          {badge}
        </div>
      </div>

      <div className="col-lg-8 col-md-12">
        <div className="sorath-section-heading-content">
          <h2 className="sorath-section-title">
            {title}{' '}
            {breakBeforeHighlight && <br />}
            <span>{highlight}</span>
            {afterHighlight ? ` ${afterHighlight}` : null}
          </h2>

          {description ? (
            <p className="sorath-section-description">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Heading;